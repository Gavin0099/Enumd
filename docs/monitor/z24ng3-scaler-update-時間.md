---
title: Z24nG3 Scaler update 時間
domain_tags:
  - hub
  - monitor
task_tags: []
authority_level: deprecated
is_deprecated: true
category: hub
notion_id: f565f8ee-74a8-4d8d-aefd-292680ca5cf3
notion_url: 'https://www.notion.so/Z24nG3-Scaler-update-f565f8ee74a84d8daefd292680ca5cf3'
notion_updated_at: '2026-01-21T09:26:00.000Z'
exported_at: '2026-04-06T13:16:01.629Z'
is_summarized: false
relations: []
---

## 治具update 時間 (216KHz)
9分47秒 ((4,194,304 byte)
## USB 2.0 update
### Scaler Size : 2,192,146 bytes  
- erase : 25 s
- write : 7 m 30 s 

> **Note:** 2192146 (byte) / 256 (byte)=  8563 

8563 * 7.5 ms = 64222 ms =  64 秒 

8563 * 41ms = 351083 ms  = 351 秒 

64 s + 351 s  = 411 s = 6 分 55 秒
- verify : 5m 30 s 
> **Note:** 2192146 (byte) / 64 (byte)= 34252

34252 * 9.3ms = 318543 = 318 s = 5 分 18 秒
### 總共花費時間: 13分25秒
---
## USB 3.0 update
- erase : 25 s
- write : 6 m 57 s 
# Z25 xs update 時間
Scaler Size : 1602630 bytes   - 131072 byte = 1471558  byte
## 新版Hub Fw
### Hub 3.0
erase : 16s 
write : 4m 14 s 
read: 3m 02 s

total : 7m32s
### Hub 2.0
erase : 16s 
write : 4m 35 s 
read: 3m 06 s
total : 7m57s
## 舊版Hub Fw
### Hub 2.0
erase : 16s 
write : 5m 02 s 
read: 3m 36 s
total : 8m54s
> **Note:** 新版3.0花費時間是 舊版2.0 
452 / 534 = 84.6%
新版2.0花費時間是 舊版2.0 
477 /  534 = 89.3%

預估用2M byte燒錄
3.0花費時間:11分21秒 (減少2分4秒)
2.0花費時間:12分(減少1分25秒)
