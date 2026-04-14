報告書：Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)

## 💡 簡介 (Introduction)

Genesys Logic 為了滿足 HP Code Signing 的安全要求，設計了一套完整的韌體簽署與驗證架構。此架構的核心目標是確保所有簽署操作都符合 FIPS 140-2 Level 3 的安全標準，並採用 ECDSA nistp256 加密演算法。在滿足嚴格安全合規性的前提下，Genesys Logic 還需要建立一套兼具成本效益、可擴展性與災難恢復能力的內部簽署系統。

## 🔑 Code Signing 資源與實作方案 (含 FIPS 合規要求)

Genesys Logic 選擇採用「經 FIPS L3 認證的 USB eToken 硬體，並搭配自行開發的 SDK 應用程式」作為最終方案。此方案將金鑰安全地儲存在防竄改硬體中，同時透過自研的金鑰管理系統（KMS）實現高度客製化的簽署流程與嚴格的稽核管控。

## 🏛️ eToken 簽署系統架構解析


1. FIPS L3 認證的 USB eToken 硬體，用於安全儲存金鑰。
2. 自行開發的 SDK 應用程式，提供簽署、驗證等功能。


## 🔑 Genkey 金鑰生成與佈署流程解析


1. 在 KMS 系統中生成 ECDSA nistp256 金鑰對。 `[Code sign - ECC key](code-sign-ecc-key.html)`


## 📜 Sign File 簽署檔案工作流程

Sign File 簽署檔案的工作流程如下：

1. 使用 SDK 應用程式從 eToken 中讀取私鑰。 `[3rd party code signing specification (ECDSA)](3rd-party-code-signing-specification-ecdsa.html)`


## 🔄 端到端的程式碼簽署與驗證完整流程


2. Sign File 簽署檔案工作流程。
4. 在裝置啟動時，驗證韌體映像檔的合法性。 `[3rd party code signing specification (ECDSA)](3rd-party-code-signing-specification-ecdsa.html)`


## 🚀 程式碼簽署與驗證流程 (Boot Code Verify)




## eToken 集中式管理與安全存取服務平台(未來架構)



此未來架構將進一步增強 Genesys Logic 的韌體簽署與驗證系統。