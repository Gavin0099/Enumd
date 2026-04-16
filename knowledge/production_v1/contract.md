# Production v1 — Acceptance Contract

> This contract defines the hard boundaries of the production_v1 baseline.
> It is NOT a description of features. It defines what this baseline allows,
> what must never appear, and which metrics govern comparison against v2.
>
> Purpose: prevent future "improvement" that only improves visible numbers
> without addressing the underlying failure modes.

---

## 1. What This Baseline Allows (Known Limitations)

These are NOT regressions. They are accepted behaviors of v1.

| # | Allowed Limitation | Rationale |
| :- | :--- | :--- |
| L1 | SUPPRESS_DERIVED may fire on SOP/procedure documents | Procedural over-inference is an inherent LLM behavior on this doc type; suppression is the correct v1 response |
| L2 | AUDIT_FLAG may fire on list/reference documents (command lists, error code tables) | Paraphrase mismatch with keyword-based scorer; not hallucination, but unconfirmable in v1 |
| L3 | HANDOFF nodes are fully suppressed at Derived tier | Source context too sparse for meaningful synthesis; this is correct behavior |
| L4 | Claim density varies from ~1 to ~126 per node | Large spec documents legitimately produce more claims; outliers are explainable |
| L5 | AUDIT_FLAG rate plateaus at 4–6% | Structural floor caused by list/reference doc type distribution; not a scorer failure |
| L6 | Some STANDARD nodes may trigger SUPPRESS if unsupported ratio ≥ 50% | Legitimate semantic decision — not a pipeline fault |

---

## 2. What Must Never Appear (Regression Criteria)

Any of the following in a future run indicates a regression, not a limitation.

| # | Regression Condition | Threshold | Signal Source |
| :- | :--- | :--- | :--- |
| R1 | **Control group suppression** | Any SUPPRESS on known-clean, Windows-centric technical docs | `suppression_decision.tier` + manual slug classification |
| R2 | **Parser noise re-entry** | Any Mermaid syntax, CLI invocation, or protocol data in `claims.json` | SANITIZATION_PATTERNS miss; spot-check synthesis.md |
| R3 | **AUDIT_FLAG type expansion** | New document types triggering AUDIT_FLAG that weren't flagged in v1 | Compare AUDIT_FLAG slug list across runs |
| R4 | **Explicit coverage collapse** | Explicit / Derived ratio drops below 65% / 35% wave-wide | `byTier` in atomic-claims.json |
| R5 | **Enforcement removal rate spike** | `enforcement_report.removed > 50%` of total lines in a non-probe wave | audit.json per node |
| R6 | **KAL THIN_SYNTHESIS expansion** | THIN rate > 15% in a wave with normal graph context | manifest.md KAL summary |

---

## 3. Core Comparison Metrics for v2

When comparing v2 against this baseline, use ONLY these metrics.
Do not use aggregate averages to claim improvement.

| Metric | v1 Baseline Value | How to Measure |
| :--- | :--- | :--- |
| **SUPPRESS rate by doc type** | HANDOFF: ~80%; SOP: ~5%; list/reference: 0% (but AUDIT_FLAG); spec: 0% | Segment `suppression_decision` by doc-type classification |
| **Control group SUPPRESS count** | 0/6 (Wave 6 probe) | Designated control slugs (Windows technical docs) |
| **Explicit / Derived ratio** | 70–72% / 28–30% | `atomic-claims.json` tier distribution |
| **AUDIT_FLAG type distribution** | list/reference: 3; Windows feature: 1; procedure: 1 (v1 total) | Categorize AUDIT_FLAG slugs by doc type |
| **Normalized claim density** | 14–16 avg (excl. nodes >50 claims) | Compute from atomic-claims.json |
| **Paraphrase-type AUDIT_FLAG rate** | ~4–6% (inferred structural floor) | Requires doc-type classification to segment from hallucination flags |

**Improvement is only real if:**
- Control group remains at 0 SUPPRESS
- Domain-segmented SUPPRESS rate improves for a specific error mode
- AUDIT_FLAG type distribution changes in an explainable direction (e.g., list/reference flags decrease after embedding scorer)

**Improvement is not real if:**
- Overall AUDIT_FLAG rate drops but list/reference doc behavior is unchanged
- Average density drops because more nodes are suppressed (not because claims are better)
- Wave-level aggregate metrics improve while per-domain behavior is uninspected

