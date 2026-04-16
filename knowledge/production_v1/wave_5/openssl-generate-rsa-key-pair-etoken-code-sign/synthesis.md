
# openssl 產生 RSA 金鑰對與 Etoken 程式碼簽署

本文件介紹如何使用 OpenSSL 工具產生 RSA 金鑰對,並將私鑰匯入 Etoken 硬體安全模組進行程式碼簽署。

[未有直接 Source 錨點，待確認] 首先,我們可以使用 OpenSSL 命令產生一組 RSA 金鑰對:

openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem

這樣就會產生一個 2048 位元的 RSA 私鑰 `private.pem` 和公鑰 `public.pem`。

## 匯出 PKCS#12 格式金鑰
接下來,我們需要將私鑰和公鑰證書匯出為 PKCS#12 格式,以便後續匯入 Etoken:

openssl pkcs12 -export -in public.pem -inkey private.pem -out private.p12 -name "My Code Signing Key"

這個命令會產生一個 `private.p12` 檔案,其中包含私鑰和公鑰證書。

現在我們可以將 `private.p12` 檔案匯入 Etoken 硬體安全模組中。這樣就可以使用 Etoken 上的私鑰進行程式碼簽署了。

需要注意的是,匯入 Etoken 後,會多出一個額外的證書。這是因為 Etoken 會自動加入其自身的根證書。我們可以參考 [解決問題 - SSL/TLS 5](https://leoyeh.me/2017/08/13/%E8%A7%A3%E6%B1%BA%E5%95%8F%E9%A1%8C-SSL-TLS-5/) 和 [PKI 數位憑證格式轉換筆記](https://blog.miniasp.com/post/2018/04/21/PKI-Digital-Certificate-Format-Convertion-Notes) 這兩篇文章,了解不同憑證格式的轉換方法。

完成上述步驟後,我們就可以使用 Etoken 上的私鑰對程式碼進行數位簽署了。具體的簽署流程可以參考 [Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html) 和 [3rd party code signing specification (ECDSA)](3rd-party-code-signing-specification-ecdsa.html) 這兩篇文章。