---
title: HP OCI Tool UI flow
category: mac
notion_id: 23364f6b-c656-8010-954c-e36cee49ff46
notion_url: 'https://www.notion.so/HP-OCI-Tool-UI-flow-23364f6bc6568010954ce36cee49ff46'
notion_updated_at: FORCE_REFRESH
exported_at: '2026-04-06T11:27:49.845Z'
is_summarized: false
---

## OCI Tool Flow
```mermaid
graph TD
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
    User[/"使用者"/]
    P1(["解析 CLI 參數"])
    P_Mode{"判斷執行模式"}

    %% ISP 流程節點
    P2(["檢查是否已有執行中的 App"])
    P3(["初始化 Logger"])
    P4(["執行 dxdiag 並儲存系統資訊"])
    P5(["驗證必要檔案完整性"])
    P6(["載入 HPFICfgList.xml"])
    P7(["驗證 HPFICfgList.xml 數值"])
    P8(["載入 GlOciDll_Device.dll"])
    P9(["查詢 Hub Token"])
    P10(["判斷螢幕數量"])
    P11(["初始化單螢幕更新流程"])
    P12(["初始化多螢幕更新流程"])
    P_Execute_Update[("根據 -s, -ni, empty<br/>執行對應的更新模式")]

    %% Check Version 流程節點
    P_CV_ReadVersion(["讀取 DLL/檔案版本資訊"])
    P_CV_Print("在 Console 輸出版本號")

    %% 結束節點
    P_Exit_Success[("✅ 成功結束")]
    P_Exit_Error[("❌ 記錄錯誤並結束")]

    %% 資料儲存節點
    D1[[HPFICfgList.xml]]
    D2[[SystemInfo.txt]]
    D3[[App 所需檔案]]
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
    P1 --> P_Mode

    %% 分支 1: Check Version 模式 (簡單路徑)
    P_Mode -- "arg: -c" --> Flow_CV[Check Version 流程]
    subgraph Flow_CV
        P_CV_ReadVersion --> P_CV_Print
    end
    P_CV_Print --> P_Exit_Success

    %% 分支 2: ISP 更新模式 (主要路徑)
    P_Mode -- "arg: -s, -ni, empty" --> Flow_Init["1. 初始化與前置檢查"]
    subgraph Flow_Init
        P2 -- "已有實例執行" --> P_Exit_Error
        P2 -- "未執行" --> P3
        P3 --> P5
        P3 --> P4 & D2
    end
    
    Flow_Init -- "檢查通過" --> Flow_HW["2. 載入設定與硬體"]
    P5 -- "檔案缺失" --> P_Exit_Error
    
    subgraph Flow_HW
        P5 -- "檔案完整" --> P6
        D1 --> P6
        P6 -- "載入失敗" --> P_Exit_Error
        P6 -- "載入成功" --> P7
        P7 -- "數值無效" --> P_Exit_Error
        P7 -- "驗證通過" --> P8
        P8 -- "DLL 載入失敗" --> P_Exit_Error
        P8 -- "載入成功" --> P9
        D4 --> P9
        P9 -- "找不到裝置" --> P_Exit_Error
    end
    
    Flow_HW -- "準備就緒" --> Flow_Exec["3. 執行更新"]
    subgraph Flow_Exec
        P9 -- "查詢成功" --> P10
        P10 -- "螢幕數量 = 0" --> P_Exit_Error
        P10 -- "螢幕數量 = 1" --> P11
        P10 -- "螢幕數量 > 1" --> P12
        P11 --> P_Execute_Update
        P12 --> P_Execute_Update
    end

    P_Execute_Update --> P_Exit_Success
    
    %% --- 5. 子圖樣式 (Subgraph Styling) ---
    style Flow_CV fill:#F5F5F5,stroke:#B0B0B0,stroke-dasharray: 5 5
    style Flow_Init fill:#F0F8FF,stroke:#3498DB,stroke-dasharray: 5 5
    style Flow_HW fill:#FFFACD,stroke:#F1C40F,stroke-dasharray: 5 5
    style Flow_Exec fill:#F0FFF0,stroke:#2ECC71,stroke-dasharray: 5 5
```
## OCI Tool Flow 威脅建模
```mermaid
graph TD
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
    User[/"使用者"/]
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
    P1 --> T_Cli
    T_Cli --> M_Cli
    M_Cli --> P_Mode

    P_Mode -- "arg: -s, -ni, empty" --> Flow_Init["1. 初始化與前置檢查"]
    subgraph Flow_Init
        P2(["檢查 App 實例"]) --> P3(["初始化 Logger"])
        P3 --> P5(["驗證必要檔案完整性"])
    end

    P5 --> T_Files
    T_Files --> M_Files
    M_Files -- "驗證失敗" --> P_Exit_Error
    M_Files -- "驗證通過" --> Flow_HW["2. 載入設定與硬體"]
    
    subgraph Flow_HW
        P6(["載入 HPFICfgList.xml"]) --> P8(["載入 GlOciDll_Device.dll"])
        P8 --> P9(["查詢 Hub Token"])
    end

    Flow_Init --> P4(["執行 dxdiag"])
    P4 --> T_Info
    T_Info --> M_Info

    P6 --> T_Xml
    T_Xml --> M_Xml
    M_Xml -- "驗證失敗" --> P_Exit_Error
    M_Xml -- "驗證通過" --> P8

    Flow_HW -- "準備就緒" --> Flow_Exec["3. 執行更新"]
    subgraph Flow_Exec
        P10(["判斷螢幕數量"]) --> P_Execute_Update[("執行對應更新模式")]
    end
    
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
```
這份圖表的設計核心是**「威脅-緩解」**配對模式，讓安全措施與風險點直接對應。
### 1. 信任邊界 (Trust Boundary)
- 定義：信任邊界是您的可信程式碼與不可信的外部世界之間的分界線。任何跨越這條線的資料或指令都必須經過嚴格的審查。
- 圖中主要邊界包括：
### 2. 威脅節點 
- 用途：標示出**「哪裡可能出錯」**。每個紅色節點都代表一個基於 STRIDE 模型分析出的具體安全威脅。
- STRIDE 分類:
### 3. 緩解措施節點 (藍色)
- 用途：提出**「我們該如何應對」。每個藍色節點都是針對其前一個威脅的具體防禦策略，是開發中必須實施**的安全功能。
- 流程核心：圖表中的流程變成了：正常處理 → 發現威脅 → 實施緩解 → 判斷結果。如果緩解措施失敗（如簽章驗證不通過），流程必須終止，絕不能繼續。
---
### 關鍵威脅區域與應對策略
以下是此工具面臨的三個主要威脅領域，按優先級排序。
### 威脅區域 1：程式碼與韌體完整性 (最高優先級)
- 威脅：攻擊者將 GlOciDll_Device.dll 等核心檔案替換為惡意版本。當您的工具（特別是在以系統管理員權限執行時）載入這個惡意 DLL，攻擊者將完全控制執行該工具的系統。
- 潛在衝擊：權限提升 (E)、竄改 (T)。這是最嚴重的威脅。
- 必要策略 (M_Files, M_Firmware):
### 威脅區域 2：不安全的外部資料處理
- 威脅：攻擊者透過 CLI 參數 (T_Cli) 或 XML 設定檔 (T_Xml) 提供精心構造的惡意輸入，可能觸發路徑遍歷、緩衝區溢位或 XXE (XML 外部實體注入) 等攻擊。
- 潛在衝擊：權限提升 (E)、資訊洩露 (I)、服務阻斷 (D)。
- 必要策略 (M_Cli, M_Xml):
### 威脅區域 3：敏感資訊洩露
- 威脅：SystemInfo.txt 檔案包含了詳細的系統配置，可能被其他惡意軟體讀取，為攻擊者提供發動後續攻擊的有用情報。
- 潛在衝擊：資訊洩露 (I)。
- 必要策略 (M_Info):
