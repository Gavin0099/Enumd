
# HP OCI Tool UI 流程文件

HP OCI Tool 是一款用於更新 HP 顯示器韌體的工具。其主要功能包括:

[未有直接 Source 錨點，待確認] 2. 判斷執行模式 (檢查版本或更新韌體)

整個流程由三大階段組成:初始化與前置檢查、載入設定與硬體、以及執行更新。每個階段都有相應的檢查和驗證步驟，確保工具能安全可靠地運行。

下面是 HP OCI Tool 的完整流程圖:

    %% === 流程圖 v2.2 - 最終優化版 (顏色 + 格子) ===
    %% 透過為 subgraph 上色，強化流程階段的視覺區分

    %% --- 1. 樣式定義 (Style Definitions) ---
    classDef startEnd fill:#EAECEE,stroke:#5D6D7E,stroke-width:2px
    classDef process fill:#D6EAF8,stroke:#3498DB,stroke-width:2px
    classDef decision fill:#F9E79F,stroke:#F1C40F,stroke-width:2px,font-weight:bold
    classDef data fill:#E9F5E9,stroke:#2ECC71,stroke-width:1px,stroke-dasharray: 5 5
    classDef hardware fill:#E8DAEF,stroke:#8E44AD,stroke-width:2px
    classDef success fill:#D5F5E3,stroke:#28B463,stroke-width:2px,font-weight:bold
    classDef error fill:#FADBD8,stroke:#C0392B,stroke-width:2px,font-weight:bold

    %% --- 2. 節點定義 (Node Definitions) ---
    P1(["解析 CLI 參數"])
    P_Mode{"判斷執行模式"}

    P2(["檢查是否已有執行中的 App"])
    P3(["初始化 Logger"])
    P4(["執行 dxdiag 並儲存系統資訊"])
    P5(["驗證必要檔案完整性"])
    P6(["載入 HPFICfgList.xml"])
    P7(["驗證 HPFICfgList.xml 數值"])
    P8(["載入 GlOciDll_Device.dll"])
    P9(["查詢 Hub Token"])
    P11(["初始化單螢幕更新流程"])
    P12(["初始化多螢幕更新流程"])
    P_Execute_Update[("根據 -s, -ni, empty<br/>執行對應的更新模式")]

    %% Check Version 流程節點
    P_CV_ReadVersion(["讀取 DLL/檔案版本資訊"])
    P_CV_Print("在 Console 輸出版本號")

    P_Exit_Success[("✅ 成功結束")]
    P_Exit_Error[("❌ 記錄錯誤並結束")]

    D1[[HPFICfgList.xml]]
    D2[[SystemInfo.txt]]
    D4[[Hub Device]]

    %% --- 3. 節點樣式應用 (Class Application) ---
    class User,P1 startEnd
    class P_Mode decision
    class P2,P3,P4,P5,P6,P7,P10,P11,P12,P_Execute_Update,P_CV_ReadVersion,P_CV_Print process
    class P8,P9 hardware
    class D1,D2,D3,D4 data
    class P_Exit_Success success
    class P_Exit_Error error

    %% --- 4. 流程連接 (Flow Connections) ---
    User -- CLI 參數 --> P1

    %% 分支 1: Check Version 模式 (簡單路徑)
    P_Mode -- "arg: -c" --> Flow_CV[Check Version 流程]
    subgraph Flow_CV
        P_CV_ReadVersion --> P_CV_Print
    P_CV_Print --> P_Exit_Success

    %% 分支 2: ISP 更新模式 (主要路徑)
    P_Mode -- "arg: -s, -ni, empty" --> Flow_Init["1. 初始化與前置檢查"]
    subgraph Flow_Init
        P2 -- "已有實例執行" --> P_Exit_Error
        P2 -- "未執行" --> P3
    
    Flow_Init -- "檢查通過" --> Flow_HW["2. 載入設定與硬體"]
    P5 -- "檔案缺失" --> P_Exit_Error
    
    subgraph Flow_HW
        P5 -- "檔案完整" --> P6
        P6 -- "載入失敗" --> P_Exit_Error
        P6 -- "載入成功" --> P7
        P7 -- "數值無效" --> P_Exit_Error
        P7 -- "驗證通過" --> P8
        P8 -- "DLL 載入失敗" --> P_Exit_Error
        P8 -- "載入成功" --> P9
        P9 -- "找不到裝置" --> P_Exit_Error
    
    Flow_HW -- "準備就緒" --> Flow_Exec["3. 執行更新"]
    subgraph Flow_Exec
        P9 -- "查詢成功" --> P10
        P10 -- "螢幕數量 = 0" --> P_Exit_Error
        P10 -- "螢幕數量 = 1" --> P11
        P10 -- "螢幕數量 > 1" --> P12
        P11 --> P_Execute_Update
        P12 --> P_Execute_Update

    P_Execute_Update --> P_Exit_Success
    
    %% --- 5. 子圖樣式 (Subgraph Styling) ---
    style Flow_CV fill:#F5F5F5,stroke:#B0B0B0,stroke-dasharray: 5 5
    style Flow_Init fill:#F0F8FF,stroke:#3498DB,stroke-dasharray: 5 5
    style Flow_HW fill:#FFFACD,stroke:#F1C40F,stroke-dasharray: 5 5
    style Flow_Exec fill:#F0FFF0,stroke:#2ECC71,stroke-dasharray: 5 5

