
# Teledyne LeCroy Python 安裝和測試方式

## 1. 安裝 USBProtocolSuiteSW9.01_B4310_BETA-EV

1. 安裝位置: `Z:\SW_Release_New\Hub\temp\USBProtocolSuiteSW9.01_B4310_BETA-EV`
2. 安裝完成後, `C:\Users\Public\Documents\LeCroy\USB Protocol Suite\Automation` 目錄下可以找到 LeCroy 提供的 Sample code。

## 2. 啟動 TLRemoteServer

1. 執行 `C:\Users\Public\Documents\LeCroy\USB Protocol Suite\Automation\TLRemoteServer\TLRemoteServer.exe` 以啟動 TLRemoteServer。

## 3. 使用 Python Sample Code

1. `C:\Users\Public\Documents\LeCroy\USB Protocol Suite\Automation\py\USBSuiteClient` 目錄下包含 Python 的 Sample code 和 Spec 文件。
2. 執行 `Test_1.py` 可以開啟 Catc C Tool, 並開始/停止錄製 USB 訊號。
3. 目前無法指定錄製檔案的儲存路徑和檔名, 預設路徑和檔名為 `C:\Users\Public\Documents\LeCroy\USB Protocol Suite\data.usb`。


本文件主要描述了 Teledyne LeCroy 提供的 USB Protocol Suite 軟體的 Python 安裝和測試方式。其中包含了以下關鍵概念和依賴關係:

1. 安裝 `USBProtocolSuiteSW9.01_B4310_BETA-EV` 軟體包, 並找到其中的 Python Sample code 和 Spec 文件 [`Teledyne LeCroy python安裝和測試方式`](./teledyne-lecroy-python安裝和測試方式.html)。
2. 啟動 `TLRemoteServer.exe` 以提供 Python 程式存取 USB 協議分析功能 [`Teledyne LeCroy python安裝和測試方式`](./teledyne-lecroy-python安裝和測試方式.html)。
3. 執行 `Test_1.py` 示例程式, 可以開啟 Catc C Tool 並錄製 USB 訊號 [`Teledyne LeCroy python安裝和測試方式`](./teledyne-lecroy-python安裝和測試方式.html)。
