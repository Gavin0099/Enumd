
# Hub Driver Debugging method (CSR)

## Class & Device Filter driver 判斷方式
1. 開始 —> 右鍵 —> 電腦管理
[未有直接 Source 錨點，待確認] 2. 裝置管理員 —> 通用序列匯流排控制器
[未有直接 Source 錨點，待確認] 3. 尋找每個裝置是否有下面截圖的資訊(2.0 或 3.0 有找到其中一個即可)
4. 如果有找到的話 驅動程式 —> 驅動程式詳細資料 看是否有 `glusbflt.sys`

## SC query 判斷驅動程式方式
Obtains and displays information about the specified service, driver, type of service, or type of driver。

### sc query glusbflt
> **Note:** 確認有安裝驅動程式且有插上 GL Hub

- RUNNING: 有插上 GL Hub，有安裝驅動程式
- STOPPABLE: 未插上 GL Hub，有安裝驅動程式
- [SC] EnumQueryServicesStatus:OpenService FAILED 1060: 未安裝驅動程式

### sc query glusbfltservice
> **Note:** 確認 device filter driver 的 service 是否有掛上

- RUNNING: 有安裝 device filter driver
- [SC] EnumQueryServicesStatus:OpenService FAILED 1060: 未安裝 device filter driver

以上方法可用於判斷 Hub Driver 的安裝狀態和運作情況。

- [Hub Driver 除錯方式](hub/hub-driver-除錯方式.html)
  - 提供了更詳細的 Class & Device Filter driver 判斷方式和 SC query 判斷驅動程式方式。
  - 另外也介紹了 Class filter driver reg 移除方式、判斷 device filter driver 版本，以及 class & device filter driver 安裝互相影響的情況。
- [SC query to determine the driver mode](driver/sc-query-to-determine-the-driver-mode.html)
  - 更詳細地解釋了 `sc query glusbflt` 和 `sc query glusbfltservice` 的用途。

總之，上述方法可用於判斷 Hub Driver 的安裝狀態和運作情況。如果需要更深入的除錯或疑難排解，可參考相關內容。