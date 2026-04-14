取消使用 stdafx.h include 方式


在現代 C++ 專案中，已不再需要使用 `stdafx.h` 作為預編譯標頭檔。取而代之的是在各個 `.h` 檔案中直接 `include` 所需的頭檔案。這樣可以避免底層程式碼過度依賴 `stdafx.h`，進而提高程式碼的模組化和可維護性。

為了避免在專案組建時出現 "unexpected end of file while looking for precompiled header. Did you forget to add '#include "stdafx.h"' to your source?" 的錯誤，需要進行以下設定變更:

1. 清除 Precompiled Header 設定 `[Properties > C++ > Precompiled Header > Clean]`
2. 調整 Preprocessor Definitions 和 Precompiled Headers 設定 `[Properties > C/C++ > Preprocessor]`
3. 調整 Additional Dependencies 和 Ignore Specific Default Libraries 設定 `[Properties > Linker > Input]`

經過這些設定變更後，專案就可以順利地在不使用 `stdafx.h` 的情況下進行組建。


### 取消使用 stdafx.h

目前底層程式碼已經不再需要 `stdafx.h` 這個預編譯標頭檔。取而代之的是在各個 `.h` 檔案中直接 `include` 所需的頭檔案。這樣可以避免底層程式碼過度依賴 `stdafx.h`，進而提高程式碼的模組化和可維護性。


在取消使用 `stdafx.h` 的情況下，可能會出現以下組建錯誤:

"unexpected end of file while looking for precompiled header. Did you forget to add '#include "stdafx.h"' to your source?"


1. 清除 Precompiled Header 設定 `[Properties > C++ > Precompiled Header > Clean]`
2. 調整 Preprocessor Definitions 和 Precompiled Headers 設定 `[Properties > C/C++ > Preprocessor]`
   - Debug 模式: `Preprocrss Definitions : %(PreprocessorDefinitions)`，`Precompiled Headers : 清空`
   - Release 模式: `Preprocrss Definitions : %(PreprocessorDefinitions)`，`Precompiled Headers : 清空`
3. 調整 Additional Dependencies 和 Ignore Specific Default Libraries 設定 `[Properties > Linker > Input]`
   - Debug 模式: `Additional Dependencies : Nafxcwd.lib;libcmtd.lib;%(AdditionalDependencies)`，`Ignore Specific Default Libaries: Nafxcwd.lib;libcmtd.lib`
   - Release 模式: `Additional Dependencies : Nafxcw.lib;libcmt.lib;%(AdditionalDependencies)`，`Ignore Specific Default Libaries:Nafxcw.lib;libcmt.lib;%(IgnoreSpecificDefaultLibraries)`

經過這些設定變更後，專案就可以順利地在不使用 `stdafx.h` 的情況下進行組建。


1. [取消使用stdafx.h include 方式](https://genesyslogic.com.tw/general/取消使用stdafxh-include-方式.html)
2. [HID Code Sign 記錄](https://genesyslogic.com.tw/code-sign/hid-code-sign-記錄.html)
3. [HP OCI APP](https://genesyslogic.com.tw/mac/hp-oci-app.html)
4. [HP OCI DLL](https://genesyslogic.com.tw/mac/hp-oci-dll.html)