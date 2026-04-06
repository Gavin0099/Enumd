---
title: Mac OCI Demo flow
domain_tags:
  - hub
  - mac
  - monitor
  - firmware
  - tools
task_tags:
  - sop
  - log
  - config
authority_level: source
is_deprecated: false
category: hub
notion_id: 420db67e-12a8-4cc0-992c-6d176da2857f
notion_url: 'https://www.notion.so/Mac-OCI-Demo-flow-420db67e12a84cc0992c6d176da2857f'
notion_updated_at: '2026-01-21T09:55:00.000Z'
exported_at: '2026-04-06T13:17:52.387Z'
is_summarized: false
relations: []
---

### Demo Flow
1. 在指定資料夾放好Mac OCI Tool ，並把 hub & scaler 前後版bin檔也放進去
1. 開啟Mac OCI Tool ，會顯示以下資訊
1. 開啟Mac OCI Tool 時同時也用攝影機直播demo mac 筆電有跟Z40 透過Type-C 連接，並且可以顯示Z40螢幕為延伸螢幕，藉此移動OCI Tool 來顯示Z40 有demo 筆電的訊號
1. Update Hub & Scaler firmware 
1. Update 成功後修改xml or ini 參數，把要update 的hub & scaler bin檔檔名修改，重新開啟OCI Tool ，確認Tool 有去讀取xml or ini 參數來決定update bin檔
1. 更改XML 增加Hub L2 再開啟Tool 確認 是透過xml 來獲取資訊
### OCI Tool功能列表
