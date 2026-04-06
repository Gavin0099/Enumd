---
title: 'HP Scheduled update flow '
category: general
notion_id: f148b440-3d63-4a52-87aa-1470fbda401d
notion_url: >-
  https://www.notion.so/HP-Scheduled-update-flow-f148b4403d634a5287aa1470fbda401d
notion_updated_at: '2026-01-21T10:00:00.000Z'
exported_at: '2026-04-06T11:23:00.670Z'
is_summarized: false
---

### SW requirement
1. Scaler Update Info，透過 Scaler Bin Head 判斷，Scaler Head 參數如下
1. Scaler flash offset 預設會放
1. Scaler update Info 詳細資訊如下
1. Pd update Info 詳細資訊如下
## Pd Info
1. I2cSlaveAddr - Pd ISP I2C slave address
1. PgWrTime-Page write max time, ms as unit
1. EraseType
1. EraseCmd-Command support for EraseType
1. EraseTime -Erase max time for EraseType, ms as unit
1. ChipBlockCnt - Used to set chip capacity
## Hub Other Info
1. Update data  - Update the data, and only after the scaler confirms that all chips have been successfully updated, move this data to a specific location to meet the scheduled update requirement.
1. Bank Info -  Inform the Hub that the data in the range 0x42000 to 0x4203F belongs to a specific bank of the Hub.
