# PLAN.md
<!-- governance-baseline: overridable -->
<!-- baseline_version: 1.0.0 -->

> **最後更新**: 2026-05-04
> **Owner**: TODO
> **Freshness**: Sprint (7d)

---

## Current Phase

- [x] Phase A : Repo Boundary & Integration Seam Foundation
  - Repo boundary policy established (docs/repo-boundary.md)
  - Commit type taxonomy defined (7 types, mixed PR policy)
  - Source.xml external bundle + manifest created
  - Integration seam P1: event-map.yaml created (governance/event-map.yaml)

## Active Sprint

- [x] P1-1: Create `governance/event-map.yaml` ??event dictionary, decision map, evidence packs, intervention hooks
- [x] P1-2: Create evidence output directory `artifacts/runtime/evidence/` and commit path convention
- [x] P1-3: Run schema_evolution vertical slice ??domain_advisory evidence pack + decision summary, gate_result=pass

## Backlog

- [x] P2-0: Create `knowledge/production_v1/mapping-spec.md` ??evidence-to-governance contract, source of truth, 11 sections
- [x] P2-1: Mapping-spec compliance checker ??`scripts/check-mapping-spec-compliance.py`, enforces INV-1..INV-4, schema-evolution triggers, advisory misuse; full-scan + `--staged` pre-commit mode; exit codes 0/1/2
  - Failure fixtures: `test/fixtures/compliance/inv{1,2,4}_*.ts` ??all 3 violations confirmed caught; baseline clean
  - Stop hook wired: `.claude/settings.json` Stop hook (runs at session end, advisory/soft gate, exits 0)
  - Observation period: run for several sessions; promote to pre-commit or CI only after noise/FP rate confirmed acceptable
  - Promotion approved (2026-05-04); pre-commit hard-gate wiring pending execution choice (.git/hooks/pre-commit or CI gate)
- [x] P2-1.5: Promotion criteria for pre-commit ??`governance/pre-commit-promotion-criteria.md`
  - Criteria: ?? qualifying sessions (non-empty staged), 0 FPs on INV-1/INV-2/INV-4, actionable messages, no recurring noise
  - 5 demotion/delay triggers (DT-1..DT-5) with reset conditions
  - Observation log (禮6) and promotion decision record (禮7) ??closeable stage gate
  - **Current**: 3 / 3 qualifying sessions
- P2-2: Pre-release promotion check ??script that walks release_promotion_evidence and blocks if pending gates
- P3: Automated evidence pack generation for schema_evolution (git-diff ??pre-filled JSON template)
- P3: `post_pipeline_evidence_summary` hook implementation for pipeline: commits

## Open Questions (from P1-3 vertical slice)

- ~~OQ-1: nodeSignals downstream consumers~~ **CLOSED 2026-04-21**
  - Finding: zero active consumers. `ai-governance-framework` has no code reading `governance_report.json`.
  - Code explicitly guards against misuse: `decision_distance: "advisory_only"` per entry; section comment "do not represent framework enforcement decisions."
  - Classification stands: `schema_addition / reviewer_routing_surface_only` (routing surface exists but has no live consumer).
  - Reclassification trigger: if framework adds code that reads `governance_report.json.advisory.node_signals` for promotion/filtering/escalation ??reassess.

- ~~OQ-2: instrumentation_version contract status~~ **CLOSED 2026-04-21 ??Decision: B (versioned contract marker)**
  - Two separate versioned markers: `audit.json?omain_advisory.instrumentation_version: "1.0"` (field-level) and `governance_report.json.instrumentation_version: "slice1-v1"` (report-level).
  - Both are versioned contract markers. A computation logic change (threshold, signal set, scoring rule) that changes meaning without changing field names MUST bump version AND trigger schema_evolution event.
  - Action taken: added both to schema_evolution trigger criteria in `governance/event-map.yaml`.

- ~~OQ-3: mapping-spec.md missing~~ **CLOSED 2026-04-21 ??P2-0 complete**
  - Created `knowledge/production_v1/mapping-spec.md` as **source of truth** (not README).
  - Authority declaration: spec wins over code. Code must conform.
  - Defines: advisory_only vs decision_consumable vocabulary (禮2), governance_report schema (禮3), advisory contract with invariants (禮4, 禮9), enforcement vocabulary boundary (禮5), domain_advisory field contract (禮6), versioned contract markers (禮8), schema_evolution triggers (禮10).
  - INV-1 through INV-4 codify the invariants CI hook (P2-1) will validate against.

## Decision Log

- 2026-04-21: Repo boundary?湔祥摰??Ⅱ蝡?撅文??ｇ??舫?撱箄?蝞撓?箇宏??repo??憪?皞翰?抒宏?喳???archive嚗xternal bundle + manifest + sha256嚗霅?箄?瘝餌??楚? repo?ommit type 撌脣?蝢?governance / authority-upgrade / pipeline / knowledge / schema-evolution 鈭車嚗?甇Ｘ毽?底閬?[docs/repo-boundary.md](docs/repo-boundary.md)??

- 2026-04-21: `ai-governance-framework` submodule pointer drift ??**?思??豢嚗ending authority-upgrade candidate嚗?*??
  - ?暹?嚗ointer ??drift嚗numd ?桀??甇?虜嚗撌脩 consuming-side incompatibility??
  - 銝?嗅????⊥?蝣?trigger嚗迨????pointer ?芣 completion pressure嚗???architecture reason?olicy ?遣蝡??亦??駁??????曹?頝??渲死璅∪?嚗停蝑 policy ?芣鋆ˇ??
  - ??璇辣嚗遙銝??嚗?
    1. Enumd consuming behavior ??upstream authority 隤儔?箇銝???
    2. Upstream 靽桀 Enumd ?曉?Ⅱ?閬?瘝餌?隤儔??fix
    3. Reviewer 閬?撠???upstream authority baseline
    4. Submodule drift 憭批?⊥????脩迂? repo 瘨祥??芸?authority baseline??
  - 銝活閰摯??韏?`authority-upgrade:` review gate嚗ocs/repo-boundary.md嚗?

## Known Risks

<!-- Optional: track identified risks and mitigation status -->

