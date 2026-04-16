
# Teledyne LeCroy Python 安裝和測試方式

## 安裝 USBProtocolSuiteSW9.01_B4310_BETA-EV

1. 安裝 `USBProtocolSuiteSW9.01_B4310_BETA-EV` 軟體，安裝路徑位於 `Z:\SW_Release_New\Hub\temp\USBProtocolSuiteSW9.01_B4310_BETA-EV`。[Teledyne LeCroy USB Protocol Suite](https://teledynelecroy.com/support/software-downloads)

## 執行 TLRemoteServer

1. 安裝完成後，在 `C:\Users\Public\Documents\LeCroy\USB Protocol Suite\Automation` 目錄下可以找到 LeCroy 提供的 Sample code。
2. 首先需要執行 `C:\Users\Public\Documents\LeCroy\USB Protocol Suite\Automation\TLRemoteServer` 底下的 `TLRemoteServer.exe`。[TLRemoteServer](https://teledynelecroy.com/support/software-downloads)

## 執行 Python Sample Code

1. 在 `C:\Users\Public\Documents\LeCroy\USB Protocol Suite\Automation\py\USBSuiteClient` 目錄下可以找到 Python 的 Sample code 和 Spec 文件。
2. 執行 `Test_1.py` 可以開啟 Catc C Tool 並開始錄製 USB 訊號，然後關閉錄製 USB 訊號。
3. 目前 `Test_1.py` 無法指定存檔路徑和檔名，預設路徑和檔名為 `C:\Users\Public\Documents\LeCroy\USB Protocol Suite\data.usb`。[Test_1.py](https://teledynelecroy.com/support/software-downloads)


在 [HID Code Sign 記錄](hid-code-sign-記錄.html) 中提到了一些 HID 相關的更新流程、工具和測試方式。

在 [Command line uninstall driver](command-line-uninstall-driver.html) 中介紹了如何透過命令列卸載驅動程式。

在 [E27m & E34m Driver install fail](e27m-e34m-driver-install-fail.html) 中討論了在 AMD 平台上安裝驅動程式時可能遇到的問題。