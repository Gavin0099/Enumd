# eToken 安全簽章系統技術說明

本文件旨在說明 eToken 系統如何從一個原始的二進位檔案 (ori bin) 開始，經過整合、簽章與封裝等一系列步驟，最終產生安全的 sig.bin 與 rom 檔案。整個流程由 eToken Server 作為協調者，與 Dongle Server (安全核心) 和 GLBin (檔案處理工具) 協同運作完成。

[未有直接 Source 錨點，待確認] 此架構圖展示了系統中各個元件的部署位置及其相互之間的通訊關係。


4.1 循序圖 (Sequence Diagram)
4.2 流程圖 (Flowchart)

在階段三 (最終檔案生成) 中，GLBin 組裝檔案的格式會根據簽章演算法 (ECDSA/RSA/RSA + HID) 而有所不同。


## GLBinTool Commands

glbin --wip -i Fw.bin [--input# Fw#.bin] -p publickey.bin -t <rsa2048|ecdsa256>
將 Public Key 嵌入原始 Bin，依晶片規則重算 checksum、產生 WIP 檔
在 case B 時，每個 input 都會獨立生成一個 WIP 檔，其餘 case 皆只會生成一個合併的 WIP 檔
輸出檔名為原始檔名末  .bin 改為 wip.bin ，例如 FW.bin 改為  FWwip.bin 
- i, --input → 原始 Bin 檔
- p, --publickey → Public Key 檔案
- -t → 簽章類型（rsa2048 / ecdsa256）
- --input#→ 第 N 個原始 Bin 檔
-  回傳 Output 檔案數量，若為 0 則為 Fail
-  case A in 才需要放 public key 進去

glbin --sign -i Fw.bin [--input# Fw#.bin] --g signature.bin [--signature# signature#.bin] -o sig.bin -p publickey.bin  -t <rsa2048|ecdsa256> [-f]
計算 wip.bin 的 Hash，產生 Signed bin 檔。
- i, --input → wip.bin 檔
- g, --signagure —> Signature 檔案
- o, --output → 輸出 sig 檔
- p, --publickey → Public Key 檔案
- -t → 簽章類型（rsa2048 / ecdsa256）
- --input#→ 第 N 個 wip.Bin 檔
- --signagure# —>第 N 個  Signature 檔案
- f, --Convert hid code sign bin file format —> Convert hid code sign bin file format
-  case B in 除了把 public key & hash &signature 放到 bin檔內外也需要放到bin檔的結尾

glbin --rom -i Fw.bin [--input# Fw#.bin] -g signature.bin [--signature# signature#.bin] -o rom.bin -p publickey.bin-t <rsa2048|ecdsa256>
依晶片演算法，組裝最終檔案 rom。
- i, --input → wip.bin 檔
- g, --signagure —> Signature 檔案
- o, --output → 輸出檔案
- p, --publickey → Public Key 檔案
- -t → 簽章類型（rsa2048 / ecdsa256）
- --input#→ 第 N 個 wip.Bin 檔
- --signagure# —>第 N 個  Signature 檔案

## 測試Chip & bin 檔



1. [`Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)`](path/to/-genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)：介紹了 Genesys Logic 為滿足 HP Code Signing 安全要求而設計的韌體簽署與驗證架構。
2. [`3rd party code signing specification (ECDSA)`](path/to/3rd-party-code-signing-specification-ecdsa.html)：概述了 Genesys Logic 的程式碼簽署流程，包括簽署和驗證的實作細節。
3. [`3rd party code signing specification (ECDSA)(EN)`](path/to/3rd-party-code-signing-specification-ecdsaen-.html)：英文版的程式碼簽署規範文件，內容與上一篇相似。

[未有直接 Source 錨點，待確認] 這些相關文件為 eToken 系統的設計與實現提供了重要的背景資訊和技術參考。