# Pre-Commit Promotion Criteria — P2-1.5
<!-- governance-baseline: overridable -->

> **Authority**: this document defines the conditions under which
> `scripts/check-mapping-spec-compliance.py` can be promoted from
> Claude Code stop hook (advisory/soft gate) to `.git/hooks/pre-commit`
> (hard gate that blocks commits).
>
> Promotion requires **ALL** criteria in §3 to be met.
> Any trigger in §4 halts or resets promotion.

---

## §1 Current Enforcement State

```yaml
current_level: advisory_only
hook_type: claude_code_stop_hook
exit_code_behavior: always_0  # never blocks
blocking: false
wired_since: "2026-04-21"
commit: aebe245
```

## §2 Target Enforcement State

```yaml
target_level: hard_gate
hook_type: git_pre_commit_hook
exit_code_behavior: 1_on_fail_or_violation
blocking: true
```

## §3 Promotion Criteria (ALL must be met before promotion)

```yaml
promotion_criteria:

  session_count:
    minimum: 3
    qualifier: >
      Sessions where stop hook fired on non-empty staged changes.
      Sessions with no staged files do not count — they produce no
      real-world signal about FP rate on actual commits.
    current_count: 0
    sample_representativeness_note: >
      3 is the minimum, not a sufficient sample. If all 3 qualifying
      sessions only touched documentation, YAML, or JSON (files the
      checker does not scan), the FP signal is artificially clean.
      The observation log (§6) tracks staged file types — reviewer
      should confirm at least 1 session included changes to lib/ or
      scripts/ (.ts/.py files) before approving promotion.

  false_positive_rate:
    INV-1_max_fps: 0
    INV-2_max_fps: 0
    INV-4_max_fps: 0
    INV-3_note: >
      INV-3 is staged-diff-only and contextual (requires human judgment
      on whether a computation semantic change occurred). NOT promoted
      to pre-commit blocking in this phase — remains advisory.
    rationale: >
      The checker is intentionally narrow (4 invariants). If any FP
      occurs, it means the violation patterns need refinement BEFORE
      becoming a hard gate. Zero tolerance is the correct bar.

  actionability:
    requirement: >
      Each violation message must unambiguously identify file, line,
      and required action. Developer must be able to fix without
      consulting mapping-spec.md.
    measure: manual review of any violations observed during observation sessions

  recurring_noise:
    requirement: >
      No single warning pattern appears in 2+ consecutive sessions
      without a corresponding real violation being present.
    measure: observation log §6
```

## §4 Demotion / Delay Triggers (ANY halts promotion and resets session count)

```yaml
delay_triggers:

  - id: DT-1
    trigger: >
      INV-4 FP from a newly added legitimate calibration consumer
      (a new file that rightfully needs to reference LOW_OVERLAP_THRESHOLD)
    action: >
      Extend CALIBRATION_THRESHOLD_ALLOWED_FILES in checker before
      promoting. Reset session count to 0.

  - id: DT-2
    trigger: >
      INV-1 FP from logging/display/reporting code that reads advisory
      fields for output purposes (not decision logic)
    action: >
      Refine ADVISORY_DECISION_VIOLATION_PATTERNS to exclude the
      legitimate pattern. Reset session count to 0.

  - id: DT-3
    trigger: >
      Schema evolution trigger (exit 2) fires on routine commits that
      genuinely do not require a schema-evolution: event
    action: >
      Audit SCHEMA_EVOLUTION_FILE_TRIGGERS and
      SCHEMA_EVOLUTION_COMPUTATION_TRIGGERS for over-broad patterns.
      Narrow before promoting. Reset session count to 0.

  - id: DT-4
    trigger: >
      Any violation message that a developer cannot interpret without
      reading mapping-spec.md (message is not self-contained)
    action: >
      Improve violation description text in checker. Not a reset trigger,
      but must be resolved before promotion.

  - id: DT-5
    trigger: >
      Same warning text appears unchanged in 2+ consecutive sessions
      without anyone investigating or classifying it
    action: >
      Classify: is it a real violation, a known-acceptable exception,
      or a checker pattern issue? Record in §6 log. If unclassifiable,
      delay promotion.
```

## §5 Blocking vs. Advisory Split at Pre-Commit Stage

When promoted, these checks become **blocking** (exit 1):

```yaml
pre_commit_blocking:
  - check: INV-1
    reason: advisory field in decision logic — always a code correctness issue
  - check: INV-2
    reason: synthesis verdict mapped to enforcement — always a semantic boundary violation
  - check: check_C_advisory_misuse_in_diff
    reason: diff-level advisory misuse — catches INV-1 violations before they land
  - check: INV-4
    reason: calibration spread outside corpus-specific files — detectable, unambiguous
```

These remain **advisory** (non-blocking, logged) even after pre-commit promotion:

```yaml
pre_commit_advisory_only:
  - check: INV-3
    reason: >
      Staged-diff-based + requires judgment on whether computation semantics
      actually changed. Cannot be reliably automated to block.
  - check: schema_evolution_trigger
    reason: >
      Exit 2 indicates a classification decision is needed, not necessarily
      a violation. Human judgment required at commit time.
      A future P3 artifact (evidence pack generator) may change this.
```

## §6 Observation Log

Sessions qualifying toward the ≥3 minimum.
**Criterion**: stop hook fired with non-empty staged files.

| # | Date | Staged files summary | Includes .ts/.py? | Hook result | FP? | Message self-contained? | Reset trigger? | Notes |
|---|------|----------------------|-------------------|-------------|-----|------------------------|----------------|-------|
| 1 | 2026-04-21 | lib/knowledge-inference.ts, lib/synthesis-context.ts | yes | pass | no | yes | none | lib/ type annotation fixes; both staged .ts files |

**Sessions meeting minimum criterion: 1 / 3**
**Sessions including .ts/.py scan surface: 1** (at least 1 required before promotion)

Column notes:
- **Hook result**: pass / fail (INV-N) / schema_evolution_required
- **FP?**: yes/no — if yes, which INV and what file/line
- **Message self-contained?**: could developer fix without reading mapping-spec.md? yes/no
- **Reset trigger?**: DT-N if any demotion trigger tripped; "none" if clean

## §7 Promotion Decision Record

To be filled when all §3 criteria are met:

```yaml
promotion_decision:
  status: pending
  sessions_qualifying: 0
  sessions_required: 3
  fp_count_INV1: 0
  fp_count_INV2: 0
  fp_count_INV4: 0
  actionability_confirmed: false
  recurring_noise_confirmed_clean: false
  delay_triggers_tripped: []
  promote_date: ~
  promote_commit: ~
  promoted_by: ~
  notes: ~
```

## §8 Changelog

| Date | Change | Commit |
|------|--------|--------|
| 2026-04-21 | Document created — P2-1.5 | (this commit) |
