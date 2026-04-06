---
title: Mac Framework
category: mac
notion_id: 1c364f6b-c656-80ba-b96f-fdf94236eec3
notion_url: 'https://www.notion.so/Mac-Framework-1c364f6bc65680bab96ffdf94236eec3'
notion_updated_at: '2026-01-21T09:36:00.000Z'
exported_at: '2026-04-06T11:27:43.415Z'
is_summarized: false
---

### ① 新增一份 Info.plist.in 模板（放在專案根目錄）
```xml

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleDevelopmentRegion</key>
  <string>en</string>
  <key>CFBundleExecutable</key>
  <string>@TARGET_NAME@</string>
  <key>CFBundleIdentifier</key>
  <string>com.genesyslogic.@TARGET_NAME@</string>
  <key>CFBundleVersion</key>
  <string>@FRAMEWORK_VERSION@</string>
  <key>CFBundleShortVersionString</key>
  <string>@FRAMEWORK_VERSION@</string>
</dict>
</plist>


```
---
### ② 修改 Macros.cmake 裡的 gl_set_framework macro
（你應該已經有這個 macro，只需要補強即可）
```plain text

function(gl_set_framework target public_headers)
    set(FRAMEWORK_VERSION "1.0.0")

    # 設定為 Framework
    set_target_properties(${target} PROPERTIES
        FRAMEWORK TRUE
        FRAMEWORK_VERSION ${FRAMEWORK_VERSION}
        MACOSX_FRAMEWORK_IDENTIFIER "com.genesyslogic.${target}"
        PUBLIC_HEADER "${public_headers}"
    )

    # 產生 Info.plist
    set(INFO_PLIST "${CMAKE_CURRENT_BINARY_DIR}/${target}_Info.plist")
    configure_file(
        ${CMAKE_SOURCE_DIR}/Info.plist.in
        ${INFO_PLIST}
        @ONLY
    )

    set_target_properties(${target} PROPERTIES
        RESOURCE "${INFO_PLIST}"
    )
endfunction()


```
🔁 這樣每個 framework target 都會套用對應版本的 Info.plist。
---
### ③ 不用額外在每個 target 加版本設定
像這段就可以保留現狀即可：
```plain text

if (XCODE)
    gl_set_framework(${OCI_DLL_HUB_L1} "${PUBLIC_HEADERS}")
endif()


```
---
## 🔍 最後確認
完成後 build 一次，你應該會在輸出的 .framework 裡面看到：
- 帶有版本的 Info.plist
- 在 Finder 中按右鍵 →「顯示套件內容」，進入 Resources/Info.plist 查看版本資訊
- 或用 CLI：
```shell

defaults read ./build/libOCI_DLL_HUB_L1.framework/Resources/Info.plist CFBundleVersion

```
- 你目前的 .framework 已經有設定版本（如 1.3.0.0）。
- 但建議在編譯的時候補上版本資訊，讓 compatibility version 和 current version 顯示正確，例如：
```c
add_library(GlOciDll_Hub_L2 SHARED 
    src/GlOciDll_Hub_L2.cpp
    # 其他來源檔
)

target_include_directories(GlOciDll_Hub_L2 PUBLIC 
    ${PROJECT_SOURCE_DIR}/include
)

set_target_properties(GlOciDll_Hub_L2 PROPERTIES
    FRAMEWORK TRUE
    FRAMEWORK_VERSION 1.3.0.0
    VERSION 1.3.0.0
    SOVERSION 1.0.0
    MACOSX_FRAMEWORK_IDENTIFIER com.genesyslogic.GlOciDll_Hub_L2
    PUBLIC_HEADER "${PROJECT_SOURCE_DIR}/include/GlOciDll_Hub_L2.h"
    XCODE_ATTRIBUTE_CODE_SIGN_IDENTITY "-"
    XCODE_ATTRIBUTE_SKIP_INSTALL "NO"
    XCODE_ATTRIBUTE_INSTALL_PATH "@rpath"
)

```
