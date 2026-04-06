---
title: ECC key
domain_tags:
  - security
task_tags:
  - sop
authority_level: source
is_deprecated: false
category: security
notion_id: b732ac51-00fc-44e0-a3ce-f59eda9d46f6
notion_url: 'https://www.notion.so/ECC-key-b732ac5100fc44e0a3cef59eda9d46f6'
notion_updated_at: '2025-08-20T02:33:00.000Z'
exported_at: '2026-04-06T13:12:16.173Z'
is_summarized: false
relations: []
---

1.private key 格式 : pem/der
DER
將 certificate 或 key 用 DER ASN.1 編碼的原始格式, certificate 就是依照X.509的方式編碼, key 則是又能分為PKCS#1 和PKCS#8
—> DER 格式 有猜到Private Key 放在哪邊—> 在keyhole.key (08~27)
但是sign 過出來的signature 跟 IKV產生的不一樣，還不確定哪邊流程有錯
確定 hash 和 private key 是一樣的，還在看原因
PEM
把 DER 格式的 certificate 或 key 使用 base64-encoded 編碼後在頭尾補上資料標明檔案類型
2.curve 格式是哪一種
secp521r1 (default)
brainpoolP512r1
secp384r1
brainpoolP384r1
secp256r1
secp256k1 --> bitcoin 使用曲線
brainpoolP256r1
secp224r1
secp224k1
secp192r1
secp192k1
openssl general ecc key command :
openssl ecparam -out privatekey.key -name prime256v1 -genkey
產生一組 預設檔名為 privatekey,key 的 privatekey
openssl ecc sign
openssl dgst -sha256 -sign privatekey.key 8400.sum > temp.txt
--> 把 8400.sum 做成sha256 hash 並用privatekey.key 加密，把產生的signature 存到 temp.txt
openssl dgst -sha256 -keyform der -sign privatekey.der 8400 .sum > temp.txt
--> 把 8400.sum 做成sha256 hash 並用privatekey.key 加密，把產生的signature 存到 temp.txt keyformat 改成der
IKV publickey --> 64 byte
openssl publickey --> 90 byte
IKV signature --> 64 byte
openssl signature--> 71 byte
openssl ecc verify
openssl dgst -sha256 -verify publickey.pub -signature in.txt 8400.sum
openssl etc private key to public key
openssl ec -in privatekey.key -pubout > publickey.pub
--> 轉換格式為pem格式
openssl ec -inform DER -in privatekey.der -pubout > publickey.pub
-->轉換格式改成der格式
pem to der
openssl ec -inform pem -in private-key.pem -outform der -out cert.der
openssl ec -pubin -in publickey.pub -outform der -out cert. der
pulbickey.der publickey offset : 1B ~ 5A
signature format
30 45
02 20
9D AC 93 72 3D 6D B6 27
C9 47 37 2C 5F 80 C0 A6
C0 28 08 7B BF 6E 86 99
26 AD 48 AC DB 7A 46 EE sig_r
02 21
9B F6 E2 3B 74 C7 CE A3
75 A4 BC 2A F9 B1 84 49
6D 0F 8F 13 2B 25 40 1C
C8 FB C1 F6 F4 BE 81 EE 83 sig_s
IKV 用的curve NIST p256—>prime256v1
asn1parse -inform DER -in openssl_signature.txt --> parse asn 1
curve List
1.binary format key 如何轉成其他格式: ini blo der pem?
2.secp256r1 prime256v1 NIST P-256 curve 是否一樣?
IKV 用到的 curve 是 NIST P-256
mbedTLS 用到的 curve 是 secp256r1 or secp256k1
OpenSSL 用到的 curve 是 secp256r1 or secp256k1 or prime256v1
3.IKV Tool generate key & sign & verify 時有用到ECC 的基本運算 加法 & 乘法 ，其他Tool 如果不按照此步驟做是否sign & verify 會失效?
SP800 P36
0608開會紀錄
1. Private & Public Key 轉換 Source Code :
DER & PEM key format
2. 三條曲線轉換資料:
secp256r1&secp256k1&prime256v1
3. OpenSSL Source Code
透過OpenSSL 來驗證 generation key & Sign & Verify 流程
4. key management system 單機版 Source Code:
6/12
mbedTLS genkey command = gen_key.exe type=ec ec_curve=secp256r1 format=pem
secp256r1 出來的key size = 227byte
6/16
1.尋找 der 檔案的 parse ，確定 private & public key 存放的位置
2.嘗試把IKV 的 PublicKey 和 Private key 放到 mbedTLS產生的der 檔裡面，不過sign過的signature 還是跟IKV的不一樣
—> 確定Public Key format 是對的，因為在sign時會驗證public key format
der public key offset : 08~27
der private key offset:
X_Q: 3A~59
Y_Q: 5A~79
6/22
verify -k 1234.pub -f 8400.sum -r 8400.sum.SigR -s 8400.sum.SigS -t sw
sign -k 1234.priv -f 8400.sum
sign -k 1234.priv -p 1234.pub -f 8400.sum
genkey -n 1234
signature
tls : 71 byte ikv:64byte
signature offset 不一樣也不確定要怎麼合進去，
用同樣的private key 透過TLS to sign
但是verify 時 用 TLS 產生的der 檔去verify 卻顯示der format error
嘗試把TLS sign 過的signature 透過 IKV去verify ，但是兩者的signature size 不一樣
有嘗試把TLS 的 signature 放到 IKV去verify ， 但還是 fail
Mask Code Load Ram Code 流程
1.隨機算出offset & Length
