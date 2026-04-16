
# TVSU(ThinkVantage System Update) FWUpdate需求


- TVSU 的安裝檔是透過 [InnoSetup](https://jrsoftware.org/isinfo.php) 封裝成安裝檔。


- TVSU 需要檢查筆記本電腦的電源電量，如果電量低於 25% 則需要顯示錯誤訊息。


- TVSU 是透過 XML 設定檔來決定要更新哪個版本的固件。
- 它會使用硬體 ID (hw_id) 來決定要更新的裝置。


- TVSU 是提供命令列工具，基本上不會顯示圖形使用者介面 (GUI)。
- 取消、退出或 Esc 按鍵的處理是透過 TVSU 自行實作。


1. 透過 InnoSetup 封裝成安裝檔
[未有直接 Source 錨點，待確認] 2. 檢查電源電量是否低於 25%
3. 透過 XML 設定檔和硬體 ID 決定要更新的固件版本
[未有直接 Source 錨點，待確認] 4. 提供命令列工具，無 GUI 介面，自行處理取消、退出等按鍵

這些需求都是基於 [HP Hemi(Z34c) CPU3 Code Sign 驗證問題](./hp-hemiz34c-cpu3-code-sign-驗證問題.html) 和 [HP DISPLAY FIRMWARE SPECIFICATION V1.1](./hp-display-firmware-specification-v11.html) 的相關上下文資訊。