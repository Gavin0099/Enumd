---
title: 8D report for E22 G4/E23 G4/E24 G4/E24i G4 HP EndUser Tool
domain_tags:
  - monitor
  - firmware
  - tools
task_tags:
  - firmware-update
  - debug
  - release
  - sop
  - config
authority_level: deprecated
is_deprecated: true
category: monitor
notion_id: 4d1c7989-dbe8-486c-941b-5e7f51a0f963
notion_url: >-
  https://www.notion.so/8D-report-for-E22-G4-E23-G4-E24-G4-E24i-G4-HP-EndUser-Tool-4d1c7989dbe8486c941b5e7f51a0f963
notion_updated_at: '2022-03-15T09:29:00.000Z'
exported_at: '2026-04-06T13:17:44.206Z'
is_summarized: false
relations: []
---

## 8D(Eight Disciplines Problem Solving)
### D1 建立問題解決小組
### D2 描述問題
HP E24i EndUser Tool 在update 新版的scaler(TSUM_R2)時，會認為是最新版本直接Skip掉不Update  
### D3 暫時性對策
GetScalerFirmwarePacketVersion() 裡面的判斷式有錯
- 原本:
- 改成 
### D4 找出問題真正原因
HP E24i 因為scaler chip 換了，原本是 TSUM_CD ，後來改成 TSUM_R2 ，原本這個機型是2019 推出的，所以scaler SW version(packet version) 並沒有 Support ，但是scaler chip 改成  TSUM_R2 後連帶著也Support SW version(packet version) 
當初判斷新舊update flow 是透過ini設定的，如下圖設定
但是現在新舊版chip 混合，導致我們沒有辦法透過設定ini參數，後來想到一個辦法，不管TSUM_CDor TSUM_R2都去 Get Firmware Packet version ，因為他有Result code 可以判斷
可是當初改完後只有驗證TSUM_CDchip ，導致出現這個bug. 
### D5 可行性對策的提出
除了不同 scaler chip要驗證以外，也要建立Check list before release tool
### D6 選擇永久對策
Check list before release tool
### D7 執行及驗證永久對策
### D8 防止再發生與標準化
Release 前都必須執行 Check list before release tool
