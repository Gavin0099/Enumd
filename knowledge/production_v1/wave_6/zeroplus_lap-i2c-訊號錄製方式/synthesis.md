
# ZEROPLUS_LAP I2c 訊號錄製方式

當 MTK Scaler 在通訊時遇到無法判斷是 Hub 還是 Scaler 的問題時，需要透過抓取 I2C 訊號和 Bus Hound 資料進行比對分析。這時可以使用 Logic Analyzer 來錄製 I2C 訊號。

1. 安裝 Logic Analyzer 軟體 `[Z:\SW_Release_New\Hub\lac_s31403_all.rar]`
2. 開啟 Logic Analyzer，並開啟預先設定好的 I2C 設定檔 `[Z:\SW_Release_New\Hub\i2c.alc]`
3. 根據 `i2c.alc` 的設定，將量測線接到指定的位置上 (請 FAE 協助將 I2C 量測線接出)
5. 如果需要錄製較多筆資料，可以調整設定為 `Sampling size < 2M` 並勾選壓縮選項
6. 以抓取 Scaler Firmware Version 為例，錄製的資料如下圖所示

![Scaler Firmware Version 抓取範例](Genesys_to_Scalar_with_RT1711_communcation_apn_V13.pdf)

1. 安裝並設定好 Logic Analyzer 軟體及 I2C 設定檔
4. 錄製完成後分析抓取的 I2C 訊號和 Bus Hound 資料

透過上述流程，可以有效地錄製 I2C 訊號並進行分析比對，協助判斷 Hub 和 Scaler 的通訊問題。