
# Lenovo Daisy-chain Update flow 

此流程描述了 Host、MC、Scalar 0 和 Scalar 1 之間的互動操作，實現對菊鏈模式下所有監視器的韌體（FW）更新。過程主要包括設置緩衝區、確認準備狀態、傳輸韌體封包以及完成通知。[`/general/lenovo-daisy-chain-update-flow-.html`]


### 步驟 1：設置 IIC 緩衝區大小
- 指令：`CMD_DDCCI : CE A9 00`
- 執行方式：[`/general/lenovo-daisy-chain-update-flow-.html`]

### 步驟 2：協商監視器準備狀態
- 指令：`CMD_DDCCI : CE A9 01` 
- 執行方式：[`/general/lenovo-daisy-chain-update-flow-.html`]

### 步驟 3：通知接收緩存韌體封包
- 指令：`CMD_DDCCI : CE A9 02`
- 執行方式：[`/general/lenovo-daisy-chain-update-flow-.html`]

### 步驟 4：通過 USB 傳輸緩存的韌體封包
- 執行方式：[`/general/lenovo-daisy-chain-update-flow-.html`]

### 步驟 5：通知封包傳輸完成
- 指令：`CMD_DDCCI : CE A9 03`
- 執行方式：[`/general/lenovo-daisy-chain-update-flow-.html`]

### 步驟 6：依次傳輸韌體封包
- 指令：`DDCCI : CE A7`
- 執行方式：[`/general/lenovo-daisy-chain-update-flow-.html`]

## 關於 Host Tool 使用 DDCCI 指令 CE A9 的流程說明

### 1. Host Tool 使用 CE A9 指令的功能
- 目標：[`/general/lenovo-daisy-chain-update-flow-.html`]
- 指令行為：[`/general/lenovo-daisy-chain-update-flow-.html`]

### 2. CE A9 02 的執行過程
- 步驟描述：[`/general/lenovo-daisy-chain-update-flow-.html`]

### 3. CE A7 指令：Scalar 0 與其他監視器的互動
- 指令行為：[`/general/lenovo-daisy-chain-update-flow-.html`]
- 逐級傳輸：[`/general/lenovo-daisy-chain-update-flow-.html`]

### 4. Cached FW Package 的格式參考
- 關鍵資訊：[`/general/lenovo-daisy-chain-update-flow-.html`]
- 用途：[`/general/lenovo-daisy-chain-update-flow-.html`]

### 5. Host Tool 的整體工作流程
1. 初始化緩衝區：[`/general/lenovo-daisy-chain-update-flow-.html`]
1. 確認監視器準備狀態：[`/general/lenovo-daisy-chain-update-flow-.html`]
1. 啟動韌體包緩存：[`/general/lenovo-daisy-chain-update-flow-.html`]
1. 完成韌體包緩存：[`/general/lenovo-daisy-chain-update-flow-.html`]

### 6. Scalar 的職責
- USB 裝置管理：[`/general/lenovo-daisy-chain-update-flow-.html`]
- 菊鏈傳輸協商：[`/general/lenovo-daisy-chain-update-flow-.html`]

## 6.3.1 Describe the flow in detail

Host Tool 使用輸入參數 IN1 和返回數據 RET，透過 CE A9 01 指令來判斷監視器是否已準備好進行韌體更新。根據準備結果，進一步執行韌體包的緩存與傳輸操作。[`/general/lenovo-daisy-chain-update-flow-.html`]


- Host Tool 從系統中檢索可用監視器的清單，包括 1 到 N 的所有監視器。
- 確定監視器是否符合韌體更新的條件：[`/general/lenovo-daisy-chain-update-flow-.html`]

#### 2. 設置 IIC 緩衝區大小
- 操作：[`/general/lenovo-daisy-chain-update-flow-.html`]

#### 3. 基於監視器列表生成 IN1
- IN1 的生成：[`/general/lenovo-daisy-chain-update-flow-.html`]

#### 4. 發送 IN1 並獲取準備狀態
- 操作：[`/general/lenovo-daisy-chain-update-flow-.html`]

#### 5. 比較 IN1 和 RET
- 操作：[`/general/lenovo-daisy-chain-update-flow-.html`]

#### 6. 通知 Monitor 0 準備接收韌體包
- 操作：[`/general/lenovo-daisy-chain-update-flow-.html`]

#### 7. 使用 USB 傳輸緩存的韌體包
- 操作：[`/general/lenovo-daisy-chain-update-flow-.html`]

#### 8. 通知 Monitor 0 傳輸完成
- 操作：[`/general/lenovo-daisy-chain-update-flow-.html`]

#### 9. Monitor 0 向其他監視器傳輸韌體
- 操作：[`/general/lenovo-daisy-chain-update-flow-.html`]

1. IN1 的用途：[`/general/lenovo-daisy-chain-update-flow-.html`]
1. RET 的作用：[`/general/lenovo-daisy-chain-update-flow-.html`]