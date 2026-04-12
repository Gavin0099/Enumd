# Knowledge Base

## Core Concepts
- **5-Layer Evidence Model**: Traversal, Rendering, Evidence, Validation, Consumption.
- **Invariant Accounting**: The mathematical constraint where `seen == fully + degraded + dropped`.
- **Dual-Path Observation**: Comparing discovery counts against extraction counts to expose blind spots.
- **Fail-Visible Design**: A system whose value lies in its ability to expose its own errors and gaps.

## Key Files
- `lib/signals.ts`: Schema-driven evidence collection.
- `lib/notion.ts`: Dual-path Notion traversal engine.
- `scripts/pre-flight-audit.ts`: Integrity-based CI gate.
- `docs/ARCHITECTURE.md`: Semantic guardrails and architectural invariants.
