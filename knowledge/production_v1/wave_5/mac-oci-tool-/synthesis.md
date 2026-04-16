以下是基於提供的內容所撰寫的 MAC OCI Tool 文件:

# MAC OCI Tool 文件

MAC OCI Tool 是一款用於管理和更新 HP 顯示器韌體的工具。它由 Genesys Logic 開發，主要功能包括:

1. 提供 MAC 平台上的 OCI 韌體更新功能。
2. 整合 OCI DLL 以及 hub framework，讓 OCI Tool 能夠知道可以更新的 hub 有哪些。
3. 實現 exe 和 dll 的代碼簽名功能，支援 GUI 和靜默模式。
5. 實現保護機制，僅允許 GL Hub 使用。

MAC OCI Tool 的架構如下 [`HP OCI Tool Architecture`](https://docs.google.com/document/d/1DbAuoOLvr86leAP8ZnvzuC50QrUdH3DI5imGOIbyCkQ/edit):

![MAC OCI Tool Architecture](https://drive.google.com/file/d/1KSYwzoopvsl-HRUqD2QXZiN32apqsFeA/view?usp=sharing)


1. **OCI DLL**: 由 HP 定義的 DLL 格式，用於實現韌體更新流程。[`HP OCI DLL`](./hp-oci-dll.html)
2. **Hub Framework**: 用於管理可更新的 hub 列表。
3. **Code Sign 功能**: 提供 exe 和 dll 的代碼簽名功能。[`HID Code Sign 記錄`](./hid-code-sign-記錄.html)
4. **命令列工具**: 提供命令列方式操作 OCI 韌體更新。
5. **保護機制**: 僅允許 GL Hub 使用 OCI Tool。

1. **MAC OCI Tool**: 提供 MAC 平台上的 OCI 韌體更新功能。
2. **OCI DLL**: 集成 HP 提供的 OCI DLL。
3. **Hub Framework**: 管理可更新的 hub 列表。
4. **代碼簽名功能**: 實現 exe 和 dll 的代碼簽名功能，支援 GUI 和靜默模式。[`HID Code Sign 記錄`](./hid-code-sign-記錄.html)
5. **命令列工具**: 提供命令列方式操作 OCI 韌體更新。
6. **保護機制**: 僅允許 GL Hub 使用 OCI Tool。

MAC OCI Tool 的測試計畫詳見 [`Mac OCI Demo flow`](https://ivy-lupin-da9.notion.site/Mac-OCI-Demo-flow-420db67e12a84cc0992c6d176da2857f)。主要包括:


1. [`HP_Display_Firmware_Update_Specification`](./hp_display_firmware_update_specification.html): HP 顯示器韌體更新規範。
2. [`HID Code Sign 記錄`](./hid-code-sign-記錄.html): HID 代碼簽名相關記錄。
3. [`HP OCI DLL`](./hp-oci-dll.html): HP OCI DLL 相關文件。