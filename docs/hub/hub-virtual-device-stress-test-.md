---
title: 'Hub virtual device stress test '
category: hub
notion_id: 19164f6b-c656-8013-90e4-ff783a98c341
notion_url: >-
  https://www.notion.so/Hub-virtual-device-stress-test-19164f6bc656801390e4ff783a98c341
notion_updated_at: '2026-01-21T09:36:00.000Z'
exported_at: '2026-04-06T11:27:16.625Z'
is_summarized: false
---

# USB 測試工具需求概述
本工具的目標是驗證 IC 7518，並擴展至其他 IC，確保不同 Win USB 裝置 的穩定性與數據傳輸正確性。
---
## 1. 測試範圍與挑戰
### 測試目標
- 先驗證 IC 7518，後續擴展至其他 IC。
- 自動偵測 所有 Win USB 裝置，並支援 同時測試多個裝置。
### 挑戰點
- 不同 IC 可能有不同的 Virtual Device 結構與 Endpoint 配置，工具需能適應變化。
- 測試過程中需處理 Interrupt、Bulk、Control 類型的數據傳輸，確保裝置穩定運行。
---
## 2. 支援的 Endpoint 類型
工具需支援以下 4 種 USB 端點 (Endpoint) 測試：
- Interrupt IN
- Interrupt OUT
- Bulk IN
- Bulk OUT
---
## 3. IC 7518 的 Virtual Device 結構
IC 7518 內建 兩種 Virtual Device，各自的 Endpoint 配置如下：
---
## 4. 測試內容與流程
### (A) Endpoint 資料比對
- 目標：驗證 Interrupt IN/OUT 端點是否能正確傳輸數據。
- 測試方式：
### (B) EP0 Setup Command 測試
- 目標：在 R/W 測試進行時，隨機插入 EP0 setup command，確認不同端點是否相互影響。
- 測試方式：
### (C) Reset & Enumeration 測試
- 目標：驗證在 R/W 過程中，執行裝置 Reset & Enumeration 是否影響數據傳輸。
- 測試方式：
---
## 5. 工具的核心功能
為了確保測試全面性與準確性，工具需具備以下能力：
- 自動偵測所有 Win USB 裝置，支援 同時測試多個裝置。
- 針對不同 Virtual Device (e.g., USB-C Bridge、HID)，執行 Interrupt IN/OUT 測試並比對數據。
- 隨機插入 EP0 setup command（包含 GET & SET），模擬實際應用環境並測試端點穩定性。
- 執行不定時 Reset & Enumeration 測試，確保裝置可正常重置並恢復運作。
- 可擴展支援不同 IC 型號，適應各種 Virtual Device 與 Endpoint 配置。
```mermaid
graph TD;
    A[開始測試] --> B[偵測所有 Win USB 裝置]
    B --> C{有找到裝置?}
    C -- 否 --> D[結束測試]
    C -- 是 --> E[初始化裝置]

    E --> F[開始 R/W 測試]
    F --> G[發送 Interrupt OUT]
    G --> H[等待 FW 回傳 Interrupt IN]
    H --> I{比對資料是否正確?}
    I -- 否 --> J[記錄錯誤 & 重新測試]
    I -- 是 --> K[資料比對成功]

    K --> L[隨機插入 EP0 Setup Command]
    L --> M{執行 GET/SET 測試}
    M -- 失敗 --> J
    M -- 成功 --> N[繼續測試]

    N --> O[不定時 Reset Device]
    O --> P[重新 Enumeration]
    P --> Q{Enumeration 成功?}
    Q -- 否 --> J
    Q -- 是 --> F[繼續 R/W 測試]

    J --> R[記錄錯誤 & 產生報告]
    R --> D[結束測試]

```
AOAI
