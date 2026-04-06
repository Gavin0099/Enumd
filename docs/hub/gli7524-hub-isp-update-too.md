---
title: GLI7524 Hub ISP update too
category: hub
notion_id: 1b564f6b-c656-80c8-b125-d35151dd559e
notion_url: >-
  https://www.notion.so/GLI7524-Hub-ISP-update-too-1b564f6bc65680c8b125d35151dd559e
notion_updated_at: '2025-03-13T10:15:00.000Z'
exported_at: '2026-04-06T11:26:49.633Z'
is_summarized: false
---

### 整合至 ISP Tool 的需求整理
### 1. 專案基本資訊
- Project name: 7524A001
- IC rev: 359050 (暫定)
### 2. Firmware 大小與燒錄位置
- Hub FW:
- MCU2 FW:
### 3. ISP Config 說明
- 位置: Hub bin offset 0x336
- 用途:
- 負責人員:
- Config 結構:
```c#
code FW_BIN_CONFIG_IN_FLASH FWBinConfigInFlash =
{
    ISPCONFIG1,         // U8
    HUB_CODE_SIZE,      // U8
    HUB1_START_ADDR,    // U32
    HUB2_START_ADDR,    // U32
    MCU2ND_CODE_SIZE,   // U8
    MCU2ND1_START_ADDR, // U32
    MCU2ND2_START_ADDR  // U32
};
```
- 定義:
```c#
#define ISPCONFIG1         0x00
	#define _DUALBANK          SET_BIT0 // default 0, set 1 表示 ISP Tool 使用 dual bank ISP
	#define _MCU2ND_EXIST      SET_BIT1 // 表示 MCU2nd 存在

#define HUB_CODE_SIZE           0x40        // 64Kbytes
#define HUB1_START_ADDR         0x00000000  // Hub1 燒錄位置
#define HUB2_START_ADDR         0x00010000  // Hub2 燒錄位置
#define MCU2ND_CODE_SIZE        0x60        // 88Kbytes = 0x58, 96Kbytes = 0x60
#define MCU2ND1_START_ADDR      0x00020000  // MCU2nd1 燒錄位置 (同時供 Hub mask code load code 使用)
#define MCU2ND2_START_ADDR      0x00040000  // MCU2nd2 燒錄位置 (同時供 Hub mask code load code 使用)
```
### 4. 未來擴充計畫
- Config 可能會在 RAM code 中擴充外部 FW 燒錄 offset，後續再確認。
### 5. 當前需求
- 請軟體團隊將上述內容加入 ISP Tool，以便驗證:
- 可參考附件中的 FW bin 作為測試範例。
建議加入 ISP Tool 的實作步驟
1. 解析 Hub bin offset 0x336 的 Config:

    ◦ 讀取 FWBinConfigInFlash 結構，解析各欄位內容。
    ◦ 根據 ISPCONFIG1 的 _DUALBANK 位元，決定是否啟用 dual bank ISP。
    ◦ 根據 _MCU2ND_EXIST 位元，確認是否處理 MCU2nd 的燒錄。
2. 支援 Hub FW 燒錄:

    ◦ 固定燒錄位置:

        ▪ Bank1: 0x0000 0000
        ▪ Bank2: 0x0001 0000
    ◦ 從 signature 提取 FW size。
3. 支援 MCU2 FW 燒錄:

    ◦ 根據 Hub bin config 的 MCU2ND_CODE_SIZE、MCU2ND1_START_ADDR 和 MCU2ND2_START_ADDR 配置燒錄位置。
    ◦ 支援從 signature 或 Hub bin config 兩處提取 FW size。
4. 驗證功能:

    ◦ 測試 mask code load code 是否正確載入。
    ◦ 確認燒錄後的 FW 在 flash 中的位置與大小是否符合預期。
1. 1. 解析 Hub bin offset 0x336 的 Config:
- 
- 
- 
1. 2. 支援 Hub FW 燒錄:
- 
- 
- 
- 
1. 3. 支援 MCU2 FW 燒錄:
- 
- 
1. 4. 驗證功能:
- 
- 
