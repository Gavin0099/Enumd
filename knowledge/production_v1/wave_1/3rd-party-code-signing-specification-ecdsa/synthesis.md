報告書：3rd party code signing specification (ECDSA)

## 摘要

本報告書旨在概述 Genesys Logic 針對第三方韌體程式碼簽署所採用的 ECDSA 規範。根據提供的上下文資訊,我們可以了解到以下關鍵要點:

1. Genesys Logic 的韌體程式碼必須經過合法性驗證,才能進行韌體更新。
2. 簽署後的二進位檔案採用特定的格式。
3. 簽署和驗證是整個程式碼簽署流程的核心步驟。
4. 實現程式碼簽署的方式包括使用 OpenSSL 和 eToken 硬體。
5. 私密金鑰的安全存儲是程式碼簽署系統的關鍵。

本報告將深入探討上述關鍵元素,並說明它們之間的關係,以提供一個全面的 ECDSA 程式碼簽署規範概述。

## 1. Genesys Logic 韌體程式碼簽署概述

Genesys Logic 要求所有韌體程式碼在更新至閃存之前,都必須經過合法性驗證 [`Genesys Logic firmware 安全簽署與驗證流程 (Code Signing)`](/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)。為此,Genesys Logic 採用了特定的簽署二進位檔案格式。

## 2. 程式碼簽署流程

程式碼簽署流程包括以下兩個核心步驟:

1. **簽署 (Sign)**: 使用私密金鑰對程式碼進行數位簽章 [`3rd party code signing specification (ECDSA)(EN)`](3rd-party-code-signing-specification-ecdsaen-.html)。
2. **驗證 (Verify)**: 使用公開金鑰驗證程式碼的合法性 [`3rd party code signing specification (ECDSA)(EN)`](3rd-party-code-signing-specification-ecdsaen-.html)。

## 3. 實現方式

Genesys Logic 提供了兩種實現程式碼簽署的方式:

1. **使用 OpenSSL**: 透過 OpenSSL 工具生成金鑰對,並進行簽署和驗證 [`Code sign - ECC key`](code-sign-ecc-key.html)。
2. **使用 eToken**: 利用 FIPS 140-2 Level 3 認證的 USB eToken 硬體設備,安全地儲存私密金鑰,並執行簽署操作 [`Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)`](/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)。

## 4. 私密金鑰的安全存儲

私密金鑰的安全存儲是程式碼簽署系統的關鍵。Genesys Logic 採用 FIPS 140-2 Level 3 認證的 eToken 硬體設備,將私密金鑰安全地儲存在防竄改的硬體中 [`Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)`](/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)。

## 結論

本報告概述了 Genesys Logic 採用 ECDSA 規範進行第三方程式碼簽署的核心要素,包括簽署流程、實現方式以及私密金鑰的安全存儲。這些關鍵元素共同構成了 Genesys Logic 的程式碼簽署系統,確保韌體程式碼的合法性和安全性。