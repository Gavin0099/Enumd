# 如何在 Xcode 執行 clang-format

## 安裝 clang-format

首先需要確保您的系統上已安裝 clang-format。clang-format 是 Clang 專案的一部分，可以透過以下方式安裝:

1. 使用 Homebrew 安裝:
   brew install clang-format
   - 在 `Command Line Tools` 下拉選單中選擇您安裝的 Xcode 版本
   - 這將自動安裝 clang-format

## 檢查 clang-format 版本

確保您使用的 clang-format 版本為 12 或更高版本。您可以透過以下命令檢查版本:

clang-format --version

## 添加 Automator 服務

1. 開啟 Automator 應用程式
4. 在右側搜尋欄位中搜尋 `Run Shell Script`，並將其拖曳到工作流程區域
5. 在 `Run Shell Script` 動作中，將以下腳本貼上:

   clang-format -i "$@"

6. 儲存服務，並命名為 `clang-format`

## 在 Xcode 中使用 clang-format

1. 在專案根目錄中建立一個名為 `.clang-format` 的檔案，並在其中定義您的 clang-format 設定。您可以參考 [clang-format 文件](https://clang.llvm.org/docs/ClangFormatStyleOptions.html) 來設定格式。


3. 右鍵點擊選取的程式碼，並在 `Services` 選單中選擇 `clang-format`。這將使用您在 Automator 中建立的服務來格式化選取的程式碼。

透過這些步驟，您就可以在 Xcode 中輕鬆地使用 clang-format 來格式化您的程式碼了。


- [Clang-Format 官方文件](https://clang.llvm.org/docs/ClangFormat.html)
- [在 Xcode 中使用 clang-format](https://nshipster.com/clang-format/)
- [在 Xcode 中自動格式化程式碼](https://www.raywenderlich.com/9156-xcode-tips-and-tricks#toc-anchor-012)