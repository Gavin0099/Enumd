/**
 * Atomic Claim Store
 *
 * Extracts and persists individual verified claims from the Enforcement Layer.
 * Only KEEP verdicts with tier !== Structural are stored — these are facts
 * that survived enforcement and have at least 2 keyword-matched anchors
 * in the source XML.
 *
 * Storage:
 *   Per-node  : wave_N/<slug>/claims.json
 *   Wave-level: wave_N/atomic-claims.json   (aggregate of all nodes in the wave)
 *
 * Future use:
 *   - Cross-node search: find all claims mentioning a concept
 *   - RAG query layer: embed claims for semantic retrieval
 *   - Knowledge freshness: re-run enforcement, diff against stored claims
 */

import { ClaimVerdict } from "./synthesis-enforcer";

export interface AtomicClaim {
    slug: string;
    claim: string;
    tier: "Explicit" | "Derived";   // Structural claims are excluded
    evidence_score: number;
    wave_id: number;
    batch_id: string;
}

/** Minimum claim length — filters out bullet markers, empty lines, etc. */
const MIN_CLAIM_LENGTH = 10;

/**
 * Extracts verified (non-hallucinated) claims from an enforcement report.
 * Excludes Structural tier (headers, framing sentences, link-only lines).
 */
export function extractVerifiedClaims(
    slug: string,
    verdicts: ClaimVerdict[],
    waveId: number,
    batchId: string
): AtomicClaim[] {
    return verdicts
        .filter(v =>
            v.action === "KEEP" &&
            (v.tier === "Explicit" || v.tier === "Derived") &&
            v.claim.trim().length >= MIN_CLAIM_LENGTH
        )
        .map(v => ({
            slug,
            claim: v.claim.trim(),
            tier: v.tier as "Explicit" | "Derived",
            evidence_score: v.evidenceScore,
            wave_id: waveId,
            batch_id: batchId,
        }));
}
