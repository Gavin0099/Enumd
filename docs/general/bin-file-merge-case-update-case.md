---
title: Bin file merge case  & Update case
category: general
notion_id: ad331bb3-eb36-4a49-921a-0dc14b6757c8
notion_url: >-
  https://www.notion.so/Bin-file-merge-case-Update-case-ad331bb3eb364a49921a0dc14b6757c8
notion_updated_at: '2023-06-01T03:27:00.000Z'
exported_at: '2026-04-06T11:16:51.132Z'
is_summarized: false
---

# Bin file merge case 
1. Hub + HostBridge  —> ok
1. Hub + BillBoard —> ok
1. Hub + Pd(Share Memory)  —> ok
1. Hub + Pd(I2C)  —>  PD update 到不同Flash
1. Hub + HostBridge + BillBoard —> HostBridge 和 BillBoard 位置 重覆
1. Hub + HostBridge + PD(Share Memory) —> HostBridge 和 PD 位置 重覆
1. Hub + HostBridge + PD(I2c) —> PD update 到不同Flash
1. Hub +  BillBoard + PD(Share Memory) —> BillBoard 和 PD 位置 重覆
1. Hub +  BillBoard + PD(I2c) —> PD update 到不同Flash
1. Hub + HostBridge + BillBoard + PD(Share Memory)  —> HostBridge 和 BillBoard 和 PD位置 重覆
1. Hub + HostBridge + BillBoard + PD(I2c)  —> HostBridge + BillBoard 和 BillBoard 和 PD 位置 重覆
# Update case 
1. Hub + HostBridge  —> ok
1. Hub + BillBoard —> ok
1. Hub + Pd  —> ok
1. Hub + HostBridge + BillBoard —> HostBridge 和 BillBoard 位置 重覆
1. Hub + HostBridge + PD(Share Memory) —> ok
1. Hub + HostBridge + PD(I2c) —> ok
1. Hub +  BillBoard + PD(Share Memory) —> ok
1. Hub +  BillBoard + PD(I2c) —> ok
1. Hub + HostBridge + BillBoard + PD(Share Memory)  —> HostBridge 和 BillBoard 位置 重覆
1. Hub + HostBridge + BillBoard + PD(I2c)  —> HostBridge 和 BillBoard 位置 重覆
