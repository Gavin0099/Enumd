以下是根據提供的內容所合成的「Lenovo one key update tool」的技術設計文件:

# 📄 一鍵更新工具 (Lenovo One Key Update Tool) - 技術設計文件

## 1. 宏觀視角：系統架構與互動圖


- `MainController`: 負責協調整個更新流程，調用不同的命令列工具來執行更新，並使用 SDK/Lib 查詢資訊和與硬體通訊。[`MainController`]
- `HubCommandLineTool`、`ScalerCommandLineTool`、`PDCommandLineTool`: 負責直接更新 Hub、Scaler 和 PD 等硬體的韌體。[`HubCommandLineTool`]、[`ScalerCommandLineTool`]、[`PDCommandLineTool`]
- `HubSDK`、`ScalerLib`、`PDLib`: 提供查詢硬體版本資訊和與之通訊的功能。[`HubSDK`]、[`ScalerLib`]、[`PDLib`]
- `HubToolFolder`、`ScalerToolFolder`、`PDToolFolder`: 存放各類型硬體的韌體包 (bin 檔)。[`HubToolFolder`]、[`ScalerToolFolder`]、[`PDToolFolder`]
- `HubDevice`、`ScalerDevice`、`PDDevice`: 代表實際的硬體設備。[`HubDevice`]、[`ScalerDevice`]、[`PDDevice`]

核心思想是，`MainController` 負責協調整個更新流程，它會調用不同的命令列工具來執行實際的韌體更新，並使用 SDK/Lib 來查詢資訊和與硬體進行通訊。

## 2. 業務流程：詳細更新流程圖


[未有直接 Source 錨點，待確認] 3. **更新決策與韌體驗證**: 判斷是否需要更新，並根據 CombinationID 找到匹配的韌體包。
[未有直接 Source 錨點，待確認] 4. **執行與驗證**: 遍歷韌體包中的每個項目進行更新，最後確認所有元件都已成功更新。


## 3. 微觀視角：類別與時序設計

### 3.1 類別圖 (Class Diagram)

系統採用了**策略模式 (Strategy Pattern)**。`Application` 透過抽象的 `IFirmwareControl` 接口與具體的更新邏輯互動，從而實現了業務邏輯與具體硬體操作的解耦。


- `IFirmwareControl`: 定義了韌體更新的通用接口，包括初始化 SDK、設定 OEM 廠商、執行更新等方法。[`IFirmwareControl`]
- `RTKScalerFirmwareControl`、`ScalerFirmwareControl`、`PDFirmwareControl`、`HubFirmwareControl`: 實現了具體的韌體更新邏輯。[`RTKScalerFirmwareControl`]、[`ScalerFirmwareControl`]、[`PDFirmwareControl`]、[`HubFirmwareControl`]
- `ApplicationParameter`: 保存了更新相關的參數，如命令類型、執行時間等。[`ApplicationParameter`]
- `LenovoMonitorInfoProvider`: 提供了查詢連接的顯示器數量的功能。[`LenovoMonitorInfoProvider`]
- `ConsoleProcessor`: 負責以非同步方式執行命令列工具。[`ConsoleProcessor`]

### 3.2 時序圖 (Sequence Diagram)

在一次典型的更新流程中,`Application` 作為總指揮,它會創建對應的 `FirmwareControl` 實例,然後由 `Control` 實例負責與 `SDK` 進行所有具體的互動,包括版本檢查和執行更新。


1. `Application` 啟動更新工具,讀取設定並創建 `FirmwareControl` 實例。
2. `FirmwareControl` 初始化 SDK,並查詢可用和已安裝的韌體版本。
[未有直接 Source 錨點，待確認] 3. 如果發現需要更新,`FirmwareControl` 會執行韌體更新,並最終回報更新結果。
[未有直接 Source 錨點，待確認] 4. `Application` 根據更新結果向使用者顯示最終狀態。
