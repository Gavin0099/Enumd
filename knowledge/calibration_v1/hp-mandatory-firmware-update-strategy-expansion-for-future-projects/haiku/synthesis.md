以下是針對「HP Mandatory Firmware Update Strategy Expansion for Future Projects」的詳細文件:

# HP 強制性韌體更新策略擴展計畫

## 1. 策略背景：韌體更新 (FW Update) 需求擴展
為滿足更廣泛的客戶需求，HP 將擴展韌體更新的支援能力，並將這些要求列為未來所有（明年開始）新專案的強制性標準。此擴展的重點是增加對 macOS 和 Linux (HP Thin Client) 的支援，並導入 RTOS (內部 MCU) 的雲端更新架構。

## 2. 總體作業系統支援 (依據 FW 規格)
韌體更新工具 (Firmware Update Tool) 需支援的作業系統如下：
- 強制支援 (Mandatory):
  - Windows 10/11
- 依 HP 需求支援 (By Request):
  - macOS
  - Linux (HP Thin Client)
- ODM / IC 供應商責任 (RFQ 階段):
  - RTOS (內部 MCU)

## 3. 詳細規格：Linux 支援 (For HP Thin Client)
### 3.1. 專案範圍:
- 支援 HP Thin Client 產品線的韌體更新。

### 3.2. 硬體架構:
- 基於 x86 或 ARM 架構的 HP Thin Client 裝置。

### 3.3. 軟體架構與交付:
- 韌體更新工具需支援 Linux 發行版本，如 Ubuntu、CentOS 等。
- 交付方式為可執行的命令列工具。

### 3.4. 介面 (Interface):
- 透過 USB 或網路連線的方式進行韌體更新。
- 提供命令列介面 (CLI) 以供管理員使用。

### 3.5. OS 版本與相依性:
- 支援 Ubuntu 18.04/20.04 LTS 和 CentOS 7/8 等主流 Linux 發行版本。
- 相依性包含常見的 Linux 系統函式庫。

### 3.6. 權限需求:
- 韌體更新工具需以 root 或 sudo 權限執行。
- 提供自動化的權限提升機制。

## 4. 詳細規格：macOS 支援
### 4.1. 專案範圍:
- 支援 HP 商用顯示器產品線的韌體更新。

### 4.2. 開發與交付流程:
- 韌體更新工具以 macOS 原生應用程式的形式交付。
- 遵循 Apple 的 Gatekeeper 和 Notarization 要求。

### 4.3. 介面 (Interface):
- 提供圖形化使用者介面 (GUI)，方便管理員操作。
- 支援透過 USB 或網路連線進行韌體更新。

## 5. 詳細規格：RTOS 支援 (內部 MCU 專案)
此需求涉及一個在特定顯示器中內建 MCU 的新架構。

### 5.1. 專案概述:
- 在 HP 顯示器產品中整合 RTOS 韌體，並支援雲端更新。

### 5.2. 核心硬體與時程:
- 採用 ARM Cortex-M 系列 MCU 作為核心硬體。
- 預計在明年第一季完成硬體設計和韌體開發。

### 5.3. 關鍵功能 1: 雲端更新流程 (HP Poly Cloud)
- 韌體更新工具需支援透過 HP Poly Cloud 平台進行遠端韌體更新。
- 提供安全的雲端更新機制，包括驗證、加密等功能。

### 5.4. 關鍵功能 2: 硬體更新架構 (Disconnect Update)
- 支援在顯示器電源關閉的情況下進行韌體更新 (Disconnect Update)。
- 確保更新過程中不會影響顯示器的正常使用。

### 5.5. 關鍵功能 3: USB 角色 (OTG/DRP)
- 韌體更新工具需支援 USB OTG 和 DRP 模式，以便在不同連接情況下進行更新。
- 確保更新過程中不會影響顯示器的 USB 功能。

以上是針對「HP Mandatory Firmware Update Strategy Expansion for Future Projects」的詳細文件。本文件中引用了以下相關資訊:

1. [`HID Code Sign Update Rule`](./code-sign/hid-code-sign-update-rule.html)：介紹 HID 韌體更新的驗證流程和規範。
2. [`HID Code Sign 記錄`](./code-sign/hid-code-sign-記錄.html)：記錄 HID 韌體更新相關的問題和解決方案。
3. [`HP RTK Scaler Code Sign`](./code-sign/hp-rtk-scaler-code-sign.html)：介紹 RTK Scaler 韌體更新的數位簽章流程。