import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const KNOWLEDGE_DIR = join(process.cwd(), "knowledge");
const dbPath = join(KNOWLEDGE_DIR, "synthesis_comparison_db.json");

let targetSlug = process.argv[2];
if (targetSlug) {
    targetSlug = targetSlug.split(/[\\/]/).pop()?.replace(".md", "") || targetSlug;
}

const dirA = join(KNOWLEDGE_DIR, "synthesis_A");
const dirB = join(KNOWLEDGE_DIR, "synthesis_B");

function checkPath(slug: string, dir: string) {
    const auditPath = join(dir, "synthesis_prompt_dump.audit.json");
    if (!existsSync(auditPath)) return false;
    const audit = JSON.parse(readFileSync(auditPath, "utf-8"));
    return audit.requested_slug === slug;
}

if (!targetSlug) {
    console.error("Usage: npm run compare:synthesis <slug>");
    process.exit(1);
}

if (!checkPath(targetSlug, dirA) || !checkPath(targetSlug, dirB)) {
    console.error(`❌ ERROR: Missing Policy A or Policy B results for '${targetSlug}'.`);
    console.error(`Please run 'npm run generate:synthesis "${targetSlug}" --policy=both' first!`);
    process.exit(1);
}

const auditA = JSON.parse(readFileSync(join(dirA, "synthesis_prompt_dump.audit.json"), "utf-8"));
const auditB = JSON.parse(readFileSync(join(dirB, "synthesis_prompt_dump.audit.json"), "utf-8"));
const draftA = readFileSync(join(dirA, "synthesis_draft.md"), "utf-8");
const draftB = readFileSync(join(dirB, "synthesis_draft.md"), "utf-8");

console.log("\n==============================================");
console.log(`⚖️  ENUMD POLICY A/B COMPARISON: ${targetSlug}`);
console.log("==============================================\n");

console.log("--- 1. Subgraph Dynamics & Advisory ---");
console.table({
    "Metric": ["Related Count", "Context Edges", "Context Class", "Advisory Recommend", "Topology Status"],
    "Policy A (Safe)": [
        auditA.snapshot_profile.related_count, 
        auditA.snapshot_profile.context_edge_count, 
        auditA.snapshot_profile.context_class,
        auditA.advisory?.recommended_policy || "N/A",
        auditA.advisory?.topology_status || "N/A"
    ],
    "Policy B (Aggressive)": [
        auditB.snapshot_profile.related_count, 
        auditB.snapshot_profile.context_edge_count, 
        auditB.snapshot_profile.context_class,
        "-",
        "-"
    ]
});

const deltaCount = auditB.snapshot_profile.related_count - auditA.snapshot_profile.related_count;
console.log(`\n[Technical ∆ Metrics]`);
console.log(`Δ Related Count : ${deltaCount > 0 ? '+' : ''}${deltaCount}`);
console.log(`Recovery Potential: ${auditA.topology_signature?.borderline_count || 0} borderline candidates (Best Score: ${auditA.topology_signature?.best_borderline_score?.toFixed(2) || 'N/A'})`);

console.log("\n--- 2. Draft Peek (First 20 Lines) ---");
console.log(`\n>>> POLICY A (SAFE) <<<\n${draftA.split("\n").slice(0, 15).join("\n")}\n...`);
console.log(`\n>>> POLICY B (AGGRESSIVE) <<<\n${draftB.split("\n").slice(0, 15).join("\n")}\n...`);
console.log("\n-----------------------------------\n");

const rl = readline.createInterface({ input, output });

async function runComparison() {
    let comparison: any = {
        topic_slug: targetSlug,
        timestamp: new Date().toISOString(),
        profile: auditA.snapshot_profile,
        advisory: auditA.advisory,
        comparison_results: {}
    };

    console.log("-- Differential Review --");
    
    let answer = await rl.question("Q1. Depth Improvement: Is B significantly more insightful or detailed than A? (1: Yes, 2: Marginal, 3: No/Same): ");
    comparison.comparison_results.depth_improvement = answer;

    answer = await rl.question("Q2. Noise Level: Did B introduce irrelevant or distracting context? (1: Clean, 2: Some Noise, 3: High Noise): ");
    comparison.comparison_results.noise_level = answer;

    answer = await rl.question("Q3. Hallucination Presence: Did B start making false claims? (1: None, 2: Minor, 3: Severe): ");
    comparison.comparison_results.hallucination_presence = answer;

    answer = await rl.question("Q4. Structure Integrity: Is B still well-organized? (1: Solid, 2: Loose, 3: Messy): ");
    comparison.comparison_results.structure_integrity = answer;

    console.log("\n-- Final Verdict --");
    answer = await rl.question("Which policy is BETTER for this specific page? (A / B / Neutral): ");
    comparison.verdict = answer.toUpperCase();

    const comment = await rl.question("Optional Comments: ");
    comparison.comments = comment;

    let dbFile = [];
    if (existsSync(dbPath)) {
        dbFile = JSON.parse(readFileSync(dbPath, "utf-8"));
    }
    dbFile.push(comparison);
    writeFileSync(dbPath, JSON.stringify(dbFile, null, 2));

    console.log("\n✅ Comparison logged to 'knowledge/synthesis_comparison_db.json'. Policy data is maturing!");
    rl.close();
}

runComparison();
