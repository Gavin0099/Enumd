---
title: ' HP SDLC Master Compliance Checklist (2025 Edition)'
domain_tags:
  - code-sign
  - security
task_tags:
  - code-sign
  - build
  - release
  - spec
authority_level: source
is_deprecated: false
category: code-sign
notion_id: 2cb64f6b-c656-8098-959f-feb676081a69
notion_url: >-
  https://www.notion.so/HP-SDLC-Master-Compliance-Checklist-2025-Edition-2cb64f6bc6568098959ffeb676081a69
notion_updated_at: '2026-01-21T09:22:00.000Z'
exported_at: '2026-04-06T13:15:27.420Z'
is_summarized: false
relations: []
---

> ℹ️ 文件資訊
---
## 🏗️ Phase 1: 定義與架構 (Definition & Architecture)
時程目標: First Full-Function Build (首個全功能版本) 完成前
### 3.1 安全需求定義 (Security Requirements)
- [PM/SW] 撰寫 Security Requirements Document
### 3.2 資料清單 (Inventory of Data)
- [SW] 建立 Data Inventory Document
### 3.3 威脅建模 (Threat Modeling)
- [SW/Security] 執行與記錄 Threat Model
---
## 🛡️ Phase 2: 開發與自動化 (Dev & Automation)
時程目標: 持續進行，並於 Code Freeze 前完成最終報告
### 3.4 生成式 AI 規範 (Generative AI)
- [PM] 準備合規證書 (Certificate of Compliance)
### 3.5 靜態掃描 (SAST)
- [SW] 執行 SAST
### 3.6 軟體成分分析 (SCA / SBOM)
- [SW] 執行 SCA
### 3.7 模糊測試 (Fuzz Testing)
- [SW] 執行 Fuzzing
### 3.8 動態掃描 (DAST)
- [SW] 執行 DAST
---
## 🔒 Phase 3: 驗證與簽署 (Verify & Sign)
時程目標: Code Freeze 時
### 3.9 滲透測試 (Penetration Testing)
- [PM] 安排滲透測試
### 3.11 代碼簽章 (Code Signing) - ⚠️ 重點戰場
- [SW/DevOps] 建置簽章流程
- [SW] 實作簽章驗證
---
## 📝 Phase 4: 合規與發布 (Compliance & Release)
時程目標: Release 前夕
### 3.10 日誌與隱私 (Logging Rules) - ⚠️ 紅線區
- [SW] 程式碼檢查
- [PM] 準備合規文件
### 3.12 韌體安全 (Firmware Security)
- (僅適用於 Mutable Firmware，不適用 OS Driver/App)
- [PM] 準備符合 NIST SP 800-193 的合規證書 (PDF, 主管簽名)。
- [SW] 實作 Corruption/Recovery 的事件記錄 (Logging)。
### 3.13 維護與回應 (Maintenance)
- [PM] 建立 Security Response Plan
- [PM] 最終確認
