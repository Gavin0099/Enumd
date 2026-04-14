import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";
import { KnowledgeQueryEngine } from "../lib/knowledge-query";
import { SynthesisContextBuilder } from "../lib/synthesis-context";

console.log("🏅 Enumd Phase 4.9: Model Calibration Benchmark (A/B Audit)...");

const KNOWLEDGE_DIR = join(process.cwd(), "knowledge");
const CALIB_DIR = join(KNOWLEDGE_DIR, "calibration_v1");
mkdirSync(CALIB_DIR, { recursive: true });

const engine = new KnowledgeQueryEngine(
    join(KNOWLEDGE_DIR, "nodes.json"),
    join(KNOWLEDGE_DIR, "edges.json")
);
const builder = new SynthesisContextBuilder(engine);

const stratifiedSamples = [
    { slug: "mt9052", type: "Class A (Real RECOVERABLE)" },
    { slug: "憑證檔案", type: "Class A (Real RECOVERABLE)" },
    { slug: "mtk-3rd-send-usb-hub-isp-event", type: "Class A (Real RECOVERABLE)" },
    { slug: "mtk-scaler-update-flow", type: "Class A (Real RECOVERABLE)" },
    { slug: "p32p-30-reset-scaler-command", type: "Class A (Real RECOVERABLE)" },
    { slug: "secure-firmware-recovery", type: "Class B (Guarded/Borderline)" },
    { slug: "hp-mandatory-firmware-update-strategy-expansion-for-future-projects", type: "Class B (Guarded/Borderline)" },
    { slug: "2021部門創新提案", type: "Class B (HR/Category Shift)" },
    { slug: "synthetic-clash-noise-test", type: "Class C (Synthetic Noise)" },
    { slug: "synthetic-low-integrity-noise", type: "Class C (Synthetic Noise)" }
];

const reportRows = [];

for (const sample of stratifiedSamples) {
    console.log(`\n--- Calibrating Slug: ${sample.slug} (${sample.type}) ---`);
    
    const node = engine.getNode(sample.slug);
    if (!node) {
        console.error(`Error: Node ${sample.slug} not found.`);
        continue;
    }

    const auditData = builder.buildContext(sample.slug, { name: "adaptive", score_threshold: 0.22, related_limit: 5, max_dependency_depth: 2 }).audit;
    const noise = auditData.outcome_metrics?.noise_signal || "UNKNOWN";
    const topology = auditData.advisory?.topology_status || "UNKNOWN";

    const models = ["haiku", "sonnet"];
    const stats: any = {};

    for (const model of models) {
        console.log(`  > Running Model: ${model}...`);
        const targetDir = join(CALIB_DIR, sample.slug, model);
        mkdirSync(targetDir, { recursive: true });

        try {
            execSync(`npx tsx --env-file .env.local scripts/run-synthesis.ts "${sample.slug}" --policy=A --model=${model}`, { stdio: 'pipe' });
            
            // Collect results
            const synthA_Dir = join(KNOWLEDGE_DIR, "synthesis_A");
            const draft = readFileSync(join(synthA_Dir, "synthesis_draft.md"), "utf8");
            const audit = JSON.parse(readFileSync(join(synthA_Dir, "synthesis_prompt_dump.audit.json"), "utf8"));
            
            writeFileSync(join(targetDir, "synthesis.md"), draft);
            writeFileSync(join(targetDir, "audit.json"), JSON.stringify(audit, null, 2));
            
            stats[model] = {
                tokens: audit.model_used.includes("sonnet") ? "2x (approx)" : "1x", // simplified for report
                sentences: draft.split(/[.!?]+/).length
            };
        } catch (e: any) {
            console.error(`  ❌ Failed ${model}: ${e.message}`);
        }
    }

    reportRows.push({
        slug: sample.slug,
        type: sample.type,
        topology,
        noise,
        haiku_len: stats.haiku?.sentences || 0,
        sonnet_len: stats.sonnet?.sentences || 0,
        basePath: join("knowledge/calibration_v1", sample.slug)
    });
}

// Generate Report
let md = "# Model Calibration Benchmark Report (A/B Audit)\n\n";
md += "This report compares Claude 3 Haiku vs 3.5 Sonnet across stratified samples.\n\n";
md += "| Slug | Class | Topology | Noise | Haiku Sent. | Sonnet Sent. | Manual Winner | Over-synthesis? | Compare |\n";
md += "| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n";

for (const row of reportRows) {
    md += `| ${row.slug} | ${row.type.split(' ')[0]} | ${row.topology} | ${row.noise} | ${row.haiku_len} | ${row.sonnet_len} | [ ] | [ ] | [View A/B](${row.basePath}) |\n`;
}

md += "\n\n## Evaluation Instructions\n";
md += "1. Inspect each A/B pair.\n";
md += "2. Check for **Over-synthesis**: Did Sonnet create logical links that aren't in the raw context dump?\n";
md += "3. Decide the **Model Winner** for that specific condition.";

writeFileSync(join(CALIB_DIR, "calibration_report.md"), md);
console.log(`\n✅ Calibration Complete. Report at: ${join(CALIB_DIR, "calibration_report.md")}`);
