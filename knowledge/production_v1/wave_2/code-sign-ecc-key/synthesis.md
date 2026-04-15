報告書：Code sign - ECC key

根據提供的內容，Genesys Logic 公司為了滿足韌體安全驗證的需求，建立了一套基於 ECDSA 加密演算法的程式碼簽署與驗證流程。此流程採用 FIPS 140-2 Level 3 認證的 USB eToken 硬體作為金鑰儲存裝置，並搭配自行開發的 SDK 應用程式實現高度客製化的簽署工作流程。

1. 所有簽署操作必須符合 FIPS 140-2 Level 3 安全標準。[`Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)`](/code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)
2. 採用 ECDSA nistp256 加密演算法。[`Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)`](/code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)

1. **金鑰生成與佈署**：使用 FIPS L3 認證的 USB eToken 硬體生成 ECDSA 金鑰對，並透過自行開發的金鑰管理系統（KMS）進行安全的金鑰佈署。[`Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)`](/code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html#-genkey-金鑰生成與佈署流程解析)
2. **檔案簽署**：將韌體映像檔透過 ECDSA 私鑰進行數位簽章，生成帶有簽章資訊的 signed bin 檔案。[`Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)`](/code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html#-sign-file-簽署檔案工作流程)
3. **簽章驗證**：在韌體更新時，透過 ECDSA 公鑰驗證 signed bin 檔案的合法性。[`Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)`](/code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html#-端到端的程式碼簽署與驗證完整流程)

Genesys Logic 提供了兩種程式碼簽署的實作方式：

1. **使用 OpenSSL**：透過 OpenSSL 命令列工具生成金鑰對、簽署檔案並合併 signed bin 檔案。[`Genesys Logic code sign overview`](/code-sign/code-sign-ecc-key.html#implement--using-openssl-)
2. **使用 eToken**：利用 FIPS L3 認證的 USB eToken 硬體儲存私鑰，並搭配自行開發的 SDK 應用程式實現簽署流程。[`3rd party code signing specification (ECDSA)`](/code-sign/3rd-party-code-signing-specification-ecdsa.html#using-etoken)

Genesys Logic 公司建立了一套符合 FIPS 140-2 Level 3 安全標準的程式碼簽署與驗證流程，採用 ECDSA 加密演算法並利用 FIPS L3 認證的 USB eToken 硬體儲存私鑰。此方案不僅滿足了嚴格的安全合規性要求，同時也具備成本效益、可擴展性與災難恢復能力。