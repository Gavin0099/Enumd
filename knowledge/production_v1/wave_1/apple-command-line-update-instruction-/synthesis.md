以下為基於提供的內容所合成的 Apple Command line update Instruction 的詳細文件:

# Apple Command line update Instruction

## 概述
Apple 需要一個命令列工具來執行以下功能:
- 更新 hub 韌體
- 更新 hub 相關資料

hub 相關資料包括以下內容:
- GL3523(5C) 起始位址: 0x8000
- GL3523(2A) 起始位址: 0x8000
- GL3590 起始位址: 0xA000

## 命令列參數
### 韌體更新流程
### Hub 相關資料描述
- Apple Header String
- Checksum: Apple Header String + 後續資料累加值
- 序號資料
- Container ID 資料

## 相關文件
- [GL3523 FW Update Note](https://gli-cse.genesyslogic.com.tw/svn/storage/Hub/Mac%20AP/Engineer/GLHubFWUpdateTool)
- [GL3590 FW Update Note](https://gli-cse.genesyslogic.com.tw/svn/storage/Hub/Mac%20AP/Engineer/GLHubFWUpdateTool)
- [Mac Command Line Tool Update Note](https://gli-cse.genesyslogic.com.tw/svn/storage/Hub/Mac%20AP/Engineer/GLHubFWUpdateTool)

## SVN 路徑
https://gli-cse.genesyslogic.com.tw/svn/storage/Hub/Mac%20AP/Engineer/GLHubFWUpdateTool

## 相關上下文
### Code Sign 流程 `[Code sign Flow](code-sign/code-sign-flow.html)`
Genesys Logic 目前使用 ECDSA nistp256 演算法進行韌體的數位簽章。數位簽章的流程如下:
1. 生成金鑰對
1. 使用私鑰對韌體資料進行簽章
1. 將簽章資料與韌體資料一併傳送給安全模組進行驗證

### HID Code Sign 記錄 `[HID Code Sign 記錄](code-sign/hid-code-sign-記錄.html)`
HID 韌體更新流程、工具測試、已解決問題等相關記錄。

### HP Monitor Code Sign Update Flow `[HP Monitor Code Sign Update Flow](code-sign/hp-monitor-code-sign-update-flow.html)`
描述 HP 顯示器韌體更新時的數位簽章驗證流程,包括 HP HW Check Code Signed、HP SW Check Code Signed、HP Code Signed Slave 和 HP Hub Check Code Signed 等四種模式。