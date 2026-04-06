---
title: ' Lenovo Display Daisy Chain issue'
category: general
notion_id: 1a564f6b-c656-80a0-b5c1-f2fb3d61841b
notion_url: >-
  https://www.notion.so/Lenovo-Display-Daisy-Chain-issue-1a564f6bc65680a0b5c1f2fb3d61841b
notion_updated_at: '2025-02-25T09:55:00.000Z'
exported_at: '2026-04-06T11:26:42.864Z'
is_summarized: false
---

## 問題現象
- 客戶透過one key update tool update 到 Daisy Chain時會update fail ，
## 初步解決與觀察   
1. 請客戶提供USBView log 
1. 猜測是scaler update 後 delay 時間太短，把時間從20秒-->30秒
1. 先在內部平台上測試Daisy Chain Update 是否正常
1. 客戶提供關鍵線索
1. 與Adam討論後的推測，
1. 檢查電源設定與工具行為
## 解決方式
1. 請RTK 修改Scaler Update Tool 作法，在呼叫i2c command 後，不去做Enable Suspend
