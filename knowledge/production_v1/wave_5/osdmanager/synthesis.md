
# OSDManager 專案文件


- 全域熱鍵監聽: 即使應用程式在背景執行,也能夠捕捉使用者設定的熱鍵。
- 自訂熱鍵設定: 提供圖形化介面,讓使用者可以輕鬆地修改、設定不同 OSD 功能對應的鍵盤熱鍵。
- HID 指令發送: 監聽到熱鍵後,程式會發送對應的 HID (Human Interface Device) 指令來觸發硬體功能。
- 系統托盤圖示: 應用程式常駐於系統托盤,方便使用者隨時存取設定或結束程式。
- 操作提示通知: 當熱鍵觸發功能時,會顯示短暫的提示訊息,告知使用者當前操作。

本專案採用 MVVM (Model-View-ViewModel) 設計模式,結構清晰,易於維護和擴展。[`/general/osdmanager.html`]

    %% Define Styles for each subgraph
    classDef view fill:#D2E9FF,stroke:#333,stroke-width:2px;
    classDef viewmodel fill:#FFDDC1,stroke:#333,stroke-width:2px;
    classDef model fill:#D4EDDA,stroke:#333,stroke-width:2px;
    classDef services fill:#F8D7DA,stroke:#333,stroke-width:2px;
    classDef external fill:#E2E3E5,stroke:#333,stroke-width:2px;
    classDef system fill:#FFF3CD,stroke:#333,stroke-width:2px;

    subgraph V [View<br>視圖層]
        MW["MainWindow.xaml<br>主設定視窗"]
        NW["NotificationWindow.xaml<br>通知視窗"]

    subgraph VM [ViewModel<br>視圖模型層]
        HEVM["HotkeyEditorViewModel.cs<br><b>(核心邏輯)</b>"]
        HSIVM["HokeySettingItemViewModel.cs<br>(單一熱鍵項目)"]

    subgraph M [Model<br>模型層]
        JSON["hotkey.json<br>使用者熱鍵設定"]
        VKM["virtual_key_map.json<br>虛擬鍵盤碼"]

    subgraph S [Utilities & Services<br>工具與服務層]
        KI["KeyboardIntercept.cs<br>全域鍵盤監聽"]
        HCS["HidCommandSender.cs<br>HID指令發送"]
        TNM["ToastNotificationManager.cs<br>通知管理器"]

    subgraph SYS [System APIs<br>系統API]
        RI["Windows Raw Input"]
    
    subgraph EXT [External Dependencies<br>外部依賴]
        SDK["GL_SDK.dll"]

    %% --- Primary Interactions ---
    
    %% View <-> ViewModel
    MW <.->|Data Binding<br>資料綁定| HEVM
    HEVM -.->|Updates<br>更新| MW
    MW -->|User Input<br>使用者設定| HEVM

    %% ViewModel -> Services & Model
    HEVM -->|Controls<br>啟動/停止監聽| KI
    KI -->|Notifies<br><b>熱鍵觸發通知</b>| HEVM
    HEVM -->|Sends Command<br>發送指令| HCS
    HEVM -.->|Load/Save<br>讀取/儲存設定| JSON
    
    %% Service -> Lower Layers
    KI -->|Calls<br>呼叫| RI
    HCS -->|P/Invoke<br>平台叫用| SDK
    TNM -->|Shows<br>顯示| NW

    %% Style Assignments
    class MW,NW view
    class HEVM,HSIVM viewmodel
    class JSON,VKM model
    class KI,HCS,TNM services
    class SDK external

### 1. 應用程式啟動與熱鍵監聽
    %% Style Definitions
    classDef start fill:#D2E9FF,stroke:#2a72d9,stroke-width:2px,color:#000;
    classDef process fill:#D4EDDA,stroke:#2a9949,stroke-width:2px,color:#000;
    classDef decision fill:#FFF3CD,stroke:#d29922,stroke-width:2px,color:#000;
    classDef background fill:#FFDDC1,stroke:#b36200,stroke-width:2px,color:#000;
    classDef endNode fill:#F8D7DA,stroke:#a40e26,stroke-width:2px,color:#000;

    Start["啟動 App.xaml.cs"] --> A["初始化應用程式"];
    A --> B{"檢查是否已有實例執行"};
