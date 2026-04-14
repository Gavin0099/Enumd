🛠️ HP Firmware Installer (macOS) 完整修復與發布手冊

1. 讓 App 能合法存取 USB 裝置 (IOKit)。
3. 產出可通過 macOS Gatekeeper 檢查的合法安裝包 (.pkg)。

## 階段一：Xcode 專案設定 (解決 USB 權限)
**問題**：程式無法送出 USB Vendor Command，被 macOS Hardened Runtime 攔截。

1. 新增/編輯 .entitlements 檔案：
   - 在 Xcode 專案中新增或編輯 .entitlements 檔案，並加入 `<key>com.apple.security.device.usb</key><true/>` 宣告。[Xcode Project Settings](https://developer.apple.com/documentation/security/hardened_runtime)

2. 確認 Build Settings：
   - 在 Xcode 的 Build Settings 中，確認 `com.apple.security.device.usb` 權限已正確設定。[Xcode Build Settings](https://developer.apple.com/documentation/security/hardened_runtime)

   codesign -d --entitlements :- /path/to/your/hp_oci_tool
   # 必須看到 <key>com.apple.security.device.usb</key><true/>

## 階段二：程式碼修正 (解決 FDA 警示)
**問題**：程式啟動時跳出「PackageTool 想要存取 Safari...」的 FDA 警示視窗。
**解法**：移除此檢查邏輯（因為階段一已解決 USB 問題，不再需要 FDA）。



   - 移除 FDA 檢查後，程式啟動時將不再跳出警示視窗。

## 階段三：打包與發布 (PKG 簽章與公證)
**問題**：安裝包 (.pkg) 若無正確簽章，使用者雙擊會被阻擋（顯示「無法打開」）。
**解法**：使用 Developer ID Installer 憑證簽署並公證。

### 1. 簽署 PKG (Signing)
# 語法：productsign --sign "憑證名稱" "原始檔" "簽名後檔"
productsign --sign "Developer ID Installer: Genesys Logic, INC. (Y995R99UYP)" ./HP_727pm_FirmwareInstaller.pkg ./HP_727pm_FirmwareInstaller_Signed.pkg

### 2. 準備公證設定檔 (只需做一次)
(需先至 Apple ID 網站產生一組「應用程式專用密碼」)
xcrun notarytool store-credentials "HP_Installer_Profile" --apple-id "你的AppleID@email.com" --team-id "Y995R99UYP" --password "abcd-efgh-ijkl-mnop"

### 3. 上傳公證 (Notarization)
xcrun notarytool submit ./HP_727pm_FirmwareInstaller_Signed.pkg --keychain-profile "HP_Installer_Profile" --wait

### 4. 蓋章 (Stapling)
xcrun stapler staple ./HP_727pm_FirmwareInstaller_Signed.pkg

## ✅ 最終驗證清單 (Checklist)

1. 確認 USB 權限已正確設定，可以透過 `codesign` 指令驗證。[Xcode Project Settings](https://developer.apple.com/documentation/security/hardened_runtime)
3. 確認 PKG 檔案已使用 Developer ID Installer 憑證正確簽署。[productsign](https://developer.apple.com/documentation/xcode/notarizing_your_app_before_distribution)
4. 確認 PKG 檔案已成功公證並蓋章。[xcrun notarytool](https://developer.apple.com/documentation/xcode/notarizing_your_app_before_distribution), [xcrun stapler](https://developer.apple.com/documentation/xcode/notarizing_your_app_before_distribution)

以上步驟確保 HP Firmware Installer (macOS) 能順利通過 macOS Gatekeeper 的檢查，並提供使用者安全可靠的安裝體驗。