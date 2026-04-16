根據提供的內容，以下是對於 'Vendor OCI Error Code' 的文件合成報告:

# Vendor OCI Error Code 文件

'Vendor OCI Error Code' 是一個用於定義各種錯誤碼的列舉型別 `GL_ERROR_CODE`。這些錯誤碼涵蓋了常見的文件操作、管道操作、進程操作等錯誤，以及一些特定的韌體更新錯誤碼。

`GL_ERROR_CODE` 列舉型別包含以下錯誤碼:

   - `GL_NO_ERR`: 無錯誤
   - `GL_ERR_UNKNOWN`: 未知錯誤
   - `GL_ERR_INVALID_PARAM`: 無效參數
   - `GL_ERR_NOT_SUPPORT`: 不支援
   - `GL_ERR_FILE_NOT_EXIST`: 檔案不存在
   - `GL_ERR_OPEN_FILE`: 開啟檔案失敗
   - `GL_ERR_READ_FILE`: 讀取檔案失敗
   - `GL_ERR_WRITE_FILE`: 寫入檔案失敗
   - `GL_ERR_SEEK_FILE`: 檔案定位失敗
   - `GL_ERR_CLOSE_FILE`: 關閉檔案失敗
   - `GL_ERR_OPEN_PIPE`: 開啟管道失敗
   - `GL_ERR_READ_PIPE`: 讀取管道失敗
   - `GL_ERR_WRITE_PIPE`: 寫入管道失敗
   - `GL_ERR_CLOSE_PIPE`: 關閉管道失敗
   - `GL_ERR_CREATE_PROCESS`: 建立進程失敗
   - `GL_ERR_LAUNCH_PROCESS`: 啟動進程失敗
   - `GL_ERR_WAIT_PROCESS`: 等待進程失敗
   - `GL_ERR_TERMINATE_PROCESS`: 終止進程失敗
   - `GL_ERR_EXEC_FAILED`: 執行失敗
   - `GL_ERR_TIMEOUT`: 超時
   - `GL_ERR_RESET`: 重置失敗

   - `GL_ERR_FW_UPDATE_HUB`: 更新 Hub 韌體失敗
   - `GL_ERR_FW_UPDATE_BILLBOARD`: 更新 Billboard 韌體失敗
   - `GL_ERR_FW_UPDATE_PD`: 更新 PD 韌體失敗
   - `GL_ERR_FW_UPDATE_HOST_BRIDGE`: 更新 Host Bridge 韌體失敗
   - `GL_ERR_FW_UPDATE_SD_CARD`: 更新 SD 卡韌體失敗
   - `GL_ERR_FW_UPDATE_SIM_CARD`: 更新 SIM 卡韌體失敗
   - `GL_ERR_FW_UPDATE_SCALER`: 更新 Scaler 韌體失敗
   - `GL_ERR_FW_UPDATE_AUDIO`: 更新 Audio 韌體失敗
   - `GL_ERR_FW_UPDATE_CAMERA`: 更新 Camera 韌體失敗
   - `GL_ERR_FW_UPDATE_AMP`: 更新 Amp 韌體失敗

   - `DEV_NO_ERR`: 無錯誤
   - `DEV_ERR_NO_DEVICE`: 找不到設備
   - `DEV_ERR_NO_MATCH_DEVICE`: 找不到匹配的設備
   - `DEV_ERR_OPEN_DEVICE`: 開啟設備失敗
   - `DEV_ERR_QUERY_DEVICE`: 查詢設備失敗
   - `DEV_ERR_QUERY_INFO`: 查詢設備資訊失敗
   - `DEV_ERR_HUB_RETRIEVE_INFO`: 取得 Hub 資訊失敗
   - `DEV_ERR_HUB_QUERY_INFO`: 查詢 Hub 資訊失敗
   - `DEV_ERR_HUB_QUERY_VERSION`: 查詢 Hub 版本失敗
   - `DEV_ERR_HUB_INIT`: Hub 初始化失敗
   - `DEV_ERR_HUB_CHIP_ID_UNKNOWN`: Hub Chip ID 未知

   - `FW_NO_ERR`: 無錯誤
   - `FW_MSG_VERSION_EQUAL`: 韌體版本相同
   - `FW_MSG_VERSION_LESS`: 韌體版本較舊
   - `FW_MSG_VERSION_LARGER`: 韌體版本較新
   - `FW_ERR_INVALID_PARAM`: 無效參數
   - `FW_ERR_FILE_NOT_EXIST`: 韌體檔案不存在
   - `FW_ERR_FILE_NOT_MATCH`: 韌體檔案不匹配
   - `FW_ERR_NO_FILE_LOAD`: 未載入韌體檔案
   - `FW_ERR_FILE_SIZE`: 韌體檔案大小錯誤
   - `FW_ERR_FILE_FORMAT`: 韌體檔案格式錯誤
   - `FW_ERR_FILE_CHIP_ID`: 韌體檔案 Chip ID 錯誤
   - `FW_ERR_FILE_CHIP_MASK`: 韌體檔案 Chip Mask 錯誤
   - `FW_ERR_FILE_BONDING`: 韌體檔案 Bonding 錯誤
   - `FW_ERR_FILE_PORT_NUM`: 韌體檔案 Port 數量錯誤
   - `FW_ERR_FILE_PRODUCT_PROJECT`: 韌體檔案產品專案錯誤

   - `FW_ERR_CS_INVALID_PARAM`: 無效參數
   - `FW_ERR_CS_PUBLIC_KEY_NOT_EXIST`: 公鑰不存在
   - `FW_ERR_CS_SIGNATURE_NOT_EXIST`: 簽章不存在
   - `FW_ERR_CS_HASH_NOT_EXIST`: 雜湊值不存在
   - `FW_ERR_CS_RSA_KEY_FORAMT`: RSA 金鑰格式錯誤

   - `DRIVER_NO_ERR`: 無錯誤
   - `DRIVER_MSG_INSTALLED`: 驅動程式已安裝
   - `DRIVER_MSG_UPGRADABLE`: 驅動程式可升級
   - `DRIVER_ERR_FILE_NOT_EXIST`: 驅動程式檔案不存在
   - `DRIVER_ERR_NOT_INSTALL`: 未安裝驅動程式
   - `DRIVER_ERR_BROKEN`: 驅動程式損壞
   - `DRIVER_ERR_NEED_REBOOT`: 需要重新啟動

   - `PM_NO_ERROR`: 無錯誤
   - `PM_ERR_INVALID_PARAM`: 無效參數
   - `PM_ERR_NOT_INITIALIZED`: 未初始化
   - `PM_ERR_NOT_SUPPORT`: 不支援
   - `PM_ERR_READ_FILE`: 讀取檔案失敗
   - `PM_ERR_PLAN_FORMAT`: 電源計畫格式錯誤
   - `PM_ERR_SH_EXEC_FAILED`: Shell 執行失敗
   - `PM_ERR_REG_OPEN_KEY`: 註冊表開啟金鑰失敗
   - `PM_ERR_REG_SET_VALUE`: 註冊表設定值失敗

   - `ISP_NO_ERROR`: 無錯誤
   - `ISP_MSG_NEED_RESET`: 需要重置
   - `ISP_MSG_NEED_REBOOT`: 需要重新啟動
   - `ISP_MSG_NEED_REPLUG`: 需要重新插拔
   - `ISP_MSG_DO_NOT_CONTINUE`: 不要繼續
   - `ISP_MSG_FORCE_WAIT_RESET`: 強制等待重置
   - `ISP_MSG_NEED_UPDATE_AGAIN`: 需要再次更新
   - `ISP_ERR_NOT_INITIALIZED`: 未初始化
   - `ISP_ERR_NOT_SUPPORT`: 不支援
   - `ISP_ERR_ENTER_ISP`: 進入 ISP 模式失敗
   - `ISP_ERR_LEAVE_ISP`: 離開 ISP 模式失敗
   - `ISP_ERR_SEND_COMMAND`: 發送命令失敗
   - `ISP_ERR_CRC_CHECK`: CRC 檢查失敗
   - `ISP_ERR_CHECKSUM`: 校驗和錯誤
   - `ISP_ERR_SIGNATURE_CHECKSUM`: 簽章校驗和錯誤
   - `ISP_ERR_READ_FLASH`: 讀取 Flash 失敗
   - `ISP_ERR_ERASE_FLASH`: 擦除 Flash 失敗
   - `ISP_ERR_COMPARE_FLASH`: 比較 Flash 失敗
   - `ISP_ERR_WRITE_FLASH`: 寫入 Flash 失敗
   - `ISP_ERR_VERIFY_FLASH`: 驗證 Flash 失敗
   - `ISP_ERR_CHECK_FLASH_BLOCK`: 檢查 Flash 區塊失敗
   - `ISP_ERR_VERIFY_DEVICE`: 驗證設備失敗
   - `ISP_ERR_AUTHORIZATION_FAILED`: 授權失敗
   - `ISP_ERR_FLASH_SIZE`: Flash 大小錯誤

   - `I2C_NO_ERROR`: 無錯誤
   - `I2C_ERR_NOT_INITIALIZED`: 未初始化
   - `I2C_ERR_NOT_SUPPORT`: 不支援
   - `I2C_ERR_INVALID_PARAM`: 無效參數
   - `I2C_ERR_SEND_COMMAND`: 發送命令失敗
   - `I2C_ERR_QUERY_TIMEOUT`: 查詢超時
   - `I2C_ERR_CRC_CHECK`: CRC 檢查失敗

