# ChatGPT Lane Reviewer Claim Boundary (Pilot)

Date: 2026-05-08
Scope: reviewer-facing wording for pilot-run closeout and KPI summaries

## Allowed Claim Language

- Prefer verifiable wording tied to artifacts:
  - "recorded", "observed", "mapped", "validated in this run"
- Anchor each operational claim to at least one auditable field:
  - `commit_hash`, `session_id`, `closeout_status`, `mapping_confidence`
- Use bounded qualifiers for inferences:
  - "suggests", "indicates", "within this 5-run pilot sample"

## Disallowed Claim Language

- Do not claim engineering correctness uplift from pilot status metrics alone.
- Do not claim enforcement escalation from pilot status metrics alone.
- Do not claim deterministic cognition or universal reliability.
- Do not generalize beyond the run scope when evidence is run-local only.

## Reviewer Output Guardrail

- If evidence is incomplete, downgrade to:
  - `incomplete` run status
  - explicit missing fields list
- If wording exceeds evidence scope, log:
  - `claim_overreach_total += 1`
  - remediation note in run closeout
