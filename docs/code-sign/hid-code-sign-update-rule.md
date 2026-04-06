---
title: HID Code Sign Update Rule
category: code-sign
notion_id: 33e33bcf-c850-4314-9d00-b9174d82bb75
notion_url: >-
  https://www.notion.so/HID-Code-Sign-Update-Rule-33e33bcfc85043149d00b9174d82bb75
notion_updated_at: '2026-02-11T08:13:00.000Z'
exported_at: '2026-04-06T11:19:59.413Z'
is_summarized: false
---

## Protocol
- 驗證方式只存在GLbinTool 以及 FW本身，ISP Tool只有做update data 動作
- 不同Model 不能互燒
- Flash 內沒有 signature 時，在ISP時要先用 Vender command 送。
- Vendor Command 
- 不能 run 的 code 不能留在裡面。
## HP ISP Flow
- 說明
- HID Code Sign Bin Format
- HID Code Sign Bin Format (GL9511)
### Version 2.0
- ISP Command ：Tool 會指定 Address 與長度並將整份檔案送下去，FW 需自己分析各資料位置。
## 驗證方式
- 驗證 Public Key & Signature
