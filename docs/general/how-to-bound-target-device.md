---
title: How to bound target device
category: general
notion_id: d3077cd9-a9ed-4209-89c6-4afd27cfe268
notion_url: >-
  https://www.notion.so/How-to-bound-target-device-d3077cd9a9ed420989c64afd27cfe268
notion_updated_at: '2026-01-21T10:01:00.000Z'
exported_at: '2026-04-06T11:17:16.148Z'
is_summarized: false
---

# 原因
在市面上使用公司hub chip的周邊產品越來越多樣，且出貨也越來越多的現今，若在客戶端燒錄FW到非預期的裝置中導致hub發生錯誤而無法使用，將造成後續很多維修的支出，甚至危害公司名聲。
# 概念
在可操作的hub裝置列表中，透過比對目標裝置資訊，將不是目標的裝置移除，以確保操作的是目標裝置。
# 實作
在ISP新架構的框架下，透過類別TargetDeviceChecker及設定的TargetDevice.ini做目標裝置比對。
TargetDeviceChecker會在Tool起來後將TargetDevice.ini中的參數解析後存放在內部記憶體中，之後每次AcquireDevice()的流程中都會呼叫MatchDevice()。
## 比對的流程
1. 將裝置列表的所有內容放到 不符合 的列表中
1. 從 不符合 的列表找到第一個目標裝置
1. 從 不符合 的裝置列表往後比對第二,第三,etc...的目標裝置
1. 沒找到所有目標裝置，將 已符合 列表中的內容放回 不符合 的列表並排序，再從第一個目標裝置的下一個位置(offset A的下一個)再次執行2.以後的流程。
1. 回傳裝置列表
## TargetDevice.ini範例
下面是用於QSI Targus Dock310的內容
```plain text
[Dev1]
ChipId=GL3523
FwAvailable=hub,pd
VID=05e3
PID=0610,0620
Rev=7711
MaskString=7441102352330
VendorString=0000100000

[Dev2]
ChipId=GL3523
PortLocation=04
VID=05e3
PID=0610,0620
Rev=9310
MaskString=7441102352330
VendorString=0000000000

```
## TargetDevice.ini設定
下面是已支援的參數設定
### 自定義設定
- [DevX]
- ChipId=GL3523
- PortLocation=04
- FwAvailable=hub,pd,dc...
### USB Device Descriptor
- VID=05e3
- PID=0610,0620
- Rev=9305
- Manufacturer=GenesysLogic
- Product=USB2.1 Hub,USB3.1 Hub
- ToolVersion=3 
- MaskString=7441102352330
- RunningString=7394102352310
- VendorString=0000000000



