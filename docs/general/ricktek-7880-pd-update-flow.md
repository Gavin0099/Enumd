---
title: RickTek 7880 PD Update Flow
category: general
notion_id: 9b2dacf2-80e8-4bd9-a93b-4c64ddd8bce1
notion_url: >-
  https://www.notion.so/RickTek-7880-PD-Update-Flow-9b2dacf280e84bd9a93b4c64ddd8bce1
notion_updated_at: '2026-01-21T09:23:00.000Z'
exported_at: '2026-04-06T11:22:42.900Z'
is_summarized: false
---

此簡介主要根據RickTek PD的update 文件(RT7880T In System Programming Spec V1.0) 做說明，最新版的spec 如下連結
在下面附上7800 update flow spec 
---
## RickTek PD Head Format 
目前用到的參數如上面截圖
- Signature : 判斷此PD檔案是否正確
- Length : 要update的長度
---
## PD update Flow
### Slave Address Setting 
Slave Address 是透過電壓準位來決定的，因為Tool無法知道，目前透過fw hot code 放在 Tool String 3rd Ricktek Pd 參數來決定Slave Address
> **Note:** 1 : 0x1F
2 : 0x2F
### Entry ISP Update Mode
Enter ISP mode ，原本Enter ISP mode 預設 Slave Address 為 0x1E ，如果透過此Slave Address 傳給Pd 回傳 A-NACK(Mask Code ) 時，要再用 0x1E command 再傳送一次 Enter ISP mode，但是因為Hub 並沒有回傳i2c status ，所以只能透過Read PD data 的方式來判斷是否回到Mask Code ，如果Read Pd data 都是回傳 0xff ，那就是 Mask code ，同時 update 的 Slave Address 也要改成 0x1F
---
### Programming flow & Verifying Flow
基本上直接看Spec 即可，沒有特別的說明
