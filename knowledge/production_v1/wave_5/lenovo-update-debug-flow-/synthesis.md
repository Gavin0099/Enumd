
# Lenovo Update Debug Flow

根據提供的上下文邊界，Lenovo Update Debug Flow 的核心步驟如下:

1. 刪除位於 `thinkvision_p49w_30_fw1_5_tool_1_0\pkg\Monitor\Genesys` 下的 `TargetDevice.ini` 檔案。

以下是從提供的相關內容中歸納出的與 Lenovo Update Debug Flow 相關的重要資訊:

### Camera 透過我們驗證 code sign [`Camera 透過我們驗證 code sign`](code-sign/camera-透過我們驗證-code-sign.html)
- 告知如何清除 Camera 的方式 - 驗證失敗時需要清除
- 告知如何讀取 Camera 資料 - 必須能夠讀取更新資料才能計算雜湊值

### Etoken System Code View [`Etoken System Code View`](code-sign/etoken-system-code-view-.html)
- `etoken_dongle_server` 程式碼審查發現多項高風險問題，包括執行緒生命週期不可控、外部命令執行與檔案大小處理缺乏邊界控制等。
- `etoken_server` 程式碼審查發現 SQL 注入風險、執行緒生命週期不可控、檔案大小處理缺乏邊界控制等問題。

### HID Code Sign 記錄 [`HID Code Sign 記錄`](code-sign/hid-code-sign-記錄.html)
- Vendor Command 第二碼


1. **Lenovo Update Debug Flow**:
   - 與 Camera 更新流程及驗證有關，需要了解如何清除 Camera、讀取更新資料等。
   - 與 Etoken 系統程式碼審查結果有關，需要注意執行緒生命週期、外部命令執行、檔案大小處理等潛在風險。
   - 與 HID 更新流程、工具與測試有關，需要了解 HID 的相關機制、正在進行的工作項目以及待討論的議題。
