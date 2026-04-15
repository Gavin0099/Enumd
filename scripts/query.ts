/**
 * Enumd Knowledge Query CLI
 *
 * Searches the synthesized knowledge corpus and returns ranked results.
 *
 * Data sources (in priority order):
 *   1. atomic-claims.json — per-wave verified claim index (available after backfill)
 *   2. synthesis.md       — full synthesis fallback (always available)
 *
 * Usage:
 *   npx tsx scripts/query.ts <query>
 *   npx tsx scripts/query.ts <query> --top=10
 *   npx tsx scripts/query.ts <query> --wave=1
 *   npx tsx scripts/query.ts <query> --mode=claims   # force claims-only
 *   npx tsx scripts/query.ts <query> --mode=full     # force synthesis full-text
 *
 * Examples:
 *   npx tsx scripts/query.ts "Camera code sign"
 *   npx tsx scripts/query.ts "ECDSA 簽章" --top=3
 *   npx tsx scripts/query.ts "OKR" --wave=1
 */

import { readFileSync, readdirSync, existsSync, statSync } from "fs";
import { join } from "path";

// ─── Types ───────────────────────────────────────────────────────────────────

interface AtomicClaim {
    slug: string;
    claim: string;
    tier: string;
    evidence_score: number;
    wave_id: number;
    batch_id: string;
}

interface SearchResult {
    slug: string;
    wave: number;
    score: number;
    excerpts: string[];
    source: "claims" | "synthesis";
}

// ─── Args ────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const query = args.filter(a => !a.startsWith("--")).join(" ").trim();
const topN = parseInt(args.find(a => a.startsWith("--top="))?.split("=")[1] ?? "5");
const waveFilter = args.find(a => a.startsWith("--wave="))?.split("=")[1];
const modeArg = args.find(a => a.startsWith("--mode="))?.split("=")[1] as "claims" | "full" | undefined;

if (!query) {
    console.error("Usage: npx tsx scripts/query.ts <query> [--top=N] [--wave=N] [--mode=claims|full]");
    process.exit(1);
}

// ─── Tokenizer ───────────────────────────────────────────────────────────────

