# Gate C Window Report (Round H-live)

- date: 2026-05-12
- window_id: `gate-c-window-2026-05-12-r4`
- scope: `copilot`, `claude`, `chatgpt`
- mode: live-only gate pass (observational only)

## Execution Summary

- total runs: `30/30`
- per-lane runs: `10/10` each lane
- per-lane pack quota:
  - comparable: `4/4`
  - ambiguity: `3/3`
  - ablation: `3/3`
- evidence source:
  - `agent_source=live` for all rows
  - `live_row_ratio=1.00`
  - `proxy_row_ratio=0.00`

## Required Inputs (Present)

- `docs/status/gate-c-window-2026-05-12-r4-review-timing.csv`
- `docs/status/gate-c-window-2026-05-12-r4-reopen-revert.csv`
- `docs/status/gate-c-window-2026-05-12-r4-stability.csv`
- `docs/status/gate-c-window-2026-05-12-r4-p1-run-tracker.csv`

## Validation Commands

```bash
python scripts/evaluate-gate-c-window.py --window-id gate-c-window-2026-05-12-r4
python -m pytest -q ai-governance-framework/tests/test_gate_c_fgcr_hostile_fixtures.py ai-governance-framework/tests/test_fgcr_report.py --basetemp ai-governance-framework/.pytest_tmp_roundh_live
```

## Validation Result

- evaluator: `GATE_C_EVAL=OK`
- cross_lane_decision: `pass`
- evidence_quality: `live-only`
- lane decisions:
  - copilot: `pass` (`valid_review_timing_count=10`)
  - claude: `pass` (`valid_review_timing_count=10`)
  - chatgpt: `pass` (`valid_review_timing_count=10`)
- hostile regression: `4 passed`

## Interpretation Boundary

> This window is live-only gate evidence for execution governance checks only.
> It is not quality uplift proof, reasoning uplift proof, or deterministic governance effect proof.
