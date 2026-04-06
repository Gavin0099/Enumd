---
title: Visusal Stdio SDK 設定
category: general
notion_id: 49a79ff6-e036-489b-98ee-b36abd73df19
notion_url: 'https://www.notion.so/Visusal-Stdio-SDK-49a79ff6e036489b98eeb36abd73df19'
notion_updated_at: FORCE_REFRESH
exported_at: '2026-04-06T11:21:00.533Z'
is_summarized: false
---

1.View->Other Windows-->Property Manager
2.Microsoft.cpp.Win32.user --> 整個Visual Stdio ( include & link 設定)
3.include 需要 $(VC_IncludePath) 和 $(WindowsSDK_IncludePath)
4.link 需要 $(VC_LibraryPath_x86) 和 $(WindowsSDK_LibraryPath_x86)
