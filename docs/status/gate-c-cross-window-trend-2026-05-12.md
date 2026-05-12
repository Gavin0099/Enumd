# Gate C Cross-Window Trend Report

- generated: 2026-05-12
- windows: Round B, Round C, Round D, Round E, Round F, Round G
- scope: Enumd (primary)

## Date-Governance Rule

window_id must match execution_date (UTC). If the same date is reused,
use `-rN` suffix instead of future-date window labels.

## Window Summary

| Round | window_id | execution_date | date_match | cross_lane_decision | copilot | claude | chatgpt | hostile |
|-------|-----------|----------------|------------|---------------------|---------|--------|---------|---------|
| B | gate-c-window-2026-05-12 | 2026-05-11 | no (+1d) | pass | pass | pass | pass | 4 passed |
| C | gate-c-window-2026-05-13 | 2026-05-11 | no (+2d) | pass | pass | pass | pass | 4 passed |
| D | gate-c-window-2026-05-14 | 2026-05-12 | no (+2d) | provisional-pass | - | - | - | 4 passed |
| E | gate-c-window-2026-05-15 | 2026-05-12 | no (+3d) | pass | pass | pass | pass | 4 passed |
| F | gate-c-window-2026-05-16 | 2026-05-12 | no (+4d) | pass | pass | pass | pass | 4 passed |
| G | gate-c-window-2026-05-12-r2 | 2026-05-12 | yes | pass | pass | pass | pass | 4 passed |

## Per-Lane Timing (avg_review_minutes)

| Round | copilot | claude | chatgpt |
|-------|---------|--------|---------|
| B | 15.00 | 15.00 | 15.00 |
| C | 15.00 | 15.00 | 15.00 |
| D | null | null | null |
| E | 15.00 | 15.00 | 15.00 |
| F | 15.00 | 15.00 | 15.00 |
| G | 15.00 | 15.00 | 15.00 |

## Round D Data-Gap Note

Round D (`gate-c-window-2026-05-14`) per-window CSV files are absent
(review-timing, reopen-revert, stability). Evaluator returned
`provisional-pass` with `valid_review_timing_count=0` for all lanes.
Round D remains a data-gap window.

## Gating Counts

- completed windows (cross_lane_decision=pass): 5 of 6 (B, C, E, F, G)
- provisional windows: 1 of 6 (D data gap)
- hostile regression pass rate: 5/5 across completed rounds

## Trend Observation

- avg_review_minutes stable at 15.00 across all completed windows
- reopen_revert_rate: 0.0 across all completed windows
- integration_stability: stable across all completed windows
- date governance compliance begins at Round G
- date_match: 1/6 windows aligned execution_date to window_id date

## Boundary

This report covers observational trend data only.
No quality uplift, reasoning uplift, or deterministic governance effect is claimed.
