import Anthropic from '@anthropic-ai/sdk';
import { KnowledgeQueryEngine } from '../lib/knowledge-query';
import { SynthesisContextBuilder, DEFAULT_POLICY_A, EXPERIMENTAL_POLICY_B, SynthesisPolicy } from '../lib/synthesis-context';
import { PromptAssembler } from '../lib/synthesis-prompt';
import { existsSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

console.log("Initializing Enumd Synthesis Execution Engine (A/B Experiment Mode)...");

const KNOWLEDGE_DIR = join(process.cwd(), "knowledge");
const nodesPath = join(KNOWLEDGE_DIR, "nodes.json");
const edgesPath = join(KNOWLEDGE_DIR, "edges.json");

if (!existsSync(nodesPath) || !existsSync(edgesPath)) {
    console.error("Required knowledge artifacts not found. Please run 'npm run build:graph' first.");
    process.exit(1);
}

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
    console.error("Missing ANTHROPIC_API_KEY in environment variables. Please check .env.local");
    process.exit(1);
}

const anthropic = new Anthropic({ apiKey });

let targetSlug = process.argv[2];
if (!targetSlug || targetSlug.startsWith("--")) {
    console.error("Usage: npm run generate:synthesis <topic-slug> [--policy=A|B|both]");
    console.error("Usage: npm run generate:synthesis <topic-slug> [--policy=A|B|both] [--model=...]");
    process.exit(1);
}

// Clean slug
targetSlug = targetSlug.split(/[\\/]/).pop()?.replace(".md", "") || targetSlug;

const policyArg = process.argv.find(a => a.startsWith("--policy="))?.split("=")[1] || "A";
const modelOverride = process.argv.find(a => a.startsWith("--model="))?.split("=")[1];

const policies: SynthesisPolicy[] = [];

if (policyArg === "both") {
    policies.push(DEFAULT_POLICY_A, EXPERIMENTAL_POLICY_B);
} else if (policyArg === "B") {
    policies.push(EXPERIMENTAL_POLICY_B);
} else if (policyArg === "adaptive") {
    // Will be handled as a special case in runSynthesisWithPolicy
    policies.push(DEFAULT_POLICY_A); 
} else {
    policies.push(DEFAULT_POLICY_A);
}

async function runSynthesisWithPolicy(slug: string, policy: SynthesisPolicy, isAdaptive: boolean = false) {
    console.log(`\n=== Running ${isAdaptive ? "ADAPTIVE" : "Policy " + policy.name} (Threshold: ${policy.score_threshold}, Limit: ${policy.related_limit}) ===`);
    
    const queryEngine = new KnowledgeQueryEngine(nodesPath, edgesPath);
    const contextBuilder = new SynthesisContextBuilder(queryEngine);
    let { context, audit } = contextBuilder.buildContext(slug, policy);

    if (context.coreTopics.length === 0) {
        console.error(`   ❌ Core topic '${slug}' could not be located. skipping.`);
        return;
    }

    if (isAdaptive && audit.advisory?.recommended_policy === "B" && policy.name === "A") {
        console.log(`   💡 ADAPTIVE SWITCH: Diagnostic recommended Policy B. Upgrading...`);
        const bResult = contextBuilder.buildContext(slug, EXPERIMENTAL_POLICY_B);
        context = bResult.context;
        audit = bResult.audit;
        console.log(`   - New Context: Related ${context.relatedContext.length}, Threshold 0.22`);
    }

    console.log(`   - Included Dependencies: ${context.dependencies.length}`);
    console.log(`   - Included Related   : ${context.relatedContext.length}`);
    console.log(`   - Context Class      : ${audit.snapshot_profile?.context_class}`);

    if (audit.advisory) {
        console.log("\n   [📡 TOPOLOGY ADVISORY]");
        console.log(`   Status    : ${audit.advisory.topology_status}`);
        console.log(`   Recommend : Policy ${audit.advisory.recommended_policy}`);
        console.log(`   Confidence: ${audit.decision_confidence}`);
        console.log(`   Reason    : ${audit.advisory.reason}`);
        
        if (audit.decision_guards && !audit.decision_guards.allow_policy_b) {
            console.log("\n   🚫 DECISION GUARD DENIED Policy B switch!");
            console.log(`   Violations: ${audit.decision_guards.violations.join(", ")}`);
        }

        if (audit.decision_confidence === "LOW") {
            console.log("\n   ⚠️  WARNING: LOW CONFIDENCE DECISION");
            console.log("   The diagnostic prober found borderline signal that is insufficient for a stable policy switch.");
        }

        if (audit.topology_signature?.gap_detected) {
            console.log("\n   ⚠️  TOPOLOGY GAP SIGNAL DETECTED");
            console.log("   No recoverable context found between 0.22 and 0.3.");
        }
    }

    if (audit.outcome_metrics) {
        console.log("\n   [📈 OUTCOME METRICS]");
        console.log(`   Diversity : ${audit.outcome_metrics.source_diversity} categories`);
        console.log(`   Integrity : ${audit.outcome_metrics.avg_integrity_score.toFixed(2)}`);
        console.log(`   Noise     : ${audit.outcome_metrics.noise_signal}`);
    }

    const promptAssembler = new PromptAssembler();
    const { systemInstruction, contextPrompt } = promptAssembler.buildPromptParameters(context, audit);

    // Isolated Directory Management
    const outDir = join(KNOWLEDGE_DIR, `synthesis_${policy.name}`);
    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

    const modelToUse = modelOverride || "claude-3-haiku-20240307";
    const actualModelName = modelToUse === "sonnet" ? "claude-3-5-sonnet-20241022" : (modelToUse === "haiku" ? "claude-3-haiku-20240307" : modelToUse);
    
    audit.applied_model = modelToUse === "sonnet" ? "sonnet" : "haiku";

    writeFileSync(join(outDir, "synthesis_prompt_dump.xml"), contextPrompt);
    writeFileSync(join(outDir, "synthesis_prompt_dump.audit.json"), JSON.stringify(audit, null, 2));

    console.log(`   - Invoking ${actualModelName}...`);
    
    try {
        const response = await anthropic.messages.create({
            model: actualModelName,
            max_tokens: 4096,
            temperature: 0.2,
            system: systemInstruction,
            messages: [
                {
                    role: "user",
                    content: `Please synthesize the documentation for the core topic '${context.coreTopics[0].title}' based ONLY on the following context context boundaries:\n\n${contextPrompt}`
                }
            ]
        });

        const draftContent = response.content[0].type === "text" ? response.content[0].text : "No text returned.";
        const outputDraftPath = join(outDir, "synthesis_draft.md");
        writeFileSync(outputDraftPath, draftContent);
        
        console.log(`   ✅ Policy ${policy.name} Complete! Draft written to: ${outputDraftPath}`);
        console.log(`   - Usage: Input ${response.usage.input_tokens}, Output ${response.usage.output_tokens}`);

    } catch(err: any) {
        console.error(`   ❌ LLM Error (Policy ${policy.name}): `, err.message);
    }
}

async function main() {
    const isAdaptive = policyArg === "adaptive";
    for (const p of policies) {
        await runSynthesisWithPolicy(targetSlug, p, isAdaptive);
    }
}

main();
