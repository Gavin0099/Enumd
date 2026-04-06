---
title: eToken 安全簽章系統技術說明
domain_tags:
  - code-sign
  - firmware
  - tools
  - security
task_tags:
  - install
  - code-sign
  - spec
  - sop
  - config
authority_level: derived
is_deprecated: false
category: code-sign
notion_id: 26364f6b-c656-8027-8c02-fa2b9eaf44ac
notion_url: 'https://www.notion.so/eToken-26364f6bc65680278c02fa2b9eaf44ac'
notion_updated_at: '2026-01-22T06:41:00.000Z'
exported_at: '2026-04-06T13:12:36.666Z'
is_summarized: false
relations: []
---

## 1. 系統概述
本文件旨在說明 eToken 系統如何從一個原始的二進位檔案 (ori bin) 開始，經過整合、簽章與封裝等一系列步驟，最終產生安全的 sig.bin 與 rom 檔案。整個流程由 eToken Server 作為協調者，與 Dongle Server (安全核心) 和 GLBin (檔案處理工具) 協同運作完成。
---
## 2. 系統架構圖
此架構圖展示了系統中各個元件的部署位置及其相互之間的通訊關係。
---
## 3. 詳細處理流程
整個流程可分為三個主要階段：
---
## 4. 流程視覺化圖表
4.1 循序圖 (Sequence Diagram)
4.2 流程圖 (Flowchart)
---
## 5. 演算法特定規則
在階段三 (最終檔案生成) 中，GLBin 組裝檔案的格式會根據簽章演算法 (ECDSA/RSA/RSA + HID) 而有所不同。
---
## 6. 各晶片韌體格式詳解
---
## 7. 晶片格式總覽表
## GLBinTool Commands
---
### ⚙️ WIP 階段
```c
glbin --wip -i Fw.bin [--input# Fw#.bin] -p publickey.bin -t <rsa2048|ecdsa256>
```
用途
將 Public Key 嵌入原始 Bin，依晶片規則重算 checksum、產生 WIP 檔
在 case B 時，每個 input 都會獨立生成一個 WIP 檔，其餘 case 皆只會生成一個合併的 WIP 檔
輸出檔名為原始檔名末  .bin 改為 wip.bin ，例如 FW.bin 改為  FWwip.bin 
必要參數 
- i, --input → 原始 Bin 檔
- p, --publickey → Public Key 檔案
- -t → 簽章類型（rsa2048 / ecdsa256）
可選參數
- --input#→ 第 N 個原始 Bin 檔
回傳
-  回傳 Output 檔案數量，若為 0 則為 Fail
特殊狀況
-  case A in 才需要放 public key 進去
---
### 🔑 SIGN 階段
```c
glbin --sign -i Fw.bin [--input# Fw#.bin] --g signature.bin [--signature# signature#.bin] -o sig.bin -p publickey.bin  -t <rsa2048|ecdsa256> [-f]
```
用途
計算 wip.bin 的 Hash，產生 Signed bin 檔。
必要參數
- i, --input → wip.bin 檔
- g, --signagure —> Signature 檔案
- o, --output → 輸出 sig 檔
- p, --publickey → Public Key 檔案
- -t → 簽章類型（rsa2048 / ecdsa256）
可選參數
- --input#→ 第 N 個 wip.Bin 檔
- --signagure# —>第 N 個  Signature 檔案
- f, --Convert hid code sign bin file format —> Convert hid code sign bin file format
特殊狀況
-  case B in 除了把 public key & hash &signature 放到 bin檔內外也需要放到bin檔的結尾
---
### 📦 ROM 階段
```c
glbin --rom -i Fw.bin [--input# Fw#.bin] -g signature.bin [--signature# signature#.bin] -o rom.bin -p publickey.bin-t <rsa2048|ecdsa256>
```
用途
依晶片演算法，組裝最終檔案 rom。
必要參數
- i, --input → wip.bin 檔
- g, --signagure —> Signature 檔案
- o, --output → 輸出檔案
- p, --publickey → Public Key 檔案
- -t → 簽章類型（rsa2048 / ecdsa256）
可選參數
- --input#→ 第 N 個 wip.Bin 檔
- --signagure# —>第 N 個  Signature 檔案
---
## 測試Chip & bin 檔
