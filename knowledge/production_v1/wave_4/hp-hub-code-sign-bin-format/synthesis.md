報告書：HP Hub Code Sign Bin 格式


本報告旨在概述 HP Hub 韌體簽署二進位檔案格式的相關資訊。根據提供的上下文邊界,我們將聚焦於 GL3590 (7423, 7504) 和 GL3590-50 (7524) 兩種 bin 格式的詳細說明。

## GL3590 (7423, 7504) bin 格式

GL3590 (7423, 7504) bin 檔案格式包含以下主要元素:

[未有直接 Source 錨點，待確認] 3. 韌體映像 (Firmware Image)


- 簽章資訊採用 ECDSA nistp256 加密演算法,符合 FIPS 140-2 Level 3 安全標準。[`Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)`](/code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)

## GL3590-50 (7524) bin 格式

GL3590-50 (7524) bin 檔案格式與 GL3590 (7423, 7504) 類似,同樣包含檔案頭、簽章資訊和韌體映像。不同之處在於,GL3590-50 (7524) 可能會有額外的加密保護機制。

[`3rd party code signing specification (ECDSA)`](/code-sign/3rd-party-code-signing-specification-ecdsa.html) 和 [`3rd party code signing specification (ECDSA)(EN)`](/code-sign/3rd-party-code-signing-specification-ecdsaen-.html) 兩篇文章提供了更多關於 Genesys Logic 韌體簽署流程的細節,包括簽署、驗證等步驟的實作方法。

