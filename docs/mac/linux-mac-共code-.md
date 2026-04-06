---
title: 'Linux & Mac 共code '
category: mac
notion_id: e1e95a7e-ae4a-4406-bd68-0e50c0078bcf
notion_url: 'https://www.notion.so/Linux-Mac-code-e1e95a7eae4a4406bd680e50c0078bcf'
notion_updated_at: '2026-01-21T10:01:00.000Z'
exported_at: '2026-04-06T11:20:31.741Z'
is_summarized: false
---

## 目前狀況
- Neville 提供的Mac Source Code 可以 build 成功，且可以debug 
- 分析Linxu & Mac 不一樣的地方
- 開始嘗試用這包code和原本的mac framework 打通 get hub fw version
- 把基本功能導入(version , erase , isp , dump, reset , info ) 
- Linux & Mac folder 統一
- 透過 Cmake 產生 xcode 專案檔
-  build 成 framework or DLL 檔讓其他MAC GUI Tool 使用 
## 待做事項
1. make file 
1. dll 
1. 是否可以先用此code 打通一條路來評估?
1. folder 排列方式?
## UML
- Hub Fw Update CLI
## The Best
## Change for Better
## 其他
## Linux code 比對
1. CodeSign—> Hub 底下只有.h 檔
1. CodeSign—>Scaler 底下只有.h 檔
1. CodeSign—>CodeSignVerify沒有.h 檔
1. Scaler folder 只有只有.h 檔
