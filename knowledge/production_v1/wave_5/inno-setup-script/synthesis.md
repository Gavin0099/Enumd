
# Inno Setup Script 文件

[Inno Setup](https://jrsoftware.org/isinfo.php) 是一個免費的安裝程式建構工具,可用於建立 Windows 應用程式的安裝程式。Inno Setup 腳本是用於定義安裝程式行為的文字檔案,包含了安裝程式的各種設定和指令。

## 2. Inno Setup 腳本結構
Inno Setup 腳本由多個段落組成,每個段落都有特定的用途:

1. **[Setup]** 段落: 定義安裝程式的基本設定,如應用程式名稱、版本、發佈者等。
[未有直接 Source 錨點，待確認] 2. **[Languages]** 段落: 定義支援的語言。
[未有直接 Source 錨點，待確認] 3. **[Files]** 段落: 指定要複製到目標目錄的檔案。
[未有直接 Source 錨點，待確認] 4. **[Code]** 段落: 包含自訂的 Pascal 腳本,可用於執行特殊的安裝邏輯。

以下是一個簡單的 Inno Setup 腳本範例:

#define MyAppName "P34WD-40_v0_0_0"
#define MyAppVersion "36"
#define MyAppPublisher "Lenovo Company, Inc."
#define MyAppURL "https://www.lenovo.com/"
#define MyAppExeName "LenovoISPTool.exe"

AppId={{BAF651BA-356A-4E3A-A531-38A0C345840C}}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={autopf}\{#MyAppName}
UninstallDisplayIcon={app}\{#MyAppExeName}
[未有直接 Source 錨點，待確認] ArchitecturesAllowed=x64compatible
[未有直接 Source 錨點，待確認] ArchitecturesInstallIn64BitMode=x64compatible
[未有直接 Source 錨點，待確認] DisableWelcomePage=yes
[未有直接 Source 錨點，待確認] DisableDirPage=yes
[未有直接 Source 錨點，待確認] DisableProgramGroupPage=yes
[未有直接 Source 錨點，待確認] DisableReadyPage=yes
[未有直接 Source 錨點，待確認] DisableReadyMemo=yes
[未有直接 Source 錨點，待確認] DisableFinishedPage=yes
[未有直接 Source 錨點，待確認] AlwaysShowDirOnReadyPage=no
[未有直接 Source 錨點，待確認] AlwaysShowComponentsList=no
[未有直接 Source 錨點，待確認] DisableStartupPrompt=yes
[未有直接 Source 錨點，待確認] ShowLanguageDialog=no
[未有直接 Source 錨點，待確認] PrivilegesRequired=admin
[未有直接 Source 錨點，待確認] SignTool=codesign

Name: "english"; MessagesFile: "compiler:Default.isl"

Source: "C:\Users\GavinWu\Desktop\0306\App\LenovoISPTool.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\Users\GavinWu\Desktop\0306\App\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

  ToolParams: string;

function HasSilentParameter: Boolean;

1. **靜默安裝**: 通過設定 `DisableWelcomePage`、`DisableDirPage` 等參數,可以實現無人值守的靜默安裝。
[未有直接 Source 錨點，待確認] 2. **自訂安裝邏輯**: `[Code]` 段落中的 Pascal 腳本可以用於實現複雜的安裝流程,如在安裝完成後執行外部程式。
3. **簽章與安全性**: 通過設定 `SignTool` 參數,可以對安裝程式進行數位簽章,增強安全性。
4. **多語言支援**: 在 `[Languages]` 段落中定義支援的語言,Inno Setup 會根據使用者的系統語言自動切換。

## 5. 與 HP OCI APP 的關係
在 HP OCI APP 的文件中,有提到使用 Inno Setup 來建立安裝程式。具體來說,HP OCI APP 會透過 Inno Setup 腳本來:

[未有直接 Source 錨點，待確認] 1. 定義安裝程式的基本資訊,如應用程式名稱、版本、發佈者等。
2. 指定要安裝的檔案,包括 HP OCI APP 的可執行檔和相關資源。
3. 實現安裝過程中的特殊邏輯,如在安裝完成後執行 `LenovoISPTool.exe` 程式。

通過使用 Inno Setup,HP OCI APP 可以方便地建立可靠且安全的安裝程式,提升使用者體驗。