import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";
import * as crypto from "crypto";
import { KnowledgeQueryEngine } from "../lib/knowledge-query";
import { SynthesisContextBuilder } from "../lib/synthesis-context";

/**
 * Enumd Production Wave Runner (v1)
 * Logic: Honest Haiku-only batch synthesis with reproducible lockfiles.
 */

const KNOWLEDGE_DIR = join(process.cwd(), "knowledge");
const PROD_DIR = join(KNOWLEDGE_DIR, "production_v1");
mkdirSync(PROD_DIR, { recursive: true });

const WAVE_SIZE = 50;

async function run() {
    console.log("🚀 Initializing Enumd Production Wave Runner (v1)...");

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
    const engine = new KnowledgeQueryEngine(join(KNOWLEDGE_DIR, "nodes.json"), join(KNOWLEDGE_DIR, "edges.json"));
    const allNodes = JSON.parse(readFileSync(join(KNOWLEDGE_DIR, "nodes.json"), "utf8"));
    const sortedNodes = allNodes.sort((a, b) => a.slug.localeCompare(b.slug));
    
    const waves = [];
    for (let i = 0; i < sortedNodes.length; i += WAVE_SIZE) {
        waves.push(sortedNodes.slice(i, i + WAVE_SIZE));
    }

    const waveIndexArg = process.argv.find(a => a.startsWith("--wave="))?.split("=")[1];
    if (!waveIndexArg) {
        console.log(`\nInventory: ${allNodes.length} nodes Split into ${waves.length} waves.`);
        console.log("Usage: npx tsx scripts/production-wave-runner.ts --wave=[1-8]");
        process.exit(0);
    }

    const currentWaveIdx = parseInt(waveIndexArg) - 1;
    const currentNodes = waves[currentWaveIdx];
    const waveDir = join(PROD_DIR, `wave_${currentWaveIdx + 1}`);
    mkdirSync(waveDir, { recursive: true });

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
    const builder = new SynthesisContextBuilder(engine);

    for (let i = 0; i < currentNodes.length; i++) {
        const node = currentNodes[i];
        console.log(`\n[${i + 1}/${currentNodes.length}] Producing: ${node.slug}...`);
        
        const dest = join(waveDir, node.slug);
        mkdirSync(dest, { recursive: true });

        try {
            // Force policy A (STABLE) for production v1
            execSync(`npx tsx --env-file .env.local scripts/run-synthesis.ts "${node.slug}" --policy=A --model=haiku`, { stdio: 'pipe' });
            
            const synthDir = join(KNOWLEDGE_DIR, "synthesis_A");
            const draft = readFileSync(join(synthDir, "synthesis_draft.md"), "utf8");
            const audit = JSON.parse(readFileSync(join(synthDir, "synthesis_prompt_dump.audit.json"), "utf8"));

            // Inject governance fields
            audit.batch_id = BATCH_ID;
            audit.wave_id = currentWaveIdx + 1;
            audit.synthesis_code_hash = codeHash;

            writeFileSync(join(dest, "synthesis.md"), draft);
            writeFileSync(join(dest, "audit.json"), JSON.stringify(audit, null, 2));

            manifest.push({
                slug: node.slug,
                topology: audit.advisory.topology_status,
                trust: audit.decision_basis?.pilot_evaluation?.trust_level || "UNKNOWN",
                noise: audit.outcome_metrics.noise_signal
            });
        } catch (e: any) {
            console.error(`  ❌ Failed: ${e.message}`);
        }
    }

    // 5. Manifest generation
    let manifestMd = `# Wave ${currentWaveIdx + 1} Manifest\n\n`;
    manifestMd += "| Slug | Topology | Trust | Noise | Review |\n";
    manifestMd += "| :--- | :--- | :--- | :--- | :--- |\n";
    for (const m of manifest) {
        manifestMd += `| ${m.slug} | ${m.topology} | ${m.trust} | ${m.noise} | [ ] |\n`;
    }
    writeFileSync(join(waveDir, "manifest.md"), manifestMd);

    console.log(`\n✅ Wave ${currentWaveIdx + 1} Complete. Manifest written to ${waveDir}`);
}

run();
