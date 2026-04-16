
# HP ISP Tool Update hub firmware flow(Z24m)

1. 開啟 `HP_ISPTool.exe` 應用程式。
2. 確認 hub 的 Index 為 1 且 Hub Firmware 版本為 3122，然後按下 `Erase Flash` 按鈕。
3. 確認 `Erase Success` 訊息後，勾選 `USB Hub —> Open(GL3523-OTY3H_Wistron_HP_Z24m_G3_L2_Hub_FW3123sig.bin) —> Start ISP` 選項。
4. 確認 update 完成後，斷電並等待足夠長的時間。
5. 透過 `Device Manager` 或 `UsbView` 確認 hub 韌體已更新至正確的版本。

[未有直接 Source 錨點，待確認] 本 update 流程涉及以下相關概念與流程:

1. **Code Sign 驗證流程**：
   - Camera 模組需透過 ECDSA 金鑰簽章來驗證韌體合法性。[Camera 透過我們驗證 code sign](code-sign/camera-透過我們驗證-code-sign.html)
   - Genesys Logic 使用 ECDSA nistp256 演算法進行韌體簽章。[Genesys Logic CodeSign flow](code-sign/code-sign-flow.html)

2. **GL Hub 韌體 Recovery 流程**：
   - GL3523、GL3525 和 GL3590 Hub 韌體在 Recovery 模式下會根據 Bank 1 和 Bank 2 的韌體版本進行判斷和更新。[GL Hub Code Sign Recovery Flow](hub/gl-hub-code-sign-recovery-flow.html)
   - 新版 Hub 韌體可透過 Tool String 得知目前執行的 Bank，ISP Tool 會根據此資訊更新未執行的 Bank。

`HP ISP Tool Update hub firmware flow(Z24m)` 的核心流程依賴以下關鍵元素:

1. **HP ISP Tool**：用於執行 Hub 韌體的擦除和更新操作。
2. **Hub 韌體映像檔**：`GL3523-OTY3H_Wistron_HP_Z24m_G3_L2_Hub_FW3123sig.bin`，包含簽章的 Hub 韌體。
3. **Code Sign 驗證**：Camera 模組需透過 ECDSA 金鑰簽章來驗證韌體合法性。
4. **Hub 韌體 Recovery 機制**：Hub 韌體在 Recovery 模式下會根據 Bank 1 和 Bank 2 的韌體版本進行判斷和更新。


1. HP ISP Tool 負責執行 Hub 韌體的擦除和更新操作。
2. Hub 韌體映像檔需經過 Code Sign 驗證才能被 Hub 韌體接受。
3. Hub 韌體在 Recovery 模式下會根據 Bank 1 和 Bank 2 的韌體版本進行判斷和更新，確保韌體能正常運行。

「HP ISP Tool Update hub firmware flow(Z24m)」是一個涉及多個相關概念和流程的複雜更新流程。它需要 HP ISP Tool、簽章的 Hub 韌體映像檔、Code Sign 驗證以及 Hub 韌體 Recovery 機制等關鍵元素的協調配合。只有確保這些元素的正確性和兼容性，才能確保 Hub 韌體的順利更新。