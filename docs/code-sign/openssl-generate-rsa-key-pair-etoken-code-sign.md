---
title: openssl generate rsa key pair & Etoken code sign
category: code-sign
notion_id: 28faaac2-a352-48d9-a1d8-200b670ab64e
notion_url: >-
  https://www.notion.so/openssl-generate-rsa-key-pair-Etoken-code-sign-28faaac2a35248d9a1d8200b670ab64e
notion_updated_at: '2022-02-15T06:34:00.000Z'
exported_at: '2026-04-06T11:19:22.169Z'
is_summarized: false
---

openssl generate rsa key pair & Etoken code sign
openssl pkcs12 -in private.p12 -clcerts -nokeys -out publicCert.pem
- PKCS#1 Private key
- Certificates:
https://stackoverflow.com/questions/9497719/extract-public-private-key-from-pkcs12-file-for-later-use-in-ssh-pk-authenticati
目前按照這種流程產生的p12，可以 import 到 Etoken 裡面 key pair ，但是會多import一個 cerificate ，現在還需要做的工作如下
# ToDo List 
每個格式的簡易說明
https://leoyeh.me/2017/08/13/%E8%A7%A3%E6%B1%BA%E5%95%8F%E9%A1%8C-SSL-TLS-5/
https://blog.miniasp.com/post/2018/04/21/PKI-Digital-Certificate-Format-Convertion-Notes
