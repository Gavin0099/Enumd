報告書：3rd party code signing specification (ECDSA)(EN)

## 摘要
本報告書旨在概述 Genesys Logic 針對第三方韌體代碼簽署所制定的 ECDSA 規範。Genesys Logic 為滿足 HP Code Signing 安全要求，設計了一套完整的韌體簽署與驗證架構。該架構採用 ECDSA nistp256 加密演算法，並符合 FIPS 140-2 Level 3 安全標準。本報告將詳細介紹簽署流程、實作細節以及相關的金鑰管理機制。

## 1. Genesys Logic 代碼簽署概述 [1]
- 所有韌體更新前都必須先進行合法性驗證。
- 簽署後的二進制檔案格式。

## 2. 簽署流程 [1][2][3]
1. **簽署 (Sign)**
   - 使用 ECDSA nistp256 演算法對韌體二進制檔案進行數位簽章。
   - 簽章資訊會附加在二進制檔案末端。
2. **驗證 (Verify)**
   - 在韌體更新前，先驗證二進制檔案的數位簽章。
   - 若驗證通過，則確認韌體的合法性。

### 2.1 實作細節 [2][3]
- 使用 OpenSSL 函式庫實現簽署與驗證功能。
- 透過 FIPS 140-2 Level 3 認證的 USB eToken 硬體儲存私密金鑰。

### 2.2 金鑰管理 [1]
- 私密金鑰安全地儲存在防竄改的 eToken 硬體中。
- 透過自行開發的金鑰管理系統 (KMS) 管理金鑰的生成、部署和使用。

## 3. 結論
Genesys Logic 針對第三方韌體代碼簽署制定了一套完整的 ECDSA 規範，滿足了 HP Code Signing 的嚴格安全要求。該方案採用 FIPS 140-2 Level 3 認證的硬體儲存私密金鑰，並透過自研的 KMS 系統實現高度客製化的簽署流程與嚴格的稽核管控。這不僅確保了韌體更新的安全性，同時也兼顧了成本效益和可擴展性。

[1] [Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](https://github.com/Genesys-Logic/code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)
[2] [3rd party code signing specification (ECDSA)](https://github.com/Genesys-Logic/code-sign/3rd-party-code-signing-specification-ecdsa.html)
[3] [Code sign - ECC key](https://github.com/Genesys-Logic/code-sign/code-sign-ecc-key.html)