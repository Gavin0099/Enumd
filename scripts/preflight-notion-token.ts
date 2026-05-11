/**
 * Preflight guard for Notion-backed workflows.
 * Fails fast with actionable guidance when NOTION_TOKEN is missing/invalid-like.
 */

const token = (process.env.NOTION_TOKEN || "").trim();

function fail(msg: string): never {
  console.error(`[preflight:notion] ${msg}`);
  process.exit(2);
}

if (!token) {
  fail("NOTION_TOKEN is missing. Set it in .env.local before running export/rebuild:full.");
}

if (token.length < 20) {
  fail("NOTION_TOKEN looks too short. Please verify the integration token in .env.local.");
}

if (token.includes("your_") || token.includes("replace_me") || token.includes("changeme")) {
  fail("NOTION_TOKEN appears to be a placeholder. Replace it with a real Notion integration token.");
}

console.log("[preflight:notion] OK: NOTION_TOKEN is present.");
