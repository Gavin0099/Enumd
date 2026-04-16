
# HP ISP Tool Rollback hub firmware flow

本文件描述了使用 HP ISP Tool 回復 hub 韌體的流程。主要步驟如下:

1. 開啟 `HP_ISPTool.exe`
1. 確認 hub Index 為 0，按下 Erase Flash
1. 確認 Erase Success 訊息後，勾選 USB Hub -> Open(`GL3523_ONY1_Wistron_HP_Z43s_L1Hub_FW5407.bin`) -> Start ISP
1. 確認 update completed 後，斷電一段時間
1. 重複上述步驟，將 hub Index 設為 1，並使用 `GL3523_OV5S1_Wistron_HP_Z43s_L2Hub_FW5415.bin` 進行韌體更新
1. 透過 Device Manager 或 UsbView 確認韌體是否已回復至先前版本


1. **Code Sign 驗證流程** `[Code sign Flow](code-sign/code-sign-flow.html)`
   - 可使用 OpenSSL、Token 或 HSM 等方式進行 Code Sign

2. **GL Hub Code Sign Recovery Flow** `[GL Hub Code Sign Recovery Flow](hub/gl-hub-code-sign-recovery-flow.html)`
   - 描述了不同 GL Hub 晶片在韌體回復時的優先順序和處理流程
   - 包括 GL3523、GL3525 和 GL3590 等晶片的回復案例

3. **Camera 透過我們驗證 Code Sign** `[Camera 透過我們驗證 code sign](code-sign/camera-透過我們驗證-code-sign.html)`
   - 提供了 Camera 韌體更新時的 Code Sign 驗證流程
   - 可參考 Hub 的 Code Sign 驗證流程進行整合

1. **開啟 HP_ISPTool.exe**
   - 啟動 HP ISP Tool 軟體，用於執行 hub 韌體回復操作

2. **確認 hub Index 為 0，按下 Erase Flash**
   - 確認 hub 索引為 0，並執行 Erase Flash 操作以清除現有韌體

3. **確認 Erase Success 訊息後，勾選 USB Hub -> Open -> Start ISP**
   - 確認 Erase 操作成功後，選擇 USB Hub 選項
   - 開啟 `GL3523_ONY1_Wistron_HP_Z43s_L1Hub_FW5407.bin` 韌體檔案
   - 執行 Start ISP 操作以更新 hub 韌體

4. **確認 update completed 後，斷電一段時間**

5. **重複上述步驟，將 hub Index 設為 1，並使用 `GL3523_OV5S1_Wistron_HP_Z43s_L2Hub_FW5415.bin` 進行韌體更新**
   - 重複步驟 2-4，將 hub Index 設為 1，並使用不同的韌體檔案進行更新

6. **透過 Device Manager 或 UsbView 確認韌體是否已回復至先前版本**
   - 使用 Device Manager 或 UsbView 等工具檢查 hub 韌體版本是否已回復至預期版本
