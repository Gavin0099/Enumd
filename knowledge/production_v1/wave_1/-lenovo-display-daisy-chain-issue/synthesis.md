
根據提供的上下文資訊,客戶在使用 Lenovo 顯示器的 Daisy Chain 功能時,透過 One Key Update Tool 進行韌體更新時會出現更新失敗的問題。

2. 初步猜測是 scaler 韌體更新後,延遲時間設定過短(從 20 秒改為 30 秒)。 [`Lenovo Display Daisy Chain issue`]
5. 與 Adam 討論後的推測,檢查電源設定與工具行為。

1. 請 RTK 修改 Scaler Update Tool 的作法,在呼叫 i2c 指令後,不要再執行 Enable Suspend 的動作。 [`Lenovo Display Daisy Chain issue`]

1. 關於 HP OCI APP 的最新 SDK 文件 v2.6,提供了一些相關的參考資訊,包括 Device DLL 的功能、檔案簽章驗證、韌體更新流程等。 [`HP OCI APP`]
3. 如何擷取 DebugView 日誌的說明,可以協助客戶提供更多問題排查所需的資訊。 [`How To Grab DebugView Log`]

根據提供的上下文資訊,Lenovo 顯示器 Daisy Chain 韌體更新問題的初步解決方案是修改 Scaler Update Tool 的作法,避免在更新後立即執行 Enable Suspend 動作。後續可能還需要進一步分析 USBView 日誌,並參考相關的 SDK 文件和安全性考量,以確保問題的徹底解決。