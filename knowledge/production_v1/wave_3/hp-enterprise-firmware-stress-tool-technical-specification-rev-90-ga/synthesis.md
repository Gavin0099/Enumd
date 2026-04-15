
# HP Enterprise Firmware Stress Tool - Technical Specification (Rev 9.0 GA)

## 1. 核心架構原則 (Core Architecture Principles)
1. **Process Control (進程控制)**: 嚴禁使用 `subprocess.run`。必須使用 `subprocess.Popen` 以支援即時的中止 (Abort) 與漸進式殺除 (Kill Escalation)。[`subprocess.Popen`](https://docs.python.org/3/library/subprocess.html#subprocess.Popen)
1. **Result State Machine (結果狀態機)**: 結果不再是二元對立，固定為 5 種狀態：PASS, FAIL, WARNING, TIMEOUT, UNKNOWN。
1. **Session Verdict (會話結算)**: 測試結束後，必須產出單一的 Session 級別判定 (Pass/Fail/Warning)，以供 CI/CD 或驗收報告使用。
1. **Contradiction Handling (矛盾處理)**: 當 Exit Code 與 Log 內容矛盾時，採用「防禦性悲觀」策略（視為 WARNING 或 FAIL）。
1. **Evidence Retention (證據保全)**: 失敗、超時或狀態不明的 Log 檔案 絕對禁止刪除。

## 2. 模組詳細規格 (Module Specifications)
### 2.1 Log Parser & Result Logic (logic/log_parser.py)
目標: 將非結構化的 Log 文本轉換為結構化的測試結果。
- **Result States (Enum)**: 定義了 5 種測試結果狀態：PASS、FAIL、WARNING、TIMEOUT 和 UNKNOWN。
- **Regex Patterns (Configurable)**: 使用正則表達式來解析 Log 內容並提取測試結果。
- **Strict Mode Policy**: 當 Exit Code 與 Log 內容矛盾時，採用「防禦性悲觀」策略（視為 WARNING 或 FAIL）。

### 2.2 Tool Adapter (logic/tool_adapter.py)
目標: 封裝 OCI Tool 的異質性，提供統一的執行與生命週期管理。
- **Process Execution Model**: 使用 `subprocess.Popen` 執行 OCI Tool，並支援即時中止 (Abort) 和漸進式殺除 (Kill Escalation)。[`subprocess.Popen`](https://docs.python.org/3/library/subprocess.html#subprocess.Popen)
- **Kill Escalation Strategy (當觸發 Abort 或 Timeout 時)**: 實現了一個漸進式的殺進程策略，先嘗試 `terminate()`，若失敗則使用 `kill()`。
- **Liability Disclaimer (責任邊界定義)**: 定義了 Tool Adapter 的責任範圍，例如不負責 OCI Tool 本身的錯誤。
- **Contradiction Logic (矛盾升級規則)**: 當 Exit Code 與 Log 內容矛盾時，採用「防禦性悲觀」策略（視為 WARNING 或 FAIL）。
- **Command Construction**: 根據設定的參數組裝 OCI Tool 的執行命令。
- **Log Retention Policy**: 失敗、超時或狀態不明的 Log 檔案 絕對禁止刪除。

### 2.3 Platform Manager (utils/platform_manager.py)
目標: 處理 OS 差異，確保測試環境合規。
- **Linux Sleep Inhibit Strategy**: 在 Linux 平台上，使用 `dbus-send` 命令來抑制系統休眠。[`dbus-send`](https://www.freedesktop.org/wiki/Software/dbus/)

### 2.4 Harness Logic & Features (logic/test_runner.py)
目標: 處理測試流程控制、干擾模擬與結果結算。
- **Session Verdict Logic (Session 結算規則)**: 根據各個測試步驟的結果，計算出整個 Session 的最終判定 (Pass/Fail/Warning)。
- **Display Interference (Cross-Platform Strategy)**: 實現了跨平台的顯示干擾模擬策略。
- **Timer Accuracy**: 確保計時器的準確性。

### 2.5 Data Persistence (logic/logger.py)
目標: 確保所有測試數據可追溯、可除錯。
- **JSONL Stream (logs/session_{id}.jsonl)**: 以 JSONL 格式記錄每個測試步驟的詳細日誌。
- **Session Summary (logs/session_{id}_summary.json)**: 記錄整個 Session 的彙總結果。
- **Sanitization (脫敏)**: 在記錄日誌時，會對敏感資訊進行脫敏處理。

### 2.6 Version Detection (logic/version_detector.py)
目標: 可靠地抓取 OCI Tool 版本。
- **Configurable Search Paths**: 支援在多個路徑中搜索 OCI Tool 的可執行檔。
- **Method**: 使用 `subprocess.Popen` 執行 OCI Tool 並解析其輸出來獲取版本資訊。[`subprocess.Popen`](https://docs.python.org/3/library/subprocess.html#subprocess.Popen)

### 2.7 底層工具功能需求與映射 (OCI Tool Functional Profile)
目標: 定義 Harness 如何呼叫底層 OCI Tool (FirmwareInstaller.exe)。

#### A. 核心指令映射表 (Command Mapping)
定義了 Harness 如何組裝 OCI Tool 的執行命令。

#### B. OCI Tool 行為規範 (Behavioral Requirements)
1. **Exit Code 可靠性**: 嚴重錯誤時必須回傳非 0。若回傳 0 但 Log Error，Harness 視為 FAIL。
1. **Log 完整性**: Log 內容必須包含明確的 "Success" 或 "Error" 關鍵字。
1. **並發鎖定**: OCI Tool 應處理單一實例鎖定。Harness 也會實作 Thread Lock。

## 3. UI 介面與控制項詳細定義 (UI Controls & Layout Definition)
### 3.1 介面佈局概覽 (Layout Overview)
1. **左側資訊欄 (Side Panel)**: 顯示版本資訊。
1. **右側主操作區 (Main Content)**: 包含韌體來源、測試場景、執行參數。
1. **底部狀態區 (Status Area)**: 顯示當前進度與回傳碼。

### 3.2 詳細控制項規格 (Control Specifications)
#### A. OCI Firmware Package Folder (頂部區域)
用於設定 A/B Test 的韌體來源。

#### B. Tool Version (左側面板)
[未有直接 Source 錨點，待確認] 顯示相關工具的版本資訊，用於環境確認。

#### C. Execution Control (右上方)

#### D. Test Scenarios (中間左側 - 核心測試選項)

#### E. Time Accuracy Check Setting (中間下方 - 進階設定)
預設隱藏，點擊 "..." 後顯示。

#### F. Feedback Area (右下角)

## 4. 給 Antigravity (AI Agent) 的執行指令 (Prompt)
請複製以下方塊中的內容，這是針對 AI 優化的指令集：

> "請依照 Technical Specification (Rev 9.0 GA) 建立一個 PySide6 專案。
Connected fw update stress:
Disconnected fw update stress: