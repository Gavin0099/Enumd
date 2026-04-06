---
title: HP ISP Tool Rollback hub firmware flow(U32)
domain_tags:
  - hub
  - firmware
  - tools
task_tags:
  - firmware-update
  - sop
authority_level: source
is_deprecated: false
category: hub
notion_id: 89249624-7031-47fe-a4ae-7042631b2e28
notion_url: >-
  https://www.notion.so/HP-ISP-Tool-Rollback-hub-firmware-flow-U32-89249624703147fea4ae7042631b2e28
notion_updated_at: '2026-01-21T09:28:00.000Z'
exported_at: '2026-04-06T13:18:43.435Z'
is_summarized: false
relations: []
---

1. 開啟HP_ISPTool.exe
1. 確認hub Index 為 0 ，按下Erase Flash
1. 確認Erase Success 訊息後，勾選USB Hub —> Open Hub bin file —> Start ISP
1. 確認update completed後，Ac on/off ，確認斷電時間要夠久
