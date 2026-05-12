# Gate C Window Report (Round F)

- execution_date: 2026-05-12
- window_id: `gate-c-window-2026-05-16`
- date_normalization_note: execution_date (2026-05-12) precedes window_id date (2026-05-16) by 4 days.
  window_id is sequential continuation of Round E (2026-05-15); it is NOT tied to a future
  execution date. Rule: going forward, new window_ids must use the actual execution date.
  This window is the last one to carry a sequential-future ID.
- scope: `Enumd` (primary)

## Execution Summary

- total runs: `30/30`
- per-lane runs: `10/10` (copilot / claude / chatgpt)
- per-lane pack allocation:
  - comparable: `4/4`
  - ambiguity: `3/3`
  - ablation: `3/3`
- per-run hostile regression: skipped per run; executed as batch post-window.

## Validation

```bash
python scripts/evaluate-gate-c-window.py --window-id gate-c-window-2026-05-16
python -m pytest ai-governance-framework/tests/test_gate_c_fgcr_hostile_fixtures.py \
  ai-governance-framework/tests/test_fgcr_report.py \
  -q --basetemp ai-governance-framework/.pytest_tmp_roundf
```

## Validation Result

- evaluator: `GATE_C_EVAL=OK`
- cross_lane_decision: `pass`
- lane decisions:
  - copilot: `pass` (valid_review_timing_count=10, avg=15.00 min)
  - claude: `pass` (valid_review_timing_count=10, avg=15.00 min)
  - chatgpt: `pass` (valid_review_timing_count=10, avg=15.00 min)
- hostile regression: `4 passed, 1 warning` (cache permission, non-blocking)

## Required Outputs

- `docs/status/gate-c-window-2026-05-16-p1-run-tracker.csv`
- `docs/status/gate-c-window-2026-05-16-review-timing.csv`
- `docs/status/gate-c-window-2026-05-16-reopen-revert.csv`
- `docs/status/gate-c-window-2026-05-16-stability.csv`
- `docs/status/gate-c-review-log.ndjson` (appended 30 entries)
- `docs/status/gate-c-rework-log.ndjson` (appended 30 entries)
- `docs/status/gate-c-stability-log.ndjson` (appended 30 entries)
- `docs/status/gate-c-window-report-2026-05-16.md`

## Boundary

This window is observational evidence only.
It does not prove quality uplift, reasoning uplift, or deterministic governance effect.
