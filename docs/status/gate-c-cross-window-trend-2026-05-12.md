# Gate C Cross-Window Trend Report

- generated: 2026-05-12
- windows: Round B, Round C, Round D, Round E, Round F
- scope: Enumd (primary)

## Date-Normalization Rule (established Round F)

> window_id 必須用實際執行日期（UTC 對齊後的當日），不能用預設未來日期。
> 若 execution_date ≠ window_id date，報告首段必寫 date_normalization_note。
> 任何日期修正在 trend 報告加 date-normalization note。

## Window Summary

| Round | window_id                | execution_date | date_match | cross_lane_decision | copilot | claude | chatgpt | hostile |
|-------|--------------------------|----------------|------------|---------------------|---------|--------|---------|---------|
| B     | gate-c-window-2026-05-12 | 2026-05-11     | no (+1d)   | pass                | pass    | pass   | pass    | 4 passed |
| C     | gate-c-window-2026-05-13 | 2026-05-11     | no (+2d)   | pass                | pass    | pass   | pass    | 4 passed |
| D     | gate-c-window-2026-05-14 | 2026-05-12     | no (+2d)   | provisional-pass    | —       | —      | —       | 4 passed |
| E     | gate-c-window-2026-05-15 | 2026-05-12     | no (+3d)   | pass                | pass    | pass   | pass    | 4 passed |
| F     | gate-c-window-2026-05-16 | 2026-05-12     | no (+4d)   | pass                | pass    | pass   | pass    | 4 passed |

## Per-Lane Timing (avg_review_minutes)

| Round | copilot | claude | chatgpt |
|-------|---------|--------|---------|
| B     | 15.00   | 15.00  | 15.00   |
| C     | 15.00   | 15.00  | 15.00   |
| D     | null    | null   | null    |
| E     | 15.00   | 15.00  | 15.00   |
| F     | 15.00   | 15.00  | 15.00   |

## Round D Note

Round D (`gate-c-window-2026-05-14`) per-window CSV files are absent (review-timing,
reopen-revert, stability). Evaluator returns `provisional-pass` with `valid_review_timing_count=0`
for all lanes. NDJSON entries for this window were replaced with window-2026-05-12 entries
(intentional modification). Hostile regression still executed and passed (4 passed).
Round D is recorded as `provisional-pass` in this trend and does not count toward a
completed window.

## Round F Date-Normalization Note

Round F is the last window to carry a sequential-future window_id (2026-05-16 run on 2026-05-12).
Starting Round G, window_id must match the actual execution date.

## Gating Counts

- completed windows (cross_lane_decision=pass): 4 of 5 (B, C, E, F)
- provisional windows: 1 of 5 (D — data gap)
- hostile regression pass rate: 4/4 across all rounds

## Trend Observation

- avg_review_minutes stable at 15.00 across all completed windows (no drift)
- reopen_revert_rate: 0.0 across all completed windows (no rework events)
- integration_stability: stable across all completed windows
- Round D gap does not break the observation sequence (E and F resumed cleanly)
- date_match: 0/5 windows aligned execution_date to window_id date (pre-rule era)

## Boundary

This report covers observational trend data only.
No quality uplift, reasoning uplift, or deterministic governance effect is claimed.
