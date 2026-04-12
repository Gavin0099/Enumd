import { Client } from "@notionhq/client";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const notion = new Client({ auth: process.env.NOTION_TOKEN });

/**
 * PHASE 7: REALITY AUDIT (v2.7)
 * 
 * Performs a raw, recursive block count via the Notion API,
 * bypassing all rendering and extraction logic. Used as a 
 * "Source-Observed Truth" to audit Alignment data.
 */

async function rawCount(blockId: string, stats = { total: 0, byType: {} as Record<string, number> }) {
  let cursor: string | undefined;

  try {
    do {
      const response: any = await notion.blocks.children.list({
        block_id: blockId,
        start_cursor: cursor,
        page_size: 100,
      });

      for (const block of response.results) {
        stats.total += 1;
        stats.byType[block.type] = (stats.byType[block.type] || 0) + 1;

        if (block.has_children) {
          await rawCount(block.id, stats);
        }
      }

      cursor = response.next_cursor;
    } while (cursor);
  } catch (err) {
    console.error(`Error auditing block ${blockId}:`, (err as any).message);
  }

  return stats;
}

async function runAudit() {
  const pageId = process.argv[2] || process.env.NOTION_PAGE_ID;
  if (!pageId) {
    console.error("Usage: tsx scripts/reality-audit.ts <PAGE_ID>");
    process.exit(1);
  }

  console.log(`=== Phase 7: Raw Reality Audit ===`);
  console.log(`Target: ${pageId}`);
  console.log(`Action: Performing recursive API count (Source-Observed Truth)...`);

  const results = await rawCount(pageId);

  console.log(`\n--- Reality Surface Report ---`);
  console.log(`Discovery Source: raw_notion_api_audit`);
  console.log(`Total Blocks: ${results.total}`);
  console.log(`By Type:`);
  Object.entries(results.byType).sort().forEach(([type, count]) => {
    console.log(`  - ${type}: ${count}`);
  });
}

runAudit();
