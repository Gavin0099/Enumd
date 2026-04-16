# Scope Definition

## 1. Purpose

This document defines the **current scope boundary** of this repository.

It exists to answer one question clearly:

> Is this repository an Enumd-specific synthesis-and-governance system,
> or is it already a general-purpose governance engine for arbitrary agent outputs?

Current answer:

> It is an **Enumd-specific synthesis-and-governance system**
> with some potentially reusable governance primitives,
> but it is **not yet** a general-purpose governance engine.

---

## 2. Current Operational Identity

This repository currently operates as:

> A domain-calibrated synthesis pipeline with embedded governance controls
> for the Enumd knowledge graph.

In practical terms, it performs both:

### 2.1 Synthesis pipeline responsibilities
- load Enumd nodes / slugs / wave pools
- construct synthesis context from domain documents
- generate or process synthesis outputs
- maintain claim-related outputs for review
- execute wave-based production / probe runs

### 2.2 Embedded governance responsibilities
- apply enforcement policy
- classify outcomes into suppression / audit / pass-like categories
- attach advisory signals
- emit `audit.json` and related artifacts
- maintain governance-facing summaries and quality observations

These two responsibilities are currently **coupled**.

Governance does not yet operate independently of the Enumd synthesis flow,
and synthesis does not currently bypass governance.

---

## 3. What This Repository Is

This repository **is**:

- a synthesis-and-governance system for Enumd
- calibrated around Enumd corpus and Enumd execution flow
- designed for USB / Windows / firmware oriented knowledge synthesis
- capable of producing governance-aware audit artifacts
- capable of exposing claim-level and node-level quality signals

---

## 4. What This Repository Is NOT

This repository is **not** currently:

- a general-purpose governance engine
- an agent-agnostic output validator
- a domain-independent claim enforcement runtime
- a plug-and-play governance layer for arbitrary corpora
- a universal advisory/suppression framework

It should **not** currently be described as:

- able to govern any agent output
- calibrated across arbitrary domains
- independent from Enumd node structure
- independent from Enumd corpus assumptions
- ready for framework-level extraction without further validation

---

## 5. Current Coupling Points

The following parts are still coupled to Enumd-specific assumptions:

### 5.1 Execution structure coupling
- slug-oriented processing
- wave runner execution model
- node pool selection
- nodes.json / wave-based orchestration

### 5.2 Domain calibration coupling
- overlap thresholds
- handoff thresholds
- corpus-specific score behavior
- Windows / USB / firmware vocabulary distribution

### 5.3 Heuristic coupling
- sanitization patterns
- score evidence rules
- pattern-based advisory triggers
- KAL-related checks and quality assumptions

### 5.4 Artifact meaning coupling
- node-level outcome semantics
- claim interpretation under Enumd synthesis
- enforcement categories whose meaning depends on the synthesis pipeline

These coupling points mean the system cannot yet be honestly presented as
domain-neutral or agent-neutral.

---

## 6. Reusable Governance Primitives (Candidate Only)

The following elements appear potentially reusable,
but are **not yet validated as framework-generic**:

### 6.1 Claim semantics
- explicit vs derived distinction
- atomic claim-oriented review surface

### 6.2 Governance actions
- suppress / downgrade / keep style outcome handling
- audit-required vs pass-like distinction

### 6.3 Advisory surface
- non-gating signal emission
- decision-distance-aware warning design
- reviewer-visible governance hints

### 6.4 Artifact patterns
- structured audit outputs
- governance summaries
- provenance-bearing observations

### 6.5 Boundary logic patterns
- evidence-first enforcement
- verdict-neutral instrumentation slices
- separation of observation from action

These are **candidate primitives**, not extracted framework modules.

---

## 7. Non-Goals (Current)

The current repository does **not** aim to:

- provide universal default thresholds for semantic overlap
- define domain-general advisory trigger values
- replace ai-governance-framework as the cross-domain governance authority
- govern arbitrary external agents directly
- serve as the canonical framework for all governance semantics

