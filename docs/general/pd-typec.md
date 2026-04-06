---
title: PD + TYPEC
domain_tags:
  - general
task_tags:
  - spec
authority_level: derived
is_deprecated: false
category: general
notion_id: b61e1768-0971-4b26-9d1b-4ecc6f2327f7
notion_url: 'https://www.notion.so/PD-TYPEC-b61e176809714b269d1b4ecc6f2327f7'
notion_updated_at: '2020-04-29T08:28:00.000Z'
exported_at: '2026-04-06T13:16:56.507Z'
is_summarized: false
relations: []
---

http://www.chongdiantou.com/wp/archives/22407.html
CC1 CC2 RDID
https://www.dropbox.com/sh/3do6dwcva3zw304/AADLYjZL0MnrOsUZ7rOurceta?dl=0
Typec
4.5.2.1 Connection State Diagrams
Source
Sink
Sink with Accessory Support
DRP
DRP with Accessory and Try.SRC Support
DRP with Accessory and Try.SNK Support
5 Functional Extensions
5.1 Alternate Modes
Alternate Mode Implementation using a USB Type-C to USB Type-C Cable
5.1.4 Example Alternate Mode – USB DisplayPortTM Dock
PD
# 2.6 Operational overview
2.6.1 Source Operation
2.6.2 Sink Operation
2.6.3 Cable Plugs
6. Protocol Layer
9. States and Status Reporting
9.1.3 PD Software Stack
10. Power Rules
2.6.1 Source Operation
source 行為
At Attach (no PD Connection or Contract):
Before PD Connection (no PD Connection or PD Contract):
Establishing PD Connection (no PD Connection or Contract):
Establishing Explicit Contract (PD Connection but no Explicit Contract or Implicit Contract after a Power Role
Swap or Fast Role Swap):
During PD Connection (Explicit Contract - PE_SRC_Ready State):
2.6.2 Sink Operation
sink 行為
At Attach (no PD Connection or Contract):
Before PD Connection (no PD Connection or PD Contract):
Establishing PD Connection (no PD Connection or Contract):
Establishing Explicit Contract (PD Connection but no Explicit Contract or Implicit Contract after a Power Role
Swap or Fast Role Swap):
During PD Connection (Explicit Contract - PE_SRC_Ready State):
***2.7 Architectural Overview 應該可以講
1.type c 每個腳位 正反插會做什麼事
2.vnedor command 相對應的 Pd 流程 ( billboard , spi , i2c)
3. sink source , DFP UFP DRD Alternate Mode PDO
4.BMC
ch2.6-ch2.7
ch6.Protocol Layer
ch8.Device Policy
ch9.States and Status Reporting
Data Messages:
-expose capabilities and negotiate power
- BIST?
-VendorDefined
Extended Messages
-Source and Battery information
-Security
-Firmware Update
-vendor defined
control
data
Extended Message
Message Head
6.2 Messages - P98
6.2.1.1 Message Header - P99
6.2.1.2 Extended Message Header - P103
6.3 Control Message - P109
6.4 Data Message - P116
6.5 Extended Message - P161
6.6 Timers - P181
