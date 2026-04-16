

- [未有直接 Source 錨點，待確認] **優先權**: 開案的優先順序
- [未有直接 Source 錨點，待確認] **提供日期**: 開案被提出的日期
- [未有直接 Source 錨點，待確認] **狀態**: 開案的目前狀態
- **Assign FAE**: 被指派負責此開案的 FAE
- **Project Name**: 相關的專案名稱
- **Brand factory**: 品牌工廠
- **Support Update Chip id 和個數**: 支援更新的 Chip ID 和數量
- **Support update ic vendor**: 支援更新的 IC 廠商
- **Update Tool**: 用於更新的工具
- [未有直接 Source 錨點，待確認] **是否有提供板子**: 是否有提供硬體板子
- **是否有提供文件 (電路圖, 更新流程)**: 是否有提供相關文件

- [未有直接 Source 錨點，待確認] **新功能開發**: 是否有新功能需要開發
- **Bug 回報修改**: 是否有 Bug 需要回報和修改

1. **Monitor Firmware Multi-Path Update Architecture**:
   - 描述了 Monitor 韌體的多路徑更新架構，包括 Host PC、USB Hub、Downport Update Path 和 Scaler I2C Update Path。 `[Monitor debug & 參考資料](monitor-debug-參考資料.html)`
2. **Monitor Debug 步驟**:
   - 列出了 Monitor 除錯的步驟，包括分析 Update Tool Log/Error Code、檢查 Hub 資訊、確認主機與顯示器的相容性、檢查硬體板號或維修紀錄、比對 USB 資料流和 I2C 訊號檢查。 `[Monitor debug & 參考資料](monitor-debug-參考資料.html)`
3. **I2C Update 流程說明**:
   - 描述了 I2C 更新的流程，包括 PC Update Tool 透過 USB Request 傳送給 Hub，Hub 組合出特定 I2C Command 轉送給 Scaler，以及使用 Bus Hound USB 和 Logic Analyzer 進行訊號驗證和除錯。 `[Monitor debug & 參考資料](monitor-debug-參考資料.html)`
4. **Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)**:
   - 闡述了 Genesys Logic 為滿足 HP Code Signing 安全要求所設計的韌體簽署與驗證架構，包括核心要求、挑戰和最終方案。 `[Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)`
5. **3rd party code signing specification (ECDSA)**:
   - 概述了 Genesys Logic 的程式碼簽署和驗證流程，包括簽署和驗證的實作方式。 `[3rd party code signing specification (ECDSA)](code-sign/3rd-party-code-signing-specification-ecdsa.html)`
