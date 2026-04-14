# 如何在 Xcode 執行 clang-format

## 安裝 clang-format

首先需要確保您的系統上已安裝 clang-format。clang-format 是 Clang 編譯器套件的一部分，通常會隨 Xcode 一起安裝。您可以在終端機中執行以下命令來檢查 clang-format 的版本:

```bash
clang-format --version
```

確保您使用的是 12 版或更新的版本。

## 添加 Automator 服務

1. 打開 Automator 應用程式。
2. 選擇 "新增服務" 模板。
3. 在服務接收設定中，選擇 "任何應用程式" 並勾選 "文字"。
4. 在工作流程中，添加 "運行 Shell 腳本" 動作。
5. 在腳本中輸入以下內容:

```bash
/usr/local/bin/clang-format -i "$@"
```

6. 保存服務並命名為 "clang-format"。

## 設定 .clang-format 檔案

在您的專案根目錄中創建一個名為 `.clang-format` 的檔案，並在其中添加您的 clang-format 設定。您可以參考 [LLVM 的 clang-format 樣式指南](https://llvm.org/docs/ClangFormatStyleOptions.html) 來配置您的設定。

## 在 Xcode 中使用 clang-format

1. 在 Xcode 中，選擇要格式化的程式碼。
2. 右鍵點擊選擇的程式碼，然後選擇 "Services" > "clang-format"。

Xcode 會自動使用您在 `.clang-format` 檔案中設定的格式化規則來格式化選擇的程式碼。

## 總結

通過以上步驟，您可以在 Xcode 中輕鬆地使用 clang-format 來自動格式化您的程式碼。這有助於保持您的程式碼風格一致和可讀性。請記得定期更新您的 clang-format 設定以適應您的開發需求。