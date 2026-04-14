# Wave Gate Contract (Production v1)

This contract defines the operational rules for the **8-Wave Production Rollout**.

## 1. Wave Execution Protocol
- **Wave Size**: 50 nodes.
- **Automation Level**: Batched synthesis using `applied_model: haiku`.
- **Reproducibility**: Every wave produces a `lockfile.json`.

## 2. The Review Gate
Before Wave [N+1] can start, Wave [N] must pass the following audit:

- **Sample Size**: 20% (10 nodes) for Wave 1 & 2. (Can be reduced after Wave 3 if 0 hallucinations found).
- **Stratification**: Sample MUST include:
    - 3x AUTO_ACCEPT
    - 3x HUMAN_REVIEW
    - 2x HIGH Noise
    - 2x STABLE (Long)
- **Verdict**: A formal `wave_[N]_verdict.json` signed by the reviewer.

## 3. Stop & Rollback Semantics

### STOP Trigger
The production run is **IMMEDIATELY BLOCKED** if:
- **Major**: 1 Logic Hallucination is found in the sample.
- **High Error Rate**: > 10% Minor quality issues.
- **Traceability Breach**: Reviewer cannot locate claims in source data.

### Rollback / Recovery
- **Isolation**: The failed wave's artifacts are moved to `history/blocked/wave_[N]/`.
- **Root Cause**: A `wave_[N]_incident.md` must be created.
- **Re-run**: After the fix, the **ENTIRE WAVE** must be re-executed to ensure internal consistency. Partial patching is prohibited.
