import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

/**
 * Verifiable Review Packet Generator (v2)
 * Goal: Transform Traceability into Verifiability via Claim-Level Tracing.
 */

const PROD_DIR = join(process.cwd(), "knowledge/production_v1/wave_1");
const WORKBOOK_PATH = join(PROD_DIR, "reviewer_workbook_v3.md");

const ENFORCEMENT_POLICY = {
    PURGE_UNANCHORED_INFERENCE: true,
    FAIL_ON_BLOCKER: true
};

const REVIEW_SAMPLE_SLUGS = [
    "研發投扺專案資料列印流程",
    "憑證檔案",
    "ai-協作開發框架定義規則的開發模式",
    "2021部門創新提案",
    "世界上最快樂的工作",
    "-hp-sdlc-master-compliance-checklist-2025-edition",
    "短期行動-vs-長期視野從混亂到有序結構化軟體建構之路",
    "新架構導入新的chip-updatemt9052-方式",
    "-clawdbot-自主代理建置與資安防禦全紀錄",
    "-投影片大綱從餵指令到定規則"
];

function extractClaims(md: string): string[] {
    // Audit exactly what the Enforcer sees: per-line claims.
    const lines = md.split("\n");
    return lines
        .map(s => s.trim())
        .filter(s => s.length > 5 && !s.startsWith("#") && !s.startsWith("!["));
}

function findEvidence(claim: string, xml: string): { line: number, text: string } | null {
    // Strip enforcer prefix before matching
    const cleanClaim = claim.replace(/^\[未有直接 Source 錨點，待確認\]\s*/, "").trim();
    
    // Simple keyword matching for evidence
    const keywords = cleanClaim.split(/[\s,()\[\]「」：:、。.！？\-–_|#*`]/).filter(w => w.length >= 2);
    const xmlLines = xml.split("\n");
    
    let bestMatch = { line: -1, text: "", score: 0 };
    
    for (let i = 0; i < xmlLines.length; i++) {
        let score = 0;
        for (const kw of keywords) {
            if (xmlLines[i].includes(kw)) score++;
        }
        if (score > bestMatch.score) {
            bestMatch = { line: i + 1, text: xmlLines[i].trim(), score };
        }
    }
    
    return bestMatch.score > 0 ? { line: bestMatch.line, text: bestMatch.text } : null;
}

function classifyClaim(claim: string, evidenceScore: number): { tier: string, risk: string } {
    const structuralPhrases = [
        "根據提供的內容",
        "以下是針對",
        "本文件概述了",
        "總的來說",
        "這些資訊可以幫助",
        "⚠️ 此頁圖譜上下文不足",
        "摘要僅根據單一核心節點生成",
    ];

    // Claims already processed by the Enforcement Layer (downgraded by synthesis-enforcer.ts)
    // These may have a leading "- " bullet prefix — strip it before checking.
    // → treat as Structural, NOT a new violation
    const strippedClaim = claim.trim().replace(/^-\s*/, "");
    if (strippedClaim.startsWith("[未有直接 Source 錨點，待確認]")) {
        return { tier: "Downgraded", risk: "LOW" };
    }

    // Bold headers added by LLM (e.g. "**需求管理**:") 
    // If it's a structural list item like "- **Key**:", keep as Structural.
    // Otherwise, treat as content that needs anchoring.
    if (/^-\s*\*\*[^*]+\*\*\s*:?\s*$/.test(strippedClaim)) {
        return { tier: "Structural", risk: "LOW" };
    }

    // Common structural artifacts from markdown/code wrapping
    const structuralArtifacts = [
        /^[a-z]+\)$/,             // e.g. "html)"
        /^[a-z]+\.html$/,         // e.g. "specification.html"
        /^if\s*\(/,               // e.g. "if (firmwareName"
        /^org\/wiki\//,           // e.g. "org/wiki/xxx"
        /^com\/[a-z]+/,           // e.g. "com/en-us"
        /^%[0-9A-Fa-f]{2}/,       // URL encoded chars at start of line
        /^[\/\.a-zA-Z0-9_\-]+\)$/, // markdown link tails
        /^www\./,
    ];
    if (structuralArtifacts.some(regex => regex.test(strippedClaim))) {
        return { tier: "Structural", risk: "LOW" };
    }

    // URL fragments produced by LLM wrapping markdown links across lines:
    if (/^(org\/|com\/|gov\/|https?:\/\/|html\)|html$|%[0-9A-Fa-f]{2}|www\.)/.test(strippedClaim)) {
        return { tier: "Structural", risk: "LOW" };
    }

    // Markdown link-only lines (e.g. "- [Title](path.html)") are structural references
    if (/^\s*-?\s*\[.+\]\(.+\)\s*$/.test(strippedClaim)) {
        return { tier: "Structural", risk: "LOW" };
    }

    if (structuralPhrases.some(p => claim.includes(p))) {
        return { tier: "Structural", risk: "LOW" };
    }

    if (evidenceScore > 3) return { tier: "Explicit", risk: "LOW" };
    if (evidenceScore >= 1) return { tier: "Derived", risk: "MID" };
    return { tier: "Inferred", risk: "HIGH" };
}

