---
title: macOS MDM 與 Full Disk Access (FDA) 權限管理實作說明
domain_tags:
  - mac
  - tools
  - security
task_tags:
  - spec
  - sop
  - config
authority_level: source
is_deprecated: false
category: mac
notion_id: 25c64f6b-c656-8004-9785-cbbb5ca08cd1
notion_url: >-
  https://www.notion.so/macOS-MDM-Full-Disk-Access-FDA-25c64f6bc65680049785cbbb5ca08cd1
notion_updated_at: '2026-01-21T09:38:00.000Z'
exported_at: '2026-04-06T13:13:11.496Z'
is_summarized: false
relations: []
---

## 1. 執行摘要 (Executive Summary)
本文件提供一套標準作業程序 (SOP)，說明如何透過 Apple MDM (行動裝置管理) 框架，集中且自動化地為企業內部的 macOS 裝置授予應用程式（如內部更新工具）所需的 完全磁碟存取權限 (Full Disk Access, FDA)。
此方法完全符合 Apple 官方規範 與 國際資安標準，取代耗時且易出錯的人工設定，確保企業 合規性、一致性與安全性。
---
## 2. 背景：為何需要 MDM？
- Apple 的安全設計 (TCC)
- 企業挑戰
- Apple 官方解法
---
## 3. 解決方案架構
### 3.1 核心角色
1. IT/MIS 管理端 (策略制定者)
1. MDM 雲端平台 (政策執行者)
1. Apple 基礎服務 (生態系基礎)
1. 受管控 macOS 裝置 (政策接收者)
### 3.2 架構關係圖
```mermaid
graph LR
    classDef svc fill:#e0f2fe,stroke:#3b82f6,color:#111
    classDef comp fill:#dcfce7,stroke:#16a34a,color:#111
    classDef sys fill:#ffe4e6,stroke:#ec4899,color:#111
    classDef mgmt fill:#f3f4f6,stroke:#6b7280,color:#111
    classDef cloud fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#1b5e20

    subgraph IT["IT/MIS 管理端 (策略制定)"]
        A["建立 PPPC Profile"]:::mgmt
        B["指派給裝置群組"]:::mgmt
        C["監控合規報表"]:::mgmt
    end

    subgraph MDM["MDM 雲端 (政策執行)"]
        D["配置文件存儲"]:::cloud
        E["裝置合規性評估"]:::cloud
        F["命令下發"]:::cloud
    end

    subgraph Apple["Apple 基礎服務"]
        G["ABM/ASM (裝置註冊)"]:::svc
        H["APNs (推播服務)"]:::svc
    end

    subgraph Mac["受管控 macOS 裝置"]
        I["MDM Agent"]:::comp
        J["目標應用程式 (Update Tool)"]:::comp
        K["TCC 機制"]:::sys
        L["TCC.db 授權資料庫"]:::sys
    end

    A --> D
    B --> E
    D --> F
    E --> F
    F --> H
    H --> I
    I --> L
    J --> K
    K --> L
    L --> K
    K --> J
    I --> E
    E --> C
    G -.-> I

```
## 4. 標準部署流程 (SOP)
此流程確保 FDA 權限能順利且無干擾地部署到所有裝置。
```mermaid
flowchart TB
  %% 樣式
  classDef it fill:#e0f7fa,stroke:#00838f,stroke-width:2px,color:#004d40
  classDef cloud fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#1b5e20
  classDef mac fill:#fff3e0,stroke:#ef6c00,stroke-width:2px,color:#e65100
  classDef risk fill:#ffebee,stroke:#c62828,stroke-width:2px,color:#b71c1c

  %% 先定義所有節點（含樣式）
  A[開始]:::it
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
  M[完成]:::mac

  R1[注意：Code Requirement 錯誤<br>將導致授權無效]:::risk
  R2[注意：App 先於 Profile 安裝<br>可能首次彈窗]:::risk

  %% 再寫所有邊（不要在同一行定義節點）
  A --> B
  B --> C
  C --> D
  D --> E
  E --> F
  F --> G
  G --> H
  H --> I
  I --> J
  J --> K
  K --> L
  L --> M

  D -.-> R1
  H -.-> R2
```
---
## 5. 關鍵設定：PPPC 描述檔詳解
以下是 PPPC 描述檔中授權 FDA 的核心 XML 片段。
```java
<dict>
  <key>PayloadType</key>
  <string>com.apple.TCC.configuration-profile-policy</string>
  <key>Services</key>
  <dict>
    <key>SystemPolicyAllFiles</key>
    <array>
      <dict>
        <key>Authorization</key>
        <string>Allow</string>
        <key>Identifier</key>
        <string>com.company.hubFwUpdaterCLI</string>
        <key>IdentifierType</key>
        <string>bundleID</string>
        <key>CodeRequirement</key>
        <string>identifier "com.company.hubFwUpdaterCLI" and anchor apple generic and certificate leaf[subject.OU] = "TEAMID1234"</string>
      </dict>
    </array>
  </dict>
</dict>

```
### 設定檔欄位詳解
### 欄位解析
---
## 6. 測試驗證
- 測試條件：受監督的 Mac，已透過 MDM 下發 Profile。
- 驗證方式：
---
## 7. 稽核與維運
---
## 8. 合規性對應
- Apple 官方：《MDM Protocol Reference》
- NIST：SP 800-53 → AC-6 Least Privilege, CM-6 Configuration Settings
- ISO 27001：A.9.2 使用者存取管理
- 企業資安政策：支援集中控管，滿足審計追蹤需求
---
## 9. 結論
1. 唯一合法路徑：FDA 權限無法透過腳本或安裝包靜默開啟，必須依循 MDM + PPPC。
1. 安全與合規並重：此流程符合 Apple 與 NIST/ISO 標準。
1. 最佳實踐：先下發 Profile，再安裝 App；持續監控與驗證。
---
### 附錄 A：設定自動化裝置註冊 (Apple Business Manager)
本附錄詳細說明如何完成「自動化裝置註冊 (Automated Device Enrollment, ADE)」的 foundational setup，以確保所有公司裝置都能被 MDM 強制納管並進入「受監督」模式。
### 核心概念：數位出生證明
ADE 流程等同於為公司裝置辦理「數位出生證明」。裝置出廠時，其序號就被 Apple 登記為貴公司資產。當裝置首次開機連網，它會自動向您指定的 MDM 伺服器報到並接受管理，實現 零接觸部署 (Zero-Touch Deployment)。
### 階段一：準備工作 (Prerequisites)
1. 鄧白氏環球編碼 (D-U-N-S Number)：用於驗證企業身份，可免費申請。
1. 有效的 MDM 解決方案：如 Jamf, Microsoft Intune, Meraki 等。
1. 從授權通路購買裝置：採購時提供您的 Apple 客戶編號或經銷商編號，裝置序號將自動匯入您的 ABM 帳戶。
### 階段二：設定流程
步驟 1：註冊 Apple Business Manager (ABM)
1. 前往 business.apple.com 進行註冊。
1. 填寫公司資訊及 D-U-N-S 編碼。
1. 等待 Apple 審核驗證，可能需要數天。
步驟 2：將 MDM 伺服器連結至 ABM
1. 從 MDM 平台：下載伺服器公鑰 (.pem 或 .cer)。
1. 在 ABM 網站：前往「設定」>「裝置管理設定」>「加入 MDM 伺服器」，上傳剛才下載的公鑰。
1. 從 ABM 網站：下載 ABM 產生的伺服器代號 (.p7m)。
1. 回到 MDM 平台：上傳剛才下載的伺服器代號，完成雙向信任連結。
步驟 3：在 ABM 中指派裝置
1. 設定預設規則：在 ABM「設定」中，將所有新購裝置預設指派給您的 MDM 伺服器。
1. 手動指派：對於已存在的裝置，手動選取並指派給 MDM 伺服器。
步驟 4：在 MDM 中設定「註冊描述檔」
1. 在 MDM 平台中建立一個「註冊描述檔 (Enrollment Profile)」。
1. 關鍵設定：
### 階段三：使用者體驗
設定完成後，新員工拿到未拆封的 Mac：
1. 開機、連網。
1. 裝置自動聯繫 Apple，螢幕出現無法跳過的「遠端管理」畫面。
1. 使用者確認後，MDM 開始自動下發所有公司設定、應用程式與安全策略。
1. 進入桌面時，裝置已完全配置好並處於受管狀態。
### 流程圖總結
```mermaid
flowchart TD
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
    end

    subgraph "Phase 2: 建立 MDM 信任連結"
        D["從 MDM 下載公鑰"]:::tech
        E["在 ABM 上傳公鑰"]:::tech
        F["從 ABM 下載伺服器代號"]:::tech
        G["在 MDM 上傳伺服器代號<br>完成連結"]:::tech
    end

    subgraph "Phase 3: 指派與設定"
        H["IT 向授權經銷商<br>採購裝置"]:::itAction
        I["裝置序號自動出現在 ABM"]:::itAction
        J["在 ABM 中將裝置<br>指派給 MDM 伺服器"]:::itAction
        K["在 MDM 中設定註冊描述檔<br>(強制監督、不可移除、略過步驟)"]:::itAction
    end

    subgraph "Phase 4: 使用者零接觸開機"
        L["使用者開機並連網"]:::user
        M["裝置自動聯繫 Apple"]:::user
        N["Apple 引導裝置<br>至公司 MDM"]:::user
        O["螢幕顯示『遠端管理』<br>強制註冊"]:::user
        P["MDM 自動下發所有設定<br>部署完成!"]:::user
    end

    %% --- 流程連接 (Connections) ---
    A --> B --> C
    D --> E --> F --> G
    H --> I --> J --> K
    L --> M --> N --> O --> P

    C -- "驗證完成後" --> D
    G -- "連結建立後" --> H
    K -- "設定完成後" --> L
```
