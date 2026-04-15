/**
 * KAL Checker — Knowledge Acquisition Loop self-questioning pass
 *
 * After enforcement, this module asks the LLM 3 test questions
 * about the synthesized node and tries to answer them using ONLY
 * the cleaned synthesis text.
 *
 * Convergence contract:
 *   >= 2/3 ANSWERABLE → CONVERGED  ✅
 *   <  2/3 ANSWERABLE → THIN_SYNTHESIS ⚠️ (flagged, not blocked)
 *
 * This catches nodes that passed the Enforcer but are still too sparse
 * to be useful — the Enforcer only removes hallucinations, KAL checks
 * whether enough real information survived.
 */

import Anthropic from "@anthropic-ai/sdk";

export type KalVerdict = "ANSWERABLE" | "PARTIAL" | "UNANSWERABLE";

export interface KalQuestion {
    question: string;
    verdict: KalVerdict;
    justification: string;
}

export interface KalResult {
    questions: KalQuestion[];
    passed: number;       // ANSWERABLE count
    total: number;        // total questions generated
    convergence_rate: number; // passed / total (0–1)
    verdict: "CONVERGED" | "THIN_SYNTHESIS" | "SKIPPED";
    skip_reason?: string; // only set when verdict === "SKIPPED"
    model_used: string;
}

// Minimum ANSWERABLE questions required to declare convergence
const KAL_PASS_THRESHOLD = 2;
const KAL_QUESTION_COUNT = 3;
const KAL_MODEL = "claude-3-haiku-20240307";

// Nodes with these markers have structurally thin context — skip KAL
// (the Enforcer already labelled them with a structural disclaimer)
const THIN_CONTEXT_MARKERS = [
    "此頁圖譜上下文不足",
    "摘要僅根據單一核心節點生成",
];

function isThinContext(synthesis: string): boolean {
    if (synthesis.trim().length < 80) return true;
    return THIN_CONTEXT_MARKERS.some(m => synthesis.includes(m));
}

function buildKalPrompt(slug: string, synthesis: string): string {
    return `You are evaluating whether a knowledge synthesis entry is self-sufficient.

Node topic: "${slug}"

SYNTHESIS TEXT — this is the ONLY information you may use:
---
${synthesis}
---

Instructions:
1. Generate exactly ${KAL_QUESTION_COUNT} factual questions a reader would reasonably ask about "${slug}".
2. Attempt to answer each question using ONLY the synthesis text above.
3. Label each answer:
   - "ANSWERABLE"   — synthesis contains sufficient information
   - "PARTIAL"      — synthesis hints at the answer but lacks detail
   - "UNANSWERABLE" — synthesis does not contain the information

Output ONLY valid JSON, no surrounding text or markdown fences:
{
  "questions": [
    {
      "question": "...",
      "verdict": "ANSWERABLE" | "PARTIAL" | "UNANSWERABLE",
      "justification": "one sentence"
    }
  ]
}`;
}

function parseKalResponse(raw: string): { questions: KalQuestion[] } {
    // Strip optional markdown code fences
    const cleaned = raw
        .replace(/^```json\s*/m, "")
        .replace(/^```\s*/m, "")
        .replace(/```\s*$/m, "")
        .trim();
    return JSON.parse(cleaned);
}

export async function runKalCheck(
    slug: string,
    synthesis: string,
    anthropic: Anthropic
): Promise<KalResult> {
    // Skip for structurally thin context nodes
    if (isThinContext(synthesis)) {
        return {
            questions: [],
            passed: 0,
            total: 0,
            convergence_rate: 0,
            verdict: "SKIPPED",
            skip_reason: "Synthesis flagged as thin context (structural disclaimer present or too short)",
            model_used: "none",
        };
    }

    const prompt = buildKalPrompt(slug, synthesis);

    const response = await anthropic.messages.create({
        model: KAL_MODEL,
        max_tokens: 1024,
        temperature: 0.1,
        messages: [{ role: "user", content: prompt }],
    });

    const raw = response.content[0].type === "text" ? response.content[0].text : "{}";

    let parsed: { questions: KalQuestion[] } = { questions: [] };
    try {
        parsed = parseKalResponse(raw);
    } catch {
        // If JSON parse fails, treat entire check as failed
        parsed = {
            questions: [
                {
                    question: "[KAL parse error]",
                    verdict: "UNANSWERABLE",
                    justification: `Failed to parse KAL JSON response. Raw: ${raw.slice(0, 120)}`,
                },
            ],
        };
    }

    const questions: KalQuestion[] = parsed.questions ?? [];
    const passed = questions.filter(q => q.verdict === "ANSWERABLE").length;
    const total = questions.length;
    const convergence_rate = total > 0 ? passed / total : 0;

    return {
        questions,
        passed,
        total,
        convergence_rate,
        verdict: passed >= KAL_PASS_THRESHOLD ? "CONVERGED" : "THIN_SYNTHESIS",
        model_used: KAL_MODEL,
    };
}
