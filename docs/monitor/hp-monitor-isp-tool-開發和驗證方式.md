---
title: HP Monitor ISP Tool 開發和驗證方式
domain_tags:
  - hub
  - monitor
  - tools
  - security
task_tags:
  - install
  - firmware-update
  - sop
  - config
authority_level: deprecated
is_deprecated: true
category: hub
notion_id: a11de361-0732-4e80-af3e-c4a2a5f27583
notion_url: 'https://www.notion.so/HP-Monitor-ISP-Tool-a11de36107324e80af3ec4a2a5f27583'
notion_updated_at: '2026-01-21T09:22:00.000Z'
exported_at: '2026-04-06T13:15:52.685Z'
is_summarized: false
relations: []
---

目前 Hp Monitor ISP Tool 有三個
### HP ISP Tool : 
工程用ISP Tool ，提供量產前工程師驗證用，工程師可以自行選擇要update的 fw，並看到比較詳細的資訊
### HP EndUser Tool:
提供給終端客戶update的 Tool ，只要一個按鍵就可以更新，要update 的 bin檔和包裝流程主要由代工廠設定，我們只提供folder，如何設定和包裝的文件可以參考下面連結
HP End User Tool Packing User Guide 
### HP Command Line Tool:
提供給公司做統一性update fw 的 Tool ，MIS 可以透過此Tool對公司每一台 Monitor 做 update fw 的動作。
## HP Monitor 治具 Update 方式
當Tool Update Scaler 失敗時，有機率會讓 Scaler 掛掉，因為Hub是透過Scaler 提供電源的，Scaler 掛掉之後Hub便偵測不到，這時候就必須透過治具Update才能回復，下圖為治具圖片，必須接上Hdmi和 USB2.0線才可以Update。
High & low Level update 方式不一樣
### low Level:
1.開啟HP_ISP_Tool_(RD_Version)_V1.1.12.
2.Connect —> Read —> Select Update Data (要選擇dual版本的Scaler Fw)
3.選擇完檔案後—> Auto --> Ctrl + Alt + O (密碼:80336647)
4.Erase Device —> All Chip，Pub Key Form Mnt 勾選取消 —> Run
### High Level:
1.開啟ISP_Tool(v5.0.3)_Beta
2.Connect —> Read —> Select Update Data (要選擇dual版本的Scaler Fw)
3. Auto—> Erase Device : All Chip —> Run
## HP Monitor開發時常遇到的問題
### DDC / CI command 不通 (Display Data Channel Command Interface)
現象:Scaler Level & Scaler Fw Version 都抓到錯誤的值
解法:
         1.勾出i2c 訊號量測傳輸資料是否正常
         2.和MTK Fw 提供相關的資料請他們提供新版 Scaler Fw
### Scaler Update fail
現象: 在 update scaler 時，有機率會 update fail
解法:統一用USB2.0 update，這個問題主要是Hub fw 和 Scaler fw i2c clock 的問題
### 如何判斷update Sclaer 資料或是 offset 是否正常
現象:update 完Scaler 有可能會出現
        1. Scaler Fw Version不對
        2.update後偵測不到Hub —> 代表Scaler update失敗，無法從boot code 開機
 解法:
         1.透過MTK ISP Tool 和 治具，先dump Scaler 資料 ，connect —> Load 
         2. 確認好 start & End Addr —> Run
         3.dump 出來的 SpiFlash.bin就可以跟原本的Scaler Fw Bin 做比較
### Low Level Load Scaler Fw bin 驗證失敗
現象:low Level Scaler 驗證是透過Tool 驗證，有時開啟Scaler Bin檔會顯示驗證失敗，如下圖
 解法:
1.開啟ISP Tool 時，先透過Bus Hound 觀察 c0 a4 06 00 00 00 20 00 (抓取Scaler Public Key Vendor command)
成功: public key 基本上都是英文和數字組成，所以不會有非ASCII的值出現
失敗: 紅框部份為非ASCII 值，代表抓到的public key是錯誤的
2.public key 抓取成功後，如果驗證Scaler bin檔還是失敗，可以手動下 command 驗證看看
   在HP ISP Tool 同一個路徑下有 rsa_decrypt.exe ，下 command 可以手動驗證 此 scaler bin檔是否合法，command 如下
```c
rsa_decrypt.exe  "Scaler File Name"
```
成功的話會出現
失敗的話會出現
此方法可以驗證抓到的Scaler public key 是否符合
