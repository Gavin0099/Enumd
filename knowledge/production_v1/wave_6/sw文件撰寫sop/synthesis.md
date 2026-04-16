以下是基於提供的內容邊界所合成的 SW 文件撰寫 SOP 報告:



1. 開會討論後，要記得編寫相關文件，下面會列出應該撰寫的文件清單。 [`/general/sw文件撰寫sop.html`]
2. 編寫好的文件要指定相關工作人員進行審閱。 [`/general/sw文件撰寫sop.html`]
3. 文件最好以 Word 格式撰寫，並將連結設定在 GitLab 上，或直接在 GitLab 上編寫。 [`/general/sw文件撰寫sop.html`]
4. 每次開會時，都要討論是否需要新增文件或檢查現有文件是否已完成撰寫。 [`/general/sw文件撰寫sop.html`]
5. 文件清單要包含作者、開始時間和結束時間。 [`/general/sw文件撰寫sop.html`]

## 文件編寫 Check List

### HID Code Sign 記錄 [`/code-sign/hid-code-sign-記錄.html`]
- Vendor Command 第二碼

### 工具與測試 [`/code-sign/hid-code-sign-記錄.html`]
- 驗證工具位置: `file:///\\genesyslogic.com.tw\GenesysData\SW_Release_New\Hub\HID\Tool`

### 執行中 [`/code-sign/hid-code-sign-記錄.html`]
- 解決 HID 驗證 USB LOGO 問題
- 整理 chip function list，列出各 chip 機制的差異
- FW UPD 已經是 open source，但 SW 目前無法 Build，無法測試

### 待討論 [`/code-sign/hid-code-sign-記錄.html`]
- [未有直接 Source 錨點，待確認] Chrome book 上的工具應該可以直接執行和更新，SW 需要討論如何測試和驗證
- 討論 ISP tool 在燒錄時，需要明確提示是使用 filter driver 還是 HID

### 已驗證 & 解決 [`/code-sign/hid-code-sign-記錄.html`]
- 2021/11/05 HID 會把重抓到的 device 當成不同個
- 2021/11/05 OS 有時認不到裝置，裝置管理員上顯示驚嘆號
- 2021/11/05 Scaler update 在 set report 時，會有資料沒有傳下去的問題
- 2021/11/05 Scaler update 在 write command 時速度慢
- 2021/11/05 驗證資料時出錯（ISP_ERR_VERIFY_DEVICE）
- 2021/11/05 程式閃退
- 2021/11/08 驗證資料時出錯（ISP_ERR_SEND_COMMAND）
- 2021/11/19 請 MTK 導入 Hardware CRC 的機制（被拒絕）

### 會議記錄 [`/code-sign/hid-code-sign-記錄.html`]
- 2021/12/17 HP ISP Tool

## Secure Firmware Recovery [`/general/secure-firmware-recovery.html`]

本文件詳述 Open Compute Project (OCP) 發布的「安全韌體恢復」技術規範。其核心目標是當裝置韌體損壞或被惡意竄改時，平台管理者能夠透過獨立的低階通道將其恢復到已知的安全狀態。

此規範基於 NIST SP 800-193 的三大支柱:保護、偵測和恢復。

classDef host     fill:#fef3c7,stroke:#b45309,stroke-width:2px,color:#111
classDef platform fill:#dbeafe,stroke:#1d4ed8,stroke-width:2px,color:#111
classDef agent    fill:#fff1a6,stroke:#a16207,stroke-width:2px,color:#111
classDef bus      fill:#cffafe,stroke:#0891b2,stroke-width:2px,color:#111
classDef device   fill:#bbf7d0,stroke:#15803d,stroke-width:2px,color:#111

subgraph HOST ["Host 主機域"]
  RC["CPU / PCIe Root Complex"]:::host
  OS["Host OS"]:::host

subgraph PLATFORM ["PA-RoT / BMC 平台管理域"]
  BMC["BMC (PA-RoT)"]:::platform
  RA["Recovery Agent"]:::agent

subgraph MGMT ["正常管理匯流排"]
  PLDM["PLDM for FW Update<br/>(over MCTP)"]:::bus
  SPDM["SPDM Measurements"]:::bus
  MGMT_BUS["Device Mgmt Backplane<br/>(聚合中繼)"]:::bus

subgraph REC ["Recovery Bus<br/>SMBus 0xD2（獨立位址）"]
  RBUS["Recovery Interface"]:::bus

subgraph DEVS ["AC-RoT Devices 裝置群"]
  DEV_BUS["Device Fabric<br/>(裝置內部管理匯流排)"]:::bus
  subgraph NICG ["NIC"]
    NIC["NIC Device"]:::device
  subgraph SSDG ["SSD"]
    SSD["SSD Device"]:::device
  subgraph ACCG ["Accelerator"]
    ACC["Accelerator Device"]:::device

OS -->|功能/資料| DEV_BUS

PLDM --> MGMT_BUS
SPDM --> MGMT_BUS
MGMT_BUS --> DEV_BUS

RBUS --> DEV_BUS


- AC-RoT (Active Component Root of Trust): 需要被恢復的裝置，具備安全啟動和證明能力。
- PA-RoT (Platform Active Root of Trust): 平台管理控制器，如 BMC。
- RA (Recovery Agent): 位於 PA-RoT 內部的軟體模組，負責推送映像檔並協調恢復流程。
  - A/B Image (營運映像檔)
  - C-Image (恢復映像檔)
  - 關鍵資料 (Critical Data)

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
    AR[Anti-rollback Counter<br/>防回滾計數器]
    SB[Secure Boot Keys<br/>安全啟動金鑰]

%% --- 關係：策略如何強制驗證其他元件 (Relationships: Policy Enforcement) ---
S_POLICY -. Enforced Validation<br/>強制驗證 .-> KM
S_POLICY -. Enforced Validation<br/>強制驗證 .-> BL
S_POLICY -. Enforced Validation<br/>強制驗證 .-> CIMG
S_POLICY -. Enforced Validation<br/>強制驗證 .-> AB

%% --- 將樣式套用到對應的節點 (Apply Classes to Nodes) ---
class KM manifest
class AR,SB policy

### 3. 恢復觸發條件與場景
1. 平台偵測異常（Attestation 測量值不符）
2. 裝置自我偵測（安全啟動失敗、防回滾錯誤、關鍵資料損壞）
3. 裝置無回應（無法透過 MCTP 溝通）
[未有直接 Source 錨點，待確認] 4. 強制恢復（由管理者策略或維護需求觸發）

- 正常更新：僅韌體升級，不動用此恢復機制
- 帶有關鍵資料的恢復：重寫韌體，身份保持不變
- 不帶關鍵資料的恢復：必須重新配置裝置身份與安全參數

classDef startend fill:#f3f4f6,stroke:#9ca3af,stroke-width:1px,color:#111
classDef decision fill:#fef9c3,stroke:#eab308,stroke-width:2px
classDef process fill:#e0f2fe,stroke:#3b82f6,stroke-width:2px
classDef action fill:#dcfce7,stroke:#16a34a,stroke-width:2px
classDef stop fill:#fee2e2,stroke:#ef4444,stroke-width:2px

A([Start / 開始]):::startend --> B{Trigger Source? / 觸發來源?}:::decision
B -->|Platform attestation mismatch / 平台證明不符| C[Query DEVICE_STATUS / 查詢狀態]:::process
B -->|Device self-detect failure / 裝置自檢失敗| C
B -->|Device unresponsive / 裝置無回應| D[Write DEVICE_RESET / 寫入強制恢復]:::action
B -->|Operator policy forced / 管理者強制| D

C --> E{Status? / 狀態判斷}:::decision
E -->|Healthy / 健康| Z([Stop / 結束]):::stop
E -->|Error / 錯誤| F[Plan Recovery / 規劃恢復]:::process
E -->|Recovery Mode / 恢復模式| G[Proceed to Image Loading / 進入映像載入]:::action


G --> H{C-Image source? / 恢復映像來源?}:::decision
H -->|Push via IMI / 透過 IMI 推送| I[INDIRECT_CTRL / INDIRECT_DATA]:::process
H -->|Local persistent / 使用本地 C-Image| J[Select persistent C-Image / 選擇內建映像]:::action

I --> K[RECOVERY_CTRL → Reboot to C-Image / 重啟進入 C-Image]:::action
K --> L[PLDM/MCTP minimal stack / 寫入 A/B 韌體]:::process
L --> M[Reboot to A/B & attest / 重啟並驗證]:::process
M --> N{Attestation pass? / 驗證通過？}:::decision
N -->|Yes / 通過| Z
N -->|No / 失敗| F

1. 偵測 (Detection) → PA-RoT 判斷 AC-RoT 不健康
2. 狀態查詢 (Status Check) → RA 讀取 DEVICE_STATUS
3. 進入恢復模式 (Entering Recovery) → 可透過 DEVICE_RESET 觸發
4. 載入恢復映像檔 (Image Loading) → Push C-Image 或選擇本地 C-Image
5. 啟動恢復映像檔 (Activation) → RECOVERY_CTRL 控制重啟並執行 C-Image
6. 執行恢復 (Recovery Execution) → 推送完整的 A/B Image
7. 完成與驗證 (Completion & Verification) → 重啟後由 Attestation 驗證健康狀態

state "Healthy\\n健康" as Healthy
state "Error / 錯誤" as Error
state "Recovery Mode\\n恢復模式" as RecoveryMode
state "Recovery Pending\\n等待啟動恢復" as RecoveryPending
state "Running Recovery Image\\n執行恢復映像" as RunningRecoveryImage
state "Fatal Error / 致命錯誤" as FatalError

Healthy --> Error: Attestation fail / 自檢失敗
Healthy --> RecoveryMode: Forced Recovery (DEVICE_RESET flag)
Error --> RecoveryMode: DETECTED & RECOVERY_REQUIRED
RecoveryMode --> RecoveryPending: RECOVERY_CTRL 選擇/推送 C-Image
RecoveryPending --> RunningRecoveryImage: Reboot into C-Image
RunningRecoveryImage --> Healthy: A/B 更新成功，驗證通過
RunningRecoveryImage --> Error: 更新或驗證失敗
Error --> FatalError: 無法恢復 (HW / Policy)