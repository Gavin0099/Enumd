import { KnowledgeQueryEngine } from "../lib/knowledge-query";
import { SynthesisContextBuilder, DEFAULT_POLICY_A } from "../lib/synthesis-context";
import { GraphNode } from "../lib/knowledge-types";

console.log("🧪 Testing Enumd Decision System Invariants...");

// --- Case 1: Low Diversity Denial ---
class LowDiversityEngine extends KnowledgeQueryEngine {
    constructor() { super("knowledge/nodes.json", "knowledge/edges.json"); }
    public override rankRelated(nodeSlug: string): any[] {
        if (nodeSlug === "GuardTest") {
            return [
                { node: { slug: "B1", title: "B1", category: "Cat1", integrity_band: "HIGH" } as GraphNode, score: 0.28, type: "related" },
                { node: { slug: "B2", title: "B2", category: "Cat1", integrity_band: "HIGH" } as GraphNode, score: 0.26, type: "related" },
                { node: { slug: "B3", title: "B3", category: "Cat1", integrity_band: "HIGH" } as GraphNode, score: 0.24, type: "related" }
            ];
        }
        return [];
    }
    public override getNode(slug: string): any { return { slug, title: slug, category: "Cat1", integrity_band: "HIGH" }; }
    public override getNeighbors(): any[] { return []; }
}

const engine1 = new LowDiversityEngine();
const builder1 = new SynthesisContextBuilder(engine1 as any);

console.log("\nScenario 1: RECOVERABLE topology but ALL nodes are from 'Cat1' (Cluster Overfit)");
const { audit: audit1 } = builder1.buildContext("GuardTest", DEFAULT_POLICY_A);

console.log(`- Status    : ${audit1.advisory?.topology_status}`);
console.log(`- Recommend : ${audit1.advisory?.recommended_policy}`);
console.log(`- Denied    : ${audit1.decision_guards?.allow_policy_b === false}`);
console.log(`- Violations: ${audit1.decision_guards?.violations.join(", ")}`);

// --- Case 2: High Noise Denial ---
class HighNoiseEngine extends KnowledgeQueryEngine {
    constructor() { super("knowledge/nodes.json", "knowledge/edges.json"); }
    public override rankRelated(nodeSlug: string): any[] {
        if (nodeSlug === "NoiseTest") {
            return [
                { node: { slug: "N1", title: "N1", category: "Cat1", integrity_band: "LOW" } as GraphNode, score: 0.28, type: "related" },
                { node: { slug: "N2", title: "N2", category: "Cat2", integrity_band: "LOW" } as GraphNode, score: 0.26, type: "related" },
                { node: { slug: "N3", title: "N3", category: "Cat3", integrity_band: "HIGH" } as GraphNode, score: 0.24, type: "related" }
            ];
        }
        return [];
    }
    public override getNode(slug: string): any { return { slug, title: slug, category: "Cat1", integrity_band: "HIGH" }; }
    public override getNeighbors(): any[] { return []; }
}

const engine2 = new HighNoiseEngine();
const builder2 = new SynthesisContextBuilder(engine2 as any);

console.log("\nScenario 2: RECOVERABLE topology but 66% of nodes are LOW integrity (Noise Pollution)");
const { audit: audit2 } = builder2.buildContext("NoiseTest", DEFAULT_POLICY_A);

console.log(`- Status    : ${audit2.advisory?.topology_status}`);
console.log(`- Recommend : ${audit2.advisory?.recommended_policy}`);
console.log(`- Denied    : ${audit2.decision_guards?.allow_policy_b === false}`);
console.log(`- Violations: ${audit2.decision_guards?.violations.join(", ")}`);

if (audit1.advisory?.recommended_policy === "A" && audit2.advisory?.recommended_policy === "A") {
    console.log("\n✅ SUCCESS: Decision System correctly denied policy upgrades due to safety invariants.");
} else {
    console.error("\n❌ FAILURE: Guards did not override decisions as expected.");
    process.exit(1);
}
