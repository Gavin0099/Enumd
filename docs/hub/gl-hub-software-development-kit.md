---
title: GL Hub Software Development Kit
domain_tags:
  - hub
  - driver
  - firmware
  - sdk
  - tools
task_tags:
  - install
  - build
  - release
  - spec
  - log
authority_level: derived
is_deprecated: false
category: hub
notion_id: 8549ca6d-3a91-4f07-81ec-69fec19cd106
notion_url: >-
  https://www.notion.so/GL-Hub-Software-Development-Kit-8549ca6d3a914f0781ec69fec19cd106
notion_updated_at: '2026-01-21T09:53:00.000Z'
exported_at: '2026-04-06T13:10:44.429Z'
is_summarized: false
relations: []
---

 
## Overview 
GL Hub SDK released in late 2022 is a software development kit developed by GenesysLogic Inc. With the GL Hub SDK, vendors can develop applications for GL Hub devices, including processing queries for hub information, sending vendor commands, and updating firmware.
The SDK(lib & dll) includes 
1. This API document 
1. Sample Code For C++ 
1. Device Filter Driver install package
## Installation Steps for the Device Filter Driver Install Package
1. Open OpenGLHubDriver V2.2.0 folder.
1. Run GLHubDriver_v2.2.0.exe file.
1. Click on Driver Ver 2.2 button.
1. Once the installation is completed, the following screen will be displayed.
## GL SDK API description 
To use the GL_SDK DLL, first, include the header file GL_SDK.h in your project source code. Then, add a link to both GL_SDK.lib and GL_SDK.dll.
The GL_SDK.dll should be located in the project source file folder.
- Please ensure that the Device Filter Driver is installed before executing the GL SDK API.
### uint32_t SDKVersion
Get GL SDK version 
- Parameter
- Return Value
### Void InitialzeSDK
Initial GL SDK
- Parameter
- Return Value
### ERROR_CODE UsbSelectiveSuspend(bool bEnable)
Disable USB selective suspend
- Parameter
- Return Value
### ERROR_CODE DetectUsbHub(size_t *nDetectedCount)
Query number of detected GL hubs
- Parameter
- Return Value
### ERROR_CODE GetUsbHubList(UsbDeviceInfo *bufDevList, size_t nDetectedCount)
Get basic information of GL hubs
- Parameter
- Return Value
### ERROR_CODE QueryUsbHubFwCount(const UsbDeviceInfo *dev, size_t *nFwCount)
Query number of FW that GL hub supports updating
- Parameter 
- Return Value
### ERROR_CODE GetUsbHubFwVersion(const UsbDeviceInfo *dev, GlFwVersion *fwVer, size_t nFwCount)
Grab all firmware versions of GL Hub
- Parameter
- Return Value
### ERROR_CODE GetSpecificFwVersion(const UsbDeviceInfo *dev, GlFwVersion *fwVer)
Grab the firmware version of the specified GL Hub
- Parameter
- Return Value
### ERROR_CODE SendControlPipe(const UsbDeviceInfo *dev, UsbSetupPacket pkt, uint8_t *pData)
Send vendor command to specified GL hub
- Parameter
- Return Value
### ERROR_CODE UpdateFw(const UsbDeviceInfo *dev, GlFw fw, const wchar_t *szFwFilePath);
update GL hub firmware
- Parameter 
- Return Value 
### void UninitialzeSDK(void)
Uninitialze GL SDK
- Parameter 
- Return Value 
### ERROR_CODE InstallHubDriver(void) 
Install GL Driver
- Parameter 
- Return Value 
### ERROR_CODE UninstallHubDriver(void) 
Install GL Driver
- Parameter 
- Return Value 
### Comment
Refer to GL_SDK.h
- ERROR_CODE
- UsbDeviceInfo & USBDeviceDescriptor
- GlFwVersion & GlFw & GL_FW_TYPE
