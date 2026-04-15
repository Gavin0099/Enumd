報告書：Helper 實用程式庫/DLL 文件

[未有直接 Source 錨點，待確認] Helper 實用程式庫/DLL 是一個提供常用功能的軟體套件,包括:


     - 可使用 USBView 命令列工具直接擷取日誌檔案。[USB View log](./helper-utility-librarydll.html#usb-view-log)
     - 預計採用 spdlog 套件,並應用於所有工具,目前以 OCI 工具為主。[Tool log](./helper-utility-librarydll.html#tool-log)

     - 可透過命令列取得電腦所需的資訊。[Dxdiag](./helper-utility-librarydll.html#dxdiag)

[未有直接 Source 錨點，待確認] 本 Helper 實用程式庫/DLL 與以下相關文件有密切關聯:

1. [Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](./code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)
   - 說明 Genesys Logic 為滿足 HP Code Signing 安全要求所設計的韌體簽署與驗證架構。
   - 核心要求為所有簽署操作必須符合 FIPS 140-2 Level 3 安全標準,並採用 ECDSA nistp256 加密演算法。

2. [3rd party code signing specification (ECDSA)](./code-sign/3rd-party-code-signing-specification-ecdsa.html)
   - 概述 Genesys Logic 的韌體簽署流程,包括簽署和驗證。
   - 說明使用 OpenSSL 和 eToken 實作簽署流程。

3. [3rd party code signing specification (ECDSA)(EN)](./code-sign/3rd-party-code-signing-specification-ecdsaen-.html)
   - 英文版本的 3rd party code signing specification (ECDSA)文件。
- [未有直接 Source 錨點，待確認] 內容包括簽署和驗證流程,以及使用 OpenSSL 和儲存私鑰的實作方式。

本 Helper 實用程式庫/DLL 提供了常用的裝置資訊顯示、日誌記錄和系統資訊擷取等功能,可以作為其他應用程式的基礎元件使用。它與 Genesys Logic 的韌體簽署與驗證流程密切相關,確保了韌體的安全性和合法性。