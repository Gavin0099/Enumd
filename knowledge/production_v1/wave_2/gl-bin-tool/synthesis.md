以下是基於提供的內容所合成的 GL Bin Tool 文件:


GL Bin Tool 是一個用於處理 GL (Graphic Library) 韌體二進位檔案的工具。它主要用於以下功能:

1. 設定 Code-Sign 相關參數, 如簽章演算法類型 (RSA/ECDSA)。
[未有直接 Source 錨點，待確認] 2. 計算並更新韌體二進位檔案的校驗和 (Checksum)。
3. 嵌入公鑰 (Public Key) 資訊至韌體二進位檔案。
[未有直接 Source 錨點，待確認] 4. 計算並附加簽章 (Signature) 資訊至韌體二進位檔案。

GL Bin Tool 的核心功能包括:

1. **Code-Sign 參數設定**:
   - 支援 RSA 和 ECDSA 兩種簽章演算法。
   - 透過 `CodeSignType` 枚舉類型設定簽章演算法。

[未有直接 Source 錨點，待確認] 2. **Checksum 計算與更新**:
   - 使用 `CalCheckSum` 函數計算並更新整個二進位檔案的校驗和 (Checksum-16)。

   - 根據 `GL Code-Sign Info` 中的設定, 將公鑰 (Public Key) 嵌入至韌體二進位檔案的指定位置。

   - 計算整個二進位檔案的 Hash 值, 並使用私鑰進行簽章 (Signature)。
- [未有直接 Source 錨點，待確認] 將 Hash 值和簽章資訊附加至韌體二進位檔案的末尾。

## 3. GL Code-Sign Info
GL Bin Tool 依賴 `GL Code-Sign Info` 中的設定來確定公鑰和簽章資訊的存放位置。這個 6 Byte 的設定區塊包含以下資訊:

- **公鑰位置資訊 (0xF4-0xF6)**: 定義公鑰 (Public Key) 的儲存位置。
- **驗證資訊位置 (0xF7-0xF9)**: 定義簽章資訊 (Hash + Signature) 的儲存位置。

`GL Code-Sign Info` 中的 Bit 6 用於控制公鑰位置的定位模式:

- 當 Bit 6 為 0 時, 公鑰位置會跟隨韌體 (FW) 的起始位置。
- 當 Bit 6 為 1 時, 公鑰位置會根據 Bit 0-5 中指定的 Flash Block 編號來定位。

GL Bin Tool 在韌體升級流程中扮演著關鍵角色。根據不同的 `HP_Propertary` 字串, 它會採取不同的處理方式:

1. **Case 1: HP_Propertary = '5'**
   - 所有 Code-Sign 相關資訊 (Public Key, Hash, Signature) 都被視為外部資料, 由 eToken 產生後附加在原始韌體二進位檔案之後。
   - GL Code-Sign Info 在此模式下完全無效。

2. **Case 2: HP_Propertary = 'A'**
   - Public Key 被嵌入到韌體二進位檔案的內部, 這會破壞原始的 Checksum-16。
   - eToken 必須重新計算並覆蓋 Checksum-16。
   - Hash 和 Signature 依然作為外部資料附加。

3. **Case 3: HP_Propertary = 'B'**
   - 所有 Code-Sign 資訊 (Public Key, Hash, Signature) 都會根據 GL Code-Sign Info 的指示嵌入到韌體二進位檔案內部。

為確保 ISP 流程的安全性, 特別是在引入「更換公鑰 (Public Key)」功能時, 各團隊需遵守以下規則:

1. **Public Key 的保護**: 確保公鑰資訊的安全性和完整性。
[未有直接 Source 錨點，待確認] 2. **更換公鑰的獨立流程**: 建立一個安全的公鑰更換流程, 與標準韌體更新流程分開。
3. **合法性驗證機制的強化**: 在 ISP 流程中加強對設備和操作者的合法性驗證。

## 6. GL7524 Code-Sign Update 流程
GL Bin Tool 與 ISP Tool 和 FW Ram Code 之間有以下的運行時互動:

1. **Public Key 檢查與更新**:
   - 檢查 Flash 中是否已有公鑰, 如果沒有則寫入更新檔的公鑰。
   - 比對 Flash 中的公鑰是否與更新檔一致。

   - 啟用 SHA256 引擎, 讀取更新區域的資料並計算 Hash 值。
   - 將 Hash 值回報給 FW, 由 FW 進行比對驗證。

3. **Signature 驗證**:
- [未有直接 Source 錨點，待確認] 提供公鑰位置資訊給 Tool。
   - 將簽章資訊 (Signature) 傳送給 FW, 由 FW 進行驗證。

## 7. GL7524 & MCU2 Bank Check Update 流程
此流程為高階應用, 不受底層 Code-Sign 機制變動影響。它主要包括以下步驟:

1. **詢問 FW**: 確認哪個 HUB 和 MCU2 的 Bank 是非運行狀態。
2. **更新 HUB**: 根據非運行的 HUB Bank 進行更新。
3. **更新 MCU2**: 根據非運行的 MCU2 Bank 進行更新。

1. [GL7524 A02 Code-Sign 與 ISP 安全架構](https://example.com/code-sign/gl7524-code-sign-isp-security.html)
2. [eToken 安全簽章系統技術說明](https://example.com/code-sign/etoken-security-signing-system.html)
3. [HP Hemi(Z34c) CPU3 Code Sign 驗證問題](https://example.com/code-sign/hp-hemiz34c-cpu3-code-sign-issues.html)