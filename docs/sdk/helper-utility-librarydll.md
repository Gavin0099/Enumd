---
title: Helper utility library/dll
domain_tags:
  - firmware
  - sdk
  - tools
task_tags:
  - log
authority_level: source
is_deprecated: false
category: firmware
notion_id: f1089e9c-32bc-4050-aacd-0acfa66d766f
notion_url: >-
  https://www.notion.so/Helper-utility-library-dll-f1089e9c32bc4050aacd0acfa66d766f
notion_updated_at: '2026-01-21T09:48:00.000Z'
exported_at: '2026-04-06T13:10:20.914Z'
is_summarized: false
relations: []
---

## Display info 
- Model Name
- Serial Number
兩者資訊都可以在Windwos Api 抓到，下面為sample code
## Log
### USB View log 
- USBView 有 command line 可以直接抓到log檔，command 如下
### Tool log 
目前預計採用spdlog ，預計會套用在所有的Tool 裡，目前先以OCI Tool 為主
## System info
### Dxdiag 
- 可以抓到電腦需要的資訊，command 如下
