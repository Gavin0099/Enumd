以下為 Lenovo 顯示器韌體更新規格 V0.1 的文件:

# Lenovo 顯示器韌體更新規格 V0.1

## 1. 與 Lenovo Framework APP 溝通
在進行韌體更新時,需要與 Lenovo Framework APP 進行溝通協調,確保更新工具 (Update Tool) 能夠順利地與 Lenovo Framework APP 交互操作。

## 2. 使用 INI 檔設定更新參數
[未有直接 Source 錨點，待確認] 更新工具需要透過 INI 檔案來設定韌體更新的各項參數,包括但不限於:

- `GL3523`: 檢查軟體或 scaler 韌體是否合法 `[Title](genesys-logic-spec.html)`


## 5. 透過 PostMessage 方式傳送訊息
更新工具需要透過 PostMessage 的方式將更新訊息傳送給 Lenovo Framework APP,確保 APP 能夠及時獲取更新狀態。

以上為 Lenovo 顯示器韌體更新規格 V0.1 的主要內容。在實際實作時,需要仔細閱讀相關的 `[HP Hemi(Z34c) CPU3 Code Sign 驗證問題](hp-hemiz34c-cpu3-code-sign-驗證問題.html)` 和 `[Genesys Logic Spec](genesys-logic-spec.html)` 文件,了解更多關於安全性驗證、韌體更新流程等方面的細節。