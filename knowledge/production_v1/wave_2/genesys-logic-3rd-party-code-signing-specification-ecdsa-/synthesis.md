報告書：Genesys Logic 第三方程式碼簽署規範 (ECDSA)

Genesys Logic 為了滿足韌體合法性驗證的需求，制定了一套基於 ECDSA 加密演算法的程式碼簽署與驗證規範。此規範涵蓋了簽署流程、驗證流程以及相關的實作細節。

Genesys Logic 的程式碼簽署流程包括以下步驟：

1. 使用 ECDSA 私鑰對目標二進位檔案進行數位簽章 `[Genesys Logic code sign overview](genesys-logic-3rd-party-code-signing-specification-ecdsa-.html)`。

Genesys Logic 的程式碼驗證流程包括以下步驟：

[未有直接 Source 錨點，待確認] 2. 使用 ECDSA 公鑰驗證簽章的合法性。
3. 如果驗證通過，則確認該二進位檔案為合法的 Genesys Logic 韌體。

Genesys Logic 提供了兩種實作程式碼簽署與驗證的方式：

1. **使用 OpenSSL**：利用 OpenSSL 工具套件提供的 ECDSA 功能實現簽署與驗證 `[Using OpenSSL](genesys-logic-3rd-party-code-signing-specification-ecdsa-.html)`。
2. **使用 eToken**：利用 FIPS 140-2 Level 3 認證的 USB eToken 硬體安全模組存儲私鑰，並搭配自行開發的 SDK 應用程式實現簽署與驗證 `[Using eToken](genesys-logic-3rd-party-code-signing-specification-ecdsa-.html)`。

為了滿足 HP Code Signing 的嚴格安全要求，Genesys Logic 的程式碼簽署方案必須符合 FIPS 140-2 Level 3 安全標準，並採用 ECDSA nistp256 加密演算法 `[Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)`。
