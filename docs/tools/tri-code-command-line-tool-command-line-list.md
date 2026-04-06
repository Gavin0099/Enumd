---
title: Tri Code Command line Tool command line List
domain_tags:
  - hub
  - firmware
  - tools
task_tags:
  - firmware-update
  - spec
authority_level: source
is_deprecated: false
category: hub
notion_id: 15b64f6b-c656-80ce-87c8-d29b68e14d84
notion_url: >-
  https://www.notion.so/Tri-Code-Command-line-Tool-command-line-List-15b64f6bc65680ce87c8d29b68e14d84
notion_updated_at: '2026-01-21T09:36:00.000Z'
exported_at: '2026-04-06T13:10:53.988Z'
is_summarized: false
relations: []
---

### Query 裝置韌體版本
- "GLHubUpdateToolCli.exe /i" : Display hub(s) information.
- "GLHubUpdateToolCli.exe /c" : Display hub(s) chip ID.
- "GLHubUpdateToolCli.exe /v" : Display hub(s) & pd(s) FW version.
- "GLHubUpdateToolCli.exe /va" : Display hub(s) involve FW versions.
- "GLHubUpdateToolCli.exe /vb" : Display the FW version of bin file(s)
### Erase 裝置韌體
- "GLHubUpdateToolCli.exe /er=1" : 刪除 Hub，bridge韌體
- "GLHubUpdateToolCli.exe /er=1&epd:1" : 刪除 PD, billboard韌體
1. Burn 裝置韌體
- GLHubUpdateToolCli.exe "/mu=1&epd=%PdFwPath%" 燒錄 Hub，bridge韌體
- GLHubUpdateToolCli.exe "/mu=1&epd=%PdFwPath%" 燒錄 PD, billboard韌體
### Reset&Reload 裝置韌體
- "GLHubUpdateToolCli.exe /re=1" : 重置&重載 Hub，bridge韌體
- "GLHubUpdateToolCli.exe /re=1&epd:1" : 重置&重載 PD, billboard韌體
### Dump FW
- - "GLHubUpdateToolCli.exe /dmp=id{&key[:index]=path}..." Dump FW.
### 
