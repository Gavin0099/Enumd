# Pre-Commit Promotion Session 3 Checklist

Purpose: complete the final qualifying observation (`3/3`) for promotion from advisory stop-hook to pre-commit hard gate.

## Scope

- Stage at least one `.ts` or `.py` file covered by `scripts/check-mapping-spec-compliance.py`.
- Keep the change set focused; avoid mixing unrelated refactors.

## Required Run

1. Run staged checker:
   - `python scripts/check-mapping-spec-compliance.py --staged`
2. Record outcome:
   - `pass`
   - `fail (INV-N)`
   - `schema_evolution_required (exit 2)`

## Observation Log Update

1. Add row `#3` in `governance/pre-commit-promotion-criteria.md` section 6:
   - Date
   - Staged files summary
   - Includes `.ts/.py` (`yes/no`)
   - Hook result
   - FP classification (`yes/no`)
   - Message self-contained (`yes/no`)
   - Reset trigger (`DT-N` or `none`)
   - Notes
2. Update counters:
   - `Sessions meeting minimum criterion: 3 / 3`
   - `sessions_qualifying: 3`

## Promotion Decision Update

If no DT-1..DT-5 trigger and results are clean, update section 7:

- `status: approved`
- `actionability_confirmed: true`
- `recurring_noise_confirmed_clean: true`
- `promote_date: <YYYY-MM-DD>`
- `promote_commit: <commit>`
- `promoted_by: <name>`

If any DT trigger appears, do not approve; document trigger and reset count per policy.
