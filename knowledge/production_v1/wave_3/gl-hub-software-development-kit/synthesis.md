以下為 GL Hub 軟體開發套件 (GL Hub Software Development Kit) 的綜合報告:

## GL Hub 軟體開發套件概述
[GL Hub Software Development Kit](gl-hub-software-development-kit.html)是 GenesysLogic Inc. 於 2022 年底推出的軟體開發套件。透過 GL Hub SDK，廠商可以開發適用於 GL Hub 裝置的應用程式,包括查詢 Hub 資訊、發送廠商指令,以及更新韌體等功能。

SDK (lib & dll) 包含以下內容:

1. 開啟 OpenGLHubDriver V2.2.0 資料夾。
2. 執行 GLHubDriver_v2.2.0.exe 檔案。
3. 點選 Driver Ver 2.2 按鈕。

## GL SDK API 說明
使用 GL_SDK DLL 時,需要在專案原始碼中包含標頭檔 GL_SDK.h,並連結 GL_SDK.lib 和 GL_SDK.dll。GL_SDK.dll 應位於專案原始碼資料夾中。

在執行 GL SDK API 之前,請確保已安裝設備過濾驅動程式。

### uint32_t SDKVersion

### void InitialzeSDK

### ERROR_CODE UsbSelectiveSuspend(bool bEnable)

### ERROR_CODE DetectUsbHub(size_t *nDetectedCount)
查詢偵測到的 GL Hub 數量。

### ERROR_CODE GetUsbHubList(UsbDeviceInfo *bufDevList, size_t nDetectedCount)
取得 GL Hub 的基本資訊。

### ERROR_CODE QueryUsbHubFwCount(const UsbDeviceInfo *dev, size_t *nFwCount)
查詢 GL Hub 支援更新的韌體數量。

### ERROR_CODE GetUsbHubFwVersion(const UsbDeviceInfo *dev, GlFwVersion *fwVer, size_t nFwCount)
取得 GL Hub 的所有韌體版本。

### ERROR_CODE GetSpecificFwVersion(const UsbDeviceInfo *dev, GlFwVersion *fwVer)
取得指定 GL Hub 的韌體版本。

### ERROR_CODE SendControlPipe(const UsbDeviceInfo *dev, UsbSetupPacket pkt, uint8_t *pData)
向指定的 GL Hub 發送廠商指令。

### ERROR_CODE UpdateFw(const UsbDeviceInfo *dev, GlFw fw, const wchar_t *szFwFilePath)

### void UninitialzeSDK(void)

### ERROR_CODE InstallHubDriver(void)

### ERROR_CODE UninstallHubDriver(void)

請參考 GL_SDK.h 了解以下資料結構:
- UsbDeviceInfo & USBDeviceDescriptor
- GlFwVersion & GlFw & GL_FW_TYPE

[HID Code Sign 記錄](hid-code-sign-記錄.html)提供了 HID 韌體更新的相關資訊,包括更新流程、廠商指令、HID 版本限制等。

[Command line uninstall driver](command-line-uninstall-driver.html)介紹了透過命令列移除驅動程式的方式。

[E27m & E34m Driver install fail](e27m-e34m-driver-install-fail.html)記錄了在某些平台上安裝驅動程式時遇到的問題,例如與 Cisco Webex 軟體的相容性問題。