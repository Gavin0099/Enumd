import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { GraphNode, GraphEdge } from "../lib/knowledge-types";

console.log("🕵️  Enumd Adversarial Prober: Hunting for Dirty Failures...\n");

const KNOWLEDGE_DIR = join(process.cwd(), "knowledge");
const nodes: GraphNode[] = JSON.parse(readFileSync(join(KNOWLEDGE_DIR, "nodes.json"), "utf8"));
const edges: GraphEdge[] = JSON.parse(readFileSync(join(KNOWLEDGE_DIR, "edges.json"), "utf8"));

const nodeMap = new Map<string, GraphNode>(nodes.map(n => [n.slug, n]));

function calculateTagOverlap(tags1: string[], tags2: string[]): number {
    if (tags1.length === 0 || tags2.length === 0) return 0;
    const s1 = new Set(tags1);
    const intersection = tags2.filter(t => s1.has(t));
    return intersection.length / Math.max(tags1.length, tags2.length);
}

const failureMap: any[] = [];

for (const targetNode of nodes) {
    const neighbors = edges.filter(e => e.source === targetNode.slug || (e.bidirectional && e.target === targetNode.slug));
    
    // 1. False Diversity Check
    const borderlineRel = neighbors.filter(e => e.score >= 0.22 && e.score < 0.3);
    if (borderlineRel.length >= 2) {
        const categories = new Set(borderlineRel.map(e => nodeMap.get(e.target === targetNode.slug ? e.source : e.target)?.category));
        
        if (categories.size >= 2) {
            // Check semantic overlap
            const neighborNodes = borderlineRel.map(e => nodeMap.get(e.target === targetNode.slug ? e.source : e.target)!);
            const avgOverlap = calculateTagOverlap(neighborNodes[0]?.domain_tags || [], neighborNodes[1]?.domain_tags || []);
            
            if (avgOverlap > 0.6) {
                failureMap.push({
                    trigger_slug: targetNode.slug,
                    pattern: "False Diversity Trap",
                    details: `Different categories (${Array.from(categories).join(", ")}) but high tag overlap (${(avgOverlap * 100).toFixed(0)}%)`,
                    impact: "MEDIUM"
                });
            }
        }
    }

    // 2. High Integrity Noise
    const noisyHighRel = borderlineRel.filter(e => {
        const n = nodeMap.get(e.target === targetNode.slug ? e.source : e.target);
        const onlyTags = e.basis.length === 1 && e.basis[0].kind === "tag_overlap";
        return n?.integrity_band === "HIGH" && onlyTags;
    });

    if (noisyHighRel.length >= 2) {
        failureMap.push({
            trigger_slug: targetNode.slug,
            pattern: "High Integrity Noise",
            details: `Recovery window relies on ${noisyHighRel.length} nodes that are HIGH integrity but only linked via tag_overlap.`,
            impact: "HIGH"
        });
    }

    // 3. Mixed Pollution (Critical Node integrity)
    // Find dependency children
    const deps = edges.filter(e => e.source === targetNode.slug && e.type === "explicit_ref");
    const lowIntegrityDeps = deps.filter(e => nodeMap.get(e.target)?.integrity_band === "LOW");
    if (lowIntegrityDeps.length > 0) {
        failureMap.push({
            trigger_slug: targetNode.slug,
            pattern: "Polluted Dependency Foundation",
            details: `Topic relies on ${lowIntegrityDeps.length} LOW integrity explicit dependencies.`,
            impact: "HIGH"
        });
    }
}

const outputPath = join(KNOWLEDGE_DIR, "decision_failure_map.json");
writeFileSync(outputPath, JSON.stringify(failureMap, null, 2));

console.log(`✅ Adversarial Scan Complete. Found ${failureMap.length} potential vulnerabilities.`);
console.log(`Report written to: ${outputPath}\n`);

// Summary
const patterns = [...new Set(failureMap.map(f => f.pattern))];
patterns.forEach(p => {
    const count = failureMap.filter(f => f.pattern === p).length;
    console.log(`- ${p}: ${count} cases`);
});
