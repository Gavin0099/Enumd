以下是根據提供的內容所撰寫的 'usbview Grab the log' 文件:

# usbview Grab the log

## 如何擷取 usbview 記錄檔

1. 在 usbview 工具中，選擇 `File` > `Save As (txt)` 即可將 USB 裝置資訊儲存為文字檔案。[usbview Grab the log](./general/usbview-grab-the-log.html)

## 其他相關工具與記錄檔擷取方式

[未有直接 Source 錨點，待確認] 除了 usbview 工具外，還有其他方式可以擷取系統記錄檔:

   - 在命令列工具中以系統管理員身分執行 `getLog.bat` 指令。執行後會在 `DebugFolder` 資料夾中產生兩個文字檔案，請將這兩個檔案提供給我們進行分析。[How to grab log](./general/how-to-grab-log.html)

[未有直接 Source 錨點，待確認] 2. **如何擷取 DebugView 記錄檔**
- [未有直接 Source 錨點，待確認] 以系統管理員身分執行 DebugView 工具。
   - 在 DebugView 中，選擇 `File` > `Save as` 即可將記錄檔儲存為文字檔案。[How To Grab DebugView Log](./general/how-to-grab-debugview-log.html)



- 我們採用 FIPS 140-2 Level 3 安全標準,並使用 ECDSA nistp256 加密演算法進行韌體簽署。
- 我們開發了自有的金鑰管理系統(KMS),將金鑰安全地儲存在 FIPS L3 認證的 USB eToken 硬體中,並透過嚴格的稽核管控機制確保簽署流程的安全性。
- 整個簽署與驗證流程涵蓋從金鑰生成、檔案簽署到最終的開機驗證,確保韌體的完整性。[Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](./code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)