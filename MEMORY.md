# Enumd: Master Consensus & Wisdom

## Core Reality: The Evidence Kernel
The value of Enumd is not in its "correctness" but in its **falsifiability**. A high-trust system is one that reveals its own errors (blind spots, accounting drifts) rather than hiding them behind a 200 OK status.

## Governance Architecture: Separation of Concerns
1. **Observation (Evidence Layer)**: Raw facts only. Invariants, Alignment, Regressions.
2. **Verdict (Governance Layer)**: Interpretation and Policy. What to do with the evidence.
3. **Guardrail**: The Evidence layer MUST NOT use policy language. Integrity is a technical metric, not a safety verdict.

## Key Design Lessons
- **Encounter-before-Render**: You cannot render what you haven't accounted for.
- **Independent Traversal**: External counting (Discovery Pass) is the only way to detect internal traversal bias.
- **Fail-Visible**: Every failure must be categorized (Missing vs Unexpected) to enable fast triage.

## Long-Term Direction
- **Route B (Abstraction)**: Decouple the evidence kernel from Notion to handle any unreliable knowledge source.
- **Governance Integration**: The kernel is now ready to be consumed by a decision layer that applies weighting and policy gates.
