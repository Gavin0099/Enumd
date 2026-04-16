
# HP ISP Tool Special case update method

## Scaler dualImage update
由於 scaler boot code 會選擇版本較高的版本來載入，因此如果只更新舊版本的其中一個區塊是無法達到降版的功能。開啟這個更新案例時，會同時將 service bin 檔案更新到兩個區塊，以達到降版的功能。

  - 會先更新未運行的 boot code 區塊，等確認更新成功後，再更新另一個區塊。
- [未有直接 Source 錨點，待確認] 這個案例會更新 sBoot。

## Scaler dhcp or edid update
客戶遇到 hdcp 或 edid 資料被清除的問題，原因尚未釐清。因此提供可單獨更新 hdcp 或 edid bin 檔案的功能。

- [未有直接 Source 錨點，待確認] `IsSupportScalerDdcpOrEdidUpdate=1`
- [未有直接 Source 錨點，待確認] `ScalerHdcpOrEdidUpdateStart=0x3FA000`
- [未有直接 Source 錨點，待確認] `ScalerHdcpOrEdidUpdateEnd=0x3FFFFF`

## HP ISP Tool Update flow

- [`Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)`](/code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)
  - 說明 Genesys Logic 為滿足 HP Code Signing 安全要求所設計的韌體簽署與驗證架構。
- [`3rd party code signing specification (ECDSA)`](/code-sign/3rd-party-code-signing-specification-ecdsa.html)
  - 概述 Genesys Logic 的程式碼簽署流程。
- [`3rd party code signing specification (ECDSA)(EN)`](/code-sign/3rd-party-code-signing-specification-ecdsaen-.html)