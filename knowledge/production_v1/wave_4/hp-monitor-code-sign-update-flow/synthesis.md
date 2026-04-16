
# HP Monitor Code Sign Update Flow

## ISP Tool 與 Hub Firmware 初始化交握機制
1. ISP Tool 是否通過 Hub Firmware 的認證。
2. Hub Firmware 是否通過 ISP Tool 的認證。

1. 使用 `bcdDevice` 和 `ToolString` 裡面的 `Firmware Info Tool String` 作為參數。
2. 取出 `bcdDevice` 的兩個位元組並做 XOR 運算。
3. `Firmware Info Tool String` 會隨機產生一組 `Start Range` 和 `Stop Range`，然後與 `bcdDevice` 產生出來的值再做 XOR 運算。
4. `uValue`: 將 `Stop` 放高位、`Start` 放低位的範圍組合。
5. `uIndex`: 將 XOR 結果放高位，加上固定值 `0x01`。
6. 使用 `uValue` 和 `uIndex` 傳送至 Hub Firmware 進行驗證。如果返回值 `uRetVal != 1`，表示驗證失敗。

1. **HP Hw Check Code Signed**
   - 因為 GL3523 沒有 Security Module，所以必須透過 scaler 驗證 code sign。
2. **HP Sw Check Code Signed**
   - GL3523 使用此模式，在此模式下連 scaler 都沒有 Security Module，所以必須透過 Tool 來驗證 code sign。
3. **HP Code Signed Slave**
   - 此模式下必然會有兩層以上的 Hub，另外一層 Hub 會是 `HP Hw Check Code Signed` 或 `HP Hub Check Code Signed`，驗證方法不一樣。
4. **HP Hub Check Code Signed (ECDSA)**
   - 主要為 GL3590 驗證方式，因為 GL3590 有 Security Module，可以自己(Hub)做驗證。

## HP Hw Check Code Signed update Flow
在 update 前會傳送 public key 給 hub，當 update 到最後兩筆資料時會傳送 hash & signature 給 Hub，讓 Hub 傳送給 scaler，由 scaler 驗證是否成功。若失敗，最後兩筆資料就不 update，update data 不完整，hub 啟動時就不會跑這一塊。成功的話則繼續 update 流程。

可參考下圖流程中的 `Send Hash & Signature` 和 `Get Hub authorization` 步驟。

## HP Sw Check Code Signed
在 load bin file 時就會送給解密 Tool 做驗證，驗證失敗就不做 update，成功的話就正常 update。詳細作法可參考下圖。

## HP Code Signed Slave
會根據另外一層 Hub 的 code signed mode 來決定 code signed flow:
1. **HP Hw Check Code Signed update Flow**
   - 驗證方式類似，只是在 `Send Hash & Signature` 和 `Get Hub authorization` 這邊是送到 `HP Hw Check Code Signed` 的那層 Hub 給 scaler 做驗證。
2. **HP Hub Check Code Signed**
   - 會在 `HP Hub Check Code Signed` 一併說明。

## HP Hub Check Code Signed (ECDSA)
有兩種方式，驗證方式都是會傳給有 Security Module 的 Hub 做驗證，只是流程不一樣。

### 原本 Hub 就有 Security Module (GL3590)
1. `40 ac 00 00 00 00 00 00`: 啟用 SHA256 引擎
2. `c0 a2 00 00 00 00 40 00`
3. `c0 a2 00 00 40 00 40 00`
5. `c0 a2 00 00 c0 8f 40 00`
6. `40 ac 0b 04 09 00 00 00`: 傳送 Hash 長度: 4K
7. `40 ac 0b 00 00 00 20 00`: 傳送 Hash 資料
8. `c0 ac 0b 02 00 00 20 00`: 讀取 Digested Data 作測試
9. `c0 ac 0c 02 00 00 40 00`: 讀取 Signature 作測試
10. `c0 ac 0c 01 00 00 40 00`: 讀取 Public Key 作測試
11. `c0 ac 0b 00 00 00 01 00`: Firmware 回傳 hash 比較結果
12. `40 ac 00 00 00 00 00 00`: 啟用 SHA256 引擎
13. `c0 a2 00 00 00 00 40 00`
14. `c0 a2 00 00 40 00 40 00`
16. `c0 a2 00 00 c0 8f 40 00`
17. `40 ac 0b 04 09 00 00 00`: 傳送 Signature 長度: 4K
18. `40 ac 0c 02 00 ff 00 00`: 提供 Firmware Public Key
19. `40 ac 0c 01 00 00 40 00`: 傳送 Signature 資料
20. `c0 ac 0c 01 00 00 40 00`: 讀取 Public Key 作測試
21. `c0 ac 0b 02 00 00 20 00`: 讀取 Digested Data 作測試
22. `c0 ac 0c 02 00 00 40 00`: 讀取 Signature 作測試
23. `c0 ac 0c 00 00 00 01 00`: Firmware 回傳 hash 比較結果

### 原本 Hub 沒有 Security Module (GL3523)
流程跟 GL3590 驗證方式差不多，不一樣的地方為，當 update 後，要把 data 送到有 Security Module 的 Hub (GL3590) 做驗證，所以除了第一步是傳給 GL3523 update data 之外，其他 command 都是傳給 GL3590。

### 原本 PD 沒有 Security Module (GL9511)
hash 應該是不用驗，所以去掉此步驟，其他跟 GL3523 驗證方式差不多，當 update 後，要把 data 送到有 Security Module 的 Hub (GL3590) 做驗證，所以除了第一步是傳給 GL3523 update data 之外，其他 command 都是傳給 GL3590。

[Camera 透過我們驗證 code sign](code-sign/camera-透過我們驗證-code-sign.html)
[Code sign Flow](code-sign/code-sign-flow.html)
[eToken 安全簽章系統技術說明](code-sign/etoken-安全簽章系統技術說明.html)