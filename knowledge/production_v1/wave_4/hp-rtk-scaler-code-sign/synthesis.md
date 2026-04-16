# HP RTK Scaler Code Sign 文件


## 如何判斷 SW 或 HW Code Sign

- `[Scaler]` 區塊定義了各型號 Scaler 對應的型號代號
- `[RTD2778]`、`[RTD2788]`、`[RTD2798]` 等區塊則定義了不同型號 Scaler 的簽章方式和解除 Write Protect 的參數

程式會根據 Scaler 韌體檔案的檔名，找到對應的 INI 設定，並依此決定使用 SW 或 HW 簽章的流程。

- SW 簽章: 會有兩個檔案，一個是 `.bin` 檔案，另一個是 `.bin.sig` 簽章檔案。
- HW 簽章: 只有一個 `.bin.sig` 檔案，包含了韌體和簽章資訊。

- [未有直接 Source 錨點，待確認] Header: 目前都是 "ZSTR" 字串，但未來可能會變更
- [未有直接 Source 錨點，待確認] Version: 目前都是 0，用途不明
- User Type: 目前內容不一致，用途不明
- Key Length: 簽章金鑰的長度
- Signature Length: 簽章資料的長度，SW 簽章時為 0
- Key Data: 簽章金鑰資料
- Signature Data: 簽章資料，僅 HW 簽章有此欄位

1. Flash Key: 從 Flash 中讀取的金鑰，用於驗證 `.bin.sig` 簽章。
2. Bin Key: 從 Bin 檔案讀取的金鑰，需要寫入 Flash 作為下次驗證用。

HW 簽章的流程相對簡單，金鑰和簽章資訊都是從 Bin 檔案讀出，寫入 Flash 特定位置後由 Scaler 自行驗證。

燒錄流程的最後兩個步驟是 Reset MCU 和 New Differ Bank After ISP。

Reset MCU 後會造成 Hub 斷電，此時 FW 會進行簽章驗證。驗證時間與 Bin 檔大小有關，程式需要在 Reset MCU 後等待足夠長的時間 (Bank 數 x 1.5 + 10 秒)，讓 FW 完成驗證。

New Differ Bank After ISP 則是用來取得驗證結果，只有在驗證成功時才算完成整個燒錄流程。

[Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](https://www.notion.so/Bu5-Spec-82cc386663974de58c65b57ea7ebffc0#1ff6387a0f6649e3a50c034cf23f2584)
[3rd party code signing specification (ECDSA)](https://www.notion.so/Bu5-Spec-82cc386663974de58c65b57ea7ebffc0#b7d7d4a7d1e14d4f9f4d4a5f0d4d4a5)
[3rd party code signing specification (ECDSA)(EN)](https://www.notion.so/Bu5-Spec-82cc386663974de58c65b57ea7ebffc0#b7d7d4a7d1e14d4f9f4d4a5f0d4d4a5)