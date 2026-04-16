以下是關於 'Lenovo offline update flow' 的綜合報告:


## Scaler Update 資訊
Scaler 更新資訊可以透過 Scaler Bin Head 來判斷，其中包含以下參數:

1. **Scaler flash offset**：預設會放在 Scaler Bin 檔案的特定位置。
2. **Scaler Update Info**：詳細的更新資訊如下:
   - Header：通常為 "ZSTR" 字串。[`HP RTK Scaler Code Sign`](path/to/hp-rtk-scaler-code-sign.html)
   - Version：通常為 0，用途尚不確定。[`HP RTK Scaler Code Sign`](path/to/hp-rtk-scaler-code-sign.html)
   - User Type：內容可能不太一致，用途尚不確定。[`HP RTK Scaler Code Sign`](path/to/hp-rtk-scaler-code-sign.html)
   - Key Length：Key 的長度，使用特定算法計算。[`HP RTK Scaler Code Sign`](path/to/hp-rtk-scaler-code-sign.html)
   - Signature Length：簽章的長度，使用特定算法計算。[`HP RTK Scaler Code Sign`](path/to/hp-rtk-scaler-code-sign.html)
   - Key Data：緊接在 Signature Length 後面，長度由 Key Length 決定。[`HP RTK Scaler Code Sign`](path/to/hp-rtk-scaler-code-sign.html)
   - Signature Data：緊接在 Key Data 後面，只有 HW 驗證的檔案才會有。[`HP RTK Scaler Code Sign`](path/to/hp-rtk-scaler-code-sign.html)

## RTK Scaler 資訊
RTK Scaler 的更新流程大同小異，主要差異在於數位簽章的部分。RTK Scaler 有 HW 和 SW 兩種不同的數位簽章方式，一種 Scaler 只會有其中一種。

如何判斷使用哪種簽章方式，可以透過 RTK 提供的指令查詢，或是在程式的 INI 設定檔中預先指定。[`HP RTK Scaler Code Sign`](path/to/hp-rtk-scaler-code-sign.html)

## Lenovo Code Sign 交握流程
Lenovo 的離線更新流程中，在取得 Session Key 之後的每個指令都會計算 CRC Signature，Hub 韌體也會驗證接收到的 Signature 和 FW Bin 資料，以確保指令和韌體檔案的傳輸安全性。[`Lenovo Code Sign 交握流程`](path/to/lenovo-code-sign-交握流程.html)


1. Host PC (Uniupdate Tool) 傳送 Session Key 給 Monitor Controller (Hub)。
2. Monitor Controller (Hub) 使用 Session Key 和 Model Name 透過 CRC 演算法產生一組 Signature。
3. Monitor Controller (Hub) 將計算好的 Signature 傳送給 Host PC 驗證。
4. Host PC (Uniupdate Tool) 也使用 Session Key 和 Model Name 計算 Signature 並給 Monitor Controller (Hub) 驗證。
[未有直接 Source 錨點，待確認] 5. 如果雙方驗證 Signature 成功，則代表交握成功。

[未有直接 Source 錨點，待確認] 這樣的交握機制可以確保 CRC 計算能力的一致性，以及更新的目標裝置是否正確。


1. 透過 Scaler Bin Head 取得 Scaler 更新資訊，包括 flash offset、Key 和 Signature 等。
2. 判斷 Scaler 使用 HW 或 SW 簽章方式，並依此執行相應的更新流程。
3. 在更新過程中，Host PC 和 Monitor Controller (Hub) 會進行 CRC Signature 交握驗證，確保指令和韌體檔案的安全性。
4. Hub 韌體會在非運行 Bank 上進行更新，並能判斷 Bonding 和 Checksum 等狀態，回應更新是否成功。
