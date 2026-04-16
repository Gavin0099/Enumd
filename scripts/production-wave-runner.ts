import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";
import * as crypto from "crypto";
import Anthropic from "@anthropic-ai/sdk";
import { enforceDraft } from "../lib/synthesis-enforcer";
import { runKalCheck } from "../lib/kal-checker";
import { extractVerifiedClaims, AtomicClaim } from "../lib/claim-store";
import { runSemanticScoring } from "../lib/semantic-scorer";
import {
    classifyNodeType,
    evaluateDerivedSuppression,
    applySuppressionToClaims,
} from "../lib/tiered-enforcement-policy";
import { computeDomainAdvisory } from "../lib/domain-advisory";

/**
 * Enumd Production Wave Runner (v1)
 * Logic: Honest Haiku-only batch synthesis with reproducible lockfiles.
 */

const KNOWLEDGE_DIR = join(process.cwd(), "knowledge");

// ─── Governance Report Emitter ────────────────────────────────────────────────
// Emits governance_report.json per wave run for integration with
// ai-governance-framework as an external domain governance producer.
// Schema: knowledge/production_v1/mapping-spec.md §5
// ─────────────────────────────────────────────────────────────────────────────
interface GovernanceNodeData {
    slug: string;
    suppression_tier: string;
    node_type: string;
    kal_verdict: string;
    retained_claims: number;
    explicit_claims: number;
    derived_claims: number;
    suppressed_claim_count: number;
    advisory_risk_level: string;
    advisory_signals: string[];
    corpus_overlap_score: number;
}

function buildGovernanceReport(params: {
    runType: "production_wave" | "probe";
    waveId: number;
    batchId: string;
    govNodes: GovernanceNodeData[];
    waveTotalNodes: number;
    waveDir: string;
}): object {
    const { runType, waveId, batchId, govNodes, waveTotalNodes, waveDir } = params;

    const suppressed = govNodes.filter(n => n.suppression_tier === "SUPPRESS_DERIVED").length;
    const flagged    = govNodes.filter(n => n.suppression_tier === "AUDIT_FLAG").length;
    const passed     = govNodes.filter(n => n.suppression_tier === "PASS").length;

    const totalClaims          = govNodes.reduce((s, n) => s + n.retained_claims, 0);
    const explicitClaims       = govNodes.reduce((s, n) => s + n.explicit_claims, 0);
    const derivedClaims        = govNodes.reduce((s, n) => s + n.derived_claims, 0);
    const suppressedClaimCount = govNodes.reduce((s, n) => s + n.suppressed_claim_count, 0);

    const kalCounts: Record<string, number> = {};
    for (const n of govNodes) {
        kalCounts[n.kal_verdict] = (kalCounts[n.kal_verdict] || 0) + 1;
    }

    const signalCounts: Record<string, number> = {};
    for (const n of govNodes) {
        for (const sig of n.advisory_signals) {
            signalCounts[sig] = (signalCounts[sig] || 0) + 1;
        }
    }

    const nodeSignals = govNodes
        .filter(n => n.advisory_risk_level !== "NONE")
        .map(n => ({
            slug: n.slug,
            risk_level: n.advisory_risk_level,
            signals: n.advisory_signals,
            corpus_overlap_score: n.corpus_overlap_score,
            // advisory_only: this field must not be interpreted as enforcement action
            // by the framework. See mapping-spec §6.4 and §9.
            decision_distance: "advisory_only",
        }));

    return {
        producer: "enumd",
        artifact_type: "governance_report",
        schema_version: "1.0",
        run_type: runType,
        run_id: `wave-${waveId}`,
        batch_id: batchId,
        domain: "usb_windows_firmware",
        semantic_scope: "enumd-specific",
        instrumentation_version: "slice1-v1",
        calibration_profile: {
            name: "production_v1",
            overlap_thresholds: { low_overlap: 0.40 },
            notes: [
                "Thresholds calibrated on Enumd production_v1 corpus (297 nodes, 6 waves).",
                "Not domain-general. Do not treat as framework defaults.",
            ],
        },
        summary: {
            total_nodes: govNodes.length,
            wave_total_nodes: waveTotalNodes,
            total_claims: totalClaims,
            explicit_claims: explicitClaims,
            derived_claims: derivedClaims,
            suppressed_claim_count: suppressedClaimCount,
            suppressed_nodes: suppressed,
            audit_flagged_nodes: flagged,
            passed_nodes: passed,
        },
        // Field name is "synthesis_verdicts", not "enforcement", to avoid
        // false equivalence with the framework's enforcement action vocabulary.
        // Enumd SUPPRESS_DERIVED / AUDIT_FLAG / PASS are synthesis-layer outcomes.
        // See mapping-spec §6.3 and §9.2.
        enforcement: {
            policy: "tiered-enforcement-policy-v1",
            synthesis_verdicts: {
                SUPPRESS_DERIVED: suppressed,
                AUDIT_FLAG: flagged,
                PASS: passed,
            },
        },
        kal_summary: {
            CONVERGED:       kalCounts["CONVERGED"]       || 0,
            THIN_SYNTHESIS:  kalCounts["THIN_SYNTHESIS"]  || 0,
            SKIPPED:         kalCounts["SKIPPED"]         || 0,
        },
        advisory: {
            // Signal counts and per-node signals are advisory_only.
            // They do not represent framework enforcement decisions.
            signal_counts: signalCounts,
            node_signals: nodeSignals,
        },
        raw_artifacts: {
            wave_dir: waveDir,
            audit_json_pattern: join(waveDir, "{slug}", "audit.json"),
            atomic_claims_path: join(waveDir, "atomic-claims.json"),
        },
        generated_at: new Date().toISOString(),
    };
}
const PROD_DIR = join(KNOWLEDGE_DIR, "production_v1");
mkdirSync(PROD_DIR, { recursive: true });

