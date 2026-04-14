# Camera 透過我們驗證 code sign

## 概述
根據提供的內容,Camera 的 code sign 驗證流程主要包含以下幾個步驟:

1. 產生 ECDSA 金鑰並簽署 ECDSA 金鑰 `[Code sign Flow](code-sign/code-sign-flow.html)`
2. 告知如何清除 Camera 的方式 - 當驗證失敗時需要清除 `[Code sign Flow](code-sign/code-sign-flow.html)`
3. 告知如何讀取 Camera 資料 - Hub 安全模型必須能讀取更新的資料才能計算雜湊值 `[Code sign Flow](code-sign/code-sign-flow.html)`
4. 提供完整的更新流程及相關文件,讓我們能夠控制整個更新過程 `[Code sign Flow](code-sign/code-sign-flow.html)`
5. Hub Code Sign 驗證流程中,驗證 code sign 應該由工具控制,韌體不需要做太多修改,但仍需要俊太確認 `[Code sign Flow](code-sign/code-sign-flow.html)`

## Code Sign 流程
Genesys Logic 目前使用 ECDSA nistp256 演算法進行 code sign:

1. 產生金鑰
2. 簽署韌體
   - 將資料轉換為雜湊檔案,然後使用 eToken 或 Smart Card 中的私鑰進行簽署
3. 韌體更新和驗證
   - 將簽署的韌體、簽章和公鑰傳送給安全模組
   - 安全模組使用公鑰解密簽章,並與韌體資料計算的雜湊值進行比對,以驗證韌體的合法性

## 驗證方式
根據 HID Code Sign 更新規則:

- 驗證方式僅存在於 GLbinTool 和韌體本身,ISP 工具只負責更新資料
- 不同型號的裝置不能互相燒錄
- 當 Flash 中沒有簽章時,需要在 ISP 時先使用廠商指令傳送
- 不能執行的程式碼不能留在裡面

## 更新流程
HID 更新流程如下:

1. ISP 指令:工具指定位址和長度,將整個檔案傳送下去,韌體需自行分析各資料位置
2. 驗證方式:驗證公鑰和簽章

## 其他注意事項
- 請 SE 確認各作業系統是否有自動喚醒裝置的問題
- 需要整理各 Chip 機制的差異,用表格列出
- FW UPD 已經是 open source,但 SW 目前無法 Build,無法測試
- 討論 ISP 工具在燒錄時,需要明確提示是使用 filter driver 還是 HID
- 檢查不同作業系統平台(Mac、Linux、Chromebook)的相容性

總之,Camera 的 code sign 驗證流程需要涵蓋產生金鑰、簽署韌體、驗證流程等關鍵步驟,並提供完整的更新文件,讓我們能夠控制整個更新過程。同時也需要關注一些實際操作中的細節問題,確保更新過程的順利進行。