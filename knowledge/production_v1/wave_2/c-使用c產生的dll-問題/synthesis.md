報告書：C# 使用 C 產生的 DLL 問題

在 C# 中使用 C 語言編譯的 DLL 時，可能會遇到 `PInvokeStackImbalance` 的錯誤。這是由於 C# 和 C 語言使用不同的呼叫慣例（calling convention）導致的。

   - C/C++ 的標準呼叫慣例是 `cdecl`，這是 Visual Studio 編譯 C++ 的預設值。
   - Win32 API 的標準呼叫慣例是 `stdcall`，這也是 C# 的 `DllImport` 在 x86 平台上的預設值。

- [未有直接 Source 錨點，待確認] 在 .NET 4.0 之前，即使沒有指定 `cdecl`，CLR 也會自動修正錯誤，但會造成效能損失。

1. 在 C# 中使用 `[DllImport("Win32Project1.dll", CallingConvention=CallingConvention.Cdecl)]` 指定 `cdecl` 呼叫慣例。
2. 在 C/C++ 中將函式宣告改為 `extern "C" __declspec(dllexport) int __stdcall Add(int a, int b)`，使用 `__stdcall` 呼叫慣例。
3. 在 .NET 4.0 及之後的版本中，可以在 config 檔案中加入 `<NetFx40_PInvokeStackResilience enabled="1"/>` 來啟用自動修正功能。

1. [MSDN 文件：PInvoke 函式呼叫慣例](https://msdn.microsoft.com/zh-tw/library/ff361650.aspx#Anchor_1)
2. [Etoken System Code View](code-sign/etoken-system-code-view-.html)
3. [HID Code Sign 記錄](code-sign/hid-code-sign-記錄.html)
4. [HP Hemi(Z34c) CPU3 Code Sign 驗證問題](code-sign/hp-hemiz34c-cpu3-code-sign-驗證問題.html)

使用 C 語言編譯的 DLL 在 C# 中呼叫時，需要注意呼叫慣例的差異。透過指定正確的呼叫慣例或啟用自動修正功能，可以解決 `PInvokeStackImbalance` 的錯誤。開發人員應該了解這些差異並採取適當的措施，以確保 C# 應用程式能夠正確地使用 C 語言編譯的 DLL。