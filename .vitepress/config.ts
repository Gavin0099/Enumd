import { defineConfig } from "vitepress";
import { readdirSync, existsSync } from "fs";
import { join } from "path";

const DOCS_DIR = join(__dirname, "../docs");

const CATEGORIES = [
  { dir: "hub",       text: "Hub 文件" },
  { dir: "driver",    text: "Driver 相關" },
  { dir: "code-sign", text: "Code Sign" },
  { dir: "mac",       text: "Mac 相關" },
  { dir: "monitor",   text: "Monitor" },
  { dir: "general",   text: "技術文件" },
];

function buildSidebar() {
  return CATEGORIES.flatMap(({ dir, text }) => {
    const dirPath = join(DOCS_DIR, dir);
    if (!existsSync(dirPath)) return [];

    const files = readdirSync(dirPath)
      .filter((f) => f.endsWith(".md") && f !== "index.md")
      .map((f) => ({
        text: f.replace(/\.md$/, "").replace(/-/g, " "),
        link: `/${dir}/${f.replace(/\.md$/, "")}`,
      }));

    if (files.length === 0) return [];

    return [
      {
        text,
        collapsed: true,
        items: [
          { text: "分類總覽", link: `/${dir}/` },
          ...files,
        ],
      },
    ];
  });
}

export default defineConfig({
  title: "工作知識庫",
  description: "從 Notion 編譯的技術文件 wiki",
  lang: "zh-TW",

  themeConfig: {
    search: { provider: "local" },

    nav: [
      { text: "首頁", link: "/" },
      { text: "全部分類", link: "/hub/" },
    ],

    sidebar: buildSidebar(),

    socialLinks: [],

    footer: {
      message: "從 Notion 自動編譯 · 以 Claude Haiku 整理",
    },

    editLink: {
      pattern: "https://www.notion.so/:path",
      text: "在 Notion 中檢視原頁面",
    },
  },

  markdown: {
    lineNumbers: false,
  },
});
