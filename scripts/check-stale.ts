import { existsSync, statSync } from "fs";
import { join } from "path";

type CheckItem = {
  label: string;
  path: string;
  maxAgeDays: number;
};

const ROOT = process.cwd();
const DAY_MS = 24 * 60 * 60 * 1000;

const checks: CheckItem[] = [
  { label: "knowledge nodes", path: join(ROOT, "knowledge", "nodes.json"), maxAgeDays: 14 },
  { label: "knowledge edges", path: join(ROOT, "knowledge", "edges.json"), maxAgeDays: 14 },
  { label: "docs stats", path: join(ROOT, "docs", "public", "stats.json"), maxAgeDays: 14 },
];

const now = Date.now();
let missing = 0;
let stale = 0;

for (const item of checks) {
  if (!existsSync(item.path)) {
    missing += 1;
    console.log(`[missing] ${item.label}: ${item.path}`);
    continue;
  }

  const mtimeMs = statSync(item.path).mtimeMs;
  const ageDays = (now - mtimeMs) / DAY_MS;
  const ageText = ageDays.toFixed(1);

  if (ageDays > item.maxAgeDays) {
    stale += 1;
    console.log(
      `[stale] ${item.label}: age=${ageText}d (threshold=${item.maxAgeDays}d) path=${item.path}`
    );
  } else {
    console.log(
      `[ok] ${item.label}: age=${ageText}d (threshold=${item.maxAgeDays}d) path=${item.path}`
    );
  }
}

console.log(`summary: missing=${missing}, stale=${stale}, checks=${checks.length}`);
// Advisory-only check: never block pipeline at this stage.
process.exit(0);
