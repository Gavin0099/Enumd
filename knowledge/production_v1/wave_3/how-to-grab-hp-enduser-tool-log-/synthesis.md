以下是如何抓取 HP EndUser Tool 日誌的詳細說明:

## 如何抓取 HP EndUser Tool 日誌

1. 開啟 HP EndUser Tool 目錄中的 `HPFwUpdate.ini` 檔案。
2. 在 `HPFwUpdate.ini` 檔案中新增以下參數:



3. 執行 HP EndUser Tool。
4. 將 HP EndUser Tool 目錄中的日誌檔目錄裡面的日誌檔寄給我們分析。


1. [Code Sign Flow](code-sign/code-sign-flow.html)
   - 說明 Genesys Logic 的 code sign 流程，包括使用 OpenSSL、Token 或 HSM 等方式進行簽章。

2. [HID Code Sign 記錄](code-sign/hid-code-sign-記錄.html)
   - 記錄 HID 裝置的 code sign 相關資訊，包括更新協定、工具和測試、執行中的問題和待討論事項。

3. [HP Monitor Code Sign Update Flow](code-sign/hp-monitor-code-sign-update-flow.html)
   - 詳細說明 HP 顯示器的 code sign 更新流程，包括 ISP Tool 與 Hub Firmware 的初始化交握機制，以及不同 code sign 模式的更新流程。
