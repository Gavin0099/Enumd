
# Monitor debug & 參考資料

## Monitor Firmware Multi-Path Update Architecture
[Monitor Firmware Multi-Path Update Architecture](monitor-debug-參考資料.html#monitor-firmware-multi-path-update-architecture)


1. **Host PC**: 主機電腦，負責透過 USB 連接與韌體更新。
2. **USB Hub**: 連接主機與各個韌體更新路徑的中樞。
3. **Downport Update Path**: 透過 USB 連接的韌體更新路徑，包含 PD Controller、DMC Chip、Audio Chip 和 Gamma Retimer。
4. **Scaler I2C Update Path**: 透過 I2C 連接的韌體更新路徑，包含 Scaler IC、PD Controller、DMC Chip、Audio Chip、Gamma Retimer 和 Camera Module。


## Monitor Debug 步驟
[Monitor Debug 步驟](monitor-debug-參考資料.html#monitor-debug-步驟)

Monitor 韌體更新的 Debug 步驟包括:

1. 分析 Update Tool Log / Error Code `[Monitor Debug 步驟](monitor-debug-參考資料.html#monitor-debug-步驟)`
2. 使用 usbview 檢查 Hub 資訊 `[Monitor Debug 步驟](monitor-debug-參考資料.html#monitor-debug-步驟)`
3. 確認主機與顯示器的相容性 `[Monitor Debug 步驟](monitor-debug-參考資料.html#monitor-debug-步驟)`
4. 檢查硬體板號或維修紀錄 `[Monitor Debug 步驟](monitor-debug-參考資料.html#monitor-debug-步驟)`
5. 比對 USB 資料流 `[Monitor Debug 步驟](monitor-debug-參考資料.html#monitor-debug-步驟)`
6. I2C 訊號檢查 `[Monitor Debug 步驟](monitor-debug-參考資料.html#monitor-debug-步驟)`


## I2C Update 流程說明
[I2C Update 流程說明](monitor-debug-參考資料.html#i2c-update-流程說明)


1. 軟體 (PC Update Tool) 透過 USB Request 傳送更新指令給 USB Hub。
2. USB Hub 會組合出特定的 I2C Command，並轉送給 Scaler IC。
3. 可以使用 Bus Hound USB 和 Logic Analyzer 來監控 USB 和 I2C 訊號，進行驗證和 Debug。



- [未有直接 Source 錨點，待確認] **Camera**: 顯示器上的攝像頭模組。
- **HID**: Human Interface Device，用於韌體更新的通訊協定。
- **ISP**: In-System Programming，韌體燒錄工具。
- [未有直接 Source 錨點，待確認] **OCI**: Original Component Integrator，韌體更新工具。
- **PD Controller**: Power Delivery Controller，負責電源管理的晶片。
- **DMC Chip**: Display Motion Compensation Chip，負責影像處理的晶片。
- **Audio Chip**: 音訊處理晶片。
- **Gamma Retimer**: 伽瑪校正晶片。
- **Scaler IC**: 縮放晶片，負責影像尺寸調整。
