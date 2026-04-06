---
title: Hub Driver 除錯方式
category: driver
notion_id: 0fc75da2-455d-449b-b551-e802938b793f
notion_url: 'https://www.notion.so/Hub-Driver-0fc75da2455d449bb551e802938b793f'
notion_updated_at: '2022-12-13T08:48:00.000Z'
exported_at: '2026-04-06T11:19:04.903Z'
is_summarized: false
---

## Class & Device Filter driver 判斷方式
1.Start —> Right click —> Computer Management
2.Device Manager —> Universal Serial Bus controllers
3.尋找每個Device 是否有下面截圖的資訊(2.0 or 3.0 有找到其中一個即可)
4.如果有找到的話 Driver—> Driver Details 看是否有glusbflt.sys
5.觀察File version 是哪一個
---
## SC query 判斷 driver 方式
Obtains and displays information about the specified service, driver, type of service, or type of driver.
### sc query glusbflt
> **Note:** 確認有安裝driver且有插上GL Hub 
RUNNING : 有插上GL Hub ，有安裝driver
STOPPABLE :未插上GL Hub ，有安裝driver
[SC] EnumQueryServicesStatus:OpenService FAILED 1060 : 未安裝driver
### sc query glusbfltservice
> **Note:** 確認device filter driver的 service是否有掛上
RUNNING : 有安裝 device filter driver
[SC] EnumQueryServicesStatus:OpenService FAILED 1060 : 未安裝 device filter driver
---
## Class filter driver reg 移除方式 
用此reg檔可以移除class filter driver reg 參數
---
## 判斷device filter driver版本
尋找 C:\Windows\System32\GlHubFltService.exe —> 右鍵 —> 內容—> Porduct Version
---
## class & device filter driver 安裝互相影響
1. class filter driver 先安裝，device filter driver 後安裝
1. device filter driver先安裝，class filter driver 後安裝
不管是3.11 or 3.13 整個 root hub都會掛掉，要使用滑鼠控制，桌機和筆電有不一樣的方式
