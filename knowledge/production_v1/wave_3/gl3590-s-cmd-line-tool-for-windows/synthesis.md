
# GL3590-s cmd line tool for Windows

「GL3590-s cmd line tool for Windows」是一款用於在 Windows 作業系統上操作 GL3590-s 裝置的命令列工具。它提供了各種功能,如韌體更新、裝置驗證等。本文將詳細介紹這款工具的使用方式和相關注意事項。

「GL3590-s cmd line tool for Windows」可以從以下路徑下載:

- Windows: `Z:\SW_Release_New\Hub\Mac\[Big Air]CommandLineToolv1.3.0.0.zip`

1. 解壓縮下載的 ZIP 檔案,即可獲得 `[Big Air]CommandLineToolv1.3.0.0.exe` 可執行檔。
2. 將 GL3590-s 裝置連接至 Windows 電腦。
3. 在命令提示字元中,導航至 `[Big Air]CommandLineToolv1.3.0.0.exe` 所在的目錄,並執行該程式。
4. 根據需求,使用工具提供的各種命令行參數來操作 GL3590-s 裝置,如韌體更新、裝置驗證等。

在 `\\genesyslogic.com.tw\GenesysData\SW_Release_New\Hub\Linux\Dell_BigAir2` 路徑下,還提供了 Linux 版本的 GL3590-s 命令列工具。此外,在 `file:///\\genesyslogic.com.tw\GenesysData\SW_Release_New\Hub\HID\Tool` 路徑下,也有一些與 HID 相關的工具和測試程式。

- 在執行韌體更新或其他操作時,請確保 GL3590-s 裝置不會在更新過程中自動喚醒。這可能會導致問題發生。 [HID Code Sign 記錄](hid-code-sign-記錄.html)中有相關討論。
- 在不同的作業系統平台(如 macOS、Linux、Chromebook 等)上使用 GL3590-s 命令列工具時,可能會有一些差異和限制,需要進一步測試和驗證。
- 在使用 ISP 工具燒錄時,需要明確提示是使用 filter driver 還是 HID 驅動程式。[HID Code Sign 記錄](hid-code-sign-記錄.html)中有相關討論。