[未有直接 Source 錨點，待確認] B -- 是 --> C["顯示提示後結束"];
    B -- 否 --> D["初始化 ViewModel"];
    D --> E["HotkeyEditorViewModel 讀取 hotkey.json 設定"];
    E --> F["啟動 KeyboardIntercept 服務"];
    F --> G["註冊全域鍵盤 Raw Input 監聽"];
    G --> H["應用程式進入背景等待狀態<br>(顯示系統托盤圖示)"];
    C --> End["結束"];

    class Start start;
    class A,D,E,F,G process;
    class B decision;
    class H background;
    class C,End endNode;

    %% Style Definitions
    classDef start fill:#D2E9FF,stroke:#2a72d9,stroke-width:2px,color:#000;
    classDef process fill:#D4EDDA,stroke:#2a9949,stroke-width:2px,color:#000;
    classDef decision fill:#FFF3CD,stroke:#d29922,stroke-width:2px,color:#000;
    classDef background fill:#FFDDC1,stroke:#b36200,stroke-width:2px,color:#000;

    A["使用者按下鍵盤"] --> B{"KeyboardIntercept 捕捉到按鍵"};
    B --> C{"是否為已註冊的熱鍵？"};
    C -- 是 --> D["通知 HotkeyEditorViewModel"];
    D --> E["尋找對應的 HotKeyCommand"];
    E --> F["使用 HidCommandSender 準備發送 HID 指令"];
    F --> G["呼叫 GL_SDK.dll 發送指令至硬體"];
    G --> H["ToastNotificationManager 顯示操作成功通知"];

    class B,C decision;
    class D,E,F,G,H process;

    %% Style Definitions
    classDef start fill:#D2E9FF,stroke:#2a72d9,stroke-width:2px,color:#000;
    classDef process fill:#D4EDDA,stroke:#2a9949,stroke-width:2px,color:#000;
    classDef decision fill:#FFF3CD,stroke:#d29922,stroke-width:2px,color:#000;
    classDef background fill:#FFDDC1,stroke:#b36200,stroke-width:2px,color:#000;
    classDef endNode fill:#F8D7DA,stroke:#a40e26,stroke-width:2px,color:#000;

    A["使用者雙擊<br>或右鍵點擊系統托盤圖示"] --> B["選擇 'Edit'"];
    B --> C["顯示 MainWindow.xaml"];
    C --> D["HotkeyEditorViewModel 暫停鍵盤監聽"];
    D --> E["使用者在 TextBox 中按下新的按鍵組合"];
    E --> F["MainWindow.xaml.cs 的事件處理器捕捉按鍵"];
    F --> G["建立新的 HotkeyRawData"];
    G --> H["呼叫 HokeySettingItemViewModel 的 KeyPressCommand"];
    H --> I{"是否有其他功能已使用此熱鍵？"};
[未有直接 Source 錨點，待確認] I -- 是 --> J["清除重複的熱鍵設定"];
    J --> K["將更新後的設定寫入 hotkey.json"];
    K --> L["使用者關閉設定視窗"];
    L --> M["重新啟動鍵盤監聽"];
    M --> End["返回背景等待"];

    class A,B,C,E,L start;
    class D,F,G,H,J,K,M process;
    class I decision;
    class End background;

- .NET Framework 4.6.1 或更高版本

1. 使用 Visual Studio 2019 或更高版本開啟 OSDManager.sln 檔案。
1. 還原 NuGet 套件 (MaterialDesignThemes, log4net, Google.Protobuf)。
1. 將 GL_SDK.dll 放置於正確的路徑。
1. 編譯專案以生成 HotkeyManager.exe。
1. 執行 HotkeyManager.exe，程式將會常駐於系統托盤。

專案內包含 PowerShell 腳本 (HotkeyBuildInstaller.ps1) 與 Inno Setup 腳本 (hp_hitkey_manager.iss)，用於自動化建立安裝程式。
1. 確保已安裝 Inno Setup 6。
1. 執行 Package/HotkeyBuildInstaller.ps1 腳本,它將會自動編譯並打包成安裝檔。

- 執行功能: 在背景執行時,按下您設定的熱鍵組合即可觸發對應的 OSD 功能。
- 編輯設定: 在系統托盤找到 "Hotkey Manager" 圖示,雙擊或按右鍵選擇 "Edit" 即可開啟設定視窗。
- 結束程式: 在系統托盤圖示上按右鍵選擇 "Exit"。

### C# 專案移植 macOS 任務清單
本專案目前僅支援 Windows 平台,如需移植至 macOS,需要執行以下主要步驟:

1. **階段一：專案設定與環境準備 (無變動)**
   此階段目標不變:建立一個新的、可用於 macOS 開發的跨平台專案。

2. **階段二：UI 介面層遷移 (View) (無變動)**
   目標是使用 Avalonia XAML 重建您的使用者介面。

3. **階段三：程式碼遷移 (ViewModel & Model) (無變動)**
[未有直接 Source 錨點，待確認] 此階段幾乎所有程式碼都可以直接重用。

4. **階段四：平台特定功能重寫 (關鍵階段 - 已簡化)**
   這是變動最大,也是因為您有 .dylib 而變得簡單許多的部分。

5. **階段五：建置、測試與部署 (無變動)**