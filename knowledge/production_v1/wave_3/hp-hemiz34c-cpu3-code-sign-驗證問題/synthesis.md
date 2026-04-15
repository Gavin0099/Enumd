以下是基於提供的內容所撰寫的 HP Hemi(Z34c) CPU3 Code Sign 驗證問題的技術報告:

## HP Hemi(Z34c) CPU3 Code Sign 驗證問題

除了 GL3590 有硬體安全模組外，其他 hub chip 是沒有的。HP 規定最低要求只能使用韌體 (FW) 進行 code sign 驗證。因此討論後決定以 GL3525 為範例進行驗證,因為 GL3525 有三個 CPU,在 hub 更新後可以使用其他 CPU 來驗證 code sign。

1. 原本使用額外的 hex 檔案來驗證 public key 和簽名,現在必須改用 etoken 簽署過的檔案進行驗證,但 public key 格式不同。
2. 在某些情況下計算 SHA256 hash 會斷線。
3. 驗證 RSA2048 簽名和 public key 解密後的 hash 都會是 0x00。這是因為 PD FW 只針對 U3 做 code sign 功能,U2 沒有,但原本的工具都預設跑 U2 驗證。
4. 每次回傳的 RSA2048 hash 值都不一致。
5. 更新 bin 檔案是否正確,回傳值都是 PASS。這是因為 PD FW 有問題,需要修改一版就可以正常。
[未有直接 Source 錨點，待確認] 6. RSA2048 的 hash 與其他工具計算的不一致。
7. SHA256 hash 與 RSA2048 hash 不一致。
8. 驗證 code sign 成功後,PD FW 會不見。這是因為初始將 public key 寫在 0x16000 的位置,沒有考慮到需要透過 PD FW 來驗證 code sign 的問題,正在討論 public key 的存放位置。
9. GL3525 每個 Target 都是更新到固定偏移,與原本的 chip (GL3523, GL3590) 更新方式不同,需要修改 GLBin 產生 ROM 檔的方式。

- 計算 SHA256 hash 時間: 25 秒
- 解密 RSA2048 時間: 24 秒

1. 必須使用 U3 來進行驗證 (UUUISP=1)。
2. Public key 和 Signature 需要做反向處理 (代碼中有實作)。
3. 計算 hash 命令長度必須與 hub 大小一致。
[未有直接 Source 錨點，待確認] 4. 需要修改 hash 值的計算算法 (代碼中有實作)。
5. public key 格式需要改成兩個 byte 合成一個 byte (代碼中有實作)。

### 4. SHA256 參考代碼

### 5. 8051 優化代碼


總之,本文詳細分析了 HP Hemi(Z34c) CPU3 Code Sign 驗證過程中遇到的各種問題,並提供了相應的解決方案和參考代碼。希望對您的開發工作有所幫助。