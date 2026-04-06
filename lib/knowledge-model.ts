/**
 * Shared knowledge model for notion-wiki and notion-rag.
 *
 * This schema is the single source of truth for how a knowledge node
 * is described — used in VitePress frontmatter, Vectorize metadata,
 * and the homepage stats.
 */

// ── Relation types ────────────────────────────────────────────────────────────
// Only two types for v1: keep it observable, not automatic.
// - "impacts"    → if this page changes, the target may need review
// - "see_also"   → informational cross-reference, no impact propagation
export type RelationType = "impacts" | "see_also" | "depends_on" | "supersedes";

export interface Relation {
  target_id: string;       // Notion page ID of related page
  type: RelationType;
}

// ── Authority levels ──────────────────────────────────────────────────────────
// "source"     → this IS the authoritative document (SSOT)
// "derived"    → AI-summarized or compiled from a source
// "reference"  → external spec, vendor doc, or supporting material
// "deprecated" → superseded, kept for history only
export type AuthorityLevel = "source" | "derived" | "reference" | "deprecated";

// ── Domain tags ───────────────────────────────────────────────────────────────
// Describes WHAT this page is about (can be multi-valued)
export const DOMAIN_TAGS = [
  "hub",
  "driver",
  "code-sign",
  "mac",
  "monitor",
  "firmware",
  "sdk",
  "tools",
  "security",
  "general",
] as const;

export type DomainTag = typeof DOMAIN_TAGS[number];

// ── Task tags ─────────────────────────────────────────────────────────────────
// Describes WHAT YOU DO with this page (task-oriented navigation)
export const TASK_TAGS = [
  "install",           // 安裝 / 部署
  "firmware-update",   // 韌體更新
  "debug",             // 除錯 / troubleshooting
  "code-sign",         // 簽章流程
  "build",             // 編譯 / 打包
  "release",           // 發布流程
  "spec",              // 規格查閱
  "sop",               // SOP / 標準流程
  "log",               // Log 抓取 / 分析
  "config",            // 設定 / ini / 參數
] as const;

export type TaskTag = typeof TASK_TAGS[number];

// ── Core knowledge node ───────────────────────────────────────────────────────
export interface KnowledgeNode {
  // Identity
  id: string;                      // Notion page ID
  title: string;

  // Taxonomy (replaces single `category`)
  domain_tags: DomainTag[];        // what domain(s) this belongs to
  task_tags: TaskTag[];            // what task(s) this helps with

  // Relationships (v1: manual or AI-suggested, not auto-propagated)
  relations: Relation[];

  // Source tracking
  source_hash: string;             // sha256 of raw Notion content
  notion_updated_at: string;       // ISO timestamp from Notion
  exported_at: string;

  // Authority
  authority_level: AuthorityLevel;
  is_deprecated: boolean;          // convenience alias for authority_level === "deprecated"

  // Links
  notion_url: string;
  notion_id: string;
  is_summarized: boolean;
}

// ── Frontmatter subset (what goes into .md files) ────────────────────────────
// We don't write relations into frontmatter yet (too complex for v1).
// They live in a separate knowledge-graph.json.
export type FrontmatterNode = Omit<KnowledgeNode, "relations" | "source_hash">;

// ── Task tag definitions (for UI rendering) ───────────────────────────────────
export const TASK_TAG_META: Record<TaskTag, { label: string; icon: string }> = {
  "install":         { label: "安裝部署",   icon: "🔧" },
  "firmware-update": { label: "韌體更新",   icon: "🔥" },
  "debug":           { label: "除錯排查",   icon: "🐞" },
  "code-sign":       { label: "Code Sign", icon: "🔐" },
  "build":           { label: "編譯打包",   icon: "🏗" },
  "release":         { label: "發布流程",   icon: "🚀" },
  "spec":            { label: "規格查閱",   icon: "📄" },
  "sop":             { label: "標準流程",   icon: "📋" },
  "log":             { label: "Log 分析",  icon: "📊" },
  "config":          { label: "設定參數",   icon: "⚙️" },
};
