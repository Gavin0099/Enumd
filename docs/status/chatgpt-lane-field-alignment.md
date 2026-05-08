# ChatGPT Lane Field Alignment (Pilot)

Date: 2026-05-08
Purpose: keep cross-file naming consistent across plan, closeout, ledger, and KPI files.

## Canonical Field Mapping

- Completion contract evidence fields:
  - `commit_hash`
  - `session_id`
  - `closeout_covered`
  - `mapping_confidence`
- Session closeout status field:
  - `closeout_status` (expected value for pass: `valid`)
- Intent alignment field:
  - `task_intent`
- Run-level contract verdict field:
  - `completion_contract` (`pass` or `incomplete`)

## Consistency Rule

- In `docs/status` surfaces, avoid aliases for the fields above.
- If an alias appears, replace it with the canonical field name in the next run.
