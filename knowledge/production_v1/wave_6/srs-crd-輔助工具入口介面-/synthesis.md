# SRS - CRD 輔助工具入口介面

整合眾多的CRD Tool ，提供一個統一的入口介面，方便使用者執行其所需要的CRD輔助工具。

以下為CRD Home Menu的實作要點:

1. 根據設定檔案 `config.json` 載入所有CRD Tool的相關資訊。`[SRS - CRD 輔助工具入口介面](./srs-crd-輔助工具入口介面-.html)`

    "Version": "1.0.0.0",
    "Categorys" : ["Configuration","Hub"],
            "Name": "Eep header export tool",
            "Introduction": "Eep header export tool",
            "Path": "../Tool/EepHeaderExportTool.exe",
            "Version": "1.0.0.0",
            "Category": "Configuration",
            "Name": "GL3520QC Tool",
            "Introduction": "Standard tool",
            "Path": "../Tool/GL_SS_HUB_ISP.exe",
            "Version": "1.0.0.0",
            "Category": "Hub",

[未有直接 Source 錨點，待確認] 2. 使用者點選工具項目可啟動相對應的工具的執行路徑。
3. 針對每一個CRD Tool提供名稱、工具內容簡述、工具類別。
4. 對CRD Tool 進行分類，方便使用者尋找。
5. 提供搜尋CRD Tool的功能，搜尋項目包括工具名稱、簡述、類別。

- Category Tab Control UI
- Data Page control UI
- CRD Tool Detail: 顯示全部Tool的資訊

Bin\               ---> CRD Home Menu 相關DLL
Tool\              ---> CRD Tool 集合
Config\            ---> CRD Home Menu的config.json 與 config.db
Log\               ---> CRD Home Menu的Log