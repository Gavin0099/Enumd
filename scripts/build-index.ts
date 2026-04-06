/**
 * Scans docs/ and:
 * 1. Regenerates category index.md files
 * 2. Writes docs/public/stats.json for homepage use
 */

import { readdirSync, writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

const DOCS_DIR = join(process.cwd(), "docs");
const PUBLIC_DIR = join(DOCS_DIR, "public");

mkdirSync(PUBLIC_DIR, { recursive: true });

interface PageMeta {
  title: string;
  slug: string;
  category: string;
  notion_url?: string;
  notion_updated_at?: string;
  exported_at?: string;
}

const CATEGORIES: {
  dir: string;
  title: string;
  description: string;
  icon: string;
  highlights: string[];
}[] = [
  {
    dir: "hub",
    title: "Hub 文件",
    icon: "🔌",
    description: "Hub chip、ini 參數、Firmware Update Tool、SDK 規範",
    highlights: ["Hub Chip 資訊", "Hub ini parameter", "GL Hub Software Development Kit"],
  },
  {
    dir: "driver",
    title: "Driver 相關",
    icon: "🛠",
    description: "Driver 安裝、刪除、除錯、CSR 調試",
    highlights: ["Hub Driver 除錯方式", "Driver 刪除方式", "Windows 10 H2 driver 移除流程"],
  },
  {
    dir: "code-sign",
    title: "Code Sign",
    icon: "🔐",
    description: "ECC/RSA 金鑰、簽章流程、eToken、GL3590",
    highlights: ["Code Sign 概述", "eToken 安全簽章系統技術說明", "Code sign Flow"],
  },
  {
    dir: "mac",
    title: "Mac 相關",
    icon: "🍎",
    description: "Mac OCI Tool、Xcode 設定、Bundle ID、FDA 權限",
    highlights: ["MAC OCI Tool", "Xcode Architecture 設定", "Mac 權限問題"],
  },
  {
    dir: "monitor",
    title: "Monitor",
    icon: "🖥",
    description: "HP/Lenovo/ASUS Monitor、MTK/RTK Scaler、OCI 架構",
    highlights: ["MTK Scaler Update flow", "HP Monitor Code Sign Update Flow", "Lenovo offline update flow"],
  },
  {
    dir: "general",
    title: "技術文件",
    icon: "📋",
    description: "Visual Studio、CMake、Git、Windows 指令、Log 抓取",
    highlights: ["How to generate system log", "Cmake 設定方式", "Git Command List"],
  },
];

function readPageMeta(dirPath: string, filename: string, category: string): PageMeta | null {
  try {
    const { data } = matter(readFileSync(join(dirPath, filename), "utf8"));
    return {
      title: data.title || filename.replace(/\.md$/, "").replace(/-/g, " "),
      slug: filename.replace(/\.md$/, ""),
      category,
      notion_url: data.notion_url,
      notion_updated_at: data.notion_updated_at,
      exported_at: data.exported_at,
    };
  } catch {
    return null;
  }
}

interface CategoryStats {
  dir: string;
  title: string;
  icon: string;
  description: string;
  count: number;
  highlights: string[];
  latest_update: string | null;
}

interface Stats {
  total_pages: number;
  last_exported: string;
  categories: CategoryStats[];
  recently_updated: PageMeta[];
}

function buildCategoryIndex(cat: typeof CATEGORIES[number]): CategoryStats {
  const dirPath = join(DOCS_DIR, cat.dir);
  if (!existsSync(dirPath)) {
    return { ...cat, count: 0, latest_update: null };
  }

  const files = readdirSync(dirPath)
    .filter((f) => f.endsWith(".md") && f !== "index.md")
    .sort();

  if (files.length === 0) {
    return { ...cat, count: 0, latest_update: null };
  }

  const pages = files
    .map((f) => readPageMeta(dirPath, f, cat.dir))
    .filter(Boolean) as PageMeta[];

  // Latest update across all pages in this category
  const latest_update = pages
    .map((p) => p.notion_updated_at)
    .filter(Boolean)
    .sort()
    .at(-1) ?? null;

  // Build index.md
  const items = files
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const meta = readPageMeta(dirPath, f, cat.dir);
      return `- [${meta?.title ?? slug}](./${slug})`;
    })
    .join("\n");

  const content = `# ${cat.icon} ${cat.title}

> ${cat.description}

共 **${files.length}** 頁文件

## 文件列表

${items}
`;

  writeFileSync(join(dirPath, "index.md"), content, "utf8");
  console.log(`[index] ${cat.dir}/index.md (${files.length} pages)`);

  return { ...cat, count: files.length, latest_update };
}

function main() {
  const allPages: PageMeta[] = [];
  const categoryStats: CategoryStats[] = [];

  for (const cat of CATEGORIES) {
    const stats = buildCategoryIndex(cat);
    categoryStats.push(stats);

    const dirPath = join(DOCS_DIR, cat.dir);
    if (existsSync(dirPath)) {
      const files = readdirSync(dirPath).filter(
        (f) => f.endsWith(".md") && f !== "index.md"
      );
      for (const f of files) {
        const meta = readPageMeta(dirPath, f, cat.dir);
        if (meta) allPages.push(meta);
      }
    }
  }

  // Recently updated: sort by notion_updated_at desc, top 8
  const recentlyUpdated = [...allPages]
    .filter((p) => p.notion_updated_at)
    .sort((a, b) =>
      (b.notion_updated_at ?? "").localeCompare(a.notion_updated_at ?? "")
    )
    .slice(0, 8);

  const stats: Stats = {
    total_pages: allPages.length,
    last_exported: new Date().toISOString(),
    categories: categoryStats,
    recently_updated: recentlyUpdated,
  };

  writeFileSync(join(PUBLIC_DIR, "stats.json"), JSON.stringify(stats, null, 2), "utf8");
  console.log(`[stats] docs/public/stats.json written (${allPages.length} total pages)`);
  console.log("[index] Done");
}

main();
