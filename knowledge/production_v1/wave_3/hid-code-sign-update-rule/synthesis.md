報告書：HID Code Sign Update Rule

「HID Code Sign Update Rule」是 Genesys Logic 為滿足 HP 韌體更新安全要求而設計的一套韌體簽署與驗證機制。此機制確保韌體映像檔在更新至裝置之前必須通過合法性驗證，以防止未經授權的程式碼被載入。

1. 驗證方式僅存在於 GLbinTool 和韌體本身，ISP Tool 僅負責更新資料的動作。[HID Code Sign Update Rule](hid-code-sign-update-rule.html)
2. 不同型號的裝置不能互相燒錄韌體。[HID Code Sign Update Rule](hid-code-sign-update-rule.html)
3. 當 Flash 中沒有簽章資訊時，需在 ISP 過程中先使用廠商指令傳送。[HID Code Sign Update Rule](hid-code-sign-update-rule.html)
4. 不能執行的程式碼不能留在韌體中。[HID Code Sign Update Rule](hid-code-sign-update-rule.html)

1. 說明 ISP 更新流程。[HID Code Sign Update Rule](hid-code-sign-update-rule.html)
2. 定義 HID Code Sign Bin 格式。[HID Code Sign Update Rule](hid-code-sign-update-rule.html)
3. 介紹 HID Code Sign Bin 格式 (GL9511)。[HID Code Sign Update Rule](hid-code-sign-update-rule.html)

1. ISP 指令：工具會指定位址和長度，並將整個檔案傳送下去，韌體需自行分析各資料位置。[HID Code Sign Update Rule](hid-code-sign-update-rule.html)

1. 驗證 Public Key 和簽章。[HID Code Sign Update Rule](hid-code-sign-update-rule.html)

- [Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)
  - 說明 Genesys Logic 為滿足 HP Code Signing 安全要求而設計的韌體簽署與驗證架構。
- [3rd party code signing specification (ECDSA)](3rd-party-code-signing-specification-ecdsa.html)
  - 概述 Genesys Logic 的程式碼簽署流程和實作方式。
- [3rd party code signing specification (ECDSA)(EN)](3rd-party-code-signing-specification-ecdsaen-.html)

「HID Code Sign Update Rule」是 Genesys Logic 為確保韌體更新安全性而設計的一套完整機制。它涵蓋了韌體簽署、驗證和更新等關鍵流程，確保只有經過合法授權的程式碼才能被載入裝置。此機制符合 HP 的安全要求，並透過與 Genesys Logic 其他程式碼簽署系統的整合，實現了端到端的安全韌體更新解決方案。