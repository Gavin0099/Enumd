/**
 * Infers domain_tags, task_tags, and authority_level from page title + content.
 *
 * Strategy:
 * 1. Rule-based (fast, deterministic, no API cost) — covers ~80% of cases
 * 2. Claude Haiku fallback for pages that match nothing (optional, behind --infer flag)
 */

import type { DomainTag, TaskTag, AuthorityLevel } from "./knowledge-model";

// ── Rule tables ───────────────────────────────────────────────────────────────

const DOMAIN_RULES: { patterns: RegExp[]; tag: DomainTag }[] = [
  { patterns: [/\bhub\b/i, /gl35\d+/i, /gl75\d+/i, /hub.*chip/i], tag: "hub" },
  { patterns: [/driver/i, /驅動/], tag: "driver" },
  { patterns: [/code.?sign/i, /etoken/i, /ecdsa/i, /mbedtls/i, /簽章/, /簽署/], tag: "code-sign" },
  { patterns: [/\bmac\b/i, /xcode/i, /macos/i, /apple/i, /bundle.?id/i], tag: "mac" },
  { patterns: [/monitor/i, /scaler/i, /顯示器/, /螢幕/], tag: "monitor" },
  { patterns: [/firmware/i, /fw.?update/i, /韌體/, /oci/i], tag: "firmware" },
  { patterns: [/\bsdk\b/i, /library/i, /dll/i, /lib\b/i], tag: "sdk" },
  { patterns: [/tool/i, /utility/i, /工具/, /cli/i, /command.?line/i], tag: "tools" },
  { patterns: [/security/i, /安全/, /rsa/i, /ecc\b/i, /key\b/i, /certificate/i, /憑證/], tag: "security" },
];

const TASK_RULES: { patterns: RegExp[]; tag: TaskTag }[] = [
  { patterns: [/install/i, /安裝/, /setup/i, /部署/, /uninstall/i, /移除/, /packing/i], tag: "install" },
  { patterns: [/firmware.*update/i, /fw.*update/i, /update.*flow/i, /isp.*flow/i, /韌體更新/, /燒錄/, /rollback/i], tag: "firmware-update" },
  { patterns: [/debug/i, /trouble/i, /除錯/, /問題/, /fail/i, /error/i, /crash/i, /issue/i, /排查/], tag: "debug" },
  { patterns: [/code.?sign/i, /sign.*flow/i, /ecdsa/i, /簽章/, /簽署流程/], tag: "code-sign" },
  { patterns: [/build/i, /compile/i, /cmake/i, /msbuild/i, /編譯/, /打包/, /package/i], tag: "build" },
  { patterns: [/release/i, /check.?list/i, /before.*release/i, /發布/, /roll.*out/i], tag: "release" },
  { patterns: [/spec/i, /specification/i, /規格/, /format/i, /protocol/i, /架構/], tag: "spec" },
  { patterns: [/sop/i, /flow/i, /procedure/i, /流程/, /步驟/, /how.?to/i], tag: "sop" },
  { patterns: [/log/i, /grab.*log/i, /capture/i, /trace/i, /訊號/, /除錯訊息/], tag: "log" },
  { patterns: [/ini\b/i, /config/i, /parameter/i, /setting/i, /設定/, /參數/], tag: "config" },
];

const AUTHORITY_RULES: { patterns: RegExp[]; level: AuthorityLevel }[] = [
  { patterns: [/spec/i, /specification/i, /規格書/, /技術規格/, /sop/i, /standard/i], level: "source" },
  { patterns: [/摘要/, /summary/i, /overview/i, /概述/, /整合版/], level: "derived" },
  { patterns: [/ref/i, /reference/i, /vendor/i, /3rd.?party/i, /外部/, /official/i], level: "reference" },
  { patterns: [/deprecated/i, /obsolete/i, /old/i, /舊/, /廢棄/], level: "deprecated" },
];

// ── Rule-based inference ──────────────────────────────────────────────────────

function matchRules<T>(text: string, rules: { patterns: RegExp[]; tag: T }[]): T[] {
  const matched = new Set<T>();
  for (const { patterns, tag } of rules) {
    if (patterns.some((p) => p.test(text))) {
      matched.add(tag);
    }
  }
  return [...matched];
}

function inferAuthorityLevel(text: string): AuthorityLevel {
  for (const { patterns, level } of AUTHORITY_RULES) {
    if (patterns.some((p) => p.test(text))) return level;
  }
  return "source"; // default: treat as source unless flagged otherwise
}

export interface InferredTags {
  domain_tags: DomainTag[];
  task_tags: TaskTag[];
  authority_level: AuthorityLevel;
}

export function inferTagsFromText(title: string, content: string): InferredTags {
  const combined = `${title}\n${content.slice(0, 800)}`; // first 800 chars for speed

  let domain_tags = matchRules(combined, DOMAIN_RULES) as DomainTag[];
  const task_tags = matchRules(combined, TASK_RULES) as TaskTag[];
  const authority_level = inferAuthorityLevel(combined);

  // Ensure at least one domain tag
  if (domain_tags.length === 0) {
    domain_tags = ["general"];
  }

  return { domain_tags, task_tags, authority_level };
}

// ── Claude Haiku fallback (optional, used when rules return almost nothing) ───

interface ClaudeTagResult {
  domain_tags: string[];
  task_tags: string[];
  authority_level: string;
}

export async function inferTagsWithAI(
  title: string,
  content: string
): Promise<InferredTags> {
  // Only import if needed
  const Anthropic = (await import("@anthropic-ai/sdk")).default;
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const prompt = `你是技術文件分類系統。根據以下頁面標題和內容摘要，輸出 JSON 分類結果。

標題：${title}
內容摘要：${content.slice(0, 400)}

可用的 domain_tags（可多選）：hub, driver, code-sign, mac, monitor, firmware, sdk, tools, security, general
可用的 task_tags（可多選）：install, firmware-update, debug, code-sign, build, release, spec, sop, log, config
authority_level（單選）：source, derived, reference, deprecated

只輸出 JSON，不要說明：
{"domain_tags": [], "task_tags": [], "authority_level": "source"}`;

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 200,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "{}";
    const result = JSON.parse(text.trim()) as ClaudeTagResult;

    return {
      domain_tags: (result.domain_tags ?? ["general"]) as DomainTag[],
      task_tags: (result.task_tags ?? []) as TaskTag[],
      authority_level: (result.authority_level ?? "source") as AuthorityLevel,
    };
  } catch {
    return inferTagsFromText(title, content);
  }
}
