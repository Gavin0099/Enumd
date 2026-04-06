---
title: |-
  2025 Minimum Elements for a
  Software Bill of Materials (SBOM)
domain_tags:
  - tools
  - security
task_tags:
  - debug
  - release
  - sop
authority_level: source
is_deprecated: false
category: tools
notion_id: 2c564f6b-c656-801f-9dc8-d7c64141aee5
notion_url: >-
  https://www.notion.so/2025-Minimum-Elements-for-a-Software-Bill-of-Materials-SBOM-2c564f6bc656801f9dc8d7c64141aee5
notion_updated_at: '2026-01-21T09:39:00.000Z'
exported_at: '2026-04-06T13:19:35.920Z'
is_summarized: false
relations: []
---

### 簡介 (Introduction)
這一節解釋了 SBOM 的定義以及為何需要更新 2021 年的標準。
- SBOM 的定義： SBOM 是軟體安全與供應鏈風險管理的關鍵基石 。它是一份「巢狀清單 (nested inventory)」，即構成軟體應用程式與系統的成分表 。
- 歷史背景： NTIA 在 2021 年發布了最初的《SBOM 最低要素》，反映了當時的技術成熟度與社群意識 。
- 技術演進： 自 2021 年以來，隨著軟體生產者、選擇者 (Choosers) 與維運者 (Operators) 的需求增加，SBOM 工具已顯著成熟 。專家合作與實踐創新推動了技術現狀的進步 。
- 更新目的： 本文件依據 OMB M-22-18 備忘錄進行更新，旨在反映當前的實作成熟度 。它更新了美國機構生成或請求 SBOM 時的基準資料欄位、實踐與流程 。
### 為何需要 SBOM：增強透明度與安全性 (Why SBOM: Enhancing Transparency and Security)
這一節闡述了 SBOM 的核心價值與運作邏輯。
- 提升透明度： SBOM 是實現軟體組件透明化的關鍵步驟，能照亮供應鏈，讓組織能做出基於風險的決策 。
- 風險緩解： 作為「成分表」，SBOM 為組織提供數據，這些數據可轉化為洞察，用以緩解可能危害系統安全的風險 。
- 機器可讀與可擴展性： 有效的共享機制必須是機器可讀 (machine-processable) 且可擴展的 。SBOM 模型透過捕捉機器可讀格式的數據，支援自動化分析、共享與管理 。
- 整合應用： SBOM 數據可以對應到其他數據源（如資安公告或組織內部的「核准/未核准」軟體資料庫），以改善安全開發與漏洞管理等優先事項 。
- 定位： SBOM 無法解決所有的軟體安全與供應鏈問題，但它是實現「風險導向決策」的必要步驟 。
### 為何需要最低要素：大規模驅動安全性 (Why Minimum Elements: Driving Security at Scale)
這一節解釋了為什麼不能只依靠自定義標準，而必須建立統一的「底線」。
- 建立基準： 最低要素規定了 SBOM 應達到的技術與實踐基準 。
- 手動處理不可行： 機構使用的軟體數量過於龐大，無法透過人工流程有效地評估與緩解風險 。
- 國家安全風險： 鑑於軟體在關鍵基礎設施中的作用，未被追蹤與管理的軟體將對國家安全構成威脅 。
- 統一需求： 上述條件強調了美國各機構之間需要一個通用的 SBOM 數據基準 。
- 促進共享： 統一的期望有助於機構將 SBOM 數據應用於安全實踐，並促進機構間的資訊共享 。
- 全球共識： 這不僅限於美國政府；全球軟體生態系統與從業人員都已認識到 SBOM 在提升透明度上的價值，並推動了其採用與技術實作 。隨著採用率擴大，協調各界對 SBOM 的期望變得越來越重要 。
### 範圍 (Scope)
這一節界定了這份文件適用於哪些類型的軟體，以及哪些細節不在討論範圍內。
- 適用對象： 適用於機構獲取或開發的軟體及其組件，明確包含：
- 複雜系統的處理： 雖然 AI 或 SaaS 等複雜系統可能需要「額外要素」才能獲得完整的透明度，但它們的 SBOM 仍必須包含 本文件規定的最低要素 。至於那些針對特定軟體類型的「額外要素」，則不在本文件範圍內 。
- 規範性質： 這些最低要素並非創造新的聯邦要求，而是「細化/優化」聯邦政府應如何生成與請求 SBOM 。
- 排除項目： 資料管理 (Data management)、儲存實踐 (Storage practices) 以及精確的編碼細節 (Precise encoding details) 不在本報告範圍內 。
### 最低要素概觀 (Minimum Elements Overview)
- 演進的方法： 最低要素旨在捕捉技術與功能運作，並隨著時間推移，未來的規範將納入更多細節與技術進步 。
- 三大類別： 最低要素分為以下三類 ：
### SBOM 的結構邏輯 (Structure of an SBOM)
- 層次結構： SBOM 具有大致的層次結構；軟體由組件 (components) 組成，每個組件可能有子組件，以此類推 。
- 組件類型：
- 遞迴要求： 每個組件都應該有自己的 SBOM 來捕捉其子組件和依賴關係層次 。
- 機器可讀： 這些資料欄位適用於每個組件，且必須依賴工具和定義好的格式來達成機器可讀性 。
### 資料欄位總論 (Data Fields)
- 核心目標： SBOM 的核心是一個一致、統一的結構，用於理解構成軟體的組件 。
- 用途： 這些欄位的目標是提供足夠的識別資訊，以便在軟體供應鏈中追蹤組件，並將其對應到其他有用的資料來源（如漏洞資料庫或授權資料庫）。
### SBOM 作者 (SBOM Author) - 重大更新
- 定義： 創建該組件 SBOM 資料的實體名稱 。
- 區別： 此欄位與「軟體生產者 (Software Producer)」不同，後者是指製造該軟體組件的人 。
- 邏輯情境：
### 軟體生產者 (Software Producer) - 重大更新
- 定義： 創建、定義和識別元件的實體名稱 。
- 內容： 這是一個可讀的字串，用於識別軟體元件的原始製造商或發起者 。
- 目的： 讓組織了解生產者資訊，並識別安全問題的聯絡窗口 。
- 多重紀錄： 此欄位應允許記錄多個條目 。
- 開源軟體處理： 開源專案的命名慣例可能有所不同（依據套件管理器或專案組織）。若無明確慣例，作者應使用原始專案或維護組織名稱 。
- 來源不明處理： 如果沒有明確的軟體生產者指示，SBOM 作者必須明確標示該元件為「來源不明 (unknown provenance)」，以承認其缺乏可追溯性 。
- 變更背景： 此欄位取代了舊版的「供應商名稱 (Supplier Name)」，因為舊名稱容易與軟體分銷商混淆 。
### 元件名稱 (Component Name) - 微幅更新
- 定義： 軟體生產者分配給軟體元件的名稱 。
- 區別： 這是人類可讀的名稱，與「軟體識別碼 (Software Identifiers)」不同 。
- 別名支援： 資料格式應允許記錄多個條目，以捕捉別名 (alternate names) 。
### 元件版本 (Component Version) - 重大更新
- 定義： 軟體生產者用來指定軟體變更的識別碼 。
- 功能： 捕捉軟體版本，使組織能識別特定的程式碼交付 (code delivery) 。
- Fallback 機制： 如果生產者未提供版本號，SBOM 作者可以用檔案建立日期來代替 。
### 軟體識別碼 (Software Identifiers) - 重大更新
- 定義： 用於識別元件或作為相關資料庫查詢鍵值的識別碼 。
- 要求： 必須包含至少一個識別碼 。
- 首選格式： 偏好使用 CPE (Common Platform Enumeration) 和 PURL (Package Uniform Resource Locators) 。
- 其他格式： 也可包含 UUID、組織特定 ID、Commit Hashes，以及內在識別碼 (intrinsic identifiers) 如 OmniBOR 和 SWHID 。
- 完整性： 如果有多個識別碼（無論格式相同或不同），作者應全部列出 。
### 元件雜湊值 (Component Hash) - 新增
- 定義： 取自軟體元件的加密雜湊值 。
- 限制： 如果 SBOM 作者無法取得原始元件的檔案（Artifact），則不應填寫此欄位。
### License (New)（授權條款 - 新增）
- 定義： 軟體元件的使用授權規範。
- 要求：
### Dependency Relationship (Major Update)（依賴關係 - 重大更新）
- 定義： 描述元件之間的關係（例如：軟體 X 包含元件 Y，或元件 A 大部分衍生自元件 B）。
- 功能：
### Tool Name (New)（工具名稱 - 新增）
- 定義： SBOM 作者用來生成 SBOM 的工具名稱。
- 細節： 若使用了多個工具（例如一個用於生成，另一個用於豐富化數據），應列出所有使用到的工具及其數據來源。
### Timestamp (Minor Update)（時間戳記 - 微幅更新）
- 定義： SBOM 數據最近一次更新的日期與時間。
- 標準： 必須符合 ISO 8601 格式。若生成後未再修改，則填入生成時間。
### Generation Context (New)（生成情境 - 新增）
- 定義： 說明 SBOM 是在軟體生命週期的哪個階段生成的。
- 分類：
### Automation Support（自動化支援）
- 核心需求： 為了處理大量數據與跨組織邊界的需求，自動化是必須的。
- 標準格式： 目前業界公認的兩大主流格式（開放、國際化、機器可讀且人可讀）：
- 相容性原則：
### Practices and Processes（實務與流程）
SBOM 必須透過政策與合約整合進開發流程中。
- Frequency (Minor Update) - 更新頻率：
- Coverage (Major Update) - 覆蓋範圍：
- Known Unknowns (Major Update) - 已知的未知：
- Distribution and Delivery (Minor Update) - 分發與交付：
- Accommodation of Updates (Major Update) - 更新的適應性：
### SBOM 未來領域與挑戰摘要
### Cloud and SaaS (雲端與軟體即服務)
- 挑戰：
- 建議方向：
### AI Software Systems (AI 軟體系統)
- 現狀： AI 也是軟體，因此適用最低 SBOM 要素。
- 盲點： AI 系統包含許多傳統 SBOM 無法捕捉的元件（如模型權重、訓練數據）。這些元件對關鍵基礎設施的風險管理至關重要。
