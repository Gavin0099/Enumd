# PLAN.md
<!-- governance-baseline: overridable -->
<!-- baseline_version: 1.0.0 -->

> **最後更新**: 2026-04-21
> **Owner**: TODO
> **Freshness**: Sprint (7d)

---

## Current Phase

<!-- Required: fill in current phase ID and description -->

- [ ] Phase A : Initial Setup

## Active Sprint

<!-- Required: list current sprint tasks -->

- [ ] (no tasks yet)

## Backlog

<!-- Required: prioritized items not yet started -->

- P1: (none)

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
