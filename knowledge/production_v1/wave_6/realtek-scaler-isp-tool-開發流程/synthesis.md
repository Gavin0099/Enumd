# Realtek Scaler ISP Tool 開發流程

## 已支援的Scaler IC
- RTD2325AR :[HP]E244
- RTD2525AR :[Philips]242B1TS
- RTD2522T-CG :[ELO]ET2402
- RTD2536R :[ASUS]C624WQ
- RTD2556QR-CG :[Philips]255P1FN
- RTD2718Q :[ASUS]XG27UQ
- RTD2785R-CG :[Philips]325B1L
- RTD2785T-CG :[iiyama]XUB2493
- RTD2788M :[Philips]256P1
- RTD2795T-CG :[iiyama]XUB2893

   1. 將電路圖交給Hub FW team
   1. SW team使用MultiIspTool專案：根據ISP flow的流程做Coding。(已完成)
   1. 修改GLHub.ini內容

- 根據Hub FW設定單次I2C寫入的資料長度，RTK的scaler支援最大256 bytes。
- Hub HW I2C 能傳送的長度目前是255；可設定0x80以利整除。
  > I2cWriteLength=0x100
- 設定FW寫入的起始位置。因應有boot code及user code的機種。
  > FwUserCodeAddress=0x0
- 設定讀取FW version。scaler沒有直接讀取版本的命令，需透過讀取binary檔以及flash。
  Tool讀flash的位置為FwUserCodeAddress + FwVersionAddress。
  > FwVersionAddress=0xFF000
[未有直接 Source 錨點，待確認] FwVersionLength=5
- 設定FW indicator。特殊寫入數值到FW指定位置。
  Tool會讀取包含該offset資料的flash sector，修改該值再回寫。
  > FwIndicatorAddress=0x0
[未有直接 Source 錨點，待確認] FwIndicatorValue=0x0000

## Disable flash SW write protection
額外的disable Flash SW WP設定，使用JEDEC_ID作為Section name
> ExtraFlashSwWp=EF4015,EF4016

[未有直接 Source 錨點，待確認] SwWpReadCmd=0x15
[未有直接 Source 錨點，待確認] SwWpWriteCmd=0x11
[未有直接 Source 錨點，待確認] SwWpByteReserved=0xfb
[未有直接 Source 錨點，待確認] SwWpByteValue=0x04

[未有直接 Source 錨點，待確認] SwWpReadCmd=0x15
[未有直接 Source 錨點，待確認] SwWpWriteCmd=0x11
[未有直接 Source 錨點，待確認] SwWpByteReserved=0xfb
[未有直接 Source 錨點，待確認] SwWpByteValue=0x04

## <a name="tagHWWP"></a>Disable flash HW write protection
> Flash WP (Write Protect) pin is connected to the GPIO pin specified by the chip. It is
necessary to set GPIO to make WP pin high to disable flash hardware write protection.
Specific settings can be confirmed with the technical contact window of Realtek.

此範例使用RTD2785T-CG。

> Disable Flash Hardware Write Protection
S-0x94a-0xF4a-0x9Fa-P
S-0x94a-0xF5a-0x10a-P
S-0x94a-0xF4a-0x29a-P
S-0x94a-0xF5a-S-0x95a-[ucReadValue]n-P
S-0x94a-0xF4a-0x9Fa-P
S-0x94a-0xF5a-0x10a-P
S-0x94a-0xF4a-0x29a-P
S-0x94a-0xF5a-[ucValue]a-P\<ucValue = ucReadValue & 0xF0 | 0x01>
- [未有直接 Source 錨點，待確認] 0x10及0x29合併成0x1029並設給HwWpGpio
- [未有直接 Source 錨點，待確認] 0xF0設給HwWpGpioReserved
- [未有直接 Source 錨點，待確認] 0x01設給HwWpGpioValue

