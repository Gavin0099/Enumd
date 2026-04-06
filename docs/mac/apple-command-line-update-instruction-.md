---
title: 'Apple Command line update Instruction '
category: mac
notion_id: 0eb4902f-b770-4aad-bb23-fc2a8d818570
notion_url: >-
  https://www.notion.so/Apple-Command-line-update-Instruction-0eb4902fb7704aadbb23fc2a8d818570
notion_updated_at: '2026-01-21T09:27:00.000Z'
exported_at: '2026-04-06T11:20:28.980Z'
is_summarized: false
---

apple 有一個Tool需求為
- command line tool
- hub firmware update 
- update hub related data
hub related data 如下截圖
- GL3523(5C) 
Start Address: 0x8000 
- GL3523(2A) 
Start Address: 0x8000 
- GL3590 
Start Address: 0xA000 
### Command line Parameter
### SW Update Firmware Flow
### hub related data Description
- Apple Head String
- checksum —>  Apple Header String + checksum 後面的資料累加後的值，如下圖
- serial Number data
- Container ID data
### 相關文件
- GL3523 FW Update Note 
- GL3590 FW update Note
- Mac Command Line Tool Update Note
### svn path
https://gli-cse.genesyslogic.com.tw/svn/storage/Hub/Mac AP/Engineer/GLHubFWUpdateTool
