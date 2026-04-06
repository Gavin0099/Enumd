---
title: Hxd 計算checksum方式
category: general
notion_id: f759daf2-4516-4ca8-9f67-1bf47fdb364d
notion_url: 'https://www.notion.so/Hxd-checksum-f759daf245164ca89f671bf47fdb364d'
notion_updated_at: '2026-01-21T09:34:00.000Z'
exported_at: '2026-04-06T11:21:08.184Z'
is_summarized: false
---

1.載入要計算checksum的sum檔
2.從 0x00 - 0x 7FFD (以GL3590為例)
3.分析—>驗證碼
4.選擇Checksum-16
5.確定後就可以顯示出checksum，這時就可以跟最後兩個byte 做比較
Hxd檔案
