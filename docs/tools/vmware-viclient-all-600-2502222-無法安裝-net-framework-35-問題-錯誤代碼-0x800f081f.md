---
title: VMware-viclient-all-6.0.0-2502222 無法安裝 .Net Framework 3.5 問題 錯誤代碼 0x800F081F
domain_tags:
  - tools
task_tags:
  - install
  - debug
authority_level: source
is_deprecated: false
category: tools
notion_id: 2960100c-a14c-4a94-bcc4-04e6efaea8f6
notion_url: >-
  https://www.notion.so/VMware-viclient-all-6-0-0-2502222-Net-Framework-3-5-0x800F081F-2960100ca14c4a94bcc404e6efaea8f6
notion_updated_at: '2020-06-29T10:48:00.000Z'
exported_at: '2026-04-06T13:13:14.057Z'
is_summarized: false
relations: []
---

### VMware-viclient-all-6.0.0-2502222 無法安裝 .Net Framework 3.5 問題 錯誤代碼 0x800F081F
### Windows Update 所需的檔案已損壞或遺失解決方法：
首先將Windows 10 的安裝媒體放入光碟機或用USB隨身碟連結電腦。
DISM /Online /Enable-Feature /FeatureName:NetFx3 /All /LimitAccess /Source:d:\sources\sxs
