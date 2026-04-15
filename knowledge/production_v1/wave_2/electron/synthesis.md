[未有直接 Source 錨點，待確認] 根據提供的內容，以下是對「electron」核心主題的文件綜合報告：


- 功能說明：Electron 主進程，負責建立應用程式視窗並載入 preload.js。
- 開發重點：控制應用程式的生命週期，並與 renderer 進程溝通。
- 互動關係：與 preload.js 和 index_2.html 互動。

- 功能說明：Preload 腳本，在主進程和渲染進程之間架設橋樑。
- 開發重點：暴露 native API 給渲染進程使用。
- 互動關係：與 main.js 和 renderer.js 互動。

- 功能說明：Electron 渲染進程，負責處理使用者介面的互動。
- 開發重點：透過 preload.js 提供的 API 呼叫 native 功能。
- 互動關係：與 preload.js 和 index_2.html 互動。

### index_2.html
- 功能說明：Electron 應用程式的使用者介面。
- [未有直接 Source 錨點，待確認] 開發重點：提供視覺化的操作介面。
- 互動關係：與 renderer.js 互動。

- 功能說明：用於設定 native addon 的 build 配置。
- 開發重點：決定 Windows 和 macOS 下分別編譯 addon.cpp 或 addon.mm。
- 互動關係：與 addon.cpp 和 addon.mm 互動。

- 功能說明：Windows 平台下的 native addon，使用 N-API 與 DLL 溝通。
- 開發重點：實現與 native 庫的交互功能。
- 互動關係：與 binding.gyp 和 GlOciDll_Hub_L1.dll 互動。

- 功能說明：macOS 平台下的 native addon，使用 N-API 與 Framework 溝通。
- 開發重點：實現與 native 庫的交互功能。
- 互動關係：與 binding.gyp 和 GlOciDll_Hub_L1.framework 互動。


1. 啟動 Electron 應用程式 → main.js 建立 window，注入 preload.js。
2. renderer.js 在 UI 觸發時，透過 window.electron 呼叫 native API。
3. native API 呼叫 addon.node，實際由 addon.cpp/addon.mm 與 DLL/Framework 溝通。
4. DLL/Framework 回應查詢/更新，層層回傳至 UI。

