
# HP ISP Tool Rollback hub firmware flow(U32)

1. 開啟 `HP_ISPTool.exe`
2. 確認 hub Index 為 0，按下 Erase Flash
3. 確認 Erase Success 訊息後，勾選 USB Hub -> Open Hub bin file -> Start ISP
4. 確認 update completed 後，斷電一段時間以確保斷電時間足夠

1. **開啟 HP_ISPTool.exe**
   - 啟動 HP ISP Tool 軟體

2. **確認 hub Index 為 0，按下 Erase Flash**
   - 確認 hub 的 Index 編號為 0
   - 按下 Erase Flash 按鈕，以清除 hub 韌體

3. **確認 Erase Success 訊息後，勾選 USB Hub -> Open Hub bin file -> Start ISP**
   - 確認 Erase 動作成功後
   - 選擇要燒錄的 hub 韌體檔案 (`.bin` 檔)
   - 按下 Start ISP 開始燒錄韌體

4. **確認 update completed 後，斷電一段時間以確保斷電時間足夠**

1. [Camera 透過我們驗證 code sign](code-sign/camera-透過我們驗證-code-sign.html)
   - 介紹 Camera 韌體的 code sign 驗證流程

2. [Code sign Flow](code-sign/code-sign-flow.html)
   - 概述 Genesys Logic 的 code sign 流程

3. [GL Hub Code Sign Recovery Flow](hub/gl-hub-code-sign-recovery-flow.html)
   - 介紹不同型號 GL Hub 的韌體回復流程

以上就是 HP ISP Tool Rollback hub firmware flow(U32) 的完整文件。如果您有任何其他問題，歡迎隨時詢問。