


- 首先驗證 IC 7518，並後續擴展至其他 IC。
- 自動偵測所有 Windows USB 裝置，並支援同時測試多個裝置。

- 不同 IC 可能有不同的虛擬裝置 (Virtual Device) 結構與端點 (Endpoint) 配置，工具需能適應變化。
- 測試過程中需處理中斷 (Interrupt)、批次 (Bulk)、控制 (Control) 等類型的數據傳輸，確保裝置穩定運行。


工具需支援以下 4 種 USB 端點 (Endpoint) 測試：

## 3. IC 7518 的虛擬裝置結構

IC 7518 內建兩種虛擬裝置，各自的端點配置如下：


- 目標：驗證 Interrupt IN/OUT 端點是否能正確傳輸數據。
- 測試方式：[`filter_control.c`](./filter_control.c)

### (B) EP0 Setup Command 測試
- 目標：在讀寫測試進行時，隨機插入 EP0 setup command，確認不同端點是否相互影響。
- 測試方式：[`filter_control.c`](./filter_control.c)

### (C) Reset & Enumeration 測試
- 目標：驗證在讀寫過程中，執行裝置 Reset & Enumeration 是否影響數據傳輸。
- 測試方式：[`filter_fdo.c`](./filter_fdo.c)


[未有直接 Source 錨點，待確認] 為了確保測試全面性與準確性，工具需具備以下能力：

- 自動偵測所有 Windows USB 裝置，支援同時測試多個裝置。
- 針對不同虛擬裝置 (如 USB-C Bridge、HID)，執行 Interrupt IN/OUT 測試並比對數據。
- 隨機插入 EP0 setup command（包含 GET & SET），模擬實際應用環境並測試端點穩定性。
- 執行不定時 Reset & Enumeration 測試，確保裝置可正常重置並恢復運作。
- 可擴展支援不同 IC 型號，適應各種虛擬裝置與端點配置。

    A[開始測試] --> B[偵測所有 Win USB 裝置]
[未有直接 Source 錨點，待確認] C -- 否 --> D[結束測試]
[未有直接 Source 錨點，待確認] C -- 是 --> E[初始化裝置]

    E --> F[開始 R/W 測試]
    F --> G[發送 Interrupt OUT]
    G --> H[等待 FW 回傳 Interrupt IN]
    H --> I{比對資料是否正確?}
    I -- 否 --> J[記錄錯誤 & 重新測試]
[未有直接 Source 錨點，待確認] I -- 是 --> K[資料比對成功]

    K --> L[隨機插入 EP0 Setup Command]
    L --> M{執行 GET/SET 測試}
    M -- 成功 --> N[繼續測試]

    N --> O[不定時 Reset Device]
    O --> P[重新 Enumeration]
    P --> Q{Enumeration 成功?}
    Q -- 是 --> F[繼續 R/W 測試]

    J --> R[記錄錯誤 & 產生報告]

[`filter.c`](./filter.c) 中的 `FilterEvtDeviceAdd` 函數負責在新裝置插入時進行初始化與掛載。[`filter_fdo.c`](./filter_fdo.c) 則處理 PnP 與 Power 事件，包括 Reset 與 Enumeration 測試。[`filter_control.c`](./filter_control.c) 實現了 IOCTL 命令的處理邏輯，如端點資料比對與 EP0 Setup Command 測試。