以下是基於提供的內容所撰寫的 HP OCI APP 文件:


## 1. 最新 SDK 文件 v2.6

### Application 部分

1. **Device DLL 功能**:
   - Device DLL 主要用於與 DMC (Device Management Controller) 進行通訊。
   - 如果產品本身沒有 Device DLL, 可以不需要設定。[R] [新版本文件 v2.6 說明]

2. **檢查 HP 簽章**:
   - 在 OCI 包裝完成後, 會由代工廠送給 HP 進行簽章。
   - 您可以開會討論如何檢查 HP 簽章過的 DLL。
   - 您目前自己開發的工具是如何對 Exe/DLL/Sys 檔案進行 Sha2 簽章的? 是否也透過 HP 進行簽章?[GL] 您目前的工具沒有經過 HP 簽章, 只有對自己的檔案進行 Sha2 簽章。

[未有直接 Source 錨點，待確認] 3. **啟動 APP 時的檢查動作**:
   - 可參考 p7.4.5 Return Codes 部分了解錯誤碼。
   - 接著依序呼叫 HPFI_Initialize(), HPFI_GetPackagedFirmwareInfo(), HPFI_GetInstalledFirmwareInfo(), HPFI_Install(), HPFI_Finalize() 等 API, 列出對應的狀態。

4. **Stage Firmware 功能**:

[未有直接 Source 錨點，待確認] 5. **Log 內容與紀錄階段**:
- [未有直接 Source 錨點，待確認] Log 內容可以由您自由發揮, 主要是為了後續維護方便。
- [未有直接 Source 錨點，待確認] 重要的階段一定要有 Log 紀錄。[R]


1. **UpgradeCode 作用**:
- [未有直接 Source 錨點，待確認] 這個部分您目前沒有使用到, 可以先不用實作。[R]

[未有直接 Source 錨點，待確認] 2. **Type=RPOS 的實作**:
   - 您目前沒有 RPOS 裝置, 所以不需要支援這個功能。[R]

[未有直接 Source 錨點，待確認] 3. **RequireVID/PID**:
   - 在 RPOS 時需要設定, 但在其他類型的產品中可以不用設定。您目前的 Kronos 產品也沒有實作這部分。[R]

   - PowerButtonSensitivity, DMCDisplayName, DMCVersion, AllowedValue 等功能是針對 Hook docking 產品使用的, 您目前的產品不需要實作。[R]


#### Click "Install" button
#### Click "Close" button


[未有直接 Source 錨點，待確認] 1. **多國語言**: 目前尚未討論多國語言的支援。

2. **FW Status 與 Tool Update Status 描述不一致**:
   - Kronos_OCI_v1.0.0.14 的描述與文件中有些許差異, 可能缺少一些 Status 資訊。例如: Installed version is newer and Out to date。

3. **Log 位置及 Debug Log 開啟**:
   - 目前文件中沒有限制 Log 的位置, 以及如何開啟 Debug Log。可以由您自行決定。

4. **所有檔案都有 .hpsign 的處理**:
- [未有直接 Source 錨點，待確認] 這部分需要討論如何處理 .hpsign 檔案的驗證。