報告書：3rd 方程式碼簽署規範 (ECDSA)

## 簡介

Genesys Logic 為了滿足韌體安全性的需求，制定了一套 3rd 方程式碼簽署規範。此規範採用 ECDSA (Elliptic Curve Digital Signature Algorithm) 加密演算法，並符合 FIPS 140-2 Level 3 的安全標準。[Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)

## 簽署流程

Genesys Logic 的 3rd 方程式碼簽署流程包含以下步驟:

1. **簽署 (Sign)**: 使用 ECDSA 私鑰對韌體二進位檔案進行數位簽章。[Code sign - ECC key](code-sign/code-sign-ecc-key.html)
2. **驗證 (Verify)**: 使用 ECDSA 公鑰驗證韌體二進位檔案的數位簽章。[3rd party code signing specification (ECDSA)(EN)](code-sign/3rd-party-code-signing-specification-ecdsaen-.html)

## 實作方式

Genesys Logic 提供了兩種實作 3rd 方程式碼簽署的方式:

1. **使用 OpenSSL**: 利用 OpenSSL 工具進行 ECDSA 金鑰生成、簽署和驗證。[Code sign - ECC key](code-sign/code-sign-ecc-key.html)
2. **使用 eToken**: 採用 FIPS 140-2 Level 3 認證的 USB eToken 硬體儲存私鑰，並搭配自行開發的 SDK 應用程式進行簽署和驗證。[Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)

## 結論

Genesys Logic 的 3rd 方程式碼簽署規範採用 ECDSA 加密演算法並符合 FIPS 140-2 Level 3 安全標準。此規範提供了兩種實作方式,分別利用 OpenSSL 工具和 FIPS 認證的 eToken 硬體,以滿足不同的安全和成本需求。