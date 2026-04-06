---
title: RTK Camera Dll問題
category: monitor
notion_id: 498e062b-4f0e-4768-9432-b0ee1c578327
notion_url: 'https://www.notion.so/RTK-Camera-Dll-498e062b4f0e47689432b0ee1c578327'
notion_updated_at: '2026-01-21T09:29:00.000Z'
exported_at: '2026-04-06T11:22:47.507Z'
is_summarized: false
---

### 需求:
所有vendor 廠商提供update dll檔都改成用OCI Dll 格式
### 原因:
如果Update Tool 裡面有RTK 舊版Camera dll，在某些特定平台 會導致RTK Audio update fail，相關mail 可以參考下面連結檔案
雖然新版camera dll 已經修正了這個問題，但是Sample code 架構跟舊版的差很多，我們要找到對應的窗口詢問 Sample code 流程才能修正這個問題，如果統一用oci dll 格式的話，我們原本就有統一的介面可以實作，可以避免溝通和實作的功夫
### 目前有影響到的機種
- Z24m
- Z24mv G4
- M24
- M27
- Z34c
