import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { KnowledgeQueryEngine } from "../lib/knowledge-query";
import { SynthesisContextBuilder } from "../lib/synthesis-context";

console.log("🚀 Enumd Phase 4.8: Controlled Pilot Benchmarking...");

const KNOWLEDGE_DIR = join(process.cwd(), "knowledge");
const engine = new KnowledgeQueryEngine(
    join(KNOWLEDGE_DIR, "nodes.json"),
    join(KNOWLEDGE_DIR, "edges.json")
);

const allNodes = Array.from(engine.getAllEdges().map(e => e.source));
const uniqueNodes = [...new Set(allNodes)];

// 1. Identify Grey-Zone Samples (RECOVERABLE topology)
const pilotSamples: string[] = [];
for (const slug of uniqueNodes) {
    const neighbors = engine.getNeighbors(slug);
    const a = neighbors.filter(e => e.score >= 0.3).length;
    const b = neighbors.filter(e => e.score >= 0.22 && e.score < 0.3).length;

    if (a < 2 && b >= 2) {
        pilotSamples.push(slug);
    }
    if (pilotSamples.length >= 50) break;
}

console.log(`- Selected ${pilotSamples.length} nodes for the Grey-Zone Pilot Cluster.`);

const results = [];

for (const slug of pilotSamples) {
    const builder = new SynthesisContextBuilder(engine);
    const node = engine.getNode(slug);
    if (!node) continue;

    const audit = builder.probeTopology(node.slug);
    
    let recommendation: "AUTO_ACCEPT" | "HUMAN_REVIEW" = "HUMAN_REVIEW";
    let reason = "";

    const diversityDenied = audit.decision_guards?.diversity_denied || false;
    const integrityDenied = audit.decision_guards?.integrity_denied || false;

    if (diversityDenied || integrityDenied) {
        recommendation = "AUTO_ACCEPT";
        reason = "Guard successfully denied unstable policy switch.";
    } else if (audit.topology_status === "STABLE_AT_A") {
        recommendation = "AUTO_ACCEPT";
        reason = "Stable baseline reached.";
    } else if (audit.topology_status === "RECOVERABLE") {
        recommendation = "HUMAN_REVIEW";
        reason = "Broadened context - check for semantic noise.";
    }

    results.push({
        slug,
        topology: audit.topology_status,
        recommendation,
        reason,
        metrics: audit.outcome_metrics
    });
}

const outputPath = join(KNOWLEDGE_DIR, "pilot_trust_report.json");
writeFileSync(outputPath, JSON.stringify(results, null, 2));

const autoAcceptCount = results.filter(r => r.recommendation === "AUTO_ACCEPT").length;
const humanReviewCount = results.filter(r => r.recommendation === "HUMAN_REVIEW").length;

console.log("\n📊 Pilot Trust Results Summary");
console.log("------------------------------");
console.log(`Total Samples  : ${results.length}`);
console.log(`AUTO_ACCEPT    : ${autoAcceptCount} (${((autoAcceptCount/results.length)*100).toFixed(1)}%)`);
console.log(`HUMAN_REVIEW   : ${humanReviewCount} (${((humanReviewCount/results.length)*100).toFixed(1)}%)`);
console.log(`Trust Report   : ${outputPath}`);
