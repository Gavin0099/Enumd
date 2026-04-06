---
title: Realtek Scaler ISP tool 開發流程
domain_tags:
  - hub
  - monitor
  - tools
task_tags:
  - firmware-update
  - sop
  - config
authority_level: source
is_deprecated: false
category: hub
notion_id: 626f60f6-0306-4081-bb4c-781c224047b9
notion_url: 'https://www.notion.so/Realtek-Scaler-ISP-tool-626f60f603064081bb4c781c224047b9'
notion_updated_at: '2022-11-25T07:12:00.000Z'
exported_at: '2026-04-06T13:14:45.937Z'
is_summarized: false
relations: []
---

# 已支援的Scaler IC
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
# 開發流程
1. 請客戶提供：
1. 將電路圖交給Hub FW team
1. SW team使用MultiIspTool專案：根據ISP flow的流程做Coding。(已完成)
1. 修改GLHub.ini內容
# Other
根據Hub FW設定單次I2C寫入的資料長度，RTK的scaler支援最大256 bytes。
Hub HW I2C 能傳送的長度目前是255；可設定0x80以利整除。
> I2cWriteLength=0x100
設定FW寫入的起始位置。因應有boot code及user code的機種。
> FwUserCodeAddress=0x0
設定讀取FW version。scaler沒有直接讀取版本的命令，需透過讀取binary檔以及flash。
Tool讀flash的位置為FwUserCodeAddress + FwVersionAddress。
> FwVersionAddress=0xFF000
FwVersionLength=5
設定FW indicator。特殊寫入數值到FW指定位置。
Tool會讀取包含該offset資料的flash sector，修改該值再回寫。
> FwIndicatorAddress=0x0
FwIndicatorValue=0x0000
# Disable flash SW write protection
額外的disable Flash SW WP設定，使用JEDEC_ID作為Section name
> ExtraFlashSwWp=EF4015,EF4016
### W25Q16JV
```plain text
[EF4015]
SwWpReadCmd=0x15
SwWpWriteCmd=0x11
SwWpByteReserved=0xfb
SwWpByteValue=0x04

```
### W25Q32JV
```plain text
[EF4016]
SwWpReadCmd=0x15
SwWpWriteCmd=0x11
SwWpByteReserved=0xfb
SwWpByteValue=0x04

```
# <a name="tagHWWP"></a>Disable flash HW write protection
> Flash WP (Write Protect) pin is connected to the GPIO pin specified by the chip. It is
necessary to set GPIO to make WP pin high to disable flash hardware write protection.
Specific settings can be confirmed with the technical contact window of Realtek.
### 設定範例
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
- 0x10及0x29合併成0x1029並設給HwWpGpio
- 0xF0設給HwWpGpioReserved
- 0x01設給HwWpGpioValue
> Set Pin Value to high
S-0x94a-0xF4a-0x9Fa-P
S-0x94a-0xF5a-0xFEa-P
S-0x94a-0xF4a-0x19a-P
S-0x94a-0xF5a-S-0x95a-[ucReadValue]n-P
S-0x94a-0xF4a-0x9Fa-P
S-0x94a-0xF5a-0xFEa-P
S-0x94a-0xF4a-0x19a-P
S-0x94a-0xF5a-[ucValue]a-P\<ucValue = ucReadValue & 0xFE | 0x01>
- 0xFE及0x19合併成0xFE19並設給HwWpPin
- 0xFE設給HwWpPinReserved
- 0x01設給HwWpPinValue
設定結果
### <a name="tagRTD2325AR"></a>RTD2325AR / <a name="tagRTD2525AR"></a>RTD2525AR
```plain text
[Scaler]
HwWpGpio=0x102a
HwWpGpioReserved=0xf0
HwWpGpioValue=0x01
HwWpPin=0xfe1a
HwWpPinReserved=0xfe
HwWpPinValue=0x01

```
### <a name="tagRTD2522T-CG"></a>RTD2522T-CG / <a name="tagRTD2536R"></a>RTD2536R
```plain text
[Scaler]
HwWpGpio=0x1028
HwWpGpioReserved=0xf0
HwWpGpioValue=0x01
HwWpPin=0xfe18
HwWpPinReserved=0xfe
HwWpPinValue=0x01

```
### <a name="tagRTD2556QR-CG"></a>RTD2556QR-CG / <a name="tagRTD2785R-CG"></a>RTD2785R-CG / <a name="tagRTD2785T-CG"></a>RTD2785T-CG
```plain text
[Scaler]
HwWpGpio=0x1029
HwWpGpioReserved=0xf0
HwWpGpioValue=0x01
HwWpPin=0xfe19
HwWpPinReserved=0xfe
HwWpPinValue=0x01 

```
### <a name="tagRTD2718Q"></a>RTD2718Q
```plain text
[Scaler]
HwWpGpio=0x100a
HwWpGpioReserved=0xf8
HwWpGpioValue=0x01
HwWpPin=0xffe3
HwWpPinReserved=0xfb
HwWpPinValue=0x04

```
### <a name="tagRTD2788M"></a>RTD2788M
```plain text
[Scaler]
HwWpGpio=0x1064
HwWpGpioReserved=0xf0
HwWpGpioValue=0x01
HwWpPin=0xfe54
HwWpPinReserved=0xfe
HwWpPinValue=0x01

```
### <a name="tagRTD2795T-CG"></a>RTD2795T-CG
```plain text
[Scaler]
HwWpGpio=0x1036
HwWpGpioReserved=0xf0
HwWpGpioValue=0x01
HwWpPin=0xfe26
HwWpPinReserved=0xfe
HwWpPinValue=0x01

```
