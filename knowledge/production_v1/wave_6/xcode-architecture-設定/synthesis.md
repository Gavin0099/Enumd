以下是 Xcode Architecture 設定的綜合報告:

# Xcode Architecture 設定

## Debug 和 Release 下的設定

這個屬性主要用在 Debug 的時候。根據字面意思，就是說只編譯你當前連線裝置(活躍狀態)的處理器版本。這個屬性不需要修改，Xcode 的預設設定就是 Debug 為 `Yes`，Release 為 `No`。[Xcode Architecture 設定](xcode-architecture-設定.html)

- Debug 模式設定為 `Yes`，編譯的時候只編譯成當前連線裝置的處理器版本，會大大縮短編譯時間。
- Release 模式設定為 `No`，你要適配市面上大部分手機，如果 Release 你還設定成 `Yes`，那麼你生成的安裝包只能安裝在你當前連線裝置的編譯型別的手機上。當然，這也是你 Release 編譯所花的時間要大大超過 Debug 的原因。

## 要在 M1 上面 build 才能同時 support ARM64 & X64X86

## segmentation fault: 11 錯誤

針對 `segmentation fault: 11` 錯誤，可以嘗試將 `Apple Clang - Code Generation --> Optimization Level` 設定為 `None`。[Xcode Architecture 設定](xcode-architecture-設定.html)


此外，在 [HID Code Sign 記錄](hid-code-sign-記錄.html) 中也提到了一些與 Xcode 設定相關的內容，包括:

- HID update flow
- Vendor Command 第二碼

在 [HP OCI APP](hp-oci-app.html) 和 [HP OCI DLL](hp-oci-dll.html) 中也有一些與 Xcode 和 App 打包相關的內容,可以參考。
