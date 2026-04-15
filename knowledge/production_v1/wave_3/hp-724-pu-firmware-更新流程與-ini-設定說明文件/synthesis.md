以下是 HP 724 pu firmware 更新流程與 ini 設定說明文件的綜合報告:

# HP 724 pu firmware 更新流程與 ini 設定說明文件

## 總覽 (Overview)
本文件旨在說明 HP 724 pu 裝置的韌體更新機制。此更新機制採用一個兩階段的判斷流程:

1. 第一階段為 LegacyDate 捷徑判斷 - 程式會利用 LegacyDate 進行快速判斷來處理非常早期的韌體版本。[`[HP Monitor Code Sign Update Flow](code-sign/hp-monitor-code-sign-update-flow.html)`]

2. 第二階段為標準的「查表執行」流程 - 程式會讀取裝置當前的 Firmware Packet Date，在 ini 設定檔中查找與該日期完全匹配的區塊，並直接使用該區塊中指定的 BinFile 檔案來進行更新。

## INI 檔案設定說明 (MonitorUpdates.ini) [`[HP RTK Scaler Code Sign](code-sign/hp-rtk-scaler-code-sign.html)`]
INI 檔案是更新規則的唯一來源。使用者必須為每一個已知的 PacketDate 建立一個對應的日期區塊，並在其中透過 BinFile 參數，明確指定當裝置 PacketDate 為此日期時，應該使用哪一個具體的 scaler.bin 檔案。

[未有直接 Source 錨點，待確認] PanelName=bydate
[未有直接 Source 錨點，待確認] LegacyDate=20240331

BinFile=Firmware/HP_724pu_PanelWISTRON_724pu_BD_WISTRON_Z24uG3_E1IM1131_V1.20.2.0_20250731_sig_Service_Header.bin

BinFile=Firmware/HP_724pu_PanelWISTRON_724pu_BD_WISTRON_Z24uG3_E1IM1131_V1.20.2.0_20250731_sig_Service_Header.bin

BinFile=Firmware/HP_724pu_PanelWISTRON_724pu_BD_WISTRON_Z24uG3_E1IM1131_V1.20.2.0_20250801_sig_Service_Header.bin

- [Unify] 區塊: 定義了通用的設定，如 ModelName 和 PanelName。
- [YYYYMMDD] 日期區塊 (例如 [20240331]): 為每個已知的 PacketDate 建立一個對應的日期區塊，並指定該日期應使用的 BinFile。

## 處理流程詳解 (Flowchart Explained)

1. **開始更新程序**: 啟動韌體更新流程。
2. **讀取裝置資訊**: 獲取裝置當前的 Firmware Packet Date。
3. **第一階段：LegacyDate 捷徑判斷**: 如果 PacketDate 小於 20240401，則使用舊版預設的 Scaler Bin 進行更新。
4. **第二階段：在 INI 中查找匹配項**: 如果未命中 LegacyDate 捷徑，則在 INI 設定檔中查找與 PacketDate 完全匹配的日期區塊。
   - 如果找到匹配項，則讀取該區塊中指定的 BinFile 路徑。
   - 如果未找到匹配項，則錯誤終止，不執行 Scaler FW 更新。
5. **執行 Scaler 更新**: 使用讀取到的 BinFile 路徑進行 Scaler 韌體更新。

![Flowchart](code-sign/hp-monitor-code-sign-update-flow.html)

[未有直接 Source 錨點，待確認] 根據流程圖左上角的提示，此方案存在以下限制:

1. **維護成本 (Maintenance Cost)**: 隨著時間推移，需要不斷維護 INI 設定檔中的日期區塊和對應的 BinFile 路徑。
2. **發布限制 (Release Constraint)**: 每次發布新的韌體版本時，都需要更新 INI 設定檔。
3. **禁止韌體降級 (No Downgrade)**: 此方案不支持韌體降級操作，只能進行韌體升級。