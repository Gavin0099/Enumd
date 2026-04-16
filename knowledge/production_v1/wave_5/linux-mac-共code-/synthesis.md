
# Linux & Mac 共用程式碼 (Linux & Mac Shared Code)

## 目前狀況 (Current Status)
- Neville 提供的 Mac 原始碼可以成功建置並進行除錯 ([Neville's Mac Source Code](path/to/neville-mac-source-code))
- 分析 Linux 和 Mac 之間的差異
- 嘗試使用這份程式碼與原有的 Mac 框架整合以取得 GitHub FW 版本資訊
- [未有直接 Source 錨點，待確認] 導入基本功能 (版本、清除、ISP、傾印、重置、資訊等) ([Basic Functionalities](path/to/basic-functionalities))
- 統一 Linux 和 Mac 的資料夾結構
- 透過 CMake 產生 Xcode 專案檔 ([CMake Integration](path/to/cmake-integration))
- 建置成 Framework 或 DLL 檔案供其他 Mac GUI 工具使用 ([Framework/DLL Build](path/to/framework-dll-build))

1. 製作 DLL ([DLL](path/to/dll))

- Hub FW Update CLI ([Hub FW Update CLI UML](path/to/hub-fw-update-cli-uml))

## Change for Better
## Linux 程式碼比對 (Linux Code Comparison)
1. CodeSign -> Hub 底下只有 .h 檔案 ([CodeSign -> Hub](path/to/codesign-hub))
1. CodeSign -> Scaler 底下只有 .h 檔案 ([CodeSign -> Scaler](path/to/codesign-scaler))
1. CodeSign -> CodeSignVerify 沒有 .h 檔案 ([CodeSign -> CodeSignVerify](path/to/codesign-codesignverify))
1. Scaler 資料夾只有 .h 檔案 ([Scaler Folder](path/to/scaler-folder))

## 相關內容 (Related Context)
本節將說明 Linux & Mac 共用程式碼與其他相關主題之間的關係。

### Camera 透過我們驗證 Code Sign
- 產生 ECDSA 金鑰並簽署 ([Generate ECDSA Key and Sign](path/to/generate-ecdsa-key-and-sign))
- 告知如何清除 Camera 的方式 - 驗證失敗時需要清除 ([Erase Camera](path/to/erase-camera))
- 告知如何讀取 Camera 資料 - Hub 安全模型必須能讀取更新資料才能計算雜湊值 ([Read Camera Data](path/to/read-camera-data))
- 可以改成告知我們所有的更新流程以及相對應的文件，讓我們控制整個更新過程 ([Update Flow and Documentation](path/to/update-flow-and-documentation))
- 下圖為 Hub Code Sign 驗證流程，驗證 Code Sign 應該由工具控制，韌體不需要做任何改變，但仍需要俊太確認 ([Hub Code Sign Verification Flow](path/to/hub-code-sign-verification-flow))

### Code Sign Flow
- Genesys Logic 的 Code Sign 概述
- [未有直接 Source 錨點，待確認] 目前的做法是將 bin 檔案轉換為雜湊值，然後使用私密金鑰對雜湊值進行簽署以產生簽章 ([Firmware Signing](path/to/firmware-signing))
  - 將韌體 bin 資料、簽章和公鑰傳送給安全模組，讓安全模組使用公鑰解密簽章並產生雜湊值，再與韌體 bin 資料產生的雜湊值進行比對，以決定韌體 bin 是否合法 ([Firmware Update and Verification](path/to/firmware-update-and-verification))
- Code Sign 的方法有以下幾種:
  - OpenSSL ([OpenSSL](path/to/openssl))
  - Token ([Token](path/to/token))
  - HSM (Hardware Security Module) ([HSM](path/to/hsm))
- 根據 HP 規定，需要符合 FIPS 140-2 Level 3 以上的標準，因此至少需要使用 Token 來實現 Code Sign 功能 ([FIPS 140-2 Level 3](path/to/fips-140-2-level-3))
- Genesys Logic 目前使用的 Code Sign 演算法為 ECDSA nistp256 ([ECDSA nistp256](path/to/ecdsa-nistp256))

### HID Code Sign Update Rule
- [未有直接 Source 錨點，待確認] 驗證方式只存在於 GLBinTool 和韌體本身，ISP 工具只負責更新資料的動作 ([Verification Process](path/to/verification-process))
- [未有直接 Source 錨點，待確認] 不同型號之間不能互相燒錄 ([Model Compatibility](path/to/model-compatibility))
- 當 Flash 內沒有簽章時，在 ISP 時需要先使用廠商指令送入 ([Signature Handling](path/to/signature-handling))
- 不能執行的程式碼不能留在裡面 ([Executable Code](path/to/executable-code))
- HP ISP 流程說明 ([HP ISP Flow](path/to/hp-isp-flow))
- HID Code Sign Bin 格式 ([HID Code Sign Bin Format](path/to/hid-code-sign-bin-format))
- 驗證方式: 驗證公鑰和簽章 ([Verification Process](path/to/verification-process-2))