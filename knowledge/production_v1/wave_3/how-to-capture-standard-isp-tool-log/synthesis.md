

1. 開啟 `GLHub_Std_GL9510_I2C_v1.03.ini` 檔案。
   - 公鑰位置資訊 (0xF4-0xF6)
   - 驗證資訊位置 (0xF7-0xF9)

[未有直接 Source 錨點，待確認] 4. 在同一目錄下，您將會看到一個 `log` 資料夾。
[未有直接 Source 錨點，待確認] 5. 提供位於 `log` 資料夾中的記錄檔供我們分析。


1. [GL7524 A02 Code-Sign 與 ISP 安全架構(Case 3)](./gl7524-a02-code-sign-與-isp-安全架構case-3.html)
     - Bit6 = 0 (跟隨 FW 起始 Block)
     - Bit6 = 1 (由 Bit0-5 明確指定)
- [未有直接 Source 錨點，待確認] 說明了 FW 規劃和工具鏈流程。

2. [Clawdbot 自主代理建置與資安防禦全紀錄](./clawdbot-自主代理建置與資安防禦全紀錄.html)
   - 介紹了 Clawdbot 系統的核心 Prompt 和執行前提。

3. [Genesys Logic Spec](./genesys-logic-spec.html)
   - 包含了 Vendor Command、Hub 配置、PD 配置、PD 更新流程等相關規格。
   - 涵蓋了 Apple、HP 和 MTK/RTK Scaler 等不同廠商的規格文件。
