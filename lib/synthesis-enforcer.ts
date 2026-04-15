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
        .filter(w => w.length >= 2);

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

    // Bold headers added by LLM (e.g. "**需求管理**:") 
    // If it's a structural list item like "- **Key**:", keep as Structural.
    // Otherwise, treat as content that needs anchoring.
    if (/^-\s*\*\*[^*]+\*\*\s*:?\s*$/.test(trimmed)) return "Structural";

    // Common structural artifacts from markdown/code wrapping
    if (/^(org\/|com\/|gov\/|https?:\/\/|html\)|html$|%[0-9A-Fa-f]{2}|www\.)/.test(trimmed)) return "Structural";
    if (/^[\/\.a-zA-Z0-9_\-]+\)$/.test(trimmed)) return "Structural"; // link fragments
    if (/^if\s*\(/.test(trimmed)) return "Structural"; // code fragments
    if (/^path\/to\//.test(trimmed)) return "Structural";

    // Markdown link-only lines (e.g. "- [Title](path.html)") are structural references
    if (/^\s*-?\s*\[.+\]\(.+\)\s*$/.test(trimmed)) return "Structural";

    // Explicit allowlisted framing phrases
    if (STRUCTURAL_ALLOWLIST.some(p => trimmed.includes(p))) {
        return "Structural";
    }

    // Inline markdown links (e.g. "Text [Link](url)")
    // DO NOT bypass as Structural anymore. If the line has text, it must be anchored.
    // However, if the line is JUST the link (already caught above), it stays structural.

    if (evidenceScore > 3) return "Explicit";
    if (evidenceScore >= 2) return "Derived"; // raised from 1 → 2: single-token hits are too noisy
    return "Inferred";
}

// ─────────────────────────────────────────────
// Determine enforcement action for an INFERRED line.
// ─────────────────────────────────────────────
function determineAction(
    line: string,
    evidenceScore: number
): { action: "REMOVE" | "DOWNGRADE"; replacement?: string } {
    const trimmed = line.trim();

    // If evidence score is 0 (no keyword hit at all in source),
    // this is a completely unanchored claim → REMOVE to prevent false positives
    if (evidenceScore === 0) {
        return { action: "REMOVE" };
    }

    // Partial evidence (score > 0 but still Inferred) → DOWNGRADE with uncertainty prefix
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

    const removePatterns = [
        // ── 總結型開頭 ──────────────────────────────────
        "總的來說",
        "總而言之",
        "總結來說",
        "綜上所述",
        "綜合以上",
        "綜合上述",
        "綜合來說",
        "換句話說",
        "換言之",
        "也就是說",
        "由此可見",
        "可以看出",
        "整體而言",
        "整體來看",
        "整體來說",

        // ── 旨在 / 目的 同義詞族 ────────────────────────
        "旨在提高",
        "旨在確保",
        "旨在透過",
        "旨在定義",
        "旨在根據",
        "旨在描述",
        "旨在建立",
        "旨在提供",
        "旨在幫助",
        "旨在改善",
        "目的在於",
        "目標是為了",
        "致力於",
        "用於確保",
        "用於提供",

        // ── 這些 XXX 系列 ────────────────────────────────
        "這些做法旨在",
        "這些做法",
        "這些資訊可以幫助",
        "這些資訊",
        "這些作法",
        "這些措施",
        "這些機制",
        "這造成需求",
        "這項工作流程",
        "這樣的設計",
        "這樣的做法",

        // ── 幫助 / 提供 類 ────────────────────────────────
        "可以幫助開發人員",
        "可以幫助",
        "提供了一個集中的位置",
        "也提供了相關的操作截圖",
        "提供了一個",
        "提供了完整",

        // ── 文件 / 說明 類套語 ───────────────────────────
        "以下是針對",
        "的詳細文件",
        "詳細說明了",
        "詳細描述了",
        "詳細介紹了",
        "本文件概述了",
        "本內容摘要自",

        // ── 其他常見 framing 語 ──────────────────────────
        "同時也與",
        "確保跨平台開發與底層",
        "工作是獲得經濟報酬的活動",
        "具體體現",
        "涉及了",
        "我們也要做出相應的工具",
        "透過以上這些",
        "透過這些做法",
        "透過這些機制",
        "有助於",
    ];

    for (const line of lines) {
        const trimmed = line.trim();

        // 🟢 MANDATORY PURGE: Framing and summary fragments are removed regardless of evidence.
        if (removePatterns.some(p => trimmed.includes(p))) {
            removedCount++;
            continue;
        }

        // 🟢 FRAGMENT PURGE: Synthetic artifacts (link tails, code parts)
        if (trimmed.length > 0 && (trimmed.length <= 15 || /^[a-z]+\)$|^if\s*\(/.test(trimmed))) {
            removedCount++;
            continue;
        }

        const score = scoreEvidence(line, sourceXml);
        const tier = classifyLine(line, score);

        if (tier === "Inferred") {
            // 🔴 ENFORCEMENT: Inferred with zero or partial anchor
            const { action, replacement } = determineAction(line, score);

            if (action === "REMOVE") {
                removedCount++;
                verdicts.push({ claim: line, evidenceScore: score, tier, action: "REMOVE" });
            } else {
                downgradedCount++;
                outputLines.push(replacement || line);
                verdicts.push({ claim: line, evidenceScore: score, tier, action: "DOWNGRADE", replacement });
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
