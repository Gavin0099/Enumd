報告書：Code Sign 資源

本報告旨在綜合分析 Code Sign 資源的三種主要實作方案：eToken、HSM 和 AWS CloudHSM。這些方案各有優缺點,可根據不同需求和預算進行選擇。

eToken 方案提供 USB dongle 和 SDK,廠商會提供 Sample Tool、Sample Code 和 SDK,讓開發者自行實作簽署工具。這種方案的成本較低,約 1-3 萬元,但需要開發人員投入更多的實作工作。

## HSM (Hardware Security Module)
HSM 方案由廠商提供 Tool 和 HSM 機器,開發者可以透過廠商的工具對 bin 檔案進行簽署。這種方案的成本較高,約 30-50 萬元,但可以免除開發人員的實作工作。

AWS CloudHSM 是 AWS 雲端提供的硬體安全模組服務。使用 AWS CloudHSM,開發者可以執行各種加密任務,包括生成、存儲和管理加密金鑰,以及對數據進行加密簽名和驗證。這種方案的費用尚未公開。



總之,Code Sign 資源的選擇需要平衡成本、安全性和開發難度等因素,不同的方案都有其適用的場景。