
# HP ISP Tool Hub Update Flow

1. 開啟 `GLHubDriver.exe`
2. 按下 `Install Driver Ver 1.7`

1. 開啟 `HP_ISPTool.exe`
2. 勾選 USB Hub -> Open -> Start ISP


1. **目標裝置比對**：為了避免在客戶端燒錄韌體到非預期的裝置中導致 hub 發生錯誤而無法使用，需要透過 `TargetDeviceChecker` 類別和 `TargetDevice.ini` 設定檔來比對目標裝置。[How to bound target device](./general/how-to-bound-target-device.html)
   1. 將裝置列表的所有內容放到 `不符合` 的列表中
   2. 從 `不符合` 的列表找到第一個目標裝置
   3. 從 `不符合` 的裝置列表往後比對第二、第三等目標裝置
   4. 沒找到所有目標裝置，將 `已符合` 列表中的內容放回 `不符合` 的列表並排序，再從第一個目標裝置的下一個位置(offset A的下一個)再次執行步驟 2 以後的流程

3. **TargetDevice.ini 範例**：
   FwAvailable=hub,pd
[未有直接 Source 錨點，待確認] MaskString=7441102352330
[未有直接 Source 錨點，待確認] VendorString=0000100000
   
[未有直接 Source 錨點，待確認] MaskString=7441102352330
[未有直接 Source 錨點，待確認] VendorString=0000000000

4. **TargetDevice.ini 設定**：
   - 自定義設定：`[DevX]`, `ChipId`, `PortLocation`, `FwAvailable`
   - USB Device Descriptor: `VID`, `PID`, `Rev`, `Manufacturer`, `Product`, `ToolVersion`, `MaskString`, `RunningString`, `VendorString`


如果 ISP 工具更新失敗，可以參考 [Standard ISP Tool Roll Back Flow](./tools/standard-isp-tool-roll-back-flow.html) 進行回溯:

1. 開啟 `GLHubDriver_v2.3.0.exe`
2. 安裝 Driver Ver 2.3
4. 按下 Erase Flash 按鈕
5. 斷電重啟後，選擇舊版 hub bin 檔案並執行 ISP