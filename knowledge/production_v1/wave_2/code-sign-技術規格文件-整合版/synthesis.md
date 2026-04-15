以下是 Code-Sign 技術規格文件 (整合版) 的綜合報告:

💡 **盲點提醒**：後續新 IC 若在 Flash Block 構成或 Bank 切割方式上改動，`GL code sign info` 中 bit6=0 的「跟隨 FW 起始 Block」規則，可能直接失效，需預留 fallback。

## 2. 核心設計原則與情境定義 (最新)
為了相容舊有的非 Code-Sign Bonding IC 以及支援新的 Code-Sign Bonding IC，我們定義了三種主要情境 (case)。

1. IC Bonding 類型: Code-Sign vs. Non-Code Sign。
1. HP_Propertary String: FW Bin 中的字串 ('5', 'A', 'B')，作為工具鏈和 FW 的主要行為依據。
1. GL Code-Sign Info: GL Signature 前的 6-byte 設定區塊。

- eToken Sign Code: 主要依賴 HP_Propertary 和 GL code sign info。
- eToken Gen ROM: 依賴 Bonding, HP_Propertary, 和 GL code sign info。
- ISP Tool & FW Load Code: 必須同時使用上述全部三個判斷點。

### 2.1. 情境、IC 與參數對照表
表一：Flash FW 配置及 ISP 差異



### A. 韌體升級路徑限制 (Firmware Upgrade Path)

### B. GL Code-Sign Info 的角色與規則

### C. 情境適用性限制 (Case-specific Constraints)


## 3. 6-Byte 設定區塊規格 (GL code sign info)
為了讓韌體 (FW) 能夠在啟動時驗證公鑰 (Public Key) 和簽名 (Hash+Signature)，我們在 GL Signature 前方定義了一個 6-Byte 的設定區塊 (0xF4-0xF9)。這個區塊的功能是告訴 Boot ROM 在 Flash 中的哪個位置可以找到這兩組關鍵資訊。

- 公鑰位置資訊：前 3 個位元組 (0xF4-0xF6)，用於定義 Public Key 的儲存位置。
- 驗證資訊位置：後 3 個位元組 (0xF7-0xF9)，用於定義驗證資訊 (Hash+Sig) 的儲存位置。


### 3.3. 內部邏輯規則圖
下圖視覺化了公鑰位置資訊 (0xF4-0xF6) 的內部處理邏輯。（驗證資訊區塊的邏輯與此完全相同，但在 case1 和 case2 中會被忽略）

%% Code-Sign Info General Rules Diagram (Final Outline Style - 100% Compatible)
    classDef field fill:transparent,stroke:#60A5FA,stroke-width:2px
    classDef titleNode fill:transparent,stroke:transparent,font-weight:bold
    classDef decision fill:transparent,stroke:#FBBF24,stroke-width:2.5px
    classDef rule fill:transparent,stroke:#9CA3AF,stroke-width:2px,stroke-dasharray: 5 5
    classDef dependency stroke:#9CA3AF,stroke-width:1.5px,stroke-dasharray: 4 4
    classDef stop fill:transparent,stroke:#F87171,stroke-width:2px

    subgraph PK_Rules
        style PK_Rules fill:transparent,stroke:#FCD34D,stroke-width:2px
        PK_Rules_Title("<b>Public Key 位置資訊規則 (0xF4-0xF6)</b>")
        B7{"<b>Bit 7:</b><br/>資訊有效旗標 (總開關)"}
        Stop["<b>流程結束</b><br/>(後續所有欄位均被忽略)"]
        B6{"<b>Bit 6:</b><br/>公鑰區塊定位模式"}
        F5["<b>Offset 0xF5:</b><br/>Bank1 Address High Byte<br/><i>(恆定有效)</i>"]
        B05["<b>Bit 0-5:</b><br/>公鑰 Flash Block 編號"]
        F6["<b>Offset 0xF6:</b><br/>Bank2 Address High Byte"]
        Rule_0["<b>規則:</b><br/>- Bit0-5 無效<br/>- 0xF6 (Bank2 Addr) 無效"]

        PK_Rules_Title --> B7
        B7 -- "<b>值為 1</b><br/>(無效)" --> Stop
        B7 -- "<b>值為 0</b><br/>(有效)" --> B6
        B6 -- "<b>值為 0</b><br/>(跟隨 FW)" --> Rule_0
        B6 -- "<b>值為 1</b><br/>(顯式指定)" --> B05
        B05 --> F5 --> F6
        B6 -.->|"當 Bit6=1 時才有效"| B05
        B6 -.->|"當 Bit6=1 時才有效"| F6
    
    class B7,B6 decision; class Stop stop; class Rule_0 rule; class B05,F5,F6 field
    class PK_Rules_Title titleNode; linkStyle 7,8 dependency

## 4. FW 規劃與工具鏈流程
### 4.1. FW 規劃階段注意事項 (Checklist)
在規劃韌體專案時，為確保 Code-Sign 功能正常運作，務必注意以下關鍵事項：

### 4.2. Case 1: HP_Propertary = '5' (簽章資訊外掛)
此模式對應早期的 FW (< 64K)，所有 Code-Sign 相關資訊 (Public Key, Hash, Signature) 都被視為外部資料，由 eToken 產生後附加在原始 FW bin 之後，供 ISP Tool 在燒錄時使用。GL code sign info 在此模式下完全無效。

