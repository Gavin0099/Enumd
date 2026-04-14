import { KnowledgeQueryEngine } from "../lib/knowledge-query";
import { SynthesisContextBuilder, DEFAULT_POLICY_A } from "../lib/synthesis-context";
import { GraphNode } from "../lib/knowledge-types";

console.log("🧪 Running RECOVERABLE Synthetic Stress Test...");

// 1. Create a Mock Engine that simulates a recoverable topology
class MockRecoverableEngine extends KnowledgeQueryEngine {
    constructor() {
        super("knowledge/nodes.json", "knowledge/edges.json");
    }

    // Override to return specific borderline scores
    public override rankRelated(nodeSlug: string, limit: number = 5): { node: GraphNode, score: number, type: string }[] {
        if (nodeSlug === "MockNode") {
            return [
                { node: { slug: "B", title: "Borderline B", body: "", integrity_band: "HIGH" } as GraphNode, score: 0.28, type: "related" },
                { node: { slug: "C", title: "Borderline C", body: "", integrity_band: "HIGH" } as GraphNode, score: 0.26, type: "related" },
                { node: { slug: "D", title: "Borderline D", body: "", integrity_band: "HIGH" } as GraphNode, score: 0.15, type: "related" }
            ];
        }
        return [];
    }
    
    public override getNode(slug: string): GraphNode | undefined {
        if (slug === "MockNode") return { slug: "MockNode", title: "Mock Target", body: "", integrity_band: "HIGH" } as GraphNode;
        return undefined;
    }

    public override getNeighbors(slug: string): any[] {
        return []; // Keep it simple
    }
}

const mockEngine = new MockRecoverableEngine();
const builder = new SynthesisContextBuilder(mockEngine as any);

console.log("\nProbing MockNode (No 0.3+ edges, 2 edges in 0.22-0.3 range)...");
const { audit } = builder.buildContext("MockNode", DEFAULT_POLICY_A);

console.log("\n--- Diagnostic Results ---");
console.log(`Status        : ${audit.advisory?.topology_status}`);
console.log(`Recommended   : ${audit.advisory?.recommended_policy}`);
console.log(`Reason        : ${audit.advisory?.reason}`);
console.log(`Borderline Cnt: ${audit.topology_signature?.borderline_count}`);
console.log(`Best Border   : ${audit.topology_signature?.best_borderline_score}`);

if (audit.advisory?.topology_status === "RECOVERABLE" && audit.advisory?.recommended_policy === "B") {
    console.log("\n✅ SUCCESS: Diagnostic correctly identified RECOVERABLE branch.");
} else {
    console.error("\n❌ FAILURE: Diagnostic failed to trigger RECOVERABLE branch.");
    process.exit(1);
}
