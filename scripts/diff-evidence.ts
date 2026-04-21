import { readFileSync, existsSync } from "fs";
import { ExtractionSignal } from "../lib/signals";

/**
 * PHASE 4: EVIDENCE DIFF TOOL (v2.4)
 * 
 * Compares two extraction signals (old vs new) and highlights 
 * semantic regressions or improvements.
 */

function compareSignals(pathA: string, pathB: string) {
  if (!existsSync(pathA) || !existsSync(pathB)) {
    console.error("❌ Error: One or both signal files do not exist.");
    process.exit(1);
  }

  const signalA: ExtractionSignal = JSON.parse(readFileSync(pathA, "utf8"));
  const signalB: ExtractionSignal = JSON.parse(readFileSync(pathB, "utf8"));

  console.log(`=== Evidence Diff: ${signalA.source.page_id} ===`);
  console.log(`Base: v${signalA.metadata.extractor_version} (${signalA.metadata.timestamp})`);
  console.log(`Target: v${signalB.metadata.extractor_version} (${signalB.metadata.timestamp})`);
  console.log("-------------------------------------------\n");

  // 1. Block Metric Changes
  console.log("Block Rendering Diffs:");
  const allTypes = new Set([
    ...Object.keys(signalA.metrics.blocks),
    ...Object.keys(signalB.metrics.blocks)
  ]);

  allTypes.forEach(type => {
    const a = signalA.metrics.blocks[type] || { seen: 0, fully_rendered: 0, degraded_rendered: 0, dropped: 0 };
    const b = signalB.metrics.blocks[type] || { seen: 0, fully_rendered: 0, degraded_rendered: 0, dropped: 0 };

    const diffs: string[] = [];
    if (a.seen !== b.seen) diffs.push(`Seen: ${a.seen} → ${b.seen}`);
    if (a.fully_rendered !== b.fully_rendered) diffs.push(`Fully: ${a.fully_rendered} → ${b.fully_rendered}`);
    if (a.degraded_rendered !== b.degraded_rendered) diffs.push(`Degraded: ${a.degraded_rendered} → ${b.degraded_rendered}`);
    if (a.dropped !== b.dropped) diffs.push(`Dropped: ${a.dropped} → ${b.dropped}`);

    if (diffs.length > 0) {
      const prefix = b.fully_rendered > a.fully_rendered ? "✅" : (b.fully_rendered < a.fully_rendered ? "❌ REGRESSION" : "ℹ️");
      console.log(`${prefix} [${type}]: ${diffs.join(", ")}`);
    }
  });

  // 2. Fidelity Changes
  console.log("\nFidelity Diffs:");
  const formatTypes = new Set([
    ...Object.keys(signalA.fidelity.rich_text),
    ...Object.keys(signalB.fidelity.rich_text)
  ]);

  formatTypes.forEach(type => {
    const a = signalA.fidelity.rich_text[type] || { total: 0, preserved: 0 };
    const b = signalB.fidelity.rich_text[type] || { total: 0, preserved: 0 };

    if (a.total !== b.total || a.preserved !== b.preserved) {
        const aRate = a.total > 0 ? (a.preserved / a.total * 100).toFixed(1) : "0";
        const bRate = b.total > 0 ? (b.preserved / b.total * 100).toFixed(1) : "0";
        const prefix = Number(bRate) > Number(aRate) ? "✅" : (Number(bRate) < Number(aRate) ? "❌" : "ℹ️");
        console.log(`${prefix} [${type}]: ${aRate}% preserved → ${bRate}% preserved`);
    }
  });

  // 3. Validation Regressions
  const newRegressions = (signalB.metadata.validation?.core_support_regressions || []).filter(
    (r: string) => !(signalA.metadata.validation?.core_support_regressions || []).includes(r)
  );

  if (newRegressions.length > 0) {
    console.log("\n⚠️ NEW REGRESSIONS DETECTED:");
    newRegressions.forEach((r: string) => console.log(`  - ${r}: Fully supported type now failing to render.`));
  }

  console.log("\nDiff Complete.");
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.log("Usage: tsx scripts/diff-evidence.ts <base_signal.json> <target_signal.json>");
} else {
  compareSignals(args[0], args[1]);
}