### eToken Sign Code 流程

    classDef condition fill:transparent,stroke:#FBBF24,stroke-width:2.5px
    classDef config fill:transparent,stroke:#10B981,stroke-width:2px,stroke-dasharray: 5 5
    classDef file fill:transparent,stroke:#10B981,stroke-width:2px
    classDef process fill:transparent,stroke:#4338CA,stroke-width:2px

    subgraph S1 [階段 1: 輸入]
        subgraph  FW_Orig["<b>原始 FW.bin</b><br>"]
		        GL_Info["<b>HP_Propertary='5'</b>"]:::config 
    
    subgraph S2 [階段 2: eToken Sign Code 處理]
        Check_HP{"判斷 HP_Propertary='5'"}:::condition
        Calc_HS("計算整個 bin 的 Hash & Signature"):::process

    subgraph S3 [階段 3: 產生檔案]
        FW_Signed["<b>FW_signed.bin</b><br>(原始 bin + Hash + PK + Sig)"]:::file
        FW_Rom["<b>FW.rom</b><br>(原始 bin + PK)"]:::file
    
    FW_Orig --> Check_HP --> Calc_HS --> S3
    FW_Rom --> |供 HP ISP Tool 使用| End((完成))
    FW_Signed --> |供 HP OCI Tool 使用| End((完成))


### 4.3. Case 2: HP_Propertary = 'A' (公鑰嵌入 + 重算 Checksum)
此模式是當前的主流作法 (FW >= 64K)。Public Key 被嵌入到 FW bin 的內部，這會破壞原始的 checksum-8。因此，最關鍵的步驟是 eToken 必須重新計算並覆蓋 checksum-8。Hash 和 Signature 依然作為外部資料附加。

### eToken Sign Code 流程
    %% --- 步驟 1: 先定義好所有會用到的樣式 ---
    classDef condition fill:transparent,stroke:#FBBF24,stroke-width:2.5px
    classDef config fill:transparent,stroke:#10B981,stroke-width:2px,stroke-dasharray: 5 5
    classDef critical fill:transparent,stroke:#DC2626,stroke-width:2.5px
    classDef file fill:transparent,stroke:#10B981,stroke-width:2px
    classDef process fill:transparent,stroke:#4338CA,stroke-width:2px
    
    %% --- 步驟 2: 定義圖形元素 (已移除列表編號) ---
    subgraph S1 [階段 1: 輸入]
        subgraph FW_Orig["<b>原始 FW.bin</b>"]
		        GL_Info["<b>HP_Propertary='A'<br><br>GL Code Sign Info</b><br>(提供 PK 位置)"]:::config
    
    subgraph S2 [階段 2:eToken Sign Code 處理]
        Check_HP{"判斷 HP_Propertary='A'"}:::condition
        Check_Bit7{"PUBLICKEY_INFO_BLOCK Bit7<br/>是否設定啟用( = 0 )？"}:::condition
        Embed_PK["嵌入 Public Key 至<br>GL Info 指定的位置"]:::process
        Recalc_CS["<b>重新計算並覆蓋<br>整個 bin 的 Checksum-16</b>"]:::critical
        Calc_HS["計算 Hash & Signature"]:::process

    subgraph S3 [階段 3: 產生檔案]
        FW_Signed_A["<b>FW_signed.bin</b><br>(PK已嵌入, Checksum已更新<br>+ Hash + PK + Sig 附加在後)"]:::file
        FW_Rom_A["<b>FW.rom</b><br>(PK已嵌入, Checksum已更新)"]:::file

    %% --- 步驟 3: 最後定義流程走向 ---
    FW_Orig --> Check_HP --> Check_Bit7 --"是"--> Embed_PK --> Recalc_CS --> Calc_HS --> S3
    FW_Rom_A --> |供 HP ISP Tool 使用| End((完成))
    FW_Signed_A --> |供 HP OCI Tool 使用| End((完成))
    Check_Bit7 --"否"--> Abort_1((流程中止))
  

### 4.4. Case 3: HP_Propertary = 'B' (全部資訊嵌入)

### eToken Sign Code 流程
%% eToken Signing Process Flow (Bit6=1) - Final Example-Enhanced Version
    %% --- 步驟 1: 先定義好所有會用到的樣式 ---
    classDef condition fill:transparent,stroke:#FBBF24,stroke-width:2.5px
    classDef config fill:transparent,stroke:#10B981,stroke-width:2px,stroke-dasharray: 5 5
    classDef critical fill:transparent,stroke:#DC2626,stroke-width:2.5px
    classDef file fill:transparent,stroke:#10B981,stroke-width:2px
    classDef process fill:transparent,stroke:#4338CA,stroke-width:2px
    
    %% --- Stages ---
    subgraph S1 [階段 1: 輸入資料]
        subgraph FW_Orig["<b>原始 FW.bin</b>"]
		        %% MODIFIED: Added detailed parsing steps inside this node.
		        FW_Config_Example["<b>6-Byte 設定資訊 (範例)</b><br/>-----------------------------<br/>公鑰: <b>42</b> 00 10<br/>驗證: <b>42</b> 20 30<br/>-----------------------------<br/><b>解析步驟 (以 0x42 為例):</b><br/>1. 轉為二進位: <b>0b01000010</b><br/>2. 拆解位元:<br/>   - Bit 7  = <b>0</b> (有效)<br/>   - Bit 6  = <b>1</b> (啟用指定模式)<br/>   - Bit 0-5 = <b>2</b> (目標 Block = 2)"]:::config

    subgraph S2 [階段 2: eToken Sign Code 處理]
    		Check_HP{"判斷 HP_Propertary='B'"}:::condition
        Check_Bit7{"PUBLICKEY_INFO_BLOCK Bit7<br/>是否設定啟用( = 0 )？"}:::condition
        Calc_HS["計算 Hash & Signature"]:::process
    
    subgraph S3 [階段 3: 產生最