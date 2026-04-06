---
title: HP Good Place 524pu Scaler Update fail
category: monitor
notion_id: d572ba9d-9154-43bd-b4f7-5a9de395cf72
notion_url: >-
  https://www.notion.so/HP-Good-Place-524pu-Scaler-Update-fail-d572ba9d915443bdb4f75a9de395cf72
notion_updated_at: '2026-01-21T09:34:00.000Z'
exported_at: '2026-04-06T11:23:02.204Z'
is_summarized: false
---

## 緣由 
1月多時，RTK有來看524 pu update 的問題，其中一點為 scaler 會 update fail ，但是只有在RTK NB才會發生，那時錄製了i2c 訊號分析，scaler write data 到某一筆後，scaler 就回Nak 
## Debug 過程
1. 推測需要接上USB Trace 分析問題點，但是手上的板子加上測試電腦測試了70幾次都是成功的，TPV 提到他們那邊有NB(HP EliteBook 630)可以複製出來，所以有跑到他們那邊看問題
1. 1/24 有去TPV 使用HP EliteBook 630測試，發現情況如下
1. 只能先從TPV帶回來那台筆電接上USB Trace & LA 來跑測試，但是跑了100多次都成功
1. 如果沒有接上USB Trace & LA的話，會看到fail後5秒 hub 才回來
1. 且分析bus hound & i2c 會發現有一筆command ，hub 回 xact error 後 就 reset 了
1. 討論過後發現HID command 並沒有加上retry ，所以加上retry 試試看，加上retry 後 ，HP EliteBook 630可以跑到 100次以上沒有fail ，但是客戶的NB(HP Sandwalker MV sku 11, Dragonfly G4) 會顯示crc check fail
1. 2/2 有再去TPV 借了HP Sandwalker MV sku 11, Dragonfly G4來分析問題點，同樣的，接上LA後都會update 成功，
1. TPV 有一台筆電接上LA也可以複製出錯誤來，TPV Gary 有持續把LA log 提供出來讓我們分析
 
