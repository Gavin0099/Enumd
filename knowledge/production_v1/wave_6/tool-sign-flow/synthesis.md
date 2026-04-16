

根據提供的內容,Tool Sign 流程主要包含以下步驟:

1. 客戶申請憑證後,會獲得一個 .cer 或 .pfx 格式的憑證檔案。
[未有直接 Source 錨點，待確認] 3. 匯入憑證後,有兩種方式可以用來對 Tool 進行簽署:

[未有直接 Source 錨點，待確認] a. 使用 Visual Studio 進行簽署。


1. 客戶申請憑證後,會獲得一個 .cer 或 .pfx 格式的憑證檔案。[Tool Sign flow](tool-sign-flow.html)
2. 雙擊憑證檔案,可以將其匯入系統。[Tool Sign flow](tool-sign-flow.html)
3. 輸入申請時的密碼後,即可完成憑證的匯入。[Tool Sign flow](tool-sign-flow.html)


1. 使用 Visual Studio 進行簽署。[Tool Sign flow](tool-sign-flow.html)
2. 使用命令列工具進行簽署。[Tool Sign flow](tool-sign-flow.html)

## 與 Genesys Logic Firmware 安全簽署流程的關係

Genesys Logic 為了滿足 HP Code Signing 安全要求,設計了一套韌體簽署與驗證架構。[Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)

該架構採用 FIPS 140-2 Level 3 安全標準,並使用 ECDSA nistp256 加密演算法。[3rd party code signing specification (ECDSA)](3rd-party-code-signing-specification-ecdsa.html)

通過使用經 FIPS L3 認證的 USB eToken 硬體,並搭配自行開發的 SDK 應用程式,Genesys Logic 建立了一套兼具成本效益、可擴展性與災難恢復能力的內部簽署系統。[Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)

這套簽署系統涵蓋了金鑰生成、檔案簽署、端到端驗證等完整的程式碼簽署與驗證流程。[Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)


Tool Sign 流程是 Genesys Logic 整體程式碼簽署與驗證架構的一部分。通過使用經 FIPS L3 認證的 USB eToken 硬體,Genesys Logic 建立了一套安全、可擴展的內部簽署系統,以滿足嚴格的安全合規性要求。