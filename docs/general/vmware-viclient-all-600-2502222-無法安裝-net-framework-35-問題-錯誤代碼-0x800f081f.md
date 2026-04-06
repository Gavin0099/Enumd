---
title: VMware-viclient-all-6.0.0-2502222 無法安裝 .Net Framework 3.5 問題 錯誤代碼 0x800F081F
category: general
notion_id: 2960100c-a14c-4a94-bcc4-04e6efaea8f6
notion_url: >-
  https://www.notion.so/VMware-viclient-all-6-0-0-2502222-Net-Framework-3-5-0x800F081F-2960100ca14c4a94bcc404e6efaea8f6
notion_updated_at: FORCE_REFRESH
exported_at: '2026-04-06T11:20:57.209Z'
is_summarized: false
---

### VMware-viclient-all-6.0.0-2502222 無法安裝 .Net Framework 3.5 問題 錯誤代碼 0x800F081F
### Windows Update 所需的檔案已損壞或遺失解決方法：
首先將Windows 10 的安裝媒體放入光碟機或用USB隨身碟連結電腦。
DISM /Online /Enable-Feature /FeatureName:NetFx3 /All /LimitAccess /Source:d:\sources\sxs
