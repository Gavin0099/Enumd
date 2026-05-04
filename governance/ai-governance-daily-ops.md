# AI Governance Daily Ops (CLI + CFU)

## Goal

Run once per day at a fixed time, ingest both CLI/CFU JSON summaries for the same window, keep raw JSON, and produce:

- cross-day trend table (`artifacts/governance/daily/trend.csv`)
- stop-condition verdict (`artifacts/governance/daily/stop_condition.json`)

## Daily Command

```bash
python scripts/collect-ai-governance-daily.py \
  --date 2026-05-04 \
  --cli-json <path-to-cli-summary.json> \
  --cfu-json <path-to-cfu-summary.json> \
  --window-days 3
```

## Stored Artifacts

- Raw JSON (must keep):
  - `artifacts/governance/daily/raw/<YYYY-MM-DD>/cli.json`
  - `artifacts/governance/daily/raw/<YYYY-MM-DD>/cfu.json`
- Daily merged status:
  - `artifacts/governance/daily/daily_status/<YYYY-MM-DD>.json`
- Trend:
  - `artifacts/governance/daily/trend.csv`
- Stop condition:
  - `artifacts/governance/daily/stop_condition.json`

## The 8 Daily Fields

1. `evidence_status`
2. `sample_status`
3. `daily_contract_validation.status`
4. `phase1_activation_coverage.status`
5. `PHASE1_EXIT`
6. `phase1_exit.reasons`
7. `session_count` (same-day CLI+CFU sum)
8. `runtime_validation_status`

## Stop Condition (3-day window)

Eligible for next stage only when all are true in the most recent 3 days:

1. At least one day `daily_contract_validation.status = PASS`
2. No day is all-day `insufficient_evidence` (CLI and CFU both insufficient)
3. No integrity error (`FK`/`schema` fail signals)

If not eligible, keep sample-stability work and do not start P2-B coverage tracking yet.
