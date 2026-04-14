以下為 '8D report for E22 G4/E23 G4/E24 G4/E24i G4 HP EndUser Tool' 的綜合報告:

## 8D(八大原則問題解決)

### D1 建立問題解決小組
無相關資訊。

### D2 描述問題
HP E24i EndUser Tool 在更新新版的 scaler (TSUM_R2) 時，會認為是最新版本而直接跳過不更新。

### D3 暫時性對策
原本的 `GetScalerFirmwarePacketVersion()` 函數中的判斷式有錯誤。將其改正如下:
```
// 原本
if (scaler_version < latest_version)
// 改成
if (scaler_version != latest_version)
```

### D4 找出問題真正原因
HP E24i 的 scaler chip 從原本的 TSUM_CD 改為 TSUM_R2，但這款機型在 2019 年推出時，其 scaler 軟體版本 (packet version) 並不支援 TSUM_R2。
原本是透過 ini 設定來判斷新舊 update 流程，但現在新舊 chip 混合使用，無法單純依賴 ini 參數。後來想到可以直接 Get Firmware Packet version 並檢查其 Result code 來判斷。只是當初只驗證了 TSUM_CD chip，導致出現了這個 bug。

### D5 可行性對策的提出
除了針對不同 scaler chip 進行驗證外，還需要建立 Release Tool 的 Check list 以確保品質。

### D6 選擇永久對策
建立 Check list 以確保 Release Tool 的品質。

### D7 執行及驗證永久對策
無相關資訊。

### D8 防止再發生與標準化
在 Release 前都必須執行 Check list 以確保 Tool 的品質。

## 相關內容

### [Camera 透過我們驗證 code sign](code-sign/camera-透過我們驗證-code-sign.html)
1. 告知如何 Erase Camera 的方式 —> 驗證失敗時需要 erase 掉
2. 告知如何 Read Camera data —> Hub security model 必須要能讀取到 update 的 data 才能計算 hash
3. 上述 2 點可以改為告知所有的 update 流程及相關文件，讓我們能夠控制整個 update 過程
4. 下圖為 Hub Code Sign 驗證流程，驗證 code sign 應該由 Tool 控制，FW 應該不需要修改什麼，但還是需要俊太確認

### [Etoken System Code View](code-sign/etoken-system-code-view-.html)
- 發現多處安全性風險，包括執行緒生命週期不可控、外部輸入缺乏邊界控制、SQL 注入等問題。
- 這些問題與既有的 anti-pattern 高度重疊，需要進行改善。

### [HID Code Sign 記錄](code-sign/hid-code-sign-記錄.html)
- HID update 流程
- Vendor Command 第二碼
- HID 預設只使用 2.0
- 驗證工具位置: file:///\\genesyslogic.com.tw\GenesysData\SW_Release_New\Hub\HID\Tool
- 已驗證並解決的問題包括:
  - HID 會把重抓到的 device 當成不同個
  - OS 有時認不到裝置，裝置管理員上顯示驚嘆號
  - Scaler update 在 set report 時，會有 data 沒有傳下去的問題
  - Scaler update 在 write command 時速度慢
  - 驗證資料時出錯（ISP_ERR_VERIFY_DEVICE、ISP_ERR_SEND_COMMAND）
  - 程式閃退

總結來說，這份 8D 報告描述了 HP E24i EndUser Tool 在更新 scaler (TSUM_R2) 時遇到的問題,並提出了相應的解決方案。同時也整理了一些相關的上下文資訊,包括 Code Sign 驗證、HID 更新流程等,希望能夠幫助更好地理解整個問題的脈絡。