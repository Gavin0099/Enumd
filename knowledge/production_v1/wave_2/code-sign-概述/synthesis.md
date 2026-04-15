

因應品牌廠的需求，firmware 都必須要驗證合法性。目前的做法是:

1. 將 firmware bin 檔案做 hash 運算。
2. 使用 private key 對 hash 值進行數位簽章(sign)，產生 signature。
3. 將 firmware bin 資料、signature 和 public key 一起傳送給 firmware。
4. firmware 使用 public key 對 signature 進行解密，產生 hash 值。
5. firmware 再次使用 bin 資料產生 hash 值，並與前一步驟的 hash 值進行比對。
6. 如果兩個 hash 值一致，則確認 firmware bin 是合法的(verify)。

GL3523 沒有安全模組(security module)可以進行解密功能，因此需要採取以下兩種方式:

1. **Sw Verify**:
   透過工具程式判斷 firmware bin 檔案是否合法。

2. **Fw Verify**:
   透過第三方 Chip (Scaler) 來協助驗證 Hub firmware bin 檔案是否合法。

為了實現上述的 code signing 流程,我們需要提供以下工具:

### Generate key & Sign Tool
我們使用 Safenet Etoken 來執行這些功能,可以參考 [Safenet Etoken](https://www.pronew.com.tw/products_detail.php?Id=7)。

#### eToken 加密流程
> **Note:** 包含 sign Tool(GLeToken Tool)和 key management system(eTokenServer & eTokenClient Tool)。

Safenet Etoken 提供了 generate key pair、sign 和 verify 功能的 SDK,我們可以利用這個 SDK 開發所需的工具。

### GLeToken Tool
這是一個命令列工具,可以透過命令列的方式來執行 generate key、sign 和 verify 等功能。

### eTokenServer & eTokenClient Tool
由於 eToken 必須放在特定的地方,且只有特定權限的人員才能操作,因此我們需要提供 key management system (eTokenServer & eTokenClient Tool)。這包括系統安裝和程式開發。

這也是一個命令列工具,可以透過命令列的方式來執行 generate key、sign 和 verify 等功能,採用的是 ECDSA 加密演算法。
[IKV Tool](https://gli-cse.genesyslogic.com.tw/svn/storage/Users/JasonWu/IsptoolRefine2018/IKV)

## Code Sign 待辦事項
[未有直接 Source 錨點，待確認] 以上就是 'Code Sign 概述' 的相關內容。