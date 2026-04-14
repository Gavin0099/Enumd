以下是如何在 Xcode 中執行 clang-format 的詳細說明:

# 如何在 Xcode 執行 clang-format

## 1. 安裝 clang-format
首先需要確保您的系統上已安裝 clang-format。clang-format 是一個用於自動格式化 C、C++、Objective-C、Java、JavaScript 和 JSON 代碼的工具。您可以從 [LLVM 官網](https://releases.llvm.org/download.html) 下載適合您系統的版本。

## 2. 檢查 clang-format 版本
確保您使用的 clang-format 版本在 12 或以上。您可以在終端機中執行 `clang-format --version` 來檢查版本。

## 3. 添加 Automator 服務
1. 打開 Automator 應用程式。
2. 選擇 "新建文稿" 並選擇 "服務" 作為類型。
3. 在搜索欄中輸入 "Run Shell Script"，並將其拖放到工作流程中。
4. 在 "Shell" 下拉菜單中選擇 "/bin/bash"。
5. 在腳本區域中輸入以下內容:

```bash
clang-format -i "$@"
```

6. 保存服務並命名為 "clang-format"。

## 4. 設定 .clang-format 文件
在您的項目根目錄中創建一個名為 `.clang-format` 的文件，並根據您的代碼風格添加相應的配置。您可以參考 [clang-format 文檔](https://clang.llvm.org/docs/ClangFormatStyleOptions.html) 來設定格式選項。

## 5. 在 Xcode 中使用 clang-format
1. 在 Xcode 中，選擇要格式化的代碼。
2. 右鍵單擊選中的代碼，然後選擇 "Services" > "clang-format"。
3. Xcode 會自動使用 `.clang-format` 文件中的配置對選中的代碼進行格式化。

通過以上步驟，您就可以在 Xcode 中輕鬆地使用 clang-format 來自動格式化您的代碼了。這不僅可以提高代碼的可讀性，還可以確保團隊成員之間的代碼風格保持一致。