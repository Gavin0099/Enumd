
# HP Project: Store & Forward FW Update Specification

## 1. 核心架構 (System Architecture)
此系統採用 Store and Forward (儲存後轉發) 機制，以解決 USB 傳輸不穩定導致的 I2C 時序問題。其更新流程分為兩個階段:

1. **Phase 1 (Upload)**: PC 端工具 (Tool) 透過 USB (建議使用 HID Interrupt Out) 將完整的 Bin 檔案和 (PD/Scaler 資訊) 下載至 Hub Flash 中。[`HP Project: Store & Forward FW Update Specification`](./hp-project-store-forward-fw-update-specification.html)

2. **Phase 2 (Internal Update)**: Tool 發送指令啟動 FW，由 Hub FW 負責執行圖一 (PD) 和圖二 (Scaler) 的實際寫入流程。[`HP Project: Store & Forward FW Update Specification`](./hp-project-store-forward-fw-update-specification.html)


    classDef base fill:#f9f9f9,stroke:#333,stroke-width:1px
    classDef flash fill:#fff3cd,stroke:#d4ac0d,stroke-width:2px
    classDef fw fill:#e3f2fd,stroke:#2196f3,stroke-width:2px

    subgraph P1 ["Phase 1: 下載階段"]
        Tool[PC Tool]:::base
        HubFlash[Hub Flash]:::flash
        Tool -- "1. 下載完整 Bin" --> HubFlash

    subgraph P2 ["Phase 2: 內部更新"]
        HubFW[Hub FW]:::fw
        Target[PD / Scaler]:::base
        
        HubFlash -.-> |"2. 讀取資料"| HubFW
        HubFW -- "3. I2C 寫入<br/>(執行圖一/圖二)" --> Target

## 2. 詳細更新流程 (Detailed Workflow)
此流程整合了 Tool 的控制邏輯與 FW 的內部運作（對應圖一與圖二）。

### Step 1: Phase 1 下載
1. Tool 將 PD Bin、Scaler Bin 和 (PD/Scaler 資訊) 完整寫入 Hub Flash 的指定位址。[`HP Project: Store & Forward FW Update Specification`](./hp-project-store-forward-fw-update-specification.html)
1. Tool: 發送 `HID_CMD_Enable_PD_OnlineSpeedUp` 指令。[`HID Command Protocol (Reference)`](./hp-project-store-forward-fw-update-specification.html#hid-command-protocol-reference)

### Step 2: Phase 2 啟動與監控 (PD 階段)
1. Hub FW (執行圖一紅框邏輯):[`HP Project: Store & Forward FW Update Specification`](./hp-project-store-forward-fw-update-specification.html)
1. Tool (Polling): 每 500ms 發送 `Get_Update_Status` 指令。[`HID Command Protocol (Reference)`](./hp-project-store-forward-fw-update-specification.html#hid-command-protocol-reference)

### Step 3: Phase 2 啟動與監控 (Scaler 階段)
1. 進入 ISP Mode -> Disable Write Protect。
1. Tool: 發送 `HID_CMD_Enable_Scaler_OnlineSpeedUp` 指令。[`HID Command Protocol (Reference)`](./hp-project-store-forward-fw-update-specification.html#hid-command-protocol-reference)
1. Hub FW (執行圖二紅框邏輯):[`HP Project: Store & Forward FW Update Specification`](./hp-project-store-forward-fw-update-specification.html)
1. Tool (Polling): 每 500ms 發送 `Get_Update_Status` 指令。[`HID Command Protocol (Reference)`](./hp-project-store-forward-fw-update-specification.html#hid-command-protocol-reference)

### 2.2 錯誤恢復機制 (Error Recovery)
當 FW 內部的 Retry (圖一紅框) 或 Verify (圖二紅框) 失敗並回報 ERROR 時，Tool 介入救援:

1. Tool: 解析 `Get_Update_Status` 回傳的 Error Address。[`HID Command Protocol (Reference)`](./hp-project-store-forward-fw-update-specification.html#hid-command-protocol-reference)
1. Tool: 主動對 Target (PD/Scaler) 發送指令，Erase 該失敗的 Sector。
1. Tool: 發送 `Restore_Address` 指令:[`HID Command Protocol (Reference)`](./hp-project-store-forward-fw-update-specification.html#hid-command-protocol-reference)
1. Hub FW: 更新內部的 Write Pointer，從指定位置繼續執行寫入。

## 3. 狀態機流程圖 (State Machine Flowchart)
這張圖展示了 Tool 與 FW 的互動，包含錯誤救援迴圈。

    classDef tool fill:#f9f9f9,stroke:#333,stroke-width:2px
    classDef fw fill:#e3f2fd,stroke:#2196f3,stroke-width:2px
    classDef decision fill:#fff3cd,stroke:#ff9800,stroke-width:2px
    classDef error fill:#ffebee,stroke:#d32f2f,stroke-width:2px
    classDef success fill:#e8f5e9,stroke:#388e3c,stroke-width:2px

    Start(("Start")) --> P1

    subgraph P1 ["Phase 1: Preparation"]
        Step1["Tool: 下載完整 FW<br/>至 Hub Flash"]:::tool

    subgraph P2 ["Phase 2: Update Loop"]
        
        Step2["Tool: 發送 Enable CMD<br/>(啟動 FW 接手)"]:::tool
        Step2 --> Action
        
        Action["FW: 執行內部流程<br/>(對應圖一/圖二紅框邏輯)"]:::fw
        Action -.-> Wait
        
        Wait("等待 500ms<br/>(Polling)"):::decision
        
        Step3["Tool: 發送 CMD<br/>Get Status"]:::tool
        Step3 --> Check{"狀態檢查<br/>(Status?)"}:::decision
        
        Check -- "ENABLE (更新中)" --> Wait
        Check -- "DONE (完成)" --> Done
        Check -- "ERROR (失敗)" --> ErrHand

    %% Error Recovery
    subgraph Recovery ["錯誤恢復流程"]
        ErrHand["Tool: 解析 Error Address"]:::error
        ErrHand --> ErrErase
        
        ErrErase["Tool: 主動 Erase<br/>該 Sector"]:::tool
        ErrErase --> CheckErase{"Erase 成功?"}:::decision
        
        CheckErase -- "No" --> Fail(("Update Fail")):::error
        CheckErase -- "Yes" --> Restore
        
        Restore["Tool: 發送 CMD<br/>Restore Address"]:::tool
    
    Restore --> Wait

    Done["Tool: 接手剩餘流程<br/>(Verify / Finalize)"]:::success
    Done --> End(("End"))

## 4. HID Command Protocol (Reference)
### 控制指令 (Control)
- `HID_CMD_Enable_PD_OnlineSpeedUp`
- `HID_CMD_Enable_Scaler_OnlineSpeedUp`

### 恢復指令 (Error Recovery)
- `Restore_Address`

### 狀態查詢 (Polling)
- `Get_Update_Status`

### 狀態碼定義 (Status Code)
- 0x01 / 0x10 (ENABLE): FW 忙碌中 (正在跑圖一/圖二的 Loop)。
- 0x04 / 0x40 (ERROR): 發生錯誤 (Retry 失敗)，等待 Tool 救援。
- 0x08 / 0x80 (DONE): 更新成功。

## Tool String(ISP Extend funciton)