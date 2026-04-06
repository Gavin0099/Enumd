---
title: HID Code Sign 記錄
category: code-sign
notion_id: f01a9f3e-ae43-4404-901e-e1631d35d2e3
notion_url: 'https://www.notion.so/HID-Code-Sign-f01a9f3eae434404901ee1631d35d2e3'
notion_updated_at: '2026-01-21T09:13:00.000Z'
exported_at: '2026-04-06T11:28:34.320Z'
is_summarized: false
---

### Update Protocol
- HID update flow
- Vendor Command 第二碼
- HID 預設只使用 2.0
### Tool & Test
- file:///\\genesyslogic.com.tw\GenesysData\SW_Release_New\Hub\HID\Tool
- 驗證
### 執行中
- Release Tool
- 請SE確認各OS有沒有自動喚醒 device。
- HID 驗證 USB LOGO 問題。
- 整理 chip function list，用表格列出各 chip 機制的不同。
HID 速度問題。
- FW UPD 已經是 open source 了，但 SW 目前 Build 不起來，無法測試。
### 待討讑
- GL3590
- Tool 在 chrome book上應該可以直接執行、更新，SW 會再討論如何測試、驗證。
- SW需要討論一下 ISP tool 在燒錄時，需要明顯提示是使用 filter driver 還是 HID。
- 檢查不同 OS 平台（ex：mac, linux, chrome book）。
### 已驗證 & 解決
2021/11/05 HID 會把重抓到的 device 當成不同個
2021/11/05 OS 有時認不到裝置，裝置管理員上顯示驚嘆號
2021/11/05 Scaler update 在 set report 時 ，會有 data 沒有傳下去的問題
2021/11/05 Scaler update 在 write command 時速度慢
2021/11/05 驗證資料時出錯（ISP_ERR_VERIFY_DEVICE）
2021/11/05 程式閃退
2021/11/08 驗證資料時出錯（ISP_ERR_SEND_COMMAND）
2021/11/19 請 MTK 導入 Hardware CRC 的機制（被拒絕）。
Google 在 ISP 相關。
HP ISP Tool ( HID ) 預設只使用 2.0
### 會議記錄
2021/12/17 HP ISP Tool 
