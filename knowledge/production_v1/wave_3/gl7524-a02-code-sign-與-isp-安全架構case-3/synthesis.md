## GL7524 A02 Code-Sign 與 ISP 安全架構(Case 3)

### 1. 適用範圍與演進路徑
> 盲點提醒：後續新 IC 若在 Flash Block 構成或 Bank 切割方式上改動，bit6=0 的「跟隨 FW 起始 Block」規則，可能直接失效，需預留 fallback。

### 2. 6-Byte 設定區塊規格
為了讓韌體 (FW) 能夠在啟動時驗證公鑰 (Public Key) 和簽名 (Hash+Signature)，我們在 GL Signature 前方定義了一個 6-Byte 的設定區塊 (0xF4-0xF9)。這個區塊的功能是告訴 Boot ROM 在 Flash 中的哪個位置可以找到這兩組關鍵資訊。

- 公鑰位置資訊：前 3 個位元組 (0xF4-0xF6)，用於定義 Public Key 的儲存位置。
- 驗證資訊位置：後 3 個位元組 (0xF7-0xF9)，用於定義驗證資訊 (Hash+Sig) 的儲存位置。

#### 2.2. 結構定義 (Structure Definition)
下表詳細定義了 6-Byte 設定區塊中每個位元組和位元欄位的功能。

#### 2.3. 邏輯規則圖 (Logical Rules Diagram)
下圖視覺化了公鑰位置資訊 (0xF4-0xF6) 的內部處理邏輯，重點展示了 Bit 7 (總開關) 和 Bit 6 (定位模式) 如何決定其他欄位的有效性。（驗證資訊區塊的邏輯與此完全相同）

%% Code-Sign Info General Rules Diagram (Final Outline Style - 100% Compatible)
    %% --- Style Definitions (Outline Style for Max Readability) ---
    %% The key is 'fill:transparent' and a thicker 'stroke-width'.
    %% Text will always be on the page background, ensuring contrast.
    classDef field fill:transparent,stroke:#60A5FA,stroke-width:2px
    classDef titleNode fill:transparent,stroke:transparent,font-weight:bold
    classDef decision fill:transparent,stroke:#FBBF24,stroke-width:2.5px
    classDef rule fill:transparent,stroke:#9CA3AF,stroke-width:2px,stroke-dasharray: 5 5
    classDef dependency stroke:#9CA3AF,stroke-width:1.5px,stroke-dasharray: 4 4
    classDef stop fill:transparent,stroke:#F87171,stroke-width:2px

    %% --- Main Container ---
    subgraph PK_Rules
        %% The outer container still has a border but no fill.
        style PK_Rules fill:transparent,stroke:#FCD34D,stroke-width:2px
        
        PK_Rules_Title("<b>Public Key 位置資訊規則 (0xF4-0xF6)</b>")
        B7{"<b>Bit 7:</b><br/>資訊有效旗標 (總開關)"}
        
        %% --- Path for Bit7=1 (Invalid) ---
        Stop["<b>流程結束</b><br/>(後續所有欄位均被忽略)"]
        
        %% --- Path for Bit7=0 (Valid) ---
        B6{"<b>Bit 6:</b><br/>公鑰區塊定位模式"}
        F5["<b>Offset 0xF5:</b><br/>Bank1 Address High Byte<br/><i>(恆定有效)</i>"]
        B05["<b>Bit 0-5:</b><br/>公鑰 Flash Block 編號"]
        F6["<b>Offset 0xF6:</b><br/>Bank2 Address High Byte"]
        Rule_0["<b>規則:</b><br/>- Bit0-5 無效<br/>- 0xF6 (Bank2 Addr) 無效"]

        %% --- Flow Definition ---
        PK_Rules_Title --> B7
        B7 -- "<b>值為 1</b><br/>(無效)" --> Stop
        B7 -- "<b>值為 0</b><br/>(有效)" --> B6
        
        B6 -- "<b>值為 0</b><br/>(跟隨 FW)" --> Rule_0

        B6 -- "<b>值為 1</b><br/>(顯式指定)" --> B05
        B05 --> F5 --> F6
        
        %% --- Dependency Links to show conditional validity ---
        B6 -.->|"當 Bit6=1 時才有效"| B05
        B6 -.->|"當 Bit6=1 時才有效"| F6
    
    %% --- Apply Styles ---
    class B7,B6 decision
    class Rule_0 rule
    class B05,F5,F6 field
    class PK_Rules_Title titleNode
    linkStyle 7,8 dependency

