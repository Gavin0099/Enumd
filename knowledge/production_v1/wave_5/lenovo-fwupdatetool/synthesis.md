
# Lenovo FWUpdateTool

Lenovo 的顯示器型號 T27q-20 和 T24i-2L 使用了不同的 scaler 晶片 (MTK 和 RTK)，而同一個 scaler 晶片下又可能使用不同的面板，每個面板所需的韌體 (FW) 也不相同。如果使用原始的命令列工具 (Command Line Tool)，需要為每種組合準備一個專屬的工具，而且螢幕外觀都一樣，很難分辨要使用哪一個工具。因此 Lenovo 希望能夠提供一個單一的工具，可以同時更新各種不同的組合。

Lenovo 的顯示器可以透過 DDCCI 協定獲取一些資訊，其中包括料號 (Part Number)。每一個不同的面板都會有不同的料號，不同面板的料號不會相同。因此可以利用料號的方式來決定要更新的韌體資訊。

- [未有直接 Source 錨點，待確認] 下 DDCCI 的程式，需要透過治具，指令可參考上方投影片

## Command Line Tool 設定
  - MStar_Scaler: 這部分一定要設定，但可以隨意指定，只要讓程式有讀到東西，否則在 ISP 之前就會出現錯誤。真正的晶片設定會在另一個檔案中進行。
  - CheckPartNumber: 設為 1 才會開啟使用 Part Number 燒錄的功能。
  - I2cWriteLength: 此為 RTK 專用，指定每一次 Write 最多寫多少。
- [RTDxxxx]: RTK Scaler 的設定，與其他工具設定都一樣，只要有用到的 Scaler Chip 都要設定在 GLHub.ini 中。

### PartNumber.ini
- [XXX.XXXXX.XXXX]: 料號，長度固定為 14，格式的說明在上方投影片 Page7 有詳細介紹。
  - BinFile: Bin 檔案路徑。
  - IspStartAddress: 燒錄在 flash 內的開始位置。
  - Flag1, Flag2: UserFlag 的值，通常是 0xAA55。
  - FlagAddress: UserFlag 燒錄的位置。
  - ScalerChip: RTK 或 MTK 的 Scaler chip type，如果是 RTK 的 Scaler，設定的內容需要在 GLHub.ini 內有對應的設定。

1. Command Line Tool 下 `/pu` 開始流程，會從 `GLHubUpdateTool_Lenovo.cpp` 的 `ManualUpdateScalerByPartNumber()` 開始。
2. 先詢問料號，函式為 `RealtekScalerCtrl` 和 `CMStarScalerCtrl` class 內的 `GetPartNumber()`，程式會顯示問到的料號。
3. 根據料號去 `PartNumber.ini` 內找對應的 Section，如果沒找到，顯示錯誤訊息並結束程式。
4. 找到對應的料號後，進入 `RealtekScalerCtrl` 和 `CMStarScalerCtrl` 的 `Isp()` 內。
5. 兩個 class 都會呼叫 `ReadIniSetting()`，在 `ReadIniSetting()` 後需要根據 `PartNumber.ini` 的內容讀取燒錄的資訊。

[HP Hemi(Z34c) CPU3 Code Sign 驗證問題](code-sign/hp-hemiz34c-cpu3-code-sign-驗證問題.html)
[TVSU(ThinkVantage System Update) FWUpdate需求](general/tvsuthinkvantage-system-update-fwupdate需求.html)
[Lenovo Update Debug Flow](general/lenovo-update-debug-flow-.html)
