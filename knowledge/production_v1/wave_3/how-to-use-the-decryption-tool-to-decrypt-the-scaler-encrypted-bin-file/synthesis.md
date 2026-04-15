以下是如何使用解密工具解密 Scaler 加密 bin 檔案的詳細說明:

# 如何使用解密工具解密 Scaler 加密 bin 檔案


[未有直接 Source 錨點，待確認] 1. 在命令提示字元中,跳轉到 `m27fd` 目錄:

2. 執行解密工具 `rsa_decrypt.exe` 並傳入 Scaler 加密的 bin 檔案:
   rsa_decrypt.exe "scaler encrypted bin file"


4. 打開 `m27fd` 資料夾,你會看到一個名為 `temp.bin` 的檔案,這就是解密後的 Scaler bin 檔案。


- 請務必使用最新版本的 Scaler bin 檔案替換 `m24fd` 和 `m27fd` 資料夾中的檔案。


- [`/code-sign/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html`](/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)
  - 本文件介紹了 Genesys Logic 為滿足 HP Code Signing 安全要求而設計的韌體簽署與驗證架構。
- [`/code-sign/3rd-party-code-signing-specification-ecdsa.html`](3rd-party-code-signing-specification-ecdsa.html)
- [`/code-sign/3rd-party-code-signing-specification-ecdsaen-.html`](3rd-party-code-signing-specification-ecdsaen-.html)
  - 本文件以英文介紹了 Genesys Logic 的程式碼簽署流程,包括簽署和驗證。