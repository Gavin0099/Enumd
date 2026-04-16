
# ZEROPLUS_LAP I2c 訊號錄製方式

當 MTK Scaler 在通訊時遇到無法判斷是 Hub 還是 Scaler 的問題時，需要透過抓取 I2C 訊號和 Bus Hound 資料進行比對分析。為此需要使用 Logic Analyzer 來錄製 I2C 訊號。

1. 安裝 Logic Analyzer 軟體 `[lac_s31403_all.rar](Z:\SW_Release_New\Hub\lac_s31403_all.rar)`。
2. 開啟 Logic Analyzer，並載入預先設定好的 I2C 設定檔 `[i2c.alc](Z:\SW_Release_New\Hub\i2c.alc)`。
3. 依照 `i2c.alc` 的設定接上測試線，並將其連接到指定位置（請 FAE 協助將 I2C 測試線接出）。
5. 如果需要錄製較多資料，可以調整設定為 `Sampling size < 2M` 並勾選壓縮選項。
6. 以抓取 Scaler Firmware Version 為例，錄製的資料如下圖所示。

![Scaler Firmware Version 抓取範例](Genesys to Scalar with RT1711 communcation apn V13.pdf)