> Set Pin Value to high
S-0x94a-0xF4a-0x9Fa-P
S-0x94a-0xF5a-0xFEa-P
S-0x94a-0xF4a-0x19a-P
S-0x94a-0xF5a-S-0x95a-[ucReadValue]n-P
S-0x94a-0xF4a-0x9Fa-P
S-0x94a-0xF5a-0xFEa-P
S-0x94a-0xF4a-0x19a-P
S-0x94a-0xF5a-[ucValue]a-P\<ucValue = ucReadValue & 0xFE | 0x01>
- [未有直接 Source 錨點，待確認] 0xFE及0x19合併成0xFE19並設給HwWpPin
- [未有直接 Source 錨點，待確認] 0xFE設給HwWpPinReserved
- [未有直接 Source 錨點，待確認] 0x01設給HwWpPinValue


### <a name="tagRTD2325AR"></a>RTD2325AR / <a name="tagRTD2525AR"></a>RTD2525AR
[未有直接 Source 錨點，待確認] HwWpGpioReserved=0xf0
[未有直接 Source 錨點，待確認] HwWpGpioValue=0x01
[未有直接 Source 錨點，待確認] HwWpPinReserved=0xfe
[未有直接 Source 錨點，待確認] HwWpPinValue=0x01

### <a name="tagRTD2522T-CG"></a>RTD2522T-CG / <a name="tagRTD2536R"></a>RTD2536R
[未有直接 Source 錨點，待確認] HwWpGpioReserved=0xf0
[未有直接 Source 錨點，待確認] HwWpGpioValue=0x01
[未有直接 Source 錨點，待確認] HwWpPinReserved=0xfe
[未有直接 Source 錨點，待確認] HwWpPinValue=0x01

### <a name="tagRTD2556QR-CG"></a>RTD2556QR-CG / <a name="tagRTD2785R-CG"></a>RTD2785R-CG / <a name="tagRTD2785T-CG"></a>RTD2785T-CG
[未有直接 Source 錨點，待確認] HwWpGpioReserved=0xf0
[未有直接 Source 錨點，待確認] HwWpGpioValue=0x01
[未有直接 Source 錨點，待確認] HwWpPinReserved=0xfe
[未有直接 Source 錨點，待確認] HwWpPinValue=0x01

### <a name="tagRTD2718Q"></a>RTD2718Q
[未有直接 Source 錨點，待確認] HwWpGpioReserved=0xf8
[未有直接 Source 錨點，待確認] HwWpGpioValue=0x01
[未有直接 Source 錨點，待確認] HwWpPinReserved=0xfb
[未有直接 Source 錨點，待確認] HwWpPinValue=0x04

### <a name="tagRTD2788M"></a>RTD2788M
[未有直接 Source 錨點，待確認] HwWpGpioReserved=0xf0
[未有直接 Source 錨點，待確認] HwWpGpioValue=0x01
[未有直接 Source 錨點，待確認] HwWpPinReserved=0xfe
[未有直接 Source 錨點，待確認] HwWpPinValue=0x01

### <a name="tagRTD2795T-CG"></a>RTD2795T-CG
[未有直接 Source 錨點，待確認] HwWpGpioReserved=0xf0
[未有直接 Source 錨點，待確認] HwWpGpioValue=0x01
[未有直接 Source 錨點，待確認] HwWpPinReserved=0xfe
[未有直接 Source 錨點，待確認] HwWpPinValue=0x01

根據提供的上下文,可以總結出Realtek Scaler ISP Tool的開發流程如下:

1. 客戶提供電路圖,交給Hub FW team處理。
2. SW team使用MultiIspTool專案,根據ISP flow的流程進行Coding。
3. 修改GLHub.ini內容,包括I2C寫入長度、FW寫入位置、FW版本讀取、FW指標設定等。
4. 針對不同型號的Scaler IC,需要設定Disable Flash SW/HW Write Protection的相關參數。

[未有直接 Source 錨點，待確認] 整個開發流程主要圍繞著客戶需求、Hub FW團隊的配合,以及MultiIspTool專案的Coding和INI設定。關鍵在於針對不同Scaler IC型號,正確設定相關的參數,以確保ISP工具的正常運作。