---
title: ZEROPLUS_LAP I2c 訊號錄製方式
domain_tags:
  - hub
  - monitor
  - firmware
task_tags:
  - install
  - debug
  - release
  - sop
  - log
  - config
authority_level: source
is_deprecated: false
category: hub
notion_id: a4d6a82b-ea52-4ed3-be30-52e833101359
notion_url: 'https://www.notion.so/ZEROPLUS_LAP-I2c-a4d6a82bea524ed3be3052e833101359'
notion_updated_at: '2026-01-21T09:25:00.000Z'
exported_at: '2026-04-06T13:14:07.335Z'
is_summarized: false
relations: []
---

MTK Scaler 在 溝通時，常常會遇到抓取Bus Hound資料時，還是不能判斷是Hub or Scaler的問題，這時候就必須再抓取i2c 的訊號跟Bus Hound資料做比對，這時候就必須透過 Logic Analyzer要錄 i2c 訊號
錄製流程如下
1.安裝Logic Analyzer (Z:\SW_Release_New\Hub\lac_s31403_all.rar)
2.開啟Logic Analyzer ，開啟設定好的profile檔(i2c.alc)Z:\SW_Release_New\Hub\i2c.alc
3.按照 i2c.alc設定的方式接上線，按照設定的顏色接到指定的位置(請FAE把I2c量測線接出來)
4.選擇完取樣大小和取樣頻率後按下開始鍵即可S
5.如果要抓取比較多筆資料的話要改成如下設定(Sampling size < 2M ，按下壓縮選項)
6..抓取Scaler Fw Version當作範例
Scaler Firmware version 下法如下，紅框的部分就是這次抓到的data
Genesys to Scalar with RT1711 communcation apn V13.pdf
