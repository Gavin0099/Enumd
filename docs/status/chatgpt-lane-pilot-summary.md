# ChatGPT Lane Pilot Summary (5 Runs)

Date: 2026-05-08
Result: pass

## Completion Contract Outcome

- Runs completed: 5/5
- Incomplete runs: 0
- All runs include required mapping fields:
  - `commit_hash`
  - `session_id`
  - `closeout_covered: yes`
  - `mapping_confidence: high`

## KPI Snapshot

- `engineering_runs_total`: 5
- `closeout_valid_total`: 5
- `closeout_missing_total`: 0
- `closeout_valid_ratio`: 1.00
- `mapped_high_total`: 5
- `mapped_high_ratio`: 1.00
- `scope_violation_total`: 0
- `claim_overreach_total`: 0

## Pass Bar Check

- 5/5 completion contract: pass
- `closeout_valid_ratio` non-regression across runs: pass
- `mapped_high_ratio` >= 0.80 by run 5: pass (1.00)
- hard scope violation: none

## Comparison vs Copilot/Claude Lanes

Execution maturity is now stable for bounded semantic slices, with consistent same-repo closeout and ledger updates. Audit mapping maturity is high in this pilot due to explicit commit-session-link enforcement and the added closeout-hash validator guard. Observed governance friction is mainly operational sequencing (commit-first then hash backfill), which was reduced by the remediation validator in run 5.
