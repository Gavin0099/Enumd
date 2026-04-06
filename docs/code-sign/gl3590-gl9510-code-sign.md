---
title: GL3590  & GL9510 Code Sign
category: code-sign
notion_id: 7b00cce9-f0e0-4db9-a363-f7ce105dd208
notion_url: 'https://www.notion.so/GL3590-GL9510-Code-Sign-7b00cce9f0e04db9a363f7ce105dd208'
notion_updated_at: FORCE_REFRESH
exported_at: '2026-04-06T11:19:28.332Z'
is_summarized: false
---

Hub OV2 Code Sign & Verify 方式
有全部的功能
- 燒錄時 fw code sign驗證
- boot 時 mask code 驗證 燒錄進去的 ram code 合法性，合法的才 boot ，反之跳回mask code
1.Sign (IKV Tool)
透過ECDSA private key 把 bin 檔 sign過，但是特別點是，會從mask code 抓一段資料塞到 bin檔裡面sign過，流程如下
- ramdom 挑出要塞進去 firmware bin檔的資料，計算方式: 0x280 + (ramdom index * 0x40)
- 把 index 和 length 放在之前checksum offset 位置並作 XORM 0x55
- 整個sign 過 bin 檔的格式如下
* Public key & SIgs & Sigr要做 Reverse
2.Verify
- 判斷ToolString MaskID 為 GL7423
- 判斷ToolString Bonding & 0x40 = 0x00
- 做Hub verification利用Tool String 做亂數跟Firmware做比較，確定後 CodeSign Flag 為 TRUE
- CodeSign Flag 為 TRUE 時，command 變成 :
- WriteXrom
Hub OV1 Code Sign & Verify 方式
只有部分的功能
- 燒錄時 fw code sign驗證
- boot 時用舊的方式只計算 check sum 是否正確，並不會像OV2用ECDSA Code Sign 驗證
1.Sign (IKV Tool)
透過ECDSA private key 把 bin 檔 sign過，流程如下
- 整個sign 過 bin 檔的格式如下
2.Verify
- WriteXrom
