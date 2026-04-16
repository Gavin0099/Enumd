# Production v1 — Known Error Model

> This document captures the empirically-derived failure modes of the v1 synthesis pipeline.
> The value of this system is not "zero errors" but "errors that are known, typed, and controllable."

---

## 1. Document Type → Suppression Behavior Map

Derived empirically across 6 waves (300 nodes).

| Document Type | Observed Behavior | Suppression Tier | Root Cause |
| :--- | :--- | :--- | :--- |
| HANDOFF (cross-period task lists) | Hallucinates task ownership, schedules, cross-wave commitments | SUPPRESS_DERIVED | Source context too sparse; LLM fills gaps with plausible but unanchored assignments |
| SOP / Procedure documents | Over-infers procedural logic not explicitly stated | SUPPRESS_DERIVED (partial) | Procedural steps often paraphrased or implied in source, not verbatim |
| List / Reference documents (command lists, error codes) | Derived claims flagged despite semantic correctness | AUDIT_FLAG | Keyword-based scorer cannot confirm paraphrase-style claims; not a hallucination — a matching gap |
| Technical Spec / Standard | High claim density, generally healthy | PASS | Source is explicit and dense; keyword overlap high |
| Fragmentary / thin-context nodes | Structural disclaimers dominate; synthesis too short to score | SKIPPED | Insufficient graph context for meaningful synthesis |

---

## 2. Parser Noise Patterns (Eliminated in v1)

These were discovered progressively across waves and are now filtered at both the enforcer and claim-store layers.

### Round 1 (Wave 1)
- `:::className` — Mermaid node class annotation
- `subgraph [...]` — Mermaid subgraph block
- `-->` at line start — Mermaid edge continuation
- `graph TD / flowchart LR` — graph type declaration
- `sequenceDiagram`, `classDiagram`, etc. — diagram type keywords

### Round 2 (Wave 2)
- `%%` — Mermaid comment line
- `classDef name fill:...` — Mermaid CSS class definition
- `NodeId --> NodeId` — edge between named nodes
- `NodeId -- "label" -->` — labeled edge

### Round 3 (Wave 3 + operational fragments)
- `style NodeId fill:` — inline node style override
- `NodeId{"<b>...</b>"}` — shape nodes with HTML labels
- `class NodeA,NodeB className` — batch class assignment
- `linkStyle N,M dependency` — link style override
- `Tool.exe "/flag=..."` — CLI invocation lines
- `$Variable = ...` — PowerShell variable assignments
- `(52) Device Name` — USB device ID enumeration
- `50.0  OUT  40 ab...` — raw protocol capture data
- `Device Phase Data...` — capture log table headers

---

## 3. Suppression Convergence Across Waves

| Wave | SUPPRESS_DERIVED | AUDIT_FLAG | Notes |
| :--- | :--- | :--- | :--- |
| 1 | 4 | 0 | All HANDOFF — cross-period task hallucination |
| 2 | 0 | 2 | Post Mermaid Round-2 fix |
| 3 | 2 | 8 | Spike — Mermaid Round-3 noise contamination (preserved as baseline) |
| 4 | 1 | 2 | Post Round-3 filter fix; spike explained |
| 5 | 3 | 2 | Lenovo/Linux nodes — node-specific, not domain bias (verified by probe) |
| 6 | 1 | 3 | SOP/procedure + list/reference doc types |

**Wave 5 Lenovo/Linux note:** Initially suspected domain-level bias (Windows-centric source XML).
Adversarial probe (Wave 6 probe run) included `tvsuthinkvantage` (Lenovo) which PASSED,
and cross-domain nodes (Xcode, VMware, SDLC, Saleae) which all PASSED.
Conclusion: Wave 5 suppression was node-content-specific, not a systemic domain blind spot.

---

## 4. Semantic Scorer Limitation (v2 Target)

**Current behavior:** Derived-tier claims are verified by checking keyword overlap between
the claim text and the source XML. A claim is "supported" if ≥ N keywords match.

**Known gap:** List and reference documents (command lists, error code tables) produce
Derived claims that are paraphrases of list items. These are semantically correct but
fail keyword matching because paraphrase ≠ verbatim keyword.

**Effect:** These nodes generate spurious AUDIT_FLAGs despite containing no hallucinations.

**v2 direction:** Replace or augment keyword matching with embedding-based semantic
similarity, so paraphrase-style Derived claims can be confirmed without exact keyword hits.

---

## 5. Claim Density Normalization

Raw average density climbs with wave number, but is dominated by a small number of large
technical spec documents. After excluding nodes with >50 claims, the normalized average
is stable at ~14–16 across all waves.

| Wave | Raw avg | Excl. large docs | Large doc outliers |
| :--- | :--- | :--- | :--- |
| 1 | 7.7 | — | — |
| 2 | 13.9 | — | — |
| 3 | 19.2 | — | Mermaid-contaminated baseline |
| 4 | 19.5 | 15.3 | hp-oci-tool-跨平台架構 (147), hub-firmware-update-tool (85) |
| 5 | 19.3 | 16.0 | mac-usb-20-eep-tool (78), merge-code-tool-help (67) |
| 6 | 17.6 | 14.3 | vendor-oci-error-code- (126), system-design-spec (68) |

Large outliers are consistently identifiable as: cross-platform spec books, error code
reference tables, or comprehensive command-line documentation — all legitimate.

---

## 6. What This System Is (and Is Not)

**Is:** A verifiable knowledge extraction engine. Every claim is traceable to:
- The source XML it was extracted from
- The enforcement verdict that allowed it through
- The semantic audit that confirmed its Derived-tier support
- The suppression decision that determined its trustworthiness

**Is not:** A perfect knowledge base. The system has known failure modes (documented above),
and the AUDIT_FLAG mechanism surfaces nodes that require human review before downstream use.

**The governance guarantee:** No claim enters the store without passing enforcement +
semantic scoring. Hallucinations are either removed (REMOVE), flagged for uncertainty
(DOWNGRADE), or suppressed at the tier level (SUPPRESS_DERIVED). What remains is
verifiable by construction, not by trust.
