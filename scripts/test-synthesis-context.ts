import { KnowledgeQueryEngine } from "../lib/knowledge-query";
import { SynthesisContextBuilder } from "../lib/synthesis-context";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

console.log("Running Deterministic Synthesis Context Assembly Test...\n");

const KNOWLEDGE_DIR = join(process.cwd(), "knowledge");
const nodesPath = join(KNOWLEDGE_DIR, "nodes.json");
const edgesPath = join(KNOWLEDGE_DIR, "edges.json");

if (!existsSync(nodesPath) || !existsSync(edgesPath)) {
    console.error("Required knowledge artifacts not found. Please run 'npm run build:graph' first.");
    process.exit(1);
}

const queryEngine = new KnowledgeQueryEngine(nodesPath, edgesPath);
const contextBuilder = new SynthesisContextBuilder(queryEngine);

// Ensure we have a valid test slug. Let's pick the first node with some edges as an example,
// or just provide one from args.
let targetSlug = process.argv[2];
if (!targetSlug) {
   const allNodes = Array.from(queryEngine['nodes'].values());
   // Try to find a node that has explicitly links if possible
   targetSlug = allNodes[0]?.slug || "unknown";
}

console.log(`Building context snapshot for topic: ${targetSlug}`);

const { context, audit } = contextBuilder.buildContext(targetSlug, 3);

// Output
const snapshotPath = join(KNOWLEDGE_DIR, "synthesis_snapshot.json");
const auditPath = join(KNOWLEDGE_DIR, "synthesis_snapshot.audit.json");

writeFileSync(snapshotPath, JSON.stringify(context, null, 2));
writeFileSync(auditPath, JSON.stringify(audit, null, 2));

console.log("\nResults:");
console.log(`- Core Topics: ${context.coreTopics.length}`);
console.log(`- Dependencies: ${context.dependencies.length}`);
console.log(`- Related Contexts: ${context.relatedContext.length}`);
console.log(`- Context Edges: ${context.contextEdges.length}`);
if (context.warnings.length > 0) {
    console.log(`- Warnings: \n  ${context.warnings.join("\n  ")}`);
}

console.log("\nAudit saved to: " + auditPath);
console.log("Snapshot saved to: " + snapshotPath);

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
    console.log("✅ PASS: No duplicate slugs across Core, Dependencies, and Related.");
}

// 2. No LOW integrity in related
const hasLowRelated = context.relatedContext.some(n => n.integrity_band === "LOW");
if (hasLowRelated) {
    console.error("❌ FAIL: LOW integrity node leaked into RelatedContext.");
    passed = false;
} else {
    console.log("✅ PASS: No LOW integrity in RelatedContext.");
}

// 3. No dangling edges
const danglingEdges = context.contextEdges.filter(e => !idSet.has(e.source) || !idSet.has(e.target));
if (danglingEdges.length > 0) {
    console.error("❌ FAIL: Context contains dangling edges!");
    passed = false;
} else {
    console.log("✅ PASS: ContextEdges are completely closed within the sub-graph.");
}

if (!passed) {
    process.exit(1);
} else {
    console.log("\nAll context boundary rules passed.");
}
