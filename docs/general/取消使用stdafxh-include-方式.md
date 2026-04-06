---
title: 取消使用stdafx.h include 方式
domain_tags:
  - sdk
task_tags:
  - debug
  - build
  - release
  - spec
authority_level: source
is_deprecated: false
category: sdk
notion_id: a6ee4d9a-357c-4207-bc64-cf63ab2f3883
notion_url: 'https://www.notion.so/stdafx-h-include-a6ee4d9a357c4207bc64cf63ab2f3883'
notion_updated_at: '2022-12-13T08:38:00.000Z'
exported_at: '2026-04-06T13:13:19.481Z'
is_summarized: false
relations: []
---

取消使用stdafx.h include 方式
目前底層已經不在stdafx.h include 需要的 .h檔，而是改在各個 .h 裡面 include 需要的 .h檔
藉此避免底層的 Soruce code 依賴性太高
上層Project Build 可能會出現
"unexpected end of file while looking for precompiled header. Did you forget to add '#include "stdafx.h"' to your source?"
為了避免這個問題，需要修改下面地方
Properties-->C++-->Precompiled Header --> clean
Debug:
1.Properties --> C/C++-->Preprocessor --> Preprocrss Definitions : %(PreprocessorDefinitions)
2.Properties --> C/C++-->Preprocessor --> Precompiled Headers : 清空
3.Properties --> Linker --> Input --> Additional Dependencies : Nafxcwd.lib;libcmtd.lib;%(AdditionalDependencies)
4.Properties --> Linker --> Input --> Ignore Specific Default Libaries: Nafxcwd.lib;libcmtd.lib
Release:
1.Properties --> C/C++-->Preprocessor --> Preprocrss Definitions : %(PreprocessorDefinitions)
2.Properties --> C/C++-->Preprocessor --> Precompiled Headers : 清空
3.Properties --> Linker --> Input --> Additional Dependencies : Nafxcw.lib;libcmt.lib;%(AdditionalDependencies)
4.Properties --> Linker --> Input --> Ignore Specific Default Libaries:Nafxcw.lib;libcmt.lib;%(IgnoreSpecificDefaultLibraries)
