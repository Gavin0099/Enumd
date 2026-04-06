---
title: Driver 刪除方式
category: driver
notion_id: c588003e-590e-48ef-b423-53e61b8d638e
notion_url: 'https://www.notion.so/Driver-c588003e590e48efb42353e61b8d638e'
notion_updated_at: '2020-06-08T10:11:00.000Z'
exported_at: '2026-04-06T11:18:57.597Z'
is_summarized: false
---

Device Filter 刪除方式
1.刪除Windows\System32\drivers\glusbflt.sys
2.開啟 regedit
a.刪除 HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\services\glusbflt
b.刪除 HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\services\GlUsbFltService
3.重開機
Class Filter 刪除方式
1.刪除Windows\System32\drivers\glusbflt.sys
2.開啟 regedit
a.刪除 HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\services\glusbflt
b.刪除HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Class\{36FC9E60-C465-11CF-8056-444553540000} 裡面的LowerFilters 參數 (glusbflt )
3.重開機
ClassFilterDriver 刪除reg
