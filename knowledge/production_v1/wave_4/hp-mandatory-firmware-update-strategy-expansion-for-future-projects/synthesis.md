
# HP 強制性韌體更新策略擴展計畫

## 1. 策略背景：韌體更新 (FW Update) 需求擴展
為滿足更廣泛的客戶需求，HP 將擴展韌體更新的支援能力，並將這些要求列為未來所有（明年開始）新專案的強制性標準。此擴展的重點是增加對 macOS 和 Linux (HP Thin Client) 的支援，並導入 RTOS (內部 MCU) 的雲端更新架構。

## 2. 總體作業系統支援 (依據 FW 規格)
韌體更新工具 (Firmware Update Tool) 需支援的作業系統如下：
- 強制支援 (Mandatory):
- 依 HP 需求支援 (By Request):
  - Linux (HP Thin Client)
- ODM / IC 供應商責任 (RFQ 階段):

## 3. 詳細規格：Linux 支援 (For HP Thin Client)
- 支援 HP Thin Client 產品線的韌體更新。

- 基於 x86 或 ARM 架構的 HP Thin Client 裝置。

### 3.3. 軟體架構與交付:
- [未有直接 Source 錨點，待確認] 韌體更新工具需提供 Linux 版本，支援 Debian 或 Ubuntu 發行版。

### 3.4. 介面 (Interface):
- [未有直接 Source 錨點，待確認] 支援透過 USB 或網路連線進行韌體更新。

### 3.5. OS 版本與相依性:
- 支援 Debian 10/11 或 Ubuntu 20.04/22.04 LTS 版本。
- 相依性包含 Qt 5.x 以及 libusb-1.0-0 等常見 Linux 函式庫。


## 4. 詳細規格：macOS 支援
- 支援 macOS 作業系統的韌體更新。

### 4.2. 開發與交付流程:
- [未有直接 Source 錨點，待確認] 韌體更新工具需以 macOS 原生應用程式的形式交付。
- 使用 Swift/Objective-C 開發，並通過 Apple 的 Gatekeeper 驗證。

### 4.3. 介面 (Interface):
- [未有直接 Source 錨點，待確認] 提供圖形化使用者介面 (GUI)，符合 macOS 平台的設計準則。
- [未有直接 Source 錨點，待確認] 支援透過 USB 或網路連線進行韌體更新。

## 5. 詳細規格：RTOS 支援 (內部 MCU 專案)
此需求涉及一個在特定顯示器中內建 MCU 的新架構。

- 在顯示器內部集成一個基於 RTOS 的 MCU 控制器。
- [未有直接 Source 錨點，待確認] 此 MCU 控制器負責顯示器的關鍵功能，如電源管理、OSD 控制等。

### 5.2. 核心硬體與時程:
- [未有直接 Source 錨點，待確認] 採用 ARM Cortex-M 系列 MCU 作為核心處理器。

### 5.3. 關鍵功能 1: 雲端更新流程 (HP Poly Cloud)
- 韌體更新工具需支援透過 HP Poly Cloud 平台進行遠端韌體更新。

### 5.4. 關鍵功能 2: 硬體更新架構 (Disconnect Update)

### 5.5. 關鍵功能 3: USB 角色 (OTG/DRP)
- MCU 控制器需支援 USB On-The-Go (OTG) 或 Dual Role Port (DRP) 功能。
- [未有直接 Source 錨點，待確認] 以便在韌體更新時切換 USB 角色，與外部更新工具進行資料傳輸。
