
## W25X21CL RDID 問題

W25X21CL 和 W25X20 讀取 RDID 的值是一樣的，但 W25X21CL 有 Special Unprotect 功能，因此需要有其他方式來判斷是否為此顆 Flash。因此 W25X21CL 改用讀取 Unique ID Number 來判斷。[`W25X21CL RDID 問題`]

但在實際使用時遇到一個問題，韌體原本是要讀取 4 個 Byte 的 Unique ID Number，但目前只下 3 個 Byte 的指令，導致讀取到的第一個 Byte 可能是 0x00 或 0xFF。[`W25X21CL RDID 問題`]

> **Note:** Firmware Eason 解釋第一個 Byte 為 0xFF 是因為 GL3523 韌體在初始化時有將 data line 設為 GPIO 並 pull high 以節電，所以下指令後才會出現 0xFF。對於 GL3590 韌體，第一個 Byte 應該會是 0x00。[`W25X21CL RDID 問題`]

為了避開這個問題，在 Flash Table 中新增了兩組 W25X21CL，一組 RDID 為 (0x00 0x95)，另一組 RDID 為 (0xFF 0x95)。[`W25X21CL RDID 問題`]


### Etoken System Code View
在 `etoken_dongle_server` 和 `etoken_server` 的程式碼審核中，發現了一些安全性問題，包括：
1. 使用 `detach` 執行緒可能會導致生命週期控制問題。[`Etoken System Code View`]
2. 檔案大小和外部命令執行缺乏邊界控制，存在資源和執行風險。[`Etoken System Code View`]
3. 缺乏針對失敗路徑（超大輸入、shutdown race、協定錯位）的測試證據。[`Etoken System Code View`]
4. 存在 SQL 注入風險和硬編碼密碼的問題。[`Etoken System Code View`]

這些問題與既有的安全模式和反模式有高度重疊，需要進行修正。[`Etoken System Code View`]

### HID Code Sign 記錄
[未有直接 Source 錨點，待確認] HID 更新流程中涉及到一些細節，包括：
1. Vendor Command 的第二碼。[`HID Code Sign 記錄`]
2. HID 預設只使用 2.0 版本。[`HID Code Sign 記錄`]
3. 在不同 OS 平台上可能會出現自動喚醒裝置、驗證 USB LOGO 問題等。[`HID Code Sign 記錄`]
4. 整理各 chip 機制的差異。[`HID Code Sign 記錄`]
5. FW UPD 已經是 open source，但 SW 目前無法正常編譯和測試。[`HID Code Sign 記錄`]

### HP Hemi(Z34c) CPU3 Code Sign 驗證問題
除了 GL3590 有硬體安全模組外，其他 hub chip 都沒有。HP 要求最低只能使用韌體做 code sign 驗證。討論後以 GL3525 為範本進行驗證，因為 GL3525 有三個 CPU，Hub 更新後可以用其他 CPU 來驗證 code sign。[`HP Hemi(Z34c) CPU3 Code Sign 驗證問題`]

1. 公鑰和簽名格式需要修改。[`HP Hemi(Z34c) CPU3 Code Sign 驗證問題`]
2. 在某些情況下計算 SHA256 雜湊值會斷線。[`HP Hemi(Z34c) CPU3 Code Sign 驗證問題`]
3. RSA2048 簽名驗證解密後的雜湊值都是 0x00。[`HP Hemi(Z34c) CPU3 Code Sign 驗證問題`]
4. 每次回傳的 RSA2048 雜湊值都不一致。[`HP Hemi(Z34c) CPU3 Code Sign 驗證問題`]
5. 更新 bin 檔案後，PD FW 會不見。[`HP Hemi(Z34c) CPU3 Code Sign 驗證問題`]
6. SHA256 雜湊值和 RSA2048 雜湊值不一致。[`HP Hemi(Z34c) CPU3 Code Sign 驗證問題`]

最後更新時間約 52 秒，其中 FW 更新 3 秒，SHA256 雜湊計算 25 秒，RSA2048 解密 24 秒。[`HP Hemi(Z34c) CPU3 Code Sign 驗證問題`]
