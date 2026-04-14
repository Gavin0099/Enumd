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

| Claim | Evidence (Source XML) | Tier | Risk |
| :--- | :--- | :--- | :--- |
| 以下是針對「研發投扺專案資料列印流程」的詳細文件: | L2: <core_topic id="研發投扺專案資料列印流程" title="研發投扺專案資料列印... | Inferred | HIGH |
| 開啟工作週報的步驟如下: | ❌ No direct match | Inferred | HIGH |
| 開啟工作週報，選擇關鍵字搜尋 | ❌ No direct match | Inferred | HIGH |
| 輸入有參與的專案代號進行查詢，注意不要輸入年度，否則會得到不完整的資料 | ❌ No direct match | Inferred | HIGH |
| 勾選所有 2020 年的週報，然後按下匯出網頁 | L8: 1. 勾選所有2020的週報，按下匯出網頁 | Derived | MID |
| 系統會匯出所有 2020 年關於此專案的週報，接下來即可直接列印 | L8: 1. 勾選所有2020的週報，按下匯出網頁 | Derived | MID |
| 生成 ECDSA 金鑰並進行簽章 | ❌ No direct match | Inferred | HIGH |
| 告知如何清除 Camera 的方式 - 驗證失敗時需要清除 | L17: 1. 告知如何Erase Camera 的方式 —> verify fail 要 erase 掉 | Derived | MID |
| 告知如何讀取 Camera 資料 - Hub 安全模型必須能讀取到更新的資料才能計算雜湊值 | L13: <related id="camera-透過我們驗證-code-sign" title="Ca... | Derived | MID |
| 可以改成告知我們所有的更新流程以及相對應的文件，讓我們控制整個更新過程 | ❌ No direct match | Inferred | HIGH |

---

### Node: 憑證檔案

[Synthesis](憑證檔案/synthesis.md) | [Audit](憑證檔案/audit.json) | [Source XML](憑證檔案/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk |
| :--- | :--- | :--- | :--- |
| ⚠️ 此頁圖譜上下文不足，摘要僅根據單一核心節點生成 | ❌ No direct match | Inferred | HIGH |
| 憑證檔案是用於驗證數位身份的重要檔案 | ❌ No direct match | Inferred | HIGH |
| 它們在 Windows 和 Mac 作業系統上都有相關的處理方式 | L4: ### Windows | Derived | MID |

---

### Node: ai-協作開發框架定義規則的開發模式

[Synthesis](ai-協作開發框架定義規則的開發模式/synthesis.md) | [Audit](ai-協作開發框架定義規則的開發模式/audit.json) | [Source XML](ai-協作開發框架定義規則的開發模式/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk |
| :--- | :--- | :--- | :--- |
| ⚠️ 此頁圖譜上下文不足，摘要僅根據單一核心節點生成 | ❌ No direct match | Inferred | HIGH |
| 這套 AI 開發治理體系旨在透過嚴格的檔案結構與行為規範，確保跨平台開發與底層原生對接的品質與安全 | ❌ No direct match | Inferred | HIGH |
| 其中包含七大核心治理文件，定義了 Agent 的思維模式、系統架構紅線、測試要求等規範 | L6: > 💡 語言策略：治理文件以英文撰寫以降低 Token 消耗；Agent 所有輸出仍強制使用... | Derived | MID |

---

### Node: 2021部門創新提案

[Synthesis](2021部門創新提案/synthesis.md) | [Audit](2021部門創新提案/audit.json) | [Source XML](2021部門創新提案/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk |
| :--- | :--- | :--- | :--- |
| 根據提供的內容，我們可以歸納出以下關於「2021部門創新提案」的重點: | L2: <core_topic id="2021部門創新提案" title="2021部門創新提案" ... | Inferred | HIGH |
| - Code Review: 在其他部門提出需求時，需要有正式的規格說明文件，並進行審查 | L5: - Code Review | Derived | MID |
| 完成後整理成完整的文件留存 | ❌ No direct match | Inferred | HIGH |
| - 使用相關軟體了解 BU 需求的優先順序 | L7: - 利用相關軟體，讓大家了解目前BU 需求的優先順序 | Derived | MID |
| - 每個人分享自己擅長的技術，讓大家增加知識，了解不同部門的工作 | ❌ No direct match | Inferred | HIGH |
| - 持續精進工作流程，主動提出問題並尋求改進 | ❌ No direct match | Inferred | HIGH |
| - 為重要專案和軟體撰寫詳細的使用手冊 | ❌ No direct match | Inferred | HIGH |
| - `3-2-2` 工作模式: 3 天實體上班，2 天在家工作，2 天例假 | ❌ No direct match | Inferred | HIGH |
| - 目標與關鍵成果 (OKR): 透過目標和關鍵成果讓團隊了解「要做什麼」和「如何做」 | L16: - 目標與關鍵成果（OKR） | Derived | MID |
| - 番茄鐘工作法: 使用番茄鐘技術提高工作效率 | ❌ No direct match | Inferred | HIGH |

---

### Node: 世界上最快樂的工作

[Synthesis](世界上最快樂的工作/synthesis.md) | [Audit](世界上最快樂的工作/audit.json) | [Source XML](世界上最快樂的工作/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk |
| :--- | :--- | :--- | :--- |
| ⚠️ 此頁圖譜上下文不足，摘要僅根據單一核心節點生成 | ❌ No direct match | Inferred | HIGH |
| 工作是獲得經濟報酬的活動 | ❌ No direct match | Inferred | HIGH |
| 工作和快樂之間存在正相關關係,可以從工作中發現樂趣、享受成就感、建立良好的人際關係等方式來提升工作的快樂感 | ❌ No direct match | Inferred | HIGH |
| 如果工作不快樂,可以透過探索自己的志向或無條件基本收入等方式來改善 | L14: ### 如果工作不快樂，有什麼辦法讓大家比較快樂 | Inferred | HIGH |

---

### Node: -hp-sdlc-master-compliance-checklist-2025-edition

[Synthesis](-hp-sdlc-master-compliance-checklist-2025-edition/synthesis.md) | [Audit](-hp-sdlc-master-compliance-checklist-2025-edition/audit.json) | [Source XML](-hp-sdlc-master-compliance-checklist-2025-edition/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk |
| :--- | :--- | :--- | :--- |
| 以下是 HP SDLC Master Compliance Checklist (2025 Edition) 的詳... | L2: <core_topic id="-hp-sdlc-master-compliance-chec... | Explicit | LOW |
| 本文件概述了 HP 在 2025 年版本的 SDLC Master Compliance Checklist | L2: <core_topic id="-hp-sdlc-master-compliance-chec... | Explicit | LOW |
| 它涵蓋了軟體開發生命週期的各個階段,確保產品符合安全性和合規性要求 | ❌ No direct match | Inferred | HIGH |
| 1 安全需求定義 (Security Requirements) | L8: ### 3.1 安全需求定義 (Security Requirements) | Explicit | LOW |
| - [PM/SW] 撰寫 [Security Requirements Document](https://en | L9: - [PM/SW] 撰寫 Security Requirements Document | Explicit | LOW |
| org/wiki/Software_requirements_specification)，明確定義產品的安全性需求 | ❌ No direct match | Inferred | HIGH |
| 2 資料清單 (Inventory of Data) | L10: ### 3.2 資料清單 (Inventory of Data) | Explicit | LOW |
| - [SW] 建立 [Data Inventory Document](https://www | L11: - [SW] 建立 Data Inventory Document | Explicit | LOW |
| org/white-papers/33193/)，詳細列出產品中使用的所有資料類型 | ❌ No direct match | Inferred | HIGH |
| 3 威脅建模 (Threat Modeling) | L12: ### 3.3 威脅建模 (Threat Modeling) | Explicit | LOW |

---

### Node: 短期行動-vs-長期視野從混亂到有序結構化軟體建構之路

[Synthesis](短期行動-vs-長期視野從混亂到有序結構化軟體建構之路/synthesis.md) | [Audit](短期行動-vs-長期視野從混亂到有序結構化軟體建構之路/audit.json) | [Source XML](短期行動-vs-長期視野從混亂到有序結構化軟體建構之路/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk |
| :--- | :--- | :--- | :--- |
| 8年前，我進入公司工作，工作內容與以前有很大差別 | ❌ No direct match | Inferred | HIGH |
| 以前公司是以專案為主，完全會跟著產品生產的流程來決定軟體要做到哪個地步 | ❌ No direct match | Inferred | HIGH |
| 但是現在的做法是根據各業務單位 (BU) 的需求來提供服務，所以BU有什麼想法，我們就要做出相應的工具 | ❌ No direct match | Inferred | HIGH |
| 這造成需求變得多又雜亂，導致為了趕時間，只要求工具能用就好，就變成了我進來時看到的情況： | ❌ No direct match | Inferred | HIGH |
| - 有SVN版控，但並非所有工具都有，只有長期Release的工具才有 | ❌ No direct match | Inferred | HIGH |
| - BU所需的工具根據每個人的習慣不一定 | ❌ No direct match | Inferred | HIGH |
| - 因為BU所需要的工具，最基本的程式碼還是大同小異，為了快速改完需求，直接從SVN裡面複製一份出來改是最快的，就... | ❌ No direct match | Inferred | HIGH |
| 先以底層程式碼統一為主，先把所有目前有用到的原始程式碼的底層做整合，讓所有的工具都呼叫同一個底層的程式碼，但是還是... | ❌ No direct match | Inferred | HIGH |
| - 整理所有用到的工具，分析是否有底層程式碼可以合併的 | ❌ No direct match | Inferred | HIGH |
| - 整理工具相關文件，讓雜亂無章的資訊可以整合起來 | ❌ No direct match | Inferred | HIGH |

---

### Node: 新架構導入新的chip-updatemt9052-方式

[Synthesis](新架構導入新的chip-updatemt9052-方式/synthesis.md) | [Audit](新架構導入新的chip-updatemt9052-方式/audit.json) | [Source XML](新架構導入新的chip-updatemt9052-方式/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk |
| :--- | :--- | :--- | :--- |
| 根據提供的內容,我們可以了解到新架構導入新的chip update(MT9052)方式的主要步驟如下: | L2: <core_topic id="新架構導入新的chip-updatemt9052-方式" ti... | Inferred | HIGH |
| cpp` 的 `FW_INDICATE_NAME` 中加入 MT9052 的相關定義 | L2: <core_topic id="新架構導入新的chip-updatemt9052-方式" ti... | Derived | MID |
| 在 `SupportCtrl | ❌ No direct match | Inferred | HIGH |
| h` 中加入要 update 的 ` | L2: <core_topic id="新架構導入新的chip-updatemt9052-方式" ti... | Derived | MID |
| 在 `MT905xMcuCtrl | ❌ No direct match | Inferred | HIGH |
| h` 中,MT9052 的 MCU 控制器需要繼承 `IspCtrl` 介面 | L2: <core_topic id="新架構導入新的chip-updatemt9052-方式" ti... | Derived | MID |
| 在 `IspCtrlManager | ❌ No direct match | Inferred | HIGH |
| cpp` 的 `AcquireIspCtrl` 函數中,加入導入 MT9052 update 功能的條件判斷 | L2: <core_topic id="新架構導入新的chip-updatemt9052-方式" ti... | Derived | MID |
| 在 `GLHubUpdateTool | ❌ No direct match | Inferred | HIGH |
| cpp` 的 `ManualUpdateFwNew` 函數中,可以透過上述設定導入 MT9052 MCU 的 up... | L2: <core_topic id="新架構導入新的chip-updatemt9052-方式" ti... | Explicit | LOW |

---

### Node: -clawdbot-自主代理建置與資安防禦全紀錄

[Synthesis](-clawdbot-自主代理建置與資安防禦全紀錄/synthesis.md) | [Audit](-clawdbot-自主代理建置與資安防禦全紀錄/audit.json) | [Source XML](-clawdbot-自主代理建置與資安防禦全紀錄/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk |
| :--- | :--- | :--- | :--- |
| 穩定執行中 (Stable) ✅ | L5: 系統狀態： 穩定執行中 (Stable) ✅ | Derived | MID |
| 在系統初始設定中，我們定義了最高指導原則，確保 AI 運作兼具深度與安全： | L7: 在系統初始設定中，我們定義了最高指導原則，確保 AI 運作兼具深度與安全： | Derived | MID |
| 語言規範：強制要求所有回覆與指令說明均以 繁體中文 進行 | L8: - 語言規範：強制要求所有回覆與指令說明均以 繁體中文 進行。 | Derived | MID |
| 思考挑戰：設定 AI 必須「永遠挑戰想法中的假設與前提」，在產出大量內容時需進行自我審查 | L9: - 思考挑戰：設定 AI 必須「永遠挑戰想法中的假設與前提」，在產出大量內容時需進行自我審查。 | Derived | MID |
| 自主代理角色：定義為精通系統自動化與 Clawdbot 架構的資深開發者，專注於權限管理與流程優化 | L10: - 自主代理角色：定義為精通系統自動化與 Clawdbot 架構的資深開發者，專注於權限管理與... | Derived | MID |
| - 問題：初次設定 google:gemini-1 | L13: - 問題：初次設定 google:gemini-1.5-flash 被系統誤判為 anthro... | Derived | MID |
| 5-flash 被系統誤判為 anthropic/google | L13: - 問題：初次設定 google:gemini-1.5-flash 被系統誤判為 anthro... | Derived | MID |
| - 解決：審查 `model-selection | L14: - 解決：審查 model-selection.js 源碼後，確認供應商與模型間需使用 斜線 ... | Derived | MID |
| js` 源碼後，確認供應商與模型間需使用 斜線 (/) 分隔，導正為 `google/gemini-1 | L14: - 解決：審查 model-selection.js 源碼後，確認供應商與模型間需使用 斜線 ... | Explicit | LOW |
| `[model-selection | L14: - 解決：審查 model-selection.js 源碼後，確認供應商與模型間需使用 斜線 ... | Inferred | HIGH |

---

### Node: -投影片大綱從餵指令到定規則

[Synthesis](-投影片大綱從餵指令到定規則/synthesis.md) | [Audit](-投影片大綱從餵指令到定規則/audit.json) | [Source XML](-投影片大綱從餵指令到定規則/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk |
| :--- | :--- | :--- | :--- |
| ⚠️ 此頁圖譜上下文不足，摘要僅根據單一核心節點生成 | ❌ No direct match | Inferred | HIGH |
| 本投影片大綱介紹了從「餵指令」到「定規則」的方法,讓 AI 不再每次都重頭理解專案 | L2: <core_topic id="-投影片大綱從餵指令到定規則" title="🛡️ 投影片大... | Inferred | HIGH |
| 主要內容包括:1) AI 只能看到專案的冰山一角,無法理解隱藏的上下文和結構;2) 沒有適當的治理,AI 會產生記... | L74: 1. 插件式治理: 這 7 份核心檔案 (SYSTEM_PROMPT、ARCHITECTURE... | Inferred | HIGH |

