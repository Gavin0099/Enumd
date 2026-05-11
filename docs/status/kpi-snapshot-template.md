# KPI Snapshot Template

## ChatGPT Lane Pilot (5 Runs)

| run_id | date | engineering_runs_total | closeout_valid_total | closeout_missing_total | closeout_valid_ratio | mapped_high_total | mapped_high_ratio | scope_violation_total | claim_overreach_total | reviewer_edit_effort | token_notes |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| run-01 | 2026-05-08 | 1 | 1 | 0 | 1.00 | 1 | 1.00 | 0 | 0 | n/a | not captured yet |
| run-02 | 2026-05-08 | 2 | 2 | 0 | 1.00 | 2 | 1.00 | 0 | 0 | n/a | not captured yet |
| run-03 | 2026-05-08 | 3 | 3 | 0 | 1.00 | 3 | 1.00 | 0 | 0 | n/a | not captured yet |
| run-04 | 2026-05-08 | 4 | 4 | 0 | 1.00 | 4 | 1.00 | 0 | 0 | n/a | validator run recorded |
| run-05 | 2026-05-08 | 5 | 5 | 0 | 1.00 | 5 | 1.00 | 0 | 0 | n/a | remediation guard added |

## ChatGPT Lane Observation Window (Runs 06-15)

| run_id | date | commit_hash | session_id | closeout_status | session_source | closeout_covered | mapping_confidence | scope_violation_count | claim_overreach_count | summary_detail_consistency | notes |
|---|---|---|---|---|---|---|---|---:|---:|---|---|
| run-06 | 2026-05-11 | d1dc0bb | chatgpt-lane-run6-2026-05-11 | valid | native | yes | high | 0 | 0 | pass | native closeout via runtime entrypoint |
| run-07 | 2026-05-11 | e959459 | chatgpt-lane-run7-2026-05-11 | valid | native | yes | high | 0 | 0 | pass | native closeout via runtime entrypoint |
| run-08 | 2026-05-11 | 79a3e23 | chatgpt-lane-run8-2026-05-11 | valid | native | yes | high | 0 | 0 | pass | native closeout via runtime entrypoint |
| run-09 | 2026-05-11 | debc11a | chatgpt-lane-run9-2026-05-11 | valid | native | yes | high | 0 | 0 | pass | native closeout via runtime entrypoint |
| run-10 | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| run-11 | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| run-12 | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| run-13 | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| run-14 | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| run-15 | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |

### Observation KPI Split (Runs 06-15)

| window | closeout_valid_ratio | valid_native_total | valid_backfill_total | valid_native_ratio | valid_backfill_ratio | mapped_high_total | mapped_high_ratio | scope_violation_total | claim_overreach_total | summary_detail_consistency_all_pass | native_run_count |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---:|
| run-06..run-15 | 1.00 | 4 | 0 | 1.00 | 0.00 | 4 | 1.00 | 0 | 0 | pass | 4 |
