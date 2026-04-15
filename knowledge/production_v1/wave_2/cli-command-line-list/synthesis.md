
# CLI 命令列列表 (CLI command line list)

CLI (Command Line Interface) 命令列介面是一種以文字指令為主的使用者互動方式。在嵌入式系統開發中，CLI 常被用於執行各種系統管理、韌體更新等操作。本文將介紹 Genesys Logic 開發團隊在 CLI 命令列列表的相關實踐。

Genesys Logic 開發團隊在 CLI 命令列列表的實踐主要包括以下內容:

1. **韌體簽署與驗證流程**：為滿足 HP Code Signing 安全要求，Genesys Logic 設計了一套內部韌體簽署與驗證架構。該架構採用 FIPS 140-2 Level 3 安全標準，並使用 ECDSA nistp256 加密演算法。[Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)

2. **CLI 命令列工具使用**：在韌體更新流程中，Genesys Logic 開發團隊使用 CLI 命令列工具 `isp` 來執行單一韌體映像檔的更新。例如:
   isp -t single -n 0 -b GL3523(B_HID)-OTY50_OSY50_Hub_FW8817.bin
   isp -t single -n 0 -b GL3525-OVY1H_TPV_HP_E45C_Hub_FW3155sig(hid)
   上述命令分別用於更新 GL3523 和 GL3525 型號的韌體映像檔。[3rd party code signing specification (ECDSA)](code-sign/3rd-party-code-signing-specification-ecdsa.html)

3. **GLBin Tool 集中管理**：為避免因 GLBin Tool 的修改導致 etoken client 端也需要跟著修改，Genesys Logic 開發團隊將 GLBin Tool 放置於 etoken server 上集中管理。這樣可以確保 etoken client 端使用的 GLBin Tool 始終保持最新版本。

Genesys Logic 開發團隊在 CLI 命令列列表的實踐中,主要圍繞韌體簽署與驗證流程、CLI 命令列工具使用以及 GLBin Tool 集中管理等方面進行了深入探討和實踐。這些實踐不僅滿足了客戶的安全性要求,同時也提高了系統的可擴展性和維護性。