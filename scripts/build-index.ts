/**
 * Scans docs/ and regenerates category index.md files
 * Run after export.ts
 */

import { readdirSync, writeFileSync, existsSync, readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

const DOCS_DIR = join(process.cwd(), "docs");

const CATEGORIES: { dir: string; title: string; description: string }[] = [
  { dir: "hub",       title: "Hub 文件",       description: "Hub chip、ini 參數、Firmware Update Tool、SDK 規範" },
  { dir: "driver",    title: "Driver 相關",    description: "Driver 安裝、刪除、除錯方式" },
  { dir: "code-sign", title: "Code Sign",      description: "ECC/RSA 金鑰、簽章流程、eToken、GL3590" },
  { dir: "mac",       title: "Mac 相關",       description: "Mac OCI Tool、Xcode、Bundle ID、FDA 權限" },
  { dir: "monitor",   title: "Monitor",        description: "HP/Lenovo/ASUS Monitor、MTK/RTK Scaler" },
  { dir: "general",   title: "技術文件",       description: "Visual Studio、CMake、Git、Windows 指令" },
];

function getPageTitle(filePath: string, filename: string): string {
  try {
    const { data } = matter(readFileSync(filePath, "utf8"));
    return data.title || filename.replace(/-/g, " ").replace(/\.md$/, "");
  } catch {
    return filename.replace(/-/g, " ").replace(/\.md$/, "");
  }
}

function buildCategoryIndex(dir: string, title: string, description: string) {
  const dirPath = join(DOCS_DIR, dir);
  if (!existsSync(dirPath)) return;

  const files = readdirSync(dirPath)
    .filter((f) => f.endsWith(".md") && f !== "index.md")
    .sort();

  if (files.length === 0) return;

  const items = files
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const pageTitle = getPageTitle(join(dirPath, f), f);
      return `- [${pageTitle}](./${slug})`;
    })
    .join("\n");

  const content = `# ${title}

> ${description}

共 **${files.length}** 頁文件

## 文件列表

${items}
`;

  writeFileSync(join(dirPath, "index.md"), content, "utf8");
  console.log(`[index] ${dir}/index.md (${files.length} pages)`);
}

function main() {
  for (const { dir, title, description } of CATEGORIES) {
    buildCategoryIndex(dir, title, description);
  }
  console.log("[index] Done");
}

main();
