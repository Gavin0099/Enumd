/**
 * Semantic Evidence Scorer
 *
 * Post-enforcement semantic verification pass.
 * The Enforcer uses keyword counting (fast, sync, zero API cost).
 * This module adds a semantic layer on top — asking Claude whether
 * each "Derived" tier claim (borderline, 2–3 keyword hits) is
 * actually supported by the source XML.
 *
 * Design decisions:
 *   - Only checks "Derived" claims (Explicit have ≥4 keyword hits,
 *     already strong signal; Structural are meta-sentences).
 *   - Batches all Derived claims into ONE API call per node to
 *     keep cost minimal.
 *   - Non-blocking: enforcement verdicts are NOT overridden.
 *     Results are stored as `semantic_audit` in audit.json for
 *     reviewer visibility.
 *   - sourceXml is truncated to 3 000 chars to stay within
 *     Haiku's optimal prompt window.
 *
 * Verdict semantics:
 *   SUPPORTED   — source clearly backs the claim
 *   UNCERTAIN   — source partially relates but doesn't confirm
 *   UNSUPPORTED — source does not contain supporting information
 */

import Anthropic from "@anthropic-ai/sdk";
import { ClaimVerdict } from "./synthesis-enforcer";

export type SemanticVerdict = "SUPPORTED" | "UNCERTAIN" | "UNSUPPORTED";

export interface SemanticClaimResult {
    claim: string;
    verdict: SemanticVerdict;
    reason: string;
}

export interface SemanticScoringReport {
    total_checked: number;
    supported: number;
    uncertain: number;
    unsupported: number;
    unsupported_claims: SemanticClaimResult[];
    model_used: string;
    skipped: boolean;
    skip_reason?: string;
}

const SEMANTIC_MODEL = "claude-3-haiku-20240307";
const SOURCE_CHAR_LIMIT = 3000;

function buildPrompt(claims: string[], sourceXml: string): string {
    const truncatedSource = sourceXml.length > SOURCE_CHAR_LIMIT
        ? sourceXml.slice(0, SOURCE_CHAR_LIMIT) + "\n[... truncated ...]"
        : sourceXml;

    const claimList = claims.map((c, i) => `[${i + 1}] ${c}`).join("\n");

    return `You are verifying whether claims are supported by a source document.

SOURCE DOCUMENT:
---
${truncatedSource}
---

CLAIMS TO VERIFY (these are borderline — verify carefully):
${claimList}

For each claim, judge whether the SOURCE DOCUMENT supports it:
- "SUPPORTED"   — source clearly contains information that backs this claim
- "UNCERTAIN"   — source partially relates but does not clearly confirm the claim
- "UNSUPPORTED" — source does not contain information that backs this claim

Output ONLY valid JSON, no surrounding text or markdown fences:
{
  "results": [
    { "index": 1, "verdict": "SUPPORTED" | "UNCERTAIN" | "UNSUPPORTED", "reason": "one sentence" }
  ]
}`;
}

function parseResponse(
    raw: string,
    claims: string[]
): SemanticClaimResult[] {
    const cleaned = raw
        .replace(/^```json\s*/m, "")
        .replace(/^```\s*/m, "")
        .replace(/```\s*$/m, "")
        .trim();

    const parsed: { results: { index: number; verdict: SemanticVerdict; reason: string }[] } =
        JSON.parse(cleaned);

    return parsed.results.map(r => ({
        claim: claims[r.index - 1] ?? "[unknown]",
        verdict: r.verdict,
        reason: r.reason,
    }));
}

/**
 * Runs semantic verification on all "Derived" tier claims from the
 * enforcement report. Returns a SemanticScoringReport.
 *
 * @param verdicts  - Full enforcement verdicts from enforceDraft()
 * @param sourceXml - Source XML used during synthesis
 * @param anthropic - Initialized Anthropic client
 */
export async function runSemanticScoring(
    verdicts: ClaimVerdict[],
    sourceXml: string,
    anthropic: Anthropic
): Promise<SemanticScoringReport> {
    // Only check Derived tier (borderline keyword hits)
    const derivedClaims = verdicts
        .filter(v => v.action === "KEEP" && v.tier === "Derived")
        .map(v => v.claim.trim())
        .filter(c => c.length >= 10);

    if (derivedClaims.length === 0) {
        return {
            total_checked: 0,
            supported: 0,
            uncertain: 0,
            unsupported: 0,
            unsupported_claims: [],
            model_used: "none",
            skipped: true,
            skip_reason: "No Derived-tier claims to verify",
        };
    }

    const prompt = buildPrompt(derivedClaims, sourceXml);

    const response = await anthropic.messages.create({
        model: SEMANTIC_MODEL,
        max_tokens: 1024,
        temperature: 0.0,
        messages: [{ role: "user", content: prompt }],
    });

    const raw = response.content[0].type === "text" ? response.content[0].text : "{}";

    let results: SemanticClaimResult[] = [];
    try {
        results = parseResponse(raw, derivedClaims);
    } catch {
        return {
            total_checked: derivedClaims.length,
            supported: 0,
            uncertain: 0,
            unsupported: 0,
            unsupported_claims: [],
            model_used: SEMANTIC_MODEL,
            skipped: true,
            skip_reason: `JSON parse failed. Raw: ${raw.slice(0, 120)}`,
        };
    }

    const supported  = results.filter(r => r.verdict === "SUPPORTED").length;
    const uncertain  = results.filter(r => r.verdict === "UNCERTAIN").length;
    const unsupported = results.filter(r => r.verdict === "UNSUPPORTED").length;

    return {
        total_checked: results.length,
        supported,
        uncertain,
        unsupported,
        unsupported_claims: results.filter(r => r.verdict === "UNSUPPORTED"),
        model_used: SEMANTIC_MODEL,
        skipped: false,
    };
}
