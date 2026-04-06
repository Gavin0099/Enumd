---
title: 'Hub Auto Test '
domain_tags:
  - hub
  - mac
  - tools
task_tags:
  - firmware-update
  - debug
  - build
  - sop
  - log
  - config
authority_level: derived
is_deprecated: false
category: hub
notion_id: 861f648a-8971-4a30-a315-a98910da02ea
notion_url: 'https://www.notion.so/Hub-Auto-Test-861f648a89714a30a315a98910da02ea'
notion_updated_at: '2026-01-21T09:48:00.000Z'
exported_at: '2026-04-06T13:10:41.666Z'
is_summarized: false
relations: []
---

## 概述
每次從把code 推上 git 時，要怎麼確定source code 是否有動到ISP flow ，導致update fail ，因為目前CLI Tool 已經在Mars 上跑，所以可以透過Mars Test Stage 來測試 Hub ISP 功能是否正常，在每個branch push or marge request 時自動去執行測試
CLI Tool Chip測試
### 測試 Chip 
### 測試平台
### 第一階段
- OS @Standy Huang 
- 測試chip @GL_Gavin Wu 
- Mars Test input & output 介面 @Adam.Chen @Vic Chen 
### 其他備註
- Ac Power on/off
- up port 插拔
- 電腦還原點時機
- U4 Host
### 2023/12/04
- 同時間好幾個人推code ，gitlab 排程是否會有問題 @standy Huang
- 在測試機上面測試還沒有成功，isp 和 reset 會 failed 是找不到device ，但是initial 時有找到device，windows 底下 @Vic Chen 
### 2023/12/25
- Windows 
- Mac
- Linux
- 以後客戶的機型要設定特定的targetDevice
- log 的顯示方式
- windows 平台build 會變很慢，最久會到1小時
- 
