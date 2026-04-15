
# GL3590 Code Sign flow (Hub + HostBridge)

## 1. 合併 Hub 與 HostBridge 韌體
使用 `GLBinTool.exe` 工具將 `GL3590-TZYS3_HP_U27m_Hub_FW3510.bin` 和 `GL3590-30_HostBridge_FW7800.bin` 兩個韌體檔案合併為一個 `GL3590-TZYS3_HP_U27m_Hub_FW3510.sum` 檔案:

GLBinTool.exe -i GL3590-TZYS3_HP_U27m_Hub_FW3510.bin -h GL3590-30_HostBridge_FW7800.bin -o GL3590-TZYS3_HP_U27m_Hub_FW3510.sum

## 2. 使用 eToken 工具進行程式碼簽署
1. 將合併後的 `GL3590-TZYS3_HP_U27m_Hub_FW3510.sum` 檔案輸入到 eToken 工具中。
2. 在 eToken 工具中選擇對應的金鑰對 (key pair)。
3. 按下「Sign」按鈕，eToken 工具會使用選定的金鑰對對 `GL3590-TZYS3_HP_U27m_Hub_FW3510.sum` 檔案進行數位簽章，並產生 `sig bin` 和 `rom bin` 檔案。

> 注意: eToken 工具中必須要有最新版的 `GLBinTool.exe` 程式。

本文件描述了 GL3590 韌體的程式碼簽署流程,是 [Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html) 的一部分實作。

程式碼簽署流程需要符合 FIPS 140-2 Level 3 安全標準,並採用 ECDSA nistp256 加密演算法。為了滿足這些嚴格的安全要求,Genesys Logic 選擇使用 FIPS L3 認證的 USB eToken 硬體,並搭配自行開發的 SDK 應用程式來實現客製化的簽署流程和嚴格的稽核管控。

此外,本文件也參考了 [3rd party code signing specification (ECDSA)](3rd-party-code-signing-specification-ecdsa.html) 和 [3rd party code signing specification (ECDSA)(EN)](3rd-party-code-signing-specification-ecdsaen-.html) 兩篇文件,了解了 Genesys Logic 程式碼簽署的整體架構和實作細節。