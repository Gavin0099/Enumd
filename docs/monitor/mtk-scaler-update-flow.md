---
title: MTK Scaler Update flow
domain_tags:
  - hub
  - monitor
  - tools
  - security
task_tags:
  - firmware-update
  - spec
  - sop
  - config
authority_level: source
is_deprecated: false
category: hub
notion_id: c2e85e39-91b1-40ff-9a4d-cc4a2f95c771
notion_url: 'https://www.notion.so/MTK-Scaler-Update-flow-c2e85e3991b140ff9a4dcc4a2f95c771'
notion_updated_at: '2026-01-21T09:22:00.000Z'
exported_at: '2026-04-06T13:14:35.645Z'
is_summarized: false
relations: []
---

此簡介主要根據MTK 的update 文件(HP Digutal signature for Hub ISP rule) 做說明，最新版的spec 如下連結
---
## Scaler head Format
所有的update 資訊都會放在這個Head Format 裡面，可參考下面截圖
每個參數詳細的定義在HP Digutal signature for Hub ISP rule page 7 ~ page 10 ，請自行參考，這邊列出比較需要注意的參數
1. [0x80 - 0x85] : Configuration Setting 
1. [0x86 - 0x89] : 2nd Image Programing address.
1. [0x8A - 0x8D] : Public key address.
---
## Scaler Old Recovery Update flow
### Low Level Recovery flow 
沒有Recovery update flow ，直接update到 0x00位置
- Get Scaler Pubkey from DDCCI
- Special protect flash address 0x7A000 ~ 0x7FFFF area.
- Fix programming address to zero
###  High Level Recovery flow
Tool 會去 Search scaler flash address  0x10000 / 0x20000 / 0x30000 - 0x20 的字串 "MSVC0000S3" ，找到這個字串後，往後面找0x20 位置的資料
為 start offset ，計算方式為 ALIGN_64K((start offset + (0x04 + 0x100 + 0x212)))
將bin檔資料update到這個offset
- Search scaler flash address 0x10000/0x20000/0x30000 - 0x20 have “MSVC0000S3” key word to find out sboot size.
- Read bin size from flash address sBoot size + 0x20;
- Calculation 2nd image address = ALIGN_64K(((*(U32 *)((U32)_sboot_end+0x20))+(0x04+0x100+0x212)));
- FW update full bin begin on 2nd image address
---
## Scaler New Recovery Update flow
scaler 有分為 high level(MST9U) ，Low Level (TSUMXXX) 
### Low Level Recovery flow 
Low Level Recovery flow 會update到特定位置，主要是根據Scaler head Format 裡面的[0x86 - 0x89] : 2nd Image Programing address. 來決定要update到哪個offset 
###  High Level Recovery flow
流程為Tool 會去 Search scaler flash address 0x100000 / 0x200000 / 0x300000 - 0x20 的字串 "MSVC0000S3" ，找到這個字串後
- sBoot size + 0x70 ~ 0x77 —> FW date
- sBoot size + 0x7B ~ 0x7D —> FW Version
根據fw data 和 fw version 來判斷要update 在哪個offset ，詳細flow可以參考下面截圖
---
## 新版本的scaler Recovery update flow
因應High Level 如果support Dual image turn 在連續update fail 後會導致 Monitor 開不了機的問題，改成 read DUT boot area(1st/2nd) to decide programming address
之前下command 都是透過Hub 做的 interface api 來下command ，後來 Hub fw 有定義了自訂義command ，可以根據GenesysLogic Hub Vendor Command 裡面的 2.6. MStar ISP and Calibration Command 來對scaler 下command ，command 如下截圖紅框
GenesysLogic to Scalar I2C communcation apn 文件如下
scaler i2c command 如下截圖
根據get 到的scaler boot area update 到另一區塊
eg : get  scaler boot area = 0 —> update到 area 1
---
因應原本Scaler Fw Version 是 LCD flat panel Version ，所以HP 需要一個正式的Fw Version ，詳細文件可以參考下面文件

HP D&A Firmware Versioning v1.1
所以MTK 新增了兩個command ，如下圖
Firmware Packet version
Firmware Packet date
根據這兩個command 和 Head 檔中也有 Fw Packet version & Fw date ，比較後再決定要不要update，如下圖 update flow (Note 1)
