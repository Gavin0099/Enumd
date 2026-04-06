---
title: TVSU(ThinkVantage System Update) FWUpdate需求
domain_tags:
  - firmware
  - tools
task_tags:
  - install
  - firmware-update
  - debug
  - config
authority_level: source
is_deprecated: false
category: firmware
notion_id: 914f0ec2-7402-49a0-91cd-1098201d0e8f
notion_url: >-
  https://www.notion.so/TVSU-ThinkVantage-System-Update-FWUpdate-914f0ec2740249a091cd1098201d0e8f
notion_updated_at: '2026-01-21T09:34:00.000Z'
exported_at: '2026-04-06T13:18:09.324Z'
is_summarized: false
relations: []
---

- 安裝檔是透過InnoSetup封裝成安裝檔
- 需要檢查NB電源，小於25%要顯示error
- 是透過xml 設定來決定要update 哪一版 fw ，使用hw_id來決定device
- 取消 退出 或是 Esc 按鍵是透過TVSU 實作嗎? 因為我們是提供command line tool ，基本上不會顯示GUI
