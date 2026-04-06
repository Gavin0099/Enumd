/**
 * Private Notion Wiki Export
 * Root page: 私人文件 (5d5d91be-99df-4aa4-8c6a-4d4da8e37a85)
 *
 * ⚠️  密碼區塊 (密碼) is SKIPPED — never export credentials
 * No AI summarization — personal content stays raw
 * No git push — local only
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

const DOCS_DIR = join(process.cwd(), "docs");
const RATE_LIMIT_MS = 350;
const PRIVATE_ROOT = "5d5d91be-99df-4aa4-8c6a-4d4da8e37a85";

// ⚠️ NEVER export these — credentials and sensitive data
const SKIP_TITLES = [
  "密碼",
  "Steam 密碼", "microsoft 密碼", "淡江密碼", "薪資密碼", "Netflix 密碼",
  "光世代上網號碼", "電子發票整合驗證碼", "樂天信用卡帳號",
  "Logseq",           // password page
  "Netfilx 代碼",     // streaming credentials
  "Google AI Studio API Key",
  "API Key",
  "台新",             // banking credentials
  "爸爸郵局帳號",
  "中華電信編號",
  "手機條碼驗證碼",
];

// Category mapping based on known Notion structure
const CATEGORY_MAP: Record<string, string> = {
  // 筆記
  "switch": "notes", "句子": "notes", "文章": "notes", "育嬰": "parenting",
  "書單": "notes", "日記": "notes", "人才": "notes", "linkedin": "notes",
  "金剛經": "notes", "逐字稿": "notes", "祖譜": "notes", "重訓": "notes",
  "八字": "notes", "聊天紀錄": "notes", "固定行程": "notes",
  // 旅遊
  "北海道": "travel", "韓國": "travel", "仙台": "travel", "台中旅遊": "travel",
  "花蓮旅遊": "travel", "宜蘭": "travel", "屏東": "travel", "台南": "travel",
  "沖繩": "travel", "基隆": "travel", "護照": "travel",
  // 財務
  "信用卡": "money", "貸款": "money", "台新": "money", "信用分數": "money",
  "紅包": "money", "花費": "money", "勞退": "money", "房子裝修": "money",
  "所得稅": "money", "每月資金": "money", "遺產": "money",
  // 保險
  "保費": "insurance", "保險": "insurance", "車禍保險": "insurance",
  // 讀書心得
  "超速學習": "books", "原子習慣": "books", "規模": "books", "台積電": "books",
  "納瓦爾": "books", "多巴胺": "books", "人生的4000": "books",
  // 育嬰
  "副食品": "parenting", "推車": "parenting", "取名": "parenting",
  "孕婦": "parenting", "采采": "parenting", "亮亮": "parenting",
  "幼稚園": "parenting", "茁壯園": "parenting", "二寶": "parenting",
  "育兒": "parenting", "奶嘴": "parenting", "搖床": "parenting",
};

function categorize(title: string): string {
  // Direct match first
  for (const [key, cat] of Object.entries(CATEGORY_MAP)) {
    if (title.includes(key)) return cat;
  }
  // Pattern-based
  if (/旅遊|行程|宜蘭|礁溪|農曆/.test(title)) return "travel";
  if (/保險|保費/.test(title)) return "insurance";
  if (/貸款|信用|花費|薪資|帳號|密碼(?!$)/.test(title)) return "money";
  if (/育嬰|嬰兒|副食|奶|寶寶|幼兒|兒童|親子/.test(title)) return "parenting";
  if (/讀書|心得|書評|推薦書/.test(title)) return "books";
  return "misc";
}

function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function getExistingMeta(filePath: string): { notion_updated_at?: string } {
  if (!existsSync(filePath)) return {};
  try {
    const { data } = matter(readFileSync(filePath, "utf8"));
    return data;
  } catch {
    return {};
  }
}

async function exportPage(page: PageObjectResponse): Promise<"skipped" | "exported"> {
  const title = getPageTitle(page);

  // ⚠️ Hard skip: credentials
  if (SKIP_TITLES.some((s) => title.includes(s))) {
    console.log(`  [SKIP-SENSITIVE] ${title}`);
    return "skipped";
  }

  const category = categorize(title);
  const slug = titleToSlug(title) || page.id;
  const dir = join(DOCS_DIR, category);
  mkdirSync(dir, { recursive: true });
  const filePath = join(dir, `${slug}.md`);

  // Stale check
  const existing = getExistingMeta(filePath);
  if (existing.notion_updated_at === getPageLastEdited(page)) {
    console.log(`  [skip] ${title}`);
    return "skipped";
  }

  console.log(`  [export] ${title} → ${category}/${slug}.md`);

  const content = await getPageContent(page.id);
  await sleep(RATE_LIMIT_MS);

  if (!content.trim()) {
    console.log(`    → empty`);
    return "skipped";
  }

  const fm = {
    title,
    category,
    notion_id: page.id,
    notion_url: getPageUrl(page),
    notion_updated_at: getPageLastEdited(page),
    exported_at: new Date().toISOString(),
  };

  writeFileSync(filePath, matter.stringify(`\n${content}\n`, fm), "utf8");
  return "exported";
}

async function main() {
  console.log("[private-export] Starting...");
  console.log("[private-export] ⚠️  密碼 sections will be SKIPPED");

  const childIds = await getChildPageIds(PRIVATE_ROOT);
  console.log(`[private-export] Found ${childIds.length} pages`);

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

  console.log(`\n[private-export] Done: ${exported} exported, ${skipped} skipped`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
