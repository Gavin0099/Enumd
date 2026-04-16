以下是基於提供的內容所合成的 Windows 11 Core isolation 的技術文件:

# Windows 11 Core isolation

Windows 11 的 Core isolation 功能可以提高系統的安全性。此功能可以隔離應用程式的關鍵部分，防止惡意程式對系統核心的直接存取。

## 啟用 Core isolation
[未有直接 Source 錨點，待確認] 要啟用 Core isolation，請依照以下步驟操作:

1. 開始 -> 輸入 "Windows Security"
2. 進入 "Device security" -> "Core isolation details"
[未有直接 Source 錨點，待確認] 3. 將 "Core isolation" 設定為 "On"

## Core isolation 的運作原理 `[Code-Sign 技術規格文件 (整合版)](./code-sign/code-sign-技術規格文件-整合版.html)`
Windows 11 的 Core isolation 功能是建立在 Code-Sign 技術的基礎之上。具體來說:

[未有直接 Source 錨點，待確認] 1. 作業系統會在啟動時驗證核心組件的數字簽名 `[3.1. 概覽]`
[未有直接 Source 錨點，待確認] 2. 只有通過驗證的核心組件才能被載入和執行 `[3.2. 結構定義]`
[未有直接 Source 錨點，待確認] 3. 這樣可以防止未經授權的程式碼直接存取系統核心 `[3.3. 內部邏輯規則圖]`

## 升級與更新注意事項 `[FW 規劃與工具鏈流程]`
在規劃 Windows 11 的韌體升級時，需要特別注意以下幾點:

1. 空間規劃: 確保有足夠的儲存空間來放置數字簽名資訊 `[4.1. FW 規劃階段注意事項 (Checklist)]`
2. 升級模式: 需要支援安全的換鑰流程，以便未來升級公鑰 `[5.2. 建議的「更換公鑰」安全流程圖]`
3. 外部區塊風險: 需要防範未經授權的程式碼注入 `[4.1. FW 規劃階段注意事項 (Checklist)]`
4. 團隊溝通: 各部門需要就 Code-Sign 機制達成共識 `[4.1. FW 規劃階段注意事項 (Checklist)]`

## 未來發展方向 `[ISP 安全性擴展 (未來規劃)]`
隨著 Code-Sign 技術的進一步發展，Windows 11 的 Core isolation 功能也將不斷完善:

[未有直接 Source 錨點，待確認] 1. 公鑰的保護和更換將更加安全 `[5.1. 關鍵需求與注意事項]`
[未有直接 Source 錨點，待確認] 2. 驗證機制將更加嚴格，以防止任何未經授權的程式碼注入 `[5.1. 關鍵需求與注意事項]`
3. 整個 ISP 更新流程將更加可靠和可控 `[5.2. 建議的「更換公鑰」安全流程圖]`
