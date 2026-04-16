# Enumd — Scope Declaration

> This document defines what this repository is, what it is not, and under what
> conditions its governance components could be extracted for broader use.
>
> Purpose: prevent scope inflation (claiming general capability before it exists)
> and scope collapse (treating reusable components as permanently domain-locked).
>
> This document is a living constraint, not a roadmap.

---

## 1. Current Operational Scope

This repository implements a **governance-embedded synthesis pipeline** for a
specific knowledge graph with the following fixed assumptions:

| Dimension | Current Value |
| :--- | :--- |
| **Source** | Notion-exported pages, normalized to XML via `build-graph.ts` |
| **Domain** | USB device firmware, Windows driver tooling, embedded systems, HP/GL hardware |
| **Graph structure** | `nodes.json` + `edges.json`; wave-split execution (50 nodes/wave) |
| **Synthesis model** | `claude-3-haiku-20240307`, Policy A (STABLE) |
| **Claim calibration** | Overlap thresholds tuned on 297-node production corpus (median=0.75, p10=0.39) |
| **Noise filters** | SANITIZATION_PATTERNS tuned for Mermaid diagram syntax, CLI invocations, USB protocol data — all derived from observed contamination in this specific corpus |
| **Node classification** | HANDOFF / FRAGMENTARY / STANDARD — defined for task-list and spec document types endemic to this domain |

The governance gates (enforcement, suppression, advisory) are not separable from
this pipeline in the current implementation. They were calibrated on this corpus
and will produce unreliable signals on arbitrary input.

---

## 2. Non-Goals

The following are **not** capabilities this repository currently has or claims:

- **Not a general-purpose governance engine.** It cannot govern arbitrary agent
  output. It governs Enumd synthesis output specifically.

- **Not agent-agnostic.** The pipeline assumes a single LLM synthesis step
  (Haiku) with a fixed prompt policy. There is no interface for injecting
  other agents' outputs into the governance layer.

- **Not domain-independent.** `LOW_OVERLAP_THRESHOLD`, `CONTEXT_GAP_THRESHOLD`,
  KAL convergence rates, and suppression tiers are calibrated on USB/Windows/firmware
  content. Applied to a different domain, these numbers produce undefined behavior —
  not failure, which would be detectable, but silent miscalibration, which would not.

- **Not corpus-agnostic.** SANITIZATION_PATTERNS encode noise specific to this
  corpus (Mermaid, CLI syntax, USB protocol fragments). A different source corpus
  will have different noise profiles; these patterns will not catch them.

- **Not a compliance layer.** The governance here is epistemic (is this claim
  traceable to source evidence?) not regulatory (does this output satisfy an
  external standard?). These are different problems.

---

## 3. Reusable Governance Primitives

The following components exhibit governance logic that is not inherently
Enumd-specific. They have not been independently validated on any other domain,
but their design does not hard-code Enumd assumptions.

| Component | File | What it encodes | Extractability note |
| :--- | :--- | :--- | :--- |
| **Claim tier semantics** | `lib/claim-store.ts` | Explicit / Derived / Structural / Inferred distinction based on evidence density | Tier logic is domain-neutral; thresholds are not |
| **Suppression policy** | `lib/tiered-enforcement-policy.ts` | SUPPRESS\_DERIVED / AUDIT\_FLAG / PASS tiering based on node type + unsupported ratio | Node type taxonomy (HANDOFF/FRAGMENTARY/STANDARD) is Enumd-specific |
| **Advisory surface taxonomy** | `lib/domain-advisory.ts` | 4-signal risk surface: `low_semantic_overlap`, `domain_misalignment_risk`, `external_tool_context_gap`, `paraphrase_mismatch_suspected` | Signal logic is portable; slug patterns and thresholds are domain-tuned |
| **Enforcement gate pattern** | `lib/synthesis-enforcer.ts` | Raw LLM draft → cleaned output + per-line verdicts; raw draft never persisted | Gate architecture is portable; SANITIZATION\_PATTERNS are corpus-specific |
| **Audit artifact schema** | `audit.json` per node | Structured trace of all governance decisions for a synthesis unit | Schema is a viable inter-system contract if semantics are agreed upon |
| **Corpus overlap scorer** | `lib/domain-advisory.ts` | Token-level claim-to-source matching, domain-agnostic algorithm | Algorithm is portable; threshold calibration requires per-domain corpus measurement |

These primitives are **identified but not yet extracted**. They exist as embedded
components of the Enumd pipeline, not as standalone interfaces.

---

## 4. Extraction Preconditions

The following conditions must hold before any of the above primitives can be
legitimately called a "governance engine" capable of governing agents other than
Enumd's synthesis pipeline:

### 4.1 Interface Independence
The governance logic must be able to run without assuming:
- `wave_N/slug/` directory structure
- `nodes.json` / `edges.json` as input
- A fixed synthesis script (`run-synthesis.ts`) as the upstream

**Concrete test:** Can `enforceDraft()` and `computeDomainAdvisory()` accept
arbitrary (slug, sourceText, claims[]) input from a non-Enumd caller and return
meaningful results?

### 4.2 Threshold Recalibrability
Any numeric threshold must be expressed as a configurable parameter with a
documented calibration procedure, not a hard-coded constant.

**Concrete test:** `LOW_OVERLAP_THRESHOLD` must become an input parameter
derived from corpus measurement, not a constant baked into `domain-advisory.ts`.
The calibration procedure (run advisory replay on N nodes, measure p10/p25) must
be documented as a repeatable step.

### 4.3 Semantic Stability Across Domains
Claim tier semantics and suppression tiers must produce interpretable results on
at least two domains outside USB/Windows/firmware, verified by adversarial probe.

**Concrete test:** Run enforcement + suppression on a 20-node sample from a
structurally different domain (e.g., product documentation, code review notes).
Measure: does AUDIT\_FLAG rate stay below 10%? Does SUPPRESS\_DERIVED fire only
on nodes with genuinely sparse evidence, not on high-quality content?

### 4.4 Artifact Schema Formalization
`audit.json` semantics must be documented as a versioned contract, not inferred
from implementation. Any downstream consumer (including a hypothetical Hermes
governance adapter) must be able to interpret the artifact without reading the
source code.

**Concrete test:** Can the audit artifact schema be expressed as a JSON Schema
or TypeScript interface that fully specifies the governance decisions, without
referencing Enumd-internal concepts?

---

## 5. Relationship to Adjacent Systems

| System | Role relative to this repo |
| :--- | :--- |
| **AI Governance Framework** | Defines the institutional rules this repo implements; this repo is one instantiation of those rules, not the rules themselves |
| **Hermes Agent (hypothetical)** | Would be a governed agent whose output enters this repo's enforcement gate — but only after preconditions §4.1–4.4 are met; before that, Hermes outputs have no defined entry point |

---

## Version

| Field | Value |
| :--- | :--- |
| Document version | 1.0 |
| Written against | production\_v1 baseline (297 nodes, 6 waves) |
| Last reviewed | 2026-04-16 |
| Review trigger | When any extraction precondition in §4 is proposed as "met" |
