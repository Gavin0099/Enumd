---
title: GL MAC Bundle ID 結論
domain_tags:
  - mac
task_tags:
  - log
authority_level: source
is_deprecated: false
category: mac
notion_id: 54968b56-9bd7-403a-9a7c-d48cd782ac8b
notion_url: 'https://www.notion.so/GL-MAC-Bundle-ID-54968b569bd7403a9a7cd48cd782ac8b'
notion_updated_at: '2026-01-21T09:29:00.000Z'
exported_at: '2026-04-06T13:12:49.704Z'
is_summarized: false
relations: []
---

未來Mac開發軟體, MAC Bundle ID 規則如下
### App:
```c#
com.genesyslogic.${name}.app
```
### Framework:
```c#
com.genesyslogic.${name}.framework
```
### 範例:
> **Note:** 專案名稱為HostBridge
Bundle ID 為 com.genesyslogic.hostbridge.app
