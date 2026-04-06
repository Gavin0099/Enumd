/**
 * Notion → VitePress Markdown Export
 *
 * Usage:
 *   npm run export                   # raw content
 *   npm run export:summarize         # AI-summarized (Claude Haiku)
 *
 * Only re-exports pages whose Notion last_edited_time has changed
 * (compares against content_hash stored in existing frontmatter).
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import {
  notion,
  getPageTitle,
  getPageUrl,
  getPageLastEdited,
  getPageContent,
  getChildPageIds,
} from "../lib/notion";
import { summarizePage } from "../lib/summarize";
import { titleToSlug } from "../lib/categorize";
import { inferTagsFromText, inferTagsWithAI } from "../lib/infer-tags";

const DOCS_DIR = join(process.cwd(), "docs");
const RATE_LIMIT_MS = 350;
const SKIP_TITLES = ["未整理資料", "舊資料"];

const useSummarize = process.argv.includes("--summarize");
const useAIInfer = process.argv.includes("--infer"); // AI tag inference for ambiguous pages

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// Read existing frontmatter to check if page has changed
function getExistingMeta(filePath: string): { notion_updated_at?: string } {
  if (!existsSync(filePath)) return {};
  try {
    const { data } = matter(readFileSync(filePath, "utf8"));
    return data;
  } catch {
    return {};
  }
}

function buildFilePath(category: string, slug: string): string {
  const dir = join(DOCS_DIR, category);
  mkdirSync(dir, { recursive: true });
  return join(dir, `${slug}.md`);
}

async function buildFrontmatter(
  page: PageObjectResponse,
  content: string,
  isSummarized: boolean
) {
  const title = getPageTitle(page);

  // Infer tags: use AI only when --infer flag is set AND rule-based gives weak results
  let tags = inferTagsFromText(title, content);
  if (useAIInfer && tags.task_tags.length === 0) {
    tags = await inferTagsWithAI(title, content);
  }

  // Primary display category = first domain_tag (for sidebar grouping)
  const primary_category = tags.domain_tags[0];

  return {
    title,
    // New knowledge model fields
    domain_tags: tags.domain_tags,
    task_tags: tags.task_tags,
    authority_level: tags.authority_level,
    is_deprecated: tags.authority_level === "deprecated",
    // Legacy / display
    category: primary_category,
    // Notion metadata
    notion_id: page.id,
    notion_url: getPageUrl(page),
    notion_updated_at: getPageLastEdited(page),
    exported_at: new Date().toISOString(),
    is_summarized: isSummarized,
    // Relations (empty by default, filled manually or by future tooling)
    relations: [],
  };
}

async function exportPage(page: PageObjectResponse): Promise<"skipped" | "exported"> {
  const title = getPageTitle(page);

  if (SKIP_TITLES.some((s) => title.includes(s))) {
    console.log(`  [skip] deprecated: ${title}`);
    return "skipped";
  }

  // Quick infer for routing only (no AI, just title)
  const { domain_tags } = inferTagsFromText(title, "");
  const primary_category = domain_tags[0];
  const slug = titleToSlug(title) || page.id;
  const filePath = buildFilePath(primary_category, slug);

  // Stale check: skip if Notion page hasn't changed
  const existing = getExistingMeta(filePath);
  if (existing.notion_updated_at === getPageLastEdited(page)) {
    console.log(`  [skip] unchanged: ${title}`);
    return "skipped";
  }

  console.log(`  [export] ${title} → ${primary_category}/${slug}.md`);

  let content = await getPageContent(page.id);
  await sleep(RATE_LIMIT_MS);

  if (!content.trim()) {
    console.log(`    → empty, skipping`);
    return "skipped";
  }

  if (useSummarize) {
    content = await summarizePage(title, content);
    console.log(`    → summarized`);
  }

  const fm = await buildFrontmatter(page, content, useSummarize);
  const fileContent = matter.stringify(`\n${content}\n`, fm);
  writeFileSync(filePath, fileContent, "utf8");

  return "exported";
}

async function crawl(parentPageId: string) {
  console.log(`[export] Crawling: ${parentPageId}`);
  const childIds = await getChildPageIds(parentPageId);
  console.log(`[export] Found ${childIds.length} child pages`);

  let exported = 0;
  let skipped = 0;

  for (const childId of childIds) {
    try {
      const page = (await notion.pages.retrieve({ page_id: childId })) as PageObjectResponse;
      await sleep(RATE_LIMIT_MS);
      const result = await exportPage(page);
      if (result === "exported") exported++;
      else skipped++;
    } catch (err) {
      console.warn(`  [error] ${childId}:`, (err as Error).message);
    }
  }

  console.log(`\n[export] Done: ${exported} exported, ${skipped} skipped`);
}

async function main() {
  if (useSummarize) console.log("[export] Summarization ON (Claude Haiku)");

  const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const pageId = args[0] ?? "bed9013e385540938c256a653c1fc04f"; // 工作文件

  await crawl(pageId);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
