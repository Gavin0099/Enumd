---
title: 'SRS - CRD 輔助工具入口介面 '
domain_tags:
  - hub
  - tools
task_tags:
  - config
authority_level: source
is_deprecated: false
category: hub
notion_id: 68a44e28-cfa2-4e61-8e7e-ca3c0d264a51
notion_url: 'https://www.notion.so/SRS-CRD-68a44e28cfa24e618e7eca3c0d264a51'
notion_updated_at: '2026-01-21T09:29:00.000Z'
exported_at: '2026-04-06T13:17:39.762Z'
is_summarized: false
relations: []
---

# 需求
整合眾多的CRD Tool ，提供一個統一的入口介面，方便使用者執行其所需要的CRD輔助工具
# 功能描述 
下列為CRD Home Menu的實作要點
- 根據設定檔案 config.json 載入 ，所有CRD Tool的相關資訊
```json
{
    "Version": "1.0.0.0",
		"Categorys" : ["Configuration","Hub"]
    "Tools": [{
            "Name": "Eep header export tool",
            "Introduction": "Eep header export tool",
            "Path": "../Tool/EepHeaderExportTool.exe",
            "Version": "1.0.0.0",
            "Category": "Configuration",
            "Order":0
        }, {
            "Name": "GL3520QC Tool",
            "Introduction": "Standard tool",
            "Path": "../Tool/GL_SS_HUB_ISP.exe",
            "Version": "1.0.0.0",
            "Category": "Hub",
            "Order":1
        }
    ]
}
```
- 使用者點選工具項目可啟動相對應的工具的執行路徑
- 針對每一個CRD Tool提供名稱，工具內容簡述，工具類別
- 對CRD Tool 進行分類，方便使用者尋找
- 提供搜尋CRD Tool的功能，下列為搜尋的項目:
- 個人化：編輯個人常用CRD Tool清單，可設定值儲存於本機端SQLite檔案
### UI 設計
- 介面完整配置
- CRD Tool 項目UI
- Category Tab Control UI
- Filter Bar
- Data Page control UI
- CRD Tool Detail: 顯示全部Tool的資訊
### 目錄檔案配置
```bash
Bin\               ---> CRD Home Menu 相關DLL
Tool\              ---> CRD Tool 集合
Config\            ---> CRD Home Menu的config.json 與 config.db
Log\               ---> CRD Home Menu的Log
```
