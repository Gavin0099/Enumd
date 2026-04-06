---
title: Saleae logic i2c  Tool 使用說明
domain_tags:
  - mac
  - tools
task_tags:
  - firmware-update
  - log
  - config
authority_level: source
is_deprecated: false
category: mac
notion_id: e84134df-3be6-4146-a8fb-494759c60fe2
notion_url: 'https://www.notion.so/Saleae-logic-i2c-Tool-e84134df3be64146a8fb494759c60fe2'
notion_updated_at: '2026-03-25T03:41:00.000Z'
exported_at: '2026-04-06T13:14:09.434Z'
is_summarized: false
relations: []
---

### 簡介
Logic 是saleae 出的邏輯分析儀，主要特點為把 i2c 資料存在電腦裡，所以可以一次錄很大的資料，並不會受限邏輯分析儀 ram 的限制
> **Note:** Logic  說明網址
> **Note:** Logic  下載網址
### i2c 設定方式
1. 執行後，點右方 Analyzers。
1. 右上 “+”，選I2C。
1. 設定 channel。
1. 點擊右邊 Device Settings。
1. 點擊右方介面可以顯示/隱藏 Channel，下方可以設定 buffer 大小。
1. 請參照下圖紅框，Channel 0 (SCL) ， Channel 1 (SDA) ，對應的機器圖片紅框的 0 & 1 ， G 為 GND
### 波形和資料分析方式
1. 按下 Start 可開始記錄波形。
1. 按下 Stop 會停止記錄。
1. 停止後可以滙出資料。
1. 資料分析方式 (Analyzers—>Terminal)
### 錄製的raw data 超過10000行的話
當錄製的資料過大，超過1W行的話，會被蓋過去，在V2.4.4版後可以新增參數，讓抓取資料變成10W行
```c++
set SALEAE_SCROLLBACK_LIMIT=1000000 for Windows
export SALEAE_SCROLLBACK_LIMIT=1000000 for MacOS and Linux
```
- 設定方式如下
