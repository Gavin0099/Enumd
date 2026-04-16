
# HP Monitor ISP Tool 開發和驗證方式

HP ISP Tool 是工程用的 ISP 工具，提供工程師在量產前進行驗證。工程師可以自行選擇要更新的韌體，並查看更詳細的資訊。

## HP EndUser Tool
HP EndUser Tool 是提供給終端客戶使用的更新工具。只需要按一個按鍵就可以更新韌體。要更新的二進位檔案和包裝流程主要由代工廠設定，我們只提供資料夾。相關的設定和包裝文件可以參考 [HP End User Tool Packing User Guide](path/to/hp-end-user-tool-packing-user-guide.html)。

## HP Command Line Tool
HP Command Line Tool 是提供給公司統一更新顯示器韌體的工具。MIS 可以透過此工具對公司每一台顯示器進行韌體更新。

## HP Monitor 治具更新方式
當使用工具更新 Scaler 失敗時，有機率會導致 Scaler 掛掉。因為 Hub 是透過 Scaler 提供電源的，Scaler 掛掉後 Hub 就偵測不到。這時候就必須透過治具更新才能恢復。下圖為治具圖片，必須接上 HDMI 和 USB 2.0 線才能進行更新。

更新方式分為 low level 和 high level 兩種:

### Low Level 更新
1. 開啟 `HP_ISP_Tool_(RD_Version)_V1.1.12`。
2. Connect -> Read -> 選擇要更新的 Scaler 韌體。
3. 選擇完檔案後 -> Auto -> Ctrl + Alt + O (密碼: 80336647)。
4. Erase Device -> All Chip，取消勾選 Pub Key Form Mnt -> Run。

### High Level 更新
1. 開啟 `ISP_Tool(v5.0.3)_Beta`。
2. Connect -> Read -> 選擇要更新的 Scaler 韌體。
3. Auto -> Erase Device: All Chip -> Run。

## HP Monitor 開發常見問題

### DDC/CI command 不通
**現象**: Scaler Level 和 Scaler 韌體版本都抓取到錯誤的值。
[未有直接 Source 錨點，待確認] 1. 檢查 i2c 訊號量測是否有正常傳輸資料。
2. 請 MTK 提供相關的新版 Scaler 韌體。

**現象**: 在更新 Scaler 時，有機率會更新失敗。
**解決方法**: 統一使用 USB 2.0 進行更新。這個問題主要是 Hub 韌體和 Scaler 韌體的 i2c clock 問題。

### 如何判斷 Scaler 資料或 offset 是否正常
**現象**: 更新完 Scaler 後可能會出現以下情況:
[未有直接 Source 錨點，待確認] 1. Scaler 韌體版本不正確。
2. 更新後偵測不到 Hub，代表 Scaler 更新失敗，無法從 boot code 開機。
1. 透過 MTK ISP Tool 和治具，先 dump Scaler 資料 (Connect -> Load)。
2. 確認好 start & end address -> Run。
3. 將 dump 出來的 `SpiFlash.bin` 與原本的 Scaler 韌體 bin 檔進行比較。

### Low Level 載入 Scaler 韌體 bin 驗證失敗
**現象**: Low Level 的 Scaler 驗證是透過工具進行，有時開啟 Scaler bin 檔會顯示驗證失敗。
1. 開啟 ISP Tool 時，先透過 Bus Hound 觀察 `c0 a4 06 00 00 00 20 00` (抓取 Scaler Public Key Vendor command)。
   - 成功: public key 基本上都是英文和數字組成，不會有非 ASCII 的值出現。
   - 失敗: 紅框部分為非 ASCII 值，代表抓到的 public key 是錯誤的。
2. 如果 public key 抓取成功後，驗證 Scaler bin 檔還是失敗，可以手動下指令驗證。
   在 HP ISP Tool 同一個路徑下有 `rsa_decrypt.exe`，下指令可以手動驗證此 Scaler bin 檔是否合法:
   rsa_decrypt.exe "Scaler File Name"
   此方法可以驗證抓到的 Scaler public key 是否符合。

[eToken 安全簽章系統技術說明](path/to/etoken-安全簽章系統技術說明.html)介紹了簽章系統的整體架構和處理流程。


[HP RTK Scaler Code Sign](path/to/hp-rtk-scaler-code-sign.html) 則介紹了 RTK Scaler 的數位簽章驗證流程。

這些相關文件可以提供更多關於 HP Monitor ISP Tool 開發和驗證的技術細節。