# Production v1 — Operationalized Error Model

> Documents the known failure modes of the v1 synthesis pipeline.
> Each mode is classified by **detectability** — distinguishing what is
> auto-observable, what is reproducible but not yet surfaced, and what
> remains inferred. This distinction drives v2 priority.

---

## Error Mode Table

| # | Error Mode | Trigger | Affected Domain | Observable Artifact | Detectability | Candidate v2 Action |
| :- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Cross-period task hallucination** | HANDOFF node type — source is a task list spanning multiple time periods | HANDOFF nodes (Wave 1, 4) | `suppression_decision.tier = SUPPRESS_DERIVED` + `node_type = HANDOFF` in audit.json | ✅ Auto-observable | Mark HANDOFF nodes as non-synthesizable; route to structured extraction only |
| 2 | **Procedural over-inference** | SOP / procedure doc — LLM infers unstated procedural logic | Procedure / SOP documents | `suppression_decision.tier = SUPPRESS_DERIVED` + high `unsupported_ratio` | ✅ Auto-observable (suppression fires) | Classify SOP doc type pre-synthesis; apply stricter Derived threshold |
| 3 | **Mermaid / CLI / table parser noise** | LLM includes diagram syntax or raw data in synthesis output | All waves (progressive discovery) | `enforcement_report.removed > threshold`; specific patterns in synthesis.md | ✅ Auto-observable (enforcer removes them) | None needed — eliminated in Round 3; maintain SANITIZATION_PATTERNS |
| 4 | **Paraphrase mismatch in list/reference docs** | List / reference doc — Derived claims are paraphrases, not keyword-match-able | Command lists, error code tables, USB spec appendices | `suppression_decision.tier = AUDIT_FLAG` + high `unsupported_ratio` | ⚠️ Reproducible but not auto-classified | Add doc-type field to audit.json; distinguish AUDIT_FLAG caused by paraphrase vs. genuine hallucination |
| 5 | **AUDIT_FLAG plateau** | AUDIT_FLAG rate stays flat across waves (~4%) regardless of wave content | All waves | `suppression_decision.tier = AUDIT_FLAG` count per wave | ⚠️ Reproducible but cause unverified | Segment AUDIT_FLAG by doc type; check if plateau is structural (list docs always flag) or saturation |
| 6 | **Node-specific cross-domain suppression** | A specific node has sparse keyword overlap with source XML despite being semantically correct | Lenovo-specific, Linux HID, vendor-specific | `suppression_decision.tier = SUPPRESS_DERIVED` + `node_type = STANDARD` | ⚠️ Reproducible; domain-level bias disproved by probe (Wave 6) | Surface `domain_misalignment_risk` as advisory before suppression fires |
| 7 | **Semantic scorer keyword dependency** | Derived claims verified by keyword overlap only; embedding-level similarity not used | Cross-domain content, paraphrase-heavy docs | No current signal — scorer returns binary confirmed/unsupported | ❌ Currently only inferred | Replace/augment keyword scoring with embedding similarity for Derived tier (v2 core) |
| 8 | **Audit sensitivity saturation** | AUDIT_FLAG rate plateau may indicate scorer ceiling, not true stability | All waves | AUDIT_FLAG rate stable at ~4-6% across diverse content | ❌ Currently only inferred | Define synthetic benchmark: inject known-hallucinated Derived claims; verify AUDIT_FLAG fires |

---

## Detectability Key

| Symbol | Meaning |
| :--- | :--- |
| ✅ Auto-observable | Already surfaced in runtime artifacts; can be queried, trended, alerted |
| ⚠️ Reproducible but not auto-classified | Pattern is real and repeatable, but artifact does not yet label the root cause |
| ❌ Currently only inferred | Hypothesis based on behavioral pattern; no direct measurement yet |

---

## What "Auto-observable" Actually Means in v1

The following can be queried directly from `audit.json` per node:

```
suppression_decision.tier         → SUPPRESS_DERIVED / AUDIT_FLAG / PASS
suppression_decision.node_type    → HANDOFF / FRAGMENTARY / STANDARD
suppression_decision.unsupported_ratio
suppression_decision.derived_count
enforcement_report.removed
enforcement_report.downgraded
kal_report.verdict                → CONVERGED / THIN_SYNTHESIS / SKIPPED
semantic_audit.supported / unsupported
```

What cannot be queried:
- Why a specific AUDIT_FLAG fired (paraphrase vs. hallucination)
- Whether a PASS node contains semantically wrong but keyword-matching claims
- Whether the 4-6% AUDIT_FLAG rate represents all bad claims or only some

---

## Parser Noise Patterns (Eliminated — Maintenance Reference)

### Mermaid (all waves)
`:::className` · `subgraph [...]` · `-->` at line start · `graph TD/flowchart LR` ·
`sequenceDiagram/classDiagram/etc.` · `%%` · `classDef name fill:` ·
`NodeId --> NodeId` · `NodeId -- "label"` · `style NodeId fill:` ·
`NodeId{"<b>..."}` · `class NodeA,NodeB cls` · `linkStyle N,M dep`

### Operational Fragments
`Tool.exe "/flag=..."` · `$Variable = ...` · `(52) Device Name` ·
`50.0  OUT  40 ab...` · `Device Phase Data...`

---

## Cross-Wave Suppression Summary

| Wave | SUPPRESS | AUDIT_FLAG | Explanation |
| :--- | :--- | :--- | :--- |
| 1 | 4 | 0 | All HANDOFF — error mode #1 |
| 2 | 0 | 2 | Post Mermaid Round-2 filter |
| 3 | 2 | 8 | Mermaid Round-3 contamination (preserved as baseline) |
| 4 | 1 | 2 | hub-auto-test (64% unsupported) — error mode #2 |
| 5 | 3 | 2 | Lenovo/Linux — node-specific (error mode #6), not domain bias |
| 6 | 1 | 3 | sw文件撰寫sop (SOP) — error mode #2; list docs — error mode #4 |

**Wave 5 domain-bias probe result:** 15-node adversarial probe (9 cross-domain, 6 control)
returned 15/15 PASS, 0 SUPPRESS. Domain-level bias hypothesis rejected.
Lenovo/Linux suppression in Wave 5 was node-content-specific (error mode #6).
