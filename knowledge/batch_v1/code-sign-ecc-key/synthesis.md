報告書：Code sign - ECC key

## 摘要
Genesys Logic 為了滿足韌體安全驗證的需求，建立了一套基於 ECDSA 加密演算法的程式碼簽署與驗證系統。此系統採用 FIPS 140-2 Level 3 認證的 USB eToken 硬體儲存金鑰，並搭配自行開發的金鑰管理系統（KMS）實現高度客製化的簽署流程與嚴格的稽核管控。本報告將詳細介紹這套程式碼簽署解決方案的整體架構與實作細節。

## 核心主題：程式碼簽署 - ECC 金鑰
[Genesys Logic code sign overview](code-sign/code-sign-ecc-key.html)
- 因應需求，firmware 都必須要驗證合法性。
- 簽署後的 bin 檔案格式

### 簽署流程
1. 金鑰生成 (Genkey)
2. 簽署 (Sign)
3. 合併簽署後的 bin 檔案

此流程使用 OpenSSL 工具實現。

## 相關內容
[Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)
- 核心要求：所有簽署操作必須符合 FIPS 140-2 Level 3 安全標準，並採用 ECDSA nistp256 加密演算法。
- 最終方案：採用「經 FIPS L3 認證的 USB eToken 硬體，並搭配自行開發的 SDK 應用程式」方案。

[3rd party code signing specification (ECDSA)](code-sign/3rd-party-code-signing-specification-ecdsa.html)
- 簽署流程概述：Sign、Verify
- 實作方式：使用 OpenSSL、使用 eToken

[3rd party code signing specification (ECDSA)(EN)](code-sign/3rd-party-code-signing-specification-ecdsaen-.html)
- 簽署流程概述：Sign、Verification
- 實作方式：使用 OpenSSL、私鑰儲存

## 關聯性
核心主題「程式碼簽署 - ECC 金鑰」與相關內容之間的關聯如下：

1. **Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)**：
   - 提供了 Genesys Logic 程式碼簽署系統的整體架構與設計目標，包括採用 ECDSA 加密演算法並符合 FIPS 140-2 Level 3 安全標準的要求。
   - 介紹了最終採用的「USB eToken 硬體 + 自研 SDK」方案，為核心主題的實作提供了參考。

2. **3rd party code signing specification (ECDSA)** 和 **3rd party code signing specification (ECDSA)(EN)**：
   - 概述了程式碼簽署的整體流程，包括簽署 (Sign) 和驗證 (Verify/Verification)。
   - 提供了使用 OpenSSL 和 eToken 進行實作的相關資訊，與核心主題的實作步驟相呼應。

總的來說，這些相關內容為核心主題「程式碼簽署 - ECC 金鑰」提供了完整的背景資訊和實作細節，有助於更深入理解 Genesys Logic 在程式碼簽署方面的設計與實踐。