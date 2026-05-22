# PLAN.md
<!-- governance-baseline: overridable -->
<!-- baseline_version: 1.0.0 -->

> **最後更新**: 2026-05-22
> **Owner**: Gavin
> **Freshness**: Sprint (7d)

---

## Current Phase

- [x] Phase A : Repo Boundary & Integration Seam Foundation
  - Repo boundary policy established (docs/repo-boundary.md)
  - Commit type taxonomy defined (7 types, mixed PR policy)
  - Source.xml external bundle + manifest created
  - Integration seam P1: event-map.yaml created (governance/event-map.yaml)

- [x] Phase B : ChatGPT Lane Pilot (run-01 ~ run-15) — **COMPLETE 2026-05-11**
  - 15 runs, `closeout_valid_ratio: 1.00`, `mapped_high_ratio: 1.00`
  - All completion contracts satisfied; no scope violations; no claim overreach
  - Ledger: `docs/status/chatgpt-lane-run-ledger.md`
  - Summary: `docs/status/chatgpt-lane-pilot-summary.md`

- [x] Phase C : Governance Onboarding + Route B Abstraction — **COMPLETE 2026-05-22**
  - [x] Governance onboarding complete (2026-05-22): hooks installed, contract.yaml updated, project facts artifact synced
  - [x] Route B: migrate `scripts/export.ts` to use NotionAdapter end-to-end (2026-05-22)
    - NotionAdapter.getPageContentWithSignal() added; direct lib/notion import removed from export.ts
    - TypeScript 0 errors; signal collection preserved through adapter layer

- [ ] Phase D : Gate-C Close + Phase D Reviewer Closeout — **PENDING**
  - [x] Gate-C final outcome summary (2026-05-23): `docs/status/gate-c-final-outcome-summary.md`; claim gate `cross-agent validated (execution governance scope)` satisfied (r4+r5)
  - [ ] Phase D Reviewer Closeout: `artifacts/governance/phase-d-reviewer-closeout.json` — **human reviewer required** (NC-1; see governance/PHASE_D_CLOSE_AUTHORITY.md)

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
  - Promotion approved (2026-05-04); pre-commit hard-gate wired to `.git/hooks/pre-commit` (2026-05-16)
- [x] P2-1.5: Promotion criteria for pre-commit ??`governance/pre-commit-promotion-criteria.md`
  - Criteria: ?? qualifying sessions (non-empty staged), 0 FPs on INV-1/INV-2/INV-4, actionable messages, no recurring noise
  - 5 demotion/delay triggers (DT-1..DT-5) with reset conditions
  - Observation log (禮6) and promotion decision record (禮7) ??closeable stage gate
  - **Current**: 3 / 3 qualifying sessions
- [x] P2-2: Pre-release promotion check ??`scripts/check-release-promotion-gate.py` implemented; blocks on pending gates or missing release_promotion_evidence
- [x] P3-1: Automated evidence pack generation for schema_evolution (`scripts/generate-schema-evolution-evidence.py`; git-diff ??pre-filled JSON template)
- [x] P3-2: `post_pipeline_evidence_summary` hook implementation for pipeline commits (`scripts/post-pipeline-evidence-summary.py`)

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

- 2026-04-21: Repo boundary 整治完成。確立三層分離：可重建計算輸出移出 repo、原始來源快照移至外部 archive（external bundle + manifest + sha256）、知識產出與治理痕跡留在 repo。commit type 已定義 governance / authority-upgrade / pipeline / knowledge / schema-evolution 五種，禁止混送。詳見 [docs/repo-boundary.md](docs/repo-boundary.md)。

- 2026-04-21: `ai-governance-framework` submodule pointer drift — **暫不吸收（pending authority-upgrade candidate）**。
  - 現況：pointer 有 drift，Enumd 當時功能正常，無已知 consuming-side incompatibility。
  - 不吸收原因：無明確 trigger；若僅因 completion pressure 跟進 pointer，缺乏 architecture reason，會弱化既有 policy。
  - 重開條件（任一成立）：
    1. Enumd consuming behavior 與 upstream authority 語義出現不一致
    2. Upstream 修到 Enumd 當下明確需要的治理語義或 fix
    3. Reviewer 要求對齊某個 upstream authority baseline
    4. Submodule drift 大到無法合理聲稱本 repo 目前消費的是哪個 authority baseline
  - 下次評估時：走 `authority-upgrade:` review gate（見 `docs/repo-boundary.md`）。

- 2026-05-16: `ai-governance-framework` submodule 升版吸收（`598267d`）— **已執行**。
  - Trigger：R49x consolidation + R50 opening（upstream 有 Enumd 明確需要的 governance baseline 更新）。
  - 條件 2 成立：upstream 修到 Enumd 當下需要的治理語義（reviewer substitution scaffold、Layer 0/1 schema）。
  - commit: `dfcb7b3`

- 2026-05-22: governance onboarding 完成（contract.yaml risk_tier + framework_repo + adopted_release 宣告；pre-commit + pre-push hooks 安裝；project facts artifact 生成；runtime-smoke all-pass）。submodule bumped to `d082a7e`。reviewer-handoff: `reviewer_handoff_governance_onboarding_2026-05-22.md`。

## Known Risks

- `governance_drift_clean=False` (accepted advisory): `runtime_hooks/core/post_task_check.py` in the framework submodule has unrecognized return keys (`by_consumer`, `by_field`, `by_type`, `contract_version`, `high_frequency_misuse_triggers_enforcement`, `notice`, `total_violations`, `visibility_only`) that have not passed the Expansion Admission Gate. This is a framework-internal issue — Enumd cannot pass the gate on behalf of the framework. Accepted as advisory because Enumd does not consume these keys as decision inputs. Revisit if the framework upgrades and resolves this upstream.
- ~~`framework_version_known=False`~~ **RESOLVED 2026-05-22**: `governance/framework.lock.json` created, `framework_source_canonical=True`.

