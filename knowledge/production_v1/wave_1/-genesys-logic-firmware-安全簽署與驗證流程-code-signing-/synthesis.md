報告書：Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)

## 💡 簡介 (Introduction)

Genesys Logic 為了滿足 HP Code Signing 的安全要求，設計了一套完整的韌體簽署與驗證架構。此架構的核心目標是確保所有簽署操作都能符合 FIPS 140-2 Level 3 的安全標準，並採用 ECDSA nistp256 加密演算法。在滿足嚴格的安全合規性要求下，Genesys Logic 還需要建立一套兼具成本效益、可擴展性與災難恢復能力的內部簽署系統。

## 🔑 Code Signing 資源與實作方案 (含 FIPS 合規要求)

Genesys Logic 選擇採用「經 FIPS L3 認證的 USB eToken 硬體，並搭配自行開發的 SDK 應用程式」作為最終的簽署方案 [`3rd-party-code-signing-specification-ecdsa`]。此方案將金鑰安全地儲存在防竄改硬體中，同時透過自研的金鑰管理系統（KMS）實現高度客製化的簽署流程與嚴格的稽核管控。

## 🏛️ eToken 簽署系統架構解析

Genesys Logic 的簽署系統架構主要由以下幾個關鍵元件組成：

1. **eToken 硬體裝置**：符合 FIPS 140-2 Level 3 安全標準的 USB 金鑰儲存裝置，用於安全地保存私密金鑰。
2. **Genesys Logic 自研 SDK**：提供簽署、驗證等功能的應用程式介面，與 eToken 硬體進行整合。
3. **金鑰管理系統 (KMS)**：Genesys Logic 自行開發的金鑰管理系統，負責金鑰的生成、部署、輪替等全生命週期管理。
4. **簽署工作流程**：透過上述元件實現了一套完整的簽署工作流程，包括金鑰生成、檔案簽署、簽署驗證等。

## 🔑 Genkey 金鑰生成與佈署流程解析

Genesys Logic 的金鑰生成與部署流程如下 [`code-sign-ecc-key`]：

1. 使用 OpenSSL 生成 ECDSA nistp256 金鑰對。
2. 將公鑰部署至韌體映像檔中，以供後續驗證使用。
3. 將私鑰安全地儲存於 eToken 硬體裝置中。

## 📜 Sign File 簽署檔案工作流程

Genesys Logic 的檔案簽署工作流程如下 [`3rd-party-code-signing-specification-ecdsa`]：

1. 使用 eToken 上的私鑰對韌體映像檔進行數位簽章。
2. 將簽章資訊附加至韌體映像檔中，形成最終的簽署檔案。

## 🔄 端到端的程式碼簽署與驗證完整流程

Genesys Logic 的端到端程式碼簽署與驗證流程如下 [`3rd-party-code-signing-specification-ecdsa`]：

1. 金鑰生成與部署
2. 檔案簽署
3. 簽署檔案驗證

整個流程確保了韌體映像檔的完整性和合法性，滿足 HP Code Signing 的嚴格安全要求。

## 🚀 程式碼簽署與驗證流程 (Boot Code Verify)

在韌體啟動階段，Genesys Logic 的韌體驗證流程如下 [`3rd-party-code-signing-specification-ecdsa`]：

1. 讀取韌體映像檔中的簽章資訊。
2. 使用預先部署的公鑰驗證簽章的合法性。
3. 只有通過驗證的韌體映像檔才能被載入執行。

此流程確保了啟動階段韌體的可信性。

## eToken 集中式管理與安全存取服務平台(未來架構)

為了進一步提升系統的可擴展性和災難恢復能力，Genesys Logic 正在規劃建立一個集中式的 eToken 管理平台。該平台將提供以下功能：

1. 集中管理多個 eToken 裝置，實現金鑰的統一部署和輪替。
2. 透過網路服務的方式，為簽署工具提供安全的金鑰存取。
3. 完善的稽核和監控機制，確保簽署操作的合規性。

通過此平台的建設，Genesys Logic 將進一步優化其韌體簽署與驗證系統，滿足未來更高的安全性和可擴展性需求。