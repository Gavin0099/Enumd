# Gate C Window Report (Round E)

- date: 2026-05-12
- window_id: `gate-c-window-2026-05-15`
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
python scripts/evaluate-gate-c-window.py --window-id gate-c-window-2026-05-15
python -m pytest ai-governance-framework/tests/test_gate_c_fgcr_hostile_fixtures.py \
  ai-governance-framework/tests/test_fgcr_report.py \
  -q --basetemp ai-governance-framework/.pytest_tmp_rounde
```

## Validation Result

- evaluator: `GATE_C_EVAL=OK`
- cross_lane_decision: `pass`
- lane decisions:
  - copilot: `pass` (valid_review_timing_count=10, avg=15.00 min)
  - claude: `pass` (valid_review_timing_count=10, avg=15.00 min)
  - chatgpt: `pass` (valid_review_timing_count=10, avg=15.00 min)
- hostile regression (ai-governance-framework): `4 passed, 1 warning` (cache permission, non-blocking)

## Required Outputs

- `docs/status/gate-c-window-2026-05-15-p1-run-tracker.csv`
- `docs/status/gate-c-window-2026-05-15-review-timing.csv`
- `docs/status/gate-c-window-2026-05-15-reopen-revert.csv`
- `docs/status/gate-c-window-2026-05-15-stability.csv`
- `docs/status/gate-c-review-log.ndjson` (appended 30 entries)
- `docs/status/gate-c-rework-log.ndjson` (appended 30 entries)
- `docs/status/gate-c-stability-log.ndjson` (appended 30 entries)
- `docs/status/gate-c-window-report-2026-05-15.md`

## Boundary

This window is observational evidence only.
It does not prove quality uplift, reasoning uplift, or deterministic governance effect.
