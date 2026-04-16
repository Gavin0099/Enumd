## macOS MDM 與 Full Disk Access (FDA) 權限管理實作說明

### 1. 執行摘要 (Executive Summary)
本文件提供一套標準作業程序 (SOP)，說明如何透過 Apple MDM (行動裝置管理) 框架，集中且自動化地為企業內部的 macOS 裝置授予應用程式（如內部更新工具）所需的 完全磁碟存取權限 (Full Disk Access, FDA)。此方法完全符合 Apple 官方規範 [`MDM Protocol Reference`](https://developer.apple.com/enterprise/documentation/MDM-Protocol-Reference.pdf) 與 國際資安標準，取代耗時且易出錯的人工設定，確保企業 合規性、一致性與安全性。

### 2. 背景：為何需要 MDM？
- Apple 的安全設計 (TCC)：macOS 從 10.15 Catalina 開始，引入了 Transparency, Consent, and Control (TCC) 機制，限制應用程式對系統資源的存取。FDA 權限即是其中一種受控制的存取權限。
- 企業挑戰：企業需要為內部工具（如更新程式）授予 FDA 權限，但手動設定過程耗時且容易出錯。
- Apple 官方解法：Apple 建議透過 MDM 框架來集中管理 FDA 權限，確保合規性與安全性。

1. IT/MIS 管理端 (策略制定者)
1. MDM 雲端平台 (政策執行者)
1. Apple 基礎服務 (生態系基礎)
1. 受管控 macOS 裝置 (政策接收者)

    classDef svc fill:#e0f2fe,stroke:#3b82f6,color:#111
    classDef comp fill:#dcfce7,stroke:#16a34a,color:#111
    classDef sys fill:#ffe4e6,stroke:#ec4899,color:#111
    classDef mgmt fill:#f3f4f6,stroke:#6b7280,color:#111
    classDef cloud fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#1b5e20

    subgraph IT["IT/MIS 管理端 (策略制定)"]
        A["建立 PPPC Profile"]:::mgmt
        B["指派給裝置群組"]:::mgmt
        C["監控合規報表"]:::mgmt

    subgraph MDM["MDM 雲端 (政策執行)"]
        D["配置文件存儲"]:::cloud
        E["裝置合規性評估"]:::cloud
        F["命令下發"]:::cloud

    subgraph Apple["Apple 基礎服務"]
        G["ABM/ASM (裝置註冊)"]:::svc
        H["APNs (推播服務)"]:::svc

    subgraph Mac["受管控 macOS 裝置"]
        I["MDM Agent"]:::comp
        J["目標應用程式 (Update Tool)"]:::comp
        K["TCC 機制"]:::sys
        L["TCC.db 授權資料庫"]:::sys


### 4. 標準部署流程 (SOP)
此流程確保 FDA 權限能順利且無干擾地部署到所有裝置。

  classDef it fill:#e0f7fa,stroke:#00838f,stroke-width:2px,color:#004d40
  classDef cloud fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#1b5e20
  classDef mac fill:#fff3e0,stroke:#ef6c00,stroke-width:2px,color:#e65100
  classDef risk fill:#ffebee,stroke:#c62828,stroke-width:2px,color:#b71c1c

  B[裝置須在 ABM 註冊<br>並受監督]:::it
  C[取得目標 App 的 Bundle ID<br>與 Code Requirement]:::it
  D[在 MDM 平台建立<br>PPPC Profile]:::it
  E[指派 Profile<br>至裝置群組]:::it
  F[MDM 透過 APNs<br>下發設定]:::cloud
  G[裝置接收並安裝 Profile,<br>TCC.db 更新]:::mac
  H[安裝目標 App,<br>建議 Profile 之後]:::mac
  I[App 執行需要<br>FDA 的操作]:::mac
  J[TCC 機制自動授權]:::mac
  K[狀態回傳 MDM]:::mac
  L[IT 稽核與合規檢查]:::mac

  R1[注意：Code Requirement 錯誤<br>將導致授權無效]:::risk
  R2[注意：App 先於 Profile 安裝<br>可能首次彈窗]:::risk

  %% 再寫所有邊（不要在同一行定義節點）


### 5. 關鍵設定：PPPC 描述檔詳解
以下是 PPPC 描述檔中授權 FDA 的核心 XML 片段。

[未有直接 Source 錨點，待確認] <key>PayloadType</key>
  <string>com.apple.TCC.configuration-profile-policy</string>
[未有直接 Source 錨點，待確認] <key>Services</key>
[未有直接 Source 錨點，待確認] <key>SystemPolicyAllFiles</key>
[未有直接 Source 錨點，待確認] <key>Authorization</key>
[未有直接 Source 錨點，待確認] <string>Allow</string>
[未有直接 Source 錨點，待確認] <key>Identifier</key>
        <string>com.company.hubFwUpdaterCLI</string>
[未有直接 Source 錨點，待確認] <key>IdentifierType</key>
[未有直接 Source 錨點，待確認] <string>bundleID</string>
[未有直接 Source 錨點，待確認] <key>CodeRequirement</key>
        <string>identifier "com.company.hubFwUpdaterCLI" and anchor apple generic and certificate leaf[subject.OU] = "TEAMID1234"</string>

- `PayloadType`: 指定此描述檔為 TCC 設定檔
- `Services`: 定義需要授權的服務清單，這裡是 `SystemPolicyAllFiles`，代表完全磁碟存取權限
- `Authorization`: 設定為 `Allow`，允許存取
- `Identifier`: 目標應用程式的 Bundle ID
- `IdentifierType`: 指定 Identifier 為 Bundle ID
- [未有直接 Source 錨點，待確認] `CodeRequirement`: 定義應用程式的簽章要求，確保只有特定開發者簽署的程式才能獲得授權

- 測試條件：受監督的 Mac，已透過 MDM 下發 Profile。
[未有直接 Source 錨點，待確認] 1. 啟動應用程式，觀察是否能正常執行需要 FDA 權限的操作
  1. 在 MDM 平台檢查裝置的合規性報表，確認 FDA 權限已成功授予

- 定期檢視 MDM 合規性報表，確保所有受管控裝置的 FDA 權限設定正常
- 當有新的應用程式需要 FDA 權限時，更新 PPPC Profile 並重新下發
- 對於已停用的應用程式，從 PPPC Profile 中移除對應的授權設定

- Apple 官方：《[MDM Protocol Reference](https://developer.apple.com/enterprise/documentation/MDM-Protocol-Reference.pdf)》
- NIST：SP 800-53 → AC-6 Least Privilege, CM-6 Configuration Settings
- ISO 27001：A.9.2 使用者存取管理
- 企業資安政策：支援集中控管，滿足審計追蹤需求

1. 唯一合法路徑：FDA 權限無法透過腳本或安裝包靜默開啟，必須依循 MDM + PPPC。
1. 安全與合規並重：此流程符合 Apple 與 NIST/ISO 標準。
1. 最佳實踐：先下發 Profile，再安裝 App；持續監控與驗證。

### 附錄 A：設定自動化裝置註冊 (Apple Business Manager)
本附錄詳細說明如何完成「自動化裝置註冊 (Automated Device Enrollment, ADE)」的 foundational setup，以確保所有公司裝置都能被 MDM 強制納管並進入「受監督」模式。

#### 核心概念：數位出生證明
ADE 流程等同於為公司裝置辦理「數位出生證明」。裝置出廠時，其序號就被 Apple 登記為貴公司資產。當裝置首次開機連網，它會自動向您指定的 MDM 伺服器報到並接受管理，實現 零接觸部署 (Zero-Touch Deployment)。

#### 階段一：準備工作 (Prerequisites)
1. 鄧白氏環球編碼 (D-U-N-S Number)：用於驗證企業身份，可免費申請。
1. 有效的 MDM 解決方案：如 Jamf, Microsoft Intune, Meraki 等。
1. 從授權通路購買裝置：採購時提供您的 Apple 客戶編號或經銷商編號，裝置序號將自動匯入您的 ABM 帳戶。

步驟 1：註冊 Apple Business Manager (ABM)
1. 前往 business.apple.com 進行註冊。
1. 填寫公司資訊及 D-U-N-S 編碼。
1. 等待 Apple 審核驗證，可能需要數天。

步驟 2：將 MDM 伺服器連結至 ABM
1. 從 MDM 平台：下載伺服器公鑰 (.pem 或 .cer)。
1. 在 ABM 網站：前往「設定」>「裝置管理設定」>「加入 MDM 伺服器」，上傳剛才下載的公鑰。
1. 從 ABM 網站：下載 ABM 產生的伺服器代號 (.p7m)。
1. 回到 MDM 平台：上傳剛才下載的伺服器代號，完成雙向信任連結。

步驟 3：在 ABM 中指派裝置
1. 設定預設規則：在 ABM「設定」中，將所有新購裝置預設指派給您的 MDM 伺服器。
1. 手動指派：對於已存在的裝置，手動選取並指派給 MDM 伺服器。

步驟 4：在 MDM 中設定「註冊描述檔」
1. 在 MDM 平台中建立一個「註冊描述檔 (Enrollment Profile)」。
- [未有直接 Source 錨點，待確認] 強制監督 (Supervised)
- [未有直接 Source 錨點，待確認] 不可移除 (Unremovable)

設定完成後，新員工拿到未拆封的 Mac：
1. 裝置自動聯繫 Apple，螢幕出現無法跳過的「遠端管理」畫面。
1. 使用者確認後，MDM 開始自動下發所有公司設定、應用程式與安全策略。
[未有直接 Source 錨點，待確認] 1. 進入桌面時，裝置已完全配置好並處於受管狀態。

    %% --- 風格定義 (Style Definitions) ---
    classDef prep fill:#e0f7fa,stroke:#00838f,stroke-width:2px,color:#004d40
    classDef tech fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#1b5e20
    classDef itAction fill:#fff3e0,stroke:#ef6c00,stroke-width:2px,color:#e65100
    classDef user fill:#f3e8ff,stroke:#6d28d9,stroke-width:2px,color:#4c1d95

    %% --- 流程圖定義 (Chart Definition) ---
    subgraph "Phase 1: 準備與註冊"
        A["向鄧白氏申請 D-U-N-S 編碼"]:::prep
        B["在 business.apple.com 註冊 ABM 帳號"]:::prep
        C["等待 Apple 驗證通過"]:::prep

    subgraph "Phase 2: 建立 MDM 信任連結"
        D["從 MDM 下載公鑰"]:::tech
        E["在 ABM 上傳公鑰"]:::tech
        F["從 ABM 下載伺服器代號"]:::tech
        G["在 MDM 上傳伺服器代號<br>完成連結"]:::tech

    subgraph "Phase 3: 指派與設定"
        H["IT 向授權經銷商<br>採購裝置"]:::itAction
        I["裝置序號自動出現在 ABM"]:::itAction
        J["在 ABM 中將裝置<br>指派給 MD