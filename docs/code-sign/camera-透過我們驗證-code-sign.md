---
title: Camera 透過我們驗證 code sign
domain_tags:
  - hub
  - code-sign
  - tools
  - security
task_tags:
  - firmware-update
  - debug
  - code-sign
  - sop
authority_level: source
is_deprecated: false
category: hub
notion_id: ad72d774-3a79-4c8b-ae97-2d4990d56191
notion_url: 'https://www.notion.so/Camera-code-sign-ad72d7743a794c8bae972d4990d56191'
notion_updated_at: '2024-11-20T03:13:00.000Z'
exported_at: '2026-04-06T13:12:16.770Z'
is_summarized: false
relations: []
---

### Camera
1. generate ecdsa key & sign ecdsa key
1. 告知如何Erase Camera 的方式 —> verify fail 要 erase 掉
1. 告知如何 Read Camera data —> hub security model 必須要 read 到 update 的 data 才可以算出hash
1.  2 , 3點 可以改成 告知我們所有的 update flow 以及相對應的文件，讓我們控制整個update 
1. 下圖為Hub Code Sign 驗證 flow ，驗證code sign 應該Tool 就可以控制，FW 應該不用改甚麼，但是還是要麻煩俊太確認看看
