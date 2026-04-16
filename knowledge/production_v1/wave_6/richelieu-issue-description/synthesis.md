

客戶目前使用的 Dock 裝置採用兩層 Hub 串接架構，並透過燒錄器進行 Hub 韌體更新。然而，在燒錄過程中未能正確處理每層 Hub 的 Container ID，導致兩層 Hub 擁有相同的 Container ID。這造成 Windows 系統將兩層 Hub 下方連接的 SSD 或 HDD 裝置全部誤判為掛載於上層（L1）Hub 底下，進而導致設備辨識錯誤或操作異常。


1. 燒錄器在更新 Hub 韌體時，未能個別處理每層 Hub 的 Container ID，導致兩層 Hub 擁有相同的 Container ID。
2. 在此情況下，Windows 系統將兩層 Hub 下方連接的 SSD 或 HDD 裝置全部誤判為掛載於上層（L1）Hub 底下，造成設備辨識錯誤或操作異常。
3. 客戶嘗試使用 standard ISP 工具進行更新後，系統即可正確辨識各層 Hub 的 Container ID 並回復正常。


客戶希望我們提供一套包含 command line 工具及 PowerShell 腳本的解決方案，用以協助在更新後自動修正 Container ID，避免此類識別問題再次發生。



1. 在客戶的 CMD 視窗中，路徑中的反斜線 `\` 被顯示為日圓符號 `¥`。
2. 執行時發生錯誤代碼 `-1073741819`。


將執行階段程式庫設定從 `/MD` 改為 `/MT`。

- `/MD`（多執行緒 DLL）: 程式在執行時會依賴外部的 `MSVCP140.dll` / `MSVCP140D.dll` 等 C++ runtime DLL。
- 問題: 若使用 debug DLL (`MSVCP140D.dll`)，部署到沒有安裝 Debug Runtime 的機器上，會導致 crash。

- `/MT`（多執行緒靜態連結）: 將 C++ runtime library 直接編譯進可執行檔中。
- 好處: 避免外部相依性，提升穩定性並簡化部署。

> 本次 crash 問題主要是由 `/MD` 設定導致執行時載入 Debug Runtime（如 `MSVCP140D.dll`），造成 mutex 尚未初始化即被鎖定，進而導致 `0xC0000005` 存取違規錯誤。將 C++ 執行階段程式庫設定調整為 `/MT` 可避免此問題。


1. 客戶目前使用的兩層 Hub 串接架構在燒錄韌體更新時，未能正確處理每層 Hub 的 Container ID，導致設備辨識錯誤。
2. 使用 standard ISP 工具進行更新可解決此問題。
3. 我們將提供包含 command line 工具及 PowerShell 腳本的解決方案，協助客戶自動修正 Container ID。
4. 在部署工具至客戶工廠端時，發現 `/MD` 設定導致 crash 問題，將其改為 `/MT` 可解決。

[eToken System Code View](code-sign/etoken-system-code-view-.html)
[eToken 安全簽章系統技術說明](code-sign/etoken-安全簽章系統技術說明.html)
[HID Code Sign 記錄](code-sign/hid-code-sign-記錄.html)