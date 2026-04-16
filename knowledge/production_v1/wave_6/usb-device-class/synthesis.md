
## 1. USB 裝置類別概述

[未有直接 Source 錨點，待確認] USB 裝置可以分類為不同的類別,以定義相同功能或行為的裝置所使用的協定。這些類別包括:

1. **Human Interface Device (HID)**: 包括滑鼠、鍵盤、遊戲搖桿等人機介面裝置。主機接收來自這些裝置的輸入資料,並快速反應以提供良好的使用者體驗。HID 裝置使用定義好的資料結構,稱為「報告(Report)」,來交換資料。

2. **Physical Interface Device (PID)**: 定義了產生力回饋的輸入裝置,如遊戲搖桿。

3. **Monitor Control**: 定義顯示器的使用者控制和電源管理功能。

4. **Power Device**: 定義了 UPS 和可監控電池的功能。

5. **Point of Sale (POS)**: 定義條碼機、秤重裝置和磁帶讀卡機等 POS 裝置的功能。

## 2. HID 裝置功能和限制

[未有直接 Source 錨點，待確認] HID 裝置有以下主要功能和限制:

a. 所有資料交換都儲存在固定長度的結構,稱為「報告(Report)」,主機透過控制傳輸或中斷傳輸來要求或接收報告。[`HID Device Capabilities`]

b. HID 裝置必須有一個中斷 IN 端點,用來送出輸入報告(Input Reports)。[`HID Device Capabilities`]

c. 一個 HID 裝置最多只能有一個中斷 IN 和 OUT 端點,除非是複合性裝置(Composite Device)。[`HID Device Capabilities`]

d. 中斷 IN 端點送資料給主機的時間是不可預期的,主機必須透過輪詢(Polling)或 USB 3.0 SuperSpeed 的 ERDY 交易封包來獲取資料。[`HID Device Capabilities`]

e. 資料交換的速率有差異:慢速和中斷端點最高 800 byte/s,全速端點最高 64 KByte/s,預設機能介面端點最高 64 KByte/s。[`HID Device Capabilities`]

## 3. HID 報告(Report)

HID 裝置使用「報告(Report)」來交換資料,報告可能是簡單的位元緩衝區,也可能是複雜的項目組合。報告敘述表格(Report Description)會告知主機和裝置通信所需的資訊:

- [未有直接 Source 錨點，待確認] 控制項目是按鈕、開關或其他實體物


- Logical Minimum & Logical Maximum,指定報告數值範圍
- Report Size 資料傳輸的位元數
- Report Count 報告含有的資料項目數目
- 指定是輸入(0x81)、輸出(0x91)或特徵報告(0xB1)


[未有直接 Source 錨點，待確認] HID 裝置使用以下兩種通信模式:

1. **控制傳輸**: 提供 6 個類別相依的專屬命令。

[未有直接 Source 錨點，待確認] 2. **中斷傳輸**: 提供了另一種交換資料的方式,特別適用於接收器需要讀取週期性資料或要求最低延遲的場合。如果控制傳輸被延遲,中斷傳輸仍能保證頻寬。

[`HID Device Capabilities`]
