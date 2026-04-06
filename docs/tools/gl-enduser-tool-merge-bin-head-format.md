---
title: GL EndUser Tool Merge bin head format
domain_tags:
  - tools
task_tags:
  - spec
authority_level: source
is_deprecated: false
category: tools
notion_id: 4ddd064b-5b67-4823-8544-56972c269613
notion_url: >-
  https://www.notion.so/GL-EndUser-Tool-Merge-bin-head-format-4ddd064b5b674823854456972c269613
notion_updated_at: '2026-01-21T10:11:00.000Z'
exported_at: '2026-04-06T13:20:16.014Z'
is_summarized: false
relations: []
---

### bin head format 
- 0x00 - 0x05 : head, must be *GLHUB
- 0x06 : hyphen
- 0x07 - 0x0a : FW List
- 0x0b : hyphen
- 0x0c - 0x0d : head version 
- 0x0e: hyphen
- 0x0f : checksum-8
### bin format 
V3: 加 0x10 bytes，可以加上 type + code size
