
## 問題1: Cisco Webex + AMD 平台 Install or Uninstall driver fail
在 AMD 平台上(包括 Lenovo 平台),如果有安裝 Cisco Webex,在安裝驅動程式時會有機率發生驅動程式安裝失敗的情況。失敗的現象包括:
1. 某些 Hub 驅動程式無法正常啟動,導致工具詢問 Hub 資訊時出錯。

## 問題2: AMD 平台透過 HP EndUser Tool update scaler 會 fail
在 TPV 美國 FAE 發現,使用 HP EndUser Tool 更新 E27m 或 E34m Scaler 時會失敗。主要問題為:
1. Scaler 更新完成後重置 MCU,會導致驅動程式抓取到的 Hub 設備出錯。
[未有直接 Source 錨點，待確認] 2. 每次重新插拔設備,就會多出一組 Hub。
3. 這個問題似乎是由 Cisco Webex 造成的。

1. 針對 Cisco Webex 造成的驅動程式安裝失敗問題,可以嘗試以下步驟:
   - 透過命令列方式卸載 Genesys Logic Generic USB Class Filter Driver 和 Evernote 等相關驅動程式。[Command line uninstall driver](driver/command-line-uninstall-driver.html)

2. 針對 HP EndUser Tool 更新 Scaler 失敗的問題,可以嘗試以下步驟:
   - 先卸載 Genesys Logic Generic USB Class Filter Driver 等相關驅動程式。[HP ISP Tool 遇到舊driver 移除方式和新driver安裝方式](driver/hp-isp-tool-遇到舊driver-移除方式和新driver安裝方式.html)
   - 重新啟動系統後,再次嘗試使用 HP ISP Tool 安裝最新的驅動程式。

1. Cisco Webex 安裝可能會導致 AMD 平台上的驅動程式安裝失敗。
2. HP EndUser Tool 更新 Scaler 時,如果系統中存在舊版驅動程式,也會導致更新失敗。
