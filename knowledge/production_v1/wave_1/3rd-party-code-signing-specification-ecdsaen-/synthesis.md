報告書：3rd party code signing specification (ECDSA)(EN)

## 摘要
本報告書旨在概述 Genesys Logic 針對第三方韌體代碼簽署所制定的 ECDSA 規範。Genesys Logic 為滿足 HP Code Signing 安全要求，設計了一套完整的韌體簽署與驗證架構。該架構採用 ECDSA nistp256 加密演算法，並符合 FIPS 140-2 Level 3 安全標準。本報告將深入探討該簽署流程的實作細節，包括使用 OpenSSL 和 eToken 硬體的具體實現方式。

## 1. Genesys Logic 代碼簽署概述
- 所有韌體在更新至 flash 之前，都必須經過合法性驗證。
- 簽署後的二進制檔案格式如下：

## 2. 簽署流程
1. **簽署 (Sign)**
2. **驗證 (Verification)**

### 2.1 實作方式
Genesys Logic 提供了兩種代碼簽署的實作方式：

#### 2.1.1 使用 OpenSSL
1. 生成 ECDSA 金鑰對 `[Code sign - ECC key](code-sign/code-sign-ecc-key.html)`
2. 使用私鑰對二進制檔案進行數位簽章 `[Code sign - ECC key](code-sign/code-sign-ecc-key.html)`
3. 將簽章資訊附加至原始二進制檔案

#### 2.1.2 使用 eToken
Genesys Logic 選擇採用「經 FIPS L3 認證的 USB eToken 硬體，並搭配自行開發的 SDK 應用程式」方案 `[Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)`。此方案將金鑰安全地儲存在防竄改硬體中，同時透過自研的金鑰管理系統（KMS）實現高度客製化的簽署流程與嚴格的稽核管控。

### 2.2 私鑰儲存
Genesys Logic 採用 FIPS 140-2 Level 3 認證的 USB eToken 硬體來安全地儲存私鑰 `[Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)`。

## 3. 結論
Genesys Logic 針對第三方韌體代碼簽署設計了一套完整的 ECDSA 規範，滿足了 HP Code Signing 的嚴格安全要求。該方案採用 ECDSA nistp256 加密演算法，並符合 FIPS 140-2 Level 3 安全標準。Genesys Logic 提供了使用 OpenSSL 和 eToken 硬體的具體實現方式，確保私鑰的安全性和簽署流程的可控性。