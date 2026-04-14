根據提供的內容,我們可以了解到新架構導入新的chip update(MT9052)方式的主要步驟如下:

1. 在 `GlModel.cpp` 的 `FW_INDICATE_NAME` 中加入 MT9052 的相關資訊。
2. 在 `SupportCtrl.h` 中加入要 update 的 `.h` 檔。
3. 在 `MT905xMcuCtrl.h` 中要繼承 `IspCtrl`。
4. 在 `IspCtrlManager.cpp` 的 `AcquireIspCtrl` 中加入導入 MT9052 update 功能的條件。
5. 在 `GLHubUpdateTool.cpp` 的 `ManualUpdateFwNew` 中,可以透過上述設定導入 MT9052 MCU update。
6. 在 `DeviceAgent.cpp` 的 `UpdateFw` 和 `IspFlash` 中加入 MT9052 相關的處理。
7. 在 `MT905xMcuCtrl.cpp` 的 `Isp` 中加入 MT9052 相關的實作。

這些步驟都是為了在新的架構中導入 MT9052 chip 的 update 功能。主要的關鍵點在於:

1. 在各個相關的 C++ 檔案中加入 MT9052 的支援。
2. 在 `IspCtrlManager.cpp` 中加入 MT9052 update 的判斷條件。
3. 在 `GLHubUpdateTool.cpp` 中利用上述設定來觸發 MT9052 的 update 流程。
4. 在 `DeviceAgent.cpp` 和 `MT905xMcuCtrl.cpp` 中實作 MT9052 相關的功能。

總的來說,這是一個在新架構中導入新 chip update 功能的過程,需要在多個相關模組中進行修改和擴充。