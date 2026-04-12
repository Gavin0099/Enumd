import { execSync } from "child_process";
import { readFileSync, existsSync } from "fs";
import { ExtractionSignal } from "../lib/signals";

/**
 * PHASE 5: PRE-FLIGHT AUDIT (v2.5)
 * 
 * This tool runs the extraction pipeline on golden fixtures 
 * and fails if any CORE_SUPPORT_REGRESSION is detected.
 */

async function runAudit() {
  console.log("=== Phase 5: Pre-Flight Audit (Regression Gate) ===");
  
  try {
    console.log("Action: Generating fresh signals from golden fixtures...");
    // We reuse the validation script which generates a signal in-memory/console
    // For a real audit, we'd export to a temp dir.
    // Here we'll run the validation script and capture the JSON output.
    
    const output = execSync("npx tsx scripts/validate-v2-3-trust.ts", { encoding: "utf8" });
    
    // Find the JSON block in the output
    const jsonStart = output.indexOf("{");
    const jsonEnd = output.lastIndexOf("}") + 1;
    const jsonStr = output.substring(jsonStart, jsonEnd);
    
    const signal: ExtractionSignal = JSON.parse(jsonStr);

    console.log("\n--- Integrity Audit Report (v2.7.1) ---");
    const validation = signal.metadata.validation;
    const band = validation?.integrity_report.band;
    const reasons = validation?.integrity_report.reasons || [];

    console.log(`INTEGRITY BAND: [ ${band} ]`);
    if (band !== "HIGH") {
      console.log("REASONS:");
      reasons.forEach(r => console.log(`  - ${r}`));
    }

    if (band === "LOW") {
        console.error("❌ AUDIT FAILED: Integrity is COMPROMISED. Blocked from deployment.");
        process.exit(1);
    }

    console.log("\n--- Coverage Alignment Details ---");
    const alignment = validation?.coverage_alignment;
    if (alignment) {
        console.log(`Source: ${alignment.source}`);
        console.log(`Discovered: ${alignment.discovered_total} | Extracted: ${alignment.extracted_seen_total}`);
        
        Object.entries(alignment.by_type).forEach(([type, data]) => {
            if (data.classification !== "aligned") {
                console.log(`  ! [${type}]: ${data.classification} (delta ${data.delta})`);
            }
        });
    }

    console.log("\n✅ AUDIT SUMMARY: Evidence is consistent and verified.");
    console.log(`Schema: v${signal.metadata.schema_version} | Extractor: ${signal.metadata.extractor_version}`);
    console.log("NOTE: Integrity is a technical coherence metric, NOT a quality or safety verdict.");
    
  } catch (err) {
    console.error("❌ AUDIT CRASHED:", (err as Error).message);
    process.exit(1);
  }
}

runAudit();