const WAVE_SIZE = 50;

async function run() {
    console.log("🚀 Initializing Enumd Production Wave Runner (v1)...");

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        console.error("Missing ANTHROPIC_API_KEY. Please check .env.local");
        process.exit(1);
    }
    const anthropic = new Anthropic({ apiKey });

    // 1. Snapshot Environment (Reproducibility Contract)
    const gitHash = execSync("git rev-parse HEAD").toString().trim();
    const graphHash = crypto.createHash("md5")
        .update(readFileSync(join(KNOWLEDGE_DIR, "nodes.json")))
        .update(readFileSync(join(KNOWLEDGE_DIR, "edges.json")))
        .digest("hex");
    const codeHash = crypto.createHash("md5")
        .update(readFileSync("lib/synthesis-context.ts"))
        .update(readFileSync("lib/knowledge-query.ts"))
        .digest("hex");
    
    const BATCH_ID = `batch_${new Date().toISOString().replace(/[:.]/g, "-")}`;
    
    console.log(`   - Git Hash   : ${gitHash}`);
    console.log(`   - Graph Hash : ${graphHash}`);
    console.log(`   - Code Hash  : ${codeHash}`);
    console.log(`   - Batch ID   : ${BATCH_ID}`);

    // 2. Inventory & Wave Splitting
    const rawNodes: { slug: string }[] = JSON.parse(readFileSync(join(KNOWLEDGE_DIR, "nodes.json"), "utf8"));

    // Deduplicate by slug before wave splitting — nodes.json may contain
    // duplicate entries from merged exports. Processing duplicates wastes
    // API calls and produces no additional output (mkdirSync is idempotent).
    const seenSlugs = new Set<string>();
    const duplicateSlugs: string[] = [];
    const allNodes = rawNodes.filter(n => {
        if (seenSlugs.has(n.slug)) {
            duplicateSlugs.push(n.slug);
            return false;
        }
        seenSlugs.add(n.slug);
        return true;
    });
    const dedupedCount = rawNodes.length - allNodes.length;
    if (dedupedCount > 0) {
        console.log(`   ⚠️  Deduplication: removed ${dedupedCount} duplicate slugs (${rawNodes.length} → ${allNodes.length} unique nodes)`);
    }

    // Persist dedupe artifact so reviewers can audit why a slug may be absent from a wave
    const dedupeReport = {
        generated_at: new Date().toISOString(),
        raw_count: rawNodes.length,
        unique_count: allNodes.length,
        duplicate_count: dedupedCount,
        note: "Duplicate slugs: first occurrence in sort order is kept; all subsequent are dropped.",
        duplicate_slugs: [...new Set(duplicateSlugs)].sort(),  // unique list, sorted
    };
    writeFileSync(join(PROD_DIR, "dedupe-report.json"), JSON.stringify(dedupeReport, null, 2));
    console.log(`   📋 dedupe-report.json written to production_v1/`);

    const sortedNodes = allNodes.sort((a, b) => a.slug.localeCompare(b.slug));

    const waves = [];
    for (let i = 0; i < sortedNodes.length; i += WAVE_SIZE) {
        waves.push(sortedNodes.slice(i, i + WAVE_SIZE));
    }

    const waveIndexArg = process.argv.find(a => a.startsWith("--wave="))?.split("=")[1];
    if (!waveIndexArg) {
        console.log(`\nInventory: ${allNodes.length} unique nodes (${dedupedCount} dupes removed) → ${waves.length} waves`);
        console.log("Usage: npx tsx scripts/production-wave-runner.ts --wave=[1-8]");
        process.exit(0);
    }

    const currentWaveIdx = parseInt(waveIndexArg) - 1;
    const currentNodes = waves[currentWaveIdx];
    const waveDir = join(PROD_DIR, `wave_${currentWaveIdx + 1}`);
    mkdirSync(waveDir, { recursive: true });

    // Probe mode: --probe-slugs=slug1,slug2,... runs a filtered subset of the
    // current wave. Semantics are IDENTICAL to a full wave run — same pipeline,
    // same enforcement, same scoring. Only the node set is narrowed.
    // The manifest and atomic-claims.json are NOT written until the full wave
    // completes; a probe-report.json is written instead.
    const probeSlugsArg = process.argv.find(a => a.startsWith("--probe-slugs="))?.split("=")[1];
    const probeSlugs = probeSlugsArg ? new Set(probeSlugsArg.split(",")) : null;
    const nodesToProcess = probeSlugs
        ? currentNodes.filter(n => probeSlugs.has(n.slug))
        : currentNodes;

    if (probeSlugs) {
        const notFound = [...probeSlugs].filter(s => !currentNodes.some(n => n.slug === s));
        if (notFound.length > 0) {
            console.warn(`⚠️  Probe slugs not in wave ${currentWaveIdx + 1} pool: ${notFound.join(", ")}`);
        }
        console.log(`\n🔬 PROBE MODE: ${nodesToProcess.length}/${currentNodes.length} nodes selected from wave ${currentWaveIdx + 1}`);
    }

    // 3. Lockfile Creation
    const lockfile = {
        batch_id: BATCH_ID,
        wave_id: currentWaveIdx + 1,
        git_commit_hash: gitHash,
        graph_hash: graphHash,
        synthesis_code_hash: codeHash,
        prompt_version: "v1.5-controlled-context",
        model_name: "claude-3-haiku-20240307",
        generated_at: new Date().toISOString()
    };
    writeFileSync(join(waveDir, "lockfile.json"), JSON.stringify(lockfile, null, 2));

    // 4. Execution
    const manifest = [];
    const waveAtomicClaims: AtomicClaim[] = [];
    const govNodes: GovernanceNodeData[] = [];

    for (let i = 0; i < nodesToProcess.length; i++) {
        const node = nodesToProcess[i];
        console.log(`\n[${i + 1}/${nodesToProcess.length}] Producing: ${node.slug}...`);
        
        const dest = join(waveDir, node.slug);
        mkdirSync(dest, { recursive: true });

        try {
            // Force policy A (STABLE) for production v1
            execSync(`npx tsx --env-file .env.local scripts/run-synthesis.ts "${node.slug}" --policy=A --model=haiku`, { stdio: 'pipe' });
            
            const synthDir = join(KNOWLEDGE_DIR, "synthesis_A");
            const rawDraft = readFileSync(join(synthDir, "synthesis_draft.md"), "utf8");
            const audit = JSON.parse(readFileSync(join(synthDir, "synthesis_prompt_dump.audit.json"), "utf8"));
            const sourceXml = readFileSync(join(synthDir, "synthesis_prompt_dump.xml"), "utf8");

            // ─── ENFORCEMENT GATE ───────────────────────────────────────
            // Run before any write to disk. The raw LLM draft is NEVER
            // saved directly. Only the enforced output is persisted.
            const { cleanedDraft, report } = enforceDraft(rawDraft, sourceXml);

            if (!report.is_clean) {
                console.log(`   ⚡ ENFORCEMENT: ${report.removed_count} removed, ${report.downgraded_count} downgraded (from ${report.original_claim_count} lines)`);
            } else {
                console.log(`   ✅ ENFORCEMENT: Draft is 100% anchored. No violations.`);
            }
            // ────────────────────────────────────────────────────────────

            // ─── KAL CHECK ──────────────────────────────────────────────
            // Self-questioning pass: can the synthesis answer basic questions
            // about the node? Catches nodes that passed enforcement but are
            // still too sparse to be informative.
            const kalResult = await runKalCheck(node.slug, cleanedDraft, anthropic);
            if (kalResult.verdict === "SKIPPED") {
                console.log(`   ⏭️  KAL: Skipped — ${kalResult.skip_reason}`);
            } else if (kalResult.verdict === "CONVERGED") {
                console.log(`   ✅ KAL: ${kalResult.passed}/${kalResult.total} answered → CONVERGED`);
            } else {
                console.log(`   ⚠️  KAL: ${kalResult.passed}/${kalResult.total} answered → THIN_SYNTHESIS`);
            }
            // ────────────────────────────────────────────────────────────

            // ─── SEMANTIC EVIDENCE AUDIT ────────────────────────────────
            // Post-enforcement pass: asks Claude whether each "Derived"
            // tier claim (borderline keyword hits) is semantically backed
            // by the source XML. Non-blocking — results stored in audit.json.
            const semanticReport = await runSemanticScoring(report.verdicts, sourceXml, anthropic);
            if (!semanticReport.skipped) {
                const flag = semanticReport.unsupported > 0 ? "⚠️ " : "✅";
                console.log(`   ${flag} SEMANTIC: ${semanticReport.supported}/${semanticReport.total_checked} Derived claims confirmed (${semanticReport.unsupported} unsupported)`);
            }
            // ────────────────────────────────────────────────────────────

            // ─── TIERED SUPPRESSION ──────────────────────────────────────
            const nodeType = classifyNodeType(node.slug, cleanedDraft, sourceXml, kalResult.verdict);
            const suppression = evaluateDerivedSuppression(node.slug, nodeType, semanticReport, kalResult.verdict);
            if (suppression.tier === "SUPPRESS_DERIVED") {
                console.log(`   🚫 SUPPRESSION: ${suppression.reason}`);
            } else if (suppression.tier === "AUDIT_FLAG") {
                console.log(`   🚩 AUDIT_FLAG: ${suppression.reason}`);
            }
            // ────────────────────────────────────────────────────────────

            // ─── ATOMIC CLAIM STORE ──────────────────────────────────────
            const rawClaims = extractVerifiedClaims(node.slug, report.verdicts, currentWaveIdx + 1, BATCH_ID);
            const { filtered: nodeClaims, removed_count: suppressedCount } = applySuppressionToClaims(rawClaims, suppression);
            waveAtomicClaims.push(...nodeClaims);
            writeFileSync(join(dest, "claims.json"), JSON.stringify(nodeClaims, null, 2));
            if (suppressedCount > 0) {
                console.log(`   📦 CLAIMS: ${nodeClaims.length} retained (${suppressedCount} Derived suppressed)`);
            } else {
                console.log(`   📦 CLAIMS: ${nodeClaims.length} verified claims stored`);
            }
            // ────────────────────────────────────────────────────────────

            // Inject governance fields
            audit.batch_id = BATCH_ID;
            audit.wave_id = currentWaveIdx + 1;
            audit.synthesis_code_hash = codeHash;
            audit.enforcement_report = {
                removed: report.removed_count,
                downgraded: report.downgraded_count,
                total_lines: report.original_claim_count,
                is_clean: report.is_clean,
            };
            audit.kal_report = {
                verdict: kalResult.verdict,
                passed: kalResult.passed,
                total: kalResult.total,
                convergence_rate: kalResult.convergence_rate,
                skip_reason: kalResult.skip_reason,
                questions: kalResult.questions,
            };
            audit.semantic_audit = semanticReport;
            audit.suppression_decision = {
                tier: suppression.tier,
                node_type: suppression.node_type,
                unsupported_ratio: suppression.unsupported_ratio,
                derived_count: suppression.derived_count,
                reason: suppression.reason,
                suppression_note: suppression.suppression_note,
                removed_count: suppressedCount,
            };

            // ─── DOMAIN ADVISORY (verdict-neutral instrumentation) ───────
            audit.domain_advisory = computeDomainAdvisory(
                node.slug,
                sourceXml,
                nodeClaims,
                {
                    tier: suppression.tier,
                    unsupported_ratio: suppression.unsupported_ratio,
                    derived_count: suppression.derived_count,
                }
            );
            // ─────────────────────────────────────────────────────────────

            // ─── GOVERNANCE REPORT COLLECTOR ────────────────────────────
            govNodes.push({
                slug: node.slug,
                suppression_tier: suppression.tier,
                node_type: suppression.node_type,
                kal_verdict: kalResult.verdict,
                retained_claims: nodeClaims.length,
                explicit_claims: nodeClaims.filter(c => c.tier === "Explicit").length,
                derived_claims: nodeClaims.filter(c => c.tier === "Derived").length,
                suppressed_claim_count: suppressedCount,
                advisory_risk_level: audit.domain_advisory.risk_level,
                advisory_signals: [...audit.domain_advisory.signals],
                corpus_overlap_score: audit.domain_advisory.corpus_overlap_score,
            });
            // ─────────────────────────────────────────────────────────────

            writeFileSync(join(dest, "synthesis.md"), cleanedDraft);
            writeFileSync(join(dest, "audit.json"), JSON.stringify(audit, null, 2));
            writeFileSync(join(dest, "source.xml"), sourceXml);

            manifest.push({
                slug: node.slug,
                topology: audit.advisory.topology_status,
                trust: audit.decision_basis?.pilot_evaluation?.trust_level || "UNKNOWN",
                noise: audit.outcome_metrics.noise_signal,
                kal: kalResult.verdict,
                claims: nodeClaims.length,
            });
        } catch (e: any) {
            console.error(`  ❌ Failed: ${e.message}`);
        }
    }

    // 5. Wave-level Atomic Claim Store + Manifest
    // In probe mode: write probe-report.json only; skip atomic-claims.json and
    // manifest.md until the full wave completes.
    if (probeSlugs) {
        const allComplete = currentNodes.every(n => existsSync(join(waveDir, n.slug, "audit.json")));
        if (!allComplete) {
            const probeReport = {
                probe_mode: true,
                wave_id: currentWaveIdx + 1,
                probe_slugs: [...probeSlugs].sort(),
                nodes_processed: nodesToProcess.length,
                wave_total: currentNodes.length,
                atomic_claims_this_run: waveAtomicClaims.length,
                results: manifest,
                generated_at: new Date().toISOString(),
            };
            writeFileSync(join(waveDir, "probe-report.json"), JSON.stringify(probeReport, null, 2));

            const probeGovReport = buildGovernanceReport({
                runType: "probe",
                waveId: currentWaveIdx + 1,
                batchId: BATCH_ID,
                govNodes,
                waveTotalNodes: currentNodes.length,
                waveDir,
            });
            writeFileSync(join(waveDir, "governance_report.json"), JSON.stringify(probeGovReport, null, 2));

            console.log(`\n🔬 Probe complete: ${nodesToProcess.length}/${currentNodes.length} nodes processed.`);
            console.log(`   Report → ${join(waveDir, "probe-report.json")}`);
            console.log(`   📋 Governance → ${join(waveDir, "governance_report.json")}`);
            console.log(`   ⚠️  Wave ${currentWaveIdx + 1} not yet complete — manifest and atomic-claims deferred.`);
            return;
        }
        // All nodes done — fall through to write full manifest
    }

    writeFileSync(join(waveDir, "atomic-claims.json"), JSON.stringify(waveAtomicClaims, null, 2));
    console.log(`\n📦 Atomic Claims: ${waveAtomicClaims.length} total verified claims written to atomic-claims.json`);

    // ─── GOVERNANCE REPORT (full wave) ───────────────────────────────────────
    const govReport = buildGovernanceReport({
        runType: "production_wave",
        waveId: currentWaveIdx + 1,
        batchId: BATCH_ID,
        govNodes,
        waveTotalNodes: currentNodes.length,
        waveDir,
    });
    writeFileSync(join(waveDir, "governance_report.json"), JSON.stringify(govReport, null, 2));
    console.log(`📋 Governance Report: governance_report.json written`);

    // 6. Manifest generation
    const thinNodes = manifest.filter(m => m.kal === "THIN_SYNTHESIS").length;
    let manifestMd = `# Wave ${currentWaveIdx + 1} Manifest\n\n`;
    manifestMd += `> KAL summary: ${manifest.length - thinNodes} CONVERGED, ${thinNodes} THIN_SYNTHESIS, ${manifest.filter(m => m.kal === "SKIPPED").length} SKIPPED\n\n`;
    manifestMd += "| Slug | Topology | Trust | Noise | KAL | Claims | Review |\n";
    manifestMd += "| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n";
    for (const m of manifest) {
        const kalIcon = m.kal === "CONVERGED" ? "✅" : m.kal === "THIN_SYNTHESIS" ? "⚠️" : "⏭️";
        manifestMd += `| ${m.slug} | ${m.topology} | ${m.trust} | ${m.noise} | ${kalIcon} ${m.kal} | ${m.claims} | [ ] |\n`;
    }
    writeFileSync(join(waveDir, "manifest.md"), manifestMd);

    console.log(`✅ Wave ${currentWaveIdx + 1} Complete. Manifest written to ${waveDir}`);
}

run();
