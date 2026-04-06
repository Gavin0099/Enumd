---
title: 'Get Monitor Info '
domain_tags:
  - hub
  - monitor
task_tags:
  - debug
authority_level: source
is_deprecated: false
category: hub
notion_id: 55aaa007-5c4d-4f2d-aa79-c49899049f95
notion_url: 'https://www.notion.so/Get-Monitor-Info-55aaa0075c4d4f2daa79c49899049f95'
notion_updated_at: '2026-01-21T09:33:00.000Z'
exported_at: '2026-04-06T13:13:44.491Z'
is_summarized: false
relations: []
---

### 簡述
目前因應monitor 型號過多，hub 的 pid/vid 有可能會衝突到，導致update 到錯誤的型號，所以透過windows api 來取得 monitor 資訊，藉此避免此問題發生，目前有兩種方式
### 透過standard DDDCI command 詢問
Sample Code 
透過此方式透過DDDCI 直接跟monitor 溝通，並問到model name ，不過目前也只能問到model name ，且對每個monitor 下 command 大概會有2-3秒的回覆時間，如果有3台以上的monitor ，就有快10秒的回覆時間
備註:Monitor OSD顯示的model name 是透過此方式問到的
 
### 透過regedit 方式詢問資訊
Sample Code
會先詢問有接在電腦上monitor ，再去抓取對應的regedit edid info (Computer\HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Enum\DISPLAY)
詢問時間快，且可以抓到edid 基本的資訊(model name ， serial number....)
備註:代工廠edid 是透過hw member修改並提供的，所以資淺的fw member有可能沒注意到這點，導致沒修改到，且 scaler bin檔必須透過解密後才看的到edid info....
