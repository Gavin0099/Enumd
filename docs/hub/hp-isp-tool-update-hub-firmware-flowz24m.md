---
title: HP ISP Tool Update hub firmware flow(Z24m)
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
notion_id: 18bfefb4-49f5-47ed-9f88-a91c44401b24
notion_url: >-
  https://www.notion.so/HP-ISP-Tool-Update-hub-firmware-flow-Z24m-18bfefb449f547ed9f88a91c44401b24
notion_updated_at: '2026-01-21T09:29:00.000Z'
exported_at: '2026-04-06T13:18:42.791Z'
is_summarized: false
relations: []
---

1. 開啟HP_ISPTool.exe
1. 確認hub Index 為 1且 Hub Fw為 3122，按下Erase Flash
1. 確認Erase Success 訊息後，勾選USB Hub —> Open(GL3523-OTY3H_Wistron_HP_Z24m_G3_L2_Hub_FW3123sig.bin) —> Start ISP
1. 確認update completed後，Ac on/off ，確認斷電時間要夠久
1. 透過device manager or UsbView 是否有update到正確的版本
