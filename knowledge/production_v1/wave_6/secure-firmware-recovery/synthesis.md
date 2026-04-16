[未有直接 Source 錨點，待確認] 以下是根據提供的內容所合成的「安全韌體恢復」技術規範報告:

### 1. 總覽與目的 (Executive Summary)
本文件是由 Open Compute Project (OCP) 發布的一份技術規範，旨在為資料中心硬體建立一套標準化、安全且可靠的韌體恢復機制。其核心目標是當裝置的韌體損壞、無回應或被惡意竄改時，平台管理者能夠透過一個獨立於主作業系統的低階通道，強制該裝置進入恢復模式，並將其恢復到一個已知、可信的安全狀態。此規範基於 NIST SP 800-193 的三大支柱：保護、偵測和恢復。

### 2. 關鍵角色與術語 (Key Roles & Terminology)
- AC-RoT (Active Component Root of Trust): 需要被恢復的裝置，如 PCIe 卡。
- PA-RoT (Platform Active Root of Trust): 平台管理控制器，如 BMC。
- RA (Recovery Agent): 位於 PA-RoT 內部的軟體模組，負責推送映像檔並協調恢復流程。
- 韌體映像檔類型: A/B Image (營運映像)、C-Image (恢復映像)、關鍵資料 (身份憑證、金鑰等)。

### 3. 恢復觸發條件與場景 (Recovery Triggers & Scenarios)

### 4. 恢復流程詳解 (Recovery Process Flow)
1. 偵測 → PA-RoT 判斷 AC-RoT 不健康。
2. 狀態查詢 → RA 讀取 DEVICE_STATUS。
3. 進入恢復模式 → 透過 DEVICE_RESET 觸發。
4. 載入恢復映像檔 → Push C-Image 或選擇本地 C-Image。
5. 啟動恢復映像檔 → RECOVERY_CTRL 控制重啟並執行 C-Image。
6. 執行恢復 → 推送完整的 A/B Image。
7. 完成與驗證 → 重啟後由 Attestation 驗證健康狀態。

### 5. 恢復原因碼 (Recovery Reason Codes)
- 可恢復: 如金鑰清單、啟動載入程式、韌體等問題。
- 條件式: 如軟體錯誤、關鍵資料毀損。

### 6. 恢復介面協定 (Recovery Interface Protocol)
### 6.1 傳輸層 (Transport Layer)
- 物理介面: SMBus/I2C。
- 拓撲: 支援共享或獨立地址（建議 0xD2 獨立地址）。
- 協定: 使用 SMBus 的塊讀寫命令。

### 6.2 間接記憶體介面 (Indirect Memory Interface - IMI)
- 功能: 用於推送 C-Image，採用視窗化方式存取 AC-RoT 內部記憶體空間。

### 6.3 主要命令時序圖 (Key Commands Sequence)
1. 探索能力 → 讀取 PROT_CAP。
2. 查詢狀態 → 讀取 DEVICE_STATUS。
3. 強制進入恢復模式 → 寫入 DEVICE_RESET。
4. 推送 C-Image → 寫入 INDIRECT_CTRL/INDIRECT_DATA。
5. 啟動 C-Image → 寫入 RECOVERY_CTRL。

### 7. 安全威脅模型與對抗策略 (Security Threat Model & Countermeasures)
### 8. 實作細節與最佳實踐 (Implementation Details & Best Practices)
### 9. 與其他規範的關聯性 (Relation to Other Specifications)

### 結論 (Conclusion)