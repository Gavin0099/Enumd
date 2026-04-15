基於提供的內容邊界,以下是對「Command line uninstall driver」核心主題的綜合報告:



1. 使用 `wmic` 命令可以卸載特定驅動程式:
   - `wmic product where "description='Genesys Logic Generic USB Class Filter Driver'" call uninstall`
   - `wmic product where "description='Evernote v. 6.20.2'" call uninstall`
2. 可以使用 `WMIC.EXE` 列出已安裝的產品名稱和版本:
   - `WMIC.EXE /OUTPUT:D:\PRODUCT.XML PRODUCT GET NAME,VERSION`
3. 對於 Class Filter Driver 的卸載方式:
   - 透過 MSI 安裝的驅動程式可以使用 `wmic product where "" call uninstall` 卸載
   - 但如果是透過 InstallShield 打包的驅動程式,則需要直接執行安裝資料夾中的 `setup.exe` 並傳入 `-s -f1C:\uninstall.iss` 參數進行靜默卸載


1. [E27m & E34m Driver install fail](driver/e27m-e34m-driver-install-fail.html)
   - 在 AMD 平台上安裝 Cisco Webex 時,可能會導致某些 Hub 驅動程式無法正常安裝
   - 在使用 HP EndUser Tool 更新 E27m 或 E34m Scaler 時,也可能會遇到類似的問題

2. [HP ISP Tool 遇到舊驅動程式移除方式和新驅動程式安裝方式](driver/hp-isp-tool-遇到舊driver-移除方式和新driver安裝方式.html)
   - 可以透過「應用程式與功能」卸載 "Genesys Logic Generic USB Class Filter Driver"
   - 然後重新安裝 HP_ISPTool 提供的 GLHubDriver.exe 驅動程式

3. [HP OCI APP](mac/hp-oci-app.html)
   - 介紹了 HP OCI APP 的一些功能和使用注意事項,但與本主題關係不太密切

## 核心主題與相關上下文的關係

1. 使用 `wmic` 命令直接卸載特定驅動程式
2. 對於透過 InstallShield 打包的驅動程式,需要手動執行安裝資料夾中的 `setup.exe` 並傳入靜默卸載參數

這些方法在解決 [E27m & E34m Driver install fail](driver/e27m-e34m-driver-install-fail.html) 和 [HP ISP Tool 遇到舊驅動程式移除方式和新驅動程式安裝方式](driver/hp-isp-tool-遇到舊driver-移除方式和新driver安裝方式.html) 中提到的問題時可能會有所幫助。

但是,提供的上下文並未涉及 HP OCI APP 的相關內容,因此無法確定它與本主題的關係。
