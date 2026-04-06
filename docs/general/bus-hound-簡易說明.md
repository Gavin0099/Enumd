---
title: Bus Hound 簡易說明
domain_tags:
  - tools
task_tags:
  - log
  - config
authority_level: source
is_deprecated: false
category: tools
notion_id: 33313322-a68d-409e-8a94-fbcb18a33865
notion_url: 'https://www.notion.so/Bus-Hound-33313322a68d409e8a94fbcb18a33865'
notion_updated_at: '2026-01-21T09:26:00.000Z'
exported_at: '2026-04-06T13:14:05.453Z'
is_summarized: false
relations: []
---

可以抓取USB 傳輸資料，教學如下
## Capture:
抓取USB資料的主畫面
CTL : 為USB control transfer，是Tool 傳給USB Device 的 
IN:USB Device 傳回來的data
Run & Stop : Run代表會一直抓取USB Device 資料，Stop代表停止抓取
## Save:
儲存抓到的USB Device data ，選取Save即可儲存
## Setting:
可以設定抓取的參數
Limits:
- Capture Capacity:最多可以抓取的Size，如果超過的話就不能抓取資料，必須去Capture 頁面選擇Stop—> Run ，就會清掉上次抓取的參數
- Max Record Length:每一筆packet 最多能抓取的資料大小
Stop when:
- 遇到甚麼條件會停止抓取
Phases to Capture:
- 勾選要抓取的資料類型
Columns to Display:
- 勾選要顯示的資訊
## Device:
選擇要capture的device ，可透過Hardware ID來判斷要抓取的device
