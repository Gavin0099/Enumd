---
title: HP ISP Tool Rollback hub firmware flow
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
notion_id: 91d4ad6a-d60a-4a22-b4b6-29aaf6df17d4
notion_url: >-
  https://www.notion.so/HP-ISP-Tool-Rollback-hub-firmware-flow-91d4ad6ad60a4a22b4b629aaf6df17d4
notion_updated_at: '2026-01-21T09:28:00.000Z'
exported_at: '2026-04-06T13:15:35.570Z'
is_summarized: false
relations: []
---

1. 開啟HP_ISPTool.exe
1. 確認hub Index 為 0 ，按下Erase Flash
1. 確認Erase Success 訊息後，勾選USB Hub —> Open(GL3523_ONY1_Wistron_HP_Z43s_L1Hub_FW5407.bin) —> Start ISP
1. 確認update completed後，Ac on/off ，確認斷電時間要夠久
1. 開啟HP_ISPTool.exe
1. 確認hub Index 為 1 ，按下Erase Flash
1. 確認Erase Success 訊息後，勾選USB Hub —> Open(GL3523_OV5S1_Wistron_HP_Z43s_L2Hub_FW5415.bin) —> Start ISP
1. 確認update completed後，Ac on/off ，確認斷電時間要夠久
1. 透過device manager or UsbView 是否有回復之前版本
