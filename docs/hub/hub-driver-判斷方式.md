---
title: Hub  driver 判斷方式
domain_tags:
  - hub
  - driver
  - security
task_tags: []
authority_level: source
is_deprecated: false
category: hub
notion_id: 1699ec4e-fb36-4a8d-abca-46cb1063b59f
notion_url: 'https://www.notion.so/Hub-driver-1699ec4efb364a8dabca46cb1063b59f'
notion_updated_at: '2022-12-13T08:48:00.000Z'
exported_at: '2026-04-06T13:11:29.138Z'
is_summarized: false
relations: []
---

1.Start Right —> Computer Management
2.Device Manager —> Universal Serial Bus controllers
3.尋找每個Device 是否有下面截圖的資訊(2.0 or 3.0 有找到其中一個即可)
4.如果有找到的話 driver—> driver Details 看是否有glusbflt.sys
5.觀察File version 是哪一個
