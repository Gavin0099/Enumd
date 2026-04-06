---
title: Command line uninstall driver
category: driver
notion_id: d44145a9-d3a6-44b2-9bb0-a84cc3191282
notion_url: >-
  https://www.notion.so/Command-line-uninstall-driver-d44145a9d3a644b29bb0a84cc3191282
notion_updated_at: '2022-12-13T08:48:00.000Z'
exported_at: '2026-04-06T11:18:56.098Z'
is_summarized: false
---

wmic product where "description='Genesys Logic Generic USB Class Filter Driver'" call uninstall
wmic product where "description='Evernote v. 6.20.2'" call uninstall
WMIC.EXE /OUTPUT:D:\PRODUCT.XML PRODUCT GET NAME,VERSION
```plain text
wmic /node:"hostname" product where "Name like '%%Genesys%%'" get Name
pause
```
## Class Filter Driver移除方式
- wmic product where "" call uninstall 
這種方式只有透過MSI安裝才可以這樣移除，目前 Class Filter driver 透過 installShield 包的方法不是透過MSI包裝
- 直接指向C:\Program Files (x86)\InstallShield Installation Information\{D6BB1C82-B3BF-48D8-8E43-FDD1DC6B21E2} 對裡面的 setup.exe 下 uninstall command ，不過透過slient mode uninstall 時不會成功，google 了一下 要先做成 uninstall.iss ，這樣slient mode uninstall 才可以ok，目前透過下面方式還沒辦法做成功
```c
"C:\Program Files (x86)\InstallShield Installation Information\{D6BB1C82-B3BF-48D8-8E43-FDD1DC6B21E2}\Setup.exe" -s -f1C:\uninstall.iss
```
