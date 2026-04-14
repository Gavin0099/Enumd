import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { KnowledgeQueryEngine } from "../lib/knowledge-query";
import { renderSynthesisBatch } from "./run-synthesis"; // Import logic if exported

console.log("🔥 Enumd Phase 4.9: Controlled Batch v1 - Launching Pilot...");

const KNOWLEDGE_DIR = join(process.cwd(), "knowledge");
const BATCH_DIR = join(KNOWLEDGE_DIR, "batch_v1");
mkdirSync(BATCH_DIR, { recursive: true });

const engine = new KnowledgeQueryEngine(
    join(KNOWLEDGE_DIR, "nodes.json"),
    join(KNOWLEDGE_DIR, "edges.json")
);

const nodes = JSON.parse(readFileSync(join(KNOWLEDGE_DIR, "nodes.json"), "utf8"));
const uniqueNodes = nodes.map((n: any) => n.slug);

// 1. Stratified Selection
const greyZone: string[] = [];
const stableZone: string[] = [];

for (const slug of uniqueNodes) {
    const neighbors = engine.getNeighbors(slug);
    const a = neighbors.filter(e => e.score >= 0.3).length;
    const b = neighbors.filter(e => e.score >= 0.22 && e.score < 0.3).length;

    if (a < 2 && b >= 2 && greyZone.length < 5) {
        greyZone.push(slug);
    } else if (a >= 3 && stableZone.length < 5) {
        stableZone.push(slug);
    }
    if (greyZone.length >= 5 && stableZone.length >= 5) break;
}

const finalBatch = [...greyZone, ...stableZone];
console.log(`- Selected ${finalBatch.length} nodes (Grey: ${greyZone.length}, Stable: ${stableZone.length})`);

// 2. Execution Loop
async function runBatch() {
    const manifest = [];
    let counter = 0;
    
    for (const slug of finalBatch) {
        counter++;
        console.log(`\n[${counter}/10] Synthesizing: ${slug}...`);
        
        // Using exec to run run-synthesis script to avoid duplicating complex LLM logic
        const { execSync } = require("child_process");
        try {
            execSync(`npx tsx --env-file .env.local scripts/run-synthesis.ts "${slug}" --policy=adaptive`, { stdio: 'inherit' });
            
            // Move result to batch dir for organization
            const synthDir = join(KNOWLEDGE_DIR, "synthesis_A"); // run-synthesis outputs here by default
            if (existsSync(synthDir)) {
                 const dest = join(BATCH_DIR, slug);
                 mkdirSync(dest, { recursive: true });
                 const fs = require("fs");
                 fs.renameSync(join(synthDir, "synthesis_draft.md"), join(dest, "synthesis.md"));
                 // Find the latest audit dump
                 const auditFile = join(synthDir, "synthesis_prompt_dump.audit.json");
                 if (fs.existsSync(auditFile)) {
                     fs.copyFileSync(auditFile, join(dest, "audit.json"));
                     const audit = JSON.parse(fs.readFileSync(auditFile, "utf8"));
                     manifest.push({
                         slug,
                         trust_level: audit.decision_basis?.pilot_evaluation?.trust_level || "UNKNOWN",
                         topology: audit.advisory?.topology_status,
                         path: join("knowledge/batch_v1", slug, "synthesis.md")
                     });
                 }
            }
        } catch (e) {
            console.error(`Failed to synthesize ${slug}:`, e);
        }
    }

    // 3. Generate Manifest
    let manifestMd = "# Controlled Batch v1 Review Manifest\n\n";
    manifestMd += "Please review the following 10 synthesis files and provide feedback.\n\n";
    manifestMd += "| Slug | Trust Level | Topology | Status | Action |\n";
    manifestMd += "| :--- | :--- | :--- | :--- | :--- |\n";
    
    for (const row of manifest) {
        manifestMd += `| ${row.slug} | **${row.trust_level}** | ${row.topology} | [ ] Unreviewed | [View](${row.path}) |\n`;
    }

    manifestMd += "\n\n## Feedback Command\nUse `npx tsx scripts/submit-feedback.ts --slug=<SLUG> --verdict=<CORRECT|MINOR_ISSUE|MAJOR_ISSUE>` to log your review.";
    
    writeFileSync(join(BATCH_DIR, "review_manifest.md"), manifestMd);
    console.log(`\n✅ Batch Complete. Manifest written to: ${join(BATCH_DIR, "review_manifest.md")}`);
}

runBatch();
