
# Hub Driver 除錯方式

## 1. Class & Device Filter driver 判斷方式 [`Hub Driver Debugging method (CSR)`](hub/hub-driver-debugging-method-csr.html)
1. 開始 —> 右鍵 —> 電腦管理
[未有直接 Source 錨點，待確認] 2. 裝置管理員 —> 通用串列匯流排控制器
4. 如果有找到，則查看 Driver—> Driver Details 是否有 glusbflt.sys
5. 觀察 File version 的版本

## 2. SC query 判斷 driver 方式 [`SC query to determine the driver mode`](driver/sc-query-to-determine-the-driver-mode.html)
使用 `sc query` 指令可以得到 driver 的狀態資訊:
- `sc query glusbflt`
  - `RUNNING`: 已插上 GL Hub 且已安裝 driver
  - `STOPPABLE`: 未插上 GL Hub 但已安裝 driver
  - `[SC] EnumQueryServicesStatus:OpenService FAILED 1060`: 未安裝 driver
- `sc query glusbfltservice`
  - `RUNNING`: 已安裝 device filter driver
  - `[SC] EnumQueryServicesStatus:OpenService FAILED 1060`: 未安裝 device filter driver

## 3. Class filter driver reg 移除方式
可以使用提供的 reg 檔案來移除 class filter driver 的註冊表參數。

## 4. 判斷 device filter driver 版本
可以在 `C:\Windows\System32\GlHubFltService.exe` 上右鍵查看 Product Version 來得知 device filter driver 的版本。

## 5. class & device filter driver 安裝順序影響
1. class filter driver 先安裝，device filter driver 後安裝
2. device filter driver 先安裝，class filter driver 後安裝
不管是 3.11 或 3.13 版本，整個 root hub 都會掛掉，需要使用滑鼠控制。桌機和筆電有不同的處理方式。

## 6. 其他相關資訊 [`HP DISPLAY FIRMWARE SPECIFICATION V1.1`](general/hp-display-firmware-specification-v11.html)
- 建議使用內建的 USB HID driver 進行韌體更新，而非自行開發專屬 driver
