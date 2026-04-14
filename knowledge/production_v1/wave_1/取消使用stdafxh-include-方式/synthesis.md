取消使用 stdafx.h include 方式

## 背景

目前底層程式碼已經不再需要使用 `stdafx.h` 來 include 所需的頭文件 (`.h` 檔)。取而代之的是，各個 `.h` 檔案都會直接 include 所需的其他 `.h` 檔案。這樣做可以避免底層程式碼的相依性過高。

然而，這可能會導致上層專案在 Build 時出現以下錯誤:

```
"unexpected end of file while looking for precompiled header. Did you forget to add '#include "stdafx.h"' to your source?"
```

為了解決這個問題，需要進行以下修改:

## 修改步驟

### Debug 組態

1. 在 `Properties` > `C/C++` > `Preprocessor` 中，將 `Preprocrss Definitions` 設為 `%(PreprocessorDefinitions)`。
2. 在 `Properties` > `C/C++` > `Preprocessor` 中，將 `Precompiled Headers` 清空。
3. 在 `Properties` > `Linker` > `Input` 中，將 `Additional Dependencies` 設為 `Nafxcwd.lib;libcmtd.lib;%(AdditionalDependencies)`。
4. 在 `Properties` > `Linker` > `Input` 中，將 `Ignore Specific Default Libaries` 設為 `Nafxcwd.lib;libcmtd.lib`。

### Release 組態

1. 在 `Properties` > `C/C++` > `Preprocessor` 中，將 `Preprocrss Definitions` 設為 `%(PreprocessorDefinitions)`。
2. 在 `Properties` > `C/C++` > `Preprocessor` 中，將 `Precompiled Headers` 清空。
3. 在 `Properties` > `Linker` > `Input` 中，將 `Additional Dependencies` 設為 `Nafxcw.lib;libcmt.lib;%(AdditionalDependencies)`。
4. 在 `Properties` > `Linker` > `Input` 中，將 `Ignore Specific Default Libaries` 設為 `Nafxcw.lib;libcmt.lib;%(IgnoreSpecificDefaultLibraries)`。

## 相關內容

在 HID Code Sign 記錄 `[HID Code Sign 記錄](./hid-code-sign-記錄.html)` 中提到了一些與 HID 相關的更新流程、工具和測試等內容。

在 HP OCI APP `[HP OCI APP](./hp-oci-app.html)` 中介紹了 HP 提供的 OCI SDK 的使用方式和相關注意事項。

在 HP OCI DLL `[HP OCI DLL](./hp-oci-dll.html)` 中介紹了 HP 定義的 DLL 格式以及相關的 SDK 文件。

## 結論

為了解決在取消使用 `stdafx.h` 後出現的編譯錯誤，需要修改專案屬性中的一些設定。這些修改主要集中在 Preprocessor 和 Linker 的設定上。同時也需要注意相關的上下文內容，以確保修改後的程式碼能正常運行。