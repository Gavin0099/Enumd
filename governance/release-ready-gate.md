# Release-Ready Gate

Single entrypoint script:

- `scripts/run-release-ready-gate.ps1`

## What it runs

1. `P3-1` evidence draft:
   - `scripts/generate-schema-evolution-evidence.py`
2. `P3-2` post-pipeline summary:
   - `scripts/post-pipeline-evidence-summary.py`
3. `P2-2` blocking release gate:
   - `scripts/check-release-promotion-gate.py`

## Usage

By revision range:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/run-release-ready-gate.ps1 -RevRange "HEAD~1..HEAD" -PipelineRunId "release-check-001"
```

By staged changes:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/run-release-ready-gate.ps1 -Staged -PipelineRunId "release-check-staged"
```

## Exit behavior

- Exit `0`: release gate pass
- Exit `1`: release blocked

Blocking conditions come from `scripts/check-release-promotion-gate.py`, including:
- missing `release_promotion_evidence`
- unresolved schema/authority gate events
- missing or unreadable `knowledge/synthesis_snapshot.json`
