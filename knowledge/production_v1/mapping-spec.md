# Mapping Specification — Evidence to Governance Contract

> **Status**: Active — Source of Truth
> **Last updated**: 2026-04-21
> **Authority**: This specification. Code must conform to this spec.
> **Scope**: `governance_report.json` produced by Enumd pipeline; `domain_advisory` field in `audit.json`

---

## Purpose

This specification defines the canonical contract between Enumd evidence surfaces
and governance decision consumption. It is **not documentation of code behavior** —
it is the **authority** that code behavior must implement.

This spec answers three questions:
1. Which fields may be consumed by governance decision logic?
2. Which fields are advisory-only and must never be used for decisions?
3. When does a field's behavior change trigger a semantics escalation?

Reference from code: `scripts/production-wave-runner.ts` §5 (schema), §6.3 and §9.2
(enforcement vocabulary), §6.4 and §9 (advisory contract).

---

## §1. Authority Declaration

```yaml
authority:
  source_of_truth: knowledge/production_v1/mapping-spec.md
  code_must_conform: true
  ci_hooks_validate_against: this_spec
  governance_decisions_reference: this_spec
  drift_detection: any_inconsistency_between_spec_and_code_is_a_spec_violation
```

If code and spec conflict, **spec wins**. Code must be updated to conform.

---

## §2. Contract Classification Vocabulary

Fields in Enumd governance surfaces are classified into exactly two categories:

```yaml
field_classes:
  advisory_only:
    definition: >
      Field surfaces information for human reviewer guidance and diagnostic
      reporting. MUST NOT be used in automated promotion, filtering,
      escalation, or gate-blocking logic.
    enforcement_semantics: none
    decision_distance: advisory_only

  decision_consumable:
    definition: >
      Field may be read by governance decision logic, CI classification hooks,
      or gate conditions. Any field in this class that changes behavior
      triggers schema_evolution event.
    enforcement_semantics: may_block_or_route
    decision_distance: decision_consumable
```

---

## §3. Governance Report Schema (§5)

`governance_report.json` is emitted per wave run by `scripts/production-wave-runner.ts`.

```yaml
governance_report_schema:
  producer: "enumd"                        # fixed string
  artifact_type: "governance_report"       # fixed string
  schema_version: "1.0"                    # versioned contract marker — see §8
  instrumentation_version: "slice1-v1"    # versioned contract marker — see §8
  domain: "usb_windows_firmware"           # fixed for production_v1
  semantic_scope: "enumd-specific"         # not domain-general

  top_level_sections:
    summary:            decision_consumable   # aggregate counts
    enforcement:        decision_consumable   # synthesis_verdicts (see §6)
    kal_summary:        decision_consumable   # KAL convergence counts
    advisory:           advisory_only         # ALL fields in this section
    raw_artifacts:      decision_consumable   # path references for downstream fetch
    calibration_profile: advisory_only        # calibration notes, not enforcement
```

**Critical invariant**: the `advisory` section is entirely `advisory_only`. No field
within `advisory` may be promoted to `decision_consumable` without:
1. A `schema-evolution:` commit with gate_required evidence pack
2. Explicit update to this spec (§4 and §5)
3. Update to the CI hook that validates advisory_only field usage

---

## §4. Advisory Contract — `advisory.node_signals` (§6.4, §9)

```yaml
advisory_contract:
  path: governance_report.json → advisory → node_signals
  field_class: advisory_only
  decision_distance: advisory_only

  per_entry_invariants:
    decision_distance:
      value: "advisory_only"
      enforcement: MUST be present in every node_signals entry
      rationale: prevents framework from misclassifying as enforcement signal

  permitted_uses:
    - reviewer_guidance
    - diagnostic_reporting
    - signal_visualization
    - calibration_analysis

  prohibited_uses:
    - promotion_decisions
    - filtering_decisions
    - escalation_triggers
    - gate_blocking
    - CI_classification_routing

  current_consumer_count: 0
  consumer_inventory_date: "2026-04-21"
  consumer_inventory_result: >
    ai-governance-framework has zero code reading governance_report.json.
    No live consumer of node_signals exists as of 2026-04-21.

  semantics_upgrade_trigger: >
    If any consumer reads node_signals for promotion, filtering, escalation,
    or gate-blocking → MUST reclassify field_class to decision_consumable AND
    trigger schema_evolution event AND update this spec.
```

