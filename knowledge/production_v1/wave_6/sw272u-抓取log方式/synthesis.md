以下是根據提供的內容所撰寫的 SW272U 抓取 log 方式的文件:

# SW272U 抓取 log 方式

根據提供的上下文資訊,SW272U 的 log 抓取方式如下:

1. 進入 `其他->系統監視程式`
[未有直接 Source 錨點，待確認] 2. 連接裝置並啟動 `GLHubFwUpdateTool`
3. 在 `GLHubFwUpdateTool` 中選擇 `開始`
4. 執行 `updatescaler.sh` 腳本
5. 腳本執行完畢後,即可抓取 log 檔案

在 Genesys Logic 的韌體更新流程中,需要對韌體進行合法性驗證,即 `code sign` 的過程。根據 [`Code Sign Flow`](code-sign/code-sign-flow.html)文件,Genesys Logic 目前使用 ECDSA NISTP256 演算法進行韌體簽名。

此外,在 [`HID Code Sign 記錄`](code-sign/hid-code-sign-記錄.html)文件中,也提到了一些 HID 韌體更新相關的細節,包括更新協議、工具測試、執行中的問題和已解決的問題等。


1. `其他->系統監視程式` 是進入 log 抓取功能的入口
[未有直接 Source 錨點，待確認] 2. `GLHubFwUpdateTool` 是用於執行韌體更新的工具
3. `updatescaler.sh` 是用於更新 scaler 韌體的腳本
4. 韌體更新過程需要進行合法性驗證,即 `code sign` 流程
[未有直接 Source 錨點，待確認] 5. HID 韌體更新也有相關的協議、工具和測試記錄
[未有直接 Source 錨點，待確認] 6. HP 韌體壓力測試工具的架構原則和模組規格,對理解韌體更新流程很有幫助

根據提供的上下文資訊,可以總結出 SW272U 的 log 抓取方式如下:

2. 啟動 GLHubFwUpdateTool 工具
4. 執行 updatescaler.sh 腳本
5. 腳本執行完畢後即可抓取 log 檔案

同時,韌體更新過程中需要進行合法性驗證,即 `code sign` 流程。HID 韌體更新也有相關的協議和工具,而 HP 韌體壓力測試工具的架構原則和模組規格,對理解整個韌體更新流程很有幫助。