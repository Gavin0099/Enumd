# FW_SBOM_Spec_for_3rd_Party.v2a(HP CMIT FW SBOM Specification)

## 1. 📋 PM 必讀：管理與交付總覽

### 🎯 核心交付物 (Deliverables)
- 格式：必須是 JSON 格式 (CycloneDX Schema)。
- 交付位置：SBOM 檔案 (.json) 必須與最終的 FW/BIOS Binary 放在同一個目錄下。
- 顆粒度：每一個 FW Component 都要有自己獨立的 SBOM。

### ⚠️ 責任歸屬 (Roles & Responsibilities)
- 第三方供應商 (Vendors)：負責生成自身開發元件的 SBOM。
- HP 團隊：負責 HP 內部開發元件的 SBOM 生成。

### ✅ 驗收標準 (Acceptance Criteria)

## 2. 🛠️ FW 工程師：開發環境與工具鏈

### ⚙️ 環境設定 (Toolchain)
- 工具名稱：python-uswid
- 來源：https://github.com/hughsie/python-uswid
- ⚠️ 強制版本：必須使用 Commit Hash 55a060f87c800bad3955a7a45a60080a9f532b43 或更新版本（包含 HP 特定功能）。

### 🔄 建置流程 (Build Flow Integration)
1. 定義 (Define)：在 Repo 根目錄建立 .sbom.ini 模板。
1. 注入 (Inject)：Build Script 執行時，抓取當前 Git Hash 與 Version，填入 .ini 檔。
1. 生成 (Generate)：呼叫 python-uswid 工具讀取 .ini 並輸出 .json。
1. 打包 (Package)：將 .json 與 Binary 放在一起。

### 🚀 GitLab 實作清單 (Actionable Items)
1. Repository 準備 (前置作業)：在 Git Repo 的根目錄下，提交 .sbom.ini 模板檔案。
1. CI 環境配置 (處理 Toolchain)：在 .gitlab-ci.yml 的 before_script 區段，或是 Dockerfile 中，必須包含強制安裝指定 Commit Hash 的 python-uswid 版本。
1. 編寫 .gitlab-ci.yml (核心流程)：新增一個 Stage 來執行「注入 -> 生成 -> 打包」的流程。

### 💡 關鍵檢查點 (Checklist)
1. 版本鎖定驗證：確認 pip 安裝時輸出的 Hash 是否為 55a060f...。
1. 變數注入正確性：檢查生成的 .json 內容，確認 Version 和 Hash 不是空值或佔位符。
1. Artifacts 保存：確保 Job 成功後，GitLab 頁面上可以下載到那個 .json 檔。

## 3. 📝 設定檔教學：.sbom.ini 撰寫指南

### 📌 基礎模板 (Standard Template)
tag-id = CRD/SW/USBHub/Windows_Tool/brand_hp/hpisptool
software-name = HP 524pu USB Hub Firmware
software-version = 1.0.0.1
version-scheme = multipartnumeric
colloquial-version = <GIT_HASH>
cpe = cpe:2.3:o:genesyslogic:hp_524pu_hub_firmware:1.0.0.1:*:*:*:*:*:*:*
summary = USB Hub firmware component for HP 524pu platform (Genesys Logic)

[uSWID-Entity:SoftwareCreator]
name = Genesys Logic Inc.
regid = www.genesyslogic.com.tw
extra-roles = TagCreator

[uSWID-Link:vcs]
href = CRD/SW/USBHub/Windows_Tool/brand_hp/hpisptool

### 🔀 進階情境 A：修改/Fork 開源碼 (如 Edk2)
[uSWID-Link:ancestor1]
href = pkg:github/tianocore/edk2@202411

[uSWID-Patch:patch1]
type = cherry-pick
url = https://github.com/tianocore/edk2/commit/2244465...
description = SECURITY PATCH - CVE 2022-36763
references = https://github.com/.../SecurityFixes.yaml

### 📦 進階情境 B：引用外部函式庫 (Dependencies)
[未有直接 Source 錨點，待確認] "dependencies": [
    "ref": "bps-fw/MyComponent",
    "dependsOn": "pkg:github/tuxera/ntfs-3g@2013.1.13"
    "ref": "bps-fw/MyComponent",
    "dependsOn": "pkg:github/zeux/pugixml@1.2"

## 4. 🚫 常見錯誤檢查表 (Troubleshooting)

- NTIA Minimum Elements: 美國政府 SBOM 最低要求。
- CycloneDX Guide: 採用的 JSON 標準格式。
- 工具下載: python-uswid (GitHub)。

# Hub FW導入 SBOM 規範前置作業清單

### 🚀 階段一：開發環境與工具鏈準備 (Infrastructure Setup)
1. 安裝指定版本的 python-uswid 工具

### 📂 階段二：專案結構調整 (Project Configuration)
1. 建立 .sbom.ini 模板檔案
1. 配置 gitman.yml (若專案使用)

### ⚙️ 階段三：自動化腳本開發 (Build Scripting)

[FW_SBOM_Spec_for_3rd_Party.v2a(HP CMIT FW SBOM Specification)](https://github.com/hughsie/python-uswid/blob/55a060f87c800bad3955a7a45a60080a9f532b43/general/fw_sbom_spec_for_3rd_partyv2ahp-cmit-fw-sbom-specification.html)