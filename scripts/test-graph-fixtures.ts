import { GraphNode } from "../lib/knowledge-types";
import { inferExplicitLinks, inferTagOverlap, dedupeAndRankEdges } from "../lib/knowledge-inference";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { KnowledgeQueryEngine } from "../lib/knowledge-query";

console.log("Running Strict Graph Inference Fixture Tests...\n");

// --- TEST 1: Deduplication Directionality ---
console.log("TEST 1: Deduplication Directionality");
const t1Nodes: GraphNode[] = [
    { id: "A", slug: "node-a", title: "Node A", path: "a.md", category: "test", domain_tags: ["d1"], task_tags: ["t1"], authority_level: "P0", notion_id: "A" },
    { id: "B", slug: "node-b", title: "Node B", path: "b.md", category: "test", domain_tags: ["d1"], task_tags: ["t1"], authority_level: "P0", notion_id: "B" }
];

// A -> B explicitly
const explicitAtoB = inferExplicitLinks(t1Nodes[0], t1Nodes, "Link to [B](./node-b)");
// B -> A explicitly
const explicitBtoA = inferExplicitLinks(t1Nodes[1], t1Nodes, "Link to [A](./node-a)");
// A <-> B implicitly via tags
const tagOverlapA = inferTagOverlap(t1Nodes[0], t1Nodes, { "t1": 2 }); 

const combinedEdges = [...explicitAtoB, ...explicitBtoA, ...tagOverlapA];
const dedupedEdges = dedupeAndRankEdges(combinedEdges);

const hasAtoB = dedupedEdges.some(e => e.source === "node-a" && e.target === "node-b" && e.type === "explicit_ref" && !e.bidirectional);
const hasBtoA = dedupedEdges.some(e => e.source === "node-b" && e.target === "node-a" && e.type === "explicit_ref" && !e.bidirectional);
const totalEdges = dedupedEdges.length;

if (hasAtoB && hasBtoA && totalEdges === 2) {
    console.log("  ✅ PASS: Directional edges are correctly isolated");
} else {
    console.error("  ❌ FAIL: Directionality lost during dedupe", dedupedEdges);
    process.exit(1);
}

// --- TEST 2: Score Calculation & Tag Thresholds ---
console.log("\nTEST 2: Score Normalization (TF-IDF Thresholding)");
const t2Edges = inferTagOverlap(t1Nodes[0], t1Nodes, { "t1": 2 });
if (t2Edges.length === 0) {
     // Score threshold is 1.5, Math.log(3 / 3) = 0 > fails
     console.log("  ✅ PASS: Hub tag effectively neutralized (score below threshold)");
} else {
     console.error("  ❌ FAIL: Score thresholding leak", t2Edges);
     process.exit(1);
}

// --- TEST 3: Query Engine Tracing ---
console.log("\nTEST 3: Query Engine Tracing");
const TEMP_DIR = join(__dirname, ".temp");
mkdirSync(TEMP_DIR, { recursive: true });
const nodesPath = join(TEMP_DIR, "nodes.json");
const edgesPath = join(TEMP_DIR, "edges.json");

writeFileSync(nodesPath, JSON.stringify(t1Nodes));
writeFileSync(edgesPath, JSON.stringify(dedupedEdges));

const queryEngine = new KnowledgeQueryEngine(nodesPath, edgesPath);
const deps = queryEngine.getDependencyChain("node-a", 2);
// node-a explicitly depends on node-b in dedupedEdges
if (deps.length > 0 && deps[0].some(n => n.slug === "node-b")) {
    console.log("  ✅ PASS: Dependency chain accurately traced");
} else {
    console.error("  ❌ FAIL: Dependency traceability broken", deps);
    process.exit(1);
}

console.log("\nAll fixtures passed.");
