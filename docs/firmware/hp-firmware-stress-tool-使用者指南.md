---
title: '**HP Firmware Stress Tool — 使用者指南**'
domain_tags:
  - firmware
  - tools
task_tags:
  - install
  - sop
authority_level: source
is_deprecated: false
category: firmware
notion_id: 35164f6b-c656-80c1-804e-f6983c6c86db
notion_url: 'https://www.notion.so/HP-Firmware-Stress-Tool-35164f6bc65680c1804ef6983c6c86db'
notion_updated_at: '2026-04-29T05:40:00.000Z'
exported_at: '2026-05-16T12:43:29.558Z'
is_summarized: false
relations:
  manual: []
  inferred: []
---

> 僅供內部使用 | HP Enterprise | 文件對應版本: `1.0.1.10`

---

## 目錄

1. [工具簡介](https://www.notion.so/HP-Firmware-Stress-Tool-35164f6bc65680c1804ef6983c6c86db#1-%E5%B7%A5%E5%85%B7%E7%B0%A1%E4%BB%8B)

1. [系統需求](https://www.notion.so/HP-Firmware-Stress-Tool-35164f6bc65680c1804ef6983c6c86db#2-%E7%B3%BB%E7%B5%B1%E9%9C%80%E6%B1%82)

1. [安裝與啟動](https://www.notion.so/HP-Firmware-Stress-Tool-35164f6bc65680c1804ef6983c6c86db#3-%E5%AE%89%E8%A3%9D%E8%88%87%E5%95%9F%E5%8B%95)

1. [快速上手](https://www.notion.so/HP-Firmware-Stress-Tool-35164f6bc65680c1804ef6983c6c86db#4-%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B)

1. [操作介面說明](https://www.notion.so/HP-Firmware-Stress-Tool-35164f6bc65680c1804ef6983c6c86db#5-%E6%93%8D%E4%BD%9C%E4%BB%8B%E9%9D%A2%E8%AA%AA%E6%98%8E)

1. [標準壓力測試流程](https://www.notion.so/HP-Firmware-Stress-Tool-35164f6bc65680c1804ef6983c6c86db#6-%E6%A8%99%E6%BA%96%E5%A3%93%E5%8A%9B%E6%B8%AC%E8%A9%A6%E6%B5%81%E7%A8%8B)

1. [結果判定與中止規則](https://www.notion.so/HP-Firmware-Stress-Tool-35164f6bc65680c1804ef6983c6c86db#7-%E7%B5%90%E6%9E%9C%E5%88%A4%E5%AE%9A%E8%88%87%E4%B8%AD%E6%AD%A2%E8%A6%8F%E5%89%87)

1. [輸出檔案與保留策略](https://www.notion.so/HP-Firmware-Stress-Tool-35164f6bc65680c1804ef6983c6c86db#8-%E8%BC%B8%E5%87%BA%E6%AA%94%E6%A1%88%E8%88%87%E4%BF%9D%E7%95%99%E7%AD%96%E7%95%A5)

1. [防睡眠機制](https://www.notion.so/HP-Firmware-Stress-Tool-35164f6bc65680c1804ef6983c6c86db#9-%E9%98%B2%E7%9D%A1%E7%9C%A0%E6%A9%9F%E5%88%B6)

1. [DFU 期間的外接螢幕控制](https://www.notion.so/HP-Firmware-Stress-Tool-35164f6bc65680c1804ef6983c6c86db#10-dfu-%E6%9C%9F%E9%96%93%E7%9A%84%E5%A4%96%E6%8E%A5%E8%9E%A2%E5%B9%95%E6%8E%A7%E5%88%B6)

1. [疑難排解](https://www.notion.so/HP-Firmware-Stress-Tool-35164f6bc65680c1804ef6983c6c86db#11-%E7%96%91%E9%9B%A3%E6%8E%92%E8%A7%A3)

## 1. 工具簡介

HP Firmware Stress Tool 是一個韌體更新壓力測試編排器。它本身不直接燒錄韌體，而是呼叫 HP OCI Tool（`HPFirmwareInstaller` / `FirmwareInstaller`）反覆執行更新流程，並根據 exit code、OCI log 與 stdout/stderr 自動判定每一圈結果。

目前支援的主要場景：

- 單資料夾重複更新測試

- 雙資料夾交替更新測試（Folder1 / Folder2 輪替）

- 顯示干擾測試（VCP、平台顯示層與 CPU/IO 壓力）

- 斷線韌體更新（DFU, Disconnected Firmware Update）

- Timer Accuracy Check（TAC）工程模式

重要限制：

- 不修改 OCI Tool 本身行為

- 不支援同時多台裝置並行測試

- DFU 模式只套用在 Folder1 路徑，也就是單資料夾模式或雙資料夾模式中的奇數圈

- Folder2 在雙資料夾模式中永遠走一般更新流程，不會走 DFU

## 2. 系統需求

| 項目 | 需求 |

| 作業系統 | Windows 10/11、macOS 12+、Linux |

| OCI Tool | Folder1 必須包含可辨識的 OCI 執行檔 |

| 可辨識檔名 | `HPFirmwareInstaller.exe`、`FirmwareInstaller.exe`、`HPFirmwareInstaller`、`FirmwareInstaller`、`HPFirmwareInstaller.app`、`FirmwareInstaller.app`、`hp_oci_tool` |

| 權限 | Windows 下 DFU 模式必須使用系統管理員權限；macOS / Linux 建議使用具備足夠權限的帳號 |

| 額外依賴 | Windows / Linux 的部分 VCP 功能依賴 `monitorcontrol`；macOS 使用內建 `utils/vcp_macos.py` backend |

補充說明：

- 若使用已打包的發佈版，通常不需要額外配置 Python 執行環境。

- 若直接以原始碼執行，請先安裝 `requirements.txt` 中的依賴。

- 若要使用 TAC 或其他依賴 DDC/CI 的進階驗證，請先確認測試機有可用的 VCP backend 與目標顯示器支援。

## 3. 安裝與啟動

### 3.1 發佈版

1. 解壓縮發佈包。

1. 執行 `hp-firmware-stress-tool.exe`（Windows）或對應平台可執行檔。

1. Windows 若出現 SmartScreen 提示，請選擇「其他資訊」後再允許執行。

### 3.2 原始碼模式

1. 建立並啟用 Python 虛擬環境。

1. 安裝 `requirements.txt`。

1. 執行 `main.py`。

## 4. 快速上手

1. 啟動工具。

1. 在 `OCI Firmware Package Folder` 區塊為 Folder1 指定一個有效套件資料夾。

1. 確認左側 `OCI Tool` 欄位成功顯示版本字串。

1. 視需求決定是否啟用 Folder2、Display Interference、DFU、Keep All Logs 或 Timer Accuracy Check。

1. 在標準模式下設定 `Number of executions` 與 `Interval`。

1. 點擊 `Start`。

注意事項：

- 標準模式會依 `Number of executions` 執行迴圈。

- 啟用 `Timer Accuracy Check` 後，工具會切換到 TAC runner，改跑固定的工程 phase 序列，不再依 `Number of executions` 次數執行一般 loop。

- 標準模式中，即使 UI 可輸入小於 60 秒的 `Interval`，目前實作仍會在每次成功迴圈後至少等待 60 秒才進入下一圈。

## 5. 操作介面說明

### 5.0 主畫面（執行中狀態）

![image](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/9fc7da1f-5d4b-4105-9032-0292acfbfcaa/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664QLRY5DX%2F20260516%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260516T124321Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC1x9g7KesOfKQDVDQnbRdDecopdAebzfbnQFAbu4WGXAiAiynCngqOsucJnI%2FuGTCNoSIEfRNQtTBulsUiuS3DvCiqIBAiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM3KAtTD%2FahQ9NbYd4KtwDVhI3yI8sqc8i3SUnNfQ1z5Kx7zMCg4fHWhUU%2F%2FytkiJBKE5Z0XXKA3NiRTKsVI50yc%2BcIUu1NC1f%2FA%2FpIJK1FDENRaiV5Zs%2FuDYpzEcz2ORY%2FfU5XTYvmFzYkgQS433wZwtRBVbp27fposge9rvcWxBD3ApzYi%2B%2Bg37f76uKIE3DjNV45AqCnx3%2ByczCZWzqG32ODYiPMAews5AmZCnfsFFBieJtU7hB4oerONBag1HWkErkjZs%2F1SkEXYfsxdfRFKDYnI0l%2FBBF%2F3GSTSYvjFlws%2FuPeegQq2G90HcQt3IV%2BmE2aNSQMkB3qnOFvUb7oP1j341BKRLHi3O9izN6foGcws8TJqu%2BtyZ2IDFyG05sxNIHcCptS3%2Fqs9RfETuNAN0il3TrBgGi1clS%2FUPhv9V7ihmVXMJhlSOCizXSrLo%2F8ai7LR9UjDT6L1FLh02UMyhe5usCf63cU3wRiG%2BYJLf6AaMuMgxyc%2FRsa3GiqphNUpLnNxKgNB9ck8KzEBghHd7zYg9NysPyeEcILYROuS4a5E1Z%2BsxKyVVC4ML5H%2FN5K%2FoBH2nhZtaliMM50B5%2B96zJHb2oqk0LFDuBIO%2F5ZgJlkg9iqqxEJevl1dSGXKQDrmJonP1PfuYqYbkwpOqg0AY6pgFkfnDtEzbpz0IG1FZAQ3jWO%2FHXJcwoq%2FLCMT%2BeSSV1onuMneioFFkbK53RSCq82eF8%2BZn6yQIzc42d9k2%2Buh9P1QonyI3CamFqc3421wQNSoaPsQvWw7WJByF95QC%2BUiWMVMpecyNFGwjhdQUGjf4pfMSRSY2KmbF7IC%2FXDi8ZIgZNqAPNy%2BueYWmF9Ir9W49olm72u065aY5uytA0RGt2ojzyNlIy&X-Amz-Signature=27a015eef17f3c36641e1bf53880c763aec2ac395d89737f39b008e2d1f28ed2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

### 5.1 Tool Version

左側版本面板包含兩個欄位：

| 欄位 | 說明 |

| `OCI Tool` | 根據 Folder1 進行輕量檢查與非同步版本偵測 |

| `FW Stress Tool` | 顯示本工具版本，目前為 `1.0.1.10` |

`OCI Tool` 欄位可能出現以下狀態：

- `Unknown`: 尚未選擇 Folder1，或資料夾不存在

- `Tool Found`: 已在 Folder1 找到符合名稱的 OCI 執行檔

- `Detecting...`: 正在非同步偵測版本

- `Tool Not Found`: 未找到符合規則的 OCI 執行檔

- `<版本字串>`: 版本偵測成功

- `Error: ...`: 偵測過程發生例外

### 5.2 OCI Firmware Package Folder

| 欄位 | 說明 |

| Folder1 | 必填。所有版本偵測都以 Folder1 為來源 |

| Folder2 | 選填。啟用後偶數圈使用 Folder2，奇數圈使用 Folder1 |

交替邏輯：

- 第 1 圈：Folder1

- 第 2 圈：Folder2

- 第 3 圈：Folder1

- 依此類推

若 Folder2 未勾選，所有迴圈都使用 Folder1。

### 5.3 Test Scenarios

### Display Interference Testing

啟用後，背景執行緒會盡量建立顯示與系統干擾，包括：

- 可用時對顯示器送出 DDC/CI VCP 亮度寫入與讀回流量

- Windows 顯示層重繪干擾

- macOS 短時 CPU/IO 尖峰

- 通用 CPU 排序負載

若 VCP backend 不可用，工具會自動退化為較輕量的干擾模式，不會因此中止測試。

### Disconnected Firmware Update

啟用後，奇數圈會改走 DFU 流程：

1. 執行 DFU 啟動命令 `ni -st -sd=1 -su=1`

1. 停用外接螢幕

1. 等待 `DFU waiting` 指定分鐘數

1. 恢復外接螢幕

1. 固定等待 60 秒讓裝置重新列舉

1. 執行 `c` 查詢最終 DFU 結果

實作限制：

- 只有 Folder1 / 奇數圈會走 DFU

- 雙資料夾模式下的 Folder2 / 偶數圈永遠走一般更新

- Windows 下若未以系統管理員權限執行，DFU 不會開始

### Keep All Logs

啟用後，包含 PASS 在內的所有 `.log` / `.output` 檔案都會保留。

未啟用時：

- PASS 的 `.log` / `.output` 會自動刪除

- FAIL / WARNING / TIMEOUT / UNKNOWN 的相關檔案永遠保留

### Timer Accuracy Check

啟用後，主流程會切換為 TAC runner。TAC 模式會：

- 以預設 phase 序列執行工程驗證

- 依 phase 計算 N / M / T_ON / T_OFF_min

- 嘗試透過 VCP 將 timer 狀態寫入顯示器

- 執行完整 DFU 週期並判定結果

這是工程驗證模式，不是一般 loop 壓力測試模式。

目前限制：

- TAC 依賴可用的 DDC/CI VCP backend；若 backend 不可用，timer 寫入會被略過並在 log 中顯示警告

- HP timer VCP codes 目前仍屬工程整合中的設定，請以實機結果與顯示器規格文件交叉驗證

### 5.4 Execution Control

| 設定 | 說明 |

| Number of executions | 標準模式的總圈數，範圍 `1` 到 `99999` |

| Interval | UI 可輸入 `0.00` 到 `3600.00` 秒；標準模式目前實作會對成功迴圈強制套用最少 60 秒等待 |

| Start | 啟動測試 |

| Abort | 測試進行中顯示為紅色；按下後會先 terminate，再給 5 秒寬限，之後必要時強制 kill |

執行中會暫時停用所有輸入控制項，測試結束或中止後才重新啟用。

### 5.5 Advanced Settings

點擊 `...` 可展開 `Time Accuracy Check Setting` 面板。

| 設定 | 預設值 | 說明 |

| PollIntervalRatio | `1.000` | TAC / timer drift 使用的內部倍率 |

| TimeScale | `1` | TAC 相關時間門檻倍率 |

| Power Saver Mode | `Balanced` | UI 可選 `Balanced`、`Power Saver`、`Performance` |

補充：目前 `Power Saver Mode` 僅收集於設定中，未直接影響標準更新命令列參數。

### 5.6 狀態指示與進度

大型中央指示燈可能顯示：

| 狀態 | 意義 |

| READY | 閒置 |

| WAITING | 已進入等待 OCI 程序執行 |

| RUNNING | OCI / DFU 執行中 |

| PASS | 當前或最終狀態成功 |

| FAIL | 當前或最終狀態失敗 |

| ABORTED | 使用者中止 |

| ERROR | 內部錯誤 |

右側狀態資訊：

- `Stress loop: N / Total`: 目前進度

- `Last loop result code: X`: 最近一圈 exit code

特殊 exit code：

| Code | 說明 |

| `0` | 正常成功 |

| `-1` | 程序在取得穩定 return code 前結束 |

| `-10` | Folder1 / Loop-A 流程未取得穩定 OCI return code |

| `-11` | Folder2 / Loop-B 流程未取得穩定 OCI return code |

| `110` | OCI Tool 參數無效 |

### 5.7 日誌視窗與底部狀態列

日誌視窗會即時顯示：

- `-- Loop n/N Start ---`

- 實際命令列

- DFU / 降級檢查狀態

- 每圈結果與原因

- 最終 `SESSION VERDICT`

底部狀態列則顯示較短的狀態摘要，例如等待中、DFU 倒數、重新列舉中或最終 verdict。

## 6. 標準壓力測試流程

### 6.1 基本單資料夾測試

1. 選擇 Folder1。

1. 設定 `Number of executions`。

1. 視需求設定 `Interval`。

1. 點擊 `Start`。

### 6.2 雙資料夾交替更新

1. 選擇 Folder1。

1. 勾選 Folder2 並選擇第二個套件資料夾。

1. 啟動測試。

實作行為：

- 奇數圈使用 Folder1

- 偶數圈使用 Folder2

- 每個套件資料夾內若有自己的 OCI 執行檔，工具會優先使用該資料夾自己的執行檔，而不是固定使用 Folder1 的執行檔

### 6.3 DFU 測試

DFU 模式流程如下：

1. 啟用 `Disconnected Firmware Update`

1. 設定 `DFU waiting`

1. 點擊 `Start`

1. 奇數圈進入 DFU 流程，偶數圈仍走一般更新

若啟用了 DFU，Session 第一次 DFU 前還會做一次自動降級檢查：

- 工具會讀取 Folder1 / Folder2 套件版本

- 工具會嘗試透過 VCP 讀取裝置目前版本

- 若目前裝置版本大於或等於兩個套件中的較高版本，工具會先執行一次降級到較低版本套件

- 若 VCP 無法讀取，降級檢查會被略過，但 DFU 測試仍會繼續

### 6.4 Timer Accuracy Check

TAC 模式是固定工程 phase 測試，不依照一般 loop 次數執行。其核心流程為：

1. 計算 phase 對應的 timer 參數

1. 嘗試以 VCP 寫入顯示器 timer 狀態

1. 執行完整 DFU 週期

1. 以 `c` 結果與 log 內容判定 phase 結果

若任一 phase 不是 PASS，TAC 會立即停止。

建議只在已確認 VCP/DDC 路徑可用的機器上使用 TAC，否則 timer 狀態寫入可能被略過，結果只具有限度參考價值。

## 7. 結果判定與中止規則

每圈結果由三個來源共同判定：

- OCI exit code

- OCI log 檔內容

- stdout / stderr

主要結果類型：

| 結果 | 說明 |

| PASS | 成功訊號一致 |

| FAIL | 失敗關鍵字、非 0 exit code、或 strict mode 升級後的結果 |

| WARNING | 僅在非 strict mode 下保留；目前 UI 預設不會以最終 WARNING 結束 |

| TIMEOUT | 超過單圈 timeout |

| UNKNOWN | 無法從 log / output 得到可信結論 |

目前 UI 固定使用 strict mode，因此：

- `WARNING` 會直接升級為 `FAIL`

- 任何非 PASS 結果都會立刻中止後續迴圈

- 使用者按下 `Abort` 後，Session verdict 會記為 `FAIL (ABORTED)`

## 8. 輸出檔案與保留策略

所有輸出都寫入工作目錄下的 `logs/`。

### 8.1 標準模式輸出

| 檔案 | 用途 |

| `session_<id>.jsonl` | 每圈一筆 JSONL 紀錄 |

| `session_<id>_summary.json` | Session 摘要 |

| `loop_<n>.log` | OCI log 主檔 |

| `loop_<n>.output` | 捕獲的 stdout / stderr |

| `loop_<n>.dfu_check.log` | DFU `-c` 查詢 log |

| `loop_<n>.downgrade.log` | DFU 前自動降級 log |

### 8.2 TAC 模式輸出

| 檔案 | 用途 |

| `tac_phase_<n>.log` | 該 phase 的主要 log |

| `tac_phase_<n>.dfu_check.log` | 該 phase 的 DFU 查詢 log |

### 8.3 JSONL / Summary 內容

`session_<id>.jsonl` 會記錄：

- `loop_index`

- `cmd_sanitized`

- `sleep_inhibit_mode`

- `exit_code`

- `result`

- `parsed_reason`

- `stdout_tail`

- `log_file_path`

`session_<id>_summary.json` 會記錄：

- `session_verdict`

- `aborted_by_user`

- `stats`

- `first_fail`

- `environment`

### 8.4 保留策略

| 條件 | `.log` / `.output` |

| PASS 且未勾選 Keep All Logs | 自動刪除 |

| PASS 且已勾選 Keep All Logs | 保留 |

| FAIL / WARNING / TIMEOUT / UNKNOWN | 永遠保留 |

DFU 的 `.dfu_check.log` / `.downgrade.log` 在 PASS 且未勾選 Keep All Logs 時，也會一併清理。

補充：目前日誌檔名是依 loop index 或 TAC phase index 命名，不會額外在檔名中標示 Folder1 / Folder2。

## 9. 防睡眠機制

測試執行期間，工具會依平台啟用防睡眠：

| 平台 | 機制 |

| Windows | `SetThreadExecutionState(ES_CONTINUOUS |

| macOS | `caffeinate -isd` |

| Linux | 若存在 `systemd-inhibit`，則以 `systemd-inhibit --what=sleep` 包裝 OCI 命令 |

測試完成、失敗、中止或關閉程式時，工具會自動解除防睡眠。

## 10. DFU 期間的外接螢幕控制

DFU waiting 前後，工具會嘗試控制外接螢幕，以貼近原始流程：

| 平台 | 停用方式 | 恢復方式 |

| Windows | `DisplaySwitch.exe /internal` | `DisplaySwitch.exe /extend` |

| macOS | DDC/CI VCP `0xD6 = 4` | DDC/CI VCP `0xD6 = 1` |

| Linux | `xrandr --output <name> --off` | `xrandr --output <name> --auto` |

若平台環境不支援或裝置已經斷線，工具會退化為 no-op，不會因為外接螢幕控制失敗而中止整體測試。

macOS 補充：DDC 操作若超過約 5 秒仍無法完成，會視為不可用並直接略過，避免阻塞 DFU 主流程。

## 11. 疑難排解

### 11.1 `Tool Not Found`

- 確認 Folder1 指向的就是 OCI 套件根目錄

- 確認執行檔名稱符合支援清單

- macOS `.app` 需包含 `Contents/MacOS/` 內的可執行檔

### 11.2 點擊 Start 後立即失敗

- 檢查日誌視窗是否出現 `OCI Tool not found`

- 確認 Folder1 路徑存在且可讀

- 若啟用 DFU 且在 Windows，請確認本工具是以系統管理員身份執行

### 11.3 `Interval` 設很小但還是等很久

這是目前實作行為。標準模式下，成功迴圈之間的等待會強制至少 60 秒，即使 UI 顯示允許更小的數值。

### 11.4 每圈都變成 FAIL 或 UNKNOWN

- 查看 `logs/` 中保留下來的 `.log` 與 `.output`

- 若要保留 PASS 的紀錄，請勾選 `Keep All Logs`

- 確認 OCI 套件內容完整，且實際裝置已連線

### 11.5 DFU 沒有開始或馬上被拒絕

- Windows 下 DFU 必須以系統管理員權限執行

- 確認目標裝置支援 DFU

- 檢查是否有安全軟體阻擋 OCI Tool 啟動

### 11.6 自動降級檢查沒有執行

- 只有第一次 DFU 前會做一次檢查

- 若 VCP 無法讀取裝置版本，工具會記錄 skip 並直接繼續 DFU

- 若裝置版本本來就低於較高版本套件，工具會判定為 `UPGRADE`，不會先降級

### 11.7 出現 `10` 或 `11`

- 這代表 OCI Tool 尚未回傳穩定 exit code，不一定是最終失敗

- 工具會自動重試最多 5 次，每次等待 30 秒

- 若重試後仍停在 `10` 或 `11`，請檢查裝置連線、OCI 套件完整性與系統權限

---

Copyright © 2026 HP Enterprise. Internal Use Only.
