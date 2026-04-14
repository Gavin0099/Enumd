import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const KNOWLEDGE_DIR = join(process.cwd(), "knowledge");
const draftPath = join(KNOWLEDGE_DIR, "synthesis_draft.md");
const auditPath = join(KNOWLEDGE_DIR, "synthesis_prompt_dump.audit.json");
const dbPath = join(KNOWLEDGE_DIR, "synthesis_reviews_db.json");

let targetSlug = process.argv[2];
if (targetSlug) {
    targetSlug = targetSlug.split(/[\\/]/).pop()?.replace(".md", "") || targetSlug;
}

if (!existsSync(draftPath) || !existsSync(auditPath)) {
    console.error("Missing synthesis draft or audit. Please run 'npm run generate:synthesis <slug>' first.");
    process.exit(1);
}

const audit = JSON.parse(readFileSync(auditPath, "utf-8"));

if (targetSlug && audit.requested_slug !== targetSlug) {
    console.error(`\n❌ ERROR: You requested to review '${targetSlug}', but the current draft in memory is for '${audit.requested_slug}'.\nPlease run 'npm run generate:synthesis "${targetSlug}"' first!`);
    process.exit(1);
}

const draftContent = readFileSync(draftPath, "utf-8");

console.log("\n==============================================");
console.log(`🔍 ENUMD SYNTHESIS QUALITY REVIEW LOOP`);
console.log("==============================================");
console.log(`Topic Slug: ${audit.requested_slug}`);
console.log(`Context Class: ${audit.snapshot_profile?.context_class || "unknown"}`);
console.log(`Profile:
  - Core: ${audit.snapshot_profile?.core_count}
  - Dependencies: ${audit.snapshot_profile?.dependency_count}
  - Related: ${audit.snapshot_profile?.related_count}
  - Context Edges: ${audit.snapshot_profile?.context_edge_count}`);
console.log("\n--- Draft Peek (First 15 Lines) ---");
console.log(draftContent.split("\n").slice(0, 15).join("\n") + "\n...");
console.log("-----------------------------------\n");

const rl = readline.createInterface({ input, output });

async function runReview() {
    let review: any = {
        topic_slug: audit.requested_slug,
        timestamp: new Date().toISOString(),
        snapshot_profile: audit.snapshot_profile,
        metrics: {},
        issues: [],
        feedback: { nodes_to_add: [], nodes_to_drop: [], prompt_adjustments: "" },
        recommended_action: { change_threshold: false, lower_related_limit: false, raise_related_limit: false, tighten_prompt: false, refuse_sparse_graph: false, allow_minimal_summary: false }
    };

    const passStr = await rl.question("1. 驗收是否通過 (PASS)? (Y/N): ");
    review.pass = passStr.toLowerCase().startsWith('y');

    console.log("\n-- Metrics Grading --");
    
    let answer = await rl.question("來源可溯性 (Traceability) [1: 完整關聯, 2: 部分關聯, 3: 毫無關聯]: ");
    review.metrics.traceability = answer.includes("1") ? "Complete" : (answer.includes("2") ? "Partial" : "Weak");

    answer = await rl.question("邊界紀律 (Boundary Discipline) [1: 嚴格死守, 2: 發生幻覺越界]: ");
    review.metrics.boundary_discipline = answer.includes("1") ? "Strict" : "Leaked";

    answer = await rl.question("依賴前置邏輯正確性 (Dependency Correctness) [1: 正確, 2: 錯亂顛倒, 3: 不適用/無依賴]: ");
    review.metrics.dependency_correctness = answer.includes("1") ? "Accurate" : (answer.includes("2") ? "Muddled" : "N/A");

    answer = await rl.question("壓縮品質 (Compression Quality) [1: 具備洞察, 2: 堪用整理, 3: 死板死抄]: ");
    review.metrics.compression_quality = answer.includes("1") ? "Insightful" : (answer.includes("2") ? "Adequate" : "Parroting");

    answer = await rl.question("幻覺風險 (Hallucination Risk) [1: 無, 2: 輕微, 3: 嚴重]: ");
    review.metrics.hallucination_risk = answer.includes("1") ? "None" : (answer.includes("2") ? "Minor" : "Severe");

    console.log("\n-- Identify Issue (Optional) --");
    answer = await rl.question("有任何特定的問題類型嗎？(可留空, 或輸入: hallucination, missed_deps, bad_format, irrelevant_related, parroting, traceability_gap): ");
    if (answer.trim()) {
        const desc = await rl.question("問題描述 (Issue Description): ");
        const text = await rl.question("問題段落節錄 (Offending Text snippet): ");
        review.issues.push({ type: answer.trim(), description: desc, offending_text: text });
    }

    console.log("\n-- Recommended Action --");
    answer = await rl.question("需要任何政策調整建議嗎？(多選請用逗號分隔, 如 tighten_prompt, refuse_sparse_graph) [可留空]: ");
    if (answer.trim()) {
        const parts = answer.split(",").map((s: string) => s.trim());
        if (parts.includes("change_threshold")) review.recommended_action.change_threshold = true;
        if (parts.includes("lower_related_limit")) review.recommended_action.lower_related_limit = true;
        if (parts.includes("raise_related_limit")) review.recommended_action.raise_related_limit = true;
        if (parts.includes("tighten_prompt")) review.recommended_action.tighten_prompt = true;
        if (parts.includes("refuse_sparse_graph")) review.recommended_action.refuse_sparse_graph = true;
        if (parts.includes("allow_minimal_summary")) review.recommended_action.allow_minimal_summary = true;
    }

    let dbFile = [];
    if (existsSync(dbPath)) {
        dbFile = JSON.parse(readFileSync(dbPath, "utf-8"));
    }
    dbFile.push(review);
    writeFileSync(dbPath, JSON.stringify(dbFile, null, 2));

    console.log("\n✅ Evaluation appended to 'knowledge/synthesis_reviews_db.json'. Great job QAing the Evidence Kernel!");
    rl.close();
}

runReview();