This matters because several current values only make sense inside Enumd's corpus.

Examples include:
- overlap thresholds
- domain mismatch heuristics
- sanitization rules tuned on Enumd materials
- wave-specific operational assumptions

---

## 8. Relationship to ai-governance-framework

The repository should currently be understood as:

> An external domain-specific governance-producing system
> that may later integrate with ai-governance-framework
> through shared observation schema and semantic mapping.

It is **not yet**:

- a submodule of ai-governance-framework
- a framework-generic governance implementation
- proof that its internal governance logic is portable

The clean relationship is:

```text
Enumd
  = domain-specific synthesis + embedded governance producer

ai-governance-framework
  = cross-domain governance framework / canonical interpretation layer
```

---

## 9. Extraction Boundary

If governance primitives are later extracted into ai-governance-framework,
the extraction target should be:

- semantics
- schema
- observation contracts
- artifact meaning
- governance vocabulary

The extraction target should **not** be:

- Enumd thresholds
- Enumd score heuristics
- Enumd sanitization regex sets
- Enumd domain-tuned calibration values
- Enumd wave runner assumptions

In short:

> Extract semantic primitives first, not calibrated implementation logic.

---

## 10. Preconditions for Framework-Level Extraction

This repository should only be treated as a source of framework-generic
governance primitives after the following conditions are satisfied.

### 10.1 Domain independence evidence
At least one non-Enumd domain demonstrates that the same primitive meaning
still holds after domain-specific recalibration.

### 10.2 Execution independence evidence
The governance logic can operate without:
- wave runner assumptions
- slug/node orchestration assumptions
- Enumd-only artifact production flow

### 10.3 Semantic stability evidence
The primitive keeps the same meaning across domains,
not just the same output shape.

### 10.4 Calibration boundary clarity
Thresholds and heuristics can be clearly separated into:
- framework semantics
- domain configuration
- domain implementation

### 10.5 Artifact portability evidence
Canonical observation meaning survives when produced by at least
two different systems, not just Enumd.

Until these conditions are met,
"framework extraction" should remain a hypothesis, not a claim.

---

## 11. Naming Implication

Because the current repository is still domain-coupled,
its name should not imply more scope than it actually has.

That means:

- a domain/system-specific name is acceptable
- a fully generic "governance engine" name is premature
- naming should follow scope, not lead scope

Current naming principle:

> This repository may describe itself as governance-aware,
> but should not describe itself as a general-purpose governance engine.

---

## 12. Immediate Recommendation

Do not rename the repository solely to sound more framework-like.

Do this first:

- keep current naming stable
- document scope explicitly
- integrate Enumd observations into ai-governance-framework through schema mapping
- validate which primitives remain meaningful after crossing that boundary
- only then decide whether any extracted component deserves a framework-level name

---

## 13. Future Split Possibility

A future split becomes justified only if all of the following become true:

- more than one system needs the same governance primitive
- semantic meaning survives outside Enumd
- calibration can be isolated from semantics
- artifact contracts become stable across systems
- extraction reduces duplication instead of creating indirection

If these conditions are not met,
keeping governance embedded in Enumd remains the more honest design.

---

## 14. Summary

This repository currently has a dual nature:

- a domain-specific synthesis pipeline
- an embedded governance mechanism

Those two are currently coupled.

Therefore, the correct scope statement is:

> This repository governs the Enumd synthesis process.
> It may contain reusable governance ideas,
> but it is not yet a general-purpose governance engine.

That distinction must remain explicit until framework-level extraction
has been proven, not merely suggested.

---

| Field | Value |
| :--- | :--- |
| Document version | 2.0 |
| Supersedes | scope.md v1.0 (2026-04-16) |
| Written against | production\_v1 baseline; governance emitter Milestone A1 |
| Last reviewed | 2026-04-16 |
| Review trigger | When any extraction precondition in §10 is proposed as "met" |