---

## 4. What v1 Is and Is Not

| v1 Is | v1 Is Not |
| :--- | :--- |
| A verifiable, auditable, replayable baseline | A universally correct knowledge base |
| A system with known, typed, controlled failure modes | A system with zero errors |
| A foundation for domain-segmented comparison | A production truth for cross-domain inference |
| Windows-centric domain — validated | Cross-domain — validated only for absence of systemic bias |

**Precise definition:**
> `production_v1` is a frozen, reproducible baseline with a known error model.
> It establishes the verifiable minimum: every retained claim passed enforcement
> and semantic scoring. It does not guarantee that all correct claims were retained,
> nor that retained claims are perfectly accurate — only that they are traceable.

---

## 5. v2 Entry Criteria

Do not begin v2 implementation until:

- [ ] error-model.md detectability gaps (⚠️ and ❌ rows) have at least one measurement proposal each
- [ ] A synthetic benchmark exists for error mode #7 (scorer keyword dependency) and #8 (saturation)
- [ ] The first v2 slice is scoped to a single error mode with a verifiable hypothesis
- [ ] This contract is reviewed and accepted as the comparison ground truth

### Exploratory Slice Exception

When a failure mode is classified ⚠️ or ❌ **and** no direct measurement can be defined
in advance, an **instrumentation-only slice** is permitted without satisfying the full
entry criteria above.

Rules for an instrumentation slice:
1. **Verdict-neutral:** The slice must not change suppression decisions, claim counts,
   or any existing output. It only adds observable signals to artifacts.
2. **Signal-first:** The goal is to produce a new observable — not to improve a metric.
   The metric is defined *after* observing signal behavior.
3. **Bounded:** One slice = one failure mode. No scope creep into optimization.
4. **Grounded exit:** The slice ends when signal behavior is stable enough to define
   a measurement. That measurement then becomes a standard v2 entry criterion.

This exception exists because some problems require instrumentation before measurement
is possible. Locking those out would conflate "unknown" with "non-existent."

---

## 6. v2 Slice 1 — Cross-domain Misalignment Instrumentation

**Target error modes:** #6 (node-specific cross-domain suppression), #7 (scorer keyword dependency)

**Hypothesis:** When a node is suppressed or flagged and its content is cross-domain
relative to the source XML corpus, the suppression may be a keyword-matching gap rather
than semantic hallucination. Currently this is silent — the audit shows SUPPRESS/FLAG but
gives no signal about *why*.

**Scope:** Add advisory signals to `audit.json`. No routing changes. No threshold changes.

### Advisory Schema (to add to audit.json)

```typescript
domain_advisory?: {
    risk_level: "NONE" | "LOW" | "MODERATE" | "HIGH";
    signals: Array<
        | "domain_misalignment_risk"      // node domain differs from corpus majority
        | "low_semantic_overlap"           // keyword hit rate below corpus baseline
        | "external_tool_context_gap"      // node references tool not in source graph
        | "paraphrase_mismatch_suspected"  // AUDIT_FLAG on list/reference doc type
    >;
    corpus_overlap_score: number;          // keyword hit rate vs. corpus median
    note: string;
}
```

**Success criterion:** After instrumentation replay, it is possible to distinguish:
- "SUPPRESS because hallucination" → advisory shows `NONE` or `LOW`
- "SUPPRESS because keyword gap" → advisory shows `MODERATE` or `HIGH` + signal

**Failure criterion:** Advisory fires indiscriminately on both suppress-types, or never
fires when suppression occurs. Either outcome is informative — both constrain v2 design.

### Replay Observation Checklist

Run adversarial replay (20 nodes minimum) with this node mix:
- Lenovo-specific (3+) — known suppress in Wave 5
- Linux/macOS (2+) — cross-platform content
- External tools / methodology (3+) — probe-confirmed PASS in Wave 6
- Windows-centric control (5+) — should show NONE advisory
- List/reference docs (3+) — expected AUDIT_FLAG + paraphrase signal

For each node, record:
- [x] Did advisory fire? At what `risk_level`?
  Cross-domain suppressed nodes: MODERATE (2 signals) or HIGH (3 signals).
  PASS nodes: NONE (after signal refinement). 5 PASS nodes show LOW due to
  genuine low corpus overlap (`low_semantic_overlap`) — these are informative
  reviewer notes, not false alarms.

