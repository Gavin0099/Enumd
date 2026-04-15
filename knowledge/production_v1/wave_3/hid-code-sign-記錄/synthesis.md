以下是 HID Code Sign 記錄的綜合報告:

# HID Code Sign 記錄

## 更新協議 (Update Protocol)
- Vendor Command 第二碼
- HID 預設只使用 2.0 版本 `[3rd party code signing specification (ECDSA)](3rd-party-code-signing-specification-ecdsa.html)`

## 工具與測試 (Tool & Test)
- 驗證工具位於: `file:///\\genesyslogic.com.tw\GenesysData\SW_Release_New\Hub\HID\Tool`
- 需要驗證各作業系統是否自動喚醒裝置 `[HID Code Sign 記錄](hid-code-sign-記錄.html#執行中)`
- 需要驗證 HID 是否符合 USB LOGO 規範 `[HID Code Sign 記錄](hid-code-sign-記錄.html#執行中)`
- 整理 chip function list，列出各 chip 機制的差異 `[HID Code Sign 記錄](hid-code-sign-記錄.html#執行中)`
- 需要解決 HID 速度問題 `[HID Code Sign 記錄](hid-code-sign-記錄.html#執行中)`
- FW UPD 已經是 open source，但目前無法成功 build 和測試 `[HID Code Sign 記錄](hid-code-sign-記錄.html#執行中)`

- 在 Chrome OS 上直接執行和更新工具 `[HID Code Sign 記錄](hid-code-sign-記錄.html#待討讑)`
- 討論 ISP 工具在燒錄時，需要明確提示是使用 filter driver 還是 HID `[HID Code Sign 記錄](hid-code-sign-記錄.html#待討讑)`
- 檢查不同作業系統平台的相容性 (macOS, Linux, Chrome OS) `[HID Code Sign 記錄](hid-code-sign-記錄.html#待討讑)`

## 已驗證與解決 (已驗證 & 解決)
- 2021/11/05 HID 會把重抓到的 device 當成不同個
- 2021/11/05 OS 有時認不到裝置，裝置管理員上顯示驚嘆號
- 2021/11/05 Scaler update 在 set report 時，會有資料沒有傳下去的問題
- 2021/11/05 Scaler update 在 write command 時速度慢
- 2021/11/05 驗證資料時出錯 (ISP_ERR_VERIFY_DEVICE)
- 2021/11/05 程式閃退
- 2021/11/08 驗證資料時出錯 (ISP_ERR_SEND_COMMAND)
- 2021/11/19 請 MTK 導入 Hardware CRC 的機制 (被拒絕)
- Google 在 ISP 相關
- HP ISP Tool (HID) 預設只使用 2.0 版本 `[3rd party code signing specification (ECDSA)](3rd-party-code-signing-specification-ecdsa.html)`

- 2021/12/17 HP ISP Tool `[HID Code Sign 記錄](hid-code-sign-記錄.html#會議記錄)`

## 與 Code Signing 相關的上下文
本文件的核心主題是 HID Code Sign 記錄，與 Genesys Logic 韌體安全簽署與驗證流程密切相關。


此外，`[3rd party code signing specification (ECDSA)](3rd-party-code-signing-specification-ecdsa.html)` 和 `[3rd party code signing specification (ECDSA)(EN)](3rd-party-code-signing-specification-ecdsaen-.html)` 兩份文件進一步詳述了 Genesys Logic 的程式碼簽署和驗證流程，包括簽署 bin 檔案的格式、使用 OpenSSL 和 eToken 的具體實現方式等。
