---
title: Lenovo Code Sign 交握流程
category: code-sign
notion_id: 994405b0-04d7-40f8-be83-112eaa1ba511
notion_url: 'https://www.notion.so/Lenovo-Code-Sign-994405b004d740f8be83112eaa1ba511'
notion_updated_at: '2026-01-21T09:41:00.000Z'
exported_at: '2026-04-06T11:24:45.447Z'
is_summarized: false
---

## 演算法
### 所需參數
1. Session Key
1. Model name(LNV_T24I40_0000)
1. CRC 演算法
### 演算法流程
1. Host PC(Uniupdate Tool) 傳送 Session Key 給 Monitor Controller(Hub)
1. Monitor Controller(Hub) 使用 Session Key & Model name 透過 crc function 產生一組 signature
1. Monitor Controller(Hub) 傳送計算好的signature 給 Host PC 驗證
1. Host PC(Uniupdate Tool) 也使用 Session Key & Model name 算好signature 給Monitor Controller(Hub) 驗證
1. 如果Host PC(Uniupdate Tool) 和 Monitor Controller(Hub) 都驗證 signature 成功就代表交握成功
## 備註
1. 使用Model name的交握可以確定CRC計算能力的一致性，以及Update的目標裝置是否正確。
1. Lenovo Uniupdate流程中，取得session key之後的每筆command，Tool都會計算CRC signature，Hub FW也可依照接收到的signature及ultra data(FW bin data)來驗算signature，以此可以確保Command及FW bin檔傳送時的安全性。
1. Hub都是燒錄在非running bank的那一塊。EX: 現在run bank1，就update FW在bank 2。
1. Hub燒錄時，要可以判斷bonding和check sum等等，並依此回應是否燒錄成功
1. Hub會加入nack error code來標記ISP Fail在哪個階段，目前僅做為內部使用

