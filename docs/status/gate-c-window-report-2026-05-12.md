# Gate C Window Report (Round B)

- date: 2026-05-11
- window_id: `gate-c-window-2026-05-12`
- scope: `copilot`, `claude`, `chatgpt`
- mode: observation-only

## Execution Summary

- total runs: `30/30`
- per-lane runs: `10/10` each lane
- per-lane pack quota:
  - comparable: `4/4`
  - ambiguity: `3/3`
  - ablation: `3/3`

## Required Inputs (Present)

- `docs/status/gate-c-review-log.ndjson`
- `docs/status/gate-c-rework-log.ndjson`
- `docs/status/gate-c-stability-log.ndjson`
- `docs/status/gate-c-window-2026-05-12-p1-run-tracker.csv`

## Validation Commands

```bash
python scripts/evaluate-gate-c-window.py --window-id gate-c-window-2026-05-12
python -m pytest -q ai-governance-framework/tests/test_gate_c_fgcr_hostile_fixtures.py ai-governance-framework/tests/test_fgcr_report.py --basetemp ai-governance-framework/.pytest_tmp
```

## Validation Result

- evaluator: `GATE_C_EVAL=OK`
- cross_lane_decision: `pass`
- lane decisions:
  - copilot: `pass`
  - claude: `pass`
  - chatgpt: `pass`
- hostile regression: `4 passed`

## Gate Check (Minimum)

- Gate A: no blocking inconsistency observed in this run window execution path.
- Gate B: no blocking signal observed in this run window execution path.
- Gate C: all lanes satisfied:
  - `valid_review_timing_count >= 10`
  - `reopen_revert_denominator_ready = yes`
  - `stability_known = yes`

## Interpretation Boundary

> This window is observational evidence only. It does not prove quality uplift, reasoning uplift, or deterministic governance effect.

