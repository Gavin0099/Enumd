以下是基於提供的內容所撰寫的 8D 報告:

# 8D 報告 - HP E22 G4/E23 G4/E24 G4/E24i G4 EndUser Tool


HP E24i EndUser Tool 在更新新版的 scaler (TSUM_R2) 時，會認為是最新版本而直接跳過不更新。

問題的根源在於 `GetScalerFirmwarePacketVersion()` 函數中的判斷式有錯。原本的判斷式如下:
這樣可以確保無論 scaler chip 是 TSUM_CD 還是 TSUM_R2，都能正確地判斷 scaler firmware 的版本。

HP E24i 的 scaler chip 從原本的 TSUM_CD 改為 TSUM_R2。這款機型在 2019 年推出時，scaler 的 SW 版本 (packet version) 並不支援 TSUM_R2。

當初判斷新舊 update 流程是透過 ini 設定檔中的參數。但現在新舊版 chip 混合使用，我們無法再單純依賴 ini 參數來判斷。後來我們想到一個辦法，就是不管 TSUM_CD 還是 TSUM_R2，都直接去取得 Firmware Packet Version，因為它有回傳碼可以用來判斷。

不過在修改完程式碼後，我們只驗證了 TSUM_CD chip，導致出現了這個 bug。

除了針對不同 scaler chip 進行驗證以外，我們還需要建立一份 Release Tool 的檢查清單 (Check list)，確保在發佈前能全面檢查各項功能。

永久對策為建立 Release Tool 的檢查清單。

我們已經建立了 Release Tool 的檢查清單,並確保在發佈前能完整執行。

我們將 Release Tool 的檢查清單納入標準作業流程,確保未來每次發佈前都必須執行。

[8D(Eight Disciplines Problem Solving)](https://en.wikipedia.org/wiki/Eight_Disciplines_Problem_Solving)