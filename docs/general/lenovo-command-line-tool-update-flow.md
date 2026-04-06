---
title: Lenovo command Line tool update flow
category: general
notion_id: 10d64f6b-c656-8019-a2b0-ef5990ce130a
notion_url: >-
  https://www.notion.so/Lenovo-command-Line-tool-update-flow-10d64f6bc6568019a2b0ef5990ce130a
notion_updated_at: FORCE_REFRESH
exported_at: '2026-04-06T11:27:39.777Z'
is_summarized: false
---

1. The tool has to run in the PowerShell, and open it with administrator privileges.To run as Administrator, please right-click “PowerShell” and click “Run as administrator”.
1. "Enter cd C:\Users\GavinWu\Desktop\0924\Commandline_TPV9700_0926 to navigate to the directory where the tool will be executed. Please adjust the path according to your own tool's location."
1. "Execute the command Set-ExecutionPolicy Unrestricted -Scope Process in PowerShell and automatically select option 'A' (Yes to All)." This version clarifies the action and specifies that option 'A' corresponds to "Yes to All."
1. "Execute .\FwUpdate1.ps1 -S 20:00 , and the updating process will be displayed in the console."
