
# HP Command Line Tool 的記錄方法


1. 在 Command Line Tool 的資料夾中打開 GLHub.ini 檔案。
2. 將 `EnableLog = 1` 設定為開啟記錄功能。[`Open GLHub.ini in the command line Tool folder —> EnableLog = 1`]


3. 執行 Command Line Tool。[`Execute command line Tool`]
4. 在 Command Line Tool 的資料夾中打開 Log 資料夾。[`Open the Log folder in the command line Tool folder`]
5. 複製 Log 資料夾中的記錄檔供分析使用。[`Copy the log file inside and let us analyze`]


根據提供的相關內容, Command Line Tool 的記錄檔可能包含以下資訊:

- 呼叫 SDK 中各個 API 的狀態資訊
  - `HPFI_Initialize()`
  - `HPFI_GetPackagedFirmwareInfo()`
  - `HPFI_GetInstalledFirmwareInfo()`
  - `HPFI_Install()`
  - `HPFI_Finalize()`
- 離線更新 (Stage Firmware) 的相關資訊

## 記錄檔位置與開啟 Debug Log

根據提供的內容,記錄檔位置是在 Command Line Tool 的 Log 資料夾中,但是否有特定的命名規則或是開啟 Debug Log 的方式並未明確說明。這部分可能需要進一步確認或是依照專案需求自行決定。

