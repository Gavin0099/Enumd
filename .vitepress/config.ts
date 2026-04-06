import { defineConfig } from "vitepress";
import { readdirSync, existsSync, readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

const DOCS_DIR = join(__dirname, "../docs");

const CATEGORIES = [
  { dir: "notes",     text: "📝 筆記" },
  { dir: "travel",    text: "✈️ 旅遊" },
  { dir: "parenting", text: "👶 育嬰" },
  { dir: "money",     text: "💰 財務" },
  { dir: "insurance", text: "🛡 保險" },
  { dir: "books",     text: "📚 讀書心得" },
  { dir: "misc",      text: "🗂 其他" },
];

function getTitle(filePath: string, filename: string): string {
  try {
    const { data } = matter(readFileSync(filePath, "utf8"));
    return data.title || filename.replace(/-/g, " ").replace(/\.md$/, "");
  } catch {
    return filename.replace(/\.md$/, "");
  }
}

function buildSidebar() {
  return CATEGORIES.flatMap(({ dir, text }) => {
    const dirPath = join(DOCS_DIR, dir);
    if (!existsSync(dirPath)) return [];

    const files = readdirSync(dirPath)
      .filter((f) => f.endsWith(".md") && f !== "index.md")
      .map((f) => ({
        text: getTitle(join(dirPath, f), f),
        link: `/${dir}/${f.replace(/\.md$/, "")}`,
      }));

    if (files.length === 0) return [];

    return [{
      text,
      collapsed: true,
      items: [
        { text: "分類總覽", link: `/${dir}/` },
        ...files,
      ],
    }];
  });
}

export default defineConfig({
  title: "私人筆記",
  description: "個人文件 · 僅限本機",
  lang: "zh-TW",

  themeConfig: {
    search: { provider: "local" },
    sidebar: buildSidebar(),
    nav: [{ text: "首頁", link: "/" }],
    footer: { message: "本機私人 wiki · 勿上傳" },
  },
});
