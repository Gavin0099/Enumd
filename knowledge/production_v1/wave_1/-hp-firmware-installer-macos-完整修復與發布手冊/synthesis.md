🛠️ HP Firmware Installer (macOS) 完整修復與發布手冊

## 目標
1. 讓 App 能合法存取 USB 裝置 (IOKit)。
2. 消除不必要的「完全取用磁碟 (Full Disk Access)」警示。
3. 產出可通過 macOS Gatekeeper 檢查的合法安裝包 (.pkg)。

## 階段一：Xcode 專案設定 (解決 USB 權限)
**問題:** 程式無法送出 USB Vendor Command，被 macOS Hardened Runtime 攔截。
**解法:** 新增 Entitlements 宣告。

1. 新增/編輯 .entitlements 檔案：
   - 在 Xcode 專案中新增或編輯 `.entitlements` 檔案。
   - 在檔案中加入 `<key>com.apple.security.device.usb</key><true/>` 宣告。

2. 確認 Build Settings：
   - 在 Xcode 專案的 Build Settings 中，確認 `Code Signing Entitlements` 有正確指向 `.entitlements` 檔案。

3. 驗證方式 (Terminal)：
   ```javascript
   codesign -d --entitlements :- /path/to/your/hp_oci_tool
   # 必須看到 <key>com.apple.security.device.usb</key><true/>
   ```

## 階段二：程式碼修正 (解決 FDA 警示)
**問題:** 程式啟動時跳出「PackageTool 想要存取 Safari...」的 FDA 警示視窗。
**原因:** 程式碼中包含 `MPFullDiskAccessAuthorizer` 類別，它透過「故意讀取 Safari 書籤」來測試是否有權限。
**解法:** 移除此檢查邏輯（因為階段一已解決 USB 問題，不再需要 FDA）。

1. 搜尋程式碼：
   - 在程式碼中搜尋 `MPFullDiskAccessAuthorizer` 類別的使用。

2. 註解/移除：
   - 在 `AppDelegate.m` (或啟動點) 中，將呼叫權限檢查的程式碼註解掉：
     ```javascript
     // [MPFullDiskAccessAuthorizer requestFullDiskAccess];  <-- 註解掉這一行
     ```

3. 效果：
   - 移除 FDA 檢查後，程式啟動時就不會再跳出 FDA 警示視窗。

## 階段三：打包與發布 (PKG 簽章與公證)
**問題:** 安裝包 (.pkg) 若無正確簽章，使用者雙擊會被阻擋（顯示「無法打開」）。
**解法:** 使用 Developer ID Installer 憑證簽署並公證。

### 1. 簽署 PKG (Signing)
⚠️ 注意： 必須使用 "Installer" 類型的憑證，不能用 Application 憑證。
```javascript
# 語法：productsign --sign "憑證名稱" "原始檔" "簽名後檔"
productsign --sign "Developer ID Installer: Genesys Logic, INC. (Y995R99UYP)" ./HP_727pm_FirmwareInstaller.pkg ./HP_727pm_FirmwareInstaller_Signed.pkg
```

### 2. 準備公證設定檔 (只需做一次)
為了避免每次都要輸入密碼，先建立設定檔 (Profile)。
(需先至 Apple ID 網站產生一組「應用程式專用密碼」)
```bash
xcrun notarytool store-credentials "HP_Installer_Profile" --apple-id "你的AppleID@email.com" --team-id "Y995R99UYP" --password "abcd-efgh-ijkl-mnop"
```

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

## ✅ 最終驗證清單 (Checklist)
在發布給客戶前，請執行以下檢查：

1. 確認 Xcode 專案已正確設定 USB 權限 Entitlements。 [`[Camera 透過我們驗證 code sign](./camera-透過我們驗證-code-sign.html)`]
2. 確認已移除程式碼中的 Full Disk Access 檢查邏輯。
3. 確認 PKG 檔案已使用 Developer ID Installer 憑證正確簽署。 [`[eToken 安全簽章系統技術說明](./etoken-安全簽章系統技術說明.html)`]
4. 確認 PKG 檔案已成功通過 Apple 公證。
5. 確認 PKG 檔案已完成 Stapling 蓋章。
6. 在不同 macOS 版本上測試安裝包的正常運行。 [`[HID Code Sign 記錄](./hid-code-sign-記錄.html)`]