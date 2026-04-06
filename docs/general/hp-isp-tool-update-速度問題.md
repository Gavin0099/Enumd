---
title: HP ISP Tool update 速度問題
category: general
notion_id: 8368afc6-87aa-4e7b-b18a-11329ee3d524
notion_url: 'https://www.notion.so/HP-ISP-Tool-update-8368afc687aa4e7bb18a11329ee3d524'
notion_updated_at: FORCE_REFRESH
exported_at: '2026-04-06T11:17:29.452Z'
is_summarized: false
---

## 原本Hub Update 時間
透過USB Hound時間計算可以看到，Hub Update 時間為: 12.26sec 
```c#
39.614-27.354  = 12.26 sec

```
## 問題點
1. Write 時是用Flash write delay time ，每次write 都要花 11~15 ms 
1. code 某些地方加了太長的Sleep 
1. update Hub 前有用到新架構的 initial 動作