我們以上方的 Hexdump 範例 ... 00 90 a0 00 b0 c0 ... 進行逐步解析。

#### 1. Public Key 位置資訊 (黃色區塊 @ 0xF4-0xF6)
- Offset 0xF4: PUBLICKEY_INFO_BLOCK
- Offset 0xF5: PUBLICKEY_INFO_BANK1_ADDR_H
- Offset 0xF6: PUBLICKEY_INFO_BANK2_ADDR_H

#### 2. 驗證資訊位置 (藍色區塊 @ 0xF7-0xF9)
- 意義: 這三個位元組的結構與邏輯和黃色區塊完全相同，只是它們定義的是「驗證資訊 (Hash+Sig)」的位置。

### 3. 設計細節與情境問答 (FAQ)
PUBLICKEY_INFO_BLOCK 和 CSVERIFY_INFO_BLOCK 中的 Bit6 是一個關鍵的控制旗標，它決定了系統如何定位公鑰 (Public Key) 和驗證資訊 (Signature) 的儲存區塊 (Flash Block)。這個設計主要為了解決不同 MCU 韌體大小不一，以及是否啟用雙 Bank 升級 (Dual-Bank) 所帶來的靈活性需求。

- Bit6 = 0 (簡易模式)：位置隱式關聯。公鑰/簽名所在的 Flash Block 與韌體 (FW) 本身的起始 Block 相同。這是一種簡化的預設行為。
- Bit6 = 1 (專家模式)：位置顯式指定。公鑰/簽名所在的 Flash Block 由 Bit0-5 的值明確指定，與韌體所在的 Block 可以完全無關。

