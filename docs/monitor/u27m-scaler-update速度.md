---
title: U27m Scaler Update速度
domain_tags:
  - hub
  - monitor
  - tools
task_tags:
  - sop
authority_level: source
is_deprecated: false
category: hub
notion_id: c1bcb448-d494-4528-b43a-641fcbd17094
notion_url: 'https://www.notion.so/U27m-Scaler-Update-c1bcb448d4944528b43a641fcbd17094'
notion_updated_at: '2026-01-21T09:57:00.000Z'
exported_at: '2026-04-06T13:14:58.885Z'
is_summarized: false
relations: []
---

### Scaler bin Size : 1536260
### I2c 速度
### RTK Hub Update 時間
1236000 / 240 = 5150
### Tool 更新流程修改幫助降低時間
1. WaitStatusReady : 每一筆Write 完都會等Flash Ready 才做下一筆
原先做法是先等 5 ms 再去確認Flash 是否Ready 
現在改為直接確認Flash 是否 Ready 
若沒有Ready 再等300 us 後再去確認一次
Write 一個Sector(4K Bytes) 寫一筆256 Bytes 因此要寫16次，約80ms，共380個Sector ，固約省30秒
1. Flash 每個Sector Erase 完會檢查是否Flash 資料都被清空(Blank Check )
因此會再把Sector 的資料讀回來，確定每個Byte 都是0xFF 後才開始準備寫入新Data
每個Sector 都有Retry 機制，Erase Write Read Verify，如果Verify 錯，都會重新Erase
所以Erase 完檢查是否 0xFF 這件事可以省略不做
Read 一個Sector (4K Bytes 大概是 230ms) ，1.5MB 大約 380個 Sector  固可以省約88秒
### Hub fw & Tool 修改完後最後時間
54:15: - 50:18 = 237= 3min 57 sec 
- GL
1536260 / 237 = 6482.1
- RTK
1236000 / 240 = 5150
6482 / 5150 = 1.258
14:13:36.223 - 14:09:36.152 = 4min
