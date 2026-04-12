import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { SignalCollector } from "./signals";

export const notion = new Client({ auth: process.env.NOTION_TOKEN });

export function getPageTitle(page: PageObjectResponse): string {
  const titleProp = Object.values(page.properties).find((p) => (p as any).type === "title");
  if (titleProp && (titleProp as any).type === "title") {
    return richTextToString((titleProp as any).title).text;
  }
  return "Untitled";
}

export function getPageUrl(page: PageObjectResponse): string {
  return page.url;
}

export function getPageLastEdited(page: PageObjectResponse): string {
  return page.last_edited_time;
}

/**
 * Enhanced Rich Text to Markdown converter with Fidelity reporting.
 */
function richTextToString(
  richText: RichTextItemResponse[],
  collector?: SignalCollector
): { text: string } {
  const text = richText
    .map((t) => {
      let segment = t.plain_text;
      const { bold, italic, strikethrough, underline, code } = t.annotations;

      // Track fidelity
      if (bold) collector?.addFidelity("rich_text", "bold", 1, 1);
      if (italic) collector?.addFidelity("rich_text", "italic", 1, 1);
      if (strikethrough) collector?.addFidelity("rich_text", "strikethrough", 1, 1);
      if (underline) collector?.addFidelity("rich_text", "underline", 1, 1);
      if (code) collector?.addFidelity("rich_text", "code", 1, 1);
      
      if (t.type === "mention") {
        collector?.addFidelity("lossy_elements", "mention", 1, 0); // Currently lossy
      } else if (t.type === "equation") {
        collector?.addFidelity("lossy_elements", "equation", 1, 0); // Currently lossy
      }

      if (code) segment = `\`${segment}\``;
      if (bold) segment = `**${segment}**`;
      if (italic) segment = `*${segment}*`;
      if (strikethrough) segment = `~~${segment}~~`;
      if (underline) segment = `<u>${segment}</u>`;

      if (t.href) {
        collector?.addFidelity("rich_text", "links", 1, 1);
        segment = `[${segment}](${t.href})`;
      }

      return segment;
    })
    .join("");

  return { text };
}

/**
 * Recursive Markdown renderer with strict v2.3 signal collection.
 */
export async function blocksToMarkdown(
  blocks: BlockObjectResponse[],
  collector?: SignalCollector,
  depth = 0
): Promise<string> {
  const results: string[] = [];

  for (const block of blocks) {
    // INVARIANT: Record encounter IMMEDIATELY
    collector?.registerEncounter(block.type);
    collector?.updateDepth(depth);

    let md = "";
    let hasChildren = block.has_children;
    let renderState: 'fully' | 'degraded' | 'dropped' = 'dropped';

    try {
      switch (block.type) {
        case "heading_1":
          md = `# ${richTextToString(block.heading_1.rich_text, collector).text}`;
          renderState = 'fully';
          break;
        case "heading_2":
          md = `## ${richTextToString(block.heading_2.rich_text, collector).text}`;
          renderState = 'fully';
          break;
        case "heading_3":
          md = `### ${richTextToString(block.heading_3.rich_text, collector).text}`;
          renderState = 'fully';
          break;
        case "paragraph":
          md = richTextToString(block.paragraph.rich_text, collector).text;
          renderState = 'fully';
          break;
        case "bulleted_list_item":
          md = `- ${richTextToString(block.bulleted_list_item.rich_text, collector).text}`;
          renderState = 'fully';
          break;
        case "numbered_list_item":
          md = `1. ${richTextToString(block.numbered_list_item.rich_text, collector).text}`;
          renderState = 'fully';
          break;
        case "code": {
          const lang = block.code.language || "text";
          const code = block.code.rich_text.map((t) => t.plain_text).join("");
          md = `\`\`\`${lang}\n${code}\n\`\`\``;
          renderState = 'fully';
          break;
        }
        case "quote":
          md = `> ${richTextToString(block.quote.rich_text, collector).text}`;
          renderState = 'fully';
          break;
        case "divider":
          md = "---";
          renderState = 'fully';
          break;
        case "callout":
          md = `> **Note:** ${richTextToString(block.callout.rich_text, collector).text}`;
          renderState = 'fully';
          break;
        case "toggle":
          md = `<details><summary>${richTextToString(block.toggle.rich_text, collector).text}</summary>\n\n`;
          renderState = 'fully';
          break;
        case "table":
          // Tables are recursive in Notion; we handle rows as children
          md = ""; // The table header/body will be built from children
          renderState = 'fully';
          break;
        case "table_row": {
          const cells = block.table_row.cells.map((cell: any) => richTextToString(cell, collector).text);
          md = `| ${cells.join(" | ")} |`;
          renderState = 'fully';
          break;
        }
        case "image": {
          const url = (block.image as any).file?.url || (block.image as any).external?.url;
          const caption = richTextToString(block.image.caption, collector).text;
          md = `![${caption || 'image'}](${url})`;
          renderState = 'degraded'; // Image is degraded because we don't host it locally yet
          break;
        }
        case "file":
        case "pdf":
        case "video": {
          const type = block.type;
          const url = (block as any)[type].file?.url || (block as any)[type].external?.url;
          const caption = richTextToString((block as any)[type].caption || [], collector).text;
          md = `[DOWNLOAD ${type.toUpperCase()}: ${caption || type}](${url})`;
          renderState = 'degraded';
          break;
        }
        default:
          md = `[UNSUPPORTED_BLOCK: ${block.type}]`;
          renderState = 'degraded';
      }
    } catch (e) {
      console.error(`Error rendering block ${block.id} (${block.type}):`, e);
      md = `[RENDER_FAILURE: ${block.type}]`;
      renderState = 'dropped'; // Actually surfacing a placeholder, but treat as loss of intent
    }

    // Register the outcome
    if (renderState === 'fully') collector?.registerSuccess(block.type);
    else if (renderState === 'degraded') collector?.registerDegradation(block.type);
    else collector?.registerDrop(block.type);

    results.push(md);

    // Recursive expansion for blocks with children
    if (hasChildren) {
      const childBlocks = await fetchAllChildren(block.id, collector);
      const childMd = await blocksToMarkdown(childBlocks, collector, depth + 1);
      
      if (block.type === "toggle") {
        results.push(childMd + "\n</details>");
      } else if (block.type === "bulleted_list_item" || block.type === "numbered_list_item" || block.type === "callout") {
        const indented = childMd.split("\n").map(line => "  " + line).join("\n");
        results.push(indented);
      } else {
        results.push(childMd);
      }
    }
  }

  return results.filter(Boolean).join("\n\n");
}

async function fetchAllChildren(blockId: string, collector?: SignalCollector): Promise<BlockObjectResponse[]> {
  const allBlocks: BlockObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const res = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      ...(cursor ? { start_cursor: cursor } : {}),
    });

    allBlocks.push(...(res.results as BlockObjectResponse[]));
    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
    
    if (res.has_more && !cursor) {
        collector?.setTruncated(true);
        break;
    }
  } while (cursor);

  return allBlocks;
}

export async function getPageContent(pageId: string, collector?: SignalCollector): Promise<string> {
  const blocks = await fetchAllChildren(pageId, collector);
  return blocksToMarkdown(blocks, collector);
}

export async function getChildPageIds(blockId: string, depth = 0): Promise<string[]> {
  if (depth > 5) return [];
  const pageIds: string[] = [];
  
  const blocks = await fetchAllChildren(blockId);

  for (const block of blocks) {
    if (block.type === "child_page") {
      pageIds.push(block.id);
    } else if (block.type === "link_to_page") {
      const ltp = (block as any).link_to_page;
      if (ltp?.type === "page_id") pageIds.push(ltp.page_id);
    } else if (block.type === "column_list" || block.type === "column" || block.has_children) {
      const nested = await getChildPageIds(block.id, depth + 1);
      pageIds.push(...nested);
    }
  }

  return [...new Set(pageIds)];
}
