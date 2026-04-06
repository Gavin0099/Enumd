---
title: Mac packages installation file process
category: mac
notion_id: 046f74f8-2260-41a6-a08c-d14f37b21253
notion_url: >-
  https://www.notion.so/Mac-packages-installation-file-process-046f74f8226041a6a08cd14f37b21253
notion_updated_at: '2026-01-27T08:47:00.000Z'
exported_at: '2026-04-06T11:20:38.177Z'
is_summarized: false
---

### Summary
Packages 是一個適用於 Mac OS X 10.5 或更高版本的安裝包製作和分發工具，適用於軟體開發人員和管理員使用。它提供了強大而靈活的功能，可以方便地打包和部署應用程式或插件
### Packages app download URL
http://s.sudre.free.fr/Software/files/Packages.dmg
### Instructions
1. 開啟Packages app 或是直接執行附件中的HP OCI Tool.pkgproj，如果直接開啟HP OCI Tool.pkgproj 請直接跳到第四步驟
1. 選擇Distribution 然後下一步
1. 寫入Project Name，目前預設為HP OCI Tool ，Project Directory 為build 出來pkg 的位置
1. 在Settings 裡面只要設定版本即可
1. 在Payload 已經設定好安裝的路徑(Application—>HP_OCI_Tool)
1. 如果要修改檔案，在HP_OCI_Tool folder 上面按右鍵選擇 Add Files 
1. 全部設定好後選擇Build—> Build 
1. 會出現Build Succeeded 訊息
1. 在build folder 裡面就會出現 pkg 檔案，這就是mac 上的安裝檔
### HP OCI Tool Packages sample setting 
### Packages official User Guide link
http://s.sudre.free.fr/Software/documentation/Packages/en_2017/index.html
