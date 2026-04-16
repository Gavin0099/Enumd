
# Mac packages installation file process(CN)

Packages 是一個適用於 Mac OS X 10.5 或更高版本的安裝包制作和分發工具，適用於軟體開發人員和管理員使用。它提供了強大而靈活的功能，可以方便地打包和部署應用程式或插件。[Packages](http://s.sudre.free.fr/Software/documentation/Packages/en_2017/index.html)

## Packages app 下載 URL
[http://s.sudre.free.fr/Software/files/Packages.dmg](http://s.sudre.free.fr/Software/files/Packages.dmg)

1. 開啟 Packages app 或是直接執行附件中的 HP OCI Tool.pkgproj。如果直接開啟 HP OCI Tool.pkgproj 請直接跳到第四步驟。
2. 選擇 Distribution 然後下一步。
3. 寫入 Project Name，目前預設為 HP OCI Tool，Project Directory 為 build 出來 pkg 的位置。
[未有直接 Source 錨點，待確認] 4. 在 Settings 裡面只要設定版本即可。
5. 在 Payload 已經設定好安裝的路徑 (Application→HP_OCI_Tool)。
6. 如果要修改檔案，在 HP_OCI_Tool folder 上面按右鍵選擇 Add Files。
[未有直接 Source 錨點，待確認] 7. 全部設定好後選擇 Build→ Build。
8. 會出現 Build Succeeded 訊息。
9. 在 build folder 裡面就會出現 pkg 檔案，這就是 Mac 上的安裝檔。

## HP OCI Tool Packages 範例設定

## Packages 官方使用手冊連結
[http://s.sudre.free.fr/Software/documentation/Packages/en_2017/index.html](http://s.sudre.free.fr/Software/documentation/Packages/en_2017/index.html)

## 與 HP OCI APP 的關聯
根據提供的 [HP OCI APP](mac/hp-oci-app.html) 相關內容，可以得知以下關鍵資訊:

1. HP OCI APP 使用 HP 定義的 DLL 格式，會由 HP 提供的 Windows Application (HPFirmwareInstaller) 來呼叫，進行韌體更新流程。
2. HP 提供了相關的 SDK 和官方文件 (最新版本 2.4)，並有整理後的文件 (2021/3/19)。

總之，Packages 是用於製作和分發 Mac 安裝包的工具，而 HP OCI APP 則是使用 HP 提供的 SDK 和 DLL 來進行韌體更新的應用程式。兩者緊密相關，Packages 可用於打包 HP OCI APP 的安裝檔。