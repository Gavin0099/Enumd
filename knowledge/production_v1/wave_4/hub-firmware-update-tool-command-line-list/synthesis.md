
# Hub Firmware Update Tool : Command Line List


### /di - 安裝驅動程式
>GLHubUpdateToolCli.exe /di
################################

[未有直接 Source 錨點，待確認] ................................完成。

Return_Value = 0x00000000
################################
[Hub Firmware Update Tool : Command Line List](hub-firmware-update-tool-command-line-list.html#/di)

### /du - 卸載驅動程式
>GLHubUpdateToolCli.exe /du
################################

[未有直接 Source 錨點，待確認] .........................................................完成。

Return_Value = 0x00000000
################################
[Hub Firmware Update Tool : Command Line List](hub-firmware-update-tool-command-line-list.html#/du)

### /d - 禁用 USB 選擇性暫停
>GLHubUpdateToolCli.exe /d
################################

Return_Value = 0x00000000
################################
[Hub Firmware Update Tool : Command Line List](hub-firmware-update-tool-command-line-list.html#/d)

### /e - 啟用 USB 選擇性暫停
>GLHubUpdateToolCli.exe /e
################################

Return_Value = 0x00000000
################################
[Hub Firmware Update Tool : Command Line List](hub-firmware-update-tool-command-line-list.html#/e)

### /v - 顯示 Hub 韌體版本
>GLHubUpdateToolCli.exe /v
################################
格式: Hub {id} [{last_update_fw_time}]({fw_vision})

Hub 01 [201906271529](9305)
Hub 02 [201906271603](4164)

Return_Value = 0x00000000
################################
[Hub Firmware Update Tool : Command Line List](hub-firmware-update-tool-command-line-list.html#/v)

### /ms - 更新簽名韌體 (僅支援 HP 顯示器代碼簽名 Hub)
>GLHubUpdateToolCli.exe "/ms=1&hub=HubFW/GL3523_OV5S1_TPV_HP_E243dV2_L1_FW6005sig.bin "
"/ms=2&hub:1=HubFW/GL3523_HP_E243dV2_L2AHub_FW6012sig_U132.bin "
################################

載入 GL3523 bin 檔案成功。
Hub 01 正在更新韌體.....

Return_Value = 0x00000000
################################

載入 GL3523 bin 檔案成功。
Hub 02 正在更新韌體.....
Return_Value = 0x00000000
[Hub Firmware Update Tool : Command Line List](hub-firmware-update-tool-command-line-list.html#/ms)

### /su - 更新 MTK Scaler (僅支援 HP 顯示器代碼簽名 Hub)
> **注意:** 請先檢查 GLHub.ini。程式會自動偵測 scaler 類型並更新對應的韌體。

PanelType=BBM1**/XVM1*1

BinFiles=HP_E243d_PanelBOEMV238FHM_N20_BBM121_20180925_BD_715G9927_M0C_Service.bin/HPN_E324_SAM_LSM315DP01-Q01_1H1DP1TYPE-C_XVM111_20190316_9038_Factory.bin

MStar_Scaler=MST9U

例如,PanelType 有 2 種類型 (BBM1**/XVM1*1),則 BinFiles 必須有 2 個對應的 bin 檔。如果程式偵測到 scaler 類型是 XVM121,則會使用第二個 bin 檔 (HPN_E324_SAM_LSM315DP01-Q01_1H1DP1TYPE-C_XVM111_20190316_9038_Factory.bin) 來更新 scaler。
>GLHubUpdateToolCli.exe /su
################################

[未有直接 Source 錨點，待確認] [Scalar] 正在擦除資料...
[Scalar] 寫入資料----100%
[Scalar] 驗證資料----100%

Return_Value = 0x00000000
[Hub Firmware Update Tool : Command Line List](hub-firmware-update-tool-command-line-list.html#/su)

### /req - 傳送 USB 設定封包到控制管道
>GLHubUpdateToolCli.exe "/req=1&setup=c072000600000100"
################################


Return_Value = 0x00000000
################################


>GLHubUpdateToolCli.exe "/req=1&setup=4073000600000100&data=01"
################################


Return_Value = 0x00000000
################################
[Hub Firmware Update Tool : Command Line List](hub-firmware-update-tool-command-line-list.html#/req)

### /i - 顯示 Hub 資訊
>GLHubUpdateToolCli.exe /i
################################
格式: Hub {id} {device_path} (USB\VID_{vid}&PID_{pid}&REV_{rev})

Hub 01 \\?\usb#vid_05e3&pid_0625#5&4eb3c84&0&17#{f18a0e88-c30c-11d0-8815-00a0c906bed8} (USB\VID_05E3&PID_0625&REV_9405)


Return_Value = 0x00000000
[Hub Firmware Update Tool : Command Line List](hub-firmware-update-tool-command-line-list.html#/i)

### /c - 顯示 Hub Chip ID
>GLHubUpdateToolCli.exe /c
################################
格式: Hub {id} ({chip_id})

Hub 01 (359010) is GL3590-OV1S1 hub


Return_Value = 0x00000000
################################
[Hub Firmware Update Tool : Command Line List](hub-firmware-update-tool-command-line-list.html#/c)

### /h - 顯示 Dfp TypeC 連接狀態 (確認 hub 韌體是否有支援)
GLHubUpdateToolCli.exe "/h=1&port=1"
################################

Return_Value = 0x00000000
################################
[Hub Firmware Update Tool : Command Line List](hub-firmware-update-tool-command-line-list.html#/h)

### /va - 顯示裝置韌體版本
>GLHubUpdateToolCli.exe /va
################################
格式: Hub {id} [{fw_type}]({fw_vision})...




Return_Value = 0x00000000
################################
[Hub Firmware Update Tool : Command Line List](hub-firmware-update-tool-command-line-list.html#/va)

### /vb - 顯示 Bin 韌體版本
>GLHubUpdateToolCli.exe /vb
################################
格式 {file_name} [{chip_id}]({fw_vision})

GL3523_Dell_Uno_L1Hub_FW8818.bin [352310](8818)

GL3523_OV3S1_Dell_Uno_L2Hub_FW8819.bin [352310](8819)


Return_Value = 0x00000000
################################
[Hub Firmware Update Tool : Command Line List](hub-firmware-update-tool-command-line-list.html#/vb)

### /er - 清除 Hub 韌體
>GLHubUpdateToolCli.exe /er=1
################################
Hub 01 正在清除.....

比較資料----1024/1024(100%)。比較資料完成。


Return_Value = 0x00000000
################################
[Hub Firmware Update Tool : Command Line List](hub-firmware-update-tool-command-line-list.html#/er)

### /u - 更新 Hub 韌體
>GLHubUpdateToolCli.exe /u
################################

Hub 01 正在更新韌體.....






Return_Value = 0x00000000
[Hub Firmware Update Tool : Command Line List](hub-firmware-update-tool-command-line-list.html#/u)

### /mu - 手動更新 Hub 韌體
>GLHubUpdateToolCli.exe "/mu=1&hub=HubFW\GL3590-OV1S1_Hub(Std-UPB)_FW9405.bin"
################################

Hub 01 正在更新韌體.....





Return_Value = 0x00000000
################################
[Hub Firmware Update Tool : Command Line List](hub-firmware-update-tool-command-line-list.html#/mu)

### /dmp - 轉存 Hub 韌體
>GLHubUpdateToolCli.exe "/dmp=1&hub=aaa.bin"
################################

Hub 01 正在轉存韌體.....





Return_Value = 0x00000000
################################
[Hub Firmware Update Tool : Command Line List](hub-firmware-update-tool-command-line-list.html#/dmp)

### /rebb - 重設 BillBoard (僅支援 GL9510 BillBoard)
>GLHubUpdateToolCli.exe "/rebb=1"
################################
Billboard 01 正在重設.....


Billboard 01 重設成功。


Return_Value = 0x00000000
################################
[Hub Firmware Update Tool : Command Line List](hub-firmware-update-tool-command-line-list.html#/rebb)

### /re - 重設 Hub
>GLHubUpdateToolCli.exe /re=1
################################
Hub 01 正在重設.....




Return_Value = 0x00000000
################################
[Hub Firmware Update Tool : Command Line List](hub-firmware-update-tool-command-line-list.html#/re)

### /mr - 合併到 Rom
>GLHubUpdateToolCli.exe "/mr=1&hub=HubFW\GL3590-OV1S1_Hub(Std-UPB)_FW9405.bin"
################################

Hub 01 正在合併韌體.....

Hub 01 合併檔案[GL3590_Hub_9405.rom]完成。


Return_Value = 0x00000000
################################
[Hub Firmware Update Tool : Command Line List](hub-firmware-update-tool-command-line-list.html#/mr)

### /sv - 顯示 Scaler 韌體版本 (僅支援 HP 顯示器代碼簽名 Hub)
>GLHubUpdateToolCli.exe /sv
################################
Scaler 韌體版本為 RIM070。


Return_Value = 0x00000000
################################
[Hub Firmware Update Tool : Command Line List](hub-firmware-update-tool-command-line-list.html#/sv)

### /eb - 清除韌體區塊 (僅支援 HP 顯示器代碼簽名 Hub-GL3590)
>GLHubUpdateToolCli.exe "/eb=1"
################################



Return_Value = 0x00000000
################################
[Hub Firmware Update Tool : Command Line List](hub-firmware-update-tool-command-line-list.html#/eb)

### /bb - 手動更新 Billboard 韌體 (僅支援 GL9510 BillBoard)
>GLHubUpdateToolCli.exe "/bb=1&pd=GL9510_Standard_Dongle_FW121_bb_withoutreconnect.bin"
################################
更新 billboard 1 韌體。

Hub 01 正在更新韌體.....





Return_Value = 0x00000000
################################
[Hub Firmware Update Tool : Command Line List](hub-firmware-update-tool-command-line-list.html#/bb)

### /au - 更新音訊韌體
>GLHubUpdateToolCli.exe
[Hub Firmware Update Tool : Command Line List](hub