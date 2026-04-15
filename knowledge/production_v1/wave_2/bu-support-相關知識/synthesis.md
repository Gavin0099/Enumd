[未有直接 Source 錨點，待確認] 以下是 'BU Support 相關知識' 的綜合報告:

# BU Support 相關知識

[未有直接 Source 錨點，待確認] 本報告將根據提供的上下文邊界,合成 'BU Support 相關知識' 的核心內容。

## 1. Support Chip 資料
Support Chip 是指用於支援主控制器(MCU)的輔助晶片,通常包含以下功能:

Support Chip 的具體實現會因應不同的應用場景而有所不同。

## 2. Flash 存取相關知識
Flash 記憶體是一種非揮發性記憶體,常用於儲存韌體(Firmware)、配置參數等資料。存取 Flash 記憶體需要注意以下事項:
- 讀取 Flash 資料時,需要確保資料的完整性和正確性 `[Code sign Flow](code-sign/code-sign-flow.html)`
- 更新 Flash 資料時,需要遵循安全的更新流程,以防止韌體被破壞 `[HID Code Sign Update Rule](code-sign/hid-code-sign-update-rule.html)`
- [未有直接 Source 錨點，待確認] 某些 Flash 記憶體可能有特殊的存取限制或保護機制,需要瞭解並遵守

## 3. Hub ISP Flow
Hub ISP (In-System Programming) Flow 描述了透過 Hub 晶片進行韌體更新的流程,主要包括:
1. 驗證更新資料的合法性 `[Camera 透過我們驗證 code sign](code-sign/camera-透過我們驗證-code-sign.html)`


## 4. PD ISP Flow
PD ISP (In-System Programming) Flow 描述了透過 PD (Power Delivery) 晶片進行韌體更新的流程,與 Hub ISP Flow 類似,主要包括:

[未有直接 Source 錨點，待確認] PD 晶片通常負責電源管理,因此其韌體更新流程也需要特別注意電源相關的安全性。

Code flow 描述了韌體程式碼的執行流程,包括:

Code flow 的設計需要考慮效能、穩定性和安全性等因素,確保韌體能夠正確運行。

## 6. Third chip ISP Flow
除了 Hub 和 PD 之外,有時還會有其他輔助性的第三方晶片,它們也可能需要進行獨立的韌體更新。第三方晶片的 ISP Flow 通常會遵循類似的步驟:

