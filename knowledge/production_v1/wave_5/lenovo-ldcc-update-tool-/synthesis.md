
# Lenovo LDCC Update Tool 文件

[Lenovo LDCC 文件](https://github.com/lenovo/ldcc-update-tool/blob/main/README.md) 描述了 LDCC (Lenovo Device Configuration Console) 這個 Update Tool 的用途。LDCC 的目的是透過此工具和 `fwconfig.ini` 設定檔，可以連結到不同的 Update Tool 並更新指定的裝置(如 Hub)。

要使用 LDCC Update Tool 進行韌體更新,需要先準備好對應的韌體檔案和 `fwconfig.ini` 設定檔。然後按照以下步驟進行包裝和更新:

1. 使用壓縮軟體(如 WinRAR 或 7-Zip)將韌體檔案和設定檔打包成 Zip 檔案。
2. 設定指定的密碼,可以參考 [Lenovo monitor firmware update specification](https://github.com/lenovo/ldcc-update-tool/blob/main/Lenovo%20monitor%20firmware%20update%20specification.pdf) 的 2.1 System Architecture 章節。
3. 產生 Zip 檔案後,以系統管理員權限開啟 Lenovo Update Tool 並進行更新。

## FwUpdateTool 解壓縮路徑
LDCC Update Tool 在執行時會在 `C:\Users\<登入帳號>\AppData\Local\Temp\` 資料夾下隨機產生一個資料夾,用於存放解壓縮的檔案。

LDCC Update Tool 在執行過程中可能會遇到以下錯誤:

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

在提供的相關內容中,有以下幾個主題與 LDCC Update Tool 相關:

1. [Camera 透過我們驗證 code sign](code-sign/camera-透過我們驗證-code-sign.html)
   - 描述了 Camera 韌體更新的流程,包括如何進行 ECDSA 簽章、如何擦除 Camera 以及如何讀取 Camera 資料。
2. [Etoken System Code View](code-sign/etoken-system-code-view-.html)
   - 分析了 etoken_dongle_server 和 etoken_server 的程式碼,發現了一些架構和安全性問題,如 detach 執行緒、SQL 注入等。
3. [eToken 安全簽章系統技術說明](code-sign/etoken-安全簽章系統技術說明.html)

這些相關內容都與 LDCC Update Tool 的簽章和安全性相關,可以提供更多背景資訊。