# Enumd Enforcement Policy v1

> Status: ACTIVE — applies to Wave 2 onward. Wave 1 backfilled with this policy.
> Owner: production-wave-runner.ts + backfill-wave-audit.ts
> Implementation: lib/tiered-enforcement-policy.ts

---

## Design Principle

Unsupported semantic verdicts on Derived claims are **audit-visible by default**.
Enforcement applies only when unsupported concentration indicates **systemic semantic drift at the node level**, especially for fragmentary handoff-style sources.
In those cases, Derived-tier output is **suppressed**, while source-near (Explicit) claims may remain.

This replaces the binary "block vs. flag" framing with a structured, node-type-aware decision.

---

## Node Type Classification

Every node is classified before suppression decisions are evaluated.

| Type | Detection Criteria |
| :--- | :--- |
| `HANDOFF` | Slug matches 交接 / handoff / handover patterns |
| `FRAGMENTARY` | KAL = SKIPPED or THIN_SYNTHESIS; structural disclaimer present; synthesis < 120 chars; source XML < 500 chars |
| `STANDARD` | All others |

**Why this matters:** Wave 1 backfill showed that 25% unsupported Derived claims is NOT a uniform signal. It is heavily concentrated in HANDOFF-type nodes (50–100% unsupported). Using a single global threshold would penalize STANDARD nodes based on HANDOFF pathology.

---

## Verdict Taxonomy

| Verdict | Meaning | Action |
| :--- | :--- | :--- |
| `SUPPORTED` | Source clearly backs the claim | KEEP |
| `UNCERTAIN` | Source partially relates but does not confirm | KEEP, flagged in audit |
| `UNSUPPORTED` | Source does not contain supporting information | Counted against ratio |

Note: `UNSUPPORTED` does not automatically mean "delete". The appropriate downstream action depends on context:
- **Obvious hallucination** → remove (handled by SUPPRESS_DERIVED)
- **Over-asserted inference** → rewrite as tentative (future: DOWNGRADE action)
- **Node type mismatch** → suppress Derived tier, preserve Explicit
- **Borderline weak inference** → flag for reviewer, do not remove

---

## Suppression Tiers

### SUPPRESS_DERIVED
Derived-tier claims removed from `claims.json` and wave `atomic-claims.json`.
Explicit (source-near) claims are preserved.
`suppression_note` injected into `audit.json` for reviewer context.

**Triggers:**

| Condition | Threshold |
| :--- | :--- |
| HANDOFF node | `unsupported_ratio >= 0.30` AND `derived_count >= 3` |
| Any node (majority-unsupported) | `unsupported_ratio >= 0.50` AND `derived_count >= 4` |

Rationale for HANDOFF threshold (0.30 vs 0.50): Wave 1 evidence shows 交接 nodes cluster at 50–100% unsupported. 30% is already a reliable indicator for this node type, where keyword overlap is structurally misleading.

### AUDIT_FLAG
Claims kept in output. Node marked for priority reviewer sampling in manifest.

**Trigger:**

| Condition | Threshold |
| :--- | :--- |
| Any STANDARD or HANDOFF node | `unsupported_ratio in [0.20, 0.50)` AND `derived_count >= 3` |

### PASS
No action. Output unchanged.

**Applies when:**
- Node type is FRAGMENTARY (structural disclaimers already present; suppression is redundant)
- No Derived claims to check (semantic scorer skipped)
- Unsupported ratio below AUDIT_FLAG threshold

---

## Wave 2 Comparison Metrics

Use these three indicators to evaluate whether tiered suppression is working:

### 1. Cluster Concentration
Are unsupported claims still primarily in HANDOFF / FRAGMENTARY nodes?
- **Expected:** Yes. STANDARD nodes should show lower unsupported rates.
- **Warning signal:** If STANDARD nodes start showing 30%+ unsupported, the problem is more systemic than node-type mismatch.

### 2. Suppression Impact (Purity vs Density Trade-off)
How many claims are removed per suppressed node?
- Track: `suppression.total_derived_claims_removed` / `claims.total_atomic`
- **Expected:** <15% of total claims removed in a typical wave.
- **Warning signal:** If >30% removed, suppression may be over-broad — re-examine HANDOFF detection patterns.

### 3. Reviewer Usefulness
After suppression, can a reviewer more clearly distinguish:
- Source-anchored fact
- Acceptable inference
- Unacceptable hallucination

This is a qualitative judgment. Target: a reviewer should be able to spot-check a suppressed node in <2 minutes and confirm the suppression was appropriate.

---

## What This Policy Deliberately Does NOT Do

- **No global hard gate on all Derived claims.** Wave 1 evidence does not support punishing STANDARD nodes based on HANDOFF pathology.
- **No DELETE action on individual UNSUPPORTED claims.** Suppression operates at the Derived-tier level, not per-claim. Per-claim rewrite logic is a future enhancement.
- **No re-synthesis trigger.** Suppression is a post-enforcement filter. If a node's Derived tier is suppressed, the synthesis.md is unchanged; only claims.json is filtered.
- **No enforcement on Explicit tier.** Explicit claims (>3 keyword hits) are trusted at keyword-match level. Semantic verification of Explicit claims is a future enhancement when BGE-M3 embeddings are available locally.

---

## Artifact Locations

| Artifact | Location | Contents |
| :--- | :--- | :--- |
| Per-node decision | `wave_N/<slug>/audit.json` → `suppression_decision` | tier, node_type, ratio, reason, removed_count |
| Per-node claims | `wave_N/<slug>/claims.json` | Derived claims filtered if SUPPRESS_DERIVED |
| Wave aggregate | `wave_N/atomic-claims.json` | All retained claims across wave |
| Wave summary | `wave_N/backfill-summary.json` → `suppression` | Counts, suppressed/flagged node lists |
| Manifest | `wave_N/manifest.md` | Node type, suppression tier per row |
