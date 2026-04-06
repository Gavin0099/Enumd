---
title: 'Lenovo LDCC Update Tool '
category: general
notion_id: 659386ae-3baf-4ea9-ab92-0f342dd3d219
notion_url: 'https://www.notion.so/Lenovo-LDCC-Update-Tool-659386ae3baf4ea9ab920f342dd3d219'
notion_updated_at: '2026-01-21T09:48:00.000Z'
exported_at: '2026-04-06T11:24:30.342Z'
is_summarized: false
---

### 簡介
LDCC 為 Lenovo 的 Update Tool ，目的為透過此Tool 和ini 設定就可以跟不同的update Tool 連結，並update 指定的Device(ie. Hub )
- Lenovo LDCC 文件 
- LDCC 要包裝的folder，紅框是Lenovo 提供的檔案
- fwconfig.ini 設定 ，可以參考Lenovo monitor firmware update specification的2.3 Content of file fwconfig.ini
### 包裝和update 流程
對應的fw檔和ini檔設定好後，按照下面步驟包裝
1. 透過壓縮軟體(WinRAR or 7-Zip)壓縮成Zip檔
1. 設定指定密碼，可以參考Lenovo monitor firmware update specification 的2.1 System Architecture(Lenovo@#8117)
1. 產生zip 檔後，用admininistrator 權限 開啟 Lenovo update Tool 開啟update 
1. Update 畫面
1. update 完成畫面
### FwUpdateTool 解壓縮路徑
C:\Users\dqete\AppData\Local\Temp\ 找到隨機產生的 folder (紅字部分為登入帳號)
### Note 
- Release 給客戶的文件
- 包裝檔
```c++
			  public const int GLHUB_INI_NOT_FOUND = 101;
        public const int WRITE_GLHUB_INI_FAIL = 102;
        public const int INFINEON_UPDATE_TOOL_NOT_FOUND = 103;
        public const int L1_HUB_FW_FILE_NOT_FOUND = 104;
        public const int L2_HUB_FW_FILE_NOT_FOUND = 105;
        public const int SCALER_FW_FILE_NOT_FOUND = 106;
        public const int DOCK_FW_FILE_NOT_FOUND = 107;
        public const int SCALER_FW_FILE_IS_NOT_FOR_THIS_MONITOR = 108;
        public const int DOCK_FW_FILE_IS_NOT_FOR_THIS_MONITOR = 109;

        public const int FW_UPDATE_FAIL = 200;
        public const int L1_HUB_FW_UPDATE_FAIL = 201;
        public const int L2_HUB_FW_UPDATE_FAIL = 202;
        public const int SCALER_FW_UPDATE_FAIL = 203;
        public const int DOCK_FW_INSTALL_FAIL = 204;
        public const int DOCK_FW_UPDATE_FAIL = 205;

        public const int GET_HUB_INFORMATION_FAIL = 300;
        public const int GET_DOCK_INFORMATION_FAIL = 301;

        public const int UNKNOWN_ERROR = int.MaxValue;
    }

```
