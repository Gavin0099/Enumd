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

async function run() {
    const nodeDirs = getNodeDirs(waveDir);
    console.log(`\n🔄 Backfilling Wave ${waveId} audit data (${nodeDirs.length} nodes)${dryRun ? " [DRY RUN]" : ""}...`);
    console.log(`   KAL + Semantic + Claims — no re-synthesis\n`);

    const waveAtomicClaims: AtomicClaim[] = [];
    const manifestRows: { slug: string; topology: string; trust: string; noise: string; kal: string; claims: number }[] = [];

    let kalConverged = 0, kalThin = 0, kalSkipped = 0;
    let semanticUnsupported = 0;

    for (let i = 0; i < nodeDirs.length; i++) {
        const slug = nodeDirs[i];
        const nodeDir = join(waveDir, slug);
        console.log(`[${i + 1}/${nodeDirs.length}] ${slug}`);

        const synthesis = readText(join(nodeDir, "synthesis.md"));
        const sourceXml = readText(join(nodeDir, "source.xml"));
        const audit = JSON.parse(readText(join(nodeDir, "audit.json")) || "{}") as Record<string, any>;

        // Skip if already backfilled
        if (audit.kal_report) {
            console.log(`   ⏭️  Already has kal_report — skipping`);
            // Still collect for aggregate
            const existingClaims: AtomicClaim[] = existsSync(join(nodeDir, "claims.json"))
                ? JSON.parse(readFileSync(join(nodeDir, "claims.json"), "utf8"))
                : [];
            waveAtomicClaims.push(...existingClaims);
            manifestRows.push({
                slug,
                topology: String(audit.advisory?.topology_status ?? "?"),
                trust: String((audit.decision_basis as any)?.pilot_evaluation?.trust_level ?? "UNKNOWN"),
                noise: String(audit.outcome_metrics?.noise_signal ?? "?"),
                kal: String((audit.kal_report as any)?.verdict ?? "?"),
                claims: existingClaims.length,
            });
            continue;
        }

        // 1. Reconstruct enforcement verdicts from existing synthesis + source
        const { report } = enforceDraft(synthesis, sourceXml);

        // 2. KAL check
        const kalResult = await runKalCheck(slug, synthesis, anthropic);
        if (kalResult.verdict === "CONVERGED") { kalConverged++; console.log(`   ✅ KAL: ${kalResult.passed}/${kalResult.total} → CONVERGED`); }
        else if (kalResult.verdict === "THIN_SYNTHESIS") { kalThin++; console.log(`   ⚠️  KAL: ${kalResult.passed}/${kalResult.total} → THIN_SYNTHESIS`); }
        else { kalSkipped++; console.log(`   ⏭️  KAL: SKIPPED — ${kalResult.skip_reason}`); }

        // 3. Semantic scoring
        const semanticReport = await runSemanticScoring(report.verdicts, sourceXml, anthropic);
        if (!semanticReport.skipped) {
            const flag = semanticReport.unsupported > 0 ? "⚠️ " : "✅";
            console.log(`   ${flag} SEMANTIC: ${semanticReport.supported}/${semanticReport.total_checked} Derived confirmed (${semanticReport.unsupported} unsupported)`);
            if (semanticReport.unsupported > 0) semanticUnsupported++;
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

        manifestRows.push({
            slug,
            topology: String(audit.advisory?.topology_status ?? "?"),
            trust: String((audit.decision_basis as any)?.pilot_evaluation?.trust_level ?? "UNKNOWN"),
            noise: String(audit.outcome_metrics?.noise_signal ?? "?"),
            kal: kalResult.verdict,
            claims: nodeClaims.length,
        });
    }

    // 6. Write wave-level atomic-claims.json
    if (!dryRun) {
        writeFileSync(join(waveDir, "atomic-claims.json"), JSON.stringify(waveAtomicClaims, null, 2));
    }
    console.log(`\n📦 Atomic Claims: ${waveAtomicClaims.length} total`);

    // 7. Update manifest.md
    const thinCount = manifestRows.filter(r => r.kal === "THIN_SYNTHESIS").length;
    const convergCount = manifestRows.filter(r => r.kal === "CONVERGED").length;
    const skipCount = manifestRows.filter(r => r.kal === "SKIPPED").length;

    let md = `# Wave ${waveId} Manifest\n\n`;
    md += `> KAL summary: ${convergCount} CONVERGED, ${thinCount} THIN_SYNTHESIS, ${skipCount} SKIPPED\n\n`;
    md += "| Slug | Topology | Trust | Noise | KAL | Claims | Review |\n";
    md += "| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n";
    for (const r of manifestRows) {
        const kalIcon = r.kal === "CONVERGED" ? "✅" : r.kal === "THIN_SYNTHESIS" ? "⚠️" : r.kal === "SKIPPED" ? "⏭️" : "❓";
        md += `| ${r.slug} | ${r.topology} | ${r.trust} | ${r.noise} | ${kalIcon} ${r.kal} | ${r.claims} | [ ] |\n`;
    }

    if (!dryRun) {
        writeFileSync(join(waveDir, "manifest.md"), md);
    }

    // Summary
    console.log(`\n✅ Backfill complete (Wave ${waveId})`);
    console.log(`   KAL: ${kalConverged} CONVERGED, ${kalThin} THIN_SYNTHESIS, ${kalSkipped} SKIPPED`);
    console.log(`   Semantic: ${semanticUnsupported} nodes had unsupported Derived claims`);
    console.log(`   Claims: ${waveAtomicClaims.length} verified atomic claims`);
    if (dryRun) console.log(`\n   [DRY RUN] No files were written.`);
}

run().catch(e => { console.error("Fatal:", e.message); process.exit(1); });
