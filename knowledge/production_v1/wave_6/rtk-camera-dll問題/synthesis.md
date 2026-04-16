
# RTK Camera Dll問題

所有 vendor 廠商提供的 DLL 檔案都必須改用 OCI DLL 格式。

如果 Update Tool 中包含舊版的 RTK Camera DLL，在某些特定平台上會導致 RTK Audio update 失敗。相關的郵件可以參考下面提供的連結檔案。

雖然新版的 Camera DLL 已經修正了這個問題，但是新舊版 Sample Code 的架構差異很大。我們需要找到對應的窗口詢問 Sample Code 的流程，才能修正這個問題。如果統一使用 OCI DLL 格式的話，我們原本就有統一的介面可以實作，可以避免溝通和實作的困難。


在 [Etoken System Code View](code-sign/etoken-system-code-view-.html) 中，有提到一些 etoken 系統的程式碼審查結果。其中發現了一些架構和安全性方面的問題，例如:

1. 使用 `detach()` 執行緒可能會導致生命週期控制問題 `[BLOCKING]`。 `[1]`
[未有直接 Source 錨點，待確認] 2. 檔案大小處理缺乏邊界控制，存在資源耗盡和執行風險 `[BLOCKING]`。 `[1]`
3. 協定錯位和 SQL 注入等安全性問題 `[WARNING]`。 `[1], [2]`

這些問題都與 RTK Camera DLL 的整合和更新流程可能產生的影響相關。

在 [HID Code Sign 記錄](code-sign/hid-code-sign-記錄.html) 中，也提到了一些 HID 韌體更新相關的問題和討論事項，例如:

2. USB LOGO 驗證問題。 `[3]`

這些問題都可能與 RTK Camera DLL 的更新流程相關，需要一併考慮。


1. 舊版 DLL 可能導致 RTK Audio update 失敗。 `[4]`
2. 新舊版 Sample Code 架構差異大，需要溝通和實作成本高。 `[4]`
[未有直接 Source 錨點，待確認] 3. 統一使用 OCI DLL 格式可以避免上述問題。 `[4]`


2. 與 vendor 溝通，要求提供 OCI DLL 格式的 Camera DLL。 `[4]`
3. 根據新的 OCI DLL 介面，更新 Sample Code 的實作。 `[4]`
[未有直接 Source 錨點，待確認] 4. 確保更新流程與其他相關系統（如 etoken 和 HID）的整合無誤。 `[1], [2], [3]`

[1] [Etoken System Code View](code-sign/etoken-system-code-view-.html)
[2] [HID Code Sign 記錄](code-sign/hid-code-sign-記錄.html)
[3] [HID Code Sign 記錄](code-sign/hid-code-sign-記錄.html)
[4] [RTK Camera Dll問題](sdk/rtk-camera-dll問題.html)