除了正常的功能流程外，我們還需要考慮可能出現的安全威脅,並提出相應的緩解措施。下面是 HP OCI Tool 的威脅建模圖:

    %% === 流程圖 v3.2 - 最終渲染優化版 ===
    %% 策略: 1. 精簡文字 2. 移除 direction LR 以穩定佈局

    %% --- 1. 樣式定義 ---
    classDef process fill:#D6EAF8,stroke:#3498DB,stroke-width:1px
    classDef decision fill:#F9E79F,stroke:#F1C40F,stroke-width:2px,font-weight:bold
    classDef data fill:#E9F5E9,stroke:#2ECC71,stroke-width:1px,stroke-dasharray: 5 5
    classDef hardware fill:#E8DAEF,stroke:#8E44AD,stroke-width:2px
    classDef success fill:#D5F5E3,stroke:#28B463,stroke-width:2px,font-weight:bold
    classDef error fill:#FADBD8,stroke:#C0392B,stroke-width:2px,font-weight:bold
    classDef threat fill:#FFD6D6,stroke:#D32F2F,stroke-width:2px,font-weight:bold
    classDef mitigation fill:#D1E7FF,stroke:#005A9E,stroke-width:2px,font-weight:bold

    %% --- 2. 節點定義 (文字精簡版) ---
    P1(["解析 CLI 參數"])
    P_Mode{"判斷執行模式"}
    P_Exit_Success[("✅ 成功結束")]
    P_Exit_Error[("❌ 記錄錯誤並結束")]

    %% 威脅與緩解措施節點 (精簡文字 + 換行)
    T_Cli["🔥 威脅 (E):<br/>惡意參數注入"]
    M_Cli["🛡️ 緩解:<br/>淨化所有<br/>CLI 輸入"]

    T_Files["🔥 威脅 (T, E):<br/>核心檔案<br/>被惡意替換"]
    M_Files["🛡️ 緩解:<br/>驗證所有檔案的<br/>數位簽章"]

    T_Xml["🔥 威脅 (T, E, D):<br/>惡意 XML<br/>(含 XXE 攻擊)"]
    M_Xml["🛡️ 緩解:<br/>安全地解析 XML<br/>(禁用 XXE)"]
    
    T_Firmware["🔥 威脅 (T, D):<br/>刷入惡意韌體<br/>(恐致變磚)"]
    M_Firmware["🛡️ 緩解:<br/>刷寫前<br/>驗證韌體簽章"]

    T_Info["🔥 威脅 (I):<br/>系統資訊<br/>遭洩漏"]
    M_Info["🛡️ 緩解:<br/>保護輸出檔案<br/>(設定權限)"]

    %% --- 3. 流程與威脅建模 (移除 direction LR) ---
    User -- CLI 參數 --> P1
    M_Cli --> P_Mode

    P_Mode -- "arg: -s, -ni, empty" --> Flow_Init["1. 初始化與前置檢查"]
    subgraph Flow_Init
        P2(["檢查 App 實例"]) --> P3(["初始化 Logger"])
        P3 --> P5(["驗證必要檔案完整性"])

    T_Files --> M_Files
    M_Files -- "驗證失敗" --> P_Exit_Error
    M_Files -- "驗證通過" --> Flow_HW["2. 載入設定與硬體"]
    
    subgraph Flow_HW
        P6(["載入 HPFICfgList.xml"]) --> P8(["載入 GlOciDll_Device.dll"])
        P8 --> P9(["查詢 Hub Token"])

    Flow_Init --> P4(["執行 dxdiag"])
    T_Info --> M_Info

    M_Xml -- "驗證失敗" --> P_Exit_Error
    M_Xml -- "驗證通過" --> P8

    Flow_HW -- "準備就緒" --> Flow_Exec["3. 執行更新"]
    subgraph Flow_Exec
        P10(["判斷螢幕數量"]) --> P_Execute_Update[("執行對應更新模式")]
    
    P_Execute_Update --> T_Firmware
    T_Firmware --> M_Firmware
    M_Firmware -- "簽章無效" --> P_Exit_Error
    M_Firmware -- "簽章有效" --> P_Exit_Success
    
    %% --- 4. 樣式應用 ---
    class P1,P2,P3,P4,P5,P6,P8,P9,P10,P_Execute_Update process
    class P_Mode decision
    class T_Cli,T_Files,T_Xml,T_Firmware,T_Info threat
    class M_Cli,M_Files,M_Xml,M_Firmware,M_Info mitigation
    class P_Exit_Success success
    class P_Exit_Error error


1. **程式碼與韌體完整性** (最高優先級)
   - 威脅: 攻擊者替換核心檔案 (如 GlOciDll_Device.dll) 為惡意版本。 `[T_Files]`
   - 緩解: 驗證所有檔案的數位簽章。 `[M_Files]`
   - 緩解: 刷寫韌體前驗證簽章。 `[M_Firmware]`

[未有直接 Source 錨點，待確認] 2. **不安全的外部資料處理**
   - 威脅: 攻擊者透過 CLI 參數或 XML 設定檔提供惡意輸入。 `[T_Cli]`, `[T_Xml]`
   - 緩解: 淨化所有 CLI 輸入。 `[M_Cli]`
   - 緩解: 安全地解析 XML (禁用 XXE)。 `[M_Xml]`

   - 威脅: SystemInfo.txt 檔案可能被其他惡意軟體讀取。 `[T_Info]`
   - 緩解: 保護輸出檔案 (設定權限)。 `[M_Info]`

這些威脅與緩解措施的對應關係,確保 HP OCI Tool 在面對各種攻擊手段時都有完善的防禦機制。


### 4.1 程式碼與韌體完整性 (最高優先級)