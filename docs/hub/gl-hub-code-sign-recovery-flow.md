---
title: GL Hub Code Sign Recovery Flow
domain_tags:
  - hub
  - code-sign
  - firmware
task_tags:
  - firmware-update
  - code-sign
  - sop
authority_level: deprecated
is_deprecated: true
category: hub
notion_id: c2f60ef2-1570-43f6-a2e3-1ccef25aec2d
notion_url: >-
  https://www.notion.so/GL-Hub-Code-Sign-Recovery-Flow-c2f60ef2157043f6a2e31ccef25aec2d
notion_updated_at: '2026-01-21T09:57:00.000Z'
exported_at: '2026-04-06T13:10:40.057Z'
is_summarized: false
relations: []
---

## GL3523 Recovery Case
### GL3523 Boot Code Load 優先權
- Bank 1 優先權最高 ， Boot Code Load Firmware不會判斷兩塊Bank 的Firmware Version
- 除非 Bank 1 為 Mask Code ，否則 Boot Code 不會Load Bank 2 Firmware
因應上面條件，所以Recovery Case 都會根據上述條件做判斷
- 保證 兩塊 Bank 都存在Firmware ，所以會先update Mask Code 那塊 Bank 
- 保證 Bank 1 的 Firmware Version 是最新的 ，一定會把最新版的 Firmware 放到 Bank 1
- 兩塊Firmware Version 相同時，update Bank 1
- 在Case 4 & Case 6 狀態，先詢問hub firmware Bank 2 的 CRC是否是正確的，如果是正確的就把Bank 1 的保護關閉，把Bank 2 的保護打開，然後update Bank 1
---
## GL3525 Recovery Case
### GL3525 Boot Code Load 優先權
- Boot Code Load Area Firmware會判斷兩塊Area 的Firmware Version ，會跑最新版本的 Firmware Version，如果兩塊版本都一樣的話，會跑Bank 1
因應上面條件，所以Recovery Case 都會根據上述條件做判斷
- 保證 兩塊 Area 都存在Firmware ，所以會先update Mask Code 那塊 Bank
- 永遠 update Firmware Version 最舊的那塊 Bank
- 兩塊Firmware Version 相同時，會update Firmware 沒有跑的那塊，也就是Bank2
## GL3590 Recovery Case
### GL3590 Boot Code Load 優先權
- Boot Code Load Area Firmware會判斷兩塊Area 的Firmware Version ，會跑最新版本的 Firmware Version，如果兩塊版本都一樣的話，會跑Bank 1
因應上面條件，所以Recovery Case 都會根據上述條件做判斷
- 保證 兩塊 Area 都存在Firmware ，所以會先update Mask Code 那塊 Area
- 永遠 update Firmware Version 最舊的那塊 Area
- 兩塊Firmware Version 相同時，會update Firmware 沒有跑的那塊，也就是Bank2
### Force all Mode (GL3525 & GL3590 only)
- Force all mode 主要功能為降版用，因為boot code 會跑Firmware 版本最大的Bank，如果降板時只update 其中一塊，版本還是無法變更，下面流程為後續討論出來的防堵流程，讓Hub Firmware 回到mask code 的機率降低
1. ISP Tool 會先update Hub Firmware 沒有跑的那塊，也就是Bank 2(如果這時候ISP Tool 去Update Bank 1 ， Hub Firmware 會阻擋ISP Tool Update 並回傳錯誤)
1. ISP Tool Update 完畢後Hub Firmware 會再去計算一次Bank 2 的 CRC ，並回傳給ISP Tool 成功與否
1. Hub Firmware 計算 Bank 2 CRC 正確後會把Bank 1 的保護關閉，並且把Bank 2 的保護打開，讓ISP Tool 可以update Bank 1 
1. ISP Tool Update 完畢後Hub Firmware 會再去計算一次Bank 1 的 CRC ，並回傳給ISP Tool 成功與否
### 註解
- 新版Hub Firmware 可以透過Tool String 知道 Hub & HostBridge 目前是跑在哪一塊，ISP Tool 會根據此資訊把Firmware Update 到 未執行的那塊Bank
- 新版Hub Firmware 會防堵 ISP Tool Update 目前在跑的那一塊
### 測試流程：
- Case 1
1. 燒Bank2 成功, 再燒Bank 1 成功 (PASS)   (正常燒錄方式)
1. 先燒 Bank 1 hub fw會擋住 (PASS)
1. 燒Bank 2 燒壞了, 再燒 Bank 1 會擋住 (PASS)
1. 燒Bank 2 成功, 再燒Bank 2 會擋住 (PASS)

- Case 2
1. 燒Bank 1 成功, 再燒Bank 2 成功 (PASS)   (正常燒錄方式)
1. 先燒 Bank 2 會擋住 (PASS)
1. 燒Bank 1 燒壞了, 再燒 Bank 2 會擋住 (PASS)
1. 燒Bank 1 成功, 再燒Bank 1 會擋住 (PASS)
- Case 3
Master
Slave

downgrade 8310
1. 燒Bank 2 成功, 再燒Bank 1 成功 (PASS)
1. 先燒 Bank 1 會擋住 (PASS)
1. 燒Bank 2 燒壞了, 再燒 Bank 1 會擋住 (PASS)
1. 燒Bank 2 成功, 再燒Bank 2 會擋住 (PASS)

- Case 4
Master
Slave
downgrade 8309
1. 燒Bank 1 成功, 再燒Bank 2 成功 (PASS)
1. 先燒 Bank 2 會擋住 (PASS)
1. 燒Bank 1 燒壞了, 再燒 Bank 2 會擋住 (PASS)
1. 燒Bank 1 成功, 再燒Bank 1 會擋住 (PASS)

