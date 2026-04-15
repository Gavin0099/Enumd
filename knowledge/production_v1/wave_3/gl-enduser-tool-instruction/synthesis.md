以下是基於提供的內容所撰寫的 GL EndUser Tool 使用說明報告:

# GL EndUser Tool 使用說明


[未有直接 Source 錨點，待確認] 程式左上角與左側的圖示是可以更換或新增的,請參考以下步驟:

1. 將要新增的圖示檔案 (例如 TypeA+C.ico) 放置於 `res` 資料夾內。
2. 在 Visual Studio 中,開啟 `GLISPDocking.rc` 檔案,找到 Icon 段落並新增一個 ID。
3. 開啟 `resource.h` 檔案,新增剛剛在 `GLISPDocking.rc` 中新增的 ID。同時記得修改 `_APS_NEXT_RESOURCE_VALUE` 的值,將其設為比剛剛新增的 ID 大 1。
4. 開啟 `IconDefine.h` 檔案,新增一個新的 Type。
5. 開啟 `ISPDockingDlg.cpp` 檔案,找到 `InitializeIconOnUi()` 函式,並加入以下程式碼:


以上步驟完成後,即可更換程式圖示。之後如需再次更換圖示,只需要修改 `IconDefine.h` 檔案中 `ICON_TYPE` 後面的值即可。


除了圖示更換外,本工具尚有其他可設定的參數,詳細內容請參考 `gl-enduser-tool-instruction.html` 文件。