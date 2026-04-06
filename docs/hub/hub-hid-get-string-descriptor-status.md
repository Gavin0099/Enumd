---
title: Hub HID Get String Descriptor Status
category: hub
notion_id: 26a29b76-0a0b-42b1-9b53-87aab005635f
notion_url: >-
  https://www.notion.so/Hub-HID-Get-String-Descriptor-Status-26a29b760a0b42b19b5387aab005635f
notion_updated_at: '2026-01-21T10:01:00.000Z'
exported_at: '2026-04-06T11:17:19.133Z'
is_summarized: false
---

# Trace現象
使用HidD_GetIndexedString對HID裝置讀取string descriptor會出現下方的流程，
結論
HidD_GetIndexedString會將BufferLength+2，導致host使用multiple transactions，讓hub的回覆機制出錯。
## Reference
https://www.perytech.com/Language/tw/USB-Enumeration.htm
