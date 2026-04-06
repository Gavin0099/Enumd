---
title: GL3590 +HostBridge Code Sign
domain_tags:
  - hub
  - code-sign
  - monitor
  - tools
  - security
task_tags:
  - firmware-update
  - code-sign
  - log
authority_level: reference
is_deprecated: false
category: hub
notion_id: 06e74c82-89ff-48be-9919-4e76eae5b2ea
notion_url: >-
  https://www.notion.so/GL3590-HostBridge-Code-Sign-06e74c8289ff48be99194e76eae5b2ea
notion_updated_at: '2024-11-20T03:13:00.000Z'
exported_at: '2026-04-06T13:11:59.752Z'
is_summarized: false
relations: []
---

GL3590 +HostBridge Code Sign
1.marge bin Tool
SVN: https://gli-cse.genesyslogic.com.tw/svn/storage/Users/GavinWu/Windows/GLBinTool
a. bin + host bridge 合併成sum檔 (提供Sign Tool 加密讓 HP ISP Tool 燒錄)
GLBinTool.exe -i GL3590-TZ2YS1_Hub_UFPC(Host)_FW8725.bin -h GL3590_HostBridge_FW1008.bin -o bbb.sum
b.bin + host bridge + public key 合併成sum檔 (提供給燒錄機燒錄)
GLBinTool.exe -i GL3590-TZ2YS1_Hub_UFPC(Host)_FW8725.bin -h GL3590_HostBridge_FW1008.bin -p 5678.pub -o bbb.sum
2.HP ISP Tool
SVN: https://gli-cse.genesyslogic.com.tw/svn/storage/Users/JasonWu/IsptoolRefine2018/HP_ISPTool
提供ISP功能
1.Hub + Host Bridge sign
2.Hub Sign
3.Scaler Sign
4.PD
5.Billboard
目前未完成功能
a.GL3590 code sign initial
b.Hub + HostBridge ISP
b.Hub + HostBridge Recovery
GL3590 code sign initial
1.Fw 會透過 Toolstring 告知Support 那個mode ( 還沒有確定做法)
2.切換Vendor Command ( 81 --> A1 )
3.做ToolString 驗證(IsFixtureValid)
Mask Code
1.燒錄 Hub 0 + Hub 1 + H.B 0 + H.B 1 + public key
2.write digest
3.verify digest
3.1 verify fail erase block 0 1 2 3 4
4.write signature
5.verify signature
5.1 verify fail erase block 0 1 2 3 4
Ram Code
判斷 Hub 和 H B 跑在哪個 Block ( 可以問firmware 抓到值?)
1.Hub
a.跑在 Hub0
- Erase Hub 1
- Hub 0 copy 到 Hub 1
- Erase Hub 0
- 燒錄Firmware 到 Hub0
b.跑在 Hub1
- Erase Hub 0
- 燒錄Firmware 到 Hub0
2.Host Bridge
a.跑在 HB0
- Erase HB 1
- Hub 0 copy 到 HB 1
- Erase HB 0
- 燒錄Firmware 到 HB0
b.跑在 HB1
- Erase HB 0
- 燒錄Firmware 到 HB 0
3.write digest
4.verify digest
4.1 verify fail
- Erase 原本燒錄的那塊
5.write signature
6.verify signature
- Erase 原本燒錄的那塊
3.IKV Tool
SVN: https://gli-cse.genesyslogic.com.tw/svn/storage/Users/JasonWu/IsptoolRefine2018/IKV
提供 Code Sign功能
a.generate key
openssl ecparam -out privatekey.key -name prime256v1 -genkey
b.sign
ikvTool.exe sign -k 1234.priv -p 1234.pub -f 1121.sum
c.verify
ikvTool.exe verify -k 1234.pub -f 8400.sum -r 8400.sum.SigR -s 8400.sum.SigS -t sw
