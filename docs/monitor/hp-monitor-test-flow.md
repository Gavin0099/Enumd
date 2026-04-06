---
title: HP Monitor Test Flow
domain_tags:
  - hub
  - monitor
  - firmware
  - tools
task_tags:
  - firmware-update
  - sop
authority_level: source
is_deprecated: false
category: hub
notion_id: 68f8b6ac-d31a-4ce0-89ba-421ad0b0d5fc
notion_url: 'https://www.notion.so/HP-Monitor-Test-Flow-68f8b6acd31a4ce089ba421ad0b0d5fc'
notion_updated_at: '2026-01-21T09:27:00.000Z'
exported_at: '2026-04-06T13:15:51.119Z'
is_summarized: false
relations: []
---

# Hub GL3523 Test Flow
---
## Hub GL3523 Recovery Case
### GL3523 Boot Code Load 優先權
- Area 1 優先權最高 ， Boot Code Load Firmware不會判斷兩塊Area 的Firmware Version
- 除非 Area 1 為 Mask Code ，否則 Boot Code 不會Load Area 2 Firmware
因應上面條件，所以Recovery Case 都會根據上述條件做判斷
- 保證 兩塊 Area 都存在Firmware ，所以會先update Mask Code 那塊 Area
- 保證 Area 1 的 Firmware Version 是最新的 ，一定會把最新版的 Firmware 放到 Area 1
- 兩塊Firmware Version 相同時，update Area 1
---
## Hub GL3523 Test Flow
1. 準備兩個版本，以便確認daul bank 功能正常
1. 用General Test Tool Erase Base Area

1. 用 update Tool Update Hub ，update Hub Fw 6012
1. 用General Test Tool 觀察 Hub Base & Recovery Version
1. 用 update Tool Update Hub ，update Hub Fw 6012
1. 用General Test Tool 觀察 Hub Base & Recovery Version
---
# Hub GL3590 Test Flow
---
## Hub GL3590 Recovery Case
### GL3590 Boot Code Load 優先權
- Boot Code Load Area Firmware會判斷兩塊Area 的Firmware Version ，會跑最新版本的 Firmware Version
因應上面條件，所以Recovery Case 都會根據上述條件做判斷
- 保證 兩塊 Area 都存在Firmware ，所以會先update Mask Code 那塊 Area
- 永遠 update Firmware Version 最舊的那塊 Area
- 兩塊Firmware Version 相同時，update Area 1
---
## Hub GL3590 Test Flow
1. 準備兩個版本，以便確認daul bank 功能正常
1. 用General Test Tool Erase Base Area
1. 用 update Tool Update Hub ，update Hub Fw 7015
1. 用General Test Tool 觀察 Hub Base & Recovery Version
1. 用 update Tool Update Hub ，update Hub Fw 7015
1. 用General Test Tool 觀察 Hub Base & Recovery Version
---
## Scaler Test Flow
1. 用MTK治具 update 舊版 Scaler Fw (daul 版本)
1. 用HP ISP Tool 確認Scaler Fw Version
1.  HP EndUser Tool Update Scaler
1. 用HP ISP Tool 確認Scaler Fw Version
---
## 測試Model 
### Verify Mode 
- Firmware Verify —> High Level (透過Scaler 驗證 code sign ，存在 GL 3523)
- Software Verify —> Low Level (透過 Tool 驗證 code sign ，存在GL3523)
- Genesys Verify --> 透過 Hub Hw 驗證 code sign ，存在GL3590
---
## 測試所需物品
1. 硬體
1. 軟體
1. 檔案
