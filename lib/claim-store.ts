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
 * Second-defense sanitization patterns.
 *
 * The enforcer's classifyLine() marks Mermaid syntax as Structural,
 * but if a claim somehow passes through (e.g., partial context re-use
 * or future code paths), these patterns prevent diagram code from
 * entering the claim store.
 *
 * Extend this list if new code/config noise patterns are observed.
 */
const SANITIZATION_PATTERNS: RegExp[] = [
    // ── Mermaid (all waves) ─────────────────────────────────────────────────
    /:::\w/,                                                      // node class annotation (:::inputNode)
    /^subgraph[\s\[]/,                                            // subgraph block
    /^\s*-->/,                                                    // edge continuation
    /^(graph|flowchart)\s+(TD|LR|RL|BT|TB)\b/,                   // graph declaration
    /^(sequenceDiagram|classDiagram|gantt|pie|erDiagram)\b/,      // diagram type
    /^%%/,                                                        // comment
    /^classDef\s+\w/,                                             // CSS class definition
    /^[A-Za-z_]\w*\s+-->/,                                       // edge (NodeId --> NodeId)
    /^[A-Za-z_]\w*\s+--\s*[">]/,                                 // labeled edge
    /^style\s+\w+\s+fill:/,                                       // inline node style
    /^[A-Za-z_]\w*[\{\[\(]["<]/,                                  // node with HTML label (shapes)
    /^class\s+[\w,]+\s+\w+$/,                                     // batch class assignment
    /^linkStyle\s+[\d,\s]+\w/,                                    // link style override
    // ── Operational fragments ───────────────────────────────────────────────
    /^\w+\.exe\s+"[\/\-]/,                                        // CLI invocation (Tool.exe "/flag=...")
    /^\$[A-Za-z_]\w*\s*=/,                                        // PowerShell variable assignment
    /^\(\d+\)\s+\w/,                                              // USB device enumeration "(52) Device"
    /^\d+\.\d+\s+(OUT|IN|SETUP|SPLIT)\b/,                         // protocol capture data
    /^Device\s+Phase\s+Data/,                                     // capture log table header
];

function isSanitized(text: string): boolean {
    const t = text.trim();
    return SANITIZATION_PATTERNS.some(p => p.test(t));
}

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
            v.claim.trim().length >= MIN_CLAIM_LENGTH &&
            !isSanitized(v.claim)
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
