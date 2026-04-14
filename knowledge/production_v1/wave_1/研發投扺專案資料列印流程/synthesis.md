# 研發投扺專案資料列印流程 (治理審查草案)


## 2023 年更新 - 使用 Edge 開啟會有問題，請改用 IE 模式開始

開啟工作週報的步驟如下:

1. 開啟工作週報，選擇關鍵字搜尋。
2. 輸入有參與的專案代號進行查詢，注意不要輸入年度，否則會得到不完整的資料。
3. 勾選所有 2020 年的週報，然後按下匯出網頁。
4. 系統會匯出所有 2020 年關於此專案的週報，接下來即可直接列印。

## 相關內容

### Camera 透過我們驗證 code sign `[Camera 透過我們驗證 code sign](code-sign/camera-透過我們驗證-code-sign.html)`

1. 生成 ECDSA 金鑰並進行簽章。
2. 告知如何清除 Camera 的方式 - 驗證失敗時需要清除。
3. 告知如何讀取 Camera 資料 - Hub 安全模型必須能讀取到更新的資料才能計算雜湊值。
4. 可以改成告知我們所有的更新流程以及相對應的文件，讓我們控制整個更新過程。
5. 下圖為 Hub Code Sign 驗證流程，驗證 code sign 應該可以由工具控制，韌體應該不需要做什麼改變，但還是需要俊太確認。

### Etoken System Code View `[Etoken System Code View](code-sign/etoken-system-code-view-.html)`

#### etoken_dongle_server
- **Decision Summary**:
  - Verdict: CHANGES_REQUESTED
  - Risk Level: High
- **Governance Audit**:
  - 架構: 不通過。連線工作流程使用 detach 且無生命週期收斂，違反可預測關閉原則。
  - 原生安全性: 不通過。檔案大小與外部命令執行缺乏邊界控制，存在資源與執行風險。
  - 測試完整性: 不通過。看不到針對失敗路徑（超大輸入、shutdown race、協定錯位）的測試證據。
- **Technical Findings**:
  1. [BLOCKING] Detached worker thread may outlive owner (this)
  2. [BLOCKING] Unbounded memory allocation from peer-provided file size
  3. [WARNING] Protocol error opcode mismatch in public-key stage
  4. [WARNING] system() execution path with externally-derived parameters
  5. [WARNING] Timeout conversion bug in select()
  6. [SUGGESTION] Hardcoded token password in source
- **Knowledge Base Alignment**:
  - 檢查了 03_knowledge_base.md 中的 4 個 Anti-Patterns/Pitfalls。
  - 結果: 發現衝突（特別是 system()/sub-process hang 與協定失配/卡住風險已命中）。

#### etoken_server
- **Decision Summary**:
  - Verdict: CHANGES_REQUESTED
  - Risk Level: High
- **Governance Audit**:
  - 架構: Release 組態已移除 OFFLINE_TEST，這點較前版改善；但連線工作執行緒仍採 detach，生命週期不可控，違反可預測性。
  - 原生安全性: 未發現新的 pointer free 錯誤；但外部命令執行與檔案大小處理缺乏邊界，仍有高風險。
  - 測試完整性: 看不到對失敗路徑（超大 file size、thread shutdown race、SQL 注入字串）的測試鎖定證據。
- **Technical Findings**:
  1. [BLOCKING] SQL injection 風險（登入授權查詢）
  2. [WARNING] detach 執行緒捕獲 this，存在 shutdown race / UAF 風險
  3. [WARNING] Dongle 管理同樣使用 detach，生命週期不可驗證
  4. [WARNING] 檔案大小由對端提供且未設上限，可能 OOM/卡死
  5. [WARNING] 對 Dongle 端取檔同樣無大小上限
  6. [WARNING] DB 密碼硬編碼在程式碼
- **Knowledge Base Alignment**:
  - 檢查了 03_knowledge_base.md 中的 4 個 Anti-Patterns/Pitfalls（含 system()/子程序卡死、流程卡住類型）。
  - 結果: 發現衝突（當前風險與既有 anti-pattern 高度重疊）。

### HID Code Sign 記錄 `[HID Code Sign 記錄](code-sign/hid-code-sign-記錄.html)`

#### Update Protocol
- HID 更新流程
- Vendor Command 第二碼
- HID 預設只使用 2.0

#### Tool & Test
- 驗證工具位置: file:///\\genesyslogic.com.tw\GenesysData\SW_Release_New\Hub\HID\Tool

#### 執行中
- Release Tool
- 請 SE 確認各 OS 有沒有自動喚醒 device。
- HID 驗證 USB LOGO 問題。
- 整理 chip function list，用表格列出各 chip 機制的不同。
- HID 速度問題。
- FW UPD 已經是 open source 了，但 SW 目前 Build 不起來，無法測試。

#### 待討論
- GL3590
- Tool 在 Chromebook 上應該可以直接執行、更新，SW 會再討論如何測試、驗證。
- SW 需要討論一下 ISP tool 在燒錄時，需要明顯提示是使用 filter driver 還是 HID。
- 檢查不同 OS 平台（ex：Mac, Linux, Chromebook）。

#### 已驗證 & 解決
- 2021/11/05 HID 會把重抓到的 device 當成不同個
- 2021/11/05 OS 有時認不到裝置，裝置管理員上顯示驚嘆號
- 2021/11/05 Scaler update 在 set report 時，會有資料沒有傳下去的問題
- 2021/11/05 Scaler update 在 write command 時速度慢
- 2021/11/05 驗證資料時出錯（ISP_ERR_VERIFY_DEVICE）
- 2021/11/05 程式閃退
- 2021/11/08 驗證資料時出錯（ISP_ERR_SEND_COMMAND）
- 2021/11/19 請 MTK 導入 Hardware CRC 的機制（被拒絕）。
- Google 在 ISP 相關。
- HP ISP Tool (HID) 預設只使用 2.0

#### 會議記錄
- 2021/12/17 HP ISP Tool

## 治理註記
本內容摘要自相關會議記錄與審核報告，旨在提供專案背景資訊。具體操作細節請以原始 source.xml 所述之行號為準。