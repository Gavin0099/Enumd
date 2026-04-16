以下是 Saleae logic i2c Tool 使用說明的綜合報告:

# Saleae logic i2c Tool 使用說明

[Saleae Logic](https://support.saleae.com/logic-software/logic-software-downloads) 是 Saleae 公司推出的邏輯分析儀，其主要特點是能將 I2C 資料存儲在電腦上，因此可以錄製大量的資料而不受邏輯分析儀 RAM 容量的限制。

1. 執行 Saleae Logic 軟體後，點選右方的 `Analyzers` 選項。
[未有直接 Source 錨點，待確認] 2. 在右上角點選 `+` 符號，並選擇 `I2C` 分析器。
[未有直接 Source 錨點，待確認] 3. 設定所需的 channel。
4. 點擊右側的 `Device Settings` 選項。
5. 在右側介面中可以顯示/隱藏 channel，並在下方設定 buffer 大小。
6. 請參照下圖紅框所示，Channel 0 (SCL)、Channel 1 (SDA) 對應機器上的 0 & 1 引腳，G 為 GND。

1. 按下 `Start` 可開始記錄波形。
2. 按下 `Stop` 會停止記錄。
4. 資料分析方式可在 `Analyzers` 選項中的 `Terminal` 頁面進行。

## 錄製的 raw data 超過 10,000 行的處理
當錄製的資料超過 10,000 行時，舊的資料會被覆蓋。從 v2.4.4 版本開始，可以透過設定環境變數來增加緩衝區大小:

set SALEAE_SCROLLBACK_LIMIT=1000000

# macOS and Linux
export SALEAE_SCROLLBACK_LIMIT=1000000

這樣可以將緩衝區大小增加到 100,000 行。

[Saleae Logic](https://support.saleae.com/logic-software/logic-software-downloads)