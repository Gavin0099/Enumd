以下是根據提供的內容合成的「Secure Firmware Recovery」文件:

# Secure Firmware Recovery 規範詳解

## 1. 總覽與目的 (Executive Summary)
本文件是由 Open Compute Project (OCP) 發布的一份技術規範，旨在為資料中心硬體建立一套標準化、安全且可靠的韌體恢復機制。其核心目標是當一個裝置（如網卡、SSD、加速卡）的韌體損壞、無回應或被惡意竄改時，平台管理者（如 BMC）能夠透過一個獨立於主作業系統的低階通道（Side-band channel），強制該裝置進入恢復模式，並將其恢復到一個已知、可信的安全狀態。此規範基於 NIST SP 800-193《平台韌體彈性指南》的三大支柱：保護 (Protection)、偵測 (Detection) 和恢復 (Recovery)。

### 1.1 系統全景架構圖 (System Overview)
```mermaid
flowchart TB
classDef host     fill:#fef3c7,stroke:#b45309,stroke-width:2px,color:#111
classDef platform fill:#dbeafe,stroke:#1d4ed8,stroke-width:2px,color:#111
classDef agent    fill:#fff1a6,stroke:#a16207,stroke-width:2px,color:#111
classDef bus      fill:#cffafe,stroke:#0891b2,stroke-width:2px,color:#111
classDef device   fill:#bbf7d0,stroke:#15803d,stroke-width:2px,color:#111

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

## 2. 關鍵角色與術語 (Key Roles & Terminology)
- AC-RoT (Active Component Root of Trust): 主動元件信任根。指需要被恢復的裝置，例如一個 PCIe 卡。它本身具備安全啟動和證明能力。
- PA-RoT (Platform Active Root of Trust): 平台主動信任根。通常是平台上的管理控制器，如 BMC (Baseboard Management Controller)。
- RA (Recovery Agent): 恢復代理。通常是 PA-RoT (BMC) 內部的一個軟體模組，負責推送映像檔並協調恢復流程。

韌體映像檔類型:
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

## 3. 恢復觸發條件與場景 (Recovery Triggers & Scenarios)
觸發條件:
1. 平台偵測異常（Attestation 測量值不符）。
1. 裝置自我偵測（安全啟動失敗、防回滾錯誤、關鍵資料損壞）。
1. 裝置無回應（無法透過 MCTP 溝通）。
1. 強制恢復（由管理者策略或維護需求觸發）。

使用場景:
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

## 4. 恢復流程詳解 (Recovery Process Flow)
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

## 5. 恢復原因碼 (Recovery Reason Codes)
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
        ROK["0x5 Key Manifest 遺失/毀損<br/>0x6 Key Manifest 驗證失敗<br/>0x7 Key Manifest 防回滾錯誤<br/>0x8 Boot Loader 遺失/毀損<br/>0x9 Boot Loader 驗證失敗<br/>0xA Boot Loader 防回滾錯誤<br/>0xB 主韌體遺失/毀損<br/>0xC 主韌體驗證失敗<br/>0xD 主韌體防回滾錯誤<br/>0xE Recovery 韌體遺失/毀損<br/>0xF Recovery 韌體驗證失敗<br/>0x10 