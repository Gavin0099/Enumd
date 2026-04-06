---
title: 如何在Mac 上透過WireShark 抓取 USB訊號
category: mac
notion_id: 1bc4bb39-7904-4f14-9c8f-98679ef287fc
notion_url: 'https://www.notion.so/Mac-WireShark-USB-1bc4bb3979044f149c8f98679ef287fc'
notion_updated_at: '2026-01-21T09:32:00.000Z'
exported_at: '2026-04-06T11:22:05.409Z'
is_summarized: false
---

1. 上去wireshark 官網抓取對應版本
1. 確認是否開啟 SIP (System Integrity Protection) ，如果開啟的話是無法在Wireshark 抓到USB訊號，用cmd 執行下面command 確認SIP狀態
1. 如果SIP 不是 disable 的話要回到mac recovery mode 去關閉csrutil
1. 因爲USB 也有權限問題，所以要先看要開哪個USB權限，command 如下
1. 因為每台電腦USB 設備不一樣，所以要找XHC開頭的device ，然後執行下面command，我這邊是XHC20 ，以這個當作範例
1. 開啟WireShark 選擇device 後可能會遇到無法capture的問題，如下圖，這樣就必須安裝chmodbpf.pkg
1. 開啟WireShark後可以直接選擇特定device ，這邊我是選XHC20
1. 開啟後就可以看到此usb 的 訊號，也可以透過filter 的設定來找特定的usb device 
1. 以下面為例，如果要filter 只抓USB_HID_DEVICE的話，可以看他的位置識別
1. 然後在WireShark的 filter 輸入下面command，就可以抓到特定device 所有的USB訊號
1. 透過下面command 可以抓到全部的control command 
1. 其他參數可以參考下面網址
