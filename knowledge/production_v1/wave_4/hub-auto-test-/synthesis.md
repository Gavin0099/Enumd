
每次將程式碼推送到 Git 時,我們需要確保程式碼不會影響 ISP 流程,導致更新失敗。由於目前 CLI 工具已部署在 Mars 上,我們可以利用 Mars 測試階段來測試 Hub ISP 功能是否正常。在每個分支推送或合併請求時,自動執行測試。

- OS @Standy Huang
- 測試晶片 @GL_Gavin Wu
- Mars 測試輸入和輸出介面 @Adam.Chen @Vic Chen


- 同時有多人推送程式碼,Gitlab 排程是否會有問題 @standy Huang
- 在測試機上測試尚未成功,ISP 和重置會失敗,找不到裝置,但初始時有找到裝置,在 Windows 下 @Vic Chen

- [未有直接 Source 錨點，待確認] 未來客戶的機型需要設定特定的 targetDevice
- Windows 平台建置會變得很慢,最長可能達到 1 小時

### [Camera 透過我們驗證 code sign](code-sign/camera-透過我們驗證-code-sign.html)
[未有直接 Source 錨點，待確認] 1. 產生 ECDSA 金鑰並簽署 ECDSA 金鑰
1. 告知如何清除 Camera 的方式 - 驗證失敗需要清除
1. 告知如何讀取 Camera 資料 - Hub 安全模型必須能讀取更新的資料才能計算雜湊值
1. 下圖為 Hub 程式碼簽署驗證流程,驗證程式碼簽署應該由工具控制,韌體不需要做太多改變,但仍需要俊太確認

### [Code sign Flow](code-sign/code-sign-flow.html)

[未有直接 Source 錨點，待確認] 1. OpenSSL - 將產生的金鑰對放在電腦上,交付已簽署的韌體也在電腦上完成。
1. HSM (Hardware Security Module) - 硬體安全模組是一種物理計算裝置,用於保護和管理數位金鑰,執行數位簽章、強身份驗證和其他密碼功能。根據 HP 規定,需要符合 FIPS 140-2 Level 3 或以上,因此至少需要使用 Token 來實現程式碼簽署功能。

目前 Genesys Logic 使用的程式碼簽署演算法為 ECDSA nistp256。

### [Etoken System Code View](code-sign/etoken-system-code-view-.html)
#### etoken_dongle_server

- 架構: 不合格。連線工作流程使用 detach 且無生命週期收斂,違反可預測關閉原則。
- 測試完整性: 不合格。看不到針對失敗路徑(超大輸入、shutdown race、協定錯位)的測試證據。

[未有直接 Source 錨點，待確認] 1. [阻塞] 分離的工作執行緒可能會比擁有者(this)存活更久
[未有直接 Source 錨點，待確認] 1. [警告] 使用外部衍生參數的 system() 執行路徑
[未有直接 Source 錨點，待確認] 1. [警告] select() 中的超時轉換錯誤
1. [建議] 源碼中硬編碼的 Token 密碼

- 檢查了 03_knowledge_base.md 中的 4 個反模式/陷阱。
- 結果: 發現衝突(特別是 system()/子進程掛起和協定失配/卡住風險已命中)。

#### etoken_server

- 架構: 發行組態已移除 OFFLINE_TEST,這是改善;但連線工作執行緒仍採 detach,生命週期不可控,違反可預測性。
- [未有直接 Source 錨點，待確認] 本機安全性: 未發現新的指標釋放錯誤;但外部命令執行和檔案大小處理缺乏邊界,仍有高風險。
- 測試完整性: 看不到對失敗路徑(超大檔案大小、執行緒關閉競爭、SQL 注入字串)的測試鎖定證據。

1. [阻塞] SQL 注入風險(登入授權查詢)
1. [警告] detach 執行緒捕獲 this,存在關閉競爭/使用後釋放風險
1. [警告] Dongle 管理同樣使用 detach,生命週期不可驗證
1. [警告] 檔案大小由對端提供且未設上限,可能 OOM/卡死
1. [警告] 對 Dongle 端取檔同樣無大小上限
1. [警告] DB 密碼硬編碼在程式碼

- 檢查了 03_knowledge_base.md 中的 4 個反模式/陷阱(含 system()/子進程卡死、流程卡住類型)。