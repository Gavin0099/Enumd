# Gate C Outcome Trend (r4-r6)

- date: 2026-05-12
- windows:
  - `gate-c-window-2026-05-12-r4`
  - `gate-c-window-2026-05-12-r5`
  - `gate-c-window-2026-05-12-r6`
- scope: outcome-layer observation only (`reviewer effort`, `reopen/revert`, `integration stability`)

## Fixed Metrics

- `avg_review_minutes_per_lane`
- `reopen_revert_rate_per_lane = (reopen_count + revert_count) / total_changes`
- `stability_degraded_rate_per_lane = degraded_rows / total_rows`

## Per-Window Metrics

| window_id | lane | avg_review_minutes_per_lane | reopen_revert_rate_per_lane | stability_degraded_rate_per_lane |
|---|---|---:|---:|---:|
| gate-c-window-2026-05-12-r4 | copilot | 15.00 | 0.000000 | 0.000000 |
| gate-c-window-2026-05-12-r4 | claude | 15.00 | 0.000000 | 0.000000 |
| gate-c-window-2026-05-12-r4 | chatgpt | 15.00 | 0.000000 | 0.000000 |
| gate-c-window-2026-05-12-r5 | copilot | 15.00 | 0.000000 | 0.000000 |
| gate-c-window-2026-05-12-r5 | claude | 15.00 | 0.000000 | 0.000000 |
| gate-c-window-2026-05-12-r5 | chatgpt | 15.00 | 0.000000 | 0.000000 |
| gate-c-window-2026-05-12-r6 | copilot | 15.00 | 0.000000 | 0.000000 |
| gate-c-window-2026-05-12-r6 | claude | 15.00 | 0.000000 | 0.000000 |
| gate-c-window-2026-05-12-r6 | chatgpt | 15.00 | 0.000000 | 0.000000 |

## Trend Rules (Applied)

- Effort drift: mark drift only when adjacent-window change `> 20%`.
- Rework alert: trigger when any lane first reaches `reopen_revert_rate > 0`.
- Stability alert: trigger when any lane first reaches `stability_degraded_rate > 0`.

## Result

- Effort drift: none (`15.00 -> 15.00 -> 15.00` for all lanes, 0% change).
- Rework alert: none (all lanes remain `0.000000`).
- Stability alert: none (all lanes remain `0.000000`).
- outcome signals stable (observation only).

## Conclusion

execution governance signals are stable across r4-r6
this is observational outcome evidence only
not a proof of quality/reasoning uplift
