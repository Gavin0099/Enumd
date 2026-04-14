基於提供的內容邊界，我們可以合成以下關於「1226/1230 交接」的知識報告:

# 1226/1230 交接

## 核心主題
「1226/1230 交接」是一個涉及 Electron Tool、HP SSDLC & SBOM、HP Mandatory Firmware Update Strategy Expansion for Future Projects、HP_Display_Firmware_Update_Specification、Generic USB Filter Driver 和 One key updater tool for GL3590-OTY20 等相關技術的主題。

## 相關背景
根據提供的相關內容,我們可以了解到以下背景資訊:

1. **HID Code Sign Update Rule**:
   - 驗證方式只存在於 GLbinTool 和 FW 本身,ISP Tool 只負責更新資料。
   - 不同型號的裝置不能互相燒錄。
   - 當 Flash 內沒有簽章時,在 ISP 時需要先使用 Vendor Command 送入。
   - Vendor Command
   - 不能留下無法執行的程式碼。
   - **ISP Flow**:
     - 說明
     - HID Code Sign Bin Format
     - HID Code Sign Bin Format (GL9511)
     - **Version 2.0**:
       - ISP Command: Tool 會指定位址和長度,並將整個檔案送下去,FW 需自行分析各資料位置。
   - **驗證方式**:
     - 驗證 Public Key & Signature

2. **HID Code Sign 記錄**:
   - **Update Protocol**:
     - HID update flow
     - Vendor Command 第二碼
     - HID 預設只使用 2.0
   - **Tool & Test**:
     - 驗證
   - **執行中**:
     - Release Tool
     - 請 SE 確認各 OS 是否有自動喚醒裝置。
     - HID 驗證 USB LOGO 問題。
     - 整理 chip function list,用表格列出各 chip 機制的不同。
     - HID 速度問題。
     - FW UPD 已經是 open source 了,但 SW 目前 Build 不起來,無法測試。
   - **待討論**:
     - GL3590
     - Tool 在 chrome book 上應該可以直接執行、更新,SW 會再討論如何測試、驗證。
     - SW 需要討論 ISP tool 在燒錄時,需要明顯提示是使用 filter driver 還是 HID。
     - 檢查不同 OS 平台（ex：mac, linux, chrome book）。
   - **已驗證 & 解決**:
     - 2021/11/05 HID 會把重抓到的 device 當成不同個
     - 2021/11/05 OS 有時認不到裝置,裝置管理員上顯示驚嘆號
     - 2021/11/05 Scaler update 在 set report 時,會有 data 沒有傳下去的問題
     - 2021/11/05 Scaler update 在 write command 時速度慢
     - 2021/11/05 驗證資料時出錯（ISP_ERR_VERIFY_DEVICE）
     - 2021/11/05 程式閃退
     - 2021/11/08 驗證資料時出錯（ISP_ERR_SEND_COMMAND）
     - 2021/11/19 請 MTK 導入 Hardware CRC 的機制（被拒絕）。
     - Google 在 ISP 相關。
     - HP ISP Tool ( HID ) 預設只使用 2.0

3. **HP Hemi(Z34c) CPU3 Code Sign 驗證問題**:
   - 除了 GL3590 有 hw security module 之外,其他 hub chip 是沒有的,因為 HP 規定最低底線只能用 FW 做 code sign 驗證,所以討論過後先以 GL3525 為範本驗證,因為 GL3525 有三個 CPU,Hub 在 update 後,可以用其他 CPU 來驗證 code sign。
   - **目前遇到的問題**:
     - 原本 public key & signature 是用額外的 hex 檔案來做驗證,現在必須改成用 etoken sign 過的檔案來做驗證,這時 public key format 是不一樣的。
     - 在某些情況下計算 sha256 的 hash 值會斷線。
     - 如果送完 sha256 hash 正確後驗證 rsa2048 signature & public key 解密後的 hash 都會是 0x00,因為 pd fw 只有針對 u3 做 code sign 功能,u2 是沒有做 code sign 功能的,原本 tool 都預設跑 u2 驗證 code sign,所以才會發現這個現象。
     - 每次回傳的 rsa 2048 hash 值都不一樣。
     - update 的 bin 檔是正確的還是錯誤的,回傳值都是 PASS。
     - rsa2048 的 hash 跟其他 Tool 算出的 hash 不一致。
     - sha256 的 hash 跟 rsa2048 的 hash 不一致。
     - 每次驗證完 code sign 重新上電後,PD fw 都會不見,在驗證成功後會寫入最新版的 public key,當初預設寫在 0x16000 的位置,沒有考慮到要透過 PD fw 來驗證 code sign 的問題,還在討論 public key 要放在哪邊。
     - GL3525 每個 Target 都是 update 到固定 offset,所以跟原本的 chip(GL3523 , GL3590) update 方式不一樣,GLBin 產生 rom 檔的方式要修改。
   - **最後 update 時間**:
     - update fw 時間: 3sec
     - sha256 hash 計算時間: 25 sec
     - rsa2048 解密時間: 24 sec
   - **Rsa2048 解密時間減少緣故**:
     - 原本 GL3523 的 CPU 是 12.5MHz,所以 rsa2048 解密時間大概是 50 幾秒,因為 GL3525 CPU 是 25MHz,所以 rsa2048 解密時間變到 24 秒。
   - **需要注意步驟**:
     1. 必須用 U3 來跑 (UUUISP=1)
     2. Public key & Signature 要做 Reverse (code 裡面有實作)
     3. 計算 hash command length 必須要跟 hub 大小一致
     4. hash 值要改回原本的算法 (code 裡面有實作)
     5. public key format 要改成兩個 byte 合成一個 byte (code 裡面有實作)

## 關鍵關係
根據提供的內容,我們可以看出「1226/1230 交接」這個核心主題與以下技術之間存在著密切的關係:

1. **Electron Tool**: 可能用於開發或管理與「1226/1230 交接」相關的軟體工具。
2. **HP SSDLC & SBOM**: 可能涉及 HP 的軟體開發生命週期和軟體物料清單,與「1226/1230 交接」相關。
3. **HP Mandatory Firmware Update Strategy Expansion for Future Projects**: 可能與「1226/1230 交接」中的韌體更新策略有關。
4. **HP_Display_Firmware_Update_Specification**: 可能包含與「1226/1230 交接」中顯示器韌體更新相關的規範。
5. **Generic USB Filter Driver**: 可能用於管理「1226/1230 交接」中涉及的 USB 裝置。
6. **One key updater tool for GL3590-OTY20**: 可能是用於「1226/1230 交接」中 GL3590-OTY20 裝置韌體更新的工具。

此外,根據提供的相關內容,我們還可以看出「1226/1230 交接」與以下技術之間存在著密切關係:

1. **HID Code Sign Update Rule**: 涉及「1226/1230 交接」中韌體更新的驗證規則。
2. **HID Code Sign 記錄**: 記錄了「1226/1230 交接」中韌體更新的相關歷史和問題。
3. **HP Hemi(Z34c) CPU3 Code Sign 驗證問題**: 描述了「1226/1230 交接」中 HP Hemi(Z34c) CPU3 韌體更新驗證的問題。

總的來說,「1226/1230 交接」這個核心主題涉及多個相關的技術領域,包括軟體工具開發、韌體更新策略、USB 驅動程式,以及韌體更新驗證等。這些技術之間存在著密切的關係和相互依賴。