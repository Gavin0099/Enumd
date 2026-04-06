---
title: HP ISP Tool Special case update method
domain_tags:
  - monitor
  - tools
task_tags:
  - firmware-update
  - debug
  - spec
  - sop
  - log
  - config
authority_level: source
is_deprecated: false
category: monitor
notion_id: fb0300a1-8ed0-4f2d-ba72-c97914a2b803
notion_url: >-
  https://www.notion.so/HP-ISP-Tool-Special-case-update-method-fb0300a18ed04f2dba72c97914a2b803
notion_updated_at: '2026-01-21T09:27:00.000Z'
exported_at: '2026-04-06T13:15:40.410Z'
is_summarized: false
relations: []
---

## Scaler dualImage update
因為scaler boot code 會選擇 scaler version 高的版本來載入，所以如果只update舊版的版本到其中一個區塊是無法達到降版的功能，開啟這個update case 時，會把service bin檔同時update到兩個區塊，以達到降版功能
- ini 設定參數
會先update boot code 沒在跑的那塊，等到確定update成功後，再update另外一塊
- ini 設定參數
會先update boot code 沒在跑的那塊，等到確定update成功後，再update另外一塊，這個case會update sBoot
## Scaler dhcp or edid update
客戶有遇到hdcp or edid data被清掉的問題，因為原因還沒釐清，所以先提供可以單獨update hdcp or edid bin檔的功能
- ini 設定參數
> **Note:** IsSupportScalerDdcpOrEdidUpdate=1
ScalerHdcpOrEdidUpdateStart=0x3FA000
ScalerHdcpOrEdidUpdateEnd=0x3FFFFF
## HP ISP Tool Update flow
下面log會顯示update Start Address
