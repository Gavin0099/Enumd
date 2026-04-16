基於提供的內容邊界，以下是「Mac Hub Update Tool User Guide」的文件合成報告:

# Mac Hub Update Tool User Guide

1. 開啟 `usb30_hub_fw_updater.app`。
2. 螢幕上會顯示目前的 PID (Product ID) 和 VID (Vendor ID)。
3. 修改 PID 和 VID。
[未有直接 Source 錨點，待確認] 4. 選擇特定的 hub 二進位檔案。
6. 重新插拔裝置後，修改後的 PID 和 VID 會顯示在螢幕上。


1. HID Code Sign 更新規則 `[HID Code Sign Update Rule](code-sign/hid-code-sign-update-rule.html)`
   - 驗證方式只存在於 GLbinTool 和韌體本身，ISP Tool 只負責更新資料
   - 當 Flash 內沒有簽章時，在 ISP 時需先使用 Vendor Command 傳送
   - Vendor Command

2. HID Code Sign 記錄 `[HID Code Sign 記錄](code-sign/hid-code-sign-記錄.html)`
   - Vendor Command 第二碼

3. HP Hemi(Z34c) CPU3 Code Sign 驗證問題 `[HP Hemi(Z34c) CPU3 Code Sign 驗證問題](code-sign/hp-hemiz34c-cpu3-code-sign-驗證問題.html)`
   - 除了 GL3590 有硬體安全模組外，其他 hub chip 都沒有
   - SHA-256 和 RSA-2048 驗證的優化
