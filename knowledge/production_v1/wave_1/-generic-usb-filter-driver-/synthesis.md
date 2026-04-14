以下是 Generic USB Filter Driver 的綜合 Markdown 報告:

# Generic USB Filter Driver 概述

## 專案概述 (Overview)
此專案包含核心驅動程式 (Kernel Driver) 與相關的安裝檔案 (.inf)。驅動程式會掛載 (Attach) 在目標 USB 裝置的驅動程式堆疊 (Driver Stack) 上，攔截並處理 PnP (Plug and Play) 與 Power 事件，同時提供 Control Device Object (CDO) 供使用者模式 (User-Mode) 的應用程式進行通訊。

### 核心功能 (Key Features)
- 🛡️ 裝置過濾 (Device Filtering)
- ⚙️ 多模式運作 (Multi-Mode Operation)
- 📡 IOCTL 通訊介面

## 系統架構 (System Architecture)
下圖展示了 User Mode Application 與 Kernel Mode Driver 之間的互動架構。

```mermaid
flowchart TD
    %% --- 1. 定義樣式 (Class Definitions) ---
    classDef titleNode fill:transparent,stroke:transparent,font-weight:bold
    classDef inputNode fill:transparent,stroke:#FBBF24,stroke-width:2.5px
    classDef keyNode fill:transparent,stroke:#34D399,stroke-width:2.5px
    classDef processNode fill:transparent,stroke:#F87171,stroke-width:2.5px

    %% --- 2. 圖表結構 (Chart Structure) ---
    
    %% === 使用者模式區塊 (User Mode) ===
    subgraph User_Mode ["User Mode (使用者模式)"]
        direction TB
        App["<b>User Mode App</b><br/>OCI Tool / Updater"]:::inputNode
        IOCTL["<b>DeviceIoControl</b><br/>GL_IOCTL_xxx"]:::inputNode
    end

    %% === 核心模式區塊 (Kernel Mode) ===
    subgraph Kernel_Mode ["Kernel Mode (核心模式)"]
        direction TB
        CDO["<b>Control Device Object</b><br/>CDO: \Device\glusbflt"]:::keyNode
        
        subgraph Driver_Stack ["Driver Stack"]
            direction TB
            FiDO["<b>Filter Device Object</b><br/>GLUsbFlt.sys"]:::processNode
            PDO["<b>Physical Device Object</b><br/>USB Hub / Compound"]:::processNode
        end
        
        WDF["<b>WDF Framework</b><br/>Windows Driver Framework"]:::keyNode
    end

    %% --- 3. 連接線與邏輯 (Connections) ---
    App -->|"Opens Handle<br/>開啟控制代碼"| CDO
    App -->|"Sends IOCTL<br/>發送控制指令"| CDO
    CDO -.->|"Forward/Process<br/>轉發或處理"| FiDO
    FiDO -->|"Filter/Pass-through<br/>過濾或放行"| PDO
    FiDO -->|"Identify Device<br/>識別裝置"| WDF
```

## ISP Mode 詳細技術說明 (In-System Programming)

### 1. ISP 核心架構與路徑
在 ISP 模式下，驅動程式扮演「橋樑」的角色。以下圖表展示了指令如何從 User Mode 穿透驅動層到達硬體。

```mermaid
flowchart TD
    %% --- 1. 定義樣式 ---
    classDef inputNode fill:transparent,stroke:#FBBF24,stroke-width:2.5px
    classDef keyNode fill:transparent,stroke:#34D399,stroke-width:2.5px
    classDef processNode fill:transparent,stroke:#F87171,stroke-width:2.5px
    classDef hwNode fill:transparent,stroke:#60A5FA,stroke-width:2.5px

    %% --- 2. 架構層級 ---
    subgraph User_Mode ["User Mode (應用層)"]
        direction TB
        App["<b>ISP Tool</b><br/>Firmware Updater"]:::inputNode
        IOCTL["<b>IOCTL Interface</b><br/>DeviceIoControl"]:::inputNode
    end

    subgraph Kernel_Mode ["Kernel Mode (核心層)"]
        direction TB
        Driver["<b>GLUSBFLT.SYS</b><br/>Filter Driver"]:::keyNode
        FDO["<b>Filter Device Object</b><br/>處理 IOCTL Request"]:::processNode
        PDO["<b>Physical Device Object</b><br/>USB Bus Driver"]:::processNode
    end

    subgraph Hardware ["Hardware (硬體層)"]
        HubChip["<b>Hub MCU</b><br/>Genesys Logic Chip"]:::hwNode
    end

    %% --- 3. 傳輸路徑 ---
    App -->|"Sends Command<br/>發送指令"| IOCTL
    IOCTL -->|"GL_IOCTL_VENDOR_REQUEST<br/>傳遞請求"| Driver
    Driver -->|"WDF Request<br/>轉換格式"| FDO
    FDO -->|"USB URB<br/>USB 請求區塊"| PDO
    PDO -->|"USB Bus<br/>匯流排傳輸"| HubChip
```

