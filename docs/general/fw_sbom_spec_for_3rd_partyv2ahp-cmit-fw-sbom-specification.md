---
title: FW_SBOM_Spec_for_3rd_Party.v2a(HP CMIT FW SBOM Specification)
domain_tags:
  - tools
task_tags:
  - build
  - spec
  - sop
  - config
authority_level: source
is_deprecated: false
category: tools
notion_id: 2cb64f6b-c656-808d-99b6-c7db096ce66c
notion_url: >-
  https://www.notion.so/FW_SBOM_Spec_for_3rd_Party-v2a-HP-CMIT-FW-SBOM-Specification-2cb64f6bc656808d99b6c7db096ce66c
notion_updated_at: '2026-02-23T06:27:00.000Z'
exported_at: '2026-04-06T13:15:25.459Z'
is_summarized: false
relations: []
---

> 文件狀態：Rev 2.0a (2025/09/16)
---
## 1. 📋 PM 必讀：管理與交付總覽
此區塊協助 PM 快速理解「要交付什麼」以及「驗收標準」。
### 🎯 核心交付物 (Deliverables)
- 格式：必須是 JSON 格式 (CycloneDX Schema)。
- 交付位置：SBOM 檔案 (.json) 必須與最終的 FW/BIOS Binary 放在同一個目錄下。
- 顆粒度：每一個 FW Component 都要有自己獨立的 SBOM。
### ⚠️ 責任歸屬 (Roles & Responsibilities)
- 第三方供應商 (Vendors)：
- HP 團隊：負責 HP 內部開發元件的 SBOM 生成。
### ✅ 驗收標準 (Acceptance Criteria)
---
## 2. 🛠️ FW 工程師：開發環境與工具鏈
此區塊為工程師的實作手冊。
### ⚙️ 環境設定 (Toolchain)
HP 指定使用 Python 開源工具，但有版本強制要求。
- 工具名稱：python-uswid
- 來源：https://github.com/hughsie/python-uswid
- ⚠️ 強制版本：必須使用 Commit Hash 55a060f87c800bad3955a7a45a60080a9f532b43 或更新版本（包含 HP 特定功能）。
### 🔄 建置流程 (Build Flow Integration)
SBOM 不是手寫的，而是由 Build Script 自動生成的。流程如下：
1. 定義 (Define)：在 Repo 根目錄建立 .sbom.ini 模板。
1. 注入 (Inject)：Build Script 執行時，抓取當前 Git Hash 與 Version，填入 .ini 檔。
1. 生成 (Generate)：呼叫 python-uswid 工具讀取 .ini 並輸出 .json。
1. 打包 (Package)：將 .json 與 Binary 放在一起。
### 🚀 GitLab 實作清單 (Actionable Items)
你需要在 GitLab Repo 中完成以下三個層面的設定：
### 1. Repository 準備 (前置作業)
在 Git Repo 的根目錄下，提交那個 .sbom.ini 模板檔案。
- 檔案內容： 應該包含佔位符 (Placeholders)，例如 {VERSION} 或 {COMMIT_HASH}，以便 Build Script 替換。
### 2. CI 環境配置 (處理 Toolchain)
由於 HP 強制要求特定 Commit Hash (55a060f...)，你不能只用 pip install python-uswid (這會抓最新版)。
在 .gitlab-ci.yml 的 before_script 區段，或是你的 Dockerfile 中，必須包含以下指令：
```c++
# 這是關鍵：強制安裝指定 Commit Hash 的版本
pip install git+https://github.com/hughsie/python-uswid.git@55a060f87c800bad3955a7a45a60080a9f532b43
```
### 3. 編寫 .gitlab-ci.yml (核心流程)
你需要新增一個 Stage (例如 package 或 build) 來執行該邏輯。以下是模擬該「注入 -> 生成 -> 打包」流程的 CI 設定範例：
```c++

`stages:
  - build
  - package

