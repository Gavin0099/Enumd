---
title: HP EndUser Tool 包裝流程
category: general
notion_id: a767a04c-6e2c-4725-a704-5a3167d3554c
notion_url: 'https://www.notion.so/HP-EndUser-Tool-a767a04c6e2c4725a7045a3167d3554c'
notion_updated_at: FORCE_REFRESH
exported_at: '2026-04-06T11:27:31.298Z'
is_summarized: false
---

## 如果沒有要修改功能單純用最新版換Fw的話
1. 抽換Hub & Scaler Bin
1.   修改HPFwUpdate.ini 參數，可參考HP End User Tool Setting instructions_0409.pdf 第一章Ini parameter Description
1. 如果是同一塊板子，但是要測試不同Model Fw，要做以下步驟
H使用HP ISP Tool Erase Hub後 update 對應的Hub Firmware
a.使用MTK 治具 update dual 版本的Scaler 

此舉動是因為不同Model 有不一樣的 public key (Hub & Scaler) 
原本的 update flow 並不能取代其他model 的 public key ，只能靠 Erase 方式取代  
1. 測試

 
