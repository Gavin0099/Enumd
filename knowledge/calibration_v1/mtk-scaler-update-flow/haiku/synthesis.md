以下是根據提供的內容所撰寫的 MTK Scaler Update flow 的詳細文件:

# MTK Scaler Update flow

## Scaler Head Format
所有的 update 資訊都會放在這個 Head Format 裡面。每個參數的詳細定義可以參考 [HP Digital signature for Hub ISP rule](path/to/hp-digital-signature-for-hub-isp-rule.html) 的第 7 頁到第 10 頁。以下列出一些比較需要注意的參數:

1. `[0x80 - 0x85]`: Configuration Setting
2. `[0x86 - 0x89]`: 2nd Image Programming address
3. `[0x8A - 0x8D]`: Public key address

## Scaler Old Recovery Update flow

### Low Level Recovery flow
在沒有 Recovery update flow 的情況下，會直接 update 到 `0x00` 位置:

1. 從 DDCCI 取得 Scaler Public key
2. 特殊保護 flash 位址 `0x7A000` 到 `0x7FFFF` 區域
3. 將程式位址修正為零

### High Level Recovery flow
工具會在 scaler flash 位址 `0x10000`、`0x20000` 或 `0x30000` 減 `0x20` 的位置搜尋字串 `"MSVC0000S3"`。找到這個字串後，往後面找 `0x20` 位置的資料作為 start offset。計算方式為 `ALIGN_64K((start offset + (0x04 + 0x100 + 0x212)))`，然後將 bin 檔資料 update 到這個 offset。

具體流程如下:

1. 在 scaler flash 位址 `0x10000`、`0x20000` 或 `0x30000` 減 `0x20` 的位置搜尋 `"MSVC0000S3"` 關鍵字，找出 sBoot 大小。
2. 從 flash 位址 `sBoot 大小 + 0x20` 讀取 bin 大小。
3. 計算 2nd image 位址 = `ALIGN_64K(((*(U32 *)((U32)_sboot_end+0x20))+(0x04+0x100+0x212)))`。
4. 從 2nd image 位址開始更新整個 bin 檔。

## Scaler New Recovery Update flow

Scaler 有分為 High Level (MST9U) 和 Low Level (TSUMXXX)。

### Low Level Recovery flow
Low Level Recovery flow 會根據 Scaler Head Format 中的 `[0x86 - 0x89]: 2nd Image Programming address` 欄位來決定要 update 到哪個位置。

### High Level Recovery flow
流程如下:

1. 工具會在 scaler flash 位址 `0x100000`、`0x200000` 或 `0x300000` 減 `0x20` 的位置搜尋字串 `"MSVC0000S3"`。
2. 從 `sBoot 大小 + 0x70` 到 `0x77` 讀取 FW 日期。
3. 從 `sBoot 大小 + 0x7B` 到 `0x7D` 讀取 FW 版本。
4. 根據 FW 日期和 FW 版本來決定要 update 到哪個 offset。詳細流程可以參考下面的截圖。

## 新版本的 Scaler Recovery update flow

為了解決 High Level 支援 Dual image 時，連續 update 失敗可能導致 Monitor 開不了機的問題，改成先讀取 DUT 開機區域 (1st/2nd) 來決定程式位址。

之前的指令都是透過 Hub 的 interface API 來下指令，現在 Hub FW 有定義了自訂義指令，可以根據 [GenesysLogic Hub Vendor Command](path/to/genesyslogic-hub-vendor-command.html) 中的 2.6. MStar ISP and Calibration Command 來對 Scaler 下指令。

此外，因應原本 Scaler FW 版本是 LCD flat panel 版本，HP 需要一個正式的 FW 版本。詳細文件可以參考 [HP D&A Firmware Versioning v1.1](path/to/hp-da-firmware-versioning-v1.1.html)。

MTK 新增了兩個指令:

1. Firmware Packet version
2. Firmware Packet date

根據這兩個指令和 Head 檔中的 FW Packet version & FW date，比較後再決定是否需要 update。更新流程如下圖所示 (Note 1)。

[HP D&A Firmware Versioning v1.1](path/to/hp-da-firmware-versioning-v1.1.html)
[GenesysLogic Hub Vendor Command](path/to/genesyslogic-hub-vendor-command.html)