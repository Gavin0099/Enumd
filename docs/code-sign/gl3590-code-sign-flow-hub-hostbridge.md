---
title: GL3590 Code Sign flow (Hub + HostBridge)
category: code-sign
notion_id: 1c083970-f4f8-4851-af02-24410062402b
notion_url: >-
  https://www.notion.so/GL3590-Code-Sign-flow-Hub-HostBridge-1c083970f4f84851af0224410062402b
notion_updated_at: FORCE_REFRESH
exported_at: '2026-04-06T11:19:30.218Z'
is_summarized: false
---

### merge hub + hostBridge to sum 
```c++
GLBinTool.exe -i GL3590-TZYS3_HP_U27m_Hub_FW3510.bin -h GL3590-30_HostBridge_FW7800.bin -o GL3590-TZYS3_HP_U27m_Hub_FW3510.sum
```
### use eToken tool to generate code sign bin & rom file 
使用merge 好的 sum檔透過etoken Tool 讀入，然後選擇對應的key pair ，按下 sign 按鍵，就會產生 sig bin & rom bin 
- 要注意etoken Tool 裡面要放最新版的GLBinTool 
