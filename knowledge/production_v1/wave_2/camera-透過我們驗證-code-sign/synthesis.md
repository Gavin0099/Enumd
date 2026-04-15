# Camera 透過我們驗證 code sign

根據提供的內容，Camera 的 code sign 驗證流程主要包含以下幾個步驟:

1. 產生 ECDSA 金鑰並對其進行簽名 `[Code sign Flow](code-sign/code-sign-flow.html)`
2. 告知如何清除 Camera 以防止驗證失敗 `[Code sign Flow](code-sign/code-sign-flow.html)`
3. 告知如何讀取 Camera 資料以計算 hash 值 `[Code sign Flow](code-sign/code-sign-flow.html)`
4. 提供完整的 firmware update 流程及相關文件，以便我們控制整個更新過程 `[Code sign Flow](code-sign/code-sign-flow.html)`
5. 驗證 code sign 的部分應該由工具控制，firmware 不需要做太多修改，但仍需要俊太確認 `[Code sign Flow](code-sign/code-sign-flow.html)`

Genesys Logic 目前使用 ECDSA nistP256 演算法進行 code sign。整個流程如下:

1. 產生金鑰對 `[Code sign Flow](code-sign/code-sign-flow.html)`
2. 對 firmware bin 資料進行簽名 `[Code sign Flow](code-sign/code-sign-flow.html)`
3. 將簽名後的 firmware、簽名資料和公鑰一起傳送給 security module `[Code sign Flow](code-sign/code-sign-flow.html)`
4. Security module 使用公鑰對簽名資料進行解密，並與 firmware bin 資料計算的 hash 值進行比對，確認 firmware 的合法性 `[Code sign Flow](code-sign/code-sign-flow.html)`

根據 [HID Code Sign Update Rule](code-sign/hid-code-sign-update-rule.html) 的說明:

- 驗證方式只存在於 GLbinTool 和 firmware 本身，ISP Tool 只負責更新資料
- [未有直接 Source 錨點，待確認] 不同型號的 Camera 不能互相燒錄
- 如果 flash 內沒有簽名資料，需要在 ISP 時先透過 Vendor Command 傳送
- [未有直接 Source 錨點，待確認] 不能執行的程式碼不能留在 firmware 中

1. 請確認不同作業系統 (macOS、Linux、ChromeBook) 上是否有自動喚醒 device 的問題 `[HID Code Sign 記錄](code-sign/hid-code-sign-記錄.html)`
2. 需要檢查 HID 驗證 USB LOGO 的問題 `[HID Code Sign 記錄](code-sign/hid-code-sign-記錄.html)`
3. 整理各 chip 的功能差異，用表格列出 `[HID Code Sign 記錄](code-sign/hid-code-sign-記錄.html)`
4. 解決 HID 更新速度問題 `[HID Code Sign 記錄](code-sign/hid-code-sign-記錄.html)`
5. 確認 FW UPD 的 open source 專案是否可以正常編譯和測試 `[HID Code Sign 記錄](code-sign/hid-code-sign-記錄.html)`
6. 討論 ISP Tool 在燒錄時是否需要明確提示使用 filter driver 或 HID `[HID Code Sign 記錄](code-sign/hid-code-sign-記錄.html)`

根據提供的內容,Camera 的 code sign 驗證流程主要包括金鑰生成、簽名、清除 Camera、讀取 Camera 資料等步驟。Genesys Logic 目前使用 ECDSA nistP256 演算法進行 code sign。在驗證方面,需要注意不同型號 Camera 不能互燒、簽名資料的傳送、不可執行程式碼的問題等。此外,還需要解決一些 HID 相關的問題,如自動喚醒、USB LOGO 驗證、更新速度等。