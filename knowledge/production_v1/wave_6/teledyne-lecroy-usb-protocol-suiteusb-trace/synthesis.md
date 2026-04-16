
# Teledyne LeCroy USB Protocol Suite(USB Trace)

Teledyne LeCroy USB Protocol Suite(USB Trace)的安裝路徑為:
`Z:\SW_Release_New\Hub\USBProtocolSuiteSW8.58_B3745_BETA-EV_USBComplianceSuiteSW5.25_B0956-EV\USBProtocolSuiteSW8.58_B3745_BETA-EV.exe`

`\\gli-data2.genesyslogic.com.tw\GenesysData\Laboratory\Software\LeCroy\USB`

此外,也可以參考 [net_python_api_reference.pdf](https://cdn.teledynelecroy.com/files/manuals/net_python_api_reference.pdf) 了解相關的 Python API 參考文件。

## LeCroy 錄製 Log 設定方式
### LeCroy機器 USB 連接方式
LeCroy 機器可以透過 USB-B 或 USB-C 介面連接。

### LeCroy 錄製前設定方式
使用 LeCroy 機器進行 USB 錄製前,需要先進行相關的設定。

## LeCroy Log 分析設定
在分析 LeCroy 錄製的 Log 時,可以先關閉以下一些資訊:
1. `Hide USB 3.2 Traffic` - 如果只需要查看 USB 2.0 的資訊,可以隱藏 USB 3.2 的流量。
2. `Hide Device`
3. `Hide USB 2 Nak's`
5. `Hide miscellaneous packets`

### Level Viewing
可以將 `View USB 4 Operation Level` 設定為觀看 USB 4 的操作層級。

### Search Data方式
[未有直接 Source 錨點，待確認] 可以透過以下方式搜尋 Log 中的資料:
1. `Search -> Find`
2. `Packets -> Data Pattern -> Data`

## 與 eToken 安全簽章系統的關係
Teledyne LeCroy USB Protocol Suite(USB Trace)可能與 [eToken 安全簽章系統技術說明](etoken-安全簽章系統技術說明.html)中提到的簽章流程有關,因為 USB 協議是簽章系統中的一個重要環節。但本文件中並未提供足夠的證據來說明二者之間的具體關係。

## 與 HID Code Sign 記錄的關係
Teledyne LeCroy USB Protocol Suite(USB Trace)可能與 [HID Code Sign 記錄](hid-code-sign-記錄.html)中提到的 HID 更新流程有關,因為 USB 協議是 HID 更新的一個重要部分。但本文件中並未提供足夠的證據來說明二者之間的具體關係。

## 與 Command line uninstall driver 的關係
Teledyne LeCroy USB Protocol Suite(USB Trace)可能需要透過 [Command line uninstall driver](command-line-uninstall-driver.html)中提到的方式來卸載相關的驅動程式。但本文件中並未提供足夠的證據來說明二者之間的具體關係。
