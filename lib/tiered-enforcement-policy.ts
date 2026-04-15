/**
 * Tiered Enforcement Policy (v1)
 *
 * Replaces the binary "阻擋 vs 標記" decision with a structured,
 * node-type-aware suppression policy for Derived-tier claims.
 *
 * Core insight (from Wave 1 backfill analysis):
 *   25% unsupported Derived claims is NOT a uniform signal.
 *   It is heavily concentrated in handoff / fragmentary nodes.
 *   Global hard gate would over-penalize thin-but-valid nodes.
 *
 * ─── Node Types ───────────────────────────────────────────────────────
 *
 *   HANDOFF     : 交接備忘, operational logs, bullet-fragment memos
 *                 These have source XML that is short + list-heavy.
 *                 Keyword hits are misleading because fragments share
 *                 vocabulary without sharing semantic context.
 *
 *   FRAGMENTARY : Structural disclaimer present, KAL SKIPPED/THIN,
 *                 synthesis is short or index-like.
 *                 These nodes cannot reliably support Derived claims.
 *
 *   STANDARD    : Normal synthesis nodes. Apply standard thresholds.
 *
 * ─── Suppression Tiers ────────────────────────────────────────────────
 *
 *   SUPPRESS_DERIVED   (HARD)
 *     Derived-tier claims are removed from output.
 *     Source-near (Explicit) claims are preserved.
 *     Triggered when unsupported concentration is systemic.
 *
 *   AUDIT_FLAG         (CONDITIONAL)
 *     Claims are kept but flagged in audit.json.
 *     Manifest marks node for priority reviewer sampling.
 *     No output is removed — cost falls on reviewer, not system.
 *
 *   PASS               (CLEAN)
 *     No action. Derived claims are treated as normal output.
 *
 * ─── Trigger Thresholds ───────────────────────────────────────────────
 *
 *   HANDOFF + unsupported_ratio >= 0.30 + derived_count >= 3
 *     → SUPPRESS_DERIVED
 *     Rationale: Wave 1 shows 交接 nodes cluster at 50–100% unsupported.
 *                Even 30% is a reliable signal for this node type.
 *
 *   ANY + unsupported_ratio >= 0.50 + derived_count >= 4
 *     → SUPPRESS_DERIVED
 *     Rationale: Majority-unsupported Derived tier means the claims
 *                cannot collectively be trusted as "derived from source".
 *
 *   ANY + unsupported_ratio in [0.20, 0.50) + derived_count >= 3
 *     → AUDIT_FLAG
 *     Rationale: Non-trivial but not majority. Flag for human review.
 *
 *   KAL = SKIPPED / THIN_SYNTHESIS
 *     → PASS (unsupported not counted as failure)
 *     Rationale: These nodes already carry structural disclaimers.
 *                Adding suppression on top of disclaimer is redundant
 *                and would collapse claims.json to near-empty.
 *
 *   Otherwise → PASS
 */

import { SemanticScoringReport } from "./semantic-scorer";

// ─── Node Type ────────────────────────────────────────────────────────────────

export type NodeType = "HANDOFF" | "FRAGMENTARY" | "STANDARD";

// Slug patterns that indicate handoff / operational memo nodes
const HANDOFF_SLUG_PATTERNS = [
    /交接/,
    /handoff/i,
    /handover/i,
    /\d{4,8}[-_]\d{2,8}[-_]?交接/,
];

// Structural disclaimer markers (copied from kal-checker)
const FRAGMENTARY_MARKERS = [
    "此頁圖譜上下文不足",
    "摘要僅根據單一核心節點生成",
];

/**
 * Classify a node into a type that drives policy selection.
 */
export function classifyNodeType(
    slug: string,
    synthesis: string,
    sourceXml: string,
    kalVerdict: "CONVERGED" | "THIN_SYNTHESIS" | "SKIPPED" | "ERROR" | "?"
): NodeType {
    // HANDOFF detection: slug pattern match
    if (HANDOFF_SLUG_PATTERNS.some(p => p.test(slug))) {
        return "HANDOFF";
    }

    // FRAGMENTARY detection: KAL already signalled thinness
    if (kalVerdict === "SKIPPED" || kalVerdict === "THIN_SYNTHESIS") {
        return "FRAGMENTARY";
    }

    // FRAGMENTARY detection: synthesis has structural disclaimer
    if (FRAGMENTARY_MARKERS.some(m => synthesis.includes(m))) {
        return "FRAGMENTARY";
    }

    // FRAGMENTARY detection: very short synthesis (index/stub)
    if (synthesis.trim().length < 120) {
        return "FRAGMENTARY";
    }

    // FRAGMENTARY detection: source XML is short and bullet-heavy
    if (sourceXml.length < 500) {
        return "FRAGMENTARY";
    }

    return "STANDARD";
}

// ─── Suppression Decision ─────────────────────────────────────────────────────

