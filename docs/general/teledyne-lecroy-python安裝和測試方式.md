---
title: Teledyne LeCroy python安裝和測試方式
domain_tags:
  - hub
  - tools
task_tags:
  - install
  - release
  - spec
  - log
authority_level: source
is_deprecated: false
category: hub
notion_id: f817386f-e2c5-464f-867d-07f5b3d09c21
notion_url: 'https://www.notion.so/Teledyne-LeCroy-python-f817386fe2c5464f867d07f5b3d09c21'
notion_updated_at: '2026-01-21T09:33:00.000Z'
exported_at: '2026-04-06T13:17:59.976Z'
is_summarized: false
relations: []
---

1. 安裝USBProtocolSuiteSW9.01_B4310_BETA-EV(Z:\SW_Release_New\Hub\temp\USBProtocolSuiteSW9.01_B4310_BETA-EV)
1. 安裝後在C:\Users\Public\Documents\LeCroy\USB Protocol Suite\Automation 可以看到LeCroy 的 Sample code
1. 先執行C:\Users\Public\Documents\LeCroy\USB Protocol Suite\Automation\TLRemoteServer 底下的TLRemoteServer.exe
1. 在 C:\Users\Public\Documents\LeCroy\USB Protocol Suite\Automation\py\USBSuiteClient 可以看到 python 的 sample code 和 spec 
1. 執行 Test_1.py 可以開啟 Catc C Tool 並 開始錄製USB訊號和關閉錄製USB訊號，目前並不能指定存檔路徑和檔名，預設路徑和檔名為C:\Users\Public\Documents\LeCroy\USB Protocol Suite\data.usb
