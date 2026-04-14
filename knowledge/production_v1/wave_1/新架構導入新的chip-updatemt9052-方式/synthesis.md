
# 新架構導入新的chip update(MT9052) 方式

在新的架構中,我們需要導入 MT9052 MCU 的更新功能。這需要在現有的程式碼中進行一些修改和設定,以支援這個新的 chip update 方式。

1. 在 `GlModel.cpp` 中,找到 `FW_INDICATE_NAME` 並進行相關設定,以指示 MT9052 的 update 功能。

2. 在 `SupportCtrl.h` 中,加入需要 update 的 `.h` 檔案。

3. 在 `MT905xMcuCtrl.h` 中,要繼承 `IspCtrl` 介面。

4. 在 `IspCtrlManager.cpp` 的 `AcquireIspCtrl` 函數中,加入判斷條件,以導入 MT9052 update 功能。

5. 在 `GLHubUpdateTool.cpp` 的 `ManualUpdateFwNew` 函數中,透過上述設定,即可導向 MT9052 MCU 的 update 流程。

6. 在 `DeviceAgent.cpp` 的 `UpdateFw` 和 `IspFlash` 函數中,加入 MT9052 相關的處理邏輯。

7. 在 `MT905xMcuCtrl.cpp` 的 `Isp` 函數中,實作 MT9052 MCU 的 update 功能。

- [HP Hemi(Z34c) CPU3 Code Sign 驗證問題](code-sign/hp-hemiz34c-cpu3-code-sign-驗證問題.html)
  - 除了 GL3590 有 hw security module 之外,其他 hub chip 是沒有的,因此必須使用 fw 做 code sign 驗證。
  - 在某些情況下,計算 sha256 的 hash 值會斷線,以及 rsa2048 簽章驗證會出現問題。
  - 需要注意一些步驟,例如必須用 U3 來跑、public key 和 signature 要做 reverse 等。

- [Genesys Logic Spec](general/genesys-logic-spec.html)
  - 包含了 GenesysLogic Hub 的 Vendor Command、Hub Configuration 和 PD Configuration 等相關規格。
  - 其中提到了 GL3590 ISP Class 和 GL3525 FW 及 Flash Configuration 等內容,可能與 MT9052 update 有關。

- [RTK Scaler Code Sign](code-sign/hp-rtk-scaler-code-sign.html)
  - 介紹了 RTK Scaler 的數位簽章驗證流程,包括 SW 和 HW 兩種方式。
  - 可能與 MT9052 update 的簽章驗證有相似之處。

通過上述步驟,我們可以在新的架構中成功導入 MT9052 MCU 的 update 功能。需要注意的是,這個功能的實現需要與其他相關的程式碼和規格進行配合,例如 code sign 驗證等。在實際開發過程中,可能還需要進一步的調整和優化。