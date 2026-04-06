---
title: 如何在xocde 執行 clang format
domain_tags:
  - mac
task_tags:
  - install
  - spec
  - config
authority_level: source
is_deprecated: false
category: mac
notion_id: 1c3d7838-8768-4389-8be2-03cad352a27c
notion_url: 'https://www.notion.so/xocde-clang-format-1c3d7838876843898be203cad352a27c'
notion_updated_at: '2026-01-21T09:32:00.000Z'
exported_at: '2026-04-06T13:13:46.034Z'
is_summarized: false
relations: []
---

- 安裝clang format
- 檢查 clang format 版本，記得要在12 版以上
- 添加 Automator 服务
- 在Automator script 裡面寫入
- 把clang-format 設定檔放到根目錄，並改名成.clang-format
- 開啟xcode 選擇要設定 clang-format 的字串 右鍵—> Services —> clang-format
