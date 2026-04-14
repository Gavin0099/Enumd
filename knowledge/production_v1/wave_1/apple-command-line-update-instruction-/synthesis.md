
# Apple Command line update Instruction

Apple 提供了一個命令列工具,用於更新 hub 韌體和相關資料。這個工具具有以下功能:


根據提供的截圖,hub 相關資料包括以下內容:

  - Start Address: 0x8000
  - Start Address: 0x8000
  - Start Address: 0xA000


### SW Update Firmware Flow

1. Apple Header String
2. Checksum - Apple Header String + 後續資料的累加值
3. Serial Number data
4. Container ID data

- [GL3523 FW Update Note](https://gli-cse.genesyslogic.com.tw/svn/storage/Hub/Mac%20AP/Engineer/GLHubFWUpdateTool)
- [GL3590 FW update Note](https://gli-cse.genesyslogic.com.tw/svn/storage/Hub/Mac%20AP/Engineer/GLHubFWUpdateTool)
- [Mac Command Line Tool Update Note](https://gli-cse.genesyslogic.com.tw/svn/storage/Hub/Mac%20AP/Engineer/GLHubFWUpdateTool)

https://gli-cse.genesyslogic.com.tw/svn/storage/Hub/Mac%20AP/Engineer/GLHubFWUpdateTool


1. [Code Sign Flow](code-sign/code-sign-flow.html)
   - 韌體更新需要進行合法性驗證,通常使用 OpenSSL、Token 或 HSM 等方式進行程式碼簽章。Genesys Logic 目前使用 ECDSA nistp256 演算法進行簽章。
2. [HID Code Sign 記錄](code-sign/hid-code-sign-記錄.html)
   - 記錄了 HID 韌體更新的相關流程、工具和測試情況。
3. [HP Monitor Code Sign Update Flow](code-sign/hp-monitor-code-sign-update-flow.html)
   - 記錄了 HP 顯示器韌體更新的相關流程,包括 HP HW Check Code Signed、HP SW Check Code Signed、HP Code Signed Slave 和 HP Hub Check Code Signed 等不同驗證模式。

綜上所述,Apple 提供的命令列工具用於更新 hub 韌體和相關資料,需要結合程式碼簽章和 HID/HP 顯示器的相關流程和驗證機制才能完成整個更新過程。