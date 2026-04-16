
# HP Scheduled update flow

1. **Scaler Update Info**：透過 Scaler Bin Head 判斷，Scaler Head 參數如下:
   - Scaler flash offset 預設會放
   - Scaler update Info 詳細資訊如下
   - Pd update Info 詳細資訊如下

1. **I2cSlaveAddr** - Pd ISP I2C slave address
2. **PgWrTime** - Page write 最大時間，單位為 ms
[未有直接 Source 錨點，待確認] 3. **EraseType** - 支援的擦除類型
4. **EraseCmd** - 對應 EraseType 的擦除指令
5. **EraseTime** - 對應 EraseType 的最大擦除時間，單位為 ms
[未有直接 Source 錨點，待確認] 6. **ChipBlockCnt** - 用於設定晶片容量

1. **Update data** - 更新資料，只有在 Scaler 確認所有晶片都成功更新後，才會將此資料移動到特定位置以滿足排程更新的需求。
2. **Bank Info** - 通知 Hub，位於 0x42000 到 0x4203F 範圍內的資料屬於 Hub 的特定 Bank。

1. [Etoken System Code View](code-sign/etoken-system-code-view-.html)
   - 描述了 etoken_dongle_server 和 etoken_server 的安全審核結果，包括架構、原生安全性和測試完整性等方面的問題。
2. [eToken 安全簽章系統技術說明](code-sign/etoken-安全簽章系統技術說明.html)
   - 概述了 eToken 系統從原始二進位檔案到最終安全 sig.bin 和 rom 檔案的整個處理流程。
3. [HID Code Sign Update Rule](code-sign/hid-code-sign-update-rule.html)
   - 介紹了 HID 代碼簽名更新的協議、HP ISP 流程以及驗證方式。

## 核心主題與相關上下文的關係

eToken 系統負責將原始二進位檔案經過整合、簽名和封裝等步驟生成最終的安全 sig.bin 和 rom 檔案。這些檔案需要滿足 HID 代碼簽名更新的協議要求，包括驗證公鑰和簽名等。

因此，「HP Scheduled update flow」核心主題與 eToken 系統的簽名和封裝流程以及 HID 代碼簽名更新規則之間存在密切的關係，相互依賴和影響。