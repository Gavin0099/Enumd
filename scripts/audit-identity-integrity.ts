import { readFileSync } from "fs";
import { join } from "path";

const KNOWLEDGE_DIR = join(process.cwd(), "knowledge");
const nodes = JSON.parse(readFileSync(join(KNOWLEDGE_DIR, "nodes.json"), "utf8"));
const edges = JSON.parse(readFileSync(join(KNOWLEDGE_DIR, "edges.json"), "utf8"));

const nodeSlugs = new Set(nodes.map((n: any) => n.slug));

let sourceMismatches = 0;
let targetMismatches = 0;
const mismatchSlugs = new Set<string>();

for (const edge of edges) {
    if (!nodeSlugs.has(edge.source)) {
        sourceMismatches++;
        mismatchSlugs.add(edge.source);
    }
    if (!nodeSlugs.has(edge.target)) {
        targetMismatches++;
        mismatchSlugs.add(edge.target);
    }
}

console.log("🔍 Identity Integrity Audit Report");
console.log("----------------------------------");
console.log(`Total Edges     : ${edges.length}`);
console.log(`Node Dictionary : ${nodes.length} slugs`);
console.log(`Source Mismatches: ${sourceMismatches} (${((sourceMismatches/edges.length)*100).toFixed(1)}%)`);
console.log(`Target Mismatches: ${targetMismatches} (${((targetMismatches/edges.length)*100).toFixed(1)}%)`);
console.log(`Unique Mismatch Slugs: ${mismatchSlugs.size}`);

if (mismatchSlugs.size > 0) {
    console.log("\nTop Mismatched Slugs:");
    console.log(Array.from(mismatchSlugs).slice(0, 10));
}

if (sourceMismatches === 0 && targetMismatches === 0) {
    console.log("\n✅ PASS: Identity Integrity is 100%.");
} else {
    console.log("\n❌ FAIL: Identity Drift detected. Graph refers to non-existent nodes.");
}
