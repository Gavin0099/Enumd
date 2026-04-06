---
title: MFC UI 因為Windwos 縮放比例導致UI錯位解決方法
domain_tags:
  - tools
task_tags:
  - sop
  - config
authority_level: source
is_deprecated: false
category: tools
notion_id: 49cfb167-8e41-4b36-8338-4aab1856b004
notion_url: 'https://www.notion.so/MFC-UI-Windwos-UI-49cfb1678e414b3683384aab1856b004'
notion_updated_at: '2024-11-14T03:08:00.000Z'
exported_at: '2026-04-06T13:13:40.043Z'
is_summarized: false
relations: []
---

### 參考資料
https://stackoverflow.com/questions/46428510/enhanced-system-dpi-scaling-with-vs2017
### 做法:
1. Create a new file GdiScaling.manifest in your project.
1. GdiScaling.manifest 填入
1. In project settings, in Manifest Tool, set Additional Manifest Files to GdiScaling.manifest. This will merge your GDI scaling settings into the rest of the generated manifest.