function tokenize(text: string): string[] {
    return text
        .split(/[\s,()[\]「」：:、。.！？\-–_|#*`\n\r]/)
        .map(w => w.trim())
        .filter(w => w.length >= 2);
}

function scoreText(tokens: string[], text: string): { score: number; matches: string[] } {
    let score = 0;
    const matches: string[] = [];
    for (const token of tokens) {
        if (text.includes(token)) {
            score++;
            // Find the line containing the token for excerpt
            const line = text.split("\n").find(l => l.includes(token));
            if (line && line.trim().length > 5) {
                const trimmed = line.trim();
                if (!matches.includes(trimmed)) matches.push(trimmed);
            }
        }
    }
    return { score, matches };
}

// ─── Discovery ───────────────────────────────────────────────────────────────

const PROD_DIR = join(process.cwd(), "knowledge", "production_v1");

function getWaveDirs(): { path: string; wave: number }[] {
    if (!existsSync(PROD_DIR)) return [];
    return readdirSync(PROD_DIR)
        .filter(d => /^wave_\d+$/.test(d))
        .filter(d => !waveFilter || d === `wave_${waveFilter}`)
        .map(d => ({ path: join(PROD_DIR, d), wave: parseInt(d.replace("wave_", "")) }))
        .sort((a, b) => a.wave - b.wave);
}

function getNodeDirs(waveDir: string): string[] {
    return readdirSync(waveDir).filter(d => {
        try { return statSync(join(waveDir, d)).isDirectory(); } catch { return false; }
    });
}

// ─── Search Strategies ───────────────────────────────────────────────────────

function searchClaims(tokens: string[], waveDirs: { path: string; wave: number }[]): SearchResult[] {
    const results: SearchResult[] = [];
    for (const { path: waveDir, wave } of waveDirs) {
        const claimsPath = join(waveDir, "atomic-claims.json");
        if (!existsSync(claimsPath)) continue;
        const claims: AtomicClaim[] = JSON.parse(readFileSync(claimsPath, "utf8"));

        // Group claims by slug, score each slug
        const bySlug = new Map<string, AtomicClaim[]>();
        for (const c of claims) {
            if (!bySlug.has(c.slug)) bySlug.set(c.slug, []);
            bySlug.get(c.slug)!.push(c);
        }

        for (const [slug, slugClaims] of bySlug) {
            const excerpts: string[] = [];
            let totalScore = 0;
            for (const c of slugClaims) {
                const { score, matches } = scoreText(tokens, c.claim);
                if (score > 0) {
                    totalScore += score;
                    excerpts.push(...matches.slice(0, 2));
                }
            }
            if (totalScore > 0) {
                results.push({ slug, wave, score: totalScore, excerpts: [...new Set(excerpts)].slice(0, 4), source: "claims" });
            }
        }
    }
    return results;
}

function searchSynthesis(tokens: string[], waveDirs: { path: string; wave: number }[]): SearchResult[] {
    const results: SearchResult[] = [];
    for (const { path: waveDir, wave } of waveDirs) {
        for (const slug of getNodeDirs(waveDir)) {
            const synthPath = join(waveDir, slug, "synthesis.md");
            if (!existsSync(synthPath)) continue;
            const text = readFileSync(synthPath, "utf8");
            const { score, matches } = scoreText(tokens, text);
            if (score > 0) {
                results.push({ slug, wave, score, excerpts: matches.slice(0, 4), source: "synthesis" });
            }
        }
    }
    return results;
}

// ─── Render ──────────────────────────────────────────────────────────────────

function truncate(s: string, n: number): string {
    return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

function render(results: SearchResult[], query: string, usedSource: "claims" | "synthesis" | "mixed") {
    const sourceLabel = usedSource === "claims"
        ? "atomic claims index"
        : usedSource === "synthesis"
        ? "synthesis full-text"
        : "claims + synthesis";

    console.log(`\n🔍 Query: "${query}"  |  Source: ${sourceLabel}  |  Top ${Math.min(results.length, topN)} of ${results.length} results\n`);
    console.log("─".repeat(72));

    const top = results.slice(0, topN);
    for (let i = 0; i < top.length; i++) {
        const r = top[i];
        console.log(`\n[${i + 1}] ${r.slug}  (Wave ${r.wave}, score: ${r.score})`);
        console.log(`    📄 knowledge/production_v1/wave_${r.wave}/${r.slug}/synthesis.md`);
        for (const ex of r.excerpts.slice(0, 3)) {
            console.log(`    ▸ ${truncate(ex, 90)}`);
        }
    }

    if (results.length === 0) {
        console.log("  No results found. Try broader keywords or remove --wave filter.");
    }
    console.log("\n" + "─".repeat(72));
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
    const tokens = tokenize(query);
    if (tokens.length === 0) {
        console.error("Query produced no searchable tokens.");
        process.exit(1);
    }

    const waveDirs = getWaveDirs();
    if (waveDirs.length === 0) {
        console.error("No wave directories found in knowledge/production_v1/. Run wave synthesis first.");
        process.exit(1);
    }

    // Determine whether claims index is available
    const hasClaimsIndex = waveDirs.some(({ path: w }) => existsSync(join(w, "atomic-claims.json")));

    let results: SearchResult[];
    let usedSource: "claims" | "synthesis" | "mixed";

    if (modeArg === "full" || (!hasClaimsIndex && modeArg !== "claims")) {
        // Fallback to full synthesis search
        results = searchSynthesis(tokens, waveDirs).sort((a, b) => b.score - a.score);
        usedSource = "synthesis";
    } else if (modeArg === "claims" && !hasClaimsIndex) {
        console.error("No atomic-claims.json found. Run 'npm run backfill:audit -- --wave=1' first.");
        process.exit(1);
    } else if (hasClaimsIndex) {
        // Use claims index — merge with synthesis for any wave missing claims
        const claimResults = searchClaims(tokens, waveDirs);
        const wavesWithClaims = new Set(claimResults.map(r => r.wave));
        const wavesWithoutClaims = waveDirs.filter(w => !wavesWithClaims.has(w.wave) && !existsSync(join(w.path, "atomic-claims.json")));
        const synthFallback = wavesWithoutClaims.length > 0 ? searchSynthesis(tokens, wavesWithoutClaims) : [];
        results = [...claimResults, ...synthFallback].sort((a, b) => b.score - a.score);
        usedSource = synthFallback.length > 0 ? "mixed" : "claims";
    } else {
        results = searchSynthesis(tokens, waveDirs).sort((a, b) => b.score - a.score);
        usedSource = "synthesis";
    }

    render(results, query, usedSource);
}

main();