%% Bit6 Layout Rules Visualization (Final Outline Style - 100% Compatible)
    %% --- Style Definitions (Outline Style for Max Readability) ---
    %% The key is 'fill:transparent' and a thicker 'stroke-width'.
    %% Text will always be on the page background, ensuring contrast.
    classDef rule fill:transparent,stroke:#FBBF24,stroke-width:2px,stroke-dasharray: 5 5
    classDef titleNode fill:transparent,stroke:transparent,font-weight:bold
    classDef ok fill:transparent,stroke:#4ADE80,stroke-width:2.5px
    classDef fail fill:transparent,stroke:#F87171,stroke-width:2.5px
    classDef fw fill:transparent,stroke:#818CF8,stroke-width:2px

    %% --- Top Level Title ---
    Start("Bit6 功能與佈局規則")

    %% --- Main container for side-by-side layout ---
    subgraph Branches
        
        %% --- Left Column: Bit6 = 0 ---
        subgraph Mode0_Container ["<b>Bit6 = 0</b><br/>跟隨 FW 起始 Block 模式"]
            subgraph Scenario1
                style Scenario1 fill:transparent,stroke:#9CA3AF
                S1_Title("<b>情境1: FW 跨越 Block</b>")
                Rule1["<b>規則:</b> Key/Sig 必須與 FW <u>起始點</u><br>在同一個 Block"]
                
                subgraph S1_Layout [Flash 佈局]
                    style S1_Layout fill:transparent,stroke:transparent
                    subgraph S1_Block3
                        style S1_Block3 fill:transparent,stroke:#7DD3FC,stroke-width:1.5px
                        S1_Block3_Title("Flash Block 3")
                        FW1_Start("FW 起始部分")
                        KeySig_OK("✅ <b>合法位置</b><br/>(與 FW 起始點在同一 Block)")
                    subgraph S1_Block4
                        style S1_Block4 fill:transparent,stroke:#7DD3FC,stroke-width:1.5px
                        S1_Block4_Title("Flash Block 4")
                        FW1_Ext("FW 延伸部分")
                        KeySig_FAIL("❌ <b>非法位置</b><br/>(不可跨 Block 存放)")
                    FW1_Start --"韌體跨越"--> FW1_Ext
                S1_Title --> Rule1 --> S1_Layout
            
            subgraph Scenario2
                style Scenario2 fill:transparent,stroke:#9CA3AF
                S2_Title("<b>情境2: FW 未跨越 Block</b>")
                Rule2["<b>規則:</b> 可利用 Block 內剩餘空間"]
                subgraph S2_Block1
                    style S2_Block1 fill:transparent,stroke:#7DD3FC,stroke-width:1.5px
                    S2_Block1_Title("Flash Block 1")
                    FW2("FW (32KB)")
                    KeySig_Allowed("✅ <b>合法位置</b><br/>(Block 內剩餘空間)")
                S2_Title --> Rule2 --> S2_Block1

        %% --- Right Column: Bit6 = 1 ---
        subgraph Mode1_Container ["<b>Bit6 = 1</b><br/>顯式指定 Block 模式"]
            subgraph Scenario3
                style Scenario3 fill:transparent,stroke:#9CA3AF
                S3_Title("<b>情境3: 自由指定 Block</b>")
                subgraph S3_FW_Block
                    style S3_FW_Block fill:transparent,stroke:#7DD3FC,stroke-width:1.5px
                    S3_FW_Block_Title("Flash Block N")
                    Config["Config Info<br><b>Bit6=1</b>, <b>Bit0-5 = X</b>"]
                
                subgraph S3_Target_Block
                    style S3_Target_Block fill:transparent,stroke:#7DD3FC,stroke-width:1.5px
                    S3_Target_Block_Title("Flash Block X")
                    KeySig_Target("✅ <b>合法位置</b><br/>(由 Bit0-5 指定)")
                
                Rule3["<b>規則:</b> 直接讀取 <b>Bit0-5</b><br>跳轉至指定的 <b>Block X</b>"]
                Rule4["<b>限制:</b> Key 和 Sig 需在同個目標 Block"]

                S3_Title --> Rule3 & Rule4
                Rule3 --> S3_FW_Block
                Config -.-> |指向| S3_Target_Block

    %% --- Final Connection ---
    Start --> Branches
    
    %% --- Apply Styles to nodes ---
    class Rule1,Rule2,Rule3,Rule4 rule
    class S1_Title,S2_Title,S3_Title,S1_Block3_Title,S1_Block4_Title,S2_Block1_Title,S3_FW_Block_Title,S3_Target_Block_Title titleNode
    class FW1_Start,FW1_Ext,FW2,FW3 fw
    class KeySig_OK,KeySig_Allowed,KeySig_Target ok
    class KeySig_FAIL fail

#### 3.3. 模式詳解與情境問答
#### 模式一：Bit6 = 0 (跟隨 FW 起始 Block)
[未有直接 Source 錨點，待確認] 這種模式下，公鑰和驗證資訊的存放有以下規則和情境：

Q1: 為何要設計 Bit6=0 這種「跟隨模式」？
> A1: 主要是為了簡化處理並限制範圍，特別是考慮到某些 MCU 的韌體可能非常大（例如 MCU2 超過 64KB）。此模式強制規定，即使韌體跨越多個 Flash Block，其對應的公鑰和簽名也必須存放在與韌體起始點相同的那個 Flash Block 內。

Q2: 如果韌體很小，公鑰/簽名可以放在韌體結束後、下一個 Block 開始前的剩餘空間嗎？
> A2: 可以，這是允許的，也是此模式下最靈活的應用場景。 只要公鑰和簽名的位址仍在同一個 Flash Block 內即可。

#### 模式二：Bit6 = 1 (由 Bit0-5 明確指定)
[未有直接 Source 錨點，待確認] 這種模式給予了最大的自由度，但需要開發者進行更精確的配置。

Q3: Bit6=1 模式下，系統如何讀取