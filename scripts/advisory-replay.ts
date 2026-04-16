/**
 * Domain Advisory Replay — Slice 1 Instrumentation
 *
 * Runs verdict-neutral domain_advisory computation on existing artifacts
 * (source.xml, claims.json, audit.json) without calling any external API.
 *
 * Purpose: observe advisory signal behavior across an adversarial node mix,
 * and compute the three key observation metrics:
 *
 *   suppress_without_signal_count  — SUPPRESS/FLAG fired, no advisory signal (miss rate)
 *   signal_without_suppress_count  — advisory fired, no SUPPRESS/FLAG (over-signal rate)
 *   domain_advisory_by_type        — per-signal-type firing counts
 *
 * Usage:
 *   npx tsx --env-file .env.local scripts/advisory-replay.ts
 *   npx tsx --env-file .env.local scripts/advisory-replay.ts --wave=5,6
 *   npx tsx --env-file .env.local scripts/advisory-replay.ts --adversarial
 *
 * Flags:
 *   --wave=N[,M,...]  Run on all nodes in the specified wave(s)
 *   --adversarial     Run on the pre-defined adversarial node set (default)
 *   --all-waves       Run on all 6 waves (full corpus scan)
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { computeDomainAdvisory, DomainAdvisory } from "../lib/domain-advisory";
import { AtomicClaim } from "../lib/claim-store";

const PROD_DIR = join(process.cwd(), "knowledge", "production_v1");

// ─────────────────────────────────────────────────────────────────────────────
// Adversarial node set (from contract.md §6 replay checklist)
// ─────────────────────────────────────────────────────────────────────────────
const ADVERSARIAL_NODES: Array<{ wave: number; slug: string; group: string }> = [
    // Wave 5 — suppressed (node-specific, not domain bias)
    { wave: 5, slug: "lenovo-dmc", group: "cross_domain_suppressed" },
    { wave: 5, slug: "lenovo-one-key-update-tool-", group: "cross_domain_suppressed" },
    { wave: 5, slug: "linux-usb-hid-description", group: "cross_domain_suppressed" },

    // Wave 5 — AUDIT_FLAG
    { wave: 5, slug: "lenovo-offline-update-flow-", group: "cross_domain_flag" },
    { wave: 5, slug: "linux-mac-共code-", group: "cross_domain_flag" },

    // Wave 6 probe — cross-domain PASS (verified by probe)
    { wave: 6, slug: "tvsuthinkvantage-system-update-fwupdate需求", group: "cross_domain_pass" },
    { wave: 6, slug: "saleae-logic-i2c-tool-使用說明", group: "cross_domain_pass" },
    { wave: 6, slug: "zeroplus_lap-i2c-訊號錄製方式", group: "cross_domain_pass" },
    { wave: 6, slug: "xcode-architecture-設定", group: "cross_domain_pass" },
    { wave: 6, slug: "vmware-viclient-all-600-2502222-無法安裝-net-framework-35-問題-錯誤代碼-0x800f081f", group: "cross_domain_pass" },
    { wave: 6, slug: "vibe-coding", group: "cross_domain_pass" },
    { wave: 6, slug: "ssdlc-", group: "cross_domain_pass" },
    { wave: 6, slug: "teledyne-lecroy-python安裝和測試方式", group: "cross_domain_pass" },
    { wave: 6, slug: "outlook-封存失敗如何設定", group: "cross_domain_pass" },

    // Wave 6 — SUPPRESS / FLAG (list/reference type)
    { wave: 6, slug: "sw文件撰寫sop", group: "procedure_suppressed" },
    { wave: 6, slug: "tri-code-command-list", group: "list_ref_flag" },
    { wave: 6, slug: "vendor-oci-error-code-", group: "list_ref_flag" },
    { wave: 6, slug: "windows-11-core-isolation", group: "windows_flag" },

    // Windows-centric control (expected NONE advisory)
    { wave: 6, slug: "sc-query-to-determine-the-driver-mode", group: "windows_control" },
    { wave: 6, slug: "secure-firmware-recovery", group: "windows_control" },
    { wave: 6, slug: "tool-sign-flow", group: "windows_control" },
    { wave: 6, slug: "usb-device-class", group: "windows_control" },
    { wave: 6, slug: "usb31-ch10-hub-host-downstream-port-and-device-upstream-port-specification", group: "windows_control" },
];

interface NodeResult {
    wave: number;
    slug: string;
    group: string;
    suppression_tier: string;
    advisory: DomainAdvisory;
    claim_count: number;
}

function loadNode(wave: number, slug: string): {
    sourceXml: string;
    claims: AtomicClaim[];
    suppressionTier: string;
    unsupportedRatio: number;
    derivedCount: number;
} | null {
    const nodeDir = join(PROD_DIR, `wave_${wave}`, slug);
    if (!existsSync(nodeDir)) {
        console.warn(`  ⚠️  Not found: wave_${wave}/${slug}`);
        return null;
    }

    const sourceXml = readFileSync(join(nodeDir, "source.xml"), "utf8");
    const claimsPath = join(nodeDir, "claims.json");
    const claims: AtomicClaim[] = existsSync(claimsPath)
        ? JSON.parse(readFileSync(claimsPath, "utf8"))
        : [];

    const audit = JSON.parse(readFileSync(join(nodeDir, "audit.json"), "utf8"));
    const sd = audit.suppression_decision || {};

    return {
        sourceXml,
        claims,
        suppressionTier: sd.tier || "PASS",
        unsupportedRatio: sd.unsupported_ratio ?? 0,
        derivedCount: sd.derived_count ?? 0,
    };
}

function getWaveNodes(waveNum: number): Array<{ wave: number; slug: string; group: string }> {
    const waveDir = join(PROD_DIR, `wave_${waveNum}`);
    if (!existsSync(waveDir)) return [];

    const { readdirSync, statSync } = require("fs");
    return readdirSync(waveDir)
        .filter((d: string) => {
            try { return statSync(join(waveDir, d)).isDirectory(); } catch { return false; }
        })
        .map((slug: string) => ({ wave: waveNum, slug, group: "full_wave" }));
}

async function run() {
    const args = process.argv.slice(2);
    const allWaves = args.includes("--all-waves");
    const waveArg = args.find(a => a.startsWith("--wave="))?.split("=")[1];

    let nodes: Array<{ wave: number; slug: string; group: string }>;

    if (allWaves) {
        nodes = [1, 2, 3, 4, 5, 6].flatMap(w => getWaveNodes(w));
        console.log(`\n🔬 Advisory Replay — full corpus (${nodes.length} nodes across 6 waves)`);
    } else if (waveArg) {
        const waveNums = waveArg.split(",").map(Number);
        nodes = waveNums.flatMap(w => getWaveNodes(w));
        console.log(`\n🔬 Advisory Replay — wave(s) ${waveArg} (${nodes.length} nodes)`);
    } else {
        nodes = ADVERSARIAL_NODES;
        console.log(`\n🔬 Advisory Replay — adversarial set (${nodes.length} nodes)`);
    }

    const results: NodeResult[] = [];

    for (const node of nodes) {
        const data = loadNode(node.wave, node.slug);
        if (!data) continue;

        const advisory = computeDomainAdvisory(
            node.slug,
            data.sourceXml,
            data.claims,
            {
                tier: data.suppressionTier,
                unsupported_ratio: data.unsupportedRatio,
                derived_count: data.derivedCount,
            }
        );

        // Update audit.json with domain_advisory (in-place, verdict-neutral)
        const auditPath = join(PROD_DIR, `wave_${node.wave}`, node.slug, "audit.json");
        const audit = JSON.parse(readFileSync(auditPath, "utf8"));
        audit.domain_advisory = advisory;
        writeFileSync(auditPath, JSON.stringify(audit, null, 2));

        results.push({
            wave: node.wave,
            slug: node.slug,
            group: node.group,
            suppression_tier: data.suppressionTier,
            advisory,
            claim_count: data.claims.length,
        });

        const tierIcon = data.suppressionTier === "SUPPRESS_DERIVED" ? "🚫"
            : data.suppressionTier === "AUDIT_FLAG" ? "🚩"
            : "✅";
        const riskIcon = advisory.risk_level === "NONE" ? "·"
            : advisory.risk_level === "LOW" ? "⚡"
            : advisory.risk_level === "MODERATE" ? "⚠️ "
            : "🔴";
        console.log(
            `  ${tierIcon} ${riskIcon} [${node.group.padEnd(24)}] ${node.slug.slice(0, 45).padEnd(46)}`
            + ` overlap=${advisory.corpus_overlap_score.toFixed(2)}`
            + ` signals=[${advisory.signals.join(",")}]`
        );
    }

    // ─── Three observation metrics ────────────────────────────────────────────
    const suppressed = results.filter(r =>
        r.suppression_tier === "SUPPRESS_DERIVED" || r.suppression_tier === "AUDIT_FLAG"
    );
    const signaled = results.filter(r => r.advisory.risk_level !== "NONE");

    const suppress_without_signal = suppressed.filter(r => r.advisory.risk_level === "NONE");
    const signal_without_suppress = signaled.filter(r =>
        r.suppression_tier !== "SUPPRESS_DERIVED" && r.suppression_tier !== "AUDIT_FLAG"
    );

    const advisory_by_type: Record<string, number> = {};
    for (const r of results) {
        for (const sig of r.advisory.signals) {
            advisory_by_type[sig] = (advisory_by_type[sig] || 0) + 1;
        }
    }

    const report = {
        generated_at: new Date().toISOString(),
        instrumentation_version: "1.0",
        nodes_processed: results.length,
        // ── Three observation metrics ──────────────────────────────────────
        suppress_without_signal_count: suppress_without_signal.length,
        signal_without_suppress_count: signal_without_suppress.length,
        domain_advisory_by_type: advisory_by_type,
        // ── Breakdown ─────────────────────────────────────────────────────
        suppressed_count: suppressed.length,
        signaled_count: signaled.length,
        suppress_without_signal: suppress_without_signal.map(r => ({
            slug: r.slug, group: r.group, suppression_tier: r.suppression_tier, corpus_overlap: r.advisory.corpus_overlap_score
        })),
        signal_without_suppress: signal_without_suppress.map(r => ({
            slug: r.slug, group: r.group, risk_level: r.advisory.risk_level, signals: r.advisory.signals
        })),
        all_results: results.map(r => ({
            wave: r.wave, slug: r.slug, group: r.group,
            suppression_tier: r.suppression_tier,
            risk_level: r.advisory.risk_level,
            signals: r.advisory.signals,
            corpus_overlap_score: r.advisory.corpus_overlap_score,
            claim_count: r.claim_count,
        })),
    };

    const reportPath = join(PROD_DIR, "advisory-replay-report.json");
    writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // ── Console summary ────────────────────────────────────────────────────
    console.log("\n" + "─".repeat(70));
    console.log(`📊 Advisory Replay Summary`);
    console.log(`─`.repeat(70));
    console.log(`  Nodes processed:             ${results.length}`);
    console.log(`  Suppressed/flagged:          ${suppressed.length}`);
    console.log(`  Advisory signaled:           ${signaled.length}`);
    console.log(``);
    console.log(`  🔑 suppress_without_signal:  ${suppress_without_signal.length}  ← miss rate (lower = better)`);
    console.log(`  🔔 signal_without_suppress:  ${signal_without_suppress.length}  ← over-signal rate (lower = better)`);
    console.log(``);
    console.log(`  Advisory by type:`);
    for (const [sig, count] of Object.entries(advisory_by_type).sort((a, b) => b[1] - a[1])) {
        console.log(`    ${sig.padEnd(35)} ${count}`);
    }
    if (suppress_without_signal.length > 0) {
        console.log(`\n  ⚠️  Missed suppression events (no advisory fired):`);
        suppress_without_signal.forEach(r =>
            console.log(`    [${r.suppression_tier}] ${r.slug} (overlap=${r.advisory.corpus_overlap_score.toFixed(2)})`)
        );
    }
    if (signal_without_suppress.length > 0) {
        console.log(`\n  ⚡ Over-signal events (advisory fired, no suppression):`);
        signal_without_suppress.forEach(r =>
            console.log(`    [${r.advisory.risk_level}] ${r.slug} signals=[${r.advisory.signals.join(",")}]`)
        );
    }
    console.log(`\n  Report → ${reportPath}`);
    console.log(`─`.repeat(70));
}

run().catch(console.error);