---

## §5. Enforcement Vocabulary Boundary (§6.3, §9.2)

```yaml
enforcement_vocabulary:
  field: governance_report.json → enforcement → synthesis_verdicts
  field_class: decision_consumable

  vocabulary_rule: >
    Enumd synthesis outcomes (SUPPRESS_DERIVED, AUDIT_FLAG, PASS) are
    synthesis-layer decisions, NOT framework enforcement actions.

    The field is named "synthesis_verdicts" (not "enforcement_decisions") to
    prevent false equivalence with the ai-governance-framework's enforcement
    action vocabulary. This is a deliberate naming boundary.

  valid_values:
    SUPPRESS_DERIVED: >
      Pipeline suppressed Derived-tier claims. May indicate: hallucination,
      keyword-matching gap, or cross-domain content mismatch.
      Does NOT mean the framework blocked the session or task.
    AUDIT_FLAG: >
      Pipeline flagged the node for audit review. The synthesis output
      exists but is flagged as requiring human verification.
    PASS: >
      Pipeline passed the node. Claims are retained at Explicit and/or
      Derived tier without suppression.

  NOT_equivalent_to:
    - framework enforcement actions (session block, task block)
    - governance gate verdicts (pass/fail in gate_policy.yaml)
    - CI blocking decisions
```

---

## §6. Domain Advisory Field Contract (audit.json) (§6.4)

```yaml
domain_advisory_contract:
  path: audit.json → domain_advisory
  field_class: advisory_only
  instrumentation_version: "1.0"   # versioned contract marker — see §8

  subfields:
    risk_level:
      type: "NONE" | "LOW" | "MODERATE" | "HIGH"
      field_class: advisory_only
    signals:
      type: Array<signal_name>
      field_class: advisory_only
    corpus_overlap_score:
      type: float (0..1)
      field_class: advisory_only
    note:
      type: string
      field_class: advisory_only
    instrumentation_version:
      type: "1.0" (literal)
      field_class: versioned_contract_marker  # see §8

  computation_rule: >
    domain_advisory is verdict-neutral. It does NOT change suppression decisions,
    claim counts, or any existing pipeline output. It reads from suppression
    decisions (suppression_decision.tier) — it does NOT write back to them.

  computation_inputs:
    - slug (for cross-domain pattern matching)
    - sourceXml (for corpus overlap scoring)
    - claims (for claim-level overlap calculation)
    - suppression.tier (for signal conditional logic)

  permitted_uses:
    - reviewer_guidance
    - calibration_analysis
    - diagnostic_reporting
    - nodeSignals population in governance_report.json

  prohibited_uses:
    - modifying_suppression_decisions
    - modifying_claim_counts
    - modifying_verdicts
    - gate_blocking

  semantics_upgrade_trigger: >
    If domain_advisory.risk_level or any signal is used to modify suppression,
    verdict, or claim decisions → reclassify to decision_consumable AND trigger
    schema_evolution event AND update this spec.
```

---

## §7. Calibration Profile Contract

```yaml
calibration_profile_contract:
  path: governance_report.json → calibration_profile
  field_class: advisory_only

  invariants:
    - calibration_profile is corpus-specific (production_v1 only)
    - thresholds are NOT domain-general
    - consumers MUST NOT apply these thresholds to other corpora without recalibration
    - if overlap_thresholds.low_overlap changes → triggers schema_evolution event
      (computation semantics change, even if field structure unchanged)
```

---

## §8. Versioned Contract Markers

Two instrumentation_version fields exist at different scopes. Both are versioned
contract markers, not metadata.

```yaml
versioned_contract_markers:

  field_level:
    path: audit.json → domain_advisory → instrumentation_version
    current_value: "1.0"
    scope: per-document (every audit.json in production_v1)
    versioning_rule: >
      MUST be bumped when ANY of the following change in lib/domain-advisory.ts:
        - CROSS_DOMAIN_SLUG_PATTERNS (cross-domain slug set)
        - LIST_REFERENCE_DOC_PATTERNS (list/reference doc set)
        - LOW_OVERLAP_THRESHOLD (overlap threshold value)
        - MIN_CLAIMS_FOR_OVERLAP (minimum claims threshold)
        - signal computation logic (conditional branches in computeDomainAdvisory)
        - risk_level assignment rules (NONE/LOW/MODERATE/HIGH boundaries)

  report_level:
    path: governance_report.json → instrumentation_version
    current_value: "slice1-v1"
    scope: per-run (governance_report.json)
    versioning_rule: >
      MUST be bumped when ANY of the following change:
        - signal_counts computation logic
        - nodeSignals filtering rule (currently: advisory_risk_level !== "NONE")
        - node_signals entry schema (currently: slug, risk_level, signals,
          corpus_overlap_score, decision_distance)
        - governance_report.json top-level schema structure
        - calibration_profile threshold values

  schema_evolution_trigger: >
    Any version bump to either marker MUST be accompanied by a
    schema-evolution: commit with a complete schema_evolution_evidence pack.
    Version bump without evidence pack is a schema_evolution_violation.

  consumer_compatibility_rule: >
    Consumers that parse governance_report.json or audit.json domain_advisory
    MUST declare which instrumentation_version they are compatible with.
    Consuming an unknown version without explicit compatibility check is a
    contract violation.
```

---

## §9. Invariants (Enforcement) (§9, §9.2)

These invariants MUST hold at all times. CI hooks validate against these.

```yaml
invariants:

  INV-1:
    name: advisory_section_is_advisory_only
    applies_to: governance_report.json → advisory
    rule: >
      No field within the advisory section may be used in promotion, filtering,
      escalation, or gate-blocking logic.
    violation_detection: >
      Any code path that reads advisory.node_signals or advisory.signal_counts
      and uses the result to make a decision (not record/display) is a violation.
    enforcement: CI hook validates (P2-1, not yet implemented)

  INV-2:
    name: synthesis_verdicts_not_equivalent_to_enforcement
    applies_to: governance_report.json → enforcement → synthesis_verdicts
    rule: >
      SUPPRESS_DERIVED, AUDIT_FLAG, PASS are synthesis-layer outcomes.
      They must not be mapped 1:1 to framework enforcement actions
      (session_block, task_block, gate_fail).
    violation_detection: >
      Any code that treats SUPPRESS_DERIVED as equivalent to a framework
      session or task block is a violation.
    enforcement: documented boundary; requires human review for violations

  INV-3:
    name: instrumentation_version_is_versioned_contract
    applies_to:
      - audit.json → domain_advisory → instrumentation_version
      - governance_report.json → instrumentation_version
    rule: >
      Version values are not metadata. Any computation change that alters
      the meaning of advisory fields MUST bump the relevant version.
      Version drift without schema_evolution event is a violation.
    violation_detection: >
      If computation in lib/domain-advisory.ts or production-wave-runner.ts
      advisory section changes without a version bump in the emitted JSON.
    enforcement: manual for now; CI validation in P3

  INV-4:
    name: calibration_profile_is_corpus_specific
    applies_to: governance_report.json → calibration_profile
    rule: >
      Calibration thresholds in production_v1 reports are NOT domain-general.
      They must not be used outside the Enumd production_v1 corpus context.
    violation_detection: >
      Any consumer that applies production_v1 thresholds to a different corpus
      without recalibration is a violation.
    enforcement: documented boundary
```

---

## §10. Schema Evolution Triggers

Any of the following changes MUST trigger a `schema-evolution:` commit with
a complete evidence pack (see `governance/event-map.yaml §schema_evolution_evidence`):

| Change | Trigger condition |
|---|---|
| New field in `audit.json` | Always |
| New field in `claims.json` | Always |
| New field in `governance_report.json` top-level | Always |
| New field in `governance_report.json → advisory` | Always + update §4 of this spec |
| `instrumentation_version` value change (either marker) | Always |
| `schema_version` value change | Always |
| `calibration_profile → overlap_thresholds` change | Always (computation semantics) |
| Signal computation logic change in `lib/domain-advisory.ts` | Version bump + schema_evolution |
| nodeSignals filter rule change in `production-wave-runner.ts` | Version bump + schema_evolution |
| Reclassification of any field from `advisory_only` → `decision_consumable` | Always + human review |

---

## §11. Changelog

| Date | Change | Author |
|---|---|---|
| 2026-04-21 | Initial spec created (P2-0) — extracted from code comments in production-wave-runner.ts and lib/domain-advisory.ts | governance seam |
