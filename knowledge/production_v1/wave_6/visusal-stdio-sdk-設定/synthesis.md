以下是基於提供的內容邊界所合成的「Visusal Stdio SDK 設定」文件:

# Visusal Stdio SDK 設定

## 1. 整個 Visual Stdio 的 include 與 link 設定

在 Visual Studio 中,您可以透過以下步驟來設定 include 與 link 路徑:

1. 進入 `View` -> `Other Windows` -> `Property Manager`
2. 選擇 `Microsoft.cpp.Win32.user` 屬性頁
   - `Include Directories`: 需要包含 `$(VC_IncludePath)` 和 `$(WindowsSDK_IncludePath)`
   - `Library Directories`: 需要包含 `$(VC_LibraryPath_x86)` 和 `$(WindowsSDK_LibraryPath_x86)`



在設定 Visual Studio SDK 時,也需要考慮其他相關的技術規格和整合要求,例如:

1. [Code-Sign 技術規格文件 (整合版)][code-sign-技術規格文件-整合版]

2. [Etoken System Code View][etoken-system-code-view-]
   - 此文件審核了 Etoken 系統的程式碼,發現了一些安全性和可靠性方面的問題,這些問題也可能影響到 SDK 的整合和部署。

3. [Etoken 安全簽章系統技術說明][etoken-安全簽章系統技術說明]


[code-sign-技術規格文件-整合版]: /code-sign/code-sign-技術規格文件-整合版.html
[etoken-system-code-view-]: /code-sign/etoken-system-code-view-.html
[etoken-安全簽章系統技術說明]: /code-sign/etoken-安全簽章系統技術說明.html