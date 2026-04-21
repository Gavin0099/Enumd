# PLAN.md
<!-- governance-baseline: overridable -->
<!-- baseline_version: 1.0.0 -->

> **最後更新**: 2026-04-21
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

- [x] P1-1: Create `governance/event-map.yaml` — event dictionary, decision map, evidence packs, intervention hooks
- [x] P1-2: Create evidence output directory `artifacts/runtime/evidence/` and commit path convention
- [x] P1-3: Run schema_evolution vertical slice — domain_advisory evidence pack + decision summary, gate_result=pass

## Backlog

- P2: CI change classification hook — pre-commit script that reads event-map.yaml and classifies staged diff
- P2: Pre-release promotion check — script that walks release_promotion_evidence and blocks if pending gates
- P3: Automated evidence pack generation for schema_evolution (git-diff → pre-filled JSON template)
- P3: `post_pipeline_evidence_summary` hook implementation for pipeline: commits

## Open Questions (from P1-3 vertical slice)

- OQ-1: Do any consumers of `governance_report.json` `nodeSignals` use `risk_level` for automated routing? (currently: no evidence — not yet exhaustively verified against all framework consumers)
- OQ-2: Is `instrumentation_version: "1.0"` a versioned contract interface? If computation changes in a future pipeline update, does this need a version bump? (recommendation: yes — treat as versioned contract surface; add to schema_evolution trigger criteria)

## Decision Log

- 2026-04-21: Repo boundary整治完成。確立三層分離：可重建計算輸出移出 repo、原始來源快照移至外部 archive（external bundle + manifest + sha256）、知識產出與治理痕跡留在 repo。commit type 已定義 governance / authority-upgrade / pipeline / knowledge / schema-evolution 五種，禁止混送。詳見 [docs/repo-boundary.md](docs/repo-boundary.md)。

- 2026-04-21: `ai-governance-framework` submodule pointer drift — **暫不吸收（pending authority-upgrade candidate）**。
  - 現況：pointer 有 drift，Enumd 目前功能正常，無已知 consuming-side incompatibility。
  - 不吸收原因：無明確 trigger；此時跟進 pointer 只是 completion pressure，不是 architecture reason。policy 剛建立，若立刻違反「沒有理由不跟」的直覺模式，就等於 policy 只是裝飾。
  - 重開條件（任一成立）：
    1. Enumd consuming behavior 與 upstream authority 語義出現不一致
    2. Upstream 修到 Enumd 現在明確需要的治理語義或 fix
    3. Reviewer 要求對齊某個 upstream authority baseline
    4. Submodule drift 大到無法合理聲稱「本 repo 消費的是哪個 authority baseline」
  - 下次評估時：走 `authority-upgrade:` review gate（docs/repo-boundary.md）

## Known Risks

<!-- Optional: track identified risks and mitigation status -->
