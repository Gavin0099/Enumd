---
title: HP Enterprise Firmware Stress Tool - Technical Specification (Rev 9.0 GA)
category: general
notion_id: 2da64f6b-c656-80b0-84e0-d0635256c4a0
notion_url: >-
  https://www.notion.so/HP-Enterprise-Firmware-Stress-Tool-Technical-Specification-Rev-9-0-GA-2da64f6bc65680b084e0d0635256c4a0
notion_updated_at: FORCE_REFRESH
exported_at: '2026-04-06T11:23:37.005Z'
is_summarized: false
---

Project Name: Cross-Platform Display Firmware Update Stress Harness
Version: Rev 9.0 (Gold / General Availability)
Standard: HP Display Firmware Update Spec (Item 1.4 & 1.2)
Core Philosophy: Fault Tolerant, Observable, Reproducible, Liability-Aware.
---
## 1. 核心架構原則 (Core Architecture Principles)
1. Process Control (進程控制): 嚴禁使用 subprocess.run。必須使用 subprocess.Popen 以支援即時的中止 (Abort) 與漸進式殺除 (Kill Escalation)。
1. Result State Machine (結果狀態機): 結果不再是二元對立，固定為 5 種狀態：PASS, FAIL, WARNING, TIMEOUT, UNKNOWN。
1. Session Verdict (會話結算): 測試結束後，必須產出單一的 Session 級別判定 (Pass/Fail/Warning)，以供 CI/CD 或驗收報告使用。
1. Contradiction Handling (矛盾處理): 當 Exit Code 與 Log 內容矛盾時，採用「防禦性悲觀」策略（視為 WARNING 或 FAIL）。
1. Evidence Retention (證據保全): 失敗、超時或狀態不明的 Log 檔案 絕對禁止刪除。
---
## 2. 模組詳細規格 (Module Specifications)
### 2.1 Log Parser & Result Logic (logic/log_parser.py)
目標: 將非結構化的 Log 文本轉換為結構化的測試結果。
- Result States (Enum):
- Regex Patterns (Configurable):
- Strict Mode Policy:
---
### 2.2 Tool Adapter (logic/tool_adapter.py)
目標: 封裝 OCI Tool 的異質性，提供統一的執行與生命週期管理。
- Process Execution Model:
- Kill Escalation Strategy (當觸發 Abort 或 Timeout 時):
- Liability Disclaimer (責任邊界定義):
- Contradiction Logic (矛盾升級規則):
執行完畢後，比對 exit_code 與 log_parse_result：
- Command Construction:
- Log Retention Policy:
---
### 2.3 Platform Manager (utils/platform_manager.py)
目標: 處理 OS 差異，確保測試環境合規。
- Linux Sleep Inhibit Strategy:
---
### 2.4 Harness Logic & Features (logic/test_runner.py)
目標: 處理測試流程控制、干擾模擬與結果結算。
- Session Verdict Logic (Session 結算規則):
- Display Interference (Cross-Platform Strategy):
- Timer Accuracy:
---
### 2.5 Data Persistence (logic/logger.py)
目標: 確保所有測試數據可追溯、可除錯。
- JSONL Stream (logs/session_{id}.jsonl):
- Session Summary (logs/session_{id}_summary.json):
- Sanitization (脫敏):
---
### 2.6 Version Detection (logic/version_detector.py)
目標: 可靠地抓取 OCI Tool 版本。
- Configurable Search Paths:
- Method:
---
### 2.7 底層工具功能需求與映射 (OCI Tool Functional Profile)
目標: 定義 Harness 如何呼叫底層 OCI Tool (FirmwareInstaller.exe)。
### A. 核心指令映射表 (Command Mapping)
### B. OCI Tool 行為規範 (Behavioral Requirements)
1. Exit Code 可靠性: 嚴重錯誤時必須回傳非 0。若回傳 0 但 Log Error，Harness 視為 FAIL。
1. Log 完整性: Log 內容必須包含明確的 "Success" 或 "Error" 關鍵字。
1. 並發鎖定: OCI Tool 應處理單一實例鎖定。Harness 也會實作 Thread Lock。
---
## 3. UI 介面與控制項詳細定義 (UI Controls & Layout Definition)
本章節定義 GUI 的具體佈局與功能映射，開發者必須嚴格參照提供的下圖 進行刻畫。
### 3.1 介面佈局概覽 (Layout Overview)
視窗主要分為三個區域：
1. 左側資訊欄 (Side Panel): 顯示版本資訊。
1. 右側主操作區 (Main Content): 包含韌體來源、測試場景、執行參數。
1. 底部狀態區 (Status Area): 顯示當前進度與回傳碼。
---
### 3.2 詳細控制項規格 (Control Specifications)
### A. OCI Firmware Package Folder (頂部區域)
用於設定 A/B Test 的韌體來源。
### B. Tool Version (左側面板)
顯示相關工具的版本資訊，用於環境確認。
### C. Execution Control (右上方)
控制測試的強度與頻率。
### D. Test Scenarios (中間左側 - 核心測試選項)
勾選以啟用特定的壓力測試邏輯。
### E. Time Accuracy Check Setting (中間下方 - 進階設定)
預設隱藏，點擊 "..." 後顯示。
### F. Feedback Area (右下角)
即時顯示測試狀態。
---
## 4. 給 Antigravity (AI Agent) 的執行指令 (Prompt)
請複製以下方塊中的內容，這是針對 AI 優化的指令集：
> "請依照 Technical Specification (Rev 9.0 GA) 建立一個 PySide6 專案。
Connected fw update stress:
Disconnected fw update stress:
UI的部分:
