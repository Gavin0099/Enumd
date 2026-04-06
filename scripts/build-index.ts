import { readdirSync, writeFileSync, existsSync, readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

const DOCS_DIR = join(process.cwd(), "docs");

const CATEGORIES = [
  { dir: "notes",     title: "📝 筆記",     description: "日記、讀書筆記、人生感悟" },
  { dir: "travel",    title: "✈️ 旅遊",     description: "旅遊行程、花費、景點筆記" },
  { dir: "parenting", title: "👶 育嬰",     description: "育兒紀錄、幼稚園、采采與亮亮" },
  { dir: "money",     title: "💰 財務",     description: "信用卡、貸款、花費記錄" },
  { dir: "insurance", title: "🛡 保險",     description: "各類保單與保費" },
  { dir: "books",     title: "📚 讀書心得", description: "書單與讀後心得" },
  { dir: "misc",      title: "🗂 其他",     description: "餐廳、購物、雜項" },
];

function getTitle(filePath: string, filename: string): string {
  try {
    const { data } = matter(readFileSync(filePath, "utf8"));
    return data.title || filename.replace(/-/g, " ").replace(/\.md$/, "");
  } catch {
    return filename.replace(/\.md$/, "");
  }
}

for (const { dir, title, description } of CATEGORIES) {
  const dirPath = join(DOCS_DIR, dir);
  if (!existsSync(dirPath)) continue;

  const files = readdirSync(dirPath)
    .filter((f) => f.endsWith(".md") && f !== "index.md")
    .sort();

  if (files.length === 0) continue;

  const items = files
    .map((f) => `- [${getTitle(join(dirPath, f), f)}](./${f.replace(/\.md$/, "")})`)
    .join("\n");

  const content = `# ${title}\n\n> ${description}\n\n共 **${files.length}** 頁\n\n## 列表\n\n${items}\n`;
  writeFileSync(join(dirPath, "index.md"), content, "utf8");
  console.log(`[index] ${dir}/index.md (${files.length} pages)`);
}

console.log("[index] Done");
