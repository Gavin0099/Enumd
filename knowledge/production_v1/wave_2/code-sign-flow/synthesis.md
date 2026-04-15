以下是根據提供的內容所撰寫的「Code sign Flow」文件:

# Code sign Flow

## Genesys Logic 的 Code Sign 概述
為了滿足客戶的需求,Genesys Logic 的韌體必須經過合法性驗證。目前的做法是將韌體二進位檔案轉換成雜湊值(hash),然後使用私密金鑰對雜湊值進行數位簽章,產生簽章資訊(Signature)。接著將韌體二進位檔案、簽章資訊和公開金鑰一併傳送給安全模組(Security Module)。安全模組會使用公開金鑰解密簽章資訊,並與自行計算的雜湊值進行比對,以確認韌體二進位檔案的合法性(韌體更新和驗證)。

Genesys Logic 目前使用的 Code Sign 方式有以下幾種:

[未有直接 Source 錨點，待確認] 1. **OpenSSL**：金鑰對(Key Pair)會存放在電腦上,數位簽章的動作也是在電腦上完成。
2. **Token**：使用 Token 設備進行數位簽章。
3. **HSM (Hardware Security Module)**：硬體安全模組是一種專門用於保護和管理數位金鑰、執行加密解密以及數位簽章等密碼學功能的實體計算裝置。根據 HP 的規定,Genesys Logic 的 Code Sign 功能至少要達到 FIPS 140-2 Level 3 的安全等級,因此必須使用 Token 或 HSM 來實現。

目前 Genesys Logic 使用的 Code Sign 演算法為 ECDSA nistp256。

## Genesys Logic 的 Code Sign 流程

1. **金鑰生成**：生成 ECDSA nistp256 金鑰對。


1. [Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)
2. [3rd party code signing specification (ECDSA)](3rd-party-code-signing-specification-ecdsa.html)
3. [3rd party code signing specification (ECDSA)(EN)](3rd-party-code-signing-specification-ecdsaen-.html)

以上就是 Genesys Logic 的 Code Sign Flow 相關資訊。如有任何疑問,歡迎隨時與我聯繫。