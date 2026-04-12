# Enumd Architecture: The 5-Layer Evidence Production Model

Enumd is not a simple "Notion to Markdown" exporter. It is a **Signal-Centric Evidence Runtime** designed for high-trust knowledge extraction and governance. 

To prevent architectural erosion, all contributors must adhere to the following 5-Layer model.

---

## Layer 1: Source Traversal (Observed Reality)
**Responsibility**: Navigating the Notion block tree, handling pagination, and recursive structure.
- **Invariant**: **Encounter-before-render**. Every block encountered MUST be registered in the Signal before rendering is attempted.
- **Accounting**: Tracks `seen` counts at the moment of discovery.

## Layer 2: Rendering (Extraction)
**Responsibility**: Mapping Notion blocks to Markdown surfaces.
- **States**: Every render attempt must result in one of three states:
    - **`fully_rendered`**: Complete semantic transfer.
    - **`degraded_rendered`**: Intent preserved via fallback/placeholder (e.g., Image link).
    - **`dropped`**: Intent lost due to crash or critical unsupported gap.
- **Fidelity**: Tracks rich text formatting (links, bold, etc.) as `{ total, preserved }` counters.

## Layer 3: Evidence (Signal Production)
**Responsibility**: Emitting the immutable JSON evidence (v2.5).
- **Schema**: Includes metadata, counts, and **Failure Hinting** (`render_errors`).
- **Atomic Persistence**: Signals must be saved alongside their Markdown surfaces as a single logical transaction.

## Layer 4: Capability Validation (Falsifiability)
**Responsibility**: Comparing the Signal against the **Capability Baseline**.
- **The Baseline**: A contract (`lib/capabilities.ts`) defining what the system *claims* to support.
- **Regression Guard**: If a `fully_supported` type results in anything less than full rendering, it is flagged as **`CORE_SUPPORT_REGRESSION`**.

## Layer 5: Governance Consumption (Interpretation)
**Responsibility**: Transforming raw evidence into advisories and decisions.
- **Principle**: **Observation != Verdict**. Enumd reports facts; the Governance layer (`.governance/extraction_semantics.yaml`) interprets them based on context (e.g., "Image degradation is okay for notes, but CRITICAL for specs").

---

## Invariant Guardrails
1. **Never move interpretation logic into Enumd**. Enumd reports `degraded: 1`, it does NOT decide if that's "good" or "bad".
2. **Never swallow a block**. If a block is seen but can't be rendered, it MUST be marked as `dropped`.
3. **Capability Baseline discipline**. Moving a block from `fully_supported` to `fallback_only` is a **Governance Concession** and must be documented.

## The Integrity Reporting Guardrail (v2.7.1)
**Responsibility**: Providing a technical summary of evidence coherence for operators.
- **Principle**: **Integrity != Content Truth**. The `integrity_report` band (HIGH/MEDIUM/LOW) represents the mathematical and structural stability of the extraction, not the factual accuracy of the source content.
- **Language Constraint**: Reasons for band drops MUST stick to **Raw Observation Facts** (e.g., `invariant_drift`, `alignment_mismatch`). 
- **Forbidden Vocabulary**: Never use policy-level or value-judgment words (e.g., `unsafe`, `untrustworthy`, `good`, `production-ready`, `RAG-safe`). Those verdicts belong strictly to the Governance Layer.
- **Decision Gate Warning**: Integrity Bands are **non-actionable summaries** of technical coherence. They MUST NOT be used as hard decision gates for usage (e.g., `if integrity == HIGH then trust_content = true`). Governance policies must consume the raw evidence, not just the band.
