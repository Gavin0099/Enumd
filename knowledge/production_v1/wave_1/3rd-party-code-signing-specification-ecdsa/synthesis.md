報告書：3rd party code signing specification (ECDSA)

本報告書旨在概述 Genesys Logic 針對第三方韌體程式碼簽署所採用的 ECDSA 規範。Genesys Logic 為滿足安全性要求，必須對所有韌體程式碼進行合法性驗證。本文將詳細介紹 Genesys Logic 的程式碼簽署流程、實作方式以及相關技術細節。

## 1. Genesys Logic 程式碼簽署概述
Genesys Logic 採用簽署二進位檔案的方式來驗證韌體程式碼的合法性。整個簽署流程包括以下步驟：

1. 簽署 (Sign)：使用 ECDSA 私鑰對韌體二進位檔案進行數位簽章。
2. 驗證 (Verify)：在韌體更新前，先使用 ECDSA 公鑰驗證二進位檔案的數位簽章是否合法。

Genesys Logic 提供了多種實作方式來完成程式碼簽署，包括使用 OpenSSL 工具和 eToken 硬體安全模組。

### 2.1 使用 OpenSSL
1. 使用 OpenSSL 生成 ECDSA 私鑰和公鑰。

### 2.2 使用 eToken
1. 使用 FIPS 140-2 Level 3 認證的 eToken 硬體安全模組生成 ECDSA 私鑰。
2. 使用 eToken 上的私鑰對二進位檔案進行數位簽章。

在韌體更新前，系統會先使用 ECDSA 公鑰驗證二進位檔案的數位簽章是否合法。只有通過驗證的檔案才能被安全地更新到裝置上。

Genesys Logic 採用 ECDSA 演算法進行程式碼簽署和驗證,以確保韌體的安全性和合法性。本文詳細介紹了 Genesys Logic 的程式碼簽署流程和實作方式,希望能為相關領域的讀者提供參考。

1. [`-genesys-logic-firmware-安全簽署與驗證流程-code-signing-`](/code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)
2. [`3rd-party-code-signing-specification-ecdsaen-`](/code-sign/3rd-party-code-signing-specification-ecdsaen-.html)
3. [`code-sign-ecc-key`](/code-sign/code-sign-ecc-key.html)