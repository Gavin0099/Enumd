


1. 在 ISP 工具目錄中打開 `GLHub_Std_multi_v1.03.ini` 檔案。
2. 在 `GLHub_Std_multi_v1.03.ini` 中添加以下參數。[`GL7524-A02-Code-Sign-與-ISP-安全架構(Case-3)`](./gl7524-a02-code-sign-與-isp-安全架構case-3.html)
[未有直接 Source 錨點，待確認] 4. 您可以在 ISP 工具資料夾中看到一個日誌資料夾，請將日誌檔案發送回來以供我們分析。


### GL7524 A02 Code-Sign 與 ISP 安全架構(Case 3)


1. **Bit6 = 0 (跟隨 FW 起始 Block)**: 公鑰和驗證資訊的位置與韌體 (FW) 的起始 Block 相同。這是一種簡化的預設行為。
2. **Bit6 = 1 (顯式指定 Block)**: 公鑰和驗證資訊的位置由 Bit0-5 明確指定，與韌體所在的 Block 可以完全無關。這種模式提供了最大的佈局自由度。


### Clawdbot 自主代理建置與資安防禦全紀錄

[未有直接 Source 錨點，待確認] 本文件記錄了在建置 Clawdbot 自主代理系統時遇到的一些故障排除案例,以及最終的穩定配置和資安防禦措施。其中包括:

2. 404 模型不存在 (API Layer)
3. Webhook 與網路隧道

[未有直接 Source 錨點，待確認] 文件最後還提供了一些給 Antigravity 功能擴充的設定和資安建議。

### Genesys Logic Spec

本文件彙總了 Genesys Logic 相關的各種規格和應用說明,包括:

1. Vendor Command
2. Hub Configuration
3. PD Configuration
4. PD Update Flow
7. MTK Scaler Spec
8. RTK Scaler Spec

這些內容涵蓋了 ISP 工具的各種配置和應用場景,為理解 ISP 工具的使用提供了重要的背景資訊。