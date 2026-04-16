

根據提供的內容,Lenovo spec 工具必須兼容以下作業系統:

Lenovo spec 工具涉及到韌體的安全簽署與驗證流程,主要包括以下幾個步驟:

1. **簽署 (Sign)**: 使用經 FIPS 140-2 Level 3 認證的 USB eToken 硬體,搭配自行開發的 SDK 應用程式,透過 ECDSA nistp256 加密演算法對韌體進行數位簽署。[Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)

2. **驗證 (Verify)**: 在韌體更新至裝置之前,需要先驗證其合法性。驗證流程會檢查韌體是否經過合法簽署,確保其來源可信。[3rd party code signing specification (ECDSA)](code-sign/3rd-party-code-signing-specification-ecdsa.html)

3. **金鑰管理**: 簽署金鑰會安全地儲存在 FIPS L3 認證的 eToken 硬體中,並透過自行開發的金鑰管理系統 (KMS) 實現高度客製化的簽署流程與嚴格的稽核管控。[Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)

4. **端到端流程**: 整個程式碼簽署與驗證的完整流程涵蓋了金鑰生成、檔案簽署、以及最終的啟動碼驗證等步驟。[Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)

由於提供的內容有限,無法進一步了解 Lenovo spec 的其他詳細規格。如果需要更多資訊,請提供更豐富的上下文資料。