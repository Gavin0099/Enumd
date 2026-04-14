取消使用 stdafx.h include 方式

## 背景
目前底層已經不再需要使用 stdafx.h 來 include 所需的 .h 檔案。取而代之的是，各個 .h 檔案會自行 include 所需的 .h 檔案。這樣做可以避免底層 Source code 的依賴性過高。

## 問題
上層專案在 Build 時可能會出現以下錯誤:

```
"unexpected end of file while looking for precompiled header. Did you forget to add '#include "stdafx.h"' to your source?"
```

這是因為之前專案是依賴 stdafx.h 來預先編譯標頭檔的方式，現在取消了這個做法，就會出現這個問題。

## 解決方案
為了避免上述問題，需要修改以下地方:

### Debug 設定
1. 在 Properties > C/C++ > Preprocessor 中，將 Preprocrss Definitions 設為 `%(PreprocessorDefinitions)`
2. 在 Properties > C/C++ > Preprocessor 中，將 Precompiled Headers 清空
3. 在 Properties > Linker > Input 中，將 Additional Dependencies 設為 `Nafxcwd.lib;libcmtd.lib;%(AdditionalDependencies)`
4. 在 Properties > Linker > Input 中，將 Ignore Specific Default Libaries 設為 `Nafxcwd.lib;libcmtd.lib`

### Release 設定
1. 在 Properties > C/C++ > Preprocessor 中，將 Preprocrss Definitions 設為 `%(PreprocessorDefinitions)`
2. 在 Properties > C/C++ > Preprocessor 中，將 Precompiled Headers 清空
3. 在 Properties > Linker > Input 中，將 Additional Dependencies 設為 `Nafxcw.lib;libcmt.lib;%(AdditionalDependencies)`
4. 在 Properties > Linker > Input 中，將 Ignore Specific Default Libaries 設為 `Nafxcw.lib;libcmt.lib;%(IgnoreSpecificDefaultLibraries)`

## 結論
透過上述的設定調整，可以解決取消使用 stdafx.h include 方式後，上層專案在 Build 時出現的問題。這樣做可以避免底層 Source code 的依賴性過高，提高整體專案的可維護性。