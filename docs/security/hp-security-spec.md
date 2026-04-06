---
title: HP Security Spec
domain_tags:
  - hub
  - code-sign
  - firmware
  - tools
  - security
task_tags:
  - code-sign
  - spec
  - sop
authority_level: source
is_deprecated: false
category: hub
notion_id: 22d64f6b-c656-8076-a1ef-dd24eb66154e
notion_url: 'https://www.notion.so/HP-Security-Spec-22d64f6bc6568076a1efdd24eb66154e'
notion_updated_at: '2026-01-21T09:37:00.000Z'
exported_at: '2026-04-06T13:15:13.398Z'
is_summarized: false
relations: []
---

## ✅ Firmware Code Signing 與驗章流程說明
### 🧩 1. 簽章階段（Code Signing）
由開發端使用具備 HSM 保護的私鑰，對 firmware 進行數位簽章：
- 使用 Code Sign Tool 搭配 PKCS#11 協議 與 HSM 溝通。
- HSM 使用內部私鑰產生 Signature（簽章）。
- 同時匯出對應的 Public Key（公鑰）。
- 最終將 firmware.bin、Signature 與 Public Key 一併封裝，作為更新映像。
---
### 🛠️ 2. 更新階段（Update Tool 拆解）
Update Tool 在下發前，將簽章資訊解構並送往 Hub：
- 將封裝 bin 中的三項資訊拆開：
- 透過不同通道或分段，傳送給目標裝置（Hub）。
---
### 🔐 3. 驗章階段（Hub - HW Security 驗證）
Hub 端的硬體驗章模組（例如 Secure Boot Module）負責驗證：
- 對比 firmware.bin 的 Hash 與 Signature 是否一致。
- 確認 Public Key 是否正確對應 Signature。
- 簽章驗證成功：允許 firmware 寫入更新流程。
- 驗證失敗：拒絕更新，避免惡意或未授權映像導入。
---
### 📘 附註
## Firmware Code Sign & Verification Flow
```mermaid
flowchart TD
    %% 樣式定義
    classDef tool fill:#F1F8E9,stroke:#8BC34A,color:#33691E
    classDef hsm fill:#E0F7FA,stroke:#00ACC1,color:#006064
    classDef update fill:#FFF3E0,stroke:#FB8C00,color:#EF6C00
    classDef verify fill:#F3E5F5,stroke:#8E24AA,color:#6A1B9A
    classDef pass fill:#E8F5E9,stroke:#66BB6A,color:#1B5E20
    classDef fail fill:#FFEBEE,stroke:#EF5350,color:#B71C1C

    %% 🔐 Code Signing 流程
    subgraph Sign["🔐 Code Signing 流程"]
        S1["🧩 firmware.bin"]:::tool
        S2["📞 Code Sign Tool<br>呼叫 HSM（PKCS#11）"]:::tool
        S3["🔐 HSM 使用 Private Key<br>產生 Signature"]:::hsm
        S4["📄 回傳 Signature +<br>Public Key 給 Tool"]:::hsm
        S5["📦 封裝成 bin<br>（含 Signature & Public Key）"]:::tool
    end

    %% 🛠️ Update Tool 拆解流程
    subgraph UpdateTool["🛠️ Update Tool"]
        U1["📥 解構封裝 bin"]:::update
        U2["📤 傳送 firmware<br>給 Hub"]:::update
        U3["📤 傳送 Signature<br>給 Hub"]:::update
        U4["📤 傳送 Public Key<br>給 Hub"]:::update
    end

    %% 🔐 Hub 驗章流程
    subgraph Hub["🔐 Hub - HW Security 驗章流程"]
        H1["🧮 驗證 Public Key<br>與 Signature"]:::verify
        H2["🔄 使用 SHA-256<br>計算 firmware Hash"]:::verify
        H3["🔍 解密 Signature<br>取得 Hash"]:::verify
        H4["⚖️ 比對兩組 Hash"]:::verify
        H5{"✅ 是否一致？"}:::verify
        H6["🟢 通過：允許更新"]:::pass
        H7["🔴 失敗：拒絕更新"]:::fail
    end

    %% Flow arrows（以垂直為主）
    S1 --> S2 --> S3 --> S4 --> S5 --> U1
    U1 --> U2 --> H2 --> H4
    U1 --> U3 --> H1
    U1 --> U4 --> H1
    H1 --> H3 --> H4
    H4 --> H5
    H5 -->|是| H6
    H5 -->|否| H7

```
## 🔐 CA 認證：韌體簽章與企業應用概論
---
為了符合如 HP 等大客戶在 Secure Delivery 與 Code Signing 的要求，企業在執行韌體／工具／安裝檔簽章時，需配合公開信任的 CA（Certificate Authority）發行憑證，並確保：
- ✅ 私鑰安全（例如儲存在 eToken 或 HSM 中）
- ✅ 簽章過程可稽核（Log 記錄、MFA 控制）
- ✅ 憑證具備完整的 CA 信任鏈（包含 Root/Intermediate）
### 🧩 三種常見的 CA 簽章模式整理如下：
## 🧭 架構圖
```mermaid
graph TD
    %% 根 CA 區塊
    RootCA["🌐 公開信任 Root CA<br>（如 DigiCert）"]

    %% 分支一：EV 單次購買
    EV_CA["🔹 單次購買<br>EV Code Signing Cert"]
    EV_Key["🔐 Key Pair<br>（產於 eToken）"]
    EV_Cert["📄 EV Cert<br>（含公司名稱、CA 鏈）"]

    %% 分支二：Bulk 合約
    Bulk_CA["🔸 Bulk 合約<br>（含配額 Portal）"]
    Bulk_Key1["🔐 Key Pair 1"]
    Bulk_Key2["🔐 Key Pair 2"]
    Bulk_Cert1["📄 Cert 1"]
    Bulk_Cert2["📄 Cert 2"]

    %% 分支三：Intermediate CA 自建
    IntermediateCA["🏢 Intermediate CA<br>（由 Root CA 簽發）"]
    Int_Key1["🔐 Key Pair A<br>（產於 eToken）"]
    Int_Key2["🔐 Key Pair B<br>（產於 eToken）"]
    Int_Cert1["📄 Cert A<br>（由內部 CA 簽發）"]
    Int_Cert2["📄 Cert B<br>（由內部 CA 簽發）"]

    %% 連線
    RootCA --> EV_CA --> EV_Key --> EV_Cert
    RootCA --> Bulk_CA
    Bulk_CA --> Bulk_Key1 --> Bulk_Cert1
    Bulk_CA --> Bulk_Key2 --> Bulk_Cert2
    RootCA --> IntermediateCA
    IntermediateCA --> Int_Key1 --> Int_Cert1
    IntermediateCA --> Int_Key2 --> Int_Cert2

    %% 樣式
    classDef ca fill:#E3F2FD,stroke:#1E88E5,color:#1565C0
    classDef vendor fill:#E8F5E9,stroke:#43A047,color:#2E7D32
    classDef cert fill:#FFF3E0,stroke:#FB8C00,color:#EF6C00

    class RootCA,EV_CA,Bulk_CA,IntermediateCA ca
    class EV_Key,Bulk_Key1,Bulk_Key2,Int_Key1,Int_Key2 vendor
    class EV_Cert,Bulk_Cert1,Bulk_Cert2,Int_Cert1,Int_Cert2 cert

```
---
### ✅ Code Signing 憑證申請與維護對照表
### ✅ 單次購買 EV Code Signing 憑證（每組 key pair 個別認證）
```mermaid
flowchart TD
    %% 樣式定義
    classDef vendor fill:#E8F5E9,stroke:#43A047,color:#2E7D32
    classDef ca fill:#E3F2FD,stroke:#1E88E5,color:#1565C0
    classDef delivery fill:#FFF3E0,stroke:#FB8C00,color:#EF6C00

    subgraph EVCA["🌐 公開信任 CA - EV Code Signing 模式"]
        C1["接收 CSR（含公司資訊）"]:::ca
        C2["CA 進行組織驗證"]:::ca
        C3["簽發 EV Code Signing 憑證（.cer）"]:::ca
    end

    subgraph VendorEV["🛠️ Vendor - 每組 key 單獨認證"]
        V1["eToken 產生私鑰"]:::vendor
        V2["產出 CSR（含公鑰）"]:::vendor
        V3["提交 CSR 給 CA"]:::vendor
        V4["取得 EV 憑證並匯入 eToken"]:::vendor
        V5["使用私鑰與憑證簽署 firmware.bin 或 .msi"]:::vendor
        V6["封裝成 MSI 或 zip"]:::vendor
    end

    subgraph DeliveryEV["📦 驗證與交付"]
        D1["交付已簽署檔案給 HP / ODM"]:::delivery
        D2["附上對應的 .cer（含 CA 鏈）"]:::delivery
        D3["HP 驗證合法性與憑證 CA 鏈"]:::delivery
    end

    %% Arrow flow
    V1 --> V2 --> V3 --> C1 --> C2 --> C3 --> V4
    V4 --> V5 --> V6 --> D1
    V4 --> D2
    D1 --> D3


```
### 🔸 Bulk 憑證合約（配額簽發）
```mermaid
flowchart TD
    %% 樣式定義
    classDef vendor fill:#E8F5E9,stroke:#43A047,color:#2E7D32
    classDef ca fill:#E3F2FD,stroke:#1E88E5,color:#1565C0
    classDef delivery fill:#FFF3E0,stroke:#FB8C00,color:#EF6C00

    subgraph BulkCA["🌐 公開信任 CA - Bulk 合約模式"]
        B1["事前簽訂 Bulk 憑證合約（含配額）"]:::ca
        B2["CA 提供 Portal 或 API"]:::ca
        B3["依需求提交 CSR 並快速簽發 cert"]:::ca
    end

    subgraph VendorBulk["🛠️ Vendor - 多組 key 對應 cert"]
        VB1["eToken 產生私鑰"]:::vendor
        VB2["產出 CSR（含公鑰）"]:::vendor
        VB3["提交 CSR 至 CA Portal"]:::vendor
        VB4["取得 cert 並匯入 eToken"]:::vendor
        VB5["私鑰 + cert 簽署 firmware.bin 或 .msi"]:::vendor
        VB6["封裝成 MSI 或 zip"]:::vendor
    end

    subgraph DeliveryBulk["📦 驗證與交付"]
        D1["交付已簽署檔案給 HP / ODM"]:::delivery
        D2["附上對應的 .cer（含 CA 鏈）"]:::delivery
        D3["HP 驗證合法性與憑證 CA 鏈"]:::delivery
    end

    %% Arrow flow
    B1 --> B2 --> B3
    VB1 --> VB2 --> VB3 --> B3 --> VB4
    VB4 --> VB5 --> VB6 --> D1
    VB4 --> D2
    D1 --> D3

```
### 🔶 自建 Intermediate CA（被公開 Root 簽章）
```mermaid
flowchart TD
    %% 樣式定義
    classDef vendor fill:#E8F5E9,stroke:#43A047,color:#2E7D32
    classDef ca fill:#E3F2FD,stroke:#1E88E5,color:#1565C0
    classDef delivery fill:#FFF3E0,stroke:#FB8C00,color:#EF6C00
    classDef intermediate fill:#F3E5F5,stroke:#8E24AA,color:#6A1B9A

    %% Root CA 區塊
    subgraph RootCA["🌐 公開信任 Root CA - 例如 DigiCert"]
        R1["簽發 Intermediate CA 憑證"]:::ca
    end

    %% Intermediate CA 區塊
    subgraph IntermediateCA["🏢 Intermediate CA - 企業內部"]
        I1["保存私鑰於 HSM 中"]:::intermediate
        I2["接收 CSR 並進行簽章"]:::intermediate
        I3["簽出 model 專屬憑證<br>內含 CA 鏈"]:::intermediate
    end

    %% Vendor 區塊
    subgraph Vendor["🛠️ Vendor - 每個 Model 一組 Keypair"]
        A1["eToken 產生私鑰"]:::vendor
        A2["產出 CSR（含公鑰）"]:::vendor
        A3["提交 CSR 給 Intermediate CA"]:::vendor
        A4["取得憑證 .cer 並匯入 eToken"]:::vendor
        A5["使用私鑰與憑證<br>簽署 firmware.bin"]:::vendor
        A6["封裝成已簽署 MSI 或 zip 壓縮檔"]:::vendor
    end

    %% Delivery 區塊
    subgraph Delivery["📦 交付與驗證流程"]
        D1["交付 MSI / zip 給 HP 或 ODM"]:::delivery
        D2["提供對應的 .cer 憑證<br>內含完整 CA 鏈"]:::delivery
        D3["HP 驗證簽章合法性<br>與 CA 鏈完整性"]:::delivery
    end

    %% Arrow flow
    R1 --> I1
    A1 --> A2 --> A3 --> I2
    I2 --> I3 --> A4
    A4 --> A5 --> A6 --> D1
    A4 --> D2
    D1 --> D3

```
---
### 🧠 額外說明：
- EV Cert 買斷 ≠ 可重複簽多組 key：每組私鑰/公鑰都需要一組 cert 簽章。
- Bulk 合約 ≠ Intermediate CA：Bulk 是由 CA 控制簽發，只是價格比較便宜。
- Intermediate CA 最大優勢是自主性與可擴展性，但代價是：初期投入大、管理負擔高。
### ✅ CA Security Council - Minimum Requirements for Code Signing v1.1（2022）
這份標準文件由 CA/Browser Forum 所支持，目的是：
> 確保 Code Signing 憑證的私鑰與簽章操作具備可驗證的信任與安全性，防止惡意程式偽裝為合法軟體散佈。
---
### 🔐 一、私鑰儲存與管理要求
---
### 🔐 二、身份驗證與發證規範
---
### 📄 三、簽章行為稽核與可追溯性
---
### 🧱 四、應對金鑰洩漏的強制流程
---
## 🎯 你該怎麼做來滿足這份標準？
---
## 🔐 HSM 與簽章安全機制總覽
### ✅ 一、使用 HSM 的目的與基本要求
使用 HSM（Hardware Security Module）是實作強化數位簽章與金鑰管理的重要基礎，以下為供應商簽章安全相關的必要條件：
---
### ✅ 二、密碼演算法與金鑰長度要求（根據 NIST 與 FIPS）
> 🔎 注意事項： 自 2031 年起，小於 128-bit 的演算法僅允許用於歷史用途，不得作為新產品之簽章用途。
---
### ✅ 三、HP 對供應商 HSM 與簽章要求
根據 HP 的 Firmware 安全交付規範：
- 所有供應商必須使用 HSM 保護私鑰（含使用 EV Cert、Bulk Cert 或內部 Intermediate CA）
- 使用的金鑰與簽章流程，需符合 CA/B Forum 與 CA Security Council Minimum Requirements v1.1
- 簽章前的檔案必須經過惡意程式掃描（Malware Scan）
- 供應商需標明所使用的：
---
### ✅ 四、金鑰用途分類（測試 vs 正式）
> ❗ 禁止： 正式交付之映像檔包含任何測試用金鑰或憑證
---
### ✅ 五、建議措施彙整
- ✅ 儲存金鑰與簽章操作必須整合 HSM 與 MFA 控制
- ✅ 應設計完整的 key rotation / revocation 機制
- ✅ 對所有憑證與金鑰使用，應有審查與記錄流程（Audit）
- ✅ 所有簽章後的程式碼，應定期重新掃描安全性與效期檢查
```mermaid
flowchart TB
    %% 樣式定義
    classDef hsm fill:#E0F7FA,stroke:#00ACC1,color:#006064
    classDef signer fill:#E8F5E9,stroke:#43A047,color:#2E7D32
    classDef audit fill:#FFF3E0,stroke:#FB8C00,color:#EF6C00

    %% HSM 區塊
    subgraph HSM["🔐 HSM（硬體安全模組）"]
        H4["🧑‍💻 MFA 驗證後允許操作"]:::hsm
        H1["📌 產生 / 儲存 Private Key"]:::hsm
        H2["🔒 金鑰不可匯出"]:::hsm
        H3["🔐 產生 Signature<br>並提供 Public Key"]:::hsm
        H5["📄 記錄簽章 / 金鑰建立 / 撤銷"]:::hsm
    end

    %% 簽章系統
    subgraph SignSystem["🛠️ 簽章系統 / Platform"]
        S1["📄 計算 firmware hash"]:::signer
        S2["📤 傳送 hash 給 HSM"]:::signer
        S3["📥 接收 Signature + Public Key"]:::signer
        S4["📦 封裝 firmware<br>+ Signature + Public Key"]:::signer
    end

    %% 稽核日誌系統
    subgraph Audit["📋 稽核日誌系統"]
        A1["🗂️ 儲存簽章操作日誌"]:::audit
        A2["🗂️ 儲存金鑰建立 / 撤銷紀錄"]:::audit
    end

    %% 邏輯連線
    S1 --> S2 --> H3 --> S3 --> S4
    H4 --> H3
    H1 --> H5
    H2 --> H5
    H3 --> H5
    H5 --> A1
    H5 --> A2

```
### 🔐 1. RoT – Root of Trust（信任根）
> 定義：系統中最基礎、最可信賴的元件或機制，所有後續的信任鏈都由它開始建立。