### 2. ISP 工作流程 (Workflow)
驅動程式如何識別裝置並建立通訊通道？

```mermaid
flowchart TD
    %% --- 樣式定義 ---
    classDef inputNode fill:transparent,stroke:#FBBF24,stroke-width:2.5px
    classDef processNode fill:transparent,stroke:#F87171,stroke-width:2.5px
    classDef keyNode fill:transparent,stroke:#34D399,stroke-width:2.5px

    %% --- 流程步驟 ---
    Start(["<b>Device Plugged In</b><br/>裝置插入"]):::inputNode
    
    subgraph Initialization ["Phase 1: Filtering & Attachment"]
        CheckID["<b>Check Hardware ID</b><br/>檢查 VID/PID"]:::processNode
        Decision{"<b>Target Device?</b><br/>是否為 Hub?"}:::processNode
        Attach["<b>Attach Filter</b><br/>掛載驅動 (filter.c)"]:::keyNode
        Skip["<b>Skip Device</b><br/>忽略非目標裝置"]:::processNode
    end

    subgraph Communication ["Phase 2: Communication"]
        CreateCDO["<b>Create Control Channel</b><br/>建立 Sideband CDO"]:::keyNode
        Enum["<b>Enumeration</b><br/>GL_IOCTL_ENUM_DEVICES"]:::inputNode
        VendorCmd["<b>Vendor Request</b><br/>GL_IOCTL_USB_VENDOR_REQUEST"]:::inputNode
        HardwareAction["<b>Flash Update</b><br/>韌體燒錄/讀寫"]:::processNode
    end

    %% --- 連接 ---
    Start --> CheckID
    CheckID --> Decision
    Decision -- "No (Mouse/KB)" --> Skip
    Decision -- "Yes (Genesys/Belkin)" --> Attach
    Attach --> CreateCDO
    CreateCDO --> Enum
    Enum --> VendorCmd
    VendorCmd --> HardwareAction
```

### 3. ISP 關鍵程式碼分析
### 4. ISP 安全性與限制
> ⚠️ 無狀態保存 (Stateless Design)

## 驅動程式初始化流程 (Initialization Flow)
當系統偵測到新裝置時，DriverEntry 註冊的回呼函數 FilterEvtDeviceAdd 會被觸發。

```mermaid
flowchart TD
    %% --- 1. 定義樣式 ---
    classDef titleNode fill:transparent,stroke:transparent,font-weight:bold
    classDef inputNode fill:transparent,stroke:#FBBF24,stroke-width:2.5px
    classDef keyNode fill:transparent,stroke:#34D399,stroke-width:2.5px
    classDef processNode fill:transparent,stroke:#F87171,stroke-width:2.5px

    %% --- 2. 流程結構 ---
    Start(["<b>DriverEntry</b><br/>驅動程式進入點"]):::inputNode 
    --> Init["<b>Init Config</b><br/>初始化 WDF 設定"]:::inputNode
    --> Register["<b>Register Callback</b><br/>註冊 EvtDeviceAdd"]:::inputNode
    
    subgraph Device_Add ["Device Add Event (裝置新增事件)"]
        direction TB
        EvtAdd["<b>EvtDeviceAdd</b><br/>觸發新增裝置"]:::inputNode 
        --> queryID["<b>Query HWID</b><br/>查詢硬體識別碼"]:::processNode
        --> CheckSkip{"<b>Skip Logic?</b><br/>檢查排除邏輯"}:::processNode
        
        CheckSkip -- "Yes (PCI, RootHub)" --> RetSuccess["<b>Return Success</b><br/>不掛載 Filter"]:::keyNode
        CheckSkip -- "No (Target Hub)" --> CreateDev["<b>Create Device</b><br/>建立 FiDO"]:::keyNode
        
        CreateDev --> RegPnP["<b>Register PnP</b><br/>註冊回呼"]:::processNode
        --> AddColl["<b>Add Collection</b><br/>加入清單"]:::processNode
        --> CreateCDO{"<b>First Device?</b><br/>首個裝置?"}:::processNode
        
        CreateCDO -- Yes --> InitCDO["<b>Create CDO</b><br/>建立控制物件"]:::keyNode
        CreateCDO -- No --> End(["<b>Finish</b><br/>完成"]):::keyNode
        InitCDO --> End
    end
```

## IOCTL 命令列表 (IOCTL Commands)
定義於 filter_ioctl.h 中的主要控制碼：

## WDK Modernization Plan (WDK 現代化計畫)

### 目標 (Goal)
將 Generic USB Filter Driver 專案從舊版 WDK 環境遷移至現代化的 WDK 標準。

### 使用者審查事項 (User Review Required)
> ❗ IMPORTANT: Build System Change
> 🚨 WARNING: KMDF Version Upgrade

### 遷移架構圖 (Migration Architecture)

```mermaid
flowchart TD
    %% --- 1. 定義樣式 ---
    classDef legacyNode fill:transparent,stroke:#9CA3AF,stroke-width:2.5px,stroke-dasharray: 5 5
    classDef actionNode fill:transparent,stroke:#FBBF24,stroke-width:2.5px
    classDef modernNode fill:transparent,stroke:#34D399,stroke-width:2.5px

    %% --- 2. 圖表結構 ---
    subgraph Legacy_State ["Legacy Environment<br/>(舊環境)"]
        direction TB
        OldBuild["<b>Legacy Build</b><br/>sources + makefile"]:::legacyNode
        OldAPI["<b>Unsafe APIs</b><br/>NonPagedPool / sprintf"]:::legacyNode
        OldWDF["<b>KMDF 1.9</b><br/>Windows 7 Support"]:::legacyNode
    end

    subgraph Migration_Actions ["Migration Process<br/>(遷移過程)"]
        direction TB
        ActBuild["<b>Create Project</b><br/>glusbflt.vcxproj"]:::actionNode
        ActSec["<b>Security Hardening</b><br/>Use Safe String/Pool"]:::actionNode
        ActUp["<b>Update INF</b><br/>Set Version to 1.25"]:::actionNode
    end

    subgraph Modern_State ["Modern Standard<br/>(新標準)"]
        direction TB
        NewBuild["<b>MSBuild System</b><br/>VS2019 / VS2022"]:::modernNode
        NewAPI["<b>Secure Code</b><br/>NX Pool / RtlStringCch"]:::modernNode
        NewWDF["<b>KMDF 1.25</b><br/>Win10 1809+ / Win11"]:::modernNode
    end

    %% --- 3. 連接邏輯 ---
    OldBuild --> ActBuild --> NewBuild
    OldAPI --> ActSec --> NewAPI
    OldWDF --> ActUp --> NewWDF
```

### 變更細節 (Proposed Changes)

#### 1. Code Security & Safety [Safe]
替換 utility.c 與 filter_control.c 中已棄用或不安全的函數。
- 🔒 Memory Allocation: 將 NonPagedPool 替換為 NonPagedPoolNx (No-Execute)，防止代碼注入攻擊。
- 🛡️ String Handling: 將 sprintf, strcpy 替換為 RtlStringCchPrintfA, RtlStringCchCopyA。

#### 2. INF Configuration [Safe]
- 📄 glusbflt.inf: 將 KmdfLibraryVersion 設定更新為 1.25。

#### 3. Build System [NEW]
- 🆕 glusbflt.vcxproj: 建立標準 KMDF Driver 專案結構，包含所有原始碼並設定 ARM64/x64 編譯配置。

## 編譯與安裝 (Build and Install)

### 編譯環境
- WDK (Windows Driver Kit): 安裝支援 KMDF 1.x 的 WDK。
- 使用 Visual Studio 2019/2022 開啟 glusbflt.vcxproj 進行編譯。

### 安裝方式
1. 進入 isp_x64\install。
1. 右鍵點擊 glusbflt.inf 並選擇 安裝 (Install)。
1. 或使用 devcon:Bash

## 檔案結構 (File Structure)
- 📄 filter.c: 驅動程式進入點與裝置新增邏輯。
- 📄 filter_ioctl.h: 定義 IOCTL Control Codes。
- 📄 filter_control.c: 處理 IOCTL 請求。
- 📄 filter_fdo.c: 處理 PnP 與 Power 事件。
- ⚙️ glusbflt.vcxproj: (New) MSBuild 專案檔。
- 📁 isp_x64/: Binary 與 INF 輸出目錄。