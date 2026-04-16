/**
 * Domain Advisory — v1.0 Instrumentation Module
 *
 * Computes a verdict-neutral advisory signal for each synthesized node.
 * This does NOT change suppression decisions, claim counts, or any
 * existing output. It only surfaces cross-domain misalignment risk for
 * reviewer visibility.
 *
 * Purpose (Slice 1): convert silent SUPPRESS/FLAG events into observable
 * signals so reviewers can distinguish "SUPPRESS because hallucination"
 * from "SUPPRESS because keyword-matching gap".
 *
 * Key observation metrics (computed by advisory-replay.ts):
 *   suppress_without_signal_count  — miss rate (suppression fired, no advisory)
 *   signal_without_suppress_count  — over-signal rate (advisory fired, no suppression)
 *   domain_advisory_by_type        — which signals are firing
 */

import { AtomicClaim } from "./claim-store";

export interface DomainAdvisory {
    risk_level: "NONE" | "LOW" | "MODERATE" | "HIGH";
    signals: Array<
        | "low_semantic_overlap"
        | "domain_misalignment_risk"
        | "external_tool_context_gap"
        | "paraphrase_mismatch_suspected"
    >;
    corpus_overlap_score: number;
    note: string;
    instrumentation_version: "1.0";
}

export interface SuppressionRef {
    tier: string;
    unsupported_ratio: number;
    derived_count: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Cross-domain slug patterns
// Nodes whose content may differ from the Windows/USB/driver-centric source
// corpus. Intentionally conservative — only clear cross-domain identifiers.
// ─────────────────────────────────────────────────────────────────────────────
const CROSS_DOMAIN_SLUG_PATTERNS: RegExp[] = [
    /lenovo/i,
    /linux/i,
    /macos|mac-oci|mac-usb|xcode/i,
    /vmware/i,
    /android/i,
    /teledyne/i,
    /saleae/i,
    /zeroplus/i,
    /outlook/i,
    /vibe.coding/i,
    /ssdlc/i,
    /sunplus.*arm|arm.*arm64/i,
];

// ─────────────────────────────────────────────────────────────────────────────
// List / reference document slug patterns
// These generate paraphrase-style Derived claims that fail keyword matching.
// Not hallucination — a matching gap in the keyword-based scorer.
// ─────────────────────────────────────────────────────────────────────────────
const LIST_REFERENCE_DOC_PATTERNS: RegExp[] = [
    /command.line.list/i,
    /command.list/i,
    /error.code/i,
    /tri.code.command/i,
    /-cli.*list/i,
];

// Minimum claims to compute a meaningful overlap score
const MIN_CLAIMS_FOR_OVERLAP = 3;

// Corpus overlap threshold — below this, claims are weakly keyword-anchored
// relative to the average v1 node. Tuned conservatively to avoid over-signaling.
const LOW_OVERLAP_THRESHOLD = 0.28;

// External tool context gap: cross-domain slug + source overlap even lower
const CONTEXT_GAP_THRESHOLD = 0.35;

// ─────────────────────────────────────────────────────────────────────────────
// Corpus Overlap Scorer
// Measures average fraction of claim tokens that appear in source XML.
// This is computed across all retained claims, not just Derived tier,
// so it is independent of semantic scoring.
// ─────────────────────────────────────────────────────────────────────────────
function computeCorpusOverlapScore(claims: AtomicClaim[], sourceXml: string): number {
    if (claims.length === 0 || !sourceXml) return 0;

    let totalRatio = 0;
    let counted = 0;

    for (const claim of claims) {
        const tokens = claim.claim
            .split(/[\s,()[\]「」：:、。.！？\-–_|#*`"'\/\\]/)
            .filter(w => w.length >= 2);
        if (tokens.length === 0) continue;

        const hits = tokens.filter(t => sourceXml.includes(t)).length;
        totalRatio += hits / tokens.length;
        counted++;
    }

    return counted > 0 ? totalRatio / counted : 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────────────────
export function computeDomainAdvisory(
    slug: string,
    sourceXml: string,
    claims: AtomicClaim[],
    suppression: SuppressionRef
): DomainAdvisory {
    const signals: DomainAdvisory["signals"] = [];

    const corpus_overlap_score = computeCorpusOverlapScore(claims, sourceXml);

    // Signal 1: low_semantic_overlap
    // Claims are weakly anchored to source, regardless of verdict.
    if (claims.length >= MIN_CLAIMS_FOR_OVERLAP && corpus_overlap_score < LOW_OVERLAP_THRESHOLD) {
        signals.push("low_semantic_overlap");
    }

    // Signals 2 & 3: domain_misalignment_risk + external_tool_context_gap
    // Check slug against cross-domain patterns.
    const isCrossDomain = CROSS_DOMAIN_SLUG_PATTERNS.some(p => p.test(slug));
    if (isCrossDomain) {
        signals.push("domain_misalignment_risk");

        // If source XML also doesn't provide much context for this domain
        // (i.e., the cross-domain content is not meaningfully represented
        // in the corpus), escalate to external_tool_context_gap.
        if (corpus_overlap_score < CONTEXT_GAP_THRESHOLD) {
            signals.push("external_tool_context_gap");
        }
    }

    // Signal 4: paraphrase_mismatch_suspected
    // AUDIT_FLAG on a known list/reference doc type — likely a matching gap,
    // not hallucination.
    const isListRefDoc = LIST_REFERENCE_DOC_PATTERNS.some(p => p.test(slug));
    if (suppression.tier === "AUDIT_FLAG" && isListRefDoc) {
        signals.push("paraphrase_mismatch_suspected");
    }

    const risk_level: DomainAdvisory["risk_level"] =
        signals.length === 0 ? "NONE"
        : signals.length === 1 ? "LOW"
        : signals.length === 2 ? "MODERATE"
        : "HIGH";

    const note = signals.length === 0
        ? `No cross-domain risk signals. corpus_overlap=${corpus_overlap_score.toFixed(2)}.`
        : `Signals: [${signals.join(", ")}]. corpus_overlap=${corpus_overlap_score.toFixed(2)}.`;

    return {
        risk_level,
        signals,
        corpus_overlap_score,
        note,
        instrumentation_version: "1.0",
    };
}
