基於提供的內容邊界,我們可以合成以下關於「SC query to determine the driver mode」的綜合報告:

# SC query to determine the driver mode

`[SC query to determine the driver mode](sc-query-to-determine-the-driver-mode.html)`可以獲取並顯示有關指定服務、驅動程式、服務類型或驅動程式類型的資訊。

## SC query 判斷驅動程式狀態
### `sc query glusbflt`
> **注意:** 確認已安裝驅動程式且已插上GL Hub

- `RUNNING`: 已插上GL Hub,已安裝驅動程式
- `STOPPABLE`: 未插上GL Hub,已安裝驅動程式
- `[SC] EnumQueryServicesStatus:OpenService FAILED 1060`: 未安裝驅動程式

### `sc query glusbfltservice`
> **注意:** 確認device filter driver的服務是否已停止

- `RUNNING`: 已安裝device filter driver
- `[SC] EnumQueryServicesStatus:OpenService FAILED 1060`: 未安裝device filter driver

`[Hub Driver Debugging method (CSR)](hub-driver-debugging-method-csr.html)`和`[Hub Driver 除錯方式](hub-driver-除錯方式.html)`提供了判斷Class & Device Filter driver的方法,包括:
1. 在裝置管理員中檢查Universal Serial Bus controllers,查看是否有相關資訊
2. 檢查驅動程式詳細資訊是否有`glusbflt.sys`

此外,`[Hub Driver 除錯方式](hub-driver-除錯方式.html)`也提供了移除Class filter driver reg參數的方法,以及判斷device filter driver版本的方式。

根據提供的內容,我們可以使用`sc query glusbflt`和`sc query glusbfltservice`命令來判斷驅動程式的安裝狀態和服務是否正常運行。同時,也可以參考相關文件中提供的其他方法,進一步確認驅動程式的詳細資訊。