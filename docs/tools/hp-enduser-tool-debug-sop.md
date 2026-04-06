---
title: HP EndUser Tool Debug SOP
domain_tags:
  - hub
  - code-sign
  - monitor
  - firmware
  - tools
task_tags:
  - install
  - debug
  - code-sign
  - sop
  - log
authority_level: source
is_deprecated: false
category: hub
notion_id: f35ef343-d38c-44e7-8c0a-15297922cf68
notion_url: >-
  https://www.notion.so/HP-EndUser-Tool-Debug-SOP-f35ef343d38c44e78c0a15297922cf68
notion_updated_at: '2026-01-21T09:27:00.000Z'
exported_at: '2026-04-06T13:15:45.726Z'
is_summarized: false
relations: []
---

當HP EndUser Tool 發生update fail 時，可以先參考User Guide (HP End User Tool Packing Instruction_code_sign)裡面的Common Problem章節是否可以解決問題
---
如果不行的話再提供兩個log以便分析
- USBView Log ，可以參考下面連結
- DebugView Log ，可以參考下面連結
下面是比較常遇到的錯誤，可以透過debug view 產生的log來分析問題點
### DebugView log分析
1. Not Support HP Device 
1. Scaler Firmware verification is failed 
1. GetScalerPublicKeyData failed
1. SetupDiEnumDeviceInfo ERROR! i=255, (259)
1. Scaler bin file not found
1. Hub-1 firmware verification failed.
1. SetupDiEnumDeviceInfo ERROR! i=255
