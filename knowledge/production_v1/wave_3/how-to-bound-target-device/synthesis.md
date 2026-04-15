

在市面上使用公司 hub chip 的周邊產品越來越多樣,且出貨也越來越多。若在客戶端燒錄韌體到非預期的裝置中,導致 hub 發生錯誤而無法使用,將造成後續很多維修的支出,甚至危害公司名聲。

為了確保操作的是目標裝置,需要在可操作的 hub 裝置列表中,透過比對目標裝置資訊,將不是目標的裝置移除。

在 ISP 新架構的框架下,透過類別 `TargetDeviceChecker` 及設定的 `TargetDevice.ini` 檔案來進行目標裝置的比對。

`TargetDeviceChecker` 會在 Tool 啟動後將 `TargetDevice.ini` 中的參數解析後存放在內部記憶體中,之後每次 `AcquireDevice()` 的流程中都會呼叫 `MatchDevice()`。

1. 將裝置列表的所有內容放到「不符合」的列表中。
2. 從「不符合」的列表找到第一個目標裝置。
3. 從「不符合」的裝置列表往後比對第二、第三等目標裝置。
4. 若沒找到所有目標裝置,將「已符合」列表中的內容放回「不符合」的列表並排序,再從第一個目標裝置的下一個位置(offset A的下一個)再次執行步驟 2 以後的流程。

### `TargetDevice.ini` 範例
以下是用於 QSI Targus Dock310 的設定內容:

FwAvailable=hub,pd
[未有直接 Source 錨點，待確認] MaskString=7441102352330
[未有直接 Source 錨點，待確認] VendorString=0000100000

[未有直接 Source 錨點，待確認] MaskString=7441102352330
[未有直接 Source 錨點，待確認] VendorString=0000000000

### `TargetDevice.ini` 設定參數

- [未有直接 Source 錨點，待確認] `ChipId=GL3523`
- [未有直接 Source 錨點，待確認] `PortLocation=04`
- `FwAvailable=hub,pd,dc...`

#### USB Device Descriptor
- `PID=0610,0620`
- [未有直接 Source 錨點，待確認] `Manufacturer=GenesysLogic`
- `Product=USB2.1 Hub,USB3.1 Hub`
- [未有直接 Source 錨點，待確認] `ToolVersion=3`
- [未有直接 Source 錨點，待確認] `MaskString=7441102352330`
- [未有直接 Source 錨點，待確認] `RunningString=7394102352310`
- [未有直接 Source 錨點，待確認] `VendorString=0000000000`

透過 `TargetDeviceChecker` 類別和 `TargetDevice.ini` 設定檔,可以在 ISP 工具中確保只操作目標裝置,避免錯誤燒錄導致的後續維修支出和公司聲譽受損。