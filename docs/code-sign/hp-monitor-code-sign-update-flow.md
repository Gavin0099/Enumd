---
title: HP Monitor Code Sign Update Flow
category: code-sign
notion_id: 650b6b5c-ca52-418b-861b-86d8dfdf2ade
notion_url: >-
  https://www.notion.so/HP-Monitor-Code-Sign-Update-Flow-650b6b5cca52418b861b86d8dfdf2ade
notion_updated_at: '2026-01-21T09:26:00.000Z'
exported_at: '2026-04-06T11:22:53.635Z'
is_summarized: false
---

### ISP Tool 與 Hub Firmware 初始化交握機制
目的是確認：
1. ISP Tool 是否通過 Hub Firmware 的認證。
1. Hub Firmware 是否通過 ISP Tool 的認證。
流程如下
- 使用bcdDevice 和ToolString 裡面的Firmware Info Tool String 來當參數
- 取出 bcdDevice 的兩個位元組並做 XOR 運算。
- Firmware Info Tool String 會 Random 產生一組 Start Range 和 Stop Range ，然後跟bcdDevice  產生出來的值再做XOR
- uValue：範圍組合，將 Stop 放高位、Start 放低位。
- uIndex：將 XOR 結果放高位，加上固定值 0x01。
- 使用 uValue 和 uIndex 傳送至 Hub Firmware 進行驗證。如果返回值 uRetVal != 1，表示驗證失敗。
## 概述
目前驗證方式有分四種方式 ，可以透過Dynamic Tool String  裡面的The 3rd Party Vendor Support  HP Proprietary 參數來判斷 ，如下圖
- HP Hw Check Code Signed
因為GL3523沒有Security Module ，所以必須透過scaler 驗證 code sign
- HP Sw Check Code Signed
GL3523 使用，在此模式下連scaler 都沒有Security Module ，所以必須透過Tool 來驗證code sign
- HP Code Signed Slave
此模式下必然會有兩層以上的Hub ，另外一層Hub 會是HP Hw Check Code Signed
or  HP Hub Check Code Signed ，兩種方式驗證方法不一樣
- HP Hub Check Code Signed (ECDSA)
主要為GL3590 驗證方式，因為GL3590 有Security Module ，可以自己(Hub)做驗證
---
## HP Hw Check Code Signed update Flow
update前會傳送public key 給 hub ，當update到最後兩筆資料時會傳送 hash & signature給Hub ，讓Hub 傳送給 scaler ，由scaler驗證是否成功，失敗的話最後兩筆資料就不update ，這樣的話 update data不完整，hub boot 起來就不會跑這一塊，成功的話繼續update流程，可以參考下圖流程
Send Hash & Signature 和 Get Hub authorization 可參考下圖做法
---
## HP Sw Check Code Signed
在load bin file時就會送給 解密Tool 做驗證，驗證失敗就不做update ，成功的話就正常update
詳細作法可參考下圖。
---
## HP Code Signed Slave
會根據另外一層Hub的code signed mode來決定 code signed flow
- HP Hw Check Code Signed update Flow
驗證方式類似 ，只是在Send Hash & Signature 和 Get Hub authorization 這邊是送到HP Hw Check Code Signed的那層Hub給scaler 做驗證
- HP Hub Check Code Signed 
會在HP Hub Check Code Signed 一併說明

---
## HP Hub Check Code Signed (ECDSA)
有兩種方式，驗證方式都是會傳給有Security Module 的Hub做驗證，只是流程不一樣
### 原本Hub 就有Security Module (GL3590)
```plain text
1.	40 ac 00 00  00 00 00 00 : Enable SHA256 Engine
2.	c0 a2 00 00  00 00 40 00
3.	c0 a2 00 00  40 00 40 00
4.	……
5.	c0 a2 00 00  c0 8f 40 00
6.	40 ac 0b 04  09 00 00 00 : Send Hash Length : 4K
7.	40 ac 0b 00  00 00 20 00 : Send Hash Data
8.	c0 ac 0b 02  00 00 20 00 : Read Digested Data for test 
9.	c0 ac 0c 02  00 00 40 00 : Read Signature     for test 
10.	c0 ac 0c 01  00 00 40 00 : Read  Public Key   for test 
11.	c0 ac 0b 00  00 00 01 00 : fw return hash comparision result
12.	40 ac 00 00  00 00 00 00 : Enable SHA256 Engine
13.	c0 a2 00 00  00 00 40 00
14.	c0 a2 00 00  40 00 40 00
15.	……
16.	c0 a2 00 00  c0 8f 40 00
17.	40 ac 0b 04  09 00 00 00 : Send signature Length : 4K
18.	40 ac 0c 02  00 ff 00 00 : Provide fw public key
19.	40 ac 0c 01  00 00 40 00 : send signature data
20.	c0 ac 0c 01  00 00 40 00 : Read  Public Key   for test 
21.	c0 ac 0b 02  00 00 20 00 : Read Digested Data for test 
22.	c0 ac 0c 02  00 00 40 00 : Read Signature     for test 
23.	c0 ac 0c 00  00 00 01 00: fw return hash comparision result
```
### 原本Hub 沒有Security Module(GL3523)
流程跟GL3590 驗證方式差不多，不一樣的地方為，當update 後 ，要把data送到有Security Module的Hub(GL3590) 做驗證，所以除了第一步是傳給GL3523 update data之外，其他command都是傳給GL3590
-
### 原本PD沒有Security Module(GL9511)
hash 應該是不用驗，所以去掉此步驟，其他跟GL3523驗證方式差不多，當update 後 ，要把data送到有Security Module的Hub(GL3590) 做驗證，所以除了第一步是傳給GL3523 update data之外，其他command都是傳給GL3590
