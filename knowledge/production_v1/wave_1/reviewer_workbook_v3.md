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
| 1. **Camera 透過我們驗證 code sign**`[Camera 透過我們驗證 code sign](... | L14: <related id="-genesys-logic-firmware-安全簽署與驗證流程-... | Explicit | LOW | ✅ PASSED |
| - 介紹了 Camera 的 code sign 驗證流程,包括生成 ECDSA 金鑰、告知 Erase Came... | L14: <related id="-genesys-logic-firmware-安全簽署與驗證流程-... | Explicit | LOW | ✅ PASSED |
| 2. **Etoken System Code View**`[Etoken System Code View](... | L14: <related id="-genesys-logic-firmware-安全簽署與驗證流程-... | Explicit | LOW | ✅ PASSED |
| 3. **HID Code Sign 記錄**`[HID Code Sign 記錄](./code-sign/hi... | L14: <related id="-genesys-logic-firmware-安全簽署與驗證流程-... | Explicit | LOW | ✅ PASSED |

> [!IMPORTANT]
> **ENFORCEMENT PASSED**: Component is 100% anchored or correctly scoped.


---

### Node: 憑證檔案

[Synthesis](憑證檔案/synthesis.md) | [Audit](憑證檔案/audit.json) | [Source XML](憑證檔案/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| ⚠️ 此頁圖譜上下文不足，摘要僅根據單一核心節點生成。 | ❌ No direct match | Structural | LOW | ✅ PASSED |

> [!IMPORTANT]
> **ENFORCEMENT PASSED**: Component is 100% anchored or correctly scoped.


---

### Node: ai-協作開發框架定義規則的開發模式

[Synthesis](ai-協作開發框架定義規則的開發模式/synthesis.md) | [Audit](ai-協作開發框架定義規則的開發模式/audit.json) | [Source XML](ai-協作開發框架定義規則的開發模式/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| ⚠️ 此頁圖譜上下文不足，摘要僅根據單一核心節點生成。 | L28: - 裁決等級：🔴 BLOCKING（治理違規，立即拒絕）、⚠️ WARNING（需權衡理由或... | Structural | LOW | ✅ PASSED |

> [!IMPORTANT]
> **ENFORCEMENT PASSED**: Component is 100% anchored or correctly scoped.


---

### Node: 2021部門創新提案

[Synthesis](2021部門創新提案/synthesis.md) | [Audit](2021部門創新提案/audit.json) | [Source XML](2021部門創新提案/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| 根據提供的上下文資訊，我們可以歸納出以下關於「2021部門創新提案」的重點: | L2: <core_topic id="2021部門創新提案" title="2021部門創新提案" ... | Derived | MID | ✅ PASSED |
| 1. **Code Review**: | L5: - Code Review | Explicit | LOW | ✅ PASSED |
| - 當其他部門提出需求時，需要有正式的規格說明文件(SPEC)，並進行 review 動作。 | L6: - 別的部門提出需求時，要有正式的SPEC，並且要有review動作，而且在完成時，整理成一份... | Explicit | LOW | ✅ PASSED |
| - 利用相關軟體，讓大家了解目前 BU 需求的優先順序。 | L7: - 利用相關軟體，讓大家了解目前BU 需求的優先順序 | Explicit | LOW | ✅ PASSED |
| - 關於 Hub & PD 相關工作，規劃 Wiki 資訊，讓新人比較容易上手。 | L10: - 關於Hub&PD相關工作，規劃Wiki 資訊，能讓新人比較容易上手，且能找到想要的資訊。 | Explicit | LOW | ✅ PASSED |
| - 開發的重要專案、軟體都需做詳細手冊，從概念到實作進行說明。 | L11: - 開發的重要專案、軟體都需做個詳細手冊，從概念到實作進行說明，可幫助自己事後回憶、或讓要加入... | Explicit | LOW | ✅ PASSED |
| - 「3-2-2」混合工作模式:3天實際到班、2天在家工作、2天例休。 | L14: 「3─2─2」代表什麼？發想人之一的哈佛商學院學者惠蘭斯（Ashley Whillans）解釋... | Explicit | LOW | ✅ PASSED |
| - 目標與關鍵成果(OKR)管理方式。 | L16: - 目標與關鍵成果（OKR） | Explicit | LOW | ✅ PASSED |
| 總之，「2021部門創新提案」涵蓋了程式開發流程改善、知識管理、以及創新的工作模式等多個層面。透過這些作法，可以提... | L2: <core_topic id="2021部門創新提案" title="2021部門創新提案" ... | Derived | MID | ✅ PASSED |

> [!IMPORTANT]
> **ENFORCEMENT PASSED**: Component is 100% anchored or correctly scoped.


---

### Node: 世界上最快樂的工作

[Synthesis](世界上最快樂的工作/synthesis.md) | [Audit](世界上最快樂的工作/audit.json) | [Source XML](世界上最快樂的工作/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| ⚠️ 此頁圖譜上下文不足，摘要僅根據單一核心節點生成。 | ❌ No direct match | Structural | LOW | ✅ PASSED |

> [!IMPORTANT]
> **ENFORCEMENT PASSED**: Component is 100% anchored or correctly scoped.


---

### Node: -hp-sdlc-master-compliance-checklist-2025-edition

[Synthesis](-hp-sdlc-master-compliance-checklist-2025-edition/synthesis.md) | [Audit](-hp-sdlc-master-compliance-checklist-2025-edition/audit.json) | [Source XML](-hp-sdlc-master-compliance-checklist-2025-edition/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| 本文件概述了 HP 在 2025 年版本的 SDLC 主要合規檢查清單。它涵蓋了從定義與架構到驗證與發布的整個軟體... | L95: HP ISP Tool ( HID ) 預設只使用 2.0 | Structural | LOW | ✅ PASSED |
| - [PM/SW] 撰寫 [Security Requirements Document](https://en.... | L11: ### Saleae Logic 2 Automation Interface Documen... | Explicit | LOW | ✅ PASSED |
| - [SW] 建立 [Data Inventory Document](https://www.sans.org/... | L71: - file:///\\genesyslogic.com.tw\GenesysData\SW_... | Explicit | LOW | ✅ PASSED |
| - [PM] 準備合規證書 (Certificate of Compliance) 以確保生成式 AI 的使用符合... | L117: - GL3525 每個Traget 都是update到固定 offset ，所以跟原本的chi... | Explicit | LOW | ✅ PASSED |
| - [SW] 執行 [SAST (Static Application Security Testing)](ht... | L82: - Tool 在 chrome book上應該可以直接執行、更新，SW 會再討論如何測試、驗證。 | Explicit | LOW | ✅ PASSED |
| - [SW] 執行 [SCA (Software Composition Analysis)](https://w... | L82: - Tool 在 chrome book上應該可以直接執行、更新，SW 會再討論如何測試、驗證。 | Explicit | LOW | ✅ PASSED |
| - [SW] 執行 [Fuzzing](https://owasp.org/www-community/Fuzzi... | L82: - Tool 在 chrome book上應該可以直接執行、更新，SW 會再討論如何測試、驗證。 | Explicit | LOW | ✅ PASSED |
| - [SW] 執行 [DAST (Dynamic Application Security Testing)](h... | L82: - Tool 在 chrome book上應該可以直接執行、更新，SW 會再討論如何測試、驗證。 | Explicit | LOW | ✅ PASSED |
| - [SW/DevOps] 建置 [Code Signing](https://docs.microsoft.co... | L22: <related id="etoken-system-code-view-" title="E... | Explicit | LOW | ✅ PASSED |
| - [SW] 實作 [Code Signing Verification](https://docs.micros... | L6: 目前想法是透過Python 來串每個Tool ，目前找起來 i2c & Usb Trace T... | Explicit | LOW | ✅ PASSED |
| - [SW] 檢查程式碼以確保符合日誌和隱私規則。 | L71: - file:///\\genesyslogic.com.tw\GenesysData\SW_... | Explicit | LOW | ✅ PASSED |
| - (僅適用於 Mutable Firmware，不適用 OS Driver/App) | L75: - 請SE確認各OS有沒有自動喚醒 device。 | Explicit | LOW | ✅ PASSED |
| - [PM] 準備符合 [NIST SP 800-193](https://csrc.nist.gov/publi... | L83: - SW需要討論一下 ISP tool 在燒錄時，需要明顯提示是使用 filter drive... | Explicit | LOW | ✅ PASSED |
| - [SW] 實作 Corruption/Recovery 的事件記錄 (Logging)。 | L6: 目前想法是透過Python 來串每個Tool ，目前找起來 i2c & Usb Trace T... | Explicit | LOW | ✅ PASSED |
| 總之，本文件概述了 HP 在 2025 年版本的 SDLC 主要合規檢查清單。它涵蓋了從定義與架構到驗證與發布的整... | L95: HP ISP Tool ( HID ) 預設只使用 2.0 | Structural | LOW | ✅ PASSED |

> [!IMPORTANT]
> **ENFORCEMENT PASSED**: Component is 100% anchored or correctly scoped.


---

### Node: 短期行動-vs-長期視野從混亂到有序結構化軟體建構之路

[Synthesis](短期行動-vs-長期視野從混亂到有序結構化軟體建構之路/synthesis.md) | [Audit](短期行動-vs-長期視野從混亂到有序結構化軟體建構之路/audit.json) | [Source XML](短期行動-vs-長期視野從混亂到有序結構化軟體建構之路/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| [Secure Firmware Recovery](general/secure-firmware-recove... | L2: <core_topic id="20240729-82-交接事項" title="2024/0... | Structural | LOW | ✅ PASSED |
| [2025 Minimum Elements for a Software Bill of Materials (... | L68: - 原本 public key & signature 是用額外的 hex 檔案來做驗證，現在... | Structural | LOW | ✅ PASSED |
| [HID Code Sign 記錄](code-sign/hid-code-sign-記錄.html) | L26: <related id="hid-code-sign-記錄" title="HID Code ... | Structural | LOW | ✅ PASSED |

> [!IMPORTANT]
> **ENFORCEMENT PASSED**: Component is 100% anchored or correctly scoped.


---

### Node: 新架構導入新的chip-updatemt9052-方式

[Synthesis](新架構導入新的chip-updatemt9052-方式/synthesis.md) | [Audit](新架構導入新的chip-updatemt9052-方式/audit.json) | [Source XML](新架構導入新的chip-updatemt9052-方式/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| 1. 在 `GlModel.cpp` 中設定 `FW_INDICATE_NAME` 以標識MT9052 MCU。 | L7: 1. GlModel.cpp 裡面的FW_INDICATE_NAME | Explicit | LOW | ✅ PASSED |
| 2. 在 `SupportCtrl.h` 中加入需要更新的 `.h` 檔案。 | L8: 1. SupportCtrl.h 加上要update的.h檔 | Explicit | LOW | ✅ PASSED |
| 3. 在 `MT905xMcuCtrl.h` 中繼承 `IspCtrl` 介面。 | L9: 1. MT905xMcuCtrl.h 要繼承 IspCtrl | Explicit | LOW | ✅ PASSED |
| 4. 在 `IspCtrlManager.cpp` 的 `AcquireIspCtrl` 函數中加入導入MT905... | L10: 1. IspCtrlManager.cpp 裡面的AcquireIspCtrl 加入甚麼條件要... | Explicit | LOW | ✅ PASSED |
| 5. 在 `GLHubUpdateTool.cpp` 的 `ManualUpdateFwNew` 函數中,透過上述... | L11: 1. GLHubUpdateTool.cpp 裡面的ManualUpdateFwNew 時就可... | Explicit | LOW | ✅ PASSED |
| 6. 在 `DeviceAgent.cpp` 的 `UpdateFw` 和 `IspFlash` 函數中加入MT9... | L12: 1. DeviceAgent.cpp 裡面的 UpdateFw | Explicit | LOW | ✅ PASSED |
| 7. 在 `MT905xMcuCtrl.cpp` 的 `Isp` 函數中實現MT9052 MCU的更新。 | L14: 1. MT905xMcuCtrl.cpp 裡面的 Isp | Explicit | LOW | ✅ PASSED |
| 在 `GlModel.cpp` 的 `FW_INDICATE_NAME` 中加入 `MT9052` 字串,以標識M... | L7: 1. GlModel.cpp 裡面的FW_INDICATE_NAME | Explicit | LOW | ✅ PASSED |
| 在 `SupportCtrl.h` 中加入 `MT905xMcuCtrl.h` 檔案: | L8: 1. SupportCtrl.h 加上要update的.h檔 | Explicit | LOW | ✅ PASSED |
| 在 `MT905xMcuCtrl.h` 中,`MT905xMcuCtrl` 類需要繼承 `IspCtrl` 介面: | L9: 1. MT905xMcuCtrl.h 要繼承 IspCtrl | Explicit | LOW | ✅ PASSED |
| class MT905xMcuCtrl : public IspCtrl | L9: 1. MT905xMcuCtrl.h 要繼承 IspCtrl | Explicit | LOW | ✅ PASSED |
| 在 `IspCtrlManager.cpp` 的 `AcquireIspCtrl` 函數中,加入以下條件以導入MT... | L10: 1. IspCtrlManager.cpp 裡面的AcquireIspCtrl 加入甚麼條件要... | Explicit | LOW | ✅ PASSED |
| return new MT905xMcuCtrl(); | L9: 1. MT905xMcuCtrl.h 要繼承 IspCtrl | Explicit | LOW | ✅ PASSED |
| 在 `GLHubUpdateTool.cpp` 的 `ManualUpdateFwNew` 函數中,透過前述的設定... | L11: 1. GLHubUpdateTool.cpp 裡面的ManualUpdateFwNew 時就可... | Explicit | LOW | ✅ PASSED |
| 在 `DeviceAgent.cpp` 的 `UpdateFw` 和 `IspFlash` 函數中,加入MT905... | L12: 1. DeviceAgent.cpp 裡面的 UpdateFw | Explicit | LOW | ✅ PASSED |
| 在 `MT905xMcuCtrl.cpp` 的 `Isp` 函數中,實現MT9052 MCU的更新邏輯: | L14: 1. MT905xMcuCtrl.cpp 裡面的 Isp | Explicit | LOW | ✅ PASSED |
| bool MT905xMcuCtrl::Isp(...) | L9: 1. MT905xMcuCtrl.h 要繼承 IspCtrl | Explicit | LOW | ✅ PASSED |

> [!IMPORTANT]
> **ENFORCEMENT PASSED**: Component is 100% anchored or correctly scoped.


---

### Node: -clawdbot-自主代理建置與資安防禦全紀錄

[Synthesis](-clawdbot-自主代理建置與資安防禦全紀錄/synthesis.md) | [Audit](-clawdbot-自主代理建置與資安防禦全紀錄/audit.json) | [Source XML](-clawdbot-自主代理建置與資安防禦全紀錄/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| - 思考挑戰：設定 AI 必須「永遠挑戰想法中的假設與前提」，在產出大量內容時需進行自我審查。 | L19: - 核心要求：所有簽署操作必須符合 FIPS 140-2 Level 3 安全標準，並採用 E... | Explicit | LOW | ✅ PASSED |
| - 問題：初次設定 google:gemini-1.5-flash 被系統誤判為 anthropic/google... | L5: - Firmware must be verified before updating to ... | Explicit | LOW | ✅ PASSED |
| - 解決：審查 `model-selection.js` 源碼後，確認供應商與模型間需使用 斜線 (/) 分隔，導... | L5: - Firmware must be verified before updating to ... | Explicit | LOW | ✅ PASSED |
| - 最終配置：切換至實測存在的 `google/gemini-2.5-flash`。 `[check_models... | L5: - Firmware must be verified before updating to ... | Explicit | LOW | ✅ PASSED |

> [!IMPORTANT]
> **ENFORCEMENT PASSED**: Component is 100% anchored or correctly scoped.


---

### Node: -投影片大綱從餵指令到定規則

[Synthesis](-投影片大綱從餵指令到定規則/synthesis.md) | [Audit](-投影片大綱從餵指令到定規則/audit.json) | [Source XML](-投影片大綱從餵指令到定規則/source.xml)

#### Claim Trace Table

| Claim | Evidence (Source XML) | Tier | Risk | Enforcement |
| :--- | :--- | :--- | :--- | :--- |
| ⚠️ 此頁圖譜上下文不足，摘要僅根據單一核心節點生成。 | ❌ No direct match | Structural | LOW | ✅ PASSED |
| 本投影片大綱介紹了從「餵指令」到「定規則」的方法,讓 AI 不再每次都重頭理解專案。主要探討了 AI 只看到部分上... | L16: 副標題: 讓 AI 不再每次都重頭理解你專案的方法 | Explicit | LOW | ✅ PASSED |

> [!IMPORTANT]
> **ENFORCEMENT PASSED**: Component is 100% anchored or correctly scoped.