10. **Scaler 錯誤碼**:
    - `SCALER_NO_ERROR`: 無錯誤
    - `SCALER_ERR_INI_SETTING`: 初始化設定錯誤
    - `SCALER_ERR_FIXTURE`: 夾具錯誤
    - `SCALER_ERR_HUB_NOT_UPDATED`: Hub 未更新
    - `SCALER_ERR_GET_INFO`: 取得資訊失敗
    - `SCALER_ERR_CHECK_OFFSET`: 檢查偏移量失敗
    - `SCALER_ERR_TYPE_NOT_MATCH`: 類型不匹配

11. **HID 錯誤碼**:
    - `HID_NO_ERROR`: 無錯誤
    - `HID_ERR_NO_DEVICE`: 找不到設備
    - `HID_ERR_INVALID_DEVICE`: 無效設備
    - `HID_ERR_CODESIGN_EXAMINE_FAIL`: 簽章驗證失敗

- [Camera 透過我們驗證 code sign](./code-sign/camera-透過我們驗證-code-sign.html)
- [HID Code Sign 記錄](./code-sign/hid-code-sign-記錄.html)
- [HP Hemi(Z34c) CPU3 Code Sign 驗證問題](./code-sign/hp-hemiz34c-cpu3-code-sign-驗證問題.html)

這些文件提供了與 Vendor OCI 錯誤碼相關的更多背景資訊和使用案例。