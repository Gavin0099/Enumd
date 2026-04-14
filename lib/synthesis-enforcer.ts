/**
 * Enumd Synthesis Enforcer (v1 - Inline Enforcement Layer)
 *
 * This module implements the mandatory enforcement gate that runs BEFORE
 * a synthesis draft is persisted to disk. Any claim that is INFERRED
 * and lacks a semantic anchor in the source XML is either REMOVED or
 * REWRITTEN as an explicit uncertainty statement.
 *
 * Execution contract:
 *   LLM draft → enforceDraft() → cleaned synthesis → writeFileSync()
 *
 * NOT negotiable: the output of this function is what gets saved.
 * The raw LLM draft is NEVER written directly to synthesis.md.
 */

export interface ClaimVerdict {
    claim: string;
    evidenceScore: number;
    tier: "Explicit" | "Derived" | "Structural" | "Inferred";
    action: "KEEP" | "DOWNGRADE" | "REMOVE";
    replacement?: string;
}

export interface EnforcementReport {
    original_claim_count: number;
    removed_count: number;
    downgraded_count: number;
    kept_count: number;
    verdicts: ClaimVerdict[];
    is_clean: boolean; // true iff removed_count === 0 && downgraded_count === 0
}

// ─────────────────────────────────────────────
// Structural Phrases Allowlist
// These are framing meta-sentences produced as part
// of synthesis structure, not semantic claims.
// They are KEPT but labeled Structural (not counted
// as unanchored violations).
// ─────────────────────────────────────────────
const STRUCTURAL_ALLOWLIST = [
    "⚠️ 此頁圖譜上下文不足",
    "摘要僅根據單一核心節點生成",
    "本內容摘要自",
    "具體操作細節請以",
    "建議查閱原始",
    "治理審查草案",
    "治理註記",
    "由於目前圖譜上下文",
    "根據以下圖譜內容",
];

// ─────────────────────────────────────────────
// Evidence Scorer
// Scores how well a line is anchored in the source XML.
// Returns a numeric score (0 = no evidence).
// ─────────────────────────────────────────────
function scoreEvidence(sentence: string, sourceXml: string): number {
    if (!sourceXml || sourceXml.trim().length === 0) return 0;

    const keywords = sentence
        .split(/[\s,()[\]「」：:、。.！？\-–_|#*`]/)
        .filter(w => w.length > 3);

    if (keywords.length === 0) return 0;

    const xmlLines = sourceXml.split("\n");
    let totalScore = 0;

    for (const kw of keywords) {
        const hit = xmlLines.some(l => l.includes(kw));
        if (hit) totalScore++;
    }

    return totalScore;
}

// ─────────────────────────────────────────────
// Claim Classifier
// Classifies each line into a tier.
// ─────────────────────────────────────────────
function classifyLine(
    line: string,
    evidenceScore: number
): "Explicit" | "Derived" | "Structural" | "Inferred" {
    const trimmed = line.trim();

    // Headers, empty lines, code fences, table rows, blockquotes are structural
    if (
        trimmed === "" ||
        trimmed.startsWith("#") ||
        trimmed.startsWith("```") ||
        trimmed.startsWith("|") ||
        trimmed.startsWith("---") ||
        trimmed.startsWith("![") ||
        trimmed.startsWith("> ")
    ) {
        return "Structural";
    }

    // Bold section headers added by LLM (e.g. "- **Decision Summary**:", "### Etoken...")
    // These are structural scaffolding, not factual claims.
    if (/^#{1,6}\s/.test(trimmed)) return "Structural";
    if (/^-?\s*\*\*[^*]+\*\*\s*:?\s*$/.test(trimmed)) return "Structural";

    // URL continuation fragments produced when LLM wraps markdown links across lines
    // e.g. "org/wiki/Software_requirements_specification) 以定義..."
    // These are NOT independent claims, they are syntactic artifacts.
    if (/^(org\/|com\/|gov\/|https?:\/\/|html\)|html$|[a-z]+\.html)/.test(trimmed)) return "Structural";
    if (/^path\/to\//.test(trimmed)) return "Structural";

    // Markdown link-only lines (e.g. "- [Title](path.html): ...") are structural references
    if (/^\s*-?\s*\[.+\]\(.+\)/.test(trimmed)) return "Structural";

    // Explicit allowlisted framing phrases
    if (STRUCTURAL_ALLOWLIST.some(p => trimmed.includes(p))) {
        return "Structural";
    }

    // Inline markdown links embedded in sentences (e.g. "產生 ECDSA 金鑰 `[Camera](url)`")
    // The link portion is a reference, not a standalone claim that needs evidence.
    if (/\[.+?\]\(.+?\)/.test(trimmed)) return "Structural";

    if (evidenceScore > 3) return "Explicit";
    if (evidenceScore >= 1) return "Derived";
    return "Inferred";
}

// ─────────────────────────────────────────────
// Determine enforcement action for an INFERRED line.
// ─────────────────────────────────────────────
function determineAction(line: string): { action: "REMOVE" | "DOWNGRADE"; replacement?: string } {
    const trimmed = line.trim();

    // Summary / generalization → REMOVE entirely
    const removePatterns = [
        "總的來說",
        "換句話說",
        "綜合以上",
        "這些做法旨在",
        "這些資訊可以幫助",
        "可以幫助開發人員",
        "旨在提高",
        "同時也與",
        "這些資訊",
        "以下是針對",
        "的詳細文件",
    ];
    if (removePatterns.some(p => trimmed.includes(p))) {
        return { action: "REMOVE" };
    }

    // Very short fragments → REMOVE
    if (trimmed.length <= 10) {
        return { action: "REMOVE" };
    }

    // Other inferred technical claims → DOWNGRADE with uncertainty prefix
    const isBullet = /^[-*]\s/.test(trimmed);
    const core = trimmed.replace(/^[-*]\s*/, "");
    const prefix = isBullet ? "- " : "";
    return {
        action: "DOWNGRADE",
        replacement: `${prefix}[未有直接 Source 錨點，待確認] ${core}`,
    };
}

// ─────────────────────────────────────────────
// Main Export: enforceDraft()
//
// This is the enforcement gate between LLM draft and disk output.
// Call BEFORE writeFileSync(synthesis.md).
// ─────────────────────────────────────────────
export function enforceDraft(
    rawDraft: string,
    sourceXml: string
): { cleanedDraft: string; report: EnforcementReport } {
    const lines = rawDraft.split("\n");
    const verdicts: ClaimVerdict[] = [];

    let removedCount = 0;
    let downgradedCount = 0;
    let keptCount = 0;

    const outputLines: string[] = [];

    for (const line of lines) {
        const score = scoreEvidence(line, sourceXml);
        const tier = classifyLine(line, score);

        if (tier === "Inferred") {
            // 🔴 ENFORCEMENT: Inferred with no anchor = violation → act now
            const { action, replacement } = determineAction(line);

            if (action === "REMOVE") {
                removedCount++;
                verdicts.push({ claim: line, evidenceScore: score, tier, action: "REMOVE" });
                // NOT added to outputLines
            } else {
                downgradedCount++;
                verdicts.push({ claim: line, evidenceScore: score, tier, action: "DOWNGRADE", replacement });
                outputLines.push(replacement!);
            }
        } else {
            keptCount++;
            verdicts.push({ claim: line, evidenceScore: score, tier, action: "KEEP" });
            outputLines.push(line);
        }
    }

    const cleanedDraft = outputLines.join("\n");

    const report: EnforcementReport = {
        original_claim_count: lines.length,
        removed_count: removedCount,
        downgraded_count: downgradedCount,
        kept_count: keptCount,
        verdicts,
        is_clean: removedCount === 0 && downgradedCount === 0,
    };

    return { cleanedDraft, report };
}
