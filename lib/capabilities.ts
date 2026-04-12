/**
 * Capability Baseline v1.0 - Governance Contract
 * 
 * DISCIPLINE:
 * 1. This file defines the "Target Truth".
 * 2. Moving a type from `fully_supported` to `fallback_only` is a REPO REGRESSION.
 * 3. Any such change must be documented as a "Governance Concession".
 * 4. This baseline is used by Phase 4 Regression Guards to detect silent bugs.
 */

export type TargetFidelity = "fully_supported" | "fallback_only" | "unsupported";

export const CAPABILITY_BASELINE: Record<string, TargetFidelity> = {
  // Fully Supported (Must have 0 degraded/dropped in ideal run)
  heading_1: "fully_supported",
  heading_2: "fully_supported",
  heading_3: "fully_supported",
  paragraph: "fully_supported",
  bulleted_list_item: "fully_supported",
  numbered_list_item: "fully_supported",
  code: "fully_supported",
  quote: "fully_supported",
  divider: "fully_supported",
  callout: "fully_supported",
  toggle: "fully_supported",
  table: "fully_supported",
  table_row: "fully_supported",

  // Fallback Only (Intentional degradation)
  image: "fallback_only",
  file: "fallback_only",
  pdf: "fallback_only",
  video: "fallback_only",
  bookmark: "fallback_only",

  // Unsupported (High risk, silent loss if encountered but not handled)
  synced_block: "unsupported",
  column_list: "unsupported",
  column: "unsupported",
  embed: "unsupported",
  child_database: "unsupported",
};
