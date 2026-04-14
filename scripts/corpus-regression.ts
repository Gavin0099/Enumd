import { KnowledgeQueryEngine } from "../lib/knowledge-query";
import { SynthesisContextBuilder, DEFAULT_POLICY_A } from "../lib/synthesis-context";
import { existsSync, writeFileSync } from "fs";
import { join } from "path";

console.log("🚀 Running Enumd Corpus-Wide Policy Regression Suite...\n");

const KNOWLEDGE_DIR = join(process.cwd(), "knowledge");
const nodesPath = join(KNOWLEDGE_DIR, "nodes.json");
const edgesPath = join(KNOWLEDGE_DIR, "edges.json");

if (!existsSync(nodesPath) || !existsSync(edgesPath)) {
    console.error("Required knowledge artifacts not found.");
    process.exit(1);
}

const queryEngine = new KnowledgeQueryEngine(nodesPath, edgesPath);
const contextBuilder = new SynthesisContextBuilder(queryEngine);

const targetSlugs = [
    "2021部門創新提案",
    "Flutter",
    "electron",
    "HP_Display_Firmware_Update_Specification",
    "OSDManager",
    "Log分類"
];

const results: any[] = [];

for (const slug of targetSlugs) {
    console.log(`Checking [${slug}]...`);
    const { audit } = contextBuilder.buildContext(slug, DEFAULT_POLICY_A);
    
    results.push({
        topic_slug: slug,
        timestamp: new Date().toISOString(),
        topology: audit.topology_signature,
        advisory: audit.advisory,
        actual_metrics: {
            related_count: audit.selected_related_count,
            edge_count: audit.total_context_edges
        }
    });
}

const reportPath = join(KNOWLEDGE_DIR, "policy_regression_report.json");
writeFileSync(reportPath, JSON.stringify(results, null, 2));

console.log(`\n✅ Regression Complete! Detailed evidence written to: ${reportPath}`);

console.log("\nSummary Table:");
console.table(results.map(r => ({
    Topic: r.topic_slug,
    Status: r.advisory.topology_status,
    Recommend: r.advisory.recommended_policy,
    Related: r.actual_metrics.related_count,
    "Best Borderline": r.topology.best_borderline_score.toFixed(2)
})));
