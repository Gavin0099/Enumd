報告書：3rd party code signing specification (ECDSA)(EN)

## 概述
本報告旨在概述 Genesys Logic 公司針對第三方程式碼簽署所制定的 ECDSA 規範。Genesys Logic 公司要求所有韌體在更新至裝置之前必須先經過驗證，以確保其合法性和安全性。為此，Genesys Logic 採用了基於 ECDSA 加密演算法的程式碼簽署機制。

## 簽署流程
Genesys Logic 的程式碼簽署流程包括以下步驟：

1. **簽署 (Sign)**：使用 ECDSA 私鑰對二進位韌體檔案進行數位簽章。
2. **驗證 (Verification)**：在裝置端使用 ECDSA 公鑰對收到的韌體檔案進行數位簽章驗證。

### 實作方式
Genesys Logic 提供了以下幾種程式碼簽署的實作方式：

1. **使用 OpenSSL**：利用 OpenSSL 工具套件實現 ECDSA 密鑰生成、簽署和驗證。[code-sign-ecc-key](./code-sign-ecc-key.html)
2. **使用 eToken**：採用 FIPS 140-2 Level 3 認證的 USB eToken 硬體設備來安全地儲存私鑰，並搭配自行開發的 SDK 應用程式實現簽署流程。[3rd-party-code-signing-specification-ecdsa](./3rd-party-code-signing-specification-ecdsa.html)

### 私鑰管理
Genesys Logic 要求私鑰必須安全地儲存在經 FIPS 140-2 Level 3 認證的硬體設備中，如 USB eToken。這樣可以確保私鑰不會外洩，提高整個簽署系統的安全性。[eToken 簽署系統架構解析](/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html#eToken-簽署系統架構解析)

## 總結
Genesys Logic 採用 ECDSA 加密演算法實現了一套完整的第三方程式碼簽署機制，以確保韌體的合法性和安全性。該機制涵蓋了簽署、驗證和私鑰管理等關鍵環節，並提供了多種實作方案供開發者選擇。整個系統設計符合 FIPS 140-2 Level 3 的安全標準，兼具成本效益、可擴展性和災難恢復能力。