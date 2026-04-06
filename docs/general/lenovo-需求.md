---
title: Lenovo 需求
domain_tags:
  - mac
  - tools
task_tags:
  - debug
  - log
  - config
authority_level: source
is_deprecated: false
category: mac
notion_id: 691d9428-f0bc-4afa-8cc8-0bd51580b5a4
notion_url: 'https://www.notion.so/Lenovo-691d9428f0bc4afa8cc80bd51580b5a4'
notion_updated_at: '2026-01-21T09:35:00.000Z'
exported_at: '2026-04-06T13:16:35.385Z'
is_summarized: false
relations: []
---

## Command line tool 
1. 下兩個 command 以上時如果第一個command fail 的話要可以return fail ，並且第二個command 也要繼續執行
1. mask code 下要可以update rom & sig bin檔
1. 多model 多panel update 功能
## LDCC Tool 
1. Mac & Linux Updating process 是透過tcp service ，Windows 是透過PostMessage ，需要新增此功能
1. Mac LDCC 呼叫 command line tool 時會帶 “/logpath” ，此參數會導致command line tool parse 錯誤，需要避開
