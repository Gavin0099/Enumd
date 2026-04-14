根據提供的內容,我們可以了解到新架構導入新的chip update(MT9052)方式的主要步驟如下:

1. 在 `GlModel.cpp` 的 `FW_INDICATE_NAME` 中加入 MT9052 的相關定義。
2. 在 `SupportCtrl.h` 中加入要 update 的 `.h` 檔。
3. 在 `MT905xMcuCtrl.h` 中,MT9052 的 MCU 控制器需要繼承 `IspCtrl` 介面。
4. 在 `IspCtrlManager.cpp` 的 `AcquireIspCtrl` 函數中,加入導入 MT9052 update 功能的條件判斷。
5. 在 `GLHubUpdateTool.cpp` 的 `ManualUpdateFwNew` 函數中,可以透過上述設定導入 MT9052 MCU 的 update 功能。
6. 在 `DeviceAgent.cpp` 的 `UpdateFw` 和 `IspFlash` 函數中,加入 MT9052 MCU 的 update 邏輯。
7. 在 `MT905xMcuCtrl.cpp` 的 `Isp` 函數中,實現 MT9052 MCU 的 ISP 功能。

總的來說,這個新的 chip update 方式需要在現有的架構中,針對 MT9052 MCU 的特性,擴充相關的功能和邏輯。主要涉及到 MCU 控制器的介面實現、ISP 流程的整合,以及在 update 工具中的相關設定和調用。這樣可以實現對 MT9052 MCU 的 update 功能。