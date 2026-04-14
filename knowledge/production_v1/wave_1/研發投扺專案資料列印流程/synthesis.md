以下是針對「研發投扺專案資料列印流程」的詳細文件:

# 研發投扺專案資料列印流程

## 2023 年更新 - 使用 Edge 開啟會有問題，請改用 IE 模式開始

開啟流程如下:

1. 開啟工作週報，選擇關鍵字搜尋
2. 輸入有參與的專案代號進行查詢，注意不要輸入年度，否則會得到不完整的資料
3. 勾選所有 2020 年的週報，然後按下匯出網頁
4. 即可獲得所有 2020 年關於該專案的週報，接下來直接按列印即可

## 相關內容

### Camera 透過我們驗證 code sign `[Camera 透過我們驗證 code sign](code-sign/camera-透過我們驗證-code-sign.html)`

1. 生成 ECDSA 金鑰並進行簽章
2. 告知如何清除 Camera 的方式 - 驗證失敗時需要清除
3. 告知如何讀取 Camera 資料 - Hub 安全模型必須能讀取到更新的資料才能計算雜湊值
4. 可以改為告知我們所有的更新流程以及相關文件，讓我們控制整個更新流程
5. 下圖為 Hub Code Sign 驗證流程，驗證 code sign 應該可以由工具控制，韌體不需要做太多改變，但還是需要俊太確認

### Etoken System Code View `[Etoken System Code View](code-sign/etoken-system-code-view-.html)`

#### etoken_dongle_server
- 架構: 不通過。連線工作流程使用 detach 且無生命週期收斂，違反可預測關閉原則。
- 原生安全性: 不通過。檔案大小與外部命令執行缺乏邊界控制，存在資源與執行風險。
- 測試完整性: 不通過。看不到針對失敗路徑（超大輸入、shutdown race、協定錯位）的測試證據。
- 技術發現:
  1. [阻擋] 分離的工作執行緒可能會比擁有者 (this) 存活更久
  2. [阻擋] 來自對端提供的檔案大小無限制記憶體配置
  3. [警告] 公鑰階段協定錯誤操作碼不匹配
  4. [警告] 使用外部衍生參數的 system() 執行路徑
  5. [警告] select() 中的逾時轉換錯誤
  6. [建議] 原始碼中硬編碼的 token 密碼

#### etoken_server
- 架構: Release 組態已移除 OFFLINE_TEST，這點較前版改善；但連線工作執行緒仍採 detach，生命週期不可控，違反可預測性。
- 原生安全性: 未發現新的 pointer free 錯誤；但外部命令執行與檔案大小處理缺乏邊界，仍有高風險。
- 測試完整性: 看不到對失敗路徑（超大 file size、thread shutdown race、SQL 注入字串）的測試鎖定證據。
- 技術發現:
  1. [阻擋] SQL 注入風險（登入授權查詢）
  2. [警告] detach 執行緒捕獲 this，存在 shutdown race / UAF 風險
  3. [警告] Dongle 管理同樣使用 detach，生命週期不可驗證
  4. [警告] 檔案大小由對端提供且未設上限，可能 OOM/卡死
  5. [警告] 對 Dongle 端取檔同樣無大小上限
  6. [警告] DB 密碼硬編碼在程式碼

### HID Code Sign 記錄 `[HID Code Sign 記錄](code-sign/hid-code-sign-記錄.html)`

#### Update Protocol
- HID 更新流程
- Vendor Command 第二碼
- HID 預設只使用 2.0

#### Tool & Test
- 驗證工具位置: file:///\\genesyslogic.com.tw\GenesysData\SW_Release_New\Hub\HID\Tool
- 驗證

#### 執行中
- Release Tool
- 請 SE 確認各作業系統是否有自動喚醒裝置的問題。
- HID 驗證 USB LOGO 問題。
- 整理 chip function list，用表格列出各 chip 機制的不同。
- HID 速度問題。
- FW UPD 已經是 open source 了，但 SW 目前無法 Build，無法測試。

#### 待討論
- GL3590
- Tool 在 Chromebook 上應該可以直接執行和更新，SW 會再討論如何測試和驗證。
- SW 需要討論一下 ISP tool 在燒錄時，需要明顯提示是使用 filter driver 還是 HID。
- 檢查不同作業系統平台（如 Mac、Linux、Chromebook）。

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
2021/12/17 HP ISP Tool

## 總結

根據提供的上下文資訊，可以總結出「研發投扺專案資料列印流程」的主要內容如下:

1. 使用 Edge 瀏覽器開啟會有問題，需改用 IE 模式。
2. 開啟工作週報，選擇關鍵字搜尋，輸入專案代號查詢，勾選所有 2020 年的週報並匯出網頁即可獲得所有相關週報。
3. 相關內容包括 Camera 的 code sign 驗證流程、Etoken System 的程式碼審查、HID Code Sign 的更新流程等。
4. 這些相關內容提供了一些技術細節和問題記錄，可以幫助理解整個研發投扺專案資料列印的上下文。