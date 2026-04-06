---
title: HP Mandatory Firmware Update Strategy Expansion for Future Projects
domain_tags:
  - mac
  - monitor
  - firmware
  - tools
task_tags:
  - firmware-update
  - spec
  - sop
authority_level: derived
is_deprecated: false
category: mac
notion_id: 29c64f6b-c656-80a5-a42b-d6bd2889c3eb
notion_url: >-
  https://www.notion.so/HP-Mandatory-Firmware-Update-Strategy-Expansion-for-Future-Projects-29c64f6bc65680a5a42bd6bd2889c3eb
notion_updated_at: '2026-01-21T10:01:00.000Z'
exported_at: '2026-04-06T13:15:31.111Z'
is_summarized: false
relations: []
---

# 專案技術需求概要
### 1. 策略背景：韌體更新 (FW Update) 需求擴展
為滿足更廣泛的客戶需求，HP 將擴展韌體更新的支援能力，並將這些要求列為未來所有（明年開始）新專案的強制性標準。
此擴展的重點是增加對 macOS 和 Linux (HP Thin Client) 的支援，並導入 RTOS (內部 MCU) 的雲端更新架構。
### 2. 總體作業系統支援 (依據 FW 規格)
韌體更新工具 (Firmware Update Tool) 需支援的作業系統如下：
- 強制支援 (Mandatory):
- 依 HP 需求支援 (By Request):
- ODM / IC 供應商責任 (RFQ 階段):
---
### 3. 詳細規格：Linux 支援 (For HP Thin Client)
- 3.1. 專案範圍:
- 3.2. 硬體架構:
- 3.3. 軟體架構與交付:
- 3.4. 介面 (Interface):
- 3.5. OS 版本與相依性:
- 3.6. 權限需求:
---
### 4. 詳細規格：macOS 支援
- 4.1. 專案範圍:
- 4.2. 開發與交付流程:
- 4.3. 介面 (Interface):
---
### 5. 詳細規格：RTOS 支援 (內部 MCU 專案)
此需求涉及一個在特定顯示器中內建 MCU 的新架構。
- 5.1. 專案概述:
- 5.2. 核心硬體與時程:
- 5.3. 關鍵功能 1: 雲端更新流程 (HP Poly Cloud)
- 5.4. 關鍵功能 2: 硬體更新架構 (Disconnect Update)
- 5.5. 關鍵功能 3: USB 角色 (OTG/DRP)
