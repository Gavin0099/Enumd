
# Lenovo command Line tool update flow


1. 以系統管理員權限開啟 PowerShell。[`(1) The tool has to run in the PowerShell, and open it with administrator privileges.To run as Administrator, please right-click "PowerShell" and click "Run as administrator".`]

2. 導航至工具所在的目錄。`[`(2) "Enter cd C:\Users\GavinWu\Desktop\0924\Commandline_TPV9700_0926 to navigate to the directory where the tool will be executed. Please adjust the path according to your own tool's location."`]`

3. 在 PowerShell 中執行 `Set-ExecutionPolicy Unrestricted -Scope Process`，並選擇 'A' (Yes to All) 選項。`[`(3) "Execute the command Set-ExecutionPolicy Unrestricted -Scope Process in PowerShell and automatically select option 'A' (Yes to All)." This version clarifies the action and specifies that option 'A' corresponds to "Yes to All."`]`

4. 執行 `.\FwUpdate1.ps1 -S 20:00`，更新過程將顯示在控制台中。`[`(4) "Execute .\FwUpdate1.ps1 -S 20:00 , and the updating process will be displayed in the console."`]`



1. [HID Code Sign Update Rule](./hid-code-sign-update-rule.html)
   - 驗證方式只存在於 GLbinTool 和 FW 本身，ISP Tool 只負責更新資料
   - 當 Flash 內沒有簽章時，需要在 ISP 時先使用 Vendor Command 傳送
- [未有直接 Source 錨點，待確認] 不能執行的程式碼不能留在 Flash 內

2. [HID Code Sign 記錄](./hid-code-sign-記錄.html)
   - Vendor Command 的第二碼
   - HID 預設只使用 2.0 版本
- [未有直接 Source 錨點，待確認] 已驗證並解決的問題，如 OS 無法識別裝置、資料驗證錯誤等

3. [HP RTK Scaler Code Sign](./hp-rtk-scaler-code-sign.html)
   - RTK Scaler 的燒錄流程大同小異
   - 數位簽章的方式分為 HW 和 SW 兩種

這些相關內容都對 Lenovo command Line tool 的更新流程有一定的影響和關聯性，需要一併理解和參考。