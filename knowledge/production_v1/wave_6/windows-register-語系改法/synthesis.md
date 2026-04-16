以下是基於提供的內容所合成的 Windows register 語系改法的文件:

# Windows register 語系改法

[未有直接 Source 錨點，待確認] 本文件介紹如何透過修改 Windows 註冊表 (Registry) 來變更系統的語系設定。

1. 執行 `Win+R` 開啟 `Regedit` 註冊表編輯器。
2. 導航至 `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Nls\Language` 路徑。
[未有直接 Source 錨點，待確認] 3. 在此路徑下找到 `InstallLanguage` 項目，即可查看或修改系統的語系設定。

## Language List
Windows 註冊表中的 `Language` 子機碼包含了系統支援的語言列表。您可以在此處查看系統目前支援的語言。

- [`eToken System`](./etoken-system.html): 介紹 eToken 系統的相關技術細節。
- [`eToken 安全簽章系統技術說明`](./etoken-安全簽章系統技術說明.html): 詳細說明 eToken 簽章系統的工作流程。
- [`Generic USB Filter Driver`](./driver/-generic-usb-filter-driver-.html): 介紹通用 USB 過濾驅動程式的架構與功能。