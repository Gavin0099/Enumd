# 自動化測試

## 緣由
在面對客戶 USB 問題時，常常需要透過錄製 USB 訊號或 I2C 訊號來分析問題點。如果透過人工的方式來抓取的話，會耗費很多人力。如果用自動化測試的方式來抓取對應的 log，讓工具反覆測試來找出問題點，會是一種比較好的測試方式。

目前的想法是透過 Python 來串接各個工具。目前找到的 I2C 和 USB Trace Tool 都有提供 Python API，至於 Bus Hound 可能需要透過 WinAuto 的方式來實作功能。

## Python 架構
透過 Main 來決定要開啟哪些功能，透過簡單的參數設定就可以讓使用者決定要錄製哪些 log。

## 相關工具設定和說明

### 錄製 I2C 資料
- [Saleae Logic 2 Automation Interface Documentation](https://support.saleae.com/logic-software/logic-2-software/logic-2-automation-interface)

### Bus Hound 資料
- [Python WinAuto](https://pypi.org/project/pywinauto/)
- [Bus Hound SDK](https://www.fte.com/products/bus-hound.aspx)

### 錄製 USB 資料
- [Teledyne LeCroy Advisor T3 for Python](https://teledynelecroy.com/doc/docview.aspx?id=11524)

### Notification 作法
- Teams

從上述的相關工具和技術中，可以看出自動化測試的核心在於利用 Python 來整合各種工具的 API，從而實現自動化地抓取 USB 和 I2C 的 log 數據，並提供通知機制來及時反饋測試結果。這樣可以大幅提高測試效率，減少人工操作的成本。