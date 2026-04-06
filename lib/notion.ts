import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({ auth: process.env.NOTION_TOKEN });

export function getPageTitle(page: PageObjectResponse): string {
  const titleProp = Object.values(page.properties).find((p) => p.type === "title");
  if (titleProp?.type === "title") {
    return titleProp.title.map((t) => t.plain_text).join("");
  }
  return "Untitled";
}

export function getPageUrl(page: PageObjectResponse): string {
  return page.url;
}

export function getPageLastEdited(page: PageObjectResponse): string {
  return page.last_edited_time;
}

function richTextToString(richText: { plain_text: string }[]): string {
  return richText.map((t) => t.plain_text).join("");
}

export function blocksToMarkdown(blocks: BlockObjectResponse[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "heading_1":
          return `# ${richTextToString(block.heading_1.rich_text)}`;
        case "heading_2":
          return `## ${richTextToString(block.heading_2.rich_text)}`;
        case "heading_3":
          return `### ${richTextToString(block.heading_3.rich_text)}`;
        case "paragraph": {
          const text = richTextToString(block.paragraph.rich_text);
          return text || "";
        }
        case "bulleted_list_item":
          return `- ${richTextToString(block.bulleted_list_item.rich_text)}`;
        case "numbered_list_item":
          return `1. ${richTextToString(block.numbered_list_item.rich_text)}`;
        case "code": {
          const lang = block.code.language || "";
          const code = richTextToString(block.code.rich_text);
          return `\`\`\`${lang}\n${code}\n\`\`\``;
        }
        case "quote":
          return `> ${richTextToString(block.quote.rich_text)}`;
        case "divider":
          return "---";
        case "callout": {
          const text = richTextToString(block.callout.rich_text);
          return `> **Note:** ${text}`;
        }
        case "toggle":
          return richTextToString(block.toggle.rich_text);
        default:
          return "";
      }
    })
    .filter(Boolean)
    .join("\n");
}

export async function getPageContent(pageId: string): Promise<string> {
  const blocks = await notion.blocks.children.list({ block_id: pageId, page_size: 100 });
  return blocksToMarkdown(blocks.results as BlockObjectResponse[]);
}

export async function getChildPageIds(blockId: string, depth = 0): Promise<string[]> {
  if (depth > 3) return [];
  const pageIds: string[] = [];
  let cursor: string | undefined;

  do {
    const res = await notion.blocks.children.list({
      block_id: blockId,
      ...(cursor ? { start_cursor: cursor } : {}),
    });

    for (const block of res.results as BlockObjectResponse[]) {
      if (block.type === "child_page") {
        pageIds.push(block.id);
      } else if (block.type === "link_to_page") {
        const ltp = (block as any).link_to_page;
        if (ltp?.type === "page_id") pageIds.push(ltp.page_id);
      } else if (block.type === "column_list" || block.type === "column") {
        const nested = await getChildPageIds(block.id, depth + 1);
        pageIds.push(...nested);
      }
    }

    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return [...new Set(pageIds)];
}
