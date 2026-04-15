報告書：HP EndUser Tool Debug SOP

當 HP EndUser Tool 發生 update fail 時，可以先參考 [HP End User Tool Packing Instruction_code_sign](path/to/hp-end-user-tool-packing-instruction_code_sign.html) 中的「Common Problem」章節是否可以解決問題。如果仍無法解決，則需要提供兩個日誌檔以便進一步分析：

2. DebugView Log

## DebugView Log 分析
[未有直接 Source 錨點，待確認] 以下是一些常見的錯誤訊息，可以透過 DebugView 產生的日誌來分析問題所在：

1. **Not Support HP Device**：表示所使用的裝置不受支援。
2. **Scaler Firmware verification is failed**：表示 Scaler 韌體驗證失敗。
3. **GetScalerPublicKeyData failed**：表示無法取得 Scaler 公鑰資料。
4. **SetupDiEnumDeviceInfo ERROR! i=255, (259)**：表示設備列舉失敗。
5. **Scaler bin file not found**：表示找不到 Scaler 二進位檔案。
6. **Hub-1 firmware verification failed**：表示 Hub-1 韌體驗證失敗。
7. **SetupDiEnumDeviceInfo ERROR! i=255**：表示設備列舉失敗。


1. [Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](path/to/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)
   - 本文件闡述了 Genesys Logic 為滿足 HP Code Signing 安全要求所設計的韌體簽署與驗證架構。
2. [3rd party code signing specification (ECDSA)](path/to/3rd-party-code-signing-specification-ecdsa.html)
3. [3rd party code signing specification (ECDSA)(EN)](path/to/3rd-party-code-signing-specification-ecdsaen-.html)
   - 本文件以英文介紹了 Genesys Logic 的程式碼簽署概述、流程以及實作方式。

在 HP EndUser Tool 發生 update fail 時,可以先參考 User Guide 中的 Common Problem 章節,如果仍無法解決,則需要提供 USBView Log 和 DebugView Log 以便進一步分析。本報告中列出了一些常見的錯誤訊息及其可能原因,同時也提供了相關的背景資訊供參考。