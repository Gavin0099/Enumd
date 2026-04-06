---
title: HP End User Tool 封裝方式
domain_tags:
  - hub
  - monitor
  - tools
task_tags:
  - install
  - build
  - config
authority_level: source
is_deprecated: false
category: hub
notion_id: 504ff5cb-ffb5-4260-90fe-4726c3cfadb8
notion_url: 'https://www.notion.so/HP-End-User-Tool-504ff5cbffb5426090fe4726c3cfadb8'
notion_updated_at: '2020-12-04T07:32:00.000Z'
exported_at: '2026-04-06T13:19:08.233Z'
is_summarized: false
relations: []
---

現在封裝方式有兩種
### PackageForTheWeb400
  簡易版程式安裝檔製作工具，只有英文語系和簡易安裝設定
### InstallShiled
 支援多國語系且提供script作客製化設定
封裝方式如下
# ini 檔設定方式
### Ini parameter description
1.Model Name:
       Update Tool title, which can be set by this parameter, as shown in the red box below
2. USB20SupportPidVid & USB30SupportPidVid 
        Fill in this monitor PID VID for initial judgment, as shown in the red frame below.
        
3.Hub File Name
      Bin file name to be updated by Hub

4.Panel Type
      Scaler Panel Type, because each monitor will have several panels. In order to use the same
      installation package for the same monitor, you can fill in several panel types here.
5.BinFiles
      Scaler Bin File Name, corresponding to the different panels above, this can also be filled in 
       multiple    scaler firmware bin files, Tool will determine which bin file to use.
6.Mstar_Scaler
      Scaler chip setting, you need to fill in the corresponding chip Name Scaler to update normally.
# PackageForTheWeb400
- Install Wrap tooling InstallShield PackageForTheWeb v400
- Collect all update files in one folder
- Launch PackageForTheWeb4
- Follow the Wizard to setup self-extraction file step by step
