以下是根據提供的內容所撰寫的「如何抓取 DebugView 日誌」的完整 Markdown 報告:

# 如何抓取 DebugView 日誌

[未有直接 Source 錨點，待確認] [DebugView](https://docs.microsoft.com/en-us/sysinternals/downloads/debugview) 是一款由 Microsoft Sysinternals 開發的工具，可以用來即時監控和記錄系統層級的調試訊息。它能夠捕獲來自各種來源的調試輸出，包括 `OutputDebugString()`、`printf()`、`DbgPrint()` 等函式的輸出。

## 如何使用 DebugView 抓取日誌
根據提供的內容,抓取 DebugView 日誌的步驟如下:

[未有直接 Source 錨點，待確認] 1. 以系統管理員權限運行 DebugView。
2. 開啟 Update Tool。
3. 在 DebugView 中,選擇 `File` -> `Save as` 來保存日誌。
- [未有直接 Source 錨點，待確認] 支援的日誌檔案格式包括 DebugView 4.7 版和 4.9 版。

[未有直接 Source 錨點，待確認] 除了上述的基本使用方法,在使用 DebugView 時還需要注意以下幾點:

1. **DebugView 4.7 和 4.9 版本的差異**: 根據提供的資訊,DebugView 有 4.7 版和 4.9 版可供選擇。兩個版本的日誌格式可能略有不同,使用時請注意。
[未有直接 Source 錨點，待確認] 2. **系統管理員權限**: 為了能夠捕獲系統層級的調試訊息,DebugView 需要以系統管理員權限運行。

總之,使用 DebugView 抓取日誌的關鍵步驟包括:以管理員權限運行 DebugView、開啟 Update Tool,然後選擇 `File` -> `Save as` 來保存日誌檔案。使用時請注意不同版本的日誌格式差異。