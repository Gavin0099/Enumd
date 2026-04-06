---
title: E27m & E34m Driver install fail
category: driver
notion_id: e0d783dd-c982-42a5-b0fa-34ba7a053682
notion_url: >-
  https://www.notion.so/E27m-E34m-Driver-install-fail-e0d783ddc98242a5b0fa34ba7a053682
notion_updated_at: '2024-11-15T09:27:00.000Z'
exported_at: '2026-04-06T11:19:17.452Z'
is_summarized: false
---

目前有看到兩個問題
## Cisco Webex + AMD 平台 Install or Uninstall driver fail 
### 概要
在AMD 平台上(還不確定，在Lenovo平台也有看到) 如果有安裝Cisco Webex 時，如果install driver ，有機率driver install 會失敗，失敗的現象如下
在某幾個Hub driver 會掛不起來，導致Tool 詢問Hub 資訊會錯誤
Log 會出現下面訊息
## AMD 平台  透過 HP EndUser Tool update scaler 會fail
### 概要
在TPV 美國FAE 發現使用HP EndUser Tool update E27m or E34m Scaler 會 fail  ，
- 錯誤截圖
- log 
主要問題點為Scaler update 完 Reset MCU後，會導致driver 抓到的hub device 會出錯，如下圖，E27m 只有兩層Hub ，但是 reset MCU後會抓到6個Hub 
截圖
### 目前測到重新插拔就會遇到類似的狀態
每重插拔一次就會多長出一組Hub
—> Cisco Webex造成的，