export type SuppressionTier = "SUPPRESS_DERIVED" | "AUDIT_FLAG" | "PASS";

export interface SuppressionDecision {
    tier: SuppressionTier;
    node_type: NodeType;
    unsupported_ratio: number;
    derived_count: number;
    reason: string;
    // For SUPPRESS_DERIVED: wording to inject into synthesis/audit
    suppression_note?: string;
}

/**
 * Evaluate whether Derived-tier claims should be suppressed, flagged,
 * or passed through.
 *
 * @param slug           Node slug (used for logging only)
 * @param nodeType       Classified node type
 * @param semanticReport Result of runSemanticScoring()
 * @param kalVerdict     KAL result (guards against false flags on thin nodes)
 */
export function evaluateDerivedSuppression(
    slug: string,
    nodeType: NodeType,
    semanticReport: SemanticScoringReport,
    kalVerdict: "CONVERGED" | "THIN_SYNTHESIS" | "SKIPPED" | "ERROR" | "?"
): SuppressionDecision {
    const derived = semanticReport.total_checked;
    const unsupported = semanticReport.unsupported;
    const ratio = derived > 0 ? unsupported / derived : 0;

    // FRAGMENTARY nodes: never suppress — they already have disclaimers
    // and their claims.json would be near-empty if we applied ratio gates
    if (nodeType === "FRAGMENTARY") {
        return {
            tier: "PASS",
            node_type: nodeType,
            unsupported_ratio: ratio,
            derived_count: derived,
            reason: "FRAGMENTARY node — structural disclaimer already present; suppression redundant",
        };
    }

    // No Derived claims to check → clean pass
    if (derived === 0 || semanticReport.skipped) {
        return {
            tier: "PASS",
            node_type: nodeType,
            unsupported_ratio: 0,
            derived_count: 0,
            reason: "No Derived-tier claims checked; semantic scorer skipped",
        };
    }

    // ── SUPPRESS_DERIVED triggers ──────────────────────────────────────

    // Rule 1: HANDOFF node with ≥30% unsupported and ≥3 Derived claims
    if (nodeType === "HANDOFF" && ratio >= 0.30 && derived >= 3) {
        return {
            tier: "SUPPRESS_DERIVED",
            node_type: nodeType,
            unsupported_ratio: ratio,
            derived_count: derived,
            reason: `HANDOFF node: ${unsupported}/${derived} Derived claims unsupported (${pct(ratio)}). Handoff-type sources have misleading keyword overlap.`,
            suppression_note: "⚠️ Derived-tier claims suppressed: handoff/memo source with high semantic drift. Source-near claims retained.",
        };
    }

    // Rule 2: Any node with majority unsupported and ≥4 Derived claims
    if (ratio >= 0.50 && derived >= 4) {
        return {
            tier: "SUPPRESS_DERIVED",
            node_type: nodeType,
            unsupported_ratio: ratio,
            derived_count: derived,
            reason: `Majority-unsupported Derived tier: ${unsupported}/${derived} (${pct(ratio)}). Derived claims cannot be collectively trusted as source-derived.`,
            suppression_note: "⚠️ Derived-tier claims suppressed: majority of Derived claims lacked semantic source support. Source-near claims retained.",
        };
    }

    // ── AUDIT_FLAG trigger ─────────────────────────────────────────────

    // Non-majority but non-trivial unsupported (20–49%), ≥3 Derived claims
    if (ratio >= 0.20 && derived >= 3) {
        return {
            tier: "AUDIT_FLAG",
            node_type: nodeType,
            unsupported_ratio: ratio,
            derived_count: derived,
            reason: `Non-trivial unsupported rate: ${unsupported}/${derived} Derived claims (${pct(ratio)}). Flagged for priority reviewer sampling.`,
        };
    }

    // ── PASS ──────────────────────────────────────────────────────────

    return {
        tier: "PASS",
        node_type: nodeType,
        unsupported_ratio: ratio,
        derived_count: derived,
        reason: `Unsupported rate ${pct(ratio)} (${unsupported}/${derived}) below audit threshold.`,
    };
}

// ─── Claim Filter ─────────────────────────────────────────────────────────────

import { AtomicClaim } from "./claim-store";

/**
 * Applies a suppression decision to a claims list.
 * SUPPRESS_DERIVED → removes all Derived-tier claims.
 * AUDIT_FLAG / PASS → returns unchanged.
 */
export function applySuppressionToClaims(
    claims: AtomicClaim[],
    decision: SuppressionDecision
): { filtered: AtomicClaim[]; removed_count: number } {
    if (decision.tier !== "SUPPRESS_DERIVED") {
        return { filtered: claims, removed_count: 0 };
    }
    const filtered = claims.filter(c => c.tier !== "Derived");
    return { filtered, removed_count: claims.length - filtered.length };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function pct(ratio: number): string {
    return `${(ratio * 100).toFixed(0)}%`;
}
