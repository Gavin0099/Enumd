以下是關於 Mac Framework 的綜合報告:


## 1. 建立 Info.plist.in 模板
在專案根目錄中新增一份 `Info.plist.in` 模板檔案，內容如下:

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
[未有直接 Source 錨點，待確認] <key>CFBundleDevelopmentRegion</key>
[未有直接 Source 錨點，待確認] <string>en</string>
[未有直接 Source 錨點，待確認] <key>CFBundleExecutable</key>
  <string>@TARGET_NAME@</string>
[未有直接 Source 錨點，待確認] <key>CFBundleIdentifier</key>
  <string>com.genesyslogic.@TARGET_NAME@</string>
[未有直接 Source 錨點，待確認] <key>CFBundleVersion</key>
  <string>@FRAMEWORK_VERSION@</string>
[未有直接 Source 錨點，待確認] <key>CFBundleShortVersionString</key>
  <string>@FRAMEWORK_VERSION@</string>

此模板檔案將用於生成每個 framework 的 `Info.plist` 檔案。

## 2. 修改 Macros.cmake 中的 `gl_set_framework` macro
在 `Macros.cmake` 檔案中，補強 `gl_set_framework` macro 的實現:

function(gl_set_framework target public_headers)
    set(FRAMEWORK_VERSION "1.0.0")

    set_target_properties(${target} PROPERTIES
        FRAMEWORK_VERSION ${FRAMEWORK_VERSION}
        MACOSX_FRAMEWORK_IDENTIFIER "com.genesyslogic.${target}"
        PUBLIC_HEADER "${public_headers}"

    set(INFO_PLIST "${CMAKE_CURRENT_BINARY_DIR}/${target}_Info.plist")
        ${CMAKE_SOURCE_DIR}/Info.plist.in

    set_target_properties(${target} PROPERTIES
        RESOURCE "${INFO_PLIST}"

這樣每個 framework target 都會套用對應版本的 `Info.plist`。

## 3. 不用額外在每個 target 加版本設定

    gl_set_framework(${OCI_DLL_HUB_L1} "${PUBLIC_HEADERS}")

[未有直接 Source 錨點，待確認] 不需要在每個 target 中額外設定版本資訊。

完成上述設定後，執行 build 操作，你應該會在輸出的 `.framework` 中看到:

- 帶有版本的 `Info.plist`
- 在 Finder 中按右鍵 → 「顯示套件內容」，進入 `Resources/Info.plist` 查看版本資訊
- 或使用 CLI 指令 `defaults read ./build/libOCI_DLL_HUB_L1.framework/Resources/Info.plist CFBundleVersion` 查看版本資訊

此時，你目前的 `.framework` 已經有設定版本（如 `1.3.0.0`）。建議在編譯時補上版本資訊，讓 `compatibility version` 和 `current version` 顯示正確，例如:

add_library(GlOciDll_Hub_L2 SHARED 
    src/GlOciDll_Hub_L2.cpp

target_include_directories(GlOciDll_Hub_L2 PUBLIC 
    ${PROJECT_SOURCE_DIR}/include

set_target_properties(GlOciDll_Hub_L2 PROPERTIES
    FRAMEWORK_VERSION 1.3.0.0
    MACOSX_FRAMEWORK_IDENTIFIER com.genesyslogic.GlOciDll_Hub_L2
    PUBLIC_HEADER "${PROJECT_SOURCE_DIR}/include/GlOciDll_Hub_L2.h"
    XCODE_ATTRIBUTE_CODE_SIGN_IDENTITY "-"
    XCODE_ATTRIBUTE_SKIP_INSTALL "NO"
    XCODE_ATTRIBUTE_INSTALL_PATH "@rpath"

[未有直接 Source 錨點，待確認] 這樣可以確保 `.framework` 的版本資訊正確顯示。