---
title: Code Sign 概述
domain_tags:
  - hub
  - code-sign
  - monitor
  - firmware
  - tools
  - security
task_tags:
  - code-sign
  - sop
authority_level: derived
is_deprecated: false
category: hub
notion_id: de487bab-0ebe-40bb-8a3c-7a984b87c118
notion_url: 'https://www.notion.so/Code-Sign-de487bab0ebe40bb8a3c7a984b87c118'
notion_updated_at: '2026-01-21T09:42:00.000Z'
exported_at: '2026-04-06T13:12:09.711Z'
is_summarized: false
relations: []
---

### 前提:
         因應品牌廠的需求，firmware 都必須要驗證合法性，目前做法是把bin檔做成hash，然後 用 private key 對 hash 做sign 的動作產生signature(sign) 
         把 firmware bin data & signature & public key 傳送給firmware ，讓 firmware 透過 public key 對 signature做解密，產生hash ，然後再用firmware bin data 產生一組 hash ，互相做比對，
         來決定firmware bin是否合法(verify)。
### sign:
### verify:
---
## GL3523
前提: 因為GL3523沒有 security Module 可以做解密的功能，所以只能用兩種方式
### Sw Verify : 
透過 Tool 來判斷firmware bin檔是否合法
### Fw Verify : 
透過 3rd Chip(Scaler) 來幫忙驗證 Hub firmware bin檔是否合法
---
因應這個需求，我們必須有幾樣工具需要提供
## Generate key & Sign  Tool 
這邊我們是用 Safenet Etoken 來做這件事，可以參考下面網址
https://www.pronew.com.tw/products_detail.php?Id=7
### eToken 加密流程
> **Note:** sign Tool(GLeToken Tool)
key management system(eTokenServer & eTokenClient Tool)
---
Safenet Etoken 提供 generate key pair & sign & verify 功能的 SDK ，可以透過SDK開發我們需要的功能，透過此SDK我們開發了下面幾個Tool 
### GLeToken Tool :
 為 command Tool ，可以透過command line方式來做generate key & sign & verify 
---
### eTokenServer & eTokenClient Tool
因應保密規則，eToken 必須放在特定的地方，且要有特定權限的人員才能做操作，所以還要提供key management system (eTokenServer & eTokenClient Tool)。 
- 系統安裝
- 程式
---
## IKV Tool
為 command Tool ，可以透過command line方式來做generate key & sign & verify ，是透過ecdsa 方式來做
svn path : https://gli-cse.genesyslogic.com.tw/svn/storage/Users/JasonWu/IsptoolRefine2018/IKV
---
## Code sing 待做事項
