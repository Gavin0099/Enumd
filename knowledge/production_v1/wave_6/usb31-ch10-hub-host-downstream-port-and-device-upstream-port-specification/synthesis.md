以下是基於提供的內容邊界所合成的 USB3.1 Ch10 Hub, Host Downstream Port, 和 Device Upstream Port 規格文件:

# USB3.1 Ch10 Hub, Host Downstream Port, 和 Device Upstream Port 規格

本章節說明了支援 Enhanced SuperSpeed（USB 3.x）與 USB 2.0 的 USB Hub 架構要求，並定義下列幾項核心功能與差異:

3. Enhanced SuperSpeed Hub 描述

- 設計 USB hub 的開發者需同時參照:
  - [Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)
  - [3rd party code signing specification (ECDSA)](3rd-party-code-signing-specification-ecdsa.html)
  - [3rd party code signing specification (ECDSA)(EN)](3rd-party-code-signing-specification-ecdsaen-.html)


1. [Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)
   - 說明了 Genesys Logic 為滿足 HP Code Signing 安全要求所設計的韌體簽署與驗證架構。
   - 這與 USB Hub 設計的安全要求和驗證流程有關。

2. [3rd party code signing specification (ECDSA)](3rd-party-code-signing-specification-ecdsa.html) 和 [3rd party code signing specification (ECDSA)(EN)](3rd-party-code-signing-specification-ecdsaen-.html)
   - 提供了第三方程式碼簽署的規範和實作細節，包括使用 ECDSA 演算法。

總之，本章節的 USB Hub 設計必須參考上述相關文件中的安全合規性要求和實作方法,以確保 USB Hub 韌體的完整性和可信賴性。