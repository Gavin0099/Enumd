# Gate C Cross-Window Trend Report

- generated: 2026-05-12
- windows: Round B, Round C, Round D, Round E, Round F, Round G, Round H, Round H-live
- scope: Enumd (primary)

## Date-Governance Rule

window_id must match execution_date (UTC). If the same date is reused,
use `-rN` suffix instead of future-date window labels.

## Window Summary

| Round | window_id | execution_date | date_match | cross_lane_decision | evidence_quality | live_row_ratio | proxy_row_ratio | copilot | claude | chatgpt | hostile |
|-------|-----------|----------------|------------|---------------------|------------------|----------------|-----------------|---------|--------|---------|---------|
| B | gate-c-window-2026-05-12 | 2026-05-11 | no (+1d) | pass | unknown (legacy rows) | n/a | n/a | pass | pass | pass | 4 passed |
| C | gate-c-window-2026-05-13 | 2026-05-11 | no (+2d) | pass | unknown (legacy rows) | n/a | n/a | pass | pass | pass | 4 passed |
| D | gate-c-window-2026-05-14 | 2026-05-12 | no (+2d) | provisional-pass | unknown (data gap) | n/a | n/a | - | - | - | 4 passed |
| E | gate-c-window-2026-05-15 | 2026-05-12 | no (+3d) | pass | unknown (legacy rows) | n/a | n/a | pass | pass | pass | 4 passed |
| F | gate-c-window-2026-05-16 | 2026-05-12 | no (+4d) | pass | unknown (legacy rows) | n/a | n/a | pass | pass | pass | 4 passed |
| G | gate-c-window-2026-05-12-r2 | 2026-05-12 | yes | pass | observational-only (non-live) | 0.00 | 1.00 | pass | pass | pass | 4 passed |
| H | gate-c-window-2026-05-12-r3 | 2026-05-12 | yes | pass | observational-only (non-live) | 0.00 | 1.00 | pass | pass | pass | 4 passed |
| H-live | gate-c-window-2026-05-12-r4 | 2026-05-12 | yes | pass | live-only | 1.00 | 0.00 | pass | pass | pass | 4 passed |

## Per-Lane Timing (avg_review_minutes)

| Round | copilot | claude | chatgpt |
|-------|---------|--------|---------|
| B | 15.00 | 15.00 | 15.00 |
| C | 15.00 | 15.00 | 15.00 |
| D | null | null | null |
| E | 15.00 | 15.00 | 15.00 |
| F | 15.00 | 15.00 | 15.00 |
| G | 15.00 | 15.00 | 15.00 |
| H | 15.00 | 15.00 | 15.00 |
| H-live | 15.00 | 15.00 | 15.00 |

## Round D Data-Gap Note

Round D (`gate-c-window-2026-05-14`) per-window CSV files are absent
(review-timing, reopen-revert, stability). Evaluator returned
`provisional-pass` with `valid_review_timing_count=0` for all lanes.
Round D remains a data-gap window.

## Gating Counts

- completed windows (cross_lane_decision=pass): 7 of 8 (B, C, E, F, G, H, H-live)
- provisional windows: 1 of 8 (D data gap)
- hostile regression pass rate: 7/7 across completed rounds with hostile run executed

## Trend Observation

- avg_review_minutes stable at 15.00 across all completed windows
- reopen_revert_rate: 0.0 across all completed windows
- integration_stability: stable across all completed windows
- date governance compliance begins at Round G
- date_match: 3/8 windows aligned execution_date to window_id date
- evidence split now explicit: r2/r3 are non-live proxy windows; r4 is a live-only 3x10 window

## Evidence Guardrail

- `cross-agent validated` may be used only when `live_row_ratio >= 0.70`.
- Round G and Round H do not meet this threshold (`0.00`), so they remain observational-only.
- Round H-live meets evidence-source threshold (`1.00`) and lane completeness threshold (`valid_review_timing_count=10` each).

## Boundary

This report covers observational trend data only.
No quality uplift, reasoning uplift, or deterministic governance effect is claimed.
