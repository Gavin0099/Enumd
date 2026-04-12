# Enumd: The Challengeable Evidence Kernel

Enumd (v2.7.1) is a specialized Notion-to-Markdown extraction engine designed for high-trust knowledge systems and AI Governance pipelines. 

Unlike standard exporters, Enumd is built to prioritize **observable uncertainty** and **evidence integrity** over silent correctness.

---

## Core Capabilities

- **Falsifiable Evidence**: Every extraction produces an atomic `.metadata.json` signal containing granular metrics (counts, fidelity, errors).
- **5-Layer Architecture**: A strictly decoupled model (Traversal → Rendering → Evidence → Validation → Consumption).
- **Machine-Enforced Invariants**: Internal mathematical checks that ensure the accounting loop (`seen == rendered + dropped`) never drifts.
- **Coverage Alignment**: Dual-path observation (Discovery vs. Extraction) to detect systemic blind spots or traversal failures.
- **Integrity Reporting**: A high-level `integrity_report` (HIGH/MEDIUM/LOW) that summarizes evidence coherence without embedding subjective quality judgment.
- **Regression Guard**: Automatically detects "supported" blocks that fail to render, flagging them as `CORE_SUPPORT_REGRESSION`.

---

## 5-Layer Model

1. **Layer 1: Source Traversal**: Recursion, pagination, and encounter accounting.
2. **Layer 2: Rendering**: Mapping blocks to surfaces (Fully / Degraded / Dropped).
3. **Layer 3: Evidence (Signal)**: Immutable JSON metrics and failure hinting.
4. **Layer 4: Capability Validation**: Regression guards and capability baselines.
5. **Layer 5: Governance Consumption**: Interpretation of raw evidence into advisories.

## Getting Started

### Prerequisites
- Node.js (v18+)
- Notion Integration Token (`NOTION_TOKEN` in `.env.local`)

### Installation
```bash
npm install
```

### Running Extraction
To export a specific page and its children:
```bash
# Target a specific Notion Page ID
npx tsx scripts/export.ts <PAGE_ID>

# Example:
npx tsx scripts/export.ts bed9013e385540938c256a653c1fc04f
```

### Auditing & Validation
```bash
# Run the internal Trust Validation Suite
npx tsx scripts/validate-v2-3-trust.ts

# Run the Pre-Flight Integrity Audit (CI Gate)
npx tsx scripts/pre-flight-audit.ts

# Run a raw API Reality Audit (Source Observation)
npx tsx scripts/reality-audit.ts <PAGE_ID>
```

---

## Guardrails
- **Observation != Verdict**: Enumd reports FACTS. Governance defines POLICIES.
- **Integrity != Quality**: The "Integrity Band" describes technical coherence, not content accuracy.
- **Fail-Visible**: If the system misses a block, the coverage alignment will reveal the discrepancy.

---

## License
MIT
