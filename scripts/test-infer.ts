import { inferTagsFromText } from "../lib/infer-tags";

const cases = [
  ["Hub Driver 除錯方式", "driver debug 問題排查"],
  ["Code Sign 概述", "ECC ECDSA 簽章流程"],
  ["MTK Scaler Update flow", "monitor firmware update isp"],
  ["How to generate system log", "grab log capture trace"],
  ["GL Hub Software Development Kit", "sdk dll library"],
  ["Check list before release tool", "release checklist before"],
];

for (const [title, content] of cases) {
  const r = inferTagsFromText(title, content);
  console.log(`\n${title}`);
  console.log(`  domain:    [${r.domain_tags.join(", ")}]`);
  console.log(`  task:      [${r.task_tags.join(", ")}]`);
  console.log(`  authority: ${r.authority_level}`);
}