- [x] If SUPPRESS occurred, did advisory fire with `domain_misalignment_risk` or `low_semantic_overlap`?
  Partially. Fires correctly on cross-domain suppressed nodes (6 nodes, Lenovo/Linux/macOS).
  Does NOT fire on non-cross-domain suppressed nodes (22 nodes) — see Exit State §7 for taxonomy.

- [x] If PASS occurred, did advisory correctly show `NONE`?
  Yes (after refinement). 261/266 PASS nodes → NONE. 5 PASS nodes → LOW
  (`low_semantic_overlap` only). No PASS node receives MODERATE or HIGH.

- [x] False positive rate: advisory fires on Windows-control nodes?
  0/6 Windows-control nodes received any signal. ✅ Clean.

- [x] False negative rate: SUPPRESS fires without any advisory signal?
  22/31 suppressed/flagged nodes have no advisory. This is the structural floor
  of Slice 1 — see Exit State §7 for root-cause taxonomy.

The `suppress-without-signal` count is the most important outcome metric.
A high count means the advisory is not finding what we thought it would.

---

## 7. Slice 1 Exit State

> Slice 1 is **closed**. Signal behavior is stable. The measurements below
> become the v2 baseline for cross-domain misalignment instrumentation.

### Signal Calibration History

| Version | Change | suppress\_without\_signal | signal\_without\_suppress |
| :--- | :--- | :--- | :--- |
| v1.0 initial | Slug-pattern only for `domain_misalignment_risk` | 22 | 27 |
| v1.1 refined | Gate on suppression evidence + raise overlap threshold 0.28→0.40 | **22** | **5** |

Key finding from calibration: **slug-pattern matching alone produces 27 false alarms
with zero reduction in miss rate.** The signal only becomes actionable when combined
with suppression evidence. This was not predictable without the all-waves calibration
run (297 nodes).

### suppress\_without\_signal Floor Taxonomy

All 22 missed suppressions have known root causes. None are signal failures —
all are Slice 1 scope boundaries:

| Type | Count | Root Cause | Slice 1 Fixable? |
| :--- | :--- | :--- | :--- |
| HANDOFF 交接 nodes | 4 | Error mode #1; already observable via `node_type=HANDOFF` in audit.json | No — already surfaced elsewhere |
| Non-cross-domain AUDIT_FLAG | 14 | Error modes #4/#5; requires doc-type classification to separate paraphrase from hallucination | No — needs v2 doc-type classifier |
| Non-cross-domain SUPPRESS_DERIVED | 4 | Error modes #2/#7; procedural over-inference or keyword dependency | No — needs doc-type or embedding scorer |

**The 22 miss floor is structural, not a calibration failure.** Slice 1 was designed
for cross-domain misalignment. The 22 misses are within-domain adverse verdicts,
which require different instrumentation.

### What Slice 1 Established

1. `domain_misalignment_risk` is a valid signal — but only when suppression and
   cross-domain slug match together. Slug alone is noise.
2. `paraphrase_mismatch_suspected` is precise and clean (2 fires, both correct).
3. `low_semantic_overlap` at threshold 0.40 catches genuinely sparse nodes without
   over-firing on the high-overlap majority (corpus median 0.75).
4. `external_tool_context_gap` (SUPPRESS\_DERIVED on cross-domain slug) is the
   strongest signal for "keyword gap caused suppression, not hallucination."
5. `windows-11-core-isolation` remains unexplained: Windows-domain AUDIT\_FLAG with
   high overlap (0.78), no cross-domain signal, no list/reference match. Represents
   an unclassified failure mode outside Slice 1's scope.

### v2 Entry Criterion Generated by Slice 1

> Slice 1 produces one new v2 entry criterion (added to §5 gate):

**C7 — Doc-type classification for non-cross-domain AUDIT\_FLAG:**
Before claiming improvement over v1 AUDIT\_FLAG rate, v2 must implement a
doc-type classifier that segments AUDIT\_FLAG nodes into:
- `list_reference` — command lists, error code tables, spec appendices
- `procedure` — SOP, debug flows, step-by-step guides
- `standard` — technical spec content where AUDIT\_FLAG is unexpected

Without this segmentation, any change to AUDIT\_FLAG rate is uninterpretable —
it conflates the structural floor (list/reference docs always flag) with genuine
improvement.
