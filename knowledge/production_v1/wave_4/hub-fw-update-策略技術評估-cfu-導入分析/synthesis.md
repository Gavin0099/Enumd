# Hub FW Update 策略技術評估 — CFU 導入分析

## 1. 方案對照：三條路徑總覽

關鍵結論：無論是否導入 CFU，macOS 工具都必須自行維護；CFU 的核心價值在於解決 Windows Driver 綁定問題，以及讓 Linux 透過 `[fwupd](https://github.com/fwupd/fwupd)` 原生整合。


- Windows 提供完整的 CFU Host Stack
- Linux 透過 `[fwupd](https://github.com/fwupd/fwupd)` 提供部分支援
- macOS 僅提供 USB/HID transport API，不支援 CFU

## 2. macOS CFU 支援查證說明

macOS 目前不支援 CFU (Component Firmware Update)。CFU 為 Microsoft 所定義的裝置韌體更新協議，其 Host 端實作由 Windows 系統內建 Driver `hidcfu.sys` 提供。

- Apple 未提供任何 CFU Host Driver
- macOS 未提供 CFU Firmware Update Framework
- 公開文件中未出現 Apple 支援 CFU 的相關資訊

因此若裝置需在 macOS 上進行 CFU 更新，所有 CFU Host Protocol 邏輯必須由廠商自行實作於 Application 層。

## 3. 技術說明：為什麼 macOS 的 IOKit ≠ CFU 支援

macOS 的 `IOKit` / `IOHIDManager` 僅提供 HID 傳輸能力，如 `IOHIDDeviceSetReport`、`IOHIDDeviceGetReport` 和 `IOHIDDeviceRegisterInputReportCallback`。其功能僅為 Host ↔ HID Report 的資料交換，並未提供：

- CFU protocol state machine
- Firmware update orchestration
- Retry / sequencing / error recovery
- Firmware package 管理

因此在 macOS 上，SW RD 必須自行實作完整的 CFU Host Logic。

## 4. macOS App 需自行實作的 CFU Host Logic

在 macOS 上進行 CFU 更新時，Application 必須負責以下邏輯：

1. **HID Report 封裝**：依 FW 端 HID Descriptor 定義，手動組裝 HID Output Report、控制 Report 長度和管理 Sequence Number。

2. **Offer 狀態管理**：處理 `FIRMWARE_UPDATE_OFFER`，並解析 FW 回傳的狀態，如 `ACCEPT`、`BUSY`、`REJECT` 和 `SKIP`。

3. **序列控制（Stop-and-Wait）**：CFU 協議採用 Stop-and-Wait 模型，macOS App 必須自行處理 Async callback、Packet ordering 和 Timeout control。

4. **錯誤恢復**：當傳輸中斷時，macOS 系統不會自動重試，Application 必須自行實作 timeout retry、transaction restart 和 offer 重新發起。

## 5. 與 Windows 的根本差異

Windows CFU 更新流程：
hidcfu.sys (Kernel Driver)

Vendor Application
CFU Host Logic (User Space)

關鍵差異在於 Windows 的 CFU 實作位於系統內核層，而 macOS 則必須由應用程式自行實作。這意味著 macOS 的 Host Response Timing 可能受到 GCD scheduling、Thread priority、Application workload 和 USB stack latency 的影響。

## 6. 對 FW RD 的設計提醒

由於 macOS 的 CFU Host 實作位於 User Space Application，其 Host Response Timing 可能受到多方面因素影響。因此在 FW 狀態機設計時，Timeout 設計不應假設 Windows `hidcfu.sys` Driver 的穩定 timing 行為。建議 FW Timeout 容忍值應能容忍 User-space scheduling latency、Host application jitter 和跨平台 Host 實作差異，以確保 Windows / macOS Host 皆可正常完成更新流程。