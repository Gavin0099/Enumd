# Reviewer Workbook v2 (Wave 1 Audit)

## 📦 Batch Integrity Contract

```json
{
  "batch_id": "batch_2026-04-14T10-52-56-634Z",
  "wave_id": 1,
  "git_commit_hash": "de74ba0aca4ede54e952fcfce4a19ac697b8ff16",
  "graph_hash": "ea19050c31e597b7672105cc89330ef8",
  "synthesis_code_hash": "474e353e487e9f110f475bf131949e64",
  "prompt_version": "v1.5-controlled-context",
  "model_name": "claude-3-haiku-20240307",
  "generated_at": "2026-04-14T10:52:56.816Z"
}
```

## 🔍 Stratified 10-Node Audit Samples

---

### Node: 研發投扺專案資料列印流程

[Synthesis](研發投扺專案資料列印流程/synthesis.md) | [Audit](研發投扺專案資料列印流程/audit.json) | [Source XML](研發投扺專案資料列印流程/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| 1. 開啟工作週報，選擇 Keyword 搜尋 | L6: 1. 開啟工作周報，選擇Keyword | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 3. 勾選所有 2020 年的週報，按下匯出網頁 | L8: 1. 勾選所有2020的週報，按下匯出網頁 | Derived | MID | ✅ PASSED |
| 4. 即可得到 2020 年關於此專案的所有週報，接下來按列印即可 | L8: 1. 勾選所有2020的週報，按下匯出網頁 | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 2. 告知如何清除 Camera 的方式 - 驗證失敗時需要清除 | L17: 1. 告知如何Erase Camera 的方式 —> verify fail 要 erase 掉 | Derived | MID | ✅ PASSED |
| 3. 告知如何讀取 Camera 資料 - Hub 安全模型必須能讀取到更新的資料才能計算雜湊值 | L2: <core_topic id="研發投扺專案資料列印流程" title="研發投扺專案資料列印... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 5. 下圖為 Hub Code Sign 驗證流程，驗證 code sign 應該可以由工具控制，韌體不需要太多改... | L20: 1. 下圖為Hub Code Sign 驗證 flow ，驗證code sign 應該Tool... | Explicit | LOW | ✅ PASSED |
| - 架構: 不通過。連線工作流程使用 detach 且無生命週期收斂，違反可預測關閉原則。 | L31: - Architecture: 不通過。連線工作流程使用 detach 且無生命週期收斂，違反... | Explicit | LOW | ✅ PASSED |
| - 原生安全性: 不通過。檔案大小與外部命令執行缺乏邊界控制，存在資源與執行風險。 | L32: - Native Safety: 不通過。檔案大小與外部命令執行缺乏邊界控制，存在資源與執行風險。 | Derived | MID | ✅ PASSED |
| - 測試完整性: 不通過。看不到針對失敗路徑（超大輸入、shutdown race、協定錯位）的測試證據。 | L33: - Test Integrity: 不通過。看不到針對失敗路徑（超大輸入、shutdown r... | Explicit | LOW | ✅ PASSED |
| 1. [阻塞] 分離的工作執行緒可能會比擁有者 (this) 存活更久 | L35: 1. [BLOCKING] Detached worker thread may outliv... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 4. [警告] 使用外部衍生參數執行 system() | L23: <related id="etoken-system-code-view-" title="E... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 5. [警告] select() 中的逾時轉換錯誤 | L39: 1. [WARNING] Timeout conversion bug in select() | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 6. [建議] 原始碼中硬編碼的 token 密碼 | L23: <related id="etoken-system-code-view-" title="E... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - 檢查了 03_knowledge_base.md 中的 4 個反模式/陷阱。 | L42: - Checked 4 Anti-Patterns/Pitfalls in 03_knowle... | Explicit | LOW | ✅ PASSED |
| - 結果: 發現衝突 (特別是 system()/子程序掛起與協定失配/卡住風險已命中)。 | L43: - Result: Conflict Found (特別是 system()/sub-proc... | Derived | MID | ✅ PASSED |
| - 架構: Release 組態已移除 OFFLINE_TEST，這點較前版改善；但連線工作執行緒仍採 detac... | L50: - Architecture: Release 組態已移除 OFFLINE_TEST，這點較前... | Explicit | LOW | ✅ PASSED |
| - 原生安全性: 未發現新的 pointer free 錯誤；但外部命令執行與檔案大小處理缺乏邊界，仍有高風險。 | L51: - Native Safety: 未發現新的 pointer free 錯誤；但外部命令執行與... | Explicit | LOW | ✅ PASSED |
| - 測試完整性: 看不到對失敗路徑（超大 file size、thread shutdown race、SQL 注... | L52: - Test Integrity: 看不到對失敗路徑（超大 file size、thread ... | Explicit | LOW | ✅ PASSED |
| 1. [阻塞] SQL 注入風險（登入授權查詢） | L52: - Test Integrity: 看不到對失敗路徑（超大 file size、thread ... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 2. [警告] detach 執行緒捕獲 this，存在 shutdown race / UAF 風險 | L55: 1. [WARNING] detach 執行緒捕獲 this，存在 shutdown race... | Explicit | LOW | ✅ PASSED |
| 3. [警告] Dongle 管理同樣使用 detach，生命週期不可驗證 | L56: 1. [WARNING] Dongle 管理同樣使用 detach，生命週期不可驗證 | Derived | MID | ✅ PASSED |
| 4. [警告] 檔案大小由對端提供且未設上限，可能 OOM/卡死 | L57: 1. [WARNING] 檔案大小由對端提供且未設上限，可能 OOM/卡死 | Derived | MID | ✅ PASSED |
| 5. [警告] 對 Dongle 端取檔同樣無大小上限 | L58: 1. [WARNING] 對 Dongle 端取檔同樣無大小上限 | Derived | MID | ✅ PASSED |
| 6. [警告] DB 密碼硬編碼在程式碼 | L59: 1. [WARNING] DB 密碼硬編碼在程式碼 | Derived | MID | ✅ PASSED |
| - 檢查了 03_knowledge_base.md 中的 4 個反模式/陷阱 (含 system()/子程序卡死... | L61: - Checked 4 Anti-Patterns/Pitfalls in 03_knowle... | Explicit | LOW | ✅ PASSED |
| - 結果: 發現衝突 (當前風險與既有 anti-pattern 高度重疊)。 | L62: - Result: Conflict Found（當前風險與既有 anti-pattern 高... | Explicit | LOW | ✅ PASSED |
| - Vendor Command 第二碼 | L69: - Vendor Command 第二碼 | Derived | MID | ✅ PASSED |
| - `file:///\\genesyslogic.com.tw\GenesysData\SW_Release_N... | L72: - file:///\\genesyslogic.com.tw\GenesysData\SW_... | Explicit | LOW | ✅ PASSED |
| - 請 SE 確認各 OS 有沒有自動喚醒 device。 | L76: - 請SE確認各OS有沒有自動喚醒 device。 | Explicit | LOW | ✅ PASSED |
| - HID 驗證 USB LOGO 問題。 | L77: - HID 驗證 USB LOGO 問題。 | Explicit | LOW | ✅ PASSED |
| - 整理 chip function list，用表格列出各 chip 機制的不同。 | L78: - 整理 chip function list，用表格列出各 chip 機制的不同。 | Explicit | LOW | ✅ PASSED |
| - FW UPD 已經是 open source 了，但 SW 目前 Build 不起來，無法測試。 | L80: - FW UPD 已經是 open source 了，但 SW 目前 Build 不起來，無法測試。 | Explicit | LOW | ✅ PASSED |
| - Tool 在 Chromebook 上應該可以直接執行、更新，SW 會再討論如何測試、驗證。 | L83: - Tool 在 chrome book上應該可以直接執行、更新，SW 會再討論如何測試、驗證。 | Explicit | LOW | ✅ PASSED |
| - SW 需要討論一下 ISP tool 在燒錄時，需要明顯提示是使用 filter driver 還是 HID。 | L84: - SW需要討論一下 ISP tool 在燒錄時，需要明顯提示是使用 filter drive... | Explicit | LOW | ✅ PASSED |
| - 檢查不同 OS 平台（ex：Mac, Linux, Chromebook）。 | L85: - 檢查不同 OS 平台（ex：mac, linux, chrome book）。 | Derived | MID | ✅ PASSED |
| - 2021/11/05 HID 會把重抓到的 device 當成不同個 | L87: 2021/11/05 HID 會把重抓到的 device 當成不同個 | Explicit | LOW | ✅ PASSED |
| - 2021/11/05 OS 有時認不到裝置，裝置管理員上顯示驚嘆號 | L88: 2021/11/05 OS 有時認不到裝置，裝置管理員上顯示驚嘆號 | Derived | MID | ✅ PASSED |
| - 2021/11/05 Scaler update 在 set report 時 ，會有 data 沒有傳下去的問題 | L89: 2021/11/05 Scaler update 在 set report 時 ，會有 dat... | Explicit | LOW | ✅ PASSED |
| - 2021/11/05 Scaler update 在 write command 時速度慢 | L90: 2021/11/05 Scaler update 在 write command 時速度慢 | Explicit | LOW | ✅ PASSED |
| - 2021/11/05 驗證資料時出錯（ISP_ERR_VERIFY_DEVICE） | L91: 2021/11/05 驗證資料時出錯（ISP_ERR_VERIFY_DEVICE） | Explicit | LOW | ✅ PASSED |
| - 2021/11/05 程式閃退 | L92: 2021/11/05 程式閃退 | Derived | MID | ✅ PASSED |
| - 2021/11/08 驗證資料時出錯（ISP_ERR_SEND_COMMAND） | L93: 2021/11/08 驗證資料時出錯（ISP_ERR_SEND_COMMAND） | Explicit | LOW | ✅ PASSED |
| - 2021/11/19 請 MTK 導入 Hardware CRC 的機制（被拒絕）。 | L94: 2021/11/19 請 MTK 導入 Hardware CRC 的機制（被拒絕）。 | Explicit | LOW | ✅ PASSED |
| - Google 在 ISP 相關。 | L95: Google 在 ISP 相關。 | Derived | MID | ✅ PASSED |
| - HP ISP Tool (HID) 預設只使用 2.0 | L96: HP ISP Tool ( HID ) 預設只使用 2.0 | Explicit | LOW | ✅ PASSED |
| 2021/12/17 HP ISP Tool | L98: 2021/12/17 HP ISP Tool | Explicit | LOW | ✅ PASSED |

> [!CAUTION]
> **ENFORCEMENT FAILED**: 8 unanchored claims detected. This node MUST be purged or downgraded before release.
> **LLM Draft Stats**: 108 lines → removed 33 (31%), downgraded 0. is_clean: ⚠️ false (hallucinations were filtered before this output)


---

### Node: 憑證檔案

[Synthesis](憑證檔案/synthesis.md) | [Audit](憑證檔案/audit.json) | [Source XML](憑證檔案/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| ⚠️ 此頁圖譜上下文不足，摘要僅根據單一核心節點生成。 | ❌ No direct match | Structural | LOW | ✅ PASSED |

> [!IMPORTANT]
> **ENFORCEMENT PASSED**: Final output is 100% anchored or correctly scoped.
> **LLM Draft Stats**: 3 lines → removed 1 (33%), downgraded 0. is_clean: ⚠️ false (hallucinations were filtered before this output)


---

### Node: ai-協作開發框架定義規則的開發模式

[Synthesis](ai-協作開發框架定義規則的開發模式/synthesis.md) | [Audit](ai-協作開發框架定義規則的開發模式/audit.json) | [Source XML](ai-協作開發框架定義規則的開發模式/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| ⚠️ 此頁圖譜上下文不足，摘要僅根據單一核心節點生成。 | L28: - 裁決等級：🔴 BLOCKING（治理違規，立即拒絕）、⚠️ WARNING（需權衡理由或... | Structural | LOW | ✅ PASSED |

> [!IMPORTANT]
> **ENFORCEMENT PASSED**: Final output is 100% anchored or correctly scoped.
> **LLM Draft Stats**: 3 lines → removed 1 (33%), downgraded 0. is_clean: ⚠️ false (hallucinations were filtered before this output)


---

### Node: 2021部門創新提案

[Synthesis](2021部門創新提案/synthesis.md) | [Audit](2021部門創新提案/audit.json) | [Source XML](2021部門創新提案/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| 根據提供的上下文資訊，我們可以歸納出以下關於「2021部門創新提案」的重點: | L2: <core_topic id="2021部門創新提案" title="2021部門創新提案" ... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 1. **Code Review**: | L5: - Code Review | Derived | MID | ✅ PASSED |
| - 當其他部門提出需求時，需要有正式的規格說明文件(SPEC)，並進行 review 動作。 | L6: - 別的部門提出需求時，要有正式的SPEC，並且要有review動作，而且在完成時，整理成一份... | Derived | MID | ✅ PASSED |
| - 利用相關軟體，讓大家了解目前 BU 需求的優先順序。 | L7: - 利用相關軟體，讓大家了解目前BU 需求的優先順序 | Derived | MID | ✅ PASSED |
| - 關於 Hub & PD 相關工作，規劃 Wiki 資訊，讓新人比較容易上手。 | L10: - 關於Hub&PD相關工作，規劃Wiki 資訊，能讓新人比較容易上手，且能找到想要的資訊。 | Explicit | LOW | ✅ PASSED |
| - 開發的重要專案、軟體都需做詳細手冊，從概念到實作進行說明。 | L11: - 開發的重要專案、軟體都需做個詳細手冊，從概念到實作進行說明，可幫助自己事後回憶、或讓要加入... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - 「3-2-2」混合工作模式:3天實際到班、2天在家工作、2天例休。 | L14: 「3─2─2」代表什麼？發想人之一的哈佛商學院學者惠蘭斯（Ashley Whillans）解釋... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - 目標與關鍵成果(OKR)管理方式。 | L16: - 目標與關鍵成果（OKR） | Derived | MID | ✅ PASSED |
| 總之，「2021部門創新提案」涵蓋了程式開發流程改善、知識管理、以及創新的工作模式等多個層面。透過這些作法，可以提... | L2: <core_topic id="2021部門創新提案" title="2021部門創新提案" ... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |

> [!CAUTION]
> **ENFORCEMENT FAILED**: 4 unanchored claims detected. This node MUST be purged or downgraded before release.
> **LLM Draft Stats**: 29 lines → removed 13 (45%), downgraded 0. is_clean: ⚠️ false (hallucinations were filtered before this output)


---

### Node: 世界上最快樂的工作

[Synthesis](世界上最快樂的工作/synthesis.md) | [Audit](世界上最快樂的工作/audit.json) | [Source XML](世界上最快樂的工作/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| ⚠️ 此頁圖譜上下文不足，摘要僅根據單一核心節點生成。 | ❌ No direct match | Structural | LOW | ✅ PASSED |

> [!IMPORTANT]
> **ENFORCEMENT PASSED**: Final output is 100% anchored or correctly scoped.
> **LLM Draft Stats**: 3 lines → removed 1 (33%), downgraded 0. is_clean: ⚠️ false (hallucinations were filtered before this output)


---

### Node: -hp-sdlc-master-compliance-checklist-2025-edition

[Synthesis](-hp-sdlc-master-compliance-checklist-2025-edition/synthesis.md) | [Audit](-hp-sdlc-master-compliance-checklist-2025-edition/audit.json) | [Source XML](-hp-sdlc-master-compliance-checklist-2025-edition/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| 本文件概述了 HP 在 2025 年版本的 SDLC 主要合規檢查清單。它涵蓋了從定義與架構到驗證與發布的整個軟體... | L95: HP ISP Tool ( HID ) 預設只使用 2.0 | Structural | LOW | ✅ PASSED |
| - [PM/SW] 撰寫 [Security Requirements Document](https://en.... | L11: ### Saleae Logic 2 Automation Interface Documen... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - [SW] 建立 [Data Inventory Document](https://www.sans.org/... | L71: - file:///\\genesyslogic.com.tw\GenesysData\SW_... | Derived | MID | ✅ PASSED |
| - [PM] 準備合規證書 (Certificate of Compliance) 以確保生成式 AI 的使用符合... | L117: - GL3525 每個Traget 都是update到固定 offset ，所以跟原本的chi... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - [SW] 執行 [SAST (Static Application Security Testing)](ht... | L82: - Tool 在 chrome book上應該可以直接執行、更新，SW 會再討論如何測試、驗證。 | Derived | MID | ✅ PASSED |
| - [SW] 執行 [SCA (Software Composition Analysis)](https://w... | L82: - Tool 在 chrome book上應該可以直接執行、更新，SW 會再討論如何測試、驗證。 | Derived | MID | ✅ PASSED |
| - [SW] 執行 [Fuzzing](https://owasp.org/www-community/Fuzzi... | L82: - Tool 在 chrome book上應該可以直接執行、更新，SW 會再討論如何測試、驗證。 | Derived | MID | ✅ PASSED |
| - [SW] 執行 [DAST (Dynamic Application Security Testing)](h... | L82: - Tool 在 chrome book上應該可以直接執行、更新，SW 會再討論如何測試、驗證。 | Derived | MID | ✅ PASSED |
| - [SW/DevOps] 建置 [Code Signing](https://docs.microsoft.co... | L22: <related id="etoken-system-code-view-" title="E... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - [SW] 實作 [Code Signing Verification](https://docs.micros... | L6: 目前想法是透過Python 來串每個Tool ，目前找起來 i2c & Usb Trace T... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - [SW] 檢查程式碼以確保符合日誌和隱私規則。 | L71: - file:///\\genesyslogic.com.tw\GenesysData\SW_... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - (僅適用於 Mutable Firmware，不適用 OS Driver/App) | L75: - 請SE確認各OS有沒有自動喚醒 device。 | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - [PM] 準備符合 [NIST SP 800-193](https://csrc.nist.gov/publi... | L83: - SW需要討論一下 ISP tool 在燒錄時，需要明顯提示是使用 filter drive... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - [SW] 實作 Corruption/Recovery 的事件記錄 (Logging)。 | L6: 目前想法是透過Python 來串每個Tool ，目前找起來 i2c & Usb Trace T... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| 總之，本文件概述了 HP 在 2025 年版本的 SDLC 主要合規檢查清單。它涵蓋了從定義與架構到驗證與發布的整... | L95: HP ISP Tool ( HID ) 預設只使用 2.0 | Structural | LOW | ✅ PASSED |

> [!CAUTION]
> **ENFORCEMENT FAILED**: 8 unanchored claims detected. This node MUST be purged or downgraded before release.
> **LLM Draft Stats**: 56 lines → removed 7 (13%), downgraded 0. is_clean: ⚠️ false (hallucinations were filtered before this output)


---

### Node: 短期行動-vs-長期視野從混亂到有序結構化軟體建構之路

[Synthesis](短期行動-vs-長期視野從混亂到有序結構化軟體建構之路/synthesis.md) | [Audit](短期行動-vs-長期視野從混亂到有序結構化軟體建構之路/audit.json) | [Source XML](短期行動-vs-長期視野從混亂到有序結構化軟體建構之路/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| 之前的同事基本上都是配合硬體開發軟體，並沒有純軟體出生，或是說對軟體沒有熱烈喜好。Adam進來後補足了這一塊，在請... | L14: 之前的同事基本上都是配合硬體開發軟體，並沒有純軟體出生，或是說對軟體沒有熱烈喜好，Adam 進... | Derived | MID | ✅ PASSED |
| - 導入程式碼審查(code review)機制 | L22: - 導入code review 機制 | Derived | MID | ✅ PASSED |
| - 三平台(Linux, Mac, Windows)底層共用程式碼 | L27: - 三平台(Linux , Mac , Windows) 底層共code | Explicit | LOW | ✅ PASSED |
| - 增加Diagnostic Tool讓開發驗證可以更快速找到問題點 | L29: - 增加Diagnostic Tool讓開發驗證可以更快速找到問題點 | Derived | MID | ✅ PASSED |
| [Secure Firmware Recovery](./general/secure-firmware-reco... | L70: <related id="secure-firmware-recovery" title="S... | Structural | LOW | ✅ PASSED |
| [2025 Minimum Elements for a Software Bill of Materials (... | L485: Software Bill of Materials (SBOM)" path="/gener... | Structural | LOW | ✅ PASSED |
| 1. 從專案導向轉向以業務單位(BU)需求為主，導致需求變得複雜雜亂。 | L5: 8年前，進來了公司，工作的內容差別很大，以前公司是以專案為主，完全會跟著產品生產的流程來決定S... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |

> [!CAUTION]
> **ENFORCEMENT FAILED**: 1 unanchored claims detected. This node MUST be purged or downgraded before release.
> **LLM Draft Stats**: 50 lines → removed 28 (56%), downgraded 0. is_clean: ⚠️ false (hallucinations were filtered before this output)


---

### Node: 新架構導入新的chip-updatemt9052-方式

[Synthesis](新架構導入新的chip-updatemt9052-方式/synthesis.md) | [Audit](新架構導入新的chip-updatemt9052-方式/audit.json) | [Source XML](新架構導入新的chip-updatemt9052-方式/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| 在新的架構中,我們需要導入 MT9052 MCU 的更新功能。這需要在現有的程式碼中進行一些修改和設定,以支援這個... | L2: <core_topic id="新架構導入新的chip-updatemt9052-方式" ti... | Explicit | LOW | ✅ PASSED |
| 1. 在 `GlModel.cpp` 中,找到 `FW_INDICATE_NAME` 並進行相關設定,以指示 MT... | L7: 1. GlModel.cpp 裡面的FW_INDICATE_NAME | Explicit | LOW | ✅ PASSED |
| 2. 在 `SupportCtrl.h` 中,加入需要 update 的 `.h` 檔案。 | L8: 1. SupportCtrl.h 加上要update的.h檔 | Derived | MID | ✅ PASSED |
| 3. 在 `MT905xMcuCtrl.h` 中,要繼承 `IspCtrl` 介面。 | L9: 1. MT905xMcuCtrl.h 要繼承 IspCtrl | Derived | MID | ✅ PASSED |
| 4. 在 `IspCtrlManager.cpp` 的 `AcquireIspCtrl` 函數中,加入判斷條件,以... | L10: 1. IspCtrlManager.cpp 裡面的AcquireIspCtrl 加入甚麼條件要... | Explicit | LOW | ✅ PASSED |
| 5. 在 `GLHubUpdateTool.cpp` 的 `ManualUpdateFwNew` 函數中,透過上述... | L11: 1. GLHubUpdateTool.cpp 裡面的ManualUpdateFwNew 時就可... | Explicit | LOW | ✅ PASSED |
| 6. 在 `DeviceAgent.cpp` 的 `UpdateFw` 和 `IspFlash` 函數中,加入 M... | L10: 1. IspCtrlManager.cpp 裡面的AcquireIspCtrl 加入甚麼條件要... | Derived | MID | ✅ PASSED |
| 7. 在 `MT905xMcuCtrl.cpp` 的 `Isp` 函數中,實作 MT9052 MCU 的 upda... | L10: 1. IspCtrlManager.cpp 裡面的AcquireIspCtrl 加入甚麼條件要... | Explicit | LOW | ✅ PASSED |
| - [HP Hemi(Z34c) CPU3 Code Sign 驗證問題](code-sign/hp-hemiz3... | L18: <related id="hp-hemiz34c-cpu3-code-sign-驗證問題" t... | Structural | LOW | ✅ PASSED |
| - 除了 GL3590 有 hw security module 之外,其他 hub chip 是沒有的,因此必須... | L20: 除了 GL3590 有 hw security module 之外，其他hub chip 是沒... | Explicit | LOW | ✅ PASSED |
| - 在某些情況下,計算 sha256 的 hash 值會斷線,以及 rsa2048 簽章驗證會出現問題。 | L25: - 在某些情況下計算 sha256 的 hash 值會斷線， | Explicit | LOW | ✅ PASSED |
| - 需要注意一些步驟,例如必須用 U3 來跑、public key 和 signature 要做 reverse 等。 | L24: - 原本 public key & signature 是用額外的 hex 檔案來做驗證，現在... | Derived | MID | ✅ PASSED |
| - [Genesys Logic Spec](general/genesys-logic-spec.html) | L710: <related id="genesys-logic-spec" title="Genesys... | Structural | LOW | ✅ PASSED |
| - 包含了 GenesysLogic Hub 的 Vendor Command、Hub Configuration... | L713: ### GenesysLogic Hub Vendor Command | Explicit | LOW | ✅ PASSED |
| - 其中提到了 GL3590 ISP Class 和 GL3525 FW 及 Flash Configuratio... | L22: - GL3525 FW and Flash Configuration Application... | Explicit | LOW | ✅ PASSED |
| - [RTK Scaler Code Sign](code-sign/hp-rtk-scaler-code-sig... | L600: <related id="hp-rtk-scaler-code-sign" title="HP... | Structural | LOW | ✅ PASSED |
| - 介紹了 RTK Scaler 的數位簽章驗證流程,包括 SW 和 HW 兩種方式。 | L603: RTK的數位簽章, 分為HW與SW兩種, 一種Scaler只會有一種Code Sign方式 | Explicit | LOW | ✅ PASSED |
| - 可能與 MT9052 update 的簽章驗證有相似之處。 | L2: <core_topic id="新架構導入新的chip-updatemt9052-方式" ti... | Derived | MID | ✅ PASSED |
| 通過上述步驟,我們可以在新的架構中成功導入 MT9052 MCU 的 update 功能。需要注意的是,這個功能的... | L10: 1. IspCtrlManager.cpp 裡面的AcquireIspCtrl 加入甚麼條件要... | Derived | MID | ✅ PASSED |

> [!IMPORTANT]
> **ENFORCEMENT PASSED**: Final output is 100% anchored or correctly scoped.
> **LLM Draft Stats**: 38 lines → removed 5 (13%), downgraded 0. is_clean: ⚠️ false (hallucinations were filtered before this output)


---

### Node: -clawdbot-自主代理建置與資安防禦全紀錄

[Synthesis](-clawdbot-自主代理建置與資安防禦全紀錄/synthesis.md) | [Audit](-clawdbot-自主代理建置與資安防禦全紀錄/audit.json) | [Source XML](-clawdbot-自主代理建置與資安防禦全紀錄/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| - 思考挑戰：設定 AI 必須「永遠挑戰想法中的假設與前提」，在產出大量內容時需進行自我審查。 | L19: - 核心要求：所有簽署操作必須符合 FIPS 140-2 Level 3 安全標準，並採用 E... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - 問題：初次設定 google:gemini-1.5-flash 被系統誤判為 anthropic/google... | L5: - Firmware must be verified before updating to ... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - 解決：審查 `model-selection.js` 源碼後，確認供應商與模型間需使用 斜線 (/) 分隔，導... | L5: - Firmware must be verified before updating to ... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |
| - 最終配置：切換至實測存在的 `google/gemini-2.5-flash`。 `[check_models... | L5: - Firmware must be verified before updating to ... | Inferred | HIGH | 🚩 BLOCKER (Unanchored) |

> [!CAUTION]
> **ENFORCEMENT FAILED**: 4 unanchored claims detected. This node MUST be purged or downgraded before release.
> **LLM Draft Stats**: 52 lines → removed 20 (38%), downgraded 0. is_clean: ⚠️ false (hallucinations were filtered before this output)


---

### Node: -投影片大綱從餵指令到定規則

[Synthesis](-投影片大綱從餵指令到定規則/synthesis.md) | [Audit](-投影片大綱從餵指令到定規則/audit.json) | [Source XML](-投影片大綱從餵指令到定規則/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| ⚠️ 此頁圖譜上下文不足，摘要僅根據單一核心節點生成。 | ❌ No direct match | Structural | LOW | ✅ PASSED |
| 本投影片大綱介紹了從「餵指令」到「定規則」的方法,讓 AI 不再每次都重頭理解專案。主要探討了 AI 只看到部分上... | L16: 副標題: 讓 AI 不再每次都重頭理解你專案的方法 | Derived | MID | ✅ PASSED |

> [!IMPORTANT]
> **ENFORCEMENT PASSED**: Final output is 100% anchored or correctly scoped.
> **LLM Draft Stats**: 3 lines → removed 0 (0%), downgraded 0. is_clean: ✅


