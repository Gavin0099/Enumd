# AGENTS.md
<!-- governance-baseline: overridable -->
<!-- baseline_version: 1.0.0 -->
<!-- This file is repo-specific. Edit freely. -->
<!-- DO NOT edit AGENTS.base.md — it is a protected framework file. -->

This file extends `AGENTS.base.md`.
All rules in `AGENTS.base.md` are non-negotiable and apply to this repo unconditionally.

Add repo-specific rules below.
Fill in each section below, or write `N/A` if the section is not applicable to this repo.

Quick start:

1. Start with the top 1-3 risky paths in this repo, not a full policy rewrite.
2. If you already have a checklist / runbook / test convention, copy that wording here instead of inventing new terms.
3. If a section truly does not apply, keep `N/A` and move on.

---

## Repo-Specific Risk Levels
<!-- governance:key=risk_levels -->

<!-- Define what makes a change HIGH / MEDIUM / LOW risk in this repo.
Example:
- HIGH: any change to auth, payment, or data migration paths
- MEDIUM: adding a new API endpoint or external dependency
- LOW: documentation, config comments, test-only changes

Prompt yourself:
- What changes in this repo can corrupt state, break compatibility, or cause production downtime?
- What changes are review-heavy but still reversible?
- What changes are safe enough to keep in a fast path?
-->

Use this repository baseline:
- HIGH: any run/process change that can break completion contract integrity (commit-session mapping, closeout validity, ledger consistency), or any cross-file governance tooling change affecting evidence generation.
- MEDIUM: small validator/tooling patches, cross-file sync patches, or reviewer-facing wording/claim boundary updates.
- LOW: docs-only consistency patches that do not alter contract logic, mapping logic, or KPI formulas.

## Must-Test Paths
<!-- governance:key=must_test_paths -->

<!-- List modules or code paths that require tests before merge.
Example:
- src/auth/       any change here needs integration tests
- src/migrations/ schema changes need a rollback test

Prompt yourself:
- Which files or directories would you never want changed without a test?
- Which paths are easy to break with static changes alone?
- Which user-visible or hardware-facing flows need explicit coverage?
-->

Changes under these paths require explicit verification before merge:
- `AGENTS.md`: verify completion contract wording remains machine-auditable and non-contradictory.
- `docs/status/`: verify run summary/detail consistency and KPI field compatibility.
- Any validator/tooling path that writes closeout or ledger data: verify `closeout_status`, `closeout_covered`, and `mapping_confidence` semantics remain intact.

## L1 → L2 Escalation Triggers
<!-- governance:key=escalation_triggers -->

<!-- When does this repo's work need the full L2 evidence checklist?
Example:
- Changing shared database schema
- Modifying public API contracts
- Any change touching >3 modules simultaneously

Prompt yourself:
- What kinds of changes cross system boundaries?
- What changes would require a reviewer to ask for stronger evidence than normal?
- What changes become risky mainly because they are broad, not because they touch one file?
-->

Escalate to L2 evidence checklist when any of the following is true:
- Any change to completion contract criteria or pass/fail interpretation.
- Any change to closeout-session validation, session-index append behavior, or ledger mapping rules.
- Any change touching more than 3 files across docs + tooling + governance control surfaces.
- Any pilot result used for lane-to-lane comparison claims.

## Repo-Specific Forbidden Behaviors
<!-- governance:key=forbidden_behaviors -->

<!-- Add restrictions beyond the framework baseline.
Example:
- Do not write directly to the production database from tests
- Do not commit .env files even if .gitignored

Prompt yourself:
- What are the easy-to-make mistakes that are specific to this repo?
- Are there tool, environment, hardware, or deployment actions that should never happen casually?
- What "cleanup" or "shortcut" behaviors have already caused pain here?
-->

For ChatGPT lane pilot runs, the following are mandatory:
- Follow `docs/status/chatgpt-lane-pilot-plan.md` for every run.
- One semantic slice per run; no mixed giant commit and no repo-wide refactor.
- A run is counted only if completion contract is fully satisfied; otherwise mark `incomplete`.
- Do not claim engineering correctness uplift, enforcement escalation, or deterministic cognition from this pilot alone.
- Do not mark `mapping_confidence: high` unless commit-session-closeout linkage is directly auditable.
