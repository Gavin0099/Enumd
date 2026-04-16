# Mac UI 客制化修改 (以 HostBridge 為例)

本專案的 Git 位置位於 `http://crd-sw.genesyslogic.com.tw:8081/CRD/SW/USBHub/HostBridge/Mac/Standard`。


1. 複製專案並包含子模組: `git clone --recursive "http://crd-sw.genesyslogic.com.tw:8081/CRD/SW/USBHub/HostBridge/Mac/Standard"`
2. 建立新分支: `git branch wip/GavinWu/ModifyTheMacCmakeEnvironment`
3. 切換到 master 分支: `git switch master`
4. 檢查目前狀態: `git status`
5. 還原到上一個 commit: `git reset --hard`
6. 清除未追蹤的檔案: `git clean -d -xf`
7. 新增所有變更: `git add .`
8. 提交變更: `git commit -m "add PKG Targus setting file"`
9. 推送變更: `git push`
10. 新增子模組: `git submodule add "http://gli-gitlab.genesyslogic.com.tw:8081/CRD/SW/USBHub/HostBridge/Mac/SRC.git" APP`

## 新增 Targets 流程
1. 新增 APP Target
2. 在 Project List 中會產生對應的資料夾 (以 Test 為例)
3. 由於 HostBridge 並沒有 MainMenu UI，所以要把 MainMenu.xib 刪除
4. 由於主要的程式碼都在 HostBridge Target 裡面，為了因應不同客戶要修改不同的 UI，所以把 HostBridge 裡面的 AppDelegate 原始碼複製一份到 Test 裡面的 AppDelegate
5. General、Signing & Capabilities、Info 和 Build Phases 都要按照 HostBridge 的設定

## Mac Xcode 自動建置
1. 修改 `build.sh` 檔案

## GitHub CI/CD 作法
1. 修改 `_gitlab-ci.yml` 檔案
3. 在 GitHub 專案的 Setting > CI/CD > General pipelines 中，將 `_gitlab-ci.yml` 檔案放在專案最上層資料夾，GitHub 就會自動進行建置

[HostBridge](http://crd-sw.genesyslogic.com.tw:8081/CRD/SW/USBHub/HostBridge/Mac/Standard)

[HID Code Sign 記錄](http://crd-sw.genesyslogic.com.tw:8081/CRD/SW/USBHub/HostBridge/Mac/Standard/hid-code-sign-記錄.html)

[HP OCI APP](http://crd-sw.genesyslogic.com.tw:8081/CRD/SW/USBHub/HostBridge/Mac/Standard/hp-oci-app.html)

[HP OCI DLL](http://crd-sw.genesyslogic.com.tw:8081/CRD/SW/USBHub/HostBridge/Mac/Standard/hp-oci-dll.html)