---
title: 'RSA 2048 verify 和 mbedtls opensource 測試問題 '
domain_tags:
  - code-sign
  - sdk
  - security
task_tags:
  - debug
  - spec
  - config
authority_level: source
is_deprecated: false
category: code-sign
notion_id: caff25bb-89e4-431c-aab7-d6cb56ebc8dd
notion_url: >-
  https://www.notion.so/RSA-2048-verify-mbedtls-opensource-caff25bb89e4431caab7d6cb56ebc8dd
notion_updated_at: '2025-08-20T02:30:00.000Z'
exported_at: '2026-04-06T13:12:05.565Z'
is_summarized: false
relations: []
---

解密後的資料確實有對的hash檔，但是前面還有一些無意義的資料
我debug source code 後，發現解密是從最後一個byte開始跑
然後 source code 會把所有 0xff的資料砍掉，在copy到另外一個array
所以要看無意義的資料是如何產生的
目前看到bn_mod_exp(c, m, e, edigits, n, ndigits); 裡面的 c 就跟原本code裡面的 key pair 產生的 c不一樣
原本的 c array 只有 7個參數，用我們的 public key & signature 後會有 12個參數
原本key pair 產生的 c
eToken key pair 產生的 c
不過裡面的演算法看不太懂，還在花時間 study 中，目前有測試幾個方向看起來都沒用
> **Note:** 1. 修改signature 裡面某一個byte —> 整個解密出來的 hash都是錯的 —> signature 資料應該是對的
2. 修改 public key 裡面某一個 byte —>整個解密出來的 hash都是錯的 —>public key 資料應該是對的
3. 原本code裡面的 key pair 用 bin檔的hash去加密解密，產出來的 hash 也是對的—>看起來跟 hash 的 length無關
現在推測
1. Signature or public key format 可能不對
要嘗試的動作還有
1. 用openssl 產生key pair ，然後去 sing ，產生的 signature 和 public key 放到 opensource 去試試看
1. 用別的 eToken 產生的 bin檔再驗驗看 —>一樣
1. 看一下eToken verify function —> 是dll包住，看不到Source code
1. 用nbedTLS 試試看 —>
後來我用 mbedTLS 來解密，解出來的 data也是一樣，前面的資料應該是ASN.1 foramt
上面的截圖就是P的 data
然後mbedTLS判斷前面ASN.1 format 對的話就會跟hash比對
用網路上的 asn.1 parse 看到的結果確實是沒錯的
## asn.1 parse
https://holtstrom.com/michael/tools/asn1decoder.php
## sha256 
1K:156ms
32K:4sec
## rsa2048
1分56秒
