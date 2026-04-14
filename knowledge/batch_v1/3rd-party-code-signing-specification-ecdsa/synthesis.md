報告書：3rd party code signing specification (ECDSA)

## 摘要
本報告書旨在概述 Genesys Logic 公司針對第三方韌體程式碼簽署所制定的 ECDSA 規範。為滿足安全性與合規性要求，Genesys Logic 採用了基於 FIPS 140-2 Level 3 標準的 ECDSA 加密演算法，並搭配 USB eToken 硬體安全模組來管理金鑰。本文將深入探討 Genesys Logic 的程式碼簽署與驗證流程，包括金鑰生成、檔案簽署、以及端到端的完整驗證流程。

## 1. 程式碼簽署概述 [Genesys Logic code sign overview](https://github.com/GenesysLogic/code-sign/blob/main/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)
- 為確保韌體的合法性，Genesys Logic 要求所有韌體程式碼在更新至裝置之前都必須經過簽署驗證。
- 簽署後的二進位檔案採用特定的檔案格式。

## 2. 程式碼簽署流程 [Flow](https://github.com/GenesysLogic/code-sign/blob/main/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)
程式碼簽署流程包括以下兩個主要步驟：
1. **簽署 (Sign)**：使用私密金鑰對程式碼進行數位簽章。
2. **驗證 (Verify)**：使用公開金鑰驗證程式碼的合法性。

## 3. 實作方式 [Implement](https://github.com/GenesysLogic/code-sign/blob/main/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)
Genesys Logic 採用以下兩種方式實作程式碼簽署：
1. **使用 OpenSSL**：利用 OpenSSL 工具套件提供的 ECDSA 函式庫進行金鑰生成、檔案簽署與驗證。
2. **使用 eToken**：搭配 FIPS 140-2 Level 3 認證的 USB eToken 硬體安全模組，以確保金鑰的安全性。

## 4. 金鑰管理 [Store the Private key](https://github.com/GenesysLogic/code-sign/blob/main/3rd-party-code-signing-specification-ecdsaen-.html)
Genesys Logic 將私密金鑰安全地儲存在 eToken 硬體模組中，以防止金鑰外洩。

## 5. 完整驗證流程 [Boot Code Verify](https://github.com/GenesysLogic/code-sign/blob/main/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)
Genesys Logic 建立了端到端的程式碼簽署與驗證流程，確保韌體在啟動時能夠完整驗證其合法性。

## 結論
Genesys Logic 採用 ECDSA 加密演算法並搭配 eToken 硬體安全模組，建立了一套符合 FIPS 140-2 Level 3 標準的程式碼簽署與驗證系統。此系統不僅滿足了安全性與合規性要求，同時也具備成本效益、可擴展性與災難恢復能力等特點。