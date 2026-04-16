以下是根據提供的內容所撰寫的 USB3.1 Ch10 Hub, Host Downstream Port, 和 Device Upstream Port 規格文件:

# USB3.1 Ch10 Hub, Host Downstream Port, 和 Device Upstream Port 規格

本章節說明了支援 Enhanced SuperSpeed（USB 3.x）與 USB 2.0 的 USB Hub 架構要求，並定義了以下幾項核心功能與差異:

3. Enhanced SuperSpeed Hub 描述

- 設計 USB hub 的開發者需同時參照:
  - [Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)
  - [3rd party code signing specification (ECDSA)](3rd-party-code-signing-specification-ecdsa.html)
  - [3rd party code signing specification (ECDSA)(EN)](3rd-party-code-signing-specification-ecdsaen-.html)

USB Hub 是一種 USB 裝置，可以擴展主機（Host）的連接埠數量，並提供連接其他 USB 裝置的介面。

USB Hub 主要分為兩種類型:
1. Enhanced SuperSpeed Hub: 支援 USB 3.x 規格的 Hub。
2. USB 2.0 Hub: 僅支援 USB 2.0 規格的 Hub。

## Enhanced SuperSpeed Hub 描述
Enhanced SuperSpeed Hub 除了具備 USB 2.0 Hub 的基本功能外，還支援以下特性:
- 支援 USB 3.x 規格的 SuperSpeed 傳輸模式。
- 具有 Host 下游連接埠（Downstream Port）和 Device 上游連接埠（Upstream Port）。
- 能夠偵測並切換連接埠的傳輸模式（USB 2.0 或 USB 3.x）。

Enhanced SuperSpeed Hub 的功能行為如下:
1. 當 Device 連接到 Downstream Port 時，Hub 會偵測 Device 的傳輸模式並切換至對應的模式。
2. Hub 會管理 Downstream Port 的電源供應，確保連接的 Device 能正常運作。
3. Hub 會將 Device 的資料傳輸請求轉送至 Upstream Port，並將 Host 的回應資料傳送至 Downstream Port。

USB 2.0 Hub 的功能較為簡單，主要包括:
- 支援 USB 2.0 規格的傳輸模式。
- 具有 Downstream Port 用於連接其他 USB 裝置。
- 將 Device 的資料傳輸請求轉送至 Upstream Port，並將 Host 的回應資料傳送至 Downstream Port。
- 管理 Downstream Port 的電源供應。