import { SignalCollector } from "../lib/signals";
import { blocksToMarkdown } from "../lib/notion";

// Mock data structures from Notion API types
const mockBlocks: any[] = [
  {
    type: "heading_1",
    heading_1: { rich_text: [{ plain_text: "Test Page", annotations: {} }] },
    has_children: false,
    id: "h1"
  },
  {
    type: "paragraph",
    paragraph: { 
      rich_text: [
        { plain_text: "This is a test with ", annotations: {} },
        { plain_text: "bold", annotations: { bold: true } },
        { plain_text: " and a ", annotations: {} },
        { plain_text: "link", annotations: {}, href: "https://example.com" }
      ] 
    },
    has_children: false,
    id: "p1"
  },
  {
    type: "toggle",
    toggle: { rich_text: [{ plain_text: "Expand me", annotations: {} }] },
    has_children: true,
    id: "t1"
  },
  {
    type: "table", // Unsupported in our current switch case but mapped in degradation_map
    table: { has_column_header: true, has_row_header: false },
    has_children: true,
    id: "table1"
  }
];

const mockChildren: Record<string, any[]> = {
  "t1": [
    {
      type: "bulleted_list_item",
      bulleted_list_item: { rich_text: [{ plain_text: "Nested item", annotations: {} }] },
      has_children: false,
      id: "li1"
    }
  ],
  "table1": [
    { type: "table_row", table_row: { cells: [] }, has_children: false, id: "tr1" }
  ]
};

// We need to bypass the real Notion call in fetchAllChildren for this test
// In a real environment we'd use a test framework with mocks
console.log("Starting verification of Signal-Centric Extraction System (Phase 1)...");

async function runTest() {
  const collector = new SignalCollector("test-page-id");
  
  // Note: Since lib/notion.ts is hardcoded to use the global 'notion' client,
  // we'd normally need to mock the global 'notion'.
  // For this verification, we'll manually test the SignalCollector's logic 
  // as it would be called by blocksToMarkdown.
  
  console.log("--- Simulating Extraction Loop ---");
  
  // Simulation of what blocksToMarkdown does (updated to current SignalCollector API):
  for (const block of mockBlocks) {
    if (block.type === "heading_1") {
      collector.registerEncounter("heading_1");
      collector.registerSuccess("heading_1");
    } else if (block.type === "paragraph") {
      collector.registerEncounter("paragraph");
      collector.registerSuccess("paragraph");
    } else if (block.type === "toggle") {
      collector.registerEncounter("toggle");
      collector.registerSuccess("toggle");
      // Recursive call
      collector.updateDepth(1);
      for (const child of mockChildren["t1"]) {
        collector.registerEncounter(child.type);
        collector.registerSuccess(child.type);
      }
    } else {
      // Unsupported block (like table in Phase 1)
      collector.registerEncounter(block.type);
      collector.registerDrop(block.type, "unsupported");
    }
  }

  const signal = collector.getSignal();

  console.log("\nGenerated Extraction Signal:");
  console.log(JSON.stringify(signal, null, 2));

  console.log("\n--- Verification Results ---");
  const metrics = signal.metrics;

  const totalSeen = Object.values(metrics.blocks).reduce((sum, m) => sum + m.seen, 0)
    + metrics.unknown_blocks.seen;
  const expectedTotal = mockBlocks.length + mockChildren["t1"].length;
  if (totalSeen === expectedTotal) {
    console.log("✅ Total blocks count matched:", totalSeen);
  } else {
    console.log("❌ Total blocks count mismatched! Expected:", expectedTotal, "Actual:", totalSeen);
  }

  const droppedCount = Object.values(metrics.blocks).reduce((sum, m) => sum + m.dropped, 0);
  if (droppedCount === 1) {
    console.log("✅ Dropped (unsupported) blocks count matched: 1");
  } else {
    console.log("❌ Dropped blocks count mismatched! Actual:", droppedCount);
  }

  if (metrics.dropped_reasons["table"]?.includes("unsupported")) {
    console.log("✅ Dropped block 'table' detected with reason 'unsupported'.");
  } else {
    console.log("❌ Dropped block 'table' NOT detected!");
  }

  if (metrics.structure.max_depth === 1) {
    console.log("✅ Max depth reached matched: 1");
  } else {
    console.log("❌ Max depth mismatched! Actual:", metrics.structure.max_depth);
  }
}

runTest().catch(console.error);
