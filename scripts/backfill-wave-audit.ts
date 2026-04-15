/**
 * Wave Audit Backfill
 *
 * Backfills kal_report, semantic_audit, and claims.json for nodes that
 * were synthesized BEFORE those modules existed.
 *
 * What it does per node:
 *   1. Reads existing synthesis.md + source.xml (no re-synthesis)
 *   2. Reconstructs enforcement verdicts from synthesis.md + source.xml
 *   3. Runs KAL check   → writes kal_report into audit.json
 *   4. Runs Semantic scoring → writes semantic_audit into audit.json
 *   5. Extracts verified claims → writes claims.json
 *   6. Regenerates wave-level atomic-claims.json aggregate
 *   7. Updates manifest.md with KAL + Claims columns
 *
 * Usage:
 *   npx tsx --env-file .env.local scripts/backfill-wave-audit.ts --wave=1
 *   npx tsx --env-file .env.local scripts/backfill-wave-audit.ts --wave=1 --dry-run
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from "fs";
import { join } from "path";
import Anthropic from "@anthropic-ai/sdk";
import { enforceDraft } from "../lib/synthesis-enforcer";
import { runKalCheck } from "../lib/kal-checker";
import { runSemanticScoring } from "../lib/semantic-scorer";
import { extractVerifiedClaims, AtomicClaim } from "../lib/claim-store";

const KNOWLEDGE_DIR = join(process.cwd(), "knowledge");
const PROD_DIR = join(KNOWLEDGE_DIR, "production_v1");

const waveArg = process.argv.find(a => a.startsWith("--wave="))?.split("=")[1];
const dryRun = process.argv.includes("--dry-run");

if (!waveArg) {
    console.error("Usage: npx tsx --env-file .env.local scripts/backfill-wave-audit.ts --wave=<N> [--dry-run]");
    process.exit(1);
}

const waveId = parseInt(waveArg);
const waveDir = join(PROD_DIR, `wave_${waveId}`);

if (!existsSync(waveDir)) {
    console.error(`Wave directory not found: ${waveDir}`);
    process.exit(1);
}

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
    console.error("Missing ANTHROPIC_API_KEY. Please check .env.local");
    process.exit(1);
}
const anthropic = new Anthropic({ apiKey });

// ─── Helpers ────────────────────────────────────────────────────────────────

function getNodeDirs(waveDir: string): string[] {
    return readdirSync(waveDir).filter(d => {
        const full = join(waveDir, d);
        return statSync(full).isDirectory();
    });
}

function readText(p: string): string {
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// ─── Main ────────────────────────────────────────────────────────────────────

// ─── Per-node tracking ───────────────────────────────────────────────────────

interface NodeStat {
    slug: string;
    topology: string;
    trust: string;
    noise: string;
    kal: string;
    claims: number;
    semantic_supported: number;
    semantic_uncertain: number;
    semantic_unsupported: number;
    semantic_total: number;
    status: "processed" | "skipped_already_done" | "failed";
    error?: string;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function run() {
    const nodeDirs = getNodeDirs(waveDir);
    console.log(`\n🔄 Backfilling Wave ${waveId} audit data (${nodeDirs.length} nodes)${dryRun ? " [DRY RUN]" : ""}...`);
    console.log(`   KAL + Semantic + Claims — no re-synthesis\n`);

    const waveAtomicClaims: AtomicClaim[] = [];
    const nodeStats: NodeStat[] = [];
    let failedCount = 0;

    for (let i = 0; i < nodeDirs.length; i++) {
        const slug = nodeDirs[i];
        const nodeDir = join(waveDir, slug);
        console.log(`[${i + 1}/${nodeDirs.length}] ${slug}`);

        const synthesis = readText(join(nodeDir, "synthesis.md"));
        const sourceXml = readText(join(nodeDir, "source.xml"));
        const audit = JSON.parse(readText(join(nodeDir, "audit.json")) || "{}") as Record<string, any>;

        // Skip if already backfilled (idempotent)
        if (audit.kal_report) {
            console.log(`   ⏭️  Already backfilled — collecting existing data`);
            const existingClaims: AtomicClaim[] = existsSync(join(nodeDir, "claims.json"))
                ? JSON.parse(readFileSync(join(nodeDir, "claims.json"), "utf8"))
                : [];
            waveAtomicClaims.push(...existingClaims);
            const sr = audit.semantic_audit ?? {};
            nodeStats.push({
                slug,
                topology: String(audit.advisory?.topology_status ?? "?"),
                trust: String(audit.decision_basis?.pilot_evaluation?.trust_level ?? "UNKNOWN"),
                noise: String(audit.outcome_metrics?.noise_signal ?? "?"),
                kal: String(audit.kal_report?.verdict ?? "?"),
                claims: existingClaims.length,
                semantic_supported: sr.supported ?? 0,
                semantic_uncertain: sr.uncertain ?? 0,
                semantic_unsupported: sr.unsupported ?? 0,
                semantic_total: sr.total_checked ?? 0,
                status: "skipped_already_done",
            });
            continue;
        }

        try {
            // 1. Reconstruct enforcement verdicts from existing synthesis + source
            const { report } = enforceDraft(synthesis, sourceXml);

            // 2. KAL check
            const kalResult = await runKalCheck(slug, synthesis, anthropic);
            if (kalResult.verdict === "CONVERGED")      console.log(`   ✅ KAL: ${kalResult.passed}/${kalResult.total} → CONVERGED`);
            else if (kalResult.verdict === "THIN_SYNTHESIS") console.log(`   ⚠️  KAL: ${kalResult.passed}/${kalResult.total} → THIN_SYNTHESIS`);
            else                                         console.log(`   ⏭️  KAL: SKIPPED — ${kalResult.skip_reason}`);

            // 3. Semantic scoring
            const semanticReport = await runSemanticScoring(report.verdicts, sourceXml, anthropic);
            if (!semanticReport.skipped) {
                const flag = semanticReport.unsupported > 0 ? "⚠️ " : "✅";
                console.log(`   ${flag} SEMANTIC: ${semanticReport.supported}/${semanticReport.total_checked} Derived confirmed (${semanticReport.unsupported} unsupported)`);
            }

            // 4. Extract verified claims
            const nodeClaims = extractVerifiedClaims(slug, report.verdicts, waveId, String(audit.batch_id ?? "backfill"));
            waveAtomicClaims.push(...nodeClaims);
            console.log(`   📦 CLAIMS: ${nodeClaims.length} verified claims`);

            // 5. Patch audit.json
            audit.kal_report = {
                verdict: kalResult.verdict,
                passed: kalResult.passed,
                total: kalResult.total,
                convergence_rate: kalResult.convergence_rate,
                skip_reason: kalResult.skip_reason,
                questions: kalResult.questions,
            };
            audit.semantic_audit = semanticReport;
            audit.backfilled_at = new Date().toISOString();

            if (!dryRun) {
                writeFileSync(join(nodeDir, "audit.json"), JSON.stringify(audit, null, 2));
                writeFileSync(join(nodeDir, "claims.json"), JSON.stringify(nodeClaims, null, 2));
            }

            nodeStats.push({
                slug,
                topology: String(audit.advisory?.topology_status ?? "?"),
                trust: String(audit.decision_basis?.pilot_evaluation?.trust_level ?? "UNKNOWN"),
                noise: String(audit.outcome_metrics?.noise_signal ?? "?"),
                kal: kalResult.verdict,
                claims: nodeClaims.length,
                semantic_supported: semanticReport.supported,
                semantic_uncertain: semanticReport.uncertain,
                semantic_unsupported: semanticReport.unsupported,
                semantic_total: semanticReport.total_checked,
                status: "processed",
            });
        } catch (e: any) {
            console.error(`   ❌ Failed: ${e.message}`);
            failedCount++;
            nodeStats.push({
                slug, topology: "?", trust: "?", noise: "?", kal: "ERROR",
                claims: 0, semantic_supported: 0, semantic_uncertain: 0,
                semantic_unsupported: 0, semantic_total: 0,
                status: "failed", error: e.message,
            });
        }
    }

    // ── Write outputs ─────────────────────────────────────────────────────────

    if (!dryRun) {
        writeFileSync(join(waveDir, "atomic-claims.json"), JSON.stringify(waveAtomicClaims, null, 2));
    }

    // ── Manifest ──────────────────────────────────────────────────────────────

    const convergCount = nodeStats.filter(r => r.kal === "CONVERGED").length;
    const thinCount    = nodeStats.filter(r => r.kal === "THIN_SYNTHESIS").length;
    const skipCount    = nodeStats.filter(r => r.kal === "SKIPPED").length;

    let md = `# Wave ${waveId} Manifest\n\n`;
    md += `> KAL summary: ${convergCount} CONVERGED, ${thinCount} THIN_SYNTHESIS, ${skipCount} SKIPPED, ${failedCount} FAILED\n\n`;
    md += "| Slug | Topology | Trust | Noise | KAL | Claims | Semantic (S/U/X) | Review |\n";
    md += "| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n";
    for (const r of nodeStats) {
        const kalIcon = r.kal === "CONVERGED" ? "✅" : r.kal === "THIN_SYNTHESIS" ? "⚠️" : r.kal === "SKIPPED" ? "⏭️" : r.kal === "ERROR" ? "❌" : "❓";
        const semStr = r.semantic_total > 0 ? `${r.semantic_supported}/${r.semantic_uncertain}/${r.semantic_unsupported}` : "—";
        md += `| ${r.slug} | ${r.topology} | ${r.trust} | ${r.noise} | ${kalIcon} ${r.kal} | ${r.claims} | ${semStr} | [ ] |\n`;
    }
    if (!dryRun) writeFileSync(join(waveDir, "manifest.md"), md);

    // ── Summary statistics ────────────────────────────────────────────────────

    const processed = nodeStats.filter(r => r.status === "processed");
    const claimCounts = nodeStats.map(r => r.claims);
    const avgClaims = claimCounts.length > 0 ? (claimCounts.reduce((a, b) => a + b, 0) / claimCounts.length).toFixed(1) : "0";
    const claimExplosion = nodeStats.filter(r => r.claims > 50);                // suspiciously many
    const claimCollapse  = nodeStats.filter(r => r.kal !== "SKIPPED" && r.kal !== "ERROR" && r.claims < 3);  // suspiciously few

    const semTotal   = nodeStats.reduce((s, r) => s + r.semantic_total, 0);
    const semSupp    = nodeStats.reduce((s, r) => s + r.semantic_supported, 0);
    const semUnc     = nodeStats.reduce((s, r) => s + r.semantic_uncertain, 0);
    const semUnsup   = nodeStats.reduce((s, r) => s + r.semantic_unsupported, 0);
    const semPct     = (n: number) => semTotal > 0 ? `${((n / semTotal) * 100).toFixed(0)}%` : "—";

    const summary = {
        wave_id: waveId,
        generated_at: new Date().toISOString(),
        dry_run: dryRun,
        node_counts: {
            total: nodeStats.length,
            processed: processed.length,
            already_done: nodeStats.filter(r => r.status === "skipped_already_done").length,
            failed: failedCount,
        },
        kal: { converged: convergCount, thin_synthesis: thinCount, skipped: skipCount, error: failedCount },
        claims: {
            total_atomic: waveAtomicClaims.length,
            avg_per_node: parseFloat(avgClaims),
            explosion_nodes: claimExplosion.map(r => ({ slug: r.slug, count: r.claims })),
            collapse_nodes: claimCollapse.map(r => ({ slug: r.slug, count: r.claims })),
        },
        semantic: {
            total_checked: semTotal,
            supported: semSupp,
            uncertain: semUnc,
            unsupported: semUnsup,
            supported_pct: semPct(semSupp),
            uncertain_pct: semPct(semUnc),
            unsupported_pct: semPct(semUnsup),
            nodes_with_unsupported: nodeStats.filter(r => r.semantic_unsupported > 0).map(r => ({
                slug: r.slug,
                unsupported: r.semantic_unsupported,
                total: r.semantic_total,
            })),
        },
        failed_nodes: nodeStats.filter(r => r.status === "failed").map(r => ({ slug: r.slug, error: r.error })),
    };

    if (!dryRun) {
        writeFileSync(join(waveDir, "backfill-summary.json"), JSON.stringify(summary, null, 2));
    }

    // ── Console output ────────────────────────────────────────────────────────

    console.log(`\n${"═".repeat(60)}`);
    console.log(`  BACKFILL SUMMARY — Wave ${waveId}${dryRun ? " [DRY RUN]" : ""}`);
    console.log(`${"═".repeat(60)}`);
    console.log(`  Nodes       : ${summary.node_counts.total} total | ${summary.node_counts.processed} processed | ${summary.node_counts.already_done} already done | ${failedCount} failed`);
    console.log(`\n  KAL Results`);
    console.log(`    CONVERGED     : ${convergCount}`);
    console.log(`    THIN_SYNTHESIS: ${thinCount}`);
    console.log(`    SKIPPED       : ${skipCount}`);
    console.log(`\n  Atomic Claims`);
    console.log(`    Total         : ${waveAtomicClaims.length}`);
    console.log(`    Avg / node    : ${avgClaims}`);
    if (claimExplosion.length > 0) {
        console.log(`    ⚠️  Explosion (>50): ${claimExplosion.map(r => `${r.slug}(${r.claims})`).join(", ")}`);
    }
    if (claimCollapse.length > 0) {
        console.log(`    ⚠️  Collapse  (<3) : ${claimCollapse.map(r => `${r.slug}(${r.claims})`).join(", ")}`);
    }
    console.log(`\n  Semantic Verification (Derived-tier claims)`);
    console.log(`    Checked       : ${semTotal}`);
    console.log(`    Supported     : ${semSupp} (${semPct(semSupp)})`);
    console.log(`    Uncertain     : ${semUnc} (${semPct(semUnc)})`);
    console.log(`    Unsupported   : ${semUnsup} (${semPct(semUnsup)})`);
    if (summary.semantic.nodes_with_unsupported.length > 0) {
        console.log(`    ⚠️  Nodes with unsupported claims:`);
        for (const n of summary.semantic.nodes_with_unsupported) {
            console.log(`       ${n.slug}: ${n.unsupported}/${n.total} unsupported`);
        }
    }
    if (failedCount > 0) {
        console.log(`\n  ❌ Failed nodes:`);
        for (const n of summary.failed_nodes ?? []) {
            console.log(`     ${n.slug}: ${n.error}`);
        }
    }
    console.log(`${"═".repeat(60)}`);
    if (!dryRun) console.log(`\n  Artifacts written to: ${waveDir}`);
    if (dryRun)  console.log(`\n  [DRY RUN] No files were written.`);
}

run().catch(e => { console.error("Fatal:", e.message); process.exit(1); });
