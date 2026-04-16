報告書：USB Hub Firmware（8051 / Keil C51）AI 開發前先期確認 Checklist

## 1. 專案事實 / 不可猜測輸入 (Project Truth Layer)
1. [`USB_HUB_FW_CHECKLIST.md`](./USB_HUB_FW_CHECKLIST.md)：列出專案中不可猜測的輸入事實，作為後續設計的基礎。
2. [`TOPOLOGY.md`](./TOPOLOGY.md)：記錄多晶片拓樸、Port Mapping 和 Access Path 等關鍵架構資訊。
3. [`HUB_PROFILE_SCHEMA.md`](./HUB_PROFILE_SCHEMA.md)：定義 Host-visible Profile 和 Schema 契約，確保與上位機介面的一致性。

## 2. 架構邊界 (Architecture Boundary Layer)
1. [`USB_HUB_ARCHITECTURE.md`](./USB_HUB_ARCHITECTURE.md)：描述整體架構邊界，包括 Flash Safety 和 Protocol Rules 等關鍵設計。
2. [`AGENTS.md`](./AGENTS.md)：列出 AI 行為的限制條件、No-Assumption 原則和 Guardrails，確保系統安全性。

## 3. 受控標準參考 (Controlled Standards Reference Layer)
1. [`USB_IF_INTEGRATION_PLAN.md`](./USB_IF_INTEGRATION_PLAN.md)：制定 USB-IF 導入策略，包括優先順序和衝突處理機制。
2. [`USB_HUB_CLASS_REQUESTS_REF.md`](./USB_HUB_CLASS_REQUESTS_REF.md)：提供 Hub Class Requests 的受控參考。
3. [`USB_HUB_PORT_STATUS_BITS_REF.md`](./USB_HUB_PORT_STATUS_BITS_REF.md)：提供 Port Status 和 Change Bits 的受控參考。

## 4. 執行與審查 (Execution & Review Layer)
1. [`WORKFLOW.md`](./WORKFLOW.md)：定義變更流程、Gate 機制和 Review Path。
2. [`TRACEABILITY_MATRIX.md`](./TRACEABILITY_MATRIX.md)：建立從 Fact 到 Architecture、Agent 和 Validation 的可追溯性矩陣。
3. PR / MR Templates：提供 Review Gate 和 Hard Stops 的模板。

## 5. 證據與記憶 (Evidence & Memory Layer)
1. `Validation Evidence`：包括 Map、Overlay、Enumeration 和 Host Trace 等驗證證據。
2. [`memory/02_project_facts.md`](./memory/02_project_facts.md)：記錄已確認的專案事實。
3. [`memory/03_decisions.md`](./memory/03_decisions.md)：記錄架構決策和衝突升級結果。
4. [`memory/04_validation_log.md`](./memory/04_validation_log.md)：記錄驗證過程和風險證據。

[未有直接 Source 錨點，待確認] 1. 專案事實層 (L1) 為後續設計的基礎，包括不可猜測的輸入、拓樸和介面契約。
2. 架構邊界層 (L2) 根據 L1 的事實，定義整體架構設計，包括 Flash Safety 和 Protocol Rules。
3. 受控標準層 (L3) 提供 USB-IF 導入策略和相關標準的受控參考。
4. 執行與審查層 (L4) 建立變更流程、可追溯性和 Review Gate，確保設計品質。
[未有直接 Source 錨點，待確認] 5. 證據與記憶層 (L5) 記錄驗證過程和設計決策，為後續維護提供依據。

整體架構遵循「從事實到驗證」的設計原則，確保 USB Hub Firmware 的安全性和可靠性。