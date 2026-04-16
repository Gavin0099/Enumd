
# Tri Code Command line Tool command line List

Tri Code Command line Tool 是一款用於管理 USB 裝置韌體的命令列工具。以下列出了該工具的主要命令行選項:

- `"GLHubUpdateToolCli.exe /i"`: 顯示 hub(s) 的相關資訊。
- `"GLHubUpdateToolCli.exe /c"`: 顯示 hub(s) 的 chip ID。
- `"GLHubUpdateToolCli.exe /v"`: 顯示 hub(s) 和 pd(s) 的韌體版本。
- `"GLHubUpdateToolCli.exe /va"`: 顯示涉及韌體版本的 hub(s)。
- `"GLHubUpdateToolCli.exe /vb"`: 顯示 bin 檔案的韌體版本。

- `"GLHubUpdateToolCli.exe /er=1"`: 刪除 Hub 和 bridge 韌體。
- `"GLHubUpdateToolCli.exe /er=1&epd:1"`: 刪除 PD 和 billboard 韌體。

- `GLHubUpdateToolCli.exe "/mu=1&epd=%PdFwPath%"`: 燒錄 Hub 和 bridge 韌體。
- `GLHubUpdateToolCli.exe "/mu=1&epd=%PdFwPath%"`: 燒錄 PD 和 billboard 韌體。

- `"GLHubUpdateToolCli.exe /re=1"`: 重置和重載 Hub 和 bridge 韌體。
- `"GLHubUpdateToolCli.exe /re=1&epd:1"`: 重置和重載 PD 和 billboard 韌體。

- `"GLHubUpdateToolCli.exe /dmp=id{&key[:index]=path}..."`: 轉儲韌體。

這些命令行選項可用於查詢、刪除、燒錄和重置 USB 裝置的韌體。它們提供了一種方便的方式來管理和維護這些裝置的韌體。


1. [`HID Code Sign Update Rule`](path/to/hid-code-sign-update-rule.html): 介紹了 HID 韌體更新的協議和驗證方式。
2. [`HID Code Sign 記錄`](path/to/hid-code-sign-記錄.html): 記錄了 HID 韌體更新的歷史和相關問題。
3. [`HP Hemi(Z34c) CPU3 Code Sign 驗證問題`](path/to/hp-hemiz34c-cpu3-code-sign-驗證問題.html): 討論了在 HP Hemi(Z34c) CPU3 上進行 Code Sign 驗證時遇到的問題。

[未有直接 Source 錨點，待確認] 這些相關文件提供了更多關於 USB 裝置韌體管理和驗證的背景資訊。