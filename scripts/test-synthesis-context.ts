import { KnowledgeQueryEngine } from "../lib/knowledge-query";
import { SynthesisContextBuilder, DEFAULT_POLICY_A } from "../lib/synthesis-context";
import { existsSync, writeFileSync } from "fs";
import { join } from "path";

console.log("Running Updated Synthesis Context Assembly Test (Policy-Aware)...\n");

const KNOWLEDGE_DIR = join(process.cwd(), "knowledge");
const nodesPath = join(KNOWLEDGE_DIR, "nodes.json");
const edgesPath = join(KNOWLEDGE_DIR, "edges.json");

if (!existsSync(nodesPath) || !existsSync(edgesPath)) {
    console.error("Required knowledge artifacts not found. Please run 'npm run build:graph' first.");
    process.exit(1);
}

const queryEngine = new KnowledgeQueryEngine(nodesPath, edgesPath);
const contextBuilder = new SynthesisContextBuilder(queryEngine);

let targetSlug = process.argv[2];
if (!targetSlug) {
   const allNodes = Array.from(queryEngine['nodes'].values());
   targetSlug = allNodes[0]?.slug || "unknown";
}

targetSlug = targetSlug.split(/[\\/]/).pop()?.replace(".md", "") || targetSlug;

console.log(`Building context snapshot for topic: ${targetSlug}`);
console.log(`Using Policy: ${DEFAULT_POLICY_A.name} (Threshold: ${DEFAULT_POLICY_A.score_threshold})`);

const { context, audit } = contextBuilder.buildContext(targetSlug, DEFAULT_POLICY_A);

// Output
const snapshotPath = join(KNOWLEDGE_DIR, "synthesis_snapshot.json");
const auditPath = join(KNOWLEDGE_DIR, "synthesis_snapshot.audit.json");

writeFileSync(snapshotPath, JSON.stringify(context, null, 2));
writeFileSync(auditPath, JSON.stringify(audit, null, 2));

console.log("\nResults:");
console.log(`- Topology Status: ${audit.advisory?.topology_status}`);
console.log(`- Core Topics: ${context.coreTopics.length}`);
console.log(`- Dependencies: ${context.dependencies.length}`);
console.log(`- Related Contexts: ${context.relatedContext.length}`);
console.log(`- Context Edges: ${context.contextEdges.length}`);

// Assertions for verification
console.log("\nRunning Assertions...");
let passed = true;

// 1. No duplicate slugs
const allIds = [
    ...context.coreTopics.map(n => n.slug),
    ...context.dependencies.map(n => n.slug),
    ...context.relatedContext.map(n => n.slug)
];
const idSet = new Set(allIds);
if (idSet.size !== allIds.length) {
    console.error("❌ FAIL: Duplicate slugs found across Selection Categories.");
    passed = false;
} else {
    console.log("✅ PASS: No duplicate slugs.");
}

// 2. Advisory metadata check
if (!audit.advisory || !audit.topology_signature) {
    console.error("❌ FAIL: Missing Advisory or Topology Signature in Audit contract.");
    passed = false;
} else {
    console.log(`✅ PASS: Advisory present (${audit.advisory.topology_status}).`);
}

// 3. No dangling edges
const danglingEdges = context.contextEdges.filter(e => !idSet.has(e.source) || !idSet.has(e.target));
if (danglingEdges.length > 0) {
    console.error("❌ FAIL: Context contains dangling edges!");
    passed = false;
} else {
    console.log("✅ PASS: ContextEdges are closed.");
}

if (!passed) {
    process.exit(1);
} else {
    console.log("\nContract validation passed.");
}
