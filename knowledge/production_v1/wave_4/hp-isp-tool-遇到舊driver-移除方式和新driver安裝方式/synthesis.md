
# HP ISP Tool 遇到舊driver 移除方式和新driver安裝方式

## 移除舊版 Genesys Logic Generic USB Class Filter Driver

2. 找到「Genesys Logic Generic USB Class Filter Driver」並解除安裝 `[Command line uninstall driver](driver/command-line-uninstall-driver.html)`

## 安裝新版 Genesys Logic Generic USB Class Filter Driver

1. 開啟 `HP_ISPTool_v1.5.0.6` 資料夾
2. 選擇 `GLHubDriver.exe` 並安裝 Driver Ver 1.4
3. 執行 HP ISP Tool


1. 透過 `wmic product` 命令列移除驅動程式並不適用於所有情況，尤其是透過 InstallShield 安裝的驅動程式 `[Command line uninstall driver](driver/command-line-uninstall-driver.html)`
2. 在某些 AMD 平台或搭載 Cisco Webex 的電腦上，安裝或移除驅動程式可能會遇到問題 `[E27m & E34m Driver install fail](driver/e27m-e34m-driver-install-fail.html)`
3. HP OCI APP 在打包時需要注意簽章驗證的問題 `[HP OCI APP](mac/hp-oci-app.html)`

總之，在處理 HP ISP Tool 的舊驅動程式移除和新驅動程式安裝時，需要注意系統環境的相容性問題，並可能需要採取不同的移除方式。同時也要確保驅動程式安裝包的完整性和安全性。