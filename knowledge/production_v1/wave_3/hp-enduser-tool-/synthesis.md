以下是基於提供的內容所合成的 HP EndUser Tool 的全面性 Markdown 報告:

# HP EndUser Tool 文件

`[HP EndUser Tool](hp-enduser-tool-.html)` 是 HP 提供的韌體更新工具，主要功能是為目標硬體裝置更新韌體。該工具由 `HPFwUpdate.exe` 應用程式組成，負責與硬體設備進行互動並完成韌體燒錄流程。

`HPFwUpdate.exe` 應用程式依賴以下外部資源:

1. **config.ini**: 設定檔，包含韌體更新所需的各項參數配置。
2. **Firmware.bin**: 韌體二進位檔案，用於燒錄至目標硬體。
3. **Driver Package**: 驅動程式包，包含 `.inf` 和 `.sys` 檔案，用於安裝必要的驅動程式。
4. **GLHubAPI.dll / 3rd Party DLLs**: 硬體抽象層和第三方函式庫，提供與硬體設備的通訊介面。

`HPFwUpdate.exe` 應用程式的系統架構可分為以下三個主要層次:

   - 使用 MFC 和 BCGControlBar 實現使用者介面 `CISPDockingDlg`。

[未有直接 Source 錨點，待確認] 2. **應用邏輯/控制層**:
   - 包含 `CISPDockingDlg` (控制器)、`CISPInterface` (ISP 引擎) 和 `CIni` (設定檔解析器)。
- [未有直接 Source 錨點，待確認] 解析設定檔、驗證韌體檔案、控制韌體更新流程。

[未有直接 Source 錨點，待確認] 3. **系統與硬體互動層**:
   - 包含設備管理器 `DevManager`、驅動安裝器 `DrvInstaller` 和硬體通訊介面 `HW_Comm`。

此外，`HPFwUpdate.exe` 還依賴於作業系統的 Windows 核心 `OS_Kernel` 和目標硬體設備 `Hardware`。其中 `OS_Kernel` 負責加載篩選驅動程式 `FilterDriver`，而 `Hardware` 則包含 USB Hub、Scaler 和其他晶片。

以下是 `HPFwUpdate.exe` 的韌體更新流程:

[未有直接 Source 錨點，待確認] 1. **初始化與環境檢查**:
   - 讀取 `config.ini` 設定檔，確認韌體檔案是否存在。

   - 搜索連接的顯示器和 USB Hub 設備。

   - 載入並驗證 `Firmware.bin` 韌體檔案的簽章。

   - 檢查並處理篩選驅動程式 `glusbflt.sys`。

   - 啟動韌體更新執行緒 `ProcessIsp`。
   - 遍歷 `config.ini` 中定義的所有待更新元件(Hub、Scaler、Audio 等)。



以下是與 `HP EndUser Tool` 相關的其他資訊:

1. **HID Code Sign 記錄**:
   - 提供 HID 韌體更新的相關協議、工具和測試資訊。
   - 記錄了一些已驗證和解決的問題，如 HID 設備重抓、OS 無法識別設備等。

2. **HP OCI APP**:
   - 介紹了 HP 提供的 OCI (Open Collaboration Interface) APP 的相關資訊。
   - 包含 SDK 文件、XML 設定和命令列參數的說明。

3. **HP OCI DLL**:
   - 介紹了 HP 定義的 OCI DLL 格式和相關 SDK。
   - 提供了 GL 自行實作 OCI DLL 的 Class Diagram 和規格。
