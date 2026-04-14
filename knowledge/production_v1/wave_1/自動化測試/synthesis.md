
在面對客戶 USB 問題時，常需要透過錄製 USB 訊號或 I2C 訊號來分析問題點。如果透過人工方式抓取這些 log 會耗費很多人力。透過自動化測試的方式來抓取對應的 log，讓工具反覆測試來找出問題點，會是一種比較好的測試方式。

目前的想法是透過 Python 來串接各種工具。目前找到的 I2C 和 USB Trace 工具都有提供 Python API，至於 Bus Hound 可能需要透過 WinAuto 的方式來實作功能。

透過 Main 來決定要開啟哪些功能，透過簡單的參數設定就可以讓使用者決定要錄製哪些 log。


- [Saleae Logic 2 Automation Interface Documentation](https://support.saleae.com/software-and-integration/api-and-scripting/python-api)

#### Bus Hound 資料
- [Python WinAuto](https://pypi.org/project/pywinauto/)
- [Bus Hound SDK](https://www.fte.com/products/bus-hound.aspx)

- [Teledyne LeCroy Advisor T3 for Python](https://teledynelecroy.com/doc/docview.aspx?id=11524)

#### Notification 作法

總之，這個自動化測試的核心在於能夠透過 Python 整合各種工具的功能，讓使用者能夠更有效率地分析 USB 和 I2C 問題。關鍵在於能否順利串接各工具的 API，並設計出一個簡單易用的使用者介面。