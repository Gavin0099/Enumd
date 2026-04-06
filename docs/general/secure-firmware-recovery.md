---
title: Secure Firmware Recovery
category: general
notion_id: 25764f6b-c656-806c-9e29-fd0860cf89e3
notion_url: >-
  https://www.notion.so/Secure-Firmware-Recovery-25764f6bc656806c9e29fd0860cf89e3
notion_updated_at: '2025-08-25T06:47:00.000Z'
exported_at: '2026-04-06T11:20:18.970Z'
is_summarized: false
---

### OCP 安全韌體恢復 (Secure Firmware Recovery) 規範詳解
---
### 1. 總覽與目的 (Executive Summary)
本文件是由 Open Compute Project (OCP) 發布的一份技術規範，旨在為資料中心硬體建立一套標準化、安全且可靠的韌體恢復機制。
其核心目標是：當一個裝置（如網卡、SSD、加速卡）的韌體損壞、無回應或被惡意竄改時，平台管理者（如 BMC）能夠透過一個獨立於主作業系統的低階通道（Side-band channel），強制該裝置進入恢復模式，並將其恢復到一個已知、可信的安全狀態。
此規範基於 NIST SP 800-193《平台韌體彈性指南》 的三大支柱：
- 保護 (Protection): 透過安全啟動 (Secure Boot) 和金鑰管理來保護韌體。
- 偵測 (Detection): 透過平台證明 (Attestation) 來偵測韌體的完整性。
- 恢復 (Recovery): 本文件的核心，定義了如何從偵測到的問題中恢復。
### 1.1 系統全景架構圖 (System Overview)
```mermaid
flowchart TB
classDef host     fill:#fef3c7,stroke:#b45309,stroke-width:2px,color:#111
classDef platform fill:#dbeafe,stroke:#1d4ed8,stroke-width:2px,color:#111
classDef agent    fill:#fff1a6,stroke:#a16207,stroke-width:2px,color:#111
classDef bus      fill:#cffafe,stroke:#0891b2,stroke-width:2px,color:#0b1a1f
classDef device   fill:#bbf7d0,stroke:#15803d,stroke-width:2px,color:#0b1a1f

subgraph HOST ["Host 主機域"]
  RC["CPU / PCIe Root Complex"]:::host
  OS["Host OS"]:::host
end

subgraph PLATFORM ["PA-RoT / BMC 平台管理域"]
  BMC["BMC (PA-RoT)"]:::platform
  RA["Recovery Agent"]:::agent
end

subgraph MGMT ["正常管理匯流排"]
  PLDM["PLDM for FW Update<br/>(over MCTP)"]:::bus
  SPDM["SPDM Measurements"]:::bus
  MGMT_BUS["Device Mgmt Backplane<br/>(聚合中繼)"]:::bus
end

subgraph REC ["Recovery Bus<br/>SMBus 0xD2（獨立位址）"]
  RBUS["Recovery Interface"]:::bus
end

subgraph DEVS ["AC-RoT Devices 裝置群"]
  DEV_BUS["Device Fabric<br/>(裝置內部管理匯流排)"]:::bus
  subgraph NICG ["NIC"]
    NIC["NIC Device"]:::device
  end
  subgraph SSDG ["SSD"]
    SSD["SSD Device"]:::device
  end
  subgraph ACCG ["Accelerator"]
    ACC["Accelerator Device"]:::device
  end
end

RA --> BMC
BMC --> PLDM
BMC --> SPDM
BMC --> RBUS
RC --- OS
OS -->|功能/資料| DEV_BUS

PLDM --> MGMT_BUS
SPDM --> MGMT_BUS
MGMT_BUS --> DEV_BUS

RBUS --> DEV_BUS

DEV_BUS --> NIC
DEV_BUS --> SSD
DEV_BUS --> ACC

```
---
### 2. 關鍵角色與術語 (Key Roles & Terminology)
- AC-RoT (Active Component Root of Trust): 主動元件信任根。指需要被恢復的裝置，例如一個 PCIe 卡。它本身具備安全啟動和證明能力。
- PA-RoT (Platform Active Root of Trust): 平台主動信任根。通常是平台上的管理控制器，如 BMC (Baseboard Management Controller)。
- RA (Recovery Agent): 恢復代理。通常是 PA-RoT (BMC) 內部的一個軟體模組，負責推送映像檔並協調恢復流程。
韌體映像檔類型 (Firmware Image Types):
- A/B Image (營運映像檔): 裝置正常運行時使用的韌體，採用 A/B 分區以支援不中斷更新。
- C-Image (恢復映像檔): 最小化韌體，用於啟動裝置並接收新的 A/B Image。
- 關鍵資料 (Critical Data): 裝置身份憑證、金鑰清單、安全配置等必須持久存在的資料。
```mermaid
flowchart LR
    %% --- 類別樣式定義 (Class Definitions) ---
    classDef manifest fill:#e0f2fe,stroke:#3b82f6,stroke-width:2px,color:#111
    classDef boot fill:#fef9c3,stroke:#eab308,stroke-width:2px,color:#111
    classDef cimg fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#111
    classDef ab fill:#fce7f3,stroke:#db2777,stroke-width:2px,color:#111
    classDef policy fill:#ede9fe,stroke:#7c3aed,stroke-width:2px,color:#111

    %% --- 節點定義與主要啟動流程 (Node Definitions & Main Boot Flow) ---
    KM[Key Manifest<br/>金鑰清單] --> BL[Boot Loader<br/>啟動載入程式]
    BL --> CIMG[C-Image<br/>恢復映像檔]
    BL --> AB[A/B Operational Images<br/>A/B 營運映像檔]

    %% --- 子圖：定義安全策略區塊 (Subgraph for Security Policy) ---
    subgraph S_POLICY [Policy / 策略]
        direction TB
        AR[Anti-rollback Counter<br/>防回滾計數器]
        SB[Secure Boot Keys<br/>安全啟動金鑰]
    end

    %% --- 關係：策略如何強制驗證其他元件 (Relationships: Policy Enforcement) ---
    S_POLICY -. Enforced Validation<br/>強制驗證 .-> KM
    S_POLICY -. Enforced Validation<br/>強制驗證 .-> BL
    S_POLICY -. Enforced Validation<br/>強制驗證 .-> CIMG
    S_POLICY -. Enforced Validation<br/>強制驗證 .-> AB

    %% --- 將樣式套用到對應的節點 (Apply Classes to Nodes) ---
    class KM manifest
    class BL boot
    class CIMG cimg
    class AB ab
    class AR,SB policy
```
---
### 3. 恢復觸發條件與場景 (Recovery Triggers & Scenarios)
觸發條件：
1. 平台偵測異常（Attestation 測量值不符）。
1. 裝置自我偵測（安全啟動失敗、防回滾錯誤、關鍵資料損壞）。
1. 裝置無回應（無法透過 MCTP 溝通）。
1. 強制恢復（由管理者策略或維護需求觸發）。
使用場景：
- 正常更新： 僅韌體升級，不動用此恢復機制。
- 帶有關鍵資料的恢復： 重寫韌體，身份保持不變。
- 不帶關鍵資料的恢復： 必須重新配置裝置身份與安全參數。
⚠️ 安全提醒：強制恢復 (Forced Recovery) 隱含信任 PA-RoT/RA，若被濫用可能造成 拒絕服務 (DoS)，因為攻擊者可反覆觸發裝置重置。
```mermaid
flowchart TD
    %% === 類別樣式 ===
    classDef startend fill:#f3f4f6,stroke:#9ca3af,stroke-width:1px,color:#111
    classDef decision fill:#fef9c3,stroke:#eab308,stroke-width:2px
    classDef process fill:#e0f2fe,stroke:#3b82f6,stroke-width:2px
    classDef action fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    classDef stop fill:#fee2e2,stroke:#ef4444,stroke-width:2px

    %% === 節點 ===
    A([Start / 開始]):::startend --> B{Trigger Source? / 觸發來源?}:::decision
    B -->|Platform attestation mismatch / 平台證明不符| C[Query DEVICE_STATUS / 查詢狀態]:::process
    B -->|Device self-detect failure / 裝置自檢失敗| C
    B -->|Device unresponsive / 裝置無回應| D[Write DEVICE_RESET / 寫入強制恢復]:::action
    B -->|Operator policy forced / 管理者強制| D

    C --> E{Status? / 狀態判斷}:::decision
    E -->|Healthy / 健康| Z([Stop / 結束]):::stop
    E -->|Error / 錯誤| F[Plan Recovery / 規劃恢復]:::process
    E -->|Recovery Mode / 恢復模式| G[Proceed to Image Loading / 進入映像載入]:::action

    D --> G
    F --> G

    G --> H{C-Image source? / 恢復映像來源?}:::decision
    H -->|Push via IMI / 透過 IMI 推送| I[INDIRECT_CTRL / INDIRECT_DATA]:::process
    H -->|Local persistent / 使用本地 C-Image| J[Select persistent C-Image / 選擇內建映像]:::action

    I --> K[RECOVERY_CTRL → Reboot to C-Image / 重啟進入 C-Image]:::action
    J --> K
    K --> L[PLDM/MCTP minimal stack / 寫入 A/B 韌體]:::process
    L --> M[Reboot to A/B & attest / 重啟並驗證]:::process
    M --> N{Attestation pass? / 驗證通過？}:::decision
    N -->|Yes / 通過| Z
    N -->|No / 失敗| F

```
---
### 4. 恢復流程詳解 (Recovery Process Flow)
1. 偵測 (Detection) → PA-RoT 判斷 AC-RoT 不健康。
1. 狀態查詢 (Status Check) → RA 讀取 DEVICE_STATUS。
1. 進入恢復模式 (Entering Recovery) → 可透過 DEVICE_RESET 觸發。
1. 載入恢復映像檔 (Image Loading) → Push C-Image 或選擇本地 C-Image。
1. 啟動恢復映像檔 (Activation) → RECOVERY_CTRL 控制重啟並執行 C-Image。
1. 執行恢復 (Recovery Execution) → 推送完整的 A/B Image。
1. 完成與驗證 (Completion & Verification) → 重啟後由 Attestation 驗證健康狀態。
```mermaid
stateDiagram-v2
    %% 狀態樣式定義
    state "Healthy\\n健康" as Healthy
    state "Error / 錯誤" as Error
    state "Recovery Mode\\n恢復模式" as RecoveryMode
    state "Recovery Pending\\n等待啟動恢復" as RecoveryPending
    state "Running Recovery Image\\n執行恢復映像" as RunningRecoveryImage
    state "Fatal Error / 致命錯誤" as FatalError

    [*] --> Healthy
    Healthy --> Error: Attestation fail / 自檢失敗
    Healthy --> RecoveryMode: Forced Recovery (DEVICE_RESET flag)
    Error --> RecoveryMode: DETECTED & RECOVERY_REQUIRED
    RecoveryMode --> RecoveryPending: RECOVERY_CTRL 選擇/推送 C-Image
    RecoveryPending --> RunningRecoveryImage: Reboot into C-Image
    RunningRecoveryImage --> Healthy: A/B 更新成功，驗證通過
    RunningRecoveryImage --> Error: 更新或驗證失敗
    Error --> FatalError: 無法恢復 (HW / Policy)
    FatalError --> [*]

    %% 顏色套用
    classDef good fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    classDef warn fill:#fef9c3,stroke:#eab308,stroke-width:2px
    classDef bad fill:#fee2e2,stroke:#ef4444,stroke-width:2px
    classDef process fill:#e0f2fe,stroke:#3b82f6,stroke-width:2px

    class Healthy good
    class RecoveryMode,RecoveryPending,RunningRecoveryImage process
    class Error warn
    class FatalError bad

```
狀態碼 (DEVICE_STATUS):
---
### 5. 恢復原因碼 (Recovery Reason Codes)
✅ = 可恢復 ｜ ❌ = 無法恢復 ｜ ◐ = 視情況需返廠
```mermaid
flowchart LR
    %% === 樣式 ===
    classDef ok fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#111
    classDef maybe fill:#fff7ed,stroke:#f59e0b,stroke-width:2px,color:#111
    classDef no fill:#fee2e2,stroke:#ef4444,stroke-width:2px,color:#111
    classDef legend fill:#f3f4f6,stroke:#9ca3af,stroke-width:1px,color:#111

    %% === 可恢復 (綠) ===
    subgraph G1 [可恢復 Recoverable]
        direction TB
        ROK["0x5 Key Manifest 遺失/毀損<br/>0x6 Key Manifest 驗證失敗<br/>0x7 Key Manifest 防回滾錯誤<br/>0x8 Boot Loader 遺失/毀損<br/>0x9 Boot Loader 驗證失敗<br/>0xA Boot Loader 防回滾錯誤<br/>0xB 主韌體遺失/毀損<br/>0xC 主韌體驗證失敗<br/>0xD 主韌體防回滾錯誤<br/>0xE Recovery 韌體遺失/毀損<br/>0xF Recovery 韌體驗證失敗<br/>0x10 Recovery 韌體防回滾錯誤<br/>0x11 強制恢復"]:::ok
    end

    %% === 條件式 (橘) ===
    subgraph G2 [條件式 Conditional]
        direction TB
        RMAYBE["0x2 軟體錯誤（可嘗試恢復）<br/>0x3 自我測試失敗<br/>0x4 關鍵資料毀損/遺失"]:::maybe
    end

    %% === 不可恢復 (紅) ===
    subgraph G3 [不可恢復 Unrecoverable]
        direction TB
        RNO["0x1 硬體錯誤（需返廠/RMA）"]:::no
    end

    %% 排版連結（純為左右並排，無語意）
    G1 --- G2 --- G3

    %% === 圖例 ===
    L1(["可恢復"]):::ok --- L2(["條件式"]):::maybe --- L3(["不可恢復"]):::no

```
### 5.1 Mermaid：錯誤處理與可恢復性決策圖
> 說明：將「恢復原因碼」對應到實際路徑（可恢復／需重新供應／返廠）與驗證收斂。綠＝可恢復；橘＝條件式（需再供應）；紅＝返廠；藍＝流程節點；灰＝起訖。
```mermaid
flowchart TD
%% === 類別樣式（Classes） ===
classDef startend fill:#f3f4f6,stroke:#9ca3af,stroke-width:1px,color:#111
classDef recover fill:#dcfce7,stroke:#16a34a,stroke-width:2px
classDef conditional fill:#fff7ed,stroke:#f59e0b,stroke-width:2px
classDef rma fill:#fee2e2,stroke:#ef4444,stroke-width:2px
classDef process fill:#e0f2fe,stroke:#3b82f6,stroke-width:2px
classDef decision fill:#fef9c3,stroke:#eab308,stroke-width:2px


%% === 節點（Nodes） ===
A([錯誤偵測
Error detected])
B{恢復原因碼
Recovery Reason Code}
C[採用 C-Image 進行恢復
Proceed Recovery via C-Image]
D{是否具備重新供應路徑？
Has re-provision path?}
E[送廠 / 安全 RMA
Return to vendor / secure RMA]
F[透過 PLDM/MCTP 更新 A/B
Update A/B via PLDM/MCTP]
G{Attestation 是否通過？
Attestation pass?}
H([Healthy
恢復完成])


%% === 連線（Edges） ===
A --> B
B -->|Key Manifest / Boot / Auth / Anti-rollback issues| C
B -->|Critical Data lost（關鍵資料遺失）| D
B -->|HW Fault（硬體故障）| E


D -->|Yes / 是| C
D -->|No / 否| E


C --> F
F --> G
G -->|Pass / 通過| H
G -->|Fail / 未通過| A


%% === 套用樣式（Apply Classes） ===
class A,H startend
class B,D,G decision
class C recover
class F process
class E rma
```
---
### 6. 恢復介面協定 (Recovery Interface Protocol)
### 6.1 傳輸層 (Transport Layer)
- 物理介面: SMBus/I2C。
- 拓撲: 支援共享或獨立地址（建議 0xD2 獨立地址，因為更安全且不會與 MCTP 衝突）。
- 協定: 使用 SMBus 的塊讀寫命令，每個命令有 8-bit 命令碼 (Command Code)。
- 在共享模式下，若 MCTP 與 Recovery 同時使用 0xD4，可能導致裝置誤判管理封包，進而失敗。
```mermaid
flowchart TB
    %% === 樣式定義 ===
    classDef platform fill:#e0f2fe,stroke:#3b82f6,stroke-width:2px,color:#111
    classDef agent fill:#fef9c3,stroke:#eab308,stroke-width:2px,color:#111
    classDef bus fill:#f3f4f6,stroke:#9ca3af,stroke-width:2px,color:#111
    classDef device fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#111
    classDef warn fill:#fee2e2,stroke:#ef4444,stroke-width:2px,color:#111
    classDef good fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#111

    %% === 共享模式 ===
    subgraph Shared ["共享模式 (0xD4)<br/>可能與 MCTP 衝突 ❌"]
        direction TB
        BMC1["PA-RoT / BMC<br/>平台主動信任根"]:::platform
        RA1["Recovery Agent<br/>恢復代理"]:::agent
        BUS1["I2C / SMBus<br/>匯流排 (位址 0xD4 共用)"]:::warn
        D1["AC-RoT Device #1"]:::device
        D2["AC-RoT Device #2"]:::device

        BMC1 --> BUS1
        RA1 --> BMC1
        BUS1 --> D1
        BUS1 --> D2
    end

    %% === 獨立模式 ===
    subgraph Independent ["獨立模式 (0xD2)<br/>OCP 推薦 ✅"]
        direction TB
        BMC2["PA-RoT / BMC<br/>平台主動信任根"]:::platform
        RA2["Recovery Agent<br/>恢復代理"]:::agent
        BUS2["I2C / SMBus<br/>匯流排 (位址 0xD2 獨立)"]:::good
        D3["AC-RoT Device #1"]:::device
        D4["AC-RoT Device #2"]:::device

        BMC2 --> BUS2
        RA2 --> BMC2
        BUS2 --> D3
        BUS2 --> D4
    end

```
### 6.2 間接記憶體介面 (Indirect Memory Interface - IMI)
- 功能: 用於推送 C-Image，採用視窗化方式存取 AC-RoT 內部記憶體空間。
- 步驟:
- CMS 類型: Code CMS（存放映像）、Log CMS（偵錯日誌）、Vendor Defined CMS。
### 6.3 主要命令時序圖 (Key Commands Sequence)
```mermaid
sequenceDiagram
    participant RA as Recovery Agent
    participant AC as AC-RoT Device

    RA->>AC: Read PROT_CAP (探索能力)
    AC-->>RA: 回報能力 (支援 Push C-Image)

    loop 輪詢狀態
        RA->>AC: Read DEVICE_STATUS
        AC-->>RA: 回報狀態 (例如: 0x2 Error, Reason=0x9 Auth Fail)
    end

    RA->>AC: Write DEVICE_RESET (強制下次開機進入恢復模式)
    note right of AC: 裝置重啟並進入恢復模式

    RA->>AC: Read DEVICE_STATUS
    AC-->>RA: 回報狀態 (0x3 Recovery Mode)

    RA->>AC: Write INDIRECT_CTRL (選擇 Code CMS, offset=0)
    AC-->>RA: 確認

    loop 推送 C-Image 數據塊
        RA->>AC: Write INDIRECT_DATA (Chunk n)
        AC-->>RA: 確認
    end

    RA->>AC: Write RECOVERY_CTRL (啟動 C-Image)
    note right of AC: 裝置重啟並執行 C-Image

    RA->>AC: Read DEVICE_STATUS
    AC-->>RA: 回報狀態 (0x5 Running Recovery Image)

    note over RA,AC: 此時 RA 可用最小化 MCTP/PLDM 推送 A/B 映像

```
### 6.2.1 C-Image 最小功能需求  (Minimal Requirements for C-Image)
C-Image 的設計目標是「讓裝置在最小化環境下仍能被恢復」，因此即使它功能有限，也必須具備以下基本能力：
- 支援最小化 MCTP/PLDM 協定堆疊
- 能接收並驗證 A/B Image
- 能回報狀態與錯誤碼
- 最小化安全信任鏈延續
### 6.3 主要命令 (Key Commands)
- PROT_CAP (能力發現)
- DEVICE_ID (裝置身份)
- DEVICE_STATUS (狀態回報)
- DEVICE_RESET (重置/進入恢復模式)
- RECOVERY_CTRL (選擇/啟動 C-Image)
- INDIRECT_CTRL / INDIRECT_DATA (推送映像檔)
- 錯誤處理: 若命令不支援、參數錯誤、長度錯誤或校驗錯誤，必須在 DEVICE_STATUS 中回報。
---
### 7. 安全威脅模型與對抗策略 (Security Threat Model & Countermeasures)
---
### 8. 實作細節與最佳實踐 (Implementation Details & Best Practices)
- C-Image 設計：
- RA (BMC 端) 設計：
- 合規性要求：
---
### 9. 與其他規範的關聯性 (Relation to Other Specifications)
---
### 8. 結論 (Conclusion)
