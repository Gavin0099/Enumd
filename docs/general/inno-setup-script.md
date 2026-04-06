---
title: Inno Setup Script
domain_tags:
  - tools
task_tags:
  - install
  - config
authority_level: source
is_deprecated: false
category: tools
notion_id: 1b364f6b-c656-8097-ab50-d6f8feae6f06
notion_url: 'https://www.notion.so/Inno-Setup-Script-1b364f6bc6568097ab50d6f8feae6f06'
notion_updated_at: '2026-01-21T09:36:00.000Z'
exported_at: '2026-04-06T13:18:24.507Z'
is_summarized: false
relations: []
---

```c#
#define MyAppName "P34WD-40_v0_0_0"
#define MyAppVersion "36"
#define MyAppPublisher "Lenovo Company, Inc."
#define MyAppURL "https://www.lenovo.com/"
#define MyAppExeName "LenovoISPTool.exe"

[Setup]
AppId={{BAF651BA-356A-4E3A-A531-38A0C345840C}}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={autopf}\{#MyAppName}
UninstallDisplayIcon={app}\{#MyAppExeName}
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible
; 靜默安裝設定
DisableWelcomePage=yes
DisableDirPage=yes
DisableProgramGroupPage=yes
DisableReadyPage=yes
DisableReadyMemo=yes
DisableFinishedPage=yes
AlwaysShowDirOnReadyPage=no
AlwaysShowComponentsList=no
DisableStartupPrompt=yes
ShowLanguageDialog=no
PrivilegesRequired=admin
SignTool=codesign

SetupIconFile=C:\Users\GavinWu\Desktop\Lenovo one key update\Lenovo_128.ico
OutputBaseFilename=P34WD-40_v0_0_0_38
SolidCompression=yes
SetupLogging=yes 
AppCopyright=© 2025 Lenovo. All rights reserved.

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Files]
Source: "C:\Users\GavinWu\Desktop\0306\App\LenovoISPTool.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\Users\GavinWu\Desktop\0306\App\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Code]
var
  ToolParams: string;

function HasSilentParameter: Boolean;
var
  I: Integer;
  Param: string;
begin
  Result := False;
  for I := 1 to ParamCount do
  begin
    Param := Uppercase(ParamStr(I));
    if (Param = '/VERYSILENT') or (Param = '/SILENT') then
    begin
      Result := True;
      Exit;
    end;
  end;
end;

procedure ParseToolParameters;
var
  I: Integer;
  Param: string;
  TimeValue: string;
begin
  ToolParams := '';
  I := 1;
  while I <= ParamCount do
  begin
    Param := Uppercase(ParamStr(I));
    if Param = '/T' then
    begin
      if I + 1 <= ParamCount then
      begin
        TimeValue := ParamStr(I + 1);
        if Length(TimeValue) > 0 then
          ToolParams := ToolParams + '/t ' + TimeValue + ' ';
        I := I + 1;
      end;
    end
    else if Param = '/S' then
      ToolParams := ToolParams + '/s '
    else if Param = '/UNPLUG' then
      ToolParams := ToolParams + '/unplug ';
    I := I + 1;
  end;
  ToolParams := Trim(ToolParams);
  Log('Parsed ToolParams: ' + ToolParams);
end;


function InitializeSetup(): Boolean;
var
  ExePath: string;
  Params: string;
  ResultCode: Integer;
begin
  ParseToolParameters;
  Log('Tool parameters parsed: ' + ToolParams);
  ExePath := '"' + ExpandConstant('{srcexe}') + '"';
  if not HasSilentParameter then
  begin
    Params := '/VERYSILENT /SUPPRESSMSGBOXES /NORESTART';
    if ToolParams <> '' then
      Params := Params + ' ' + ToolParams;
    Log('Attempting to restart with: ' + ExePath + ' ' + Params);
    if ShellExec('runas', ExePath, Params, '', SW_HIDE, ewWaitUntilTerminated, ResultCode) then
    begin
      Log('Restart successful with ResultCode: ' + IntToStr(ResultCode));
      Result := False;
    end
    else
    begin
      Log('Restart failed with ResultCode: ' + IntToStr(ResultCode));
      MsgBox('無法以靜默模式重新啟動安裝程式。錯誤碼: ' + IntToStr(ResultCode), mbError, MB_OK);
      Result := True;
    end;
  end
  else
  begin
    Log('Running with existing silent parameters');
    Result := True;
  end;
end;

procedure CurStepChanged(CurStep: TSetupStep);
var
  ResultCode: Integer;
  ToolExePath: string;
begin
  if CurStep = ssPostInstall then
  begin
    ToolExePath := ExpandConstant('{app}') + '\LenovoISPTool.exe';

    if not Exec(ToolExePath, ToolParams, ExpandConstant('{app}'), SW_SHOW, ewWaitUntilTerminated, ResultCode) then
    begin
      Log('Failed to execute LenovoISPTool.exe with parameters. Error code: ' + IntToStr(ResultCode));
      MsgBox('無法執行 LenovoISPTool.exe 帶參數。錯誤碼: ' + IntToStr(ResultCode), mbError, MB_OK);
    end
    else
    begin
      Log('LenovoISPTool.exe executed successfully with parameters. Exit code: ' + IntToStr(ResultCode));
    end;
  end;
end;

```
