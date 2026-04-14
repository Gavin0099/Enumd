
# 通用 USB 過濾驅動程式 (Generic USB Filter Driver)

## 專案概述 (Overview)

此專案包含核心驅動程式 (Kernel Driver) 與相關的安裝檔案 (.inf)。驅動程式會掛載 (Attach) 在目標 USB 裝置的驅動程式堆疊 (Driver Stack) 上，攔截並處理 PnP (Plug and Play) 與 Power 事件，同時提供 Control Device Object (CDO) 供使用者模式 (User-Mode) 的應用程式進行通訊。

### 核心功能 (Key Features)

- ⚙️ 多模式運作 (Multi-Mode Operation)

## 系統架構 (System Architecture)

下圖展示了 User Mode Application 與 Kernel Mode Driver 之間的互動架構。


    
        App["<b>User Mode App</b><br/>OCI Tool / Updater"]:::inputNode

        
            PDO["<b>Physical Device Object</b><br/>USB Hub / Compound"]:::processNode
        

    App -->|"Opens Handle<br/>開啟控制代碼"| CDO
    App -->|"Sends IOCTL<br/>發送控制指令"| CDO

## In-System Programming (ISP) 模式詳細技術說明

### 1. ISP 核心架構與路徑

在 ISP 模式下，驅動程式扮演「橋樑」的角色。以下圖表展示了指令如何從 User Mode 穿透驅動層到達硬體。


        App["<b>ISP Tool</b><br/>Firmware Updater"]:::inputNode



    App -->|"Sends Command<br/>發送指令"| IOCTL

### 2. ISP 工作流程 (Workflow)



    Start(["<b>Device Plugged In</b><br/>裝置插入"]):::inputNode
    


    Start --> CheckID
    CheckID --> Decision
    Decision -- "No (Mouse/KB)" --> Skip
    Decision -- "Yes (Genesys/Belkin)" --> Attach

### 3. ISP 關鍵程式碼分析

### 4. ISP 安全性與限制

> ⚠️ 無狀態保存 (Stateless Design)

## 驅動程式初始化流程 (Initialization Flow)



    Start(["<b>DriverEntry</b><br/>驅動程式進入點"]):::inputNode 
    --> Init["<b>Init Config</b><br/>初始化 WDF 設定"]:::inputNode
    
    subgraph Device_Add ["Device Add Event (裝置新增事件)"]
        
        CheckSkip -- "No (Target Hub)" --> CreateDev["<b>Create Device</b><br/>建立 FiDO"]:::keyNode
        
        
        CreateCDO -- No --> End(["<b>Finish</b><br/>完成"]):::keyNode

## IOCTL 命令列表 (IOCTL Commands)


## WDK Modernization Plan (WDK 現代化計畫)


### 使用者審查事項 (User Review Required)

> ❗ IMPORTANT: Build System Change
> 🚨 WARNING: KMDF Version Upgrade

### 遷移架構圖 (Migration Architecture)



        ActSec["<b>Security Hardening</b><br/>Use Safe String/Pool"]:::actionNode
        ActUp["<b>Update INF</b><br/>Set Version to 1.25"]:::actionNode



### 變更細節 (Proposed Changes)

#### 1. Code Security & Safety [Safe]

替換 utility.c 與 filter_control.c 中已棄用或不安全的函數。

- 🔒 Memory Allocation: 將 NonPagedPool 替換為 NonPagedPoolNx (No-Execute)，防止代碼注入攻擊。

#### 2. INF Configuration [Safe]

- 📄 glusbflt.inf: 將 KmdfLibraryVersion 設定更新為 1.25。

#### 3. Build System [NEW]


## 編譯與安裝 (Build and Install)


- WDK (Windows Driver Kit): 安裝支援 KMDF 1.x 的 WDK。
- 使用 Visual Studio 2019/2022 開啟 glusbflt.vcxproj 進行編譯。


1. 進入 isp_x64\install。

## 檔案結構 (File Structure)

- 📄 filter_control.c: 處理 IOCTL 請求。
- 📄 filter_fdo.c: 處理 PnP 與 Power 事件。
- 📁 isp_x64/: Binary 與 INF 輸出目錄。

[filter.c](filter.c)
[filter_ioctl.h](filter_ioctl.h)
[filter_control.c](filter_control.c)
[filter_fdo.c](filter_fdo.c)