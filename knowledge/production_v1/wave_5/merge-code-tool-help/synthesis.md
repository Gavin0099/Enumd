
   - 需要合併的二進位檔案，通常為 bk0.bin、bk1.bin、bk2.bin、bk3.bin 和 bk4.bin。

2. 輸出檔案結構（merge bin）：
   - 合併後的單一二進位檔案，通常命名為 merged.bin。

   - 將 Common Bank 區域（前 0xE000 bytes）從 bk0.bin 複製到 merged.bin。
   - 將每個獨立的 Bank 區域（後 0x2000 bytes）從對應的 bk*.bin 複製到 merged.bin。

## 整合到 Keil uVision 的 post-process
要將這個 bin merge tool 整合到 Keil uVision 的 post-process，並透過 BAT 檔案呼叫，需要做以下調整和準備。

### 1. 調整 Python 程式碼
Keil uVision 的 post-process 通常是在編譯完成後執行命令，因此需要：
- [未有直接 Source 錨點，待確認] 接受命令列參數（若需要動態指定輸入/輸出檔案）
- 確保程式執行後能無縫整合到 Keil 的流程中
- 避免需要使用者互動（移除 print 訊息，改用日誌或返回碼）

以下是調整後的程式碼，適合 BAT 呼叫：


def merge_bin_files(output_file="merged.bin"):
    input_files = ['bk0.bin', 'bk1.bin', 'bk2.bin', 'bk3.bin', 'bk4.bin']
    common_bank_size = 0xE000
    block_size = 0x2000
    total_size = 0x18000
    
    output_data = bytearray([0xFF] * total_size)
    
    # 讀取 Common Bank
    if not os.path.exists('bk0.bin'):
        sys.exit(1)  # 檔案不存在，返回錯誤碼
    with open('bk0.bin', 'rb') as f:
        common_data = f.read(common_bank_size)
        output_data[0:common_bank_size] = common_data
    
    for i, filename in enumerate(input_files):
        if os.path.exists(filename):
            with open(filename, 'rb') as f:
                f.seek(common_bank_size)
                unique_data = f.read()
                target_start = common_bank_size + (i * block_size)
                target_end = target_start + len(unique_data)
                output_data[target_start:target_end] = unique_data
    
    with open(output_file, 'wb') as f:
        f.write(output_data)
    
    return 0  # 成功返回 0

if __name__ == "__main__":
    output_file = "merged.bin"
    if len(sys.argv) > 1:
        output_file = sys.argv[1]
    
    result = merge_bin_files(output_file)
    sys.exit(result)

- 移除 print 訊息，避免干擾 Keil 流程
- [未有直接 Source 錨點，待確認] 支援命令列參數（輸出檔案名稱可選）
- 使用 `sys.exit()` 返回執行狀態（0 表示成功，非 0 表示失敗）

### 2. 建立 BAT 檔案
假設 Python 腳本命名為 `merge_bin.py`，建立一個 BAT 檔案（例如 `post_process.bat`）：

python merge_bin.py merged.bin
if %ERRORLEVEL% NEQ 0 (
    echo Error: Bin merge failed!
    exit /b %ERRORLEVEL%
echo Bin merge completed successfully.

- `python merge_bin.py merged.bin`：呼叫 Python 腳本並指定輸出檔案
- 檢查 `%ERRORLEVEL%`：若 Python 腳本返回非 0，表示失敗
- 返回適當的退出碼給 Keil

### 3. 整合到 Keil uVision
在 Keil uVision 中設定 post-process：
1. 打開專案：`Project -> Options for Target`
2. 切換到 `User` 標籤
3. 在 `Run User Programs After Build/Rebuild` 區塊：
   - 輸入 `post_process.bat`

- Python 環境：確保系統已安裝 Python，且環境變數 `PATH` 已包含 Python 路徑（或在 BAT 中指定完整 Python 路徑，例如 `C:\Python39\python.exe`）
- 檔案路徑：確保 `bk0.bin` ~ `bk4.bin` 在 Keil 編譯後的輸出目錄中（通常是專案的 `Objects` 資料夾）。若不在同一目錄，需在 BAT 或 Python 中處理路徑。

2. 確認 `bk0.bin` ~ `bk4.bin` 生成
3. Post-process 自動執行 BAT，呼叫 Python 腳本
4. 檢查 `merged.bin` 是否正確生成

- 工作目錄：Keil 執行 post-process 時的工作目錄通常是專案目錄或輸出目錄。若檔案路徑不符，需在 BAT 中使用 `cd` 切換目錄，例如：
[未有直接 Source 錨點，待確認] cd %KEIL_PROJECT_DIR%\Objects
  python merge_bin.py merged.bin
- 相對路徑：根據 Keil 輸出結構調整檔案路徑
- 日誌需求：若需記錄執行結果，可在 BAT 中加入重定向：
  python merge_bin.py merged.bin >> merge_log.txt 2>&1


│   └── merged.bin（生成）
├── merge_bin.py
└── post_process.bat

[merge-code-tool-help.html](https://github.com/GenesysLogic/documentation/blob/main/tools/merge-code-tool-help.html)