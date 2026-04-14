




4. **Evaluation Request: Supporting CFU for Display FW Update via RTOS_USB Hub_Genesys**
   - 需要支援透過 RTOS USB Hub Genesys 進行顯示器韌體更新的功能。


1. **Camera 透過我們驗證 code sign**
   - 需要處理相機韌體的 code sign 驗證流程，包括生成 ECDSA 金鑰、告知如何擦除相機、如何讀取相機資料等。

2. **HID Code Sign 記錄**
   - 記錄工具和測試情況，包括 Release Tool、自動喚醒裝置、USB LOGO 問題、整理 chip function list、HID 速度問題等。
   - 記錄已驗證和解決的問題，如重抓 device 被認為是不同裝置、OS 無法識別裝置、Set Report 資料沒有傳下去、Write Command 速度慢、驗證資料出錯、程式閃退等。

3. **HP Hemi(Z34c) CPU3 Code Sign 驗證問題**
   - 除了 GL3590 有硬體安全模組外，其他 hub chip 沒有，所以必須使用 FW 進行 code sign 驗證。
   - 討論使用 GL3525 作為範本進行驗證，因為 GL3525 有三個 CPU，Hub 更新後可以用其他 CPU 進行 code sign 驗證。
   - 遇到的問題包括 public key & signature 格式不同、計算 sha256 hash 會斷線、rsa2048 hash 值不一致、每次驗證完 PD FW 都會不見等。
   - 最後更新時間約 52 秒，其中 FW 更新 3 秒、sha256 hash 25 秒、rsa2048 解密 24 秒。


1. **Camera 透過我們驗證 code sign** 與 **0326-0330 交接** 的關係:
   - 需要處理相機韌體的 code sign 驗證流程，這是 0326-0330 交接的一部分。

2. **HID Code Sign 記錄** 與 **0326-0330 交接** 的關係:

3. **HP Hemi(Z34c) CPU3 Code Sign 驗證問題** 與 **0326-0330 交接** 的關係:
   - 討論了 HP 產品的 code sign 驗證問題，這也是 0326-0330 交接的一部分。
