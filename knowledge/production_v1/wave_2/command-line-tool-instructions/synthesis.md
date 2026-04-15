
本文件提供了使用命令列工具 `GLHubUpdateToolCli.exe` 的相關說明。該工具可用於管理 Wi-Fi 資訊並安裝/移除驅動程式。


- `TargetDevice.ini`: 用於鎖定 hub 並防止其他 hub 干擾更新。此檔案應放置在與 `GLHubUpdateToolCli.exe` 可執行檔相同的目錄中。
- `GLHubDriver_XXX.exe` (位於 `HubDriver` 資料夾中): 用於安裝/移除驅動程式。

### 4.1 寫入 Wi-Fi 資訊
GLHubUpdateToolCli.exe --write-wifi-info
此命令將從命令列中讀取 Wi-Fi 資訊並寫入目標裝置。

### 4.2 從文字檔寫入 Wi-Fi 資訊
GLHubUpdateToolCli.exe --write-wifi-info-from-file wifi_info.txt
此命令將從 `wifi_info.txt` 文字檔中讀取 Wi-Fi 資訊並寫入目標裝置。文字檔應包含以換行符分隔的 Wi-Fi 資訊。

### 4.3 讀取 Wi-Fi 資訊
GLHubUpdateToolCli.exe --read-wifi-info
此命令將從目標裝置讀取 Wi-Fi 資訊並輸出到命令列。

- `TargetDevice.ini` 檔案應放置在與 `GLHubUpdateToolCli.exe` 可執行檔相同的目錄中。
- `wifi_info.txt` 檔案應包含以換行符分隔的純文字 Wi-Fi 資訊。

1. [`eToken 安全簽章系統技術說明`](code-sign/etoken-安全簽章系統技術說明.html)
2. [`HP OCI DLL`](mac/hp-oci-dll.html)
3. [`How to bound target device`](general/how-to-bound-target-device.html)