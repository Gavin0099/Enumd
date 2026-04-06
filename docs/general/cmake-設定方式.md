---
title: Cmake 設定方式
category: general
notion_id: 6a58c756-d06a-4644-b533-e671532f58fb
notion_url: 'https://www.notion.so/Cmake-6a58c756d06a4644b533e671532f58fb'
notion_updated_at: '2026-01-21T09:31:00.000Z'
exported_at: '2026-04-06T11:21:32.309Z'
is_summarized: false
---

## Cmake GUI 
1. Where is source code 
1. Where to build the binaries 
1. Configuration
1. Generate 
1. Open Project 
## Xcode Cmake 設定方式
1. 每個folder都要有一個CMakeLists.txt ，用來設定此folder的環境變數
1. root folder 的 camke file 需要設定 compiler 參數 
1. 因為 xcode 要用 object C++ build ，所以
1. 導入 library 如下設定，下面會導入mbedtls , hubFwUpdate , USBHubISP
1. 把 source code include 到 project 的方式如下
