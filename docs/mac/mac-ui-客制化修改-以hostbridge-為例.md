---
title: Mac UI 客制化修改 (以HostBridge 為例)
category: mac
notion_id: 7fef7d47-99e9-4398-a9ca-788a0a9be320
notion_url: 'https://www.notion.so/Mac-UI-HostBridge-7fef7d4799e94398a9ca788a0a9be320'
notion_updated_at: '2026-01-21T09:31:00.000Z'
exported_at: '2026-04-06T11:20:24.932Z'
is_summarized: false
---

### Git 位置 (http://crd-sw.genesyslogic.com.tw:8081/CRD/SW/USBHub/HostBridge/Mac/Standard)
### Git Command 
- git clone --recursive "http://crd-sw.genesyslogic.com.tw:8081/CRD/SW/USBHub/HostBridge/Mac/Standard"
- git branch wip/GavinWu/ModifyTheMacCmakeEnvironment
- git switch master 
- git status
- git reset --hard
- git clean -d -xf
- git add . 
- git commit -m "add PKG Targus setting file”
- git push
- git submodule add "http://gli-gitlab.genesyslogic.com.tw:8081/CRD/SW/USBHub/HostBridge/Mac/SRC.git" APP
### 新增Targets 流程
1. 新增APP
1. 在Project List 會產生對應folder(以Test為例)
1. 因為Host Bridge 並沒有MainMenu UI ，所以要把MainMenu.xib 刪除
1. 因為主要的code 都在Host Bridge Targets 裡面，為了因應不同客戶要修改不一樣的UI ，所以把HostBridge 裡面的AppDelegate source code 複製一份到 Test 裡面的 AppDelegate 
1. General , Signing  & Capabilities , Info ,  Build Phases 都要按照Host Bridge的設定  
## Mac Xcode Auto build 
1. 修改 build.sh
1. sample code 
1. build command 
## GitHub CI / CD 作法
1. 修改_gitlab-ci.yml
1. sample code 
1. GitHub—> Project —> Setting —>CI/CD —> General pipelines
1. 把 _gitlab-ci.yml 放在Project 最上層folder ，GitHub 就會Auto build 
