import { GraphNode } from "../lib/knowledge-types";
import { inferExplicitLinks, inferTagOverlap, dedupeAndRankEdges } from "../lib/knowledge-inference";

// Minimal test fixtures

const TEST_NODES: GraphNode[] = [
  {
    id: "uuid-1", slug: "hub-firmware", title: "Hub Firmware", path: "hub/hub-firmware.md", category: "hub",
    domain_tags: ["hub"], task_tags: ["firmware-update", "sop"], authority_level: "guideline", notion_id: "uuid-1"
  },
  {
    id: "uuid-2", slug: "code-sign-flow", title: "Code Sign Flow", path: "hub/code-sign-flow.md", category: "hub",
    domain_tags: ["hub", "security"], task_tags: ["code-sign", "sop"], authority_level: "procedure", notion_id: "uuid-2"
  },
  {
    id: "uuid-3", slug: "hub-chip-specs", title: "Hub Chip Specs", path: "hub/hub-chip-specs.md", category: "hub",
    domain_tags: ["hub"], task_tags: ["spec", "hardware-info", "firmware-update"], authority_level: "reference", notion_id: "uuid-3"
  }
];

function runTests() {
  console.log("Running Graph Inference Fixture Tests...\n");

  // Test 1: Explicit Links
  const markdownContent = `Please refer to [Code Sign Flow](./code-sign-flow) for details.`;
  const explicitEdges = inferExplicitLinks(TEST_NODES[0], TEST_NODES, markdownContent);
  console.log("Test 1: Explicit Links");
  if (explicitEdges.length === 1 && explicitEdges[0].target === "code-sign-flow" && explicitEdges[0].basis[0].kind === "explicit_link") {
      console.log("  ✅ PASS");
  } else {
      console.error("  ❌ FAIL", explicitEdges);
  }

  // Test 2: Tag Overlap Scoring (TF-IDF Simulation)
  const tagFrequencies = {
      "firmware-update": 2,
      "sop": 2,
      "code-sign": 1,
      "spec": 1,
      "hardware-info": 1
  };
  const tagEdges = inferTagOverlap(TEST_NODES[0], TEST_NODES, tagFrequencies);
  console.log("Test 2: Tag Overlap Scoring");
  // We expect a connection to hub-chip-specs (shared firmware-update) and code-sign-flow (shared sop) 
  // depending on threshold configuration. We'll leave it simple for the stub.
  console.log("  (Stubbed) Output:", tagEdges.map(e => e.target));

  console.log("\nDone.");
}

runTests();
