

- 在 Z-Drive 資料夾中建立一個唯讀的基礎資料夾 (Base folder)，包含必要的 exe/dll/driver 檔案

## 2. 複製基礎資料夾到發行資料夾
- 根據使用者的需求，將基礎資料夾複製到發行資料夾 (Release folder)

- 瀏覽並選擇各種裝置晶片的韌體二進位檔案 (FW bin files)，並將它們複製到發行資料夾
- [未有直接 Source 錨點，待確認] 自動編輯 INI 檔案中的資訊

- [未有直接 Source 錨點，待確認] 自動檢查發行資料夾中的資料或檔案是否與 INI 檔案中的資訊一致
- [未有直接 Source 錨點，待確認] 自動執行發行的 exe 檔案來測試 (需要連接測試裝置)


- [未有直接 Source 錨點，待確認] 掃描所有 Hub 的工具字串資訊
- [未有直接 Source 錨點，待確認] 掃描 Scaler 的所有公開資訊

  - FW bin 檔案是否存在且命名正確
- 檢查 Hub 和 Scaler 之間的驗證模式是否匹配
- 檢查要更新的 Hub 和 Scaler 韌體的公鑰驗證

- [未有直接 Source 錨點，待確認] 執行多次 I2C 穩定性測試和查詢命令


1. [`eToken 安全簽章系統技術說明`](./etoken-安全簽章系統技術說明.html)中介紹了 eToken 系統的整體架構和簽章流程。
2. [`HID Code Sign 記錄`](./hid-code-sign-記錄.html)中記錄了 HID 韌體更新的相關協議、工具和測試情況。
3. [`HP OCI DLL`](./hp-oci-dll.html)介紹了 HP 定義的 DLL 格式及其使用方式。