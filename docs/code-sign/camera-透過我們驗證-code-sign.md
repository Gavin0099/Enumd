---
title: Camera 透過我們驗證 code sign
category: code-sign
notion_id: ad72d774-3a79-4c8b-ae97-2d4990d56191
notion_url: 'https://www.notion.so/Camera-code-sign-ad72d7743a794c8bae972d4990d56191'
notion_updated_at: '2024-11-20T03:13:00.000Z'
exported_at: '2026-04-06T11:19:54.397Z'
is_summarized: false
---

### Camera
1. generate ecdsa key & sign ecdsa key
1. 告知如何Erase Camera 的方式 —> verify fail 要 erase 掉
1. 告知如何 Read Camera data —> hub security model 必須要 read 到 update 的 data 才可以算出hash
1.  2 , 3點 可以改成 告知我們所有的 update flow 以及相對應的文件，讓我們控制整個update 
1. 下圖為Hub Code Sign 驗證 flow ，驗證code sign 應該Tool 就可以控制，FW 應該不用改甚麼，但是還是要麻煩俊太確認看看
