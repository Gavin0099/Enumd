---
title: GenesysLogic integrates SDK specification
domain_tags:
  - sdk
  - tools
task_tags:
  - build
  - spec
  - log
  - config
authority_level: source
is_deprecated: false
category: sdk
notion_id: 20f725b2-2c30-4de1-a5f6-8c29228188cc
notion_url: >-
  https://www.notion.so/GenesysLogic-integrates-SDK-specification-20f725b22c304de1a5f68c29228188cc
notion_updated_at: '2026-01-21T09:23:00.000Z'
exported_at: '2026-04-06T13:11:24.977Z'
is_summarized: false
relations: []
---

# 目的
客戶要求我方的ISP tool整合3rd Party device的ISP功能時，device vendor提供的SDK應符合ISP tool所接受的介面與格式。
---
# 動機
在我方開發tool過程中，device vendor提供自行定義介面與格式的SDK，導致我方整合時需要做額外的確認，更甚者需要多做處理才可以使用，拖延我方開發的時程，進而影響產品開發進度。
---
# SDK規範
下面列出各平台的應遵守的項目。
## Windows
### Dynamic link library (DLL)
- 編譯參數
- API
- Package
### Static link library (LIB)
- 編譯參數
- API
- Package
## Linux
### 支援CPU
1. Intel / AMD x86_64。
### 支援OS
1. Ubuntu 18.04 LTS 64bit。
1. Ubuntu 20.04 LTS 64bit。
### Console Application
- 編譯參數
- CLI (Command Line Interface)
- Package
