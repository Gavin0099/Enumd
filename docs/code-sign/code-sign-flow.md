---
title: Code sign Flow
domain_tags:
  - code-sign
  - firmware
  - security
task_tags:
  - firmware-update
  - code-sign
  - sop
  - log
authority_level: derived
is_deprecated: false
category: code-sign
notion_id: db4ac3e7-bf1d-4d31-a1e9-88aa426dec0c
notion_url: 'https://www.notion.so/Code-sign-Flow-db4ac3e7bf1d4d31a1e988aa426dec0c'
notion_updated_at: '2026-01-21T09:28:00.000Z'
exported_at: '2026-04-06T13:12:19.032Z'
is_summarized: false
relations: []
---

## Genesys Logic code sign overview
因應客戶的需求，firmware 都必須要驗證合法性，目前做法是把bin檔做成hash，然後 用 private key 對 hash 做sign的動作產生signature(deliver signed firmware) 
把 firmware bin data & signature & public key 傳送給security module，讓 security module透過 public key 對 signature做解密，產生hash ，然後再用firmware bin data 產生一組 hash ，互相做比對，來決定firmware bin是否合法(firmware update and verification)。
code sign 的做法有下面幾種
1. OpenSSL
會把generate 出來的key pair 放在電腦裡面，deliver signed firmware 也是在電腦裡面完成的
1. Token
1. HSM (Hardware security module)
A hardware security module (HSM) is a physical computing device that safeguards and manages digital keys, performs encryption and decryption functions for digital signatures, strong authentication and other cryptographic functions. These modules traditionally come in the form of a plug-in card or an external device that attaches directly to a computer or network server. A hardware security module contains one or more secure cryptoprocessor chips
但是根據HP 規定要符合fips 140-2 level 3 以上，所以至少要用Token來達成code sign 功能
fips 140-2 level 3
> **Note:** In addition to the tamper-evident physical security mechanisms required at Security Level 2, Security Level 3 attempts to prevent the intruder from gaining access to CSPs held within the cryptographic module. Physical security mechanisms required at Security Level 3 are intended to have a high probability of detecting and responding to attempts at physical access, use or modification of the cryptographic module. The physical security mechanisms may include the use of strong enclosures and tamper-detection/response circuitry that zeroes all plaintext CSPs when the removable covers/doors of the cryptographic module are opened.
目前Genesys Logic 使用的 code sign 演算法為Ecdsa nistp256
## Genesys Logic CodeSign flow
1. generate key
1. deliver signed firmware
sign的動作如下，先把Data轉成hash 檔，然後透過eToken or Smart Card裡面的 Private key 轉成 signatute 
1. firmware update and verification
