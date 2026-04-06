---
title: HP OCI Tool 現行架構解析
domain_tags:
  - firmware
  - tools
task_tags:
  - spec
  - sop
authority_level: source
is_deprecated: false
category: firmware
notion_id: 26f64f6b-c656-8024-9e1f-f0324389728e
notion_url: 'https://www.notion.so/HP-OCI-Tool-26f64f6bc65680249e1ff0324389728e'
notion_updated_at: '2026-01-23T05:43:00.000Z'
exported_at: '2026-04-06T13:15:17.193Z'
is_summarized: false
relations: []
---

> 文件目標：本報告旨在對HP OCI Tool專案的現行架構進行分析。透過對 C# 原始碼、專案結構及底層 C++ 函式庫的詳細審視，本文將精準地描繪系統的運作方式、設計模式、職責劃分，並從程式碼中提取關鍵證據，以客觀地揭示當前架構的優點與亟待解決的核心痛點。
---
### 1. 宏觀架構：三大解決方案
整個 OCI Tool 生態系由三個獨立的 Visual Studio 解決方案構成，各司其職，形成了一個典型的分層體系。
### 🎨 OCI Tool 內部詳細架構圖 (最終版)
這張圖表詳細描繪了 OCI 專案內部各個關鍵 C# 檔案之間的依賴與呼叫關係。
```mermaid
flowchart TB
    %% --- 樣式 ---
    classDef solution fill:transparent,stroke:#F59E0B,stroke-width:2.5px
    classDef exeProject fill:transparent,stroke:#3B82F6,stroke-width:2px
    classDef libProject fill:transparent,stroke:#EC4899,stroke-width:2px
    classDef cppProject fill:transparent,stroke:#10B981,stroke-width:2px
    classDef toolProject fill:transparent,stroke:#8B5CF6,stroke-width:2px
    classDef layer fill:transparent,stroke:#6B7280,stroke-width:1.5px,stroke-dasharray:4 4
    classDef importantNode fill:transparent,stroke:#D946EF,stroke-width:2px
    classDef utilNode fill:transparent,stroke:#84CC16,stroke-width:1.5px,stroke-dasharray:3 3
    classDef connection stroke:#9CA3AF,stroke-width:1.5px

    %% --- OCI.sln (放上方) ---
  
    
    subgraph Solution_OCI["OCI.sln C# 應用程式"]
      subgraph Project_OCI["OCI 主專案 .exe"]
        AppCore["AppCoreContext.cs<br>決定執行更新模式(單/多)"]
        subgraph View["View UI 層"]
          MainWindow["MainWindow.xaml<br>單螢幕主畫面"]
          Multi-MonitorMainWindow["MultiMonitorMainWindow.xaml<br>多螢幕主畫面"]
        end
        
        subgraph ViewModel["ViewModel 層"]
          MainWindowVM["MainWindowViewModel.cs<br>UI層面邏輯(Property,Command)"]
          FWUpdateMainVM["FWUpdateMainViewModel.cs<br>單螢幕更新流程主控制器"]
          FWUpdateItemVM["FWUpdateItemViewModel.cs<br>單一裝置狀態機"]
          HubDeviceVM["HubDeviceViewModel.cs<br>控制Hub邏輯"]
          MultiMonitorVM["MultiMonitorViewModel.cs<br>UI層面邏輯(Property,Command)"]
          MonitorVM["MonitorVieweModel.cs<br>每個螢幕更新流程控制器"]
        end
        

        subgraph Model_Logic["Service & Logic<br>核心邏輯"]
          UnmanagedFWControl["UnmanagedFirmwareControl.cs<br>韌體更新執行者"]
          HubControl["HubControl.cs<br>USB Hub 控制器"]
          UnmanagedLoader["UnmanagedLibLoader.cs<br>C++ DLL 載入器"]
         %% Builder["FirmwareControlBuilder.cs<br>物件建立工廠"]
        end

        subgraph Utility["Utility 輔助層"]
          
          GLogger["GLogger.cs<br>日誌紀錄器"]
          LangProvider["LanguageProvider.cs<br>多國語言提供者"]
        end
      end
    end

    %% --- 外部函式庫 (放中間) ---
    subgraph External_Libs["外部函式庫 (被 OCI.exe 呼叫)"]
    %%  subgraph Solution_HPFI["HP.FirmwareInstall 介面庫 .dll"]
    %%    Interfaces["IFirmwareInstall.cs<br>韌體更新介面（契約）"]
    %%    DataModels["FirmwareVersion.cs<br>資料模型"]
    %%  end

      subgraph Solution_UsbHub["HP_OCI.sln C++ ISP 底層"]
        DeviceDll["GlOciDll_Device.dll"]
        FirmwareDll["GlOciDll_Hub_L1.dll"]
      end
    end
    
    %% --- 輔助工具 (放下方，獨立) ---
    subgraph Support_Tools ["輔助工具 (獨立執行)"]
      subgraph Solution_UsbView["usbview.sln 輔助偵錯工具"]
         UsbViewExe["usbview.exe<br>USB 裝置偵錯檢視器"]
      end
    end

    %% --- 垂直呼叫關係（由上往下） ---
   %% View -->|資料綁定| ViewModel
    MainWindow -->|資料綁定|MainWindowVM
    MainWindowVM-->|使用|FWUpdateMainVM 
    Multi-MonitorMainWindow -->|資料綁定| MultiMonitorVM
    FWUpdateItemVM-->|驅動| UnmanagedFWControl
    UnmanagedFWControl -->|使用| UnmanagedLoader
    HubControl -->|使用| UnmanagedLoader
    UnmanagedLoader -->|P/Invoke| DeviceDll
    UnmanagedLoader -->|P/Invoke| FirmwareDll
    HubDeviceVM -->|驅動| HubControl 
    
    
    %% --- 橫向與框架依賴 ---
    AppCore -->|產生|View 
    FWUpdateMainVM -->|管理| FWUpdateItemVM    
    MultiMonitorVM-->|管理| MonitorVM
    MonitorVM     -->|管理| FWUpdateItemVM    
   %% UnmanagedFWControl -->|實作| Interfaces
    FWUpdateMainVM  -->|擁有| HubDeviceVM 
    MultiMonitorVM -->|擁有| HubDeviceVM 
   %% FWUpdateMainVM -->|Depends on| Builder
    View -->|使用| LangProvider
    ViewModel -->|使用| GLogger & LangProvider
    Model_Logic -->|使用|GLogger

    %% --- 樣式套用 ---
    class Solution_OCI,Solution_UsbHub,Solution_HPFI,External_Libs,Solution_UsbView,Support_Tools solution
    class Project_OCI exeProject
    class DeviceDll,FirmwareDll cppProject
    class UsbViewExe toolProject
    class View,ViewModel,Model_Logic,Utility layer
    class FWUpdateMainVM,AppCore,HubDeviceVM,MultiMonitorVM,MonitorVM,FWUpdateItemVM,MainWindowVM importantNode
    class GLogger,LangProvider,UnmanagedLoader,HubControl,Builder,DataModels,UnmanagedFWControl utilNode
```
### OCI Tool 啟動初始化流程圖
```mermaid
flowchart TB
    %% --- 樣式定義 ---
    classDef userAction fill:#FEF9E7,stroke:#F7DC6F,stroke-width:2px
    classDef viewModel fill:#EDE7F6,stroke:#4527a0,stroke-width:2px
    classDef modelLogic fill:#FFFDE7,stroke:#F9A825,stroke-width:2px
    classDef step fill:transparent,stroke:#6B7280,stroke-width:1.5px,stroke-dasharray: 4 4
    classDef decision fill:transparent,stroke:#FBBF24,stroke-width:2.5px
    classDef hardware fill:#F1F8E9,stroke:#558B2F,stroke-width:2px
    classDef result fill:#FADBD8,stroke:#E74C3C,stroke-width:2px
    classDef success fill:#D5F5E3,stroke:#27AE60,stroke-width:2px

    classDef solution fill:transparent,stroke:#F59E0B,stroke-width:2.5px
    %% 為 Yes/No 節點定義新樣式
    classDef yesNode fill:transparent,color:#27AE60,font-weight:bold
    classDef noNode fill:transparent,color:#E74C3C,font-weight:bold

    %% --- 節點定義 ---
    subgraph User_Action_Layer [使用者操作層]
        Start["使用者開啟程式 <br>'HP OCI Tool'"]
    end
    
    subgraph App_Layer [Application 層]
       ArgsParse["接收與解析參數"]
       DecisionAPPParse{參數是否正確}     
       YesAPPParse(是)
       NoAPPParse(否)
       FileValidator["驗證檔案合法性"]
       DecisionFileValidator{檔案是否竄改}
       YesFileValidator(是)
       NoFileValidator(否)
       QueryHubToken["Query Hub Token"]
       DecisionHubCount{Hub Token Count>0}
			 YesHubCount(是)
       NoHubCount(否)
       DecisionMonitorModel{Hub Token Count >1}
       YesMonitorModel(是)
       NoMonitorModel(否)      
    end

    subgraph ViewModel_Layer [ViewModel層]
	     SingleMonitor["執行單螢幕初始化<br> MainWindowViewModel.cs"]
       MonitorMonitor["執行多螢幕初始化<br> MultiMonitorViewModel.cs"]      
       Single_HubInit["HubDevice 初始化<br>HubDeviceViewModel.cs"] 
       
       Decision_SingleHubInit{HubHubDevice<br>初始化成功?}
       Yes_SingleHubInit(是)
       No_SingleHubInit(否)
       Single_GetPackageVersion["Load Package Version"]
       subgraph FW_VM_Layer ["FW Item層(初始化及讀取資訊)<br>FWUpdateItemVieweModel.cs"]
		       FlowResult_Start["開始流程"]
		       SingleFWSetInstID["執行HPFI_SetInstID"]
		       Decision_SingleFWInit{"執行HPFI_Initialize成功?"}      
		       Decision_SingleFWGetBin{"執行HPFI_GetPackagedFirmwareInfo成功?"}
		       SingleFWGetInstall["執行HPFI_GetInstalledFirmwareInfo"]
		       FlowResult_End[結束流程]
		       SingleFW_CheckVersion["比較版本"]
		       SingleFW_UI_StateUpdate["更新FW Status"]       
	      end
	      subgraph MonitorVMLayer["Monitor Item層<br>(初始化及讀取資訊)<br>MonitorVieweModel.cs"]
			      Multi_HubInit["HubDevice 初始化<br>HubDeviceViewModel.cs"] 
			      Multi_GetSN["Load SN"]
			      Multi_GetPackageVersion["Load Package Version"]
			      Multi_CheckPackageVersion["比較Package Version"]
			      Multi_UI_StateUpdate["更新Monitor Status"]       
	      end
    end
    
    Result_Success[[初始化成功]]
    Result_Fail[[初始化失敗<br>顯示錯誤提示]]

    MonitorMonitor -->MonitorVMLayer -->Result_Success
    Multi_HubInit --> Multi_GetSN --> Multi_GetPackageVersion --> Multi_CheckPackageVersion--> Multi_UI_StateUpdate

	  Start  -->ArgsParse
    ArgsParse --> DecisionAPPParse
    DecisionAPPParse -->NoAPPParse --> Result_Fail
    DecisionAPPParse -->YesAPPParse --> FileValidator
    FileValidator --> DecisionFileValidator
    DecisionFileValidator -->YesFileValidator--> Result_Fail
    DecisionFileValidator -->NoFileValidator --> QueryHubToken
    QueryHubToken --> DecisionHubCount
    DecisionHubCount -->NoHubCount--> Result_Fail
    DecisionHubCount -->YesHubCount-->DecisionMonitorModel
    DecisionMonitorModel --> NoMonitorModel --> SingleMonitor
    DecisionMonitorModel --> YesMonitorModel --> MonitorMonitor

    SingleMonitor -->Single_HubInit
    Single_HubInit-->Decision_SingleHubInit
    Decision_SingleHubInit--> No_SingleHubInit--> Result_Fail
    Decision_SingleHubInit--> Yes_SingleHubInit -->Single_GetPackageVersion-->FW_VM_Layer 
    FlowResult_Start -->SingleFWSetInstID
		SingleFWSetInstID --> Decision_SingleFWInit -->|否| FlowResult_End
		Decision_SingleFWInit -->|是| Decision_SingleFWGetBin-->|否| FlowResult_End
    Decision_SingleFWGetBin -->|是| SingleFWGetInstall--> FlowResult_End
    FlowResult_End --> SingleFW_CheckVersion --> SingleFW_UI_StateUpdate-->Result_Success         

    %% --- 樣式套用 ---
    class Start userAction
    class FW_VM_Layer,MonitorVMLayer solution
    class M_Start,M_ReportSuccess,M_ReportFail,SingleMonitor,MonitorMonitor,Single_HubInit,Multi_HubInit modelLogic
    class Step1,Step2,Step3,ArgsParse,FileValidator,QueryHubToken,FlowResult_Start,SingleFWSetInstID,SingleFWGetInstall,SingleFW_CheckVersion,SingleFW_UI_StateUpdate,FlowResult_End,Single_GetPackageVersion,Multi_GetSN,Multi_GetPackageVersion,Multi_CheckPackageVersion,Multi_UI_StateUpdate step
    class Decision1,Decision2,Decision3,DecisionAPPParse,DecisionFileValidator,DecisionHubCount,DecisionMonitorModel,DecisionSilent,Decision_SingleHubInit,Decision_SingleFWInit,Decision_SingleFWGetBin decision
    class HW_Call,HW_DLL hardware
    class Result_Success success
    class Result_Fail result
    class Yes1,Yes2,Yes3,YesAPPParse,YesFileValidator,YesHubCount,YesMonitorModel,Yes_SingleHubInit yesNode
    class No1,No2,No3,NoAPPParse,NoFileValidator,NoHubCount,NoMonitorModel,No_SingleHubInit noNode
```
### OCI Tool 現行單螢幕韌體更新流程圖
```mermaid
flowchart TB
%% =========================
%% 樣式定義（統一）
%% =========================
classDef userAction fill:#FEF9E7,stroke:#F7DC6F,stroke-width:2px
classDef viewModel  fill:#EDE7F6,stroke:#4527A0,stroke-width:2px
classDef modelLogic fill:#FFFDE7,stroke:#F9A825,stroke-width:2px
classDef step       fill:#FFFDE7,stroke:#6B7280,stroke-width:1.5px,stroke-dasharray: 4 4
classDef decision   fill:transparent,stroke:#FBBF24,stroke-width:2.5px
classDef hardware   fill:#F1F8E9,stroke:#558B2F,stroke-width:2px
classDef result     fill:#FADBD8,stroke:#E74C3C,stroke-width:2px
classDef success    fill:#D5F5E3,stroke:#27AE60,stroke-width:2px

%% Yes/No 文字節點
classDef yesNode fill:transparent,color:#27AE60,font-weight:bold
classDef noNode  fill:transparent,color:#E74C3C,font-weight:bold

%% Legend 區塊
classDef legend fill:#FEF9E7,stroke:#F1C40F,stroke-width:2px
classDef legendItem fill:#transparent,stroke:#4527A0,stroke-width:1px


%% =========================
%% Legend
%% =========================
subgraph Legend["圖例說明"]
 direction TB
    L1["CanStage = <b>(FW版本過時)</b>"]:::legendItem
    L2["CanInstall = <b>(FW版本過時)</b>"]:::legendItem
    L3["forceInstall = <b>(強制更新)</b>"]:::legendItem
    L4["HasSupportSchedule = <b>(支援離線更新)</b>"]:::legendItem
    
end

class Legend legend

%% =========================
%% 節點定義
%% =========================
subgraph User_Action_Layer[使用者操作層]
  Start["使用者點擊『開始更新』"]
end
class Start userAction

subgraph ViewModel_Layer[ViewModel 層]
  FWUpdateMainVM["根據 UI 參數執行 Install Command<br/><b>FWUpdateMainViewModel.cs</b>"]
  Decision_UpdateModel{"IsDisconnectUpdate ?"}
  Yes_UpdateModel["Yes"]
  No_UpdateModel["No"]

  %% ---- 斷線更新流程 ----
  subgraph DisconnectUpdate_Layer[Disconnect Update Flow]
    Decision_DisableStageCond1{"Any(p =&gt; !p.HasSupportSchedule &amp;&amp;<br/> p.CanStage)"}
    Yes_DisableStageCond1["Yes"]
    No_DisableStageCond1["No"]

    Decision_DisableStageCond2{"All(p =&gt; !p.CanStage)"}
    Yes_DisableStageCond2["Yes"]
    No_DisableStageCond2["No"]

    Decision_DisableStageCond3{"p.CanStage == true"}
    Yes_DisableStageCond3["Yes"]
    No_DisableStageCond3["No"]

    DisconnectUpdate["執行 Disconnect Update"]
  end

  %% ---- 立即更新流程 ----
  subgraph Update_Layer[Update Now Flow]
    Decision_UpdateNowCond1{"p.CanInstall == true"}
    Yes_Cond1["Yes"]
    No_Cond1["No"]

    Decision_UpdateNowCond2{"forceInstall == true"}
    Yes_Cond2["Yes"]
    No_Cond2["No"]

    UpdateNow["執行 Update Now"]
  end

  FWItemStatus["更新 FW Update Status"]
end

End[["更新結束"]]

%% =========================
%% 流向
%% =========================
Start --> FWUpdateMainVM
FWUpdateMainVM --> Decision_UpdateModel
Decision_UpdateModel --> Yes_UpdateModel
Decision_UpdateModel --> No_UpdateModel

%% 斷線更新分支
Yes_UpdateModel --> Decision_DisableStageCond1
Decision_DisableStageCond1 --> Yes_DisableStageCond1 --> Decision_UpdateNowCond1
Decision_DisableStageCond1 --> No_DisableStageCond1  --> Decision_DisableStageCond2

Decision_DisableStageCond2 --> Yes_DisableStageCond2 --> Decision_UpdateNowCond1
Decision_DisableStageCond2 --> No_DisableStageCond2  --> Decision_DisableStageCond3

Decision_DisableStageCond3 --> Yes_DisableStageCond3 --> DisconnectUpdate
Decision_DisableStageCond3 --> No_DisableStageCond3  --> FWItemStatus
DisconnectUpdate --> FWItemStatus

%% 立即更新分支
No_UpdateModel --> Decision_UpdateNowCond1
Decision_UpdateNowCond1 --> Yes_Cond1 --> UpdateNow
Decision_UpdateNowCond1 --> No_Cond1  --> Decision_UpdateNowCond2
Decision_UpdateNowCond2 --> Yes_Cond2 --> UpdateNow --> FWItemStatus
Decision_UpdateNowCond2 --> No_Cond2  --> FWItemStatus

FWItemStatus --> End

%% =========================
%% 樣式套用
%% =========================
class FWUpdateMainVM viewModel
class DisconnectUpdate,FWItemStatus,UpdateNow step
class Decision_UpdateModel,Decision_DisableStageCond1,Decision_DisableStageCond2,Decision_DisableStageCond3,Decision_UpdateNowCond1,Decision_UpdateNowCond2 decision
class End success
class Yes_UpdateModel,Yes_Cond1,Yes_Cond2,Yes_DisableStageCond1,Yes_DisableStageCond2,Yes_DisableStageCond3 yesNode
class No_UpdateModel,No_Cond1,No_Cond2,No_DisableStageCond1,No_DisableStageCond2,No_DisableStageCond3 noNode

%% =========================
%% 區塊底色
%% =========================
style DisconnectUpdate_Layer fill:#FDF2F8,stroke:#DB2777,stroke-width:2px,stroke-dasharray: 4 4
%% 粉紅系：斷線更新
style Update_Layer          fill:#E0F2FE,stroke:#0284C7,stroke-width:2px,stroke-dasharray: 4 4
%% 藍系：立即更新

```
### 📁 OCI.sln - C# 應用程式
---
---
---
1) 專案與層級關係總覽（Dependency Map）
```mermaid
flowchart TB
  %% --- Projects ---
  subgraph P11[專案 1.1：OCI（WPF/MVVM，.exe）]
    direction TB
    subgraph VM[ViewModel 層]
      MainWindowVM[MainWindowViewModel.cs]
      FWMainVM[FWUpdateMainViewModel.cs]
      FWItemVM[FWUpdateItemViewModel.cs]
      HubDevVM[HubDeviceViewModel.cs]
      MonVM[MonitorViewModel.cs]
    end

    subgraph ML[Model & Logic 層]
      UFC[UnmanagedFirmwareControl.cs]
      ULL[UnmanagedLibLoader.cs]
      HubCtl[HubControl.cs]
      FCB[FirmwareControlBuilder.cs]
      Models["資料模型<br/>FirmwareInfo.cs / MonitorInfo.cs / InitParameter.cs"]
    end

    subgraph UT[Utility 層]
      Ctx[AppCoreContext.cs]
      Log[GLogger.cs]
      Lang[LanguageProvider.cs]
      Conv["Converters<br/>ex: StatusConverter.cs"]
    end

    subgraph PI[Presentation / Interface 層]
      VMB[ViewModelBase.cs]
      RC[RelayCommand.cs]
      IFWCtrl[IFirmwareControl.cs]
    end
  end

  subgraph P12[專案 1.2：HP.FirmwareInstall（介面契約庫，.dll）]
    IFWInst[IFirmwareInstall.cs]
    FWVer[FirmwareVersion.cs]
    FWInfo[FirmwareInfo.cs]
  end

  subgraph P13[專案 1.3：UsbHub（C++ 函式庫，.dll）]
    APIh[API.h]
    DLLMain[dllmain.cpp]
  end

  %% --- Key Relations inside OCI ---
  MainWindowVM --> FWMainVM
  FWMainVM --> FWItemVM
  FWMainVM --> HubDevVM
  FWMainVM --> MonVM

  %% Model/Logic wiring
  FWMainVM --> UFC
  UFC --> HubCtl
  HubCtl --> ULL
  ULL --> APIh

  %% Contracts / Models
  UFC -.implements.-> IFWInst
  Models --- FWInfo
  Models --- FWVer

  %% VM base & commands
  MainWindowVM --> VMB
  FWMainVM --> VMB
  FWItemVM --> VMB
  HubDevVM --> VMB
  MonVM --> VMB
  VM -.-> RC

  %% Utilities (dashed to reduce clutter)
  VM -.-> Ctx
  ML -.-> Ctx
  VM -.-> Log
  ML -.-> Log
  VM -.-> Lang
  VM -.-> Conv

  %% Cross-project references
  PI --> IFWInst
  ML --> FWInfo
  ML --> FWVer

  %% --- Styles ---
  classDef vm fill:#FFECB3,stroke:#FF9800,stroke-width:2px,color:#000;
  classDef model fill:#BBDEFB,stroke:#1976D2,stroke-width:2px,color:#000;
  classDef util fill:#C8E6C9,stroke:#388E3C,stroke-width:2px,color:#000;
  classDef iface fill:#E1BEE7,stroke:#8E24AA,stroke-width:2px,color:#000;
  classDef dll fill:#FFCDD2,stroke:#D32F2F,stroke-width:2px,color:#000;

  class MainWindowVM,FWMainVM,FWItemVM,HubDevVM,MonVM vm;
  class UFC,ULL,HubCtl,FCB,Models model;
  class Ctx,Log,Lang,Conv util;
  class VMB,RC,IFWCtrl iface;
  class IFWInst,FWVer,FWInfo dll;
  class APIh,DLLMain dll;

```
2) 韌體更新呼叫流程（High-level Sequence）
```mermaid
sequenceDiagram
  autonumber
  participant User as 使用者
  participant UI as MainWindowViewModel
  participant VM as FWUpdateMainViewModel
  participant Exec as UnmanagedFirmwareControl (implements IFirmwareInstall)
  participant Hub as HubControl
  participant Loader as UnmanagedLibLoader
  participant DLL as UsbHub.dll (API.h)

  User->>UI: 觸發「開始更新」
  UI->>VM: 執行更新命令 (RelayCommand)
  VM->>Exec: InstallAsync(params)  // 介面：IFirmwareInstall
  Exec->>Hub: 檢查/切換裝置狀態
  Hub->>Loader: 需要底層呼叫
  Loader->>DLL: 呼叫匯出 API (P/Invoke)
  DLL-->>Loader: 回傳結果 (狀態/資料)
  Loader-->>Hub: 封裝結果
  Hub-->>Exec: 更新進度/狀態
  Exec-->>VM: 回報進度 (IProgress) 與最終結果
  VM-->>UI: 更新 UI 綁定 (INotifyPropertyChanged)
  UI-->>User: 顯示成功/失敗、Log、版本資訊

```
### 3. 現況痛點與關鍵證據 (Code-Driven Analysis)
> 以下分析直接來自對原始碼的審視，是推動架構改造的最有力證據。
### 痛點一：職責混雜，UI 與核心業務邏輯緊密耦合
- 現象：OCI 主專案 是一個「萬能」專案，混合了 UI 呈現 (.xaml)、UI 邏輯 (ViewModel) 和核心業務邏輯 (Model)。
- 證據：FWUpdateMainViewModel.cs 直接建立並驅動 UnmanagedFirmwareControl.cs。這意味著任何 UI 流程的變更，都可能直接影響到核心的韌體更新邏輯，反之亦然。
- 結論：缺乏一個清晰的「抽象層」，導致可維護性與可測試性下降。
### 痛點二：硬式編碼 (Hard-coded) 的流程引擎
- 現象：韌體更新的步驟、順序和條件判斷，是被寫死在 C# 程式碼中的。
- 證據：OCI/Utility/Flow/ 目錄下存在一系列 Step.cs 檔案（如 InitiStep.cs, InstalledVersionStep.cs）。這表明開發者已意識到需要將流程「步驟化」，但這些步驟的調度邏輯依然是 C# 程式碼。
- 結論：任何流程的調整（例如增加一個檢查步驟、修改重試策略）都必須修改程式碼並重新編譯發佈，缺乏靈活性，無法快速應對需求變更。
### 痛點三：契約版本化策略的缺失與介面碎片化
- 現象：當需要為韌體更新功能增加新能力時，現有架構缺乏優雅的擴充方式。
- 證據：HP.FirmwareInstall 專案中，除了基礎的 IFirmwareInstall.cs，還被迫額外建立了 IFirmwareInstall20.cs 和 IFirmwareInstall22.cs。
- 結論：這是最典型的因缺乏版本化介面策略而導致的「介面碎片化」。每次新增功能都可能需要建立一個全新的、不相容的介面，導致呼叫端邏輯變得複雜。這為引入 Engine Facade 和 IBurnEngineV1, V2 這種版本化介面設計提供了強力的動機。
