---
title: HubDriverInstaller User Guide
category: driver
notion_id: 2a464f6b-c656-8007-929a-fc0525144185
notion_url: >-
  https://www.notion.so/HubDriverInstaller-User-Guide-2a464f6bc6568007929afc0525144185
notion_updated_at: '2026-01-21T09:38:00.000Z'
exported_at: '2026-04-06T11:27:53.924Z'
is_summarized: false
---

## Overview
HubDriverInstaller.exe is a command-line tool designed for installing and uninstalling device filter drivers. It features automatic detection for legacy or broken drivers, ensuring a clean and stable installation process.
---
## ⚙️Basic Usage
Execute the following syntax in the Command Prompt (cmd):
```c#
HubDriverInstaller.exe [command]
```
---
## 📋 Commands
---
## 💻 Examples
### 1. Uninstall Driver
Run the -u command to remove the current driver.
Command Input:
```c#
HubDriverInstaller.exe -u
```
Terminal Output Example:
```c#
GL Driver:2.4.0.0
Uninstalling device filter driver, please wait...
...............Uninstall driver done!
```
### 2. Install Driver
Run the -i command to install the new driver.
Command Input:
```c#
HubDriverInstaller.exe -i
```
Terminal Output Example:
```c#
Installing device filter driver, please wait...
.................
GL Driver:2.4.0.0
Install driver done!
```
