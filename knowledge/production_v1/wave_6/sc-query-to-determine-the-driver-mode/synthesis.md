基於提供的內容邊界,我們可以合成以下關於「SC query 判斷 driver 方式」的詳細報告:

# SC query 判斷 driver 方式


- [Hub Driver Debugging method (CSR)](hub-driver-debugging-method-csr.html)
  - 介紹了判斷 Class & Device Filter driver 的方法,包括在 Device Manager 中查看 Universal Serial Bus controllers 的資訊,以及檢查 glusbflt.sys 驅動程式的版本。
- [Hub Driver 除錯方式](hub-driver-除錯方式.html)
  - 提供了與上述相同的 Class & Device Filter driver 判斷方式。
  - 同時也介紹了 SC query 判斷 driver 的方式,以及移除 class filter driver reg 參數的方法,以及判斷 device filter driver 版本的步驟。
  - 最後討論了 class & device filter driver 安裝的相互影響。

## SC query 判斷 driver 方式
根據提供的內容,可以使用以下 SC query 命令來判斷驅動程式的狀態:

1. `sc query glusbflt`
   - **Note:** 確認有安裝驅動程式且有插上 GL Hub
   - `RUNNING`: 有插上 GL Hub,有安裝驅動程式
   - `STOPPABLE`: 未插上 GL Hub,有安裝驅動程式
   - `[SC] EnumQueryServicesStatus:OpenService FAILED 1060`: 未安裝驅動程式

2. `sc query glusbfltservice`
   - **Note:** 確認 device filter driver 的 service 是否有掛上
   - `RUNNING`: 有安裝 device filter driver
   - `[SC] EnumQueryServicesStatus:OpenService FAILED 1060`: 未安裝 device filter driver

