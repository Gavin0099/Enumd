---
title: '**HP Project: Store & Forward FW Update Specification**'
domain_tags:
  - hub
  - monitor
  - firmware
  - tools
task_tags:
  - firmware-update
  - debug
  - spec
  - sop
authority_level: source
is_deprecated: false
category: hub
notion_id: 2c464f6b-c656-80ac-ab27-c1629a6d48d2
notion_url: >-
  https://www.notion.so/HP-Project-Store-Forward-FW-Update-Specification-2c464f6bc65680acab27c1629a6d48d2
notion_updated_at: '2026-04-22T05:50:00.000Z'
exported_at: '2026-05-16T12:39:59.169Z'
is_summarized: false
relations:
  manual: []
  inferred: []
---

## 1. 核心架構 (System Architecture)

採用 **Store and Forward (儲存後轉發)** 機制，解決 USB 傳輸不穩導致的 I2C 時序問題。

- **Phase 1 (Upload):** Tool 透過 USB (HID Interrupt Out 建議) 將完整 Bin 檔與(`PD/Scaler INFO`)下載至 Hub Flash。

- **Phase 2 (Internal Update):** Tool 發送指令啟動 FW，由 **Hub FW** 負責執行圖一 (PD) 與圖二 (Scaler) 的實際寫入流程。

### 系統架構圖 (Mermaid)

```mermaid
flowchart LR
    classDef base fill:#f9f9f9,stroke:#333,stroke-width:1px
    classDef flash fill:#fff3cd,stroke:#d4ac0d,stroke-width:2px
    classDef fw fill:#e3f2fd,stroke:#2196f3,stroke-width:2px

    subgraph P1 ["Phase 1: 下載階段"]
        direction TB
        Tool[PC Tool]:::base
        HubFlash[Hub Flash]:::flash
        Tool -- "1. 下載完整 Bin" --> HubFlash
    end

    subgraph P2 ["Phase 2: 內部更新"]
        direction TB
        HubFW[Hub FW]:::fw
        Target[PD / Scaler]:::base
        
        HubFlash -.-> |"2. 讀取資料"| HubFW
        HubFW -- "3. I2C 寫入<br/>(執行圖一/圖二)" --> Target
    end
```

---

## 2. 詳細更新流程 (Detailed Workflow)

此流程整合了 Tool 的控制邏輯與 FW 的內部運作（對應圖一與圖二）。

### Step 1: Phase 1 下載

1. Tool 將 PD Bin 與 Scaler Bin 與(`PD/Scaler INFO`)完整寫入 Hub Flash 的指定位址。

1. 進入 ISP Mode。

1. **Tool:** 發送 `HID_CMD_Enable_PD_OnlineSpeedUp`。

### Step 2: Phase 2 啟動與監控 (PD 階段)

1. **Hub FW (執行圖一紅框邏輯):**

  - **Sector Loop:** 從 Hub Flash 讀取資料，針對 PD 進行  `Write` -> `Verify`。
  
  - **Retry 機制:** 若寫入失敗，FW 內部會嘗試 Retry (如圖一所示)。若 Retry 耗盡仍失敗，則將狀態設為 `ONLINE_SPEEDUP_PD_ERROR`。

1. **Tool (Polling):** 每 **500ms** 發送 `Get_Update_Status`。

  - 若回傳 `DONE`: 進入 Step 3。
  
  - 若回傳 `ERROR`: **觸發錯誤恢復 (見 2.2)**。

### 圖一

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/6c33dc67-382c-40dc-872c-de63766a1386/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667EOJ5LT7%2F20260516%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260516T123957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDUSyEMgTZ0PFkptDyn60UV%2F0GrhTs49pRIj5C8WZQMcgIgDD0sZi0ZvmkgQIrV%2FKfR5NwqcKozw3nH9cxsk8dmuiMqiAQIjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHq1Fsoz9vH5%2Bhn3MCrcAzQX1kMqArl%2F4DagxPq5LUGzYkp2AZa2BNXOxTSjnnAkGdk5FSbHkhSVZMgvihEcfAMDrFHxyry14g2VxXIEh%2BuwUlVPIa5kj0YmzWIXo%2B7It%2Fjcybr1MCiLFpPmcv9WqA37%2F41M%2FauD8gY5jXlvbLZPLtLRqae2%2Fr3%2FpzbuZh1xmJxHHHEIpzmHxPY0eQDFKVFY7fr1QELMkOc683ONw%2B2mvtljE2MmXJWsAlZ3cPX6IZCysrHCdKMpDDxXvg3%2FKMByTtv9hiBrJhwvVSn6PUP%2Fppeyqq8QU93A80oJG2HrgriWC3pl2NyVVd%2F6dBn3Sua1%2FHO0OK2stVbUz2hAxLiPspajDjkwtspkl8CLfI0OtPRaWfsociuc%2B7gXH8PgP4HB2u3mZBtNfo7rGOV7YIUJbataQu65AxB4ZKoiUJxfJxdAuYeEqmbqfxwxYsHfPF2WZeVbOX3Z5ljG%2FY1gU5rGKUE4jF67%2F3FolPanDALQKCvfSNFrjx%2FZQyV7M%2FZO7%2BFO19VchFik5g9FcSjjzhVYQ30QmKvcBVFdnfx%2FMRSA42KI2J6CUKJ3defyBZ0Mv%2FjHZN33fhH8KOWb9ORc%2BSBaI8aoHVrio29Gn9R%2Fivr8%2B2nmV1%2FkjO3FThiIMPakodAGOqUBNqSnhvoAsJYdik02a2TcAXmEFLgpve2pHaRjvp4WMMvauyj54OAldmiuC5ZPeMtxrESFAe3GR6bFpfNC0l%2FivyCnWq4wLXTlXRmpmJGJwFPVP0hR5mFlaqsxZvp4y8mTSPR25nb5hZKGSATgPUAxFWEpEQXrOwTQgiLqt6FPWlulo3LJnxXFLl86dP1AJ45tw%2BJWuCQ3L%2FdG2eUQuN36yIhFHEAq&X-Amz-Signature=f25aebec7e4c45f981c6febdbdc0d4689329baca51e22318353a0ade6a4b64fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

### Step 3: Phase 2 啟動與監控 (Scaler 階段)

1. 進入 ISP Mode -> Disable Write Protect。

1. **Tool:** 發送 `HID_CMD_Enable_Scaler_OnlineSpeedUp`。

1. **Hub FW (執行圖二紅框邏輯):**

  - 從 Hub Flash 讀取資料，針對 Scaler 進行  `Write` -> `Verify`
  
  - 若任一步驟失敗，將狀態設為 `ONLINE_SPEEDUP_SCALER_ERROR`。

1. **Tool (Polling):** 每 **500ms** 發送 `Get_Update_Status`。

  - 若回傳 `DONE`: 流程結束。
  
  - 若回傳 `ERROR`: **觸發錯誤恢復 (見 2.2)**。

### 圖二

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/b0440cd9-bd02-42be-9c37-be713cc83350/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667EOJ5LT7%2F20260516%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260516T123957Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDUSyEMgTZ0PFkptDyn60UV%2F0GrhTs49pRIj5C8WZQMcgIgDD0sZi0ZvmkgQIrV%2FKfR5NwqcKozw3nH9cxsk8dmuiMqiAQIjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHq1Fsoz9vH5%2Bhn3MCrcAzQX1kMqArl%2F4DagxPq5LUGzYkp2AZa2BNXOxTSjnnAkGdk5FSbHkhSVZMgvihEcfAMDrFHxyry14g2VxXIEh%2BuwUlVPIa5kj0YmzWIXo%2B7It%2Fjcybr1MCiLFpPmcv9WqA37%2F41M%2FauD8gY5jXlvbLZPLtLRqae2%2Fr3%2FpzbuZh1xmJxHHHEIpzmHxPY0eQDFKVFY7fr1QELMkOc683ONw%2B2mvtljE2MmXJWsAlZ3cPX6IZCysrHCdKMpDDxXvg3%2FKMByTtv9hiBrJhwvVSn6PUP%2Fppeyqq8QU93A80oJG2HrgriWC3pl2NyVVd%2F6dBn3Sua1%2FHO0OK2stVbUz2hAxLiPspajDjkwtspkl8CLfI0OtPRaWfsociuc%2B7gXH8PgP4HB2u3mZBtNfo7rGOV7YIUJbataQu65AxB4ZKoiUJxfJxdAuYeEqmbqfxwxYsHfPF2WZeVbOX3Z5ljG%2FY1gU5rGKUE4jF67%2F3FolPanDALQKCvfSNFrjx%2FZQyV7M%2FZO7%2BFO19VchFik5g9FcSjjzhVYQ30QmKvcBVFdnfx%2FMRSA42KI2J6CUKJ3defyBZ0Mv%2FjHZN33fhH8KOWb9ORc%2BSBaI8aoHVrio29Gn9R%2Fivr8%2B2nmV1%2FkjO3FThiIMPakodAGOqUBNqSnhvoAsJYdik02a2TcAXmEFLgpve2pHaRjvp4WMMvauyj54OAldmiuC5ZPeMtxrESFAe3GR6bFpfNC0l%2FivyCnWq4wLXTlXRmpmJGJwFPVP0hR5mFlaqsxZvp4y8mTSPR25nb5hZKGSATgPUAxFWEpEQXrOwTQgiLqt6FPWlulo3LJnxXFLl86dP1AJ45tw%2BJWuCQ3L%2FdG2eUQuN36yIhFHEAq&X-Amz-Signature=e67c8a6c1b058b57d640bcbe58136c83e06a4fe54756d2fdad4f857bc365cb90&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

---

### 2.2 錯誤恢復機制 (Error Recovery)

當 FW 內部的 Retry (圖一**紅框**) 或 Verify (圖二**紅框**) 失敗並回報 ERROR 時，Tool 介入救援：

1. **Tool:** 解析 `Get_Update_Status` 回傳的 **Error Address**。

1. **Tool:** 主動對 Target (PD/Scaler) 發送指令，**Erase 該失敗的 Sector**。

1. **Tool:** 發送 `Restore_Address` 指令：

  - 告知 FW 新的 **Target Write Address**。
  
  - 告知 FW 對應的 **Hub Flash Read Address** (僅 Scaler 需要)。

1. **Hub FW:** 更新內部的 Write Pointer，從指定位置繼續執行寫入。

---

## 3. 狀態機流程圖 (State Machine Flowchart)

這張圖展示了 Tool 與 FW 的互動，包含錯誤救援迴圈。

```mermaid
flowchart TD
    classDef tool fill:#f9f9f9,stroke:#333,stroke-width:2px
    classDef fw fill:#e3f2fd,stroke:#2196f3,stroke-width:2px
    classDef decision fill:#fff3cd,stroke:#ff9800,stroke-width:2px
    classDef error fill:#ffebee,stroke:#d32f2f,stroke-width:2px
    classDef success fill:#e8f5e9,stroke:#388e3c,stroke-width:2px

    Start(("Start")) --> P1

    %% Phase 1
    subgraph P1 ["Phase 1: Preparation"]
        Step1["Tool: 下載完整 FW<br/>至 Hub Flash"]:::tool
    end
    P1 --> Step2

    %% Phase 2
    subgraph P2 ["Phase 2: Update Loop"]
        direction TB
        
        Step2["Tool: 發送 Enable CMD<br/>(啟動 FW 接手)"]:::tool
        Step2 --> Action
        
        Action["FW: 執行內部流程<br/>(對應圖一/圖二紅框邏輯)"]:::fw
        Action -.-> Wait
        
        Wait("等待 500ms<br/>(Polling)"):::decision
        Wait --> Step3
        
        Step3["Tool: 發送 CMD<br/>Get Status"]:::tool
        Step3 --> Check{"狀態檢查<br/>(Status?)"}:::decision
        
        Check -- "ENABLE (更新中)" --> Wait
        Check -- "DONE (完成)" --> Done
        Check -- "ERROR (失敗)" --> ErrHand
    end

    %% Error Recovery
    subgraph Recovery ["錯誤恢復流程"]
        direction TB
        ErrHand["Tool: 解析 Error Address"]:::error
        ErrHand --> ErrErase
        
        ErrErase["Tool: 主動 Erase<br/>該 Sector"]:::tool
        ErrErase --> CheckErase{"Erase 成功?"}:::decision
        
        CheckErase -- "No" --> Fail(("Update Fail")):::error
        CheckErase -- "Yes" --> Restore
        
        Restore["Tool: 發送 CMD<br/>Restore Address"]:::tool
    end
    
    Restore --> Wait

    %% End
    Done["Tool: 接手剩餘流程<br/>(Verify / Finalize)"]:::success
    Done --> End(("End"))
```

---

## 4. HID Command Protocol (Reference)

### 控制指令 (Control)

| **Command Name** | **Type/Req/Val/Idx** | **Description** |

| **Enable PD** | `0x40 C2 02 01 00 00 01 00` | 啟動 FW 執行圖一流程
Data: `[GL9511_NonRunning_bank]` |

| **Enable Scaler** | `0x40 C2 02 10 00 00 00 00` | 啟動 FW 執行圖二流程 |

| **Disable PD** | `0x40 C2 02 02 00 00 00 00` | Reserved |

| **Disable Scaler** | `0x40 C2 02 20 00 00 00 00 ` | Reserved |

### 恢復指令 (Error Recovery)

| **Command Name** | **Type/Req/Val/Idx** | **Description** |

| **Restore PD** | `0x40 C2 02 04 00 00 03 00` | Data: `[Addr_H, Addr_L, GL9511_NonRunning_bank]` |

| **Restore Scaler** | `0x40 C2 02 0800  00 07 00` | Data: `[Scaler_Addr_H/M/L, Flash_Addr_H/M/L, Count]` |

### 狀態查詢 (Polling)

| **Command Name** | **Type/Req/Val/Idx** | **Return Data** |

| **Get Status (PD)** | `0xC0 C2 00 00 00 00 03 00` | `STS, Addr_H, Addr_L` |

| **Get Status (Scaler)** | `0xC0 C2 01 00 00 00 08 00` | `STS, Scaler_Addr(3), Flash_Addr(3), Count` |

### 狀態碼定義 (Status Code)

- **0x01 / 0x10 (ENABLE):** FW 忙碌中 (正在跑圖一/圖二的 Loop)。

- **0x04 / 0x40 (ERROR):** 發生錯誤 (Retry 失敗)，等待 Tool 救援。

- **0x08 / 0x80 (DONE):** 更新成功。

## Tool String(ISP Extend funciton)

| **Function Name** | **Length** | **Type** | **Description / Bit Definition** |

| ISP Extend function | 1 | Firmware | **Bit0** : (N/A)
**Bit1** : Support Scheduled FW Update
**Bit2** : Scaler ISP Speed up
**Bit3** : Hub Disconnect update support
**Bit4** : `OCI ONELINE ISP SPEEDUP` |
