# Reviewer Workbook v2 (Wave 1 Audit)

## 📦 Batch Integrity Contract

```json
{
  "batch_id": "batch_2026-04-14T09-16-32-301Z",
  "wave_id": 1,
  "git_commit_hash": "a133847ebe9e003480ec04f7ee023b5c0b6a58e6",
  "graph_hash": "ea19050c31e597b7672105cc89330ef8",
  "synthesis_code_hash": "474e353e487e9f110f475bf131949e64",
  "prompt_version": "v1.5-controlled-context",
  "model_name": "claude-3-haiku-20240307",
  "generated_at": "2026-04-14T09:16:32.516Z"
}
```

## 🔍 Stratified 10-Node Audit Samples

---

### Node: 研發投扺專案資料列印流程

[Synthesis](研發投扺專案資料列印流程/synthesis.md) | [Audit](研發投扺專案資料列印流程/audit.json) | [Source XML](研發投扺專案資料列印流程/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| 開啟工作週報的步驟如下: | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 開啟工作週報，選擇關鍵字搜尋 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 輸入有參與的專案代號進行查詢，注意不要輸入年度，否則會得到不完整的資料 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 勾選所有 2020 年的週報，然後按下匯出網頁 | L8: 1. 勾選所有2020的週報，按下匯出網頁 | Derived | MID | ✅ PASSED |
| 系統會匯出所有 2020 年關於此專案的週報，接下來即可直接列印 | L8: 1. 勾選所有2020的週報，按下匯出網頁 | Derived | MID | ✅ PASSED |
| 生成 ECDSA 金鑰並進行簽章 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 告知如何清除 Camera 的方式 - 驗證失敗時需要清除 | L17: 1. 告知如何Erase Camera 的方式 —> verify fail 要 erase 掉 | Derived | MID | ✅ PASSED |
| 告知如何讀取 Camera 資料 - Hub 安全模型必須能讀取到更新的資料才能計算雜湊值 | L13: <related id="camera-透過我們驗證-code-sign" title="Ca... | Derived | MID | ✅ PASSED |
| 可以改成告知我們所有的更新流程以及相對應的文件，讓我們控制整個更新過程 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 下圖為 Hub Code Sign 驗證流程，驗證 code sign 應該可以由工具控制，韌體應該不需要做什麼改... | L20: 1. 下圖為Hub Code Sign 驗證 flow ，驗證code sign 應該Tool... | Explicit | LOW | ✅ PASSED |
| - **Decision Summary**: | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - Verdict: CHANGES_REQUESTED | L27: Verdict: CHANGES_REQUESTED | Derived | MID | ✅ PASSED |
| - Risk Level: High | L28: Risk Level: High | Derived | MID | ✅ PASSED |
| - **Governance Audit**: | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 連線工作流程使用 detach 且無生命週期收斂，違反可預測關閉原則 | L31: - Architecture: 不通過。連線工作流程使用 detach 且無生命週期收斂，違反... | Derived | MID | ✅ PASSED |
| - 原生安全性: 不通過 | L31: - Architecture: 不通過。連線工作流程使用 detach 且無生命週期收斂，違反... | Derived | MID | ✅ PASSED |
| 檔案大小與外部命令執行缺乏邊界控制，存在資源與執行風險 | L32: - Native Safety: 不通過。檔案大小與外部命令執行缺乏邊界控制，存在資源與執行風險。 | Derived | MID | ✅ PASSED |
| - 測試完整性: 不通過 | L31: - Architecture: 不通過。連線工作流程使用 detach 且無生命週期收斂，違反... | Derived | MID | ✅ PASSED |
| 看不到針對失敗路徑（超大輸入、shutdown race、協定錯位）的測試證據 | L33: - Test Integrity: 不通過。看不到針對失敗路徑（超大輸入、shutdown r... | Derived | MID | ✅ PASSED |
| - **Technical Findings**: | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| [BLOCKING] Detached worker thread may outlive owner (this) | L35: 1. [BLOCKING] Detached worker thread may outliv... | Explicit | LOW | ✅ PASSED |
| [BLOCKING] Unbounded memory allocation from peer-provided... | L36: 1. [BLOCKING] Unbounded memory allocation from ... | Explicit | LOW | ✅ PASSED |
| [WARNING] Protocol error opcode mismatch in public-key stage | L37: 1. [WARNING] Protocol error opcode mismatch in ... | Explicit | LOW | ✅ PASSED |
| [WARNING] system() execution path with externally-derived... | L38: 1. [WARNING] system() execution path with exter... | Explicit | LOW | ✅ PASSED |
| [WARNING] Timeout conversion bug in select() | L39: 1. [WARNING] Timeout conversion bug in select() | Explicit | LOW | ✅ PASSED |
| [SUGGESTION] Hardcoded token password in source | L40: 1. [SUGGESTION] Hardcoded token password in source | Explicit | LOW | ✅ PASSED |
| - **Knowledge Base Alignment**: | L41: ### Knowledge Base Alignment | Derived | MID | ✅ PASSED |
| - 檢查了 03_knowledge_base | L42: - Checked 4 Anti-Patterns/Pitfalls in 03_knowle... | Derived | MID | ✅ PASSED |
| md 中的 4 個 Anti-Patterns/Pitfalls | L42: - Checked 4 Anti-Patterns/Pitfalls in 03_knowle... | Derived | MID | ✅ PASSED |
| - 結果: 發現衝突（特別是 system()/sub-process hang 與協定失配/卡住風險已命中） | L43: - Result: Conflict Found (特別是 system()/sub-proc... | Derived | MID | ✅ PASSED |
| - **Decision Summary**: | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - Verdict: CHANGES_REQUESTED | L27: Verdict: CHANGES_REQUESTED | Derived | MID | ✅ PASSED |
| - Risk Level: High | L28: Risk Level: High | Derived | MID | ✅ PASSED |
| - **Governance Audit**: | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - 架構: Release 組態已移除 OFFLINE_TEST，這點較前版改善；但連線工作執行緒仍採 detac... | L50: - Architecture: Release 組態已移除 OFFLINE_TEST，這點較前... | Explicit | LOW | ✅ PASSED |
| - 原生安全性: 未發現新的 pointer free 錯誤；但外部命令執行與檔案大小處理缺乏邊界，仍有高風險 | L51: - Native Safety: 未發現新的 pointer free 錯誤；但外部命令執行與... | Explicit | LOW | ✅ PASSED |
| - 測試完整性: 看不到對失敗路徑（超大 file size、thread shutdown race、SQL 注... | L52: - Test Integrity: 看不到對失敗路徑（超大 file size、thread ... | Explicit | LOW | ✅ PASSED |
| - **Technical Findings**: | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| [BLOCKING] SQL injection 風險（登入授權查詢） | L54: 1. [BLOCKING] SQL injection 風險（登入授權查詢） | Explicit | LOW | ✅ PASSED |
| [WARNING] detach 執行緒捕獲 this，存在 shutdown race / UAF 風險 | L55: 1. [WARNING] detach 執行緒捕獲 this，存在 shutdown race... | Explicit | LOW | ✅ PASSED |
| [WARNING] Dongle 管理同樣使用 detach，生命週期不可驗證 | L56: 1. [WARNING] Dongle 管理同樣使用 detach，生命週期不可驗證 | Explicit | LOW | ✅ PASSED |
| [WARNING] 檔案大小由對端提供且未設上限，可能 OOM/卡死 | L57: 1. [WARNING] 檔案大小由對端提供且未設上限，可能 OOM/卡死 | Derived | MID | ✅ PASSED |
| [WARNING] 對 Dongle 端取檔同樣無大小上限 | L58: 1. [WARNING] 對 Dongle 端取檔同樣無大小上限 | Explicit | LOW | ✅ PASSED |
| [WARNING] DB 密碼硬編碼在程式碼 | L59: 1. [WARNING] DB 密碼硬編碼在程式碼 | Derived | MID | ✅ PASSED |
| - **Knowledge Base Alignment**: | L41: ### Knowledge Base Alignment | Derived | MID | ✅ PASSED |
| - 檢查了 03_knowledge_base | L42: - Checked 4 Anti-Patterns/Pitfalls in 03_knowle... | Derived | MID | ✅ PASSED |
| md 中的 4 個 Anti-Patterns/Pitfalls（含 system()/子程序卡死、流程卡住類型） | L61: - Checked 4 Anti-Patterns/Pitfalls in 03_knowle... | Derived | MID | ✅ PASSED |
| - 結果: 發現衝突（當前風險與既有 anti-pattern 高度重疊） | L62: - Result: Conflict Found（當前風險與既有 anti-pattern 高... | Derived | MID | ✅ PASSED |
| - Vendor Command 第二碼 | L69: - Vendor Command 第二碼 | Explicit | LOW | ✅ PASSED |
| - HID 預設只使用 2 | L70: - HID 預設只使用 2.0 | Explicit | LOW | ✅ PASSED |
| - 驗證工具位置: file:///\\genesyslogic | L72: - file:///\\genesyslogic.com.tw\GenesysData\SW_... | Derived | MID | ✅ PASSED |
| tw\GenesysData\SW_Release_New\Hub\HID\Tool | L72: - file:///\\genesyslogic.com.tw\GenesysData\SW_... | Derived | MID | ✅ PASSED |
| - Release Tool | L72: - file:///\\genesyslogic.com.tw\GenesysData\SW_... | Derived | MID | ✅ PASSED |
| - 請 SE 確認各 OS 有沒有自動喚醒 device | L76: - 請SE確認各OS有沒有自動喚醒 device。 | Explicit | LOW | ✅ PASSED |
| - HID 驗證 USB LOGO 問題 | L77: - HID 驗證 USB LOGO 問題。 | Explicit | LOW | ✅ PASSED |
| - 整理 chip function list，用表格列出各 chip 機制的不同 | L78: - 整理 chip function list，用表格列出各 chip 機制的不同。 | Explicit | LOW | ✅ PASSED |
| - FW UPD 已經是 open source 了，但 SW 目前 Build 不起來，無法測試 | L80: - FW UPD 已經是 open source 了，但 SW 目前 Build 不起來，無法測試。 | Explicit | LOW | ✅ PASSED |
| - Tool 在 Chromebook 上應該可以直接執行、更新，SW 會再討論如何測試、驗證 | L83: - Tool 在 chrome book上應該可以直接執行、更新，SW 會再討論如何測試、驗證。 | Explicit | LOW | ✅ PASSED |
| - SW 需要討論一下 ISP tool 在燒錄時，需要明顯提示是使用 filter driver 還是 HID | L84: - SW需要討論一下 ISP tool 在燒錄時，需要明顯提示是使用 filter drive... | Explicit | LOW | ✅ PASSED |
| - 檢查不同 OS 平台（ex：Mac, Linux, Chromebook） | L85: - 檢查不同 OS 平台（ex：mac, linux, chrome book）。 | Derived | MID | ✅ PASSED |
| - 2021/11/05 HID 會把重抓到的 device 當成不同個 | L87: 2021/11/05 HID 會把重抓到的 device 當成不同個 | Explicit | LOW | ✅ PASSED |
| - 2021/11/05 OS 有時認不到裝置，裝置管理員上顯示驚嘆號 | L88: 2021/11/05 OS 有時認不到裝置，裝置管理員上顯示驚嘆號 | Derived | MID | ✅ PASSED |
| - 2021/11/05 Scaler update 在 set report 時，會有資料沒有傳下去的問題 | L89: 2021/11/05 Scaler update 在 set report 時 ，會有 dat... | Explicit | LOW | ✅ PASSED |
| - 2021/11/05 Scaler update 在 write command 時速度慢 | L90: 2021/11/05 Scaler update 在 write command 時速度慢 | Explicit | LOW | ✅ PASSED |
| - 2021/11/05 驗證資料時出錯（ISP_ERR_VERIFY_DEVICE） | L91: 2021/11/05 驗證資料時出錯（ISP_ERR_VERIFY_DEVICE） | Derived | MID | ✅ PASSED |
| - 2021/11/05 程式閃退 | L92: 2021/11/05 程式閃退 | Derived | MID | ✅ PASSED |
| - 2021/11/08 驗證資料時出錯（ISP_ERR_SEND_COMMAND） | L93: 2021/11/08 驗證資料時出錯（ISP_ERR_SEND_COMMAND） | Derived | MID | ✅ PASSED |
| - 2021/11/19 請 MTK 導入 Hardware CRC 的機制（被拒絕） | L94: 2021/11/19 請 MTK 導入 Hardware CRC 的機制（被拒絕）。 | Explicit | LOW | ✅ PASSED |
| - Google 在 ISP 相關 | L95: Google 在 ISP 相關。 | Explicit | LOW | ✅ PASSED |
| - HP ISP Tool (HID) 預設只使用 2 | L96: HP ISP Tool ( HID ) 預設只使用 2.0 | Explicit | LOW | ✅ PASSED |
| - 2021/12/17 HP ISP Tool | L98: 2021/12/17 HP ISP Tool | Explicit | LOW | ✅ PASSED |
| 本內容摘要自相關會議記錄與審核報告，旨在提供專案背景資訊 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 具體操作細節請以原始 source | L40: 1. [SUGGESTION] Hardcoded token password in source | Derived | MID | ✅ PASSED |
| xml 所述之行號為準 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |

> [!CAUTION]
> **ENFORCEMENT FAILED**: 13 unanchored claims detected. This node MUST be purged or downgraded before release.


---

### Node: 憑證檔案

[Synthesis](憑證檔案/synthesis.md) | [Audit](憑證檔案/audit.json) | [Source XML](憑證檔案/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| ⚠️ 此頁圖譜上下文不足，摘要僅根據單一核心節點生成 | ❌ No direct match | Structural | LOW | ✅ PASSED |
| 憑證檔案是用於驗證數位身份的重要檔案 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 它們在 Windows 和 Mac 作業系統上都有相關的處理方式 | L4: ### Windows | Derived | MID | ✅ PASSED |

> [!CAUTION]
> **ENFORCEMENT FAILED**: 1 unanchored claims detected. This node MUST be purged or downgraded before release.


---

### Node: ai-協作開發框架定義規則的開發模式

[Synthesis](ai-協作開發框架定義規則的開發模式/synthesis.md) | [Audit](ai-協作開發框架定義規則的開發模式/audit.json) | [Source XML](ai-協作開發框架定義規則的開發模式/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| ⚠️ 此頁圖譜上下文不足，摘要僅根據單一核心節點生成 | ❌ No direct match | Structural | LOW | ✅ PASSED |
| 這套 AI 開發治理體系定義了 Agent 的思維規範與系統架構紅線，旨在確保跨平台開發的品質與安全 | L6: > 💡 語言策略：治理文件以英文撰寫以降低 Token 消耗；Agent 所有輸出仍強制使用... | Derived | MID | ✅ PASSED |
| 由於目前圖譜上下文較為單一，建議查閱原始治理文件以獲取具體的測試要求與實作細節 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |

> [!CAUTION]
> **ENFORCEMENT FAILED**: 1 unanchored claims detected. This node MUST be purged or downgraded before release.


---

### Node: 2021部門創新提案

[Synthesis](2021部門創新提案/synthesis.md) | [Audit](2021部門創新提案/audit.json) | [Source XML](2021部門創新提案/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| 根據提供的內容，我們可以歸納出以下關於「2021部門創新提案」的重點: | L2: <core_topic id="2021部門創新提案" title="2021部門創新提案" ... | Structural | LOW | ✅ PASSED |
| - Code Review: 在其他部門提出需求時，需要有正式的規格說明文件，並進行審查 | L5: - Code Review | Derived | MID | ✅ PASSED |
| - 使用相關軟體了解 BU 需求的優先順序 | L7: - 利用相關軟體，讓大家了解目前BU 需求的優先順序 | Derived | MID | ✅ PASSED |
| - 目標與關鍵成果 (OKR): 透過目標和關鍵成果讓團隊了解「要做什麼」和「如何做」 | L16: - 目標與關鍵成果（OKR） | Derived | MID | ✅ PASSED |
| - [Etoken System Code View](code-sign/etoken-system-code-... | L25: <related id="etoken-system-code-view-" title="E... | Derived | MID | ✅ PASSED |
| html): 提供程式碼審查與安全性分析之研發投扺參考 | L2: <core_topic id="2021部門創新提案" title="2021部門創新提案" ... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - [HID Code Sign 記錄](code-sign/hid-code-sign-記錄 | L67: <related id="hid-code-sign-記錄" title="HID Code ... | Derived | MID | ✅ PASSED |
| html): 記錄 HID 韌體更新的相關工作 | L67: <related id="hid-code-sign-記錄" title="HID Code ... | Derived | MID | ✅ PASSED |
| - [HP Hemi(Z34c) CPU3 Code Sign 驗證問題](code-sign/hp-hemiz3... | L103: <related id="hp-hemiz34c-cpu3-code-sign-驗證問題" t... | Explicit | LOW | ✅ PASSED |
| html): 描述韌體簽章驗證的解決方案 | L2: <core_topic id="2021部門創新提案" title="2021部門創新提案" ... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 總的來說，「2021部門創新提案」涵蓋了從工作流程改善到技術品質治理的內容 | L2: <core_topic id="2021部門創新提案" title="2021部門創新提案" ... | Structural | LOW | ✅ PASSED |
| 這些做法旨在透過結構化的審查與目標管理 (OKR) 提高工作效率，並與程式碼審查、韌體更新等關鍵技術工作緊密相關 | L16: - 目標與關鍵成果（OKR） | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |

> [!CAUTION]
> **ENFORCEMENT FAILED**: 3 unanchored claims detected. This node MUST be purged or downgraded before release.


---

### Node: 世界上最快樂的工作

[Synthesis](世界上最快樂的工作/synthesis.md) | [Audit](世界上最快樂的工作/audit.json) | [Source XML](世界上最快樂的工作/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| ⚠️ 此頁圖譜上下文不足，摘要僅根據單一核心節點生成 | ❌ No direct match | Structural | LOW | ✅ PASSED |
| 工作是獲得經濟報酬的活動 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 工作和快樂之間存在正相關關係,可以從工作中發現樂趣、享受成就感、建立良好的人際關係等方式來提升工作的快樂感 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 如果工作不快樂,可以透過探索自己的志向或無條件基本收入等方式來改善 | L14: ### 如果工作不快樂，有什麼辦法讓大家比較快樂 | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |

> [!CAUTION]
> **ENFORCEMENT FAILED**: 3 unanchored claims detected. This node MUST be purged or downgraded before release.


---

### Node: -hp-sdlc-master-compliance-checklist-2025-edition

[Synthesis](-hp-sdlc-master-compliance-checklist-2025-edition/synthesis.md) | [Audit](-hp-sdlc-master-compliance-checklist-2025-edition/audit.json) | [Source XML](-hp-sdlc-master-compliance-checklist-2025-edition/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| 以下是 HP SDLC Master Compliance Checklist (2025 Edition) 的詳... | L2: <core_topic id="-hp-sdlc-master-compliance-chec... | Explicit | LOW | ✅ PASSED |
| 本文件概述了 HP 在 2025 年版本的 SDLC Master Compliance Checklist | L2: <core_topic id="-hp-sdlc-master-compliance-chec... | Structural | LOW | ✅ PASSED |
| 它涵蓋了軟體開發生命週期的各個階段,確保產品符合安全性和合規性要求 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 1 安全需求定義 (Security Requirements) | L8: ### 3.1 安全需求定義 (Security Requirements) | Explicit | LOW | ✅ PASSED |
| - [PM/SW] 撰寫 [Security Requirements Document](https://en | L9: - [PM/SW] 撰寫 Security Requirements Document | Explicit | LOW | ✅ PASSED |
| org/wiki/Software_requirements_specification)，明確定義產品的安全性需求 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 2 資料清單 (Inventory of Data) | L10: ### 3.2 資料清單 (Inventory of Data) | Explicit | LOW | ✅ PASSED |
| - [SW] 建立 [Data Inventory Document](https://www | L11: - [SW] 建立 Data Inventory Document | Explicit | LOW | ✅ PASSED |
| org/white-papers/33193/)，詳細列出產品中使用的所有資料類型 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 3 威脅建模 (Threat Modeling) | L12: ### 3.3 威脅建模 (Threat Modeling) | Explicit | LOW | ✅ PASSED |
| - [SW/Security] 執行並記錄 [Threat Model](https://www | L13: - [SW/Security] 執行與記錄 Threat Model | Derived | MID | ✅ PASSED |
| com/en-us/securityengineering/sdl/threatmodeling)，識別潛在的安全威脅 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 4 生成式 AI 規範 (Generative AI) | L17: ### 3.4 生成式 AI 規範 (Generative AI) | Explicit | LOW | ✅ PASSED |
| - [PM] 準備 [Certificate of Compliance](https://www | L18: - [PM] 準備合規證書 (Certificate of Compliance) | Explicit | LOW | ✅ PASSED |
| org/certification | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| html) 以確保生成式 AI 的使用符合相關規範 | L2: <core_topic id="-hp-sdlc-master-compliance-chec... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 5 靜態掃描 (SAST) | L19: ### 3.5 靜態掃描 (SAST) | Derived | MID | ✅ PASSED |
| - [SW] 執行 [SAST (Static Application Security Testing)](ht... | L8: ### 3.1 安全需求定義 (Security Requirements) | Derived | MID | ✅ PASSED |
| org/www-community/controls/Static_Code_Analysis) 以發現程式碼中的... | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 6 軟體成分分析 (SCA / SBOM) | L21: ### 3.6 軟體成分分析 (SCA / SBOM) | Explicit | LOW | ✅ PASSED |
| - [SW] 執行 [SCA (Software Composition Analysis)](https://www | L21: ### 3.6 軟體成分分析 (SCA / SBOM) | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| com/software-integrity/security-testing/software-composit... | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| html) 以識別使用的第三方元件 | L2: <core_topic id="-hp-sdlc-master-compliance-chec... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 7 模糊測試 (Fuzz Testing) | L23: ### 3.7 模糊測試 (Fuzz Testing) | Explicit | LOW | ✅ PASSED |
| - [SW] 執行 [Fuzzing](https://owasp | L24: - [SW] 執行 Fuzzing | Derived | MID | ✅ PASSED |
| org/www-community/Fuzzing) 以發現程式中的潛在缺陷 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 8 動態掃描 (DAST) | L25: ### 3.8 動態掃描 (DAST) | Derived | MID | ✅ PASSED |
| - [SW] 執行 [DAST (Dynamic Application Security Testing)](h... | L8: ### 3.1 安全需求定義 (Security Requirements) | Derived | MID | ✅ PASSED |
| org/www-community/controls/Dynamic_Code_Analysis) 以發現運行時的... | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 9 滲透測試 (Penetration Testing) | L30: ### 3.9 滲透測試 (Penetration Testing) | Explicit | LOW | ✅ PASSED |
| - [PM] 安排 [Penetration Testing](https://owasp | L30: ### 3.9 滲透測試 (Penetration Testing) | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| org/www-community/Penetration_testing) 以評估產品的整體安全性 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 11 代碼簽章 (Code Signing) - ⚠️ 重點戰場 | L32: ### 3.11 代碼簽章 (Code Signing) - ⚠️ 重點戰場 | Explicit | LOW | ✅ PASSED |
| - [SW/DevOps] 建置 [Code Signing](https://docs | L32: ### 3.11 代碼簽章 (Code Signing) - ⚠️ 重點戰場 | Derived | MID | ✅ PASSED |
| com/en-us/windows-hardware/drivers/install/code-signing) ... | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - [SW] 實作 [Code Signing Verification](https://docs | L32: ### 3.11 代碼簽章 (Code Signing) - ⚠️ 重點戰場 | Derived | MID | ✅ PASSED |
| com/en-us/windows-hardware/drivers/install/verifying-driv... | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 10 日誌與隱私 (Logging Rules) - ⚠️ 紅線區 | L38: ### 3.10 日誌與隱私 (Logging Rules) - ⚠️ 紅線區 | Explicit | LOW | ✅ PASSED |
| - [SW] 檢查程式碼以確保符合日誌和隱私規則 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - [PM] 準備合規文件以證明產品符合相關法規要求 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 12 韌體安全 (Firmware Security) | L41: ### 3.12 韌體安全 (Firmware Security) | Explicit | LOW | ✅ PASSED |
| - (僅適用於 Mutable Firmware，不適用 OS Driver/App) | L42: - (僅適用於 Mutable Firmware，不適用 OS Driver/App) | Explicit | LOW | ✅ PASSED |
| - [PM] 準備符合 [NIST SP 800-193](https://csrc | L43: - [PM] 準備符合 NIST SP 800-193 的合規證書 (PDF, 主管簽名)。 | Explicit | LOW | ✅ PASSED |
| gov/publications/detail/sp/800-193/final) 的合規證書 (PDF, 主管簽名) | L43: - [PM] 準備符合 NIST SP 800-193 的合規證書 (PDF, 主管簽名)。 | Derived | MID | ✅ PASSED |
| - [SW] 實作 Corruption/Recovery 的事件記錄 (Logging) | L44: - [SW] 實作 Corruption/Recovery 的事件記錄 (Logging)。 | Explicit | LOW | ✅ PASSED |
| 13 維護與回應 (Maintenance) | L45: ### 3.13 維護與回應 (Maintenance) | Derived | MID | ✅ PASSED |
| - [PM] 建立 [Security Response Plan](https://www | L46: - [PM] 建立 Security Response Plan | Explicit | LOW | ✅ PASSED |
| gov/uscert/ncas/tips/ST04-006) 以應對未來的安全問題 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - [PM] 最終確認所有合規性要求均已滿足 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 以上就是 HP SDLC Master Compliance Checklist (2025 Edition) 的... | L2: <core_topic id="-hp-sdlc-master-compliance-chec... | Explicit | LOW | ✅ PASSED |
| 這個清單涵蓋了軟體開發生命週期的各個階段,確保產品符合嚴格的安全性和合規性標準 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |

> [!CAUTION]
> **ENFORCEMENT FAILED**: 21 unanchored claims detected. This node MUST be purged or downgraded before release.


---

### Node: 短期行動-vs-長期視野從混亂到有序結構化軟體建構之路

[Synthesis](短期行動-vs-長期視野從混亂到有序結構化軟體建構之路/synthesis.md) | [Audit](短期行動-vs-長期視野從混亂到有序結構化軟體建構之路/audit.json) | [Source XML](短期行動-vs-長期視野從混亂到有序結構化軟體建構之路/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| 8年前，我進入公司工作，工作內容與以前有很大差別 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 以前公司是以專案為主，完全會跟著產品生產的流程來決定軟體要做到哪個地步 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 但是現在的做法是根據各業務單位 (BU) 的需求來提供服務，所以BU有什麼想法，我們就要做出相應的工具 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 這造成需求變得多又雜亂，導致為了趕時間，只要求工具能用就好，就變成了我進來時看到的情況： | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - 有SVN版控，但並非所有工具都有，只有長期Release的工具才有 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - BU所需的工具根據每個人的習慣不一定 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - 因為BU所需要的工具，最基本的程式碼還是大同小異，為了快速改完需求，直接從SVN裡面複製一份出來改是最快的，就... | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 先以底層程式碼統一為主，先把所有目前有用到的原始程式碼的底層做整合，讓所有的工具都呼叫同一個底層的程式碼，但是還是... | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - 整理所有用到的工具，分析是否有底層程式碼可以合併的 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - 整理工具相關文件，讓雜亂無章的資訊可以整合起來 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 之前的同事基本上都是配合硬體開發軟體，並沒有純軟體出生，或是說對軟體沒有熱烈喜好 | L14: 之前的同事基本上都是配合硬體開發軟體，並沒有純軟體出生，或是說對軟體沒有熱烈喜好，Adam 進... | Derived | MID | ✅ PASSED |
| Adam 進來後補足了這一塊，在請Adam修改對應功能時，他開發時間會比較久，所以會趁開發時，也會把對應的程式碼做... | L14: 之前的同事基本上都是配合硬體開發軟體，並沒有純軟體出生，或是說對軟體沒有熱烈喜好，Adam 進... | Derived | MID | ✅ PASSED |
| 發現這樣的現象後，也開始調整給Adam的工作，讓他可以開發比較長期的需求，並根據自己調整重構的比例： | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - 根據客戶的需求分析工具的使用率 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - 將最常用的工具先做重構 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - 重構的程式碼和初始的程式碼作為停損點，在指定時間內把重構的程式碼導入工具裡面 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - 重點工具都有讓成員寫相關說明文件，確保不同人來做時可以更快上手 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 因為BU的需求越來越多，導致人力不足，這時人從3人 -> 6人，人數變多，讓調配工作的彈性更高，讓某些對原始程式碼... | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 原始程式碼的重構程度越高，短期需求所花的力氣就更少，讓我們可以專注在更想要做的事情上面，也更能做長期的規劃，讓客戶... | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - 從 SVN 遷移到 GitHub | L21: - SVN —> GitHub | Derived | MID | ✅ PASSED |
| - 導入程式碼審查 (code review) 機制 | L22: - 導入code review 機制 | Derived | MID | ✅ PASSED |
| - 重點專案導入 CI/CD | L23: - 重點專案導入ci/cd | Derived | MID | ✅ PASSED |
| - 開始導入跨平台的底層程式碼 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| BU的簡單需求都可以省力的達成，可以花更多人力在長期目標上，開始討論如何為BU節省開發成本，討論規劃出一些驗證工具... | L26: BU的簡單需求都可以省力的達成，可以花更多人力在長期目標上，開始討論如何為BU 節省開發成本，... | Explicit | LOW | ✅ PASSED |
| - 三大平台 (Linux、Mac、Windows) 底層程式碼共用 | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - 增加 Diagnostic Tool 讓開發驗證可以更快速找到問題點 | L29: - 增加Diagnostic Tool讓開發驗證可以更快速找到問題點 | Explicit | LOW | ✅ PASSED |
| [Secure Firmware Recovery](general/secure-firmware-recovery | L70: <related id="secure-firmware-recovery" title="S... | Derived | MID | ✅ PASSED |
| 本文件詳細介紹了 OCP 安全韌體恢復 (Secure Firmware Recovery) 的規範，包括系統架構... | L72: ### OCP 安全韌體恢復 (Secure Firmware Recovery) 規範詳解 | Explicit | LOW | ✅ PASSED |
| 這與本案例的軟體建構之路有以下關係： | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 在第三步的大躍進中，提到導入 CI/CD 流程，這與 Secure Firmware Recovery 的自動化恢... | L70: <related id="secure-firmware-recovery" title="S... | Derived | MID | ✅ PASSED |
| 未來目標中提到導入自動化測試，這也與 Secure Firmware Recovery 的偵測機制相關，能夠及時發... | L70: <related id="secure-firmware-recovery" title="S... | Derived | MID | ✅ PASSED |
| 整體而言，Secure Firmware Recovery 規範提供了一個可靠的韌體恢復框架，有助於解決軟體建構過... | L70: <related id="secure-firmware-recovery" title="S... | Derived | MID | ✅ PASSED |
| [2025 Minimum Elements for a Software Bill of Materials (... | L485: Software Bill of Materials (SBOM)" path="/gener... | Explicit | LOW | ✅ PASSED |
| 本文件介紹了 2025 年 SBOM 的最低要素，這與本案例的軟體建構之路有以下關係： | L485: Software Bill of Materials (SBOM)" path="/gener... | Derived | MID | ✅ PASSED |
| 在第三步的大躍進中，提到從 SVN 遷移到 GitHub，這與 SBOM 的自動化生成和機器可讀性要求相符 | L6: - 有SVN版控，但是不是全部的Tool都有，只有長期Release的Tool才有 | Derived | MID | ✅ PASSED |
| 未來目標中提到導入自動化測試，這也與 SBOM 的自動化支援需求相關，能夠更好地管理軟體組件的依賴關係和風險 | L485: Software Bill of Materials (SBOM)" path="/gener... | Derived | MID | ✅ PASSED |
| 整體而言，SBOM 的最低要素為軟體供應鏈的透明化和風險管理提供了標準化的基礎，有助於解決本案例中軟體建構過程中的... | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 總的來說，本案例的軟體建構之路與 Secure Firmware Recovery 和 SBOM 兩個規範都有密切... | L70: <related id="secure-firmware-recovery" title="S... | Structural | LOW | ✅ PASSED |

> [!CAUTION]
> **ENFORCEMENT FAILED**: 21 unanchored claims detected. This node MUST be purged or downgraded before release.


---

### Node: 新架構導入新的chip-updatemt9052-方式

[Synthesis](新架構導入新的chip-updatemt9052-方式/synthesis.md) | [Audit](新架構導入新的chip-updatemt9052-方式/audit.json) | [Source XML](新架構導入新的chip-updatemt9052-方式/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| 根據提供的內容,我們可以了解到新架構導入新的chip update(MT9052)方式的主要步驟如下: | L2: <core_topic id="新架構導入新的chip-updatemt9052-方式" ti... | Structural | LOW | ✅ PASSED |
| cpp` 的 `FW_INDICATE_NAME` 中加入 MT9052 的相關定義 | L2: <core_topic id="新架構導入新的chip-updatemt9052-方式" ti... | Derived | MID | ✅ PASSED |
| 在 `SupportCtrl | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| h` 中加入要 update 的 ` | L2: <core_topic id="新架構導入新的chip-updatemt9052-方式" ti... | Derived | MID | ✅ PASSED |
| 在 `MT905xMcuCtrl | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| h` 中,MT9052 的 MCU 控制器需要繼承 `IspCtrl` 介面 | L2: <core_topic id="新架構導入新的chip-updatemt9052-方式" ti... | Derived | MID | ✅ PASSED |
| 在 `IspCtrlManager | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| cpp` 的 `AcquireIspCtrl` 函數中,加入導入 MT9052 update 功能的條件判斷 | L2: <core_topic id="新架構導入新的chip-updatemt9052-方式" ti... | Derived | MID | ✅ PASSED |
| 在 `GLHubUpdateTool | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| cpp` 的 `ManualUpdateFwNew` 函數中,可以透過上述設定導入 MT9052 MCU 的 up... | L2: <core_topic id="新架構導入新的chip-updatemt9052-方式" ti... | Explicit | LOW | ✅ PASSED |
| 在 `DeviceAgent | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| cpp` 的 `UpdateFw` 和 `IspFlash` 函數中,加入 MT9052 MCU 的 update 邏輯 | L2: <core_topic id="新架構導入新的chip-updatemt9052-方式" ti... | Explicit | LOW | ✅ PASSED |
| 在 `MT905xMcuCtrl | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| cpp` 的 `Isp` 函數中,實現 MT9052 MCU 的 ISP 功能 | L703: 燒錄流程最後兩個步驟分別是Reset MCU與New Differ Bank After ISP | Derived | MID | ✅ PASSED |
| 總的來說,這個新的 chip update 方式需要在現有的架構中,針對 MT9052 MCU 的特性,擴充相關的... | L2: <core_topic id="新架構導入新的chip-updatemt9052-方式" ti... | Structural | LOW | ✅ PASSED |
| 主要涉及到 MCU 控制器的介面實現、ISP 流程的整合,以及在 update 工具中的相關設定和調用 | L2: <core_topic id="新架構導入新的chip-updatemt9052-方式" ti... | Derived | MID | ✅ PASSED |
| 這樣可以實現對 MT9052 MCU 的 update 功能 | L2: <core_topic id="新架構導入新的chip-updatemt9052-方式" ti... | Derived | MID | ✅ PASSED |

> [!CAUTION]
> **ENFORCEMENT FAILED**: 6 unanchored claims detected. This node MUST be purged or downgraded before release.


---

### Node: -clawdbot-自主代理建置與資安防禦全紀錄

[Synthesis](-clawdbot-自主代理建置與資安防禦全紀錄/synthesis.md) | [Audit](-clawdbot-自主代理建置與資安防禦全紀錄/audit.json) | [Source XML](-clawdbot-自主代理建置與資安防禦全紀錄/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| 穩定執行中 (Stable) ✅ | L5: 系統狀態： 穩定執行中 (Stable) ✅ | Derived | MID | ✅ PASSED |
| 在系統初始設定中，我們定義了最高指導原則，確保 AI 運作兼具深度與安全： | L7: 在系統初始設定中，我們定義了最高指導原則，確保 AI 運作兼具深度與安全： | Derived | MID | ✅ PASSED |
| 語言規範：強制要求所有回覆與指令說明均以 繁體中文 進行 | L8: - 語言規範：強制要求所有回覆與指令說明均以 繁體中文 進行。 | Derived | MID | ✅ PASSED |
| 思考挑戰：設定 AI 必須「永遠挑戰想法中的假設與前提」，在產出大量內容時需進行自我審查 | L9: - 思考挑戰：設定 AI 必須「永遠挑戰想法中的假設與前提」，在產出大量內容時需進行自我審查。 | Derived | MID | ✅ PASSED |
| 自主代理角色：定義為精通系統自動化與 Clawdbot 架構的資深開發者，專注於權限管理與流程優化 | L10: - 自主代理角色：定義為精通系統自動化與 Clawdbot 架構的資深開發者，專注於權限管理與... | Derived | MID | ✅ PASSED |
| - 問題：初次設定 google:gemini-1 | L13: - 問題：初次設定 google:gemini-1.5-flash 被系統誤判為 anthro... | Derived | MID | ✅ PASSED |
| 5-flash 被系統誤判為 anthropic/google | L13: - 問題：初次設定 google:gemini-1.5-flash 被系統誤判為 anthro... | Derived | MID | ✅ PASSED |
| - 解決：審查 `model-selection | L14: - 解決：審查 model-selection.js 源碼後，確認供應商與模型間需使用 斜線 ... | Derived | MID | ✅ PASSED |
| js` 源碼後，確認供應商與模型間需使用 斜線 (/) 分隔，導正為 `google/gemini-1 | L14: - 解決：審查 model-selection.js 源碼後，確認供應商與模型間需使用 斜線 ... | Explicit | LOW | ✅ PASSED |
| `[model-selection | L14: - 解決：審查 model-selection.js 源碼後，確認供應商與模型間需使用 斜線 ... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| js](path/to/model-selection | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 404 模型不存在 (API Layer) | L15: ### 2. 404 模型不存在 (API Layer) | Explicit | LOW | ✅ PASSED |
| - 問題：API 持續回傳 404 Not Found，提示在 v1beta 版本中找不到模型路徑 | L16: - 問題：API 持續回傳 404 Not Found，提示在 v1beta 版本中找不到模型路徑。 | Explicit | LOW | ✅ PASSED |
| - 解決：撰寫 `check_models | L17: - 解決：撰寫 check_models.js 腳本直接呼叫 API。發現您在 2026-01... | Derived | MID | ✅ PASSED |
| js` 腳本直接呼叫 API | L17: - 解決：撰寫 check_models.js 腳本直接呼叫 API。發現您在 2026-01... | Derived | MID | ✅ PASSED |
| 發現您在 2026-01-29 建立的 API Key (Tier 1) 支援更強大的 Gemini 2 | L17: - 解決：撰寫 check_models.js 腳本直接呼叫 API。發現您在 2026-01... | Explicit | LOW | ✅ PASSED |
| - 最終配置：切換至實測存在的 `google/gemini-2 | L18: - 最終配置：切換至實測存在的 google/gemini-2.5-flash。 | Derived | MID | ✅ PASSED |
| `[check_models | L17: - 解決：撰寫 check_models.js 腳本直接呼叫 API。發現您在 2026-01... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| js](path/to/check_models | ❌ No direct match | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| Webhook 與網路隧道 | L19: ### 3. Webhook 與網路隧道 | Derived | MID | ✅ PASSED |
| - 問題：LINE Webhook 頻繁出現 404 (路徑錯) 或 408 (逾時) | L20: - 問題：LINE Webhook 頻繁出現 404 (路徑錯) 或 408 (逾時)。 | Explicit | LOW | ✅ PASSED |
| - 解決：修正路徑為 `/line/webhook` 並改用 Ngrok 建立隧道，成功繞過 LocalTunne... | L21: - 解決：修正路徑為 /line/webhook 並改用 Ngrok 建立隧道，成功繞過 Lo... | Explicit | LOW | ✅ PASSED |
| - 權限最小化 (Sandboxing)： | L25: - 權限最小化 (Sandboxing)： | Derived | MID | ✅ PASSED |
| 在未來擴充功能時，請遵循以下規範： | L29: 在未來擴充功能時，請遵循以下規範： | Derived | MID | ✅ PASSED |
| 環境變數保護：API Key 應存放於 ` | L30: 1. 環境變數保護：API Key 應存放於 .env，嚴禁硬編碼 (Hard-coding)... | Derived | MID | ✅ PASSED |
| env`，嚴禁硬編碼 (Hard-coding) 在 `clawdbot | L30: 1. 環境變數保護：API Key 應存放於 .env，嚴禁硬編碼 (Hard-coding)... | Derived | MID | ✅ PASSED |
| API 成本失控預防： | L31: 1. API 成本失控預防： | Derived | MID | ✅ PASSED |
| 定期檢查「技能 (Skills)」： | L32: 1. 定期檢查「技能 (Skills)」： | Derived | MID | ✅ PASSED |

> [!CAUTION]
> **ENFORCEMENT FAILED**: 4 unanchored claims detected. This node MUST be purged or downgraded before release.


---

### Node: -投影片大綱從餵指令到定規則

[Synthesis](-投影片大綱從餵指令到定規則/synthesis.md) | [Audit](-投影片大綱從餵指令到定規則/audit.json) | [Source XML](-投影片大綱從餵指令到定規則/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| ⚠️ 此頁圖譜上下文不足，摘要僅根據單一核心節點生成 | ❌ No direct match | Structural | LOW | ✅ PASSED |
| 本投影片大綱介紹了從「餵指令」到「定規則」的方法,讓 AI 不再每次都重頭理解專案 | L2: <core_topic id="-投影片大綱從餵指令到定規則" title="🛡️ 投影片大... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 主要內容包括:1) AI 只能看到專案的冰山一角,無法理解隱藏的上下文和結構;2) 沒有適當的治理,AI 會產生記... | L74: 1. 插件式治理: 這 7 份核心檔案 (SYSTEM_PROMPT、ARCHITECTURE... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |

> [!CAUTION]
> **ENFORCEMENT FAILED**: 2 unanchored claims detected. This node MUST be purged or downgraded before release.