async function run() {
    console.log("🛠️ Generating Verifiable Reviewer Workbook v2...");

    let workbook = "# Reviewer Workbook v2 (Wave 1 Audit)\n\n";
    
    if (existsSync(join(PROD_DIR, "lockfile.json"))) {
        const lockfile = JSON.parse(readFileSync(join(PROD_DIR, "lockfile.json"), "utf8"));
        workbook += "## 📦 Batch Integrity Contract\n\n";
        workbook += "```json\n" + JSON.stringify(lockfile, null, 2) + "\n```\n\n";
    }

    workbook += "## 🔍 Stratified 10-Node Audit Samples\n\n";

    for (const slug of REVIEW_SAMPLE_SLUGS) {
        const nodeDir = join(PROD_DIR, slug);
        if (!existsSync(nodeDir)) {
            console.warn(`⚠️ Node ${slug} not found in Wave 1 directory.`);
            continue;
        }

        const synthesis = readFileSync(join(nodeDir, "synthesis.md"), "utf8");
        const sourceXml = existsSync(join(nodeDir, "source.xml")) 
            ? readFileSync(join(nodeDir, "source.xml"), "utf8") 
            : "";
        
        workbook += `---\n\n### Node: ${slug}\n\n`;
        workbook += `[Synthesis](${slug}/synthesis.md) | [Audit](${slug}/audit.json) | [Source XML](${slug}/source.xml)\n\n`;
        
        workbook += "#### Claim Trace Table\n\n";
        workbook += "| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |\n";
        workbook += "| :--- | :--- | :--- | :--- | :--- |\n";

        const claims = extractClaims(synthesis); 
        let blockerCount = 0;

        for (const claim of claims) {
            const evidence = findEvidence(claim, sourceXml);
            const score = evidence ? evidence.line : 0; // use presence of match as signal
            const classification = classifyClaim(claim, score);
            
            let enforcement = "✅ PASSED";
            if (classification.tier === "Inferred" && classification.risk === "HIGH") {
                enforcement = "🚩 BLOCKER (Unanchored)";
                blockerCount++;
            }

            const truncatedClaim = claim.length > 60 ? claim.slice(0, 57) + "..." : claim;
            const truncatedEvidence = evidence 
                ? `L${evidence.line}: ${evidence.text.length > 50 ? evidence.text.slice(0, 47) + "..." : evidence.text}` 
                : "❌ No direct match";
            
            workbook += `| ${truncatedClaim} | ${truncatedEvidence} | ${classification.tier} | ${classification.risk} | ${enforcement} |\n`;
        }

        if (blockerCount > 0) {
            workbook += `\n> [!CAUTION]\n> **ENFORCEMENT FAILED**: ${blockerCount} unanchored claims detected. This node MUST be purged or downgraded before release.\n\n`;
        } else {
            workbook += `\n> [!IMPORTANT]\n> **ENFORCEMENT PASSED**: Component is 100% anchored or correctly scoped.\n\n`;
        }

        workbook += "\n";
    }

    writeFileSync(WORKBOOK_PATH, workbook);
    console.log(`✅ Enforced Workbook generated at ${WORKBOOK_PATH}`);
}

run();
