---
title: "\U0001F6E0️ HP Firmware Installer (macOS) 完整修復與發布手冊"
domain_tags:
  - code-sign
  - mac
  - firmware
  - tools
  - security
task_tags:
  - install
  - debug
  - code-sign
  - build
  - release
  - config
authority_level: reference
is_deprecated: false
category: code-sign
notion_id: 2ed64f6b-c656-80c2-949c-e0583a5067f6
notion_url: >-
  https://www.notion.so/HP-Firmware-Installer-macOS-2ed64f6bc65680c2949ce0583a5067f6
notion_updated_at: '2026-01-22T01:53:00.000Z'
exported_at: '2026-04-06T13:13:10.270Z'
is_summarized: false
relations: []
---

目標：
1. 讓 App 能合法存取 USB 裝置 (IOKit)。
1. 消除不必要的「完全取用磁碟 (Full Disk Access)」警示。
1. 產出可通過 macOS Gatekeeper 檢查的合法安裝包 (.pkg)。
---
## 階段一：Xcode 專案設定 (解決 USB 權限)
問題： 程式無法送出 USB Vendor Command，被 macOS Hardened Runtime 攔截。
解法： 新增 Entitlements 宣告。
1. 新增/編輯 .entitlements 檔案：
1. 確認 Build Settings：
1. 驗證方式 (Terminal)：
```javascript
codesign -d --entitlements :- /path/to/your/hp_oci_tool
# 必須看到 <key>com.apple.security.device.usb</key><true/>
```
---
## 階段二：程式碼修正 (解決 FDA 警示)
問題： 程式啟動時跳出「PackageTool 想要存取 Safari...」的 FDA 警示視窗。
原因： 程式碼中包含 MPFullDiskAccessAuthorizer 類別，它透過「故意讀取 Safari 書籤」來測試是否有權限。
解法： 移除此檢查邏輯（因為階段一已解決 USB 問題，不再需要 FDA）。
1. 搜尋程式碼：
1. 註解/移除：在 AppDelegate.m (或啟動點) 中，將呼叫權限檢查的程式碼註解掉：
```javascript
// [MPFullDiskAccessAuthorizer requestFullDiskAccess];  <-- 註解掉這一行
```
1. 效果：
---
## 階段三：打包與發布 (PKG 簽章與公證)
問題： 安裝包 (.pkg) 若無正確簽章，使用者雙擊會被阻擋（顯示「無法打開」）。
解法： 使用 Developer ID Installer 憑證簽署並公證。
### 1. 簽署 PKG (Signing)
⚠️ 注意： 必須使用 "Installer" 類型的憑證，不能用 Application 憑證。
```javascript
# 語法：productsign --sign "憑證名稱" "原始檔" "簽名後檔"
productsign --sign "Developer ID Installer: Genesys Logic, INC. (Y995R99UYP)" ./HP_727pm_FirmwareInstaller.pkg ./HP_727pm_FirmwareInstaller_Signed.pkg
```
### 2. 準備公證設定檔 (只需做一次)
為了避免每次都要輸入密碼，先建立設定檔 (Profile)。
(需先至 Apple ID 網站產生一組「應用程式專用密碼」)
Bash
xcrun notarytool store-credentials "HP_Installer_Profile" --apple-id "你的AppleID@email.com" --team-id "Y995R99UYP" --password "abcd-efgh-ijkl-mnop"
### 3. 上傳公證 (Notarization)
將簽好名的 PKG 送交 Apple 審查。
```javascript
xcrun notarytool submit ./HP_727pm_FirmwareInstaller_Signed.pkg --keychain-profile "HP_Installer_Profile" --wait
```
### 4. 蓋章 (Stapling)
公證通過後 (Accepted)，將票據釘選在檔案上，支援離線安裝。
```javascript
xcrun stapler staple ./HP_727pm_FirmwareInstaller_Signed.pkg
```
---
## ✅ 最終驗證清單 (Checklist)
在發布給客戶前，請執行以下檢查：
