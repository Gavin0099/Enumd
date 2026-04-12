import { SignalCollector } from "../lib/signals";
import { blocksToMarkdown } from "../lib/notion";

/**
 * PHASE 1.5: INVARIANT & FIDELITY VALIDATION (v2.3)
 */

async function runTrustTests() {
  console.log("=== Phase 1.5: High-Trust Validation (v2.3) ===\n");

  const collector = new SignalCollector("torture-page-id", "2024-04-12T10:00:00Z");

  const mockBlocks: any[] = [
    {
      id: "b1",
      type: "heading_1",
      heading_1: { rich_text: [{ plain_text: "Golden Snapshot Test", annotations: {} }] },
      has_children: false
    },
    {
      id: "b2",
      type: "paragraph",
      paragraph: { 
        rich_text: [
          { plain_text: "Normal text. ", annotations: {} },
          { plain_text: "Bold with link", annotations: { bold: true }, href: "https://example.com" },
          { plain_text: " and ", annotations: {} },
          { plain_text: "italic code", annotations: { italic: true, code: true } }
        ] 
      },
      has_children: false
    },
    {
      id: "b3",
      type: "table", // Explicitly unsupported in Phase 1
      table: { has_column_header: true },
      has_children: true
    },
    {
      id: "b4",
      type: "unrecognized_type_x", // Unknown to humanity
      has_children: false
    }
  ];

  console.log("Requirement: Encounter-Before-Render Invariant");
  console.log("Action: Rendering complex block tree...");

  const markdown = await blocksToMarkdown(mockBlocks, collector);
  const signal = collector.getSignal();

  console.log("\n--- Observation Results ---");
  
  // 1. Invariant: Seen vs Rendered
  const tableStats = signal.metrics.blocks["table"];
  const h1Stats = signal.metrics.blocks["heading_1"];
  
  console.log(`Heading 1: Seen=${h1Stats.seen}, Fully=${h1Stats.fully_rendered}`);
  console.log(`Table: Seen=${tableStats.seen}, Fully=${tableStats.fully_rendered}, Degraded=${tableStats.degraded_rendered}`);
  
  if (tableStats.seen === 1 && tableStats.degraded_rendered === 1) {
    console.log("✅ SUCCESS: Table encountered and marked as degraded (Placeholder used).");
  } else {
    console.log("❌ FAILURE: Table accounting mismatch.");
  }

  // 2. Fidelity: Rich Text Counts
  const boldStats = signal.fidelity.rich_text["bold"];
  const linkStats = signal.fidelity.rich_text["links"];
  const codeStats = signal.fidelity.rich_text["code"];

  console.log(`\nFidelity - Bold: Total=${boldStats.total}, Preserved=${boldStats.preserved}`);
  console.log(`Fidelity - Links: Total=${linkStats.total}, Preserved=${linkStats.preserved}`);
  console.log(`Fidelity - Code: Total=${codeStats.total}, Preserved=${codeStats.preserved}`);

  if (boldStats.total === 1 && linkStats.total === 1 && codeStats.total === 1) {
    console.log("✅ SUCCESS: Formatting elements correctly counted.");
  } else {
    console.log("❌ FAILURE: Fidelity counts do not match input.");
  }

  // 3. Consistency: MD tags match Signal
  const placeholderCount = (markdown.match(/\[UNSUPPORTED_BLOCK:/g) || []).length;
  console.log(`\nConsistency Check: Signal Degraded (${signal.metrics.blocks["table"].degraded_rendered + signal.metrics.blocks["unrecognized_type_x"].degraded_rendered}) vs MD Tags (${placeholderCount})`);
  
  if (placeholderCount === 2) {
    console.log("✅ SUCCESS: All degraded blocks have surfaces in Markdown.");
  } else {
    console.log("❌ FAILURE: Consistency drift between Signal and MD surface.");
  }

  // 4. Unknown handling
  const unknownStats = signal.metrics.blocks["unrecognized_type_x"];
  if (unknownStats && unknownStats.seen === 1) {
      console.log("✅ SUCCESS: Unknown block type captured.");
  }

  console.log("\n--- Final Signal Object (v2.3) ---");
  console.log(JSON.stringify(signal, null, 2));
}

runTrustTests().catch(console.error);