generate_sbom:
  stage: package
  image: python:3.9  # 或你們專案使用的 Base Image
  before_script:
    - apt-get update && apt-get install -y git
    # 1. 環境設定：安裝 HP 指定版本的工具
    - pip install git+https://github.com/hughsie/python-uswid.git@55a060f87c800bad3955a7a45a60080a9f532b43
  script:
    # 2. 定義與注入 (Define & Inject)
    # 假設你有一個腳本 update_ini.py 或使用 sed 來替換 .ini 模板中的變數
    # GitLab 變數: $CI_COMMIT_SHORT_SHA (Git Hash), $CI_COMMIT_TAG (Version)
    - echo "Injecting version info..."
    - sed -i "s/{VERSION}/${CI_COMMIT_TAG:-dev}/g" .sbom.ini
    - sed -i "s/{HASH}/${CI_COMMIT_SHORT_SHA}/g" .sbom.ini
    
    # 3. 生成 (Generate)
    # 呼叫 python-uswid (具體指令參數需參考該工具 help，假設輸出為 output.json)
    - echo "Generating SBOM..."
    - uswid --load .sbom.ini --save sbom_output.json
    
    # 4. 打包 (Package) - 驗證檔案是否存在
    - ls -l sbom_output.json
  
  # 讓生成的 json 檔案可以在 Pipeline 結束後被下載或傳遞到下一個 Stage
  artifacts:
    paths:
      - sbom_output.json
      - *.bin # 假設你的 Binary 也在這
    expire_in: 1 week`
```
### 💡 關鍵檢查點 (Checklist)
在實作完上述 Script 後，請檢查以下三點：
1. 版本鎖定驗證： 在 CI Log 中，確認 pip 安裝時輸出的 Hash 是否為 55a060f...，如果安裝到錯誤版本，生成的 SBOM 格式可能會被 HP 拒收。
1. 變數注入正確性： 檢查生成的 .json 內容，確認 Version 和 Hash 不是空值或佔位符。
1. Artifacts 保存： 確保 Job 成功後，GitLab 頁面上可以下載到那個 .json 檔，且它與你的 Firmware Binary 是對應的。
---
## 3. 📝 設定檔教學：.sbom.ini 撰寫指南
這是最核心的技術實作。請根據您的情境選擇寫法。
### 📌 基礎模板 (Standard Template)
適用於一般自行開發的元件。
Ini, TOML
```c#
[uSWID]
tag-id = CRD/SW/USBHub/Windows_Tool/brand_hp/hpisptool  ; GitHub Repo 路徑
software-name = HP 524pu USB Hub Firmware ; 元件名稱
software-version = 1.0.0.1       ; 版本 (格式: multipartnumeric)
version-scheme = multipartnumeric
colloquial-version = <GIT_HASH>  ; 由 Build Script 自動填入 Commit Hash
cpe = cpe:2.3:o:genesyslogic:hp_524pu_hub_firmware:1.0.0.1:*:*:*:*:*:*:*
summary =  USB Hub firmware component for HP 524pu platform (Genesys Logic)

[uSWID-Entity:SoftwareCreator]
name = Genesys Logic Inc. 
regid = www.genesyslogic.com.tw
extra-roles = TagCreator

[uSWID-Link:vcs]
rel = see-also
href = CRD/SW/USBHub/Windows_Tool/brand_hp/hpisptool
```
📦 uSWID 基本資訊（Software Identity）
🏢 軟體實體（Software Entity）
Software Creator
🔗 關聯連結（Source Control / Traceability）
Version Control System（VCS）
---
### 🔀 進階情境 A：修改/Fork 開源碼 (如 Edk2)
當您修改了開源專案（例如修改 TianoCore Edk2），必須宣告「血緣 (Ancestors)」與「補丁 (Patches)」。
在 .ini 中加入以下區段：
Ini, TOML
```c#
; 1. 宣告祖先 (我從哪裡 Fork 來的?)
[uSWID-Link:ancestor1]
rel = ancestor
href = pkg:github/tianocore/edk2@202411 ; 原始來源的 PURL

; 2. 宣告補丁 (我修了什麼漏洞?)
[uSWID-Patch:patch1]
type = cherry-pick
url = https://github.com/tianocore/edk2/commit/2244465...
description = SECURITY PATCH - CVE 2022-36763 ; 必須包含 CVE 編號
references = https://github.com/.../SecurityFixes.yaml
```
> 💡 為什麼這很重要？
---
### 📦 進階情境 B：引用外部函式庫 (Dependencies)
當您的 FW 包含或連結了外部 Library (如 DLL, Zip, Modules)。
在 .ini 或工具參數中加入依賴關係：
- JSON 產出結果範例：JSON
```c++
"dependencies": [
  {
    "ref": "bps-fw/MyComponent",
    "dependsOn": "pkg:github/tuxera/ntfs-3g@2013.1.13"
  },
  {
    "ref": "bps-fw/MyComponent",
    "dependsOn": "pkg:github/zeux/pugixml@1.2"
  }
]`
```
---
## 4. 🚫 常見錯誤檢查表 (Troubleshooting)
---
### 🔗 參考資源
- NTIA Minimum Elements: 美國政府 SBOM 最低要求。
- CycloneDX Guide: 採用的 JSON 標準格式。
- 工具下載: python-uswid (GitHub)。
---
# Hub FW導入 SBOM 規範前置作業清單
### 🚀 階段一：開發環境與工具鏈準備 (Infrastructure Setup)
這是所有工作的基礎，必須確保 Build Server 或 CI Runner 具備正確工具。
1. 安裝指定版本的 python-uswid 工具
1. 確認 Git 環境配置
---
### 📂 階段二：專案結構調整 (Project Configuration)
針對每一個 FW Component 的 Repo（例如 BIOS, EC, 或個別 Driver 模組）都需要做一次性的設定。
1. 建立 .sbom.ini 模板檔案
1. 配置 gitman.yml (若專案使用)
---
### ⚙️ 階段三：自動化腳本開發 (Build Scripting)
這是最花時間的部分，需要修改現有的 Make/Build 流程。
