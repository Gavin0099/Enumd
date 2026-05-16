# Enumd ChatGPT Lane — 15-Run Summary

Date: 2026-05-16
Observation window: run-01 through run-15
Authority: `docs/status/enumd-chatgpt-lane-10-run-observation-plan.md`

---

## 1. Completion Contract Outcome (All 15 Runs)

- Runs completed: 15/15
- Incomplete runs: 0

| window | runs | closeout_valid_ratio | mapped_high_ratio | scope_violation_total | claim_overreach_total |
|---|---|---:|---:|---:|---:|
| run-01..run-05 (backfill) | 5 | 1.00 | 1.00 | 0 | 0 |
| run-06..run-15 (native) | 10 | 1.00 | 1.00 | 0 | 0 |
| **combined** | **15** | **1.00** | **1.00** | **0** | **0** |

---

## 2. Gate Evaluation (Run-06..Run-15 Observation Window)

Per `enumd-chatgpt-lane-10-run-observation-plan.md §4`:

| Gate | Criterion | Result |
|---|---|---|
| 1 | `closeout_valid_ratio >= 0.85` | ✅ pass (1.00) |
| 2 | `mapped_high_ratio >= 0.80` | ✅ pass (1.00) |
| 3 | `scope_violation_total = 0` | ✅ pass |
| 4 | `claim_overreach_total = 0` | ✅ pass |
| 5 | `summary_detail_consistency = pass` (all 10) | ✅ pass |
| 6 | at least `8/10` runs are `session_source=native` | ✅ pass (10/10 native) |

**Overall: all 6 gates pass.**

---

## 3. KPI Split — Native vs Backfill

| metric | native (run-06..15) | backfill (run-01..05) |
|---|---:|---:|
| `valid_native_total` | 10 | — |
| `valid_backfill_total` | — | 5 |
| `valid_native_ratio` | 1.00 | — |
| `valid_backfill_ratio` | — | 1.00 |
| `mapped_high_total` | 10 | 5 |
| `mapped_high_ratio` | 1.00 | 1.00 |
| `scope_violation_total` | 0 | 0 |
| `claim_overreach_total` | 0 | 0 |
| `summary_detail_consistency_all_pass` | pass | pass |
| `native_run_count` | 10 | 0 |

---

## 4. Lane Comparison — ChatGPT vs Copilot vs Claude

Data source: Gate C window reports (Round B through Round F, 2026-05-11 to 2026-05-12).
All three lanes ran identical 10/10 packs per window (comparable/ambiguity/ablation 4/3/3).

### Execution Maturity

| lane | review_timing | reopen_revert_rate | stability_degraded_rate |
|---|---|---|---|
| copilot | 15.00 min avg (consistent) | 0.00 | 0.00 |
| claude | 15.00 min avg (consistent) | 0.00 | 0.00 |
| chatgpt | 15.00 min avg (consistent) | 0.00 | 0.00 |

All three lanes are execution-equivalent under the current 10-run Gate C window cadence.
No lane shows drift, rework, or stability degradation across rounds B–F.

### Mapping Maturity

ChatGPT lane mapping maturity is **high** and matches the Copilot and Claude baselines:
- `mapping_confidence: high` on all 15 runs (including backfill runs-01..05)
- Commit-session link enforced on all runs via ledger validator (run-04 onward)
- Zero hash-alignment or closeout-coverage gaps

### Governance Friction

| lane | friction source | mitigation |
|---|---|---|
| chatgpt | commit-first sequencing (hash only available post-commit) | resolved by closeout-hash validator (run-05) |
| copilot | none observed in Gate C windows | — |
| claude | none observed in Gate C windows | — |

ChatGPT lane had one operational friction point (hash backfill sequencing) that was resolved in run-05 and has not recurred in run-06..run-15.

---

## 5. Interpretation Boundary

Even with all gates passing:
- This supports **bounded execution governance stability** in Enumd for the ChatGPT lane.
- It does **not** prove autonomous correctness.
- It does **not** prove deterministic reasoning control.
- It does **not** justify enforcement escalation by itself.
- Lane equivalence in Gate C metrics does not imply equivalence in reasoning quality or output semantics.
