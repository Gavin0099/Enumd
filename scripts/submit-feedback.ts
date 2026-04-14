import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const args = process.argv.slice(2);
const slugArg = args.find(a => a.startsWith("--slug="))?.split("=")[1];
const verdictArg = args.find(a => a.startsWith("--verdict="))?.split("=")[1];

if (!slugArg || !verdictArg) {
    console.error("Usage: npx tsx scripts/submit-feedback.ts --slug=<SLUG> --verdict=<CORRECT|MINOR_ISSUE|MAJOR_ISSUE>");
    process.exit(1);
}

const KNOWLEDGE_DIR = join(process.cwd(), "knowledge");
const BATCH_DIR = join(KNOWLEDGE_DIR, "batch_v1");
const auditPath = join(BATCH_DIR, slugArg, "audit.json");

if (!existsSync(auditPath)) {
    console.error(`Audit file for ${slugArg} not found at: ${auditPath}`);
    process.exit(1);
}

const audit = JSON.parse(readFileSync(auditPath, "utf8"));

if (audit.decision_basis && audit.decision_basis.pilot_evaluation) {
    audit.decision_basis.pilot_evaluation.post_review_verdict = verdictArg;
    writeFileSync(auditPath, JSON.stringify(audit, null, 2));
    console.log(`✅ Feedback submitted for ${slugArg}: ${verdictArg}`);
} else {
    console.error(`Incomplete audit structure for ${slugArg}.`);
}
