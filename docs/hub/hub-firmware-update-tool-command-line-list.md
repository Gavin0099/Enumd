---
title: 'Hub Firmware Update Tool : Command Line List'
category: hub
notion_id: 9ad74f8a-7db3-478f-965b-a6cf0c470788
notion_url: >-
  https://www.notion.so/Hub-Firmware-Update-Tool-Command-Line-List-9ad74f8a7db3478f965ba6cf0c470788
notion_updated_at: '2026-01-21T09:53:00.000Z'
exported_at: '2026-04-06T11:16:59.067Z'
is_summarized: false
---

### Command Line Tool Release Note
- Yhisun 整理後文件
### /di	-- Install driver
```c
Example:
>GLHubUpdateToolCli.exe /di
################################
Install driver.

Installing filter driver, please wait...
................................Complete.
Install driver done!
Install Success.

Return_Value = 0x00000000
################################
```
### /du	-- Uninstall driver
```c
Example:
>GLHubUpdateToolCli.exe /du
################################
Uninstall driver.

Uninstalling filter driver, please wait...
.........................................................Complete.
Have to restart the PC!
Uninstall Success.

Return_Value = 0x00000000
################################
```
### /d	--Disable usb selective suspend
```c
Example:
>GLHubUpdateToolCli.exe /d
################################
Disable usb selective suspend.

Return_Value = 0x00000000
################################
```
### /e	--Enable usb selective suspend
```c
Example:
>GLHubUpdateToolCli.exe /e
################################
Enable usb selective suspend

Return_Value = 0x00000000
################################
```
### /v	--Display hub(s) Firmware version
```c
Example:
>GLHubUpdateToolCli.exe /v
################################
Hub FW version.
Format: Hub {id} [{last_update_fw_time}]({fw_vision})

Hub 01 [201906271529](9305)
Hub 02 [201906271603](4164)

Return_Value = 0x00000000
################################
```
### /ms  --Update Signed Firmware (Only Support HP Monitor Code Sign Hub)
{key} indicates the update type
{index} indicates the FW index, default is 0
{path} indicates the file path.
Current supports keys are:
"hub" for Hub
Supports scaler are MCPU_MST9U. Multiple Hub can be updated in one command
```c
Example:
>GLHubUpdateToolCli.exe "/ms=1&hub=HubFW/GL3523_OV5S1_TPV_HP_E243dV2_L1_FW6005sig.bin "
"/ms=2&hub:1=HubFW/GL3523_HP_E243dV2_L2AHub_FW6012sig_U132.bin "
################################
Update hub 1 FW.

Load GL3523 bin file OK.
Hub 01 is updating firmware.....
Update Hub firmware.....
Update Hub firmware success.

Return_Value = 0x00000000
################################
Update hub 2 FW.

Load GL3523 bin file OK.
Hub 02 is updating firmware.....
Update Hub firmware.....
Update Hub firmware success.
Return_Value = 0x00000000
```
### /su	--Update MTK Scaler (Only Support HP Monitor Code Sign Hub)
> **Note:** Please check GLHub.ini first. Program will detect the type of scaler and update corresponding FW automatically.
[Scaler]

PanelType=BBM1**/XVM1*1

BinFiles=HP_E243d_PanelBOEMV238FHM_N20_BBM121_20180925_BD_715G9927_M0C_Service.bin/HPN_E324_SAM_LSM315DP01-Q01_1H1DP1TYPE-C_XVM111_20190316_9038_Factory.bin

MStar_Scaler=MST9U

For example, there are 2 types (BBM1**/XVM1*1) in PanelType, there must be 2 corresponding binfiles in BinFiles. If program detects that the scaler type is XVM121, tool will use the second bin file(HPN_E324_SAM_LSM315DP01-Q01_1H1DP1TYPE-C_XVM111_20190316_9038_Factory.bin) to update scaler.
```c
Example:
>GLHubUpdateToolCli.exe /su
################################
Update Scaler FW.

[Scalar] Erase data...
[Scalar] Erase data done
[Scalar] Write Data----100%
[Scalar] Verify Data----100%
Update Scaler firmware success.

Return_Value = 0x00000000
```
### /req --Send USB setup packet to control pipe.
```c
Example:
Read the GPIO status
>GLHubUpdateToolCli.exe "/req=1&setup=c072000600000100"
################################
Send setup packet to hub 1.

Receive data length : 01,
000: ff

Return_Value = 0x00000000
################################


Set the GPIO to High or Low level
>GLHubUpdateToolCli.exe "/req=1&setup=4073000600000100&data=01"
################################
Send setup packet to hub 1.

Receive data length : 01,
000: 01

Return_Value = 0x00000000
################################
```
### /i --Display Hub Info
```c
Example:
>GLHubUpdateToolCli.exe /i
################################
Hub information.
Format: Hub {id} {device_path} (USB\VID_{vid}&PID_{pid}&REV_{rev})

Hub 01 \\?\usb#vid_05e3&pid_0625#5&4eb3c84&0&17#{f18a0e88-c30c-11d0-8815-00a0c906bed8} (USB\VID_05E3&PID_0625&REV_9405)


Return_Value = 0x00000000
```
### /c --Display Hub Chip ID
```c
Example:
>GLHubUpdateToolCli.exe /c
################################
Hub chip ID.
Format: Hub {id} ({chip_id})

Hub 01 (359010) is GL3590-OV1S1 hub


Return_Value = 0x00000000
################################
```
### /h --Display Dfp TypeC Connection(To confirm whether the hub fw has support)
```c
Example:
GLHubUpdateToolCli.exe "/h=1&port=1"
################################
Port 1: Not Connected!

Return_Value = 0x00000000
################################
```
### /va --Display Device Firmware Version
```c
Example:
>GLHubUpdateToolCli.exe /va
################################
Hub involves FW versions.
Format: Hub {id} [{fw_type}]({fw_vision})...

Hub 01
 [Hub](9405)
 [Dev](FFFFFFFF)



Return_Value = 0x00000000
################################
```
### /vb --Display Bin Firmware Version
```c
Example:
>GLHubUpdateToolCli.exe /vb
################################
FW version of bin file.
Format {file_name} [{chip_id}]({fw_vision})

GL3523_Dell_Uno_L1Hub_FW8818.bin [352310](8818)

GL3523_OV3S1_Dell_Uno_L2Hub_FW8819.bin [352310](8819)


Return_Value = 0x00000000
################################
```
### /er --Erase Hub Firmware
```c
Example:
>GLHubUpdateToolCli.exe /er=1
################################
Hub 01 is erasing.....

Erasing Hub firmware to hub...
Compare data----1024/1024(100%).Compare data complete.
Erase done.
Hub 01 erase success.


Return_Value = 0x00000000
################################
```
### /u --Update Hub Firmware
```c
Example:
>GLHubUpdateToolCli.exe /u
################################
Update hub FW.

Hub 01 is updating firmware.....

Update Hub firmware.....

Update Hub firmware complete.

Reset Hub.....

Hub 01 update firmware success.


Return_Value = 0x00000000
```
### /mu --Manual Update Hub Firmware
```c
Example:
>GLHubUpdateToolCli.exe "/mu=1&hub=HubFW\GL3590-OV1S1_Hub(Std-UPB)_FW9405.bin"
################################
Update hub 1 FW.

Hub 01 is updating firmware.....

Update Hub firmware.....

Update Hub firmware complete.

Hub 01 update firmware complete.


Return_Value = 0x00000000
################################
```
### /dmp --Dump Hub Firmware
```c
Example:
>GLHubUpdateToolCli.exe "/dmp=1&hub=aaa.bin"
################################
Update hub 1 FW.

Hub 01 is dumping firmware.....

Dump Hub firmware.....

Dumping Hub firmware from hub...
Dump done.
Dump Hub firmware complete.

Hub 01 dump firmware success.


Return_Value = 0x00000000
################################
```
### /rebb --Reset BillBoard(Only Support GL9510 BillBoard)
```c
Example:
>GLHubUpdateToolCli.exe "/rebb=1"
################################
Billboard 01 is reseting.....

Reset PD.....

Billboard 01 reset success.


Return_Value = 0x00000000
################################
```
### /re --Reset Hub
```c
Example:
>GLHubUpdateToolCli.exe /re=1
################################
Hub 01 is reseting.....

Reset Hub.....

Hub 01 reset success.


Return_Value = 0x00000000
################################
```
### /mr --Merge To Rom
```c
Example:
>GLHubUpdateToolCli.exe "/mr=1&hub=HubFW\GL3590-OV1S1_Hub(Std-UPB)_FW9405.bin"
################################
Merge hub 1 FW.

Hub 01 is merging firmware.....

Hub 01 merge file[GL3590_Hub_9405.rom] complete.


Return_Value = 0x00000000
################################
```
### /sv --Display Scaler Firmware Version(Only Support HP Monitor Code Sign Hub)
```c
Example:
>GLHubUpdateToolCli.exe /sv
################################
Scaler FW version.
Scaler Firmware version is RIM070.


Return_Value = 0x00000000
################################
```
### /eb --Erase Firmware Block (Only Support HP Monitor Code Sign Hub-GL3590)
```c
Example:
>GLHubUpdateToolCli.exe "/eb=1"
################################
Erase FW 1.

Erase firmware success, please re-plug the device.


Return_Value = 0x00000000
################################
```
### /bb --Manual Update Billboard Firmware(Only Support GL9510 BillBoard)
```c
Example:
>GLHubUpdateToolCli.exe "/bb=1&pd=GL9510_Standard_Dongle_FW121_bb_withoutreconnect.bin"
################################
Update billboard 1 FW.

Hub 01 is updating firmware.....

Update PD firmware.....

Update PD firmware complete.

Hub 01 update firmware success.


Return_Value = 0x00000000
################################
```
### /au --Update Audio Firmware
```c
Example:
>GLHubUpdateToolCli.exe
```
### /cu --Update Camera Firmware
```c
Example:
>GLHubUpdateToolCli.exe
```
### /le --Display Link Error Count(To confirm whether the hub fw has support)
```c
Example:
>GLHubUpdateToolCli.exe "/le=1"
################################
Hub 1 Upstream port: Link Error Count = 0

Return_Value = 0x00000000
################################
```
### /gmn --Get Rtk Scaler Model Name (Only Support Philips 256P1FR)
```c
Example:
>GLHubUpdateToolCli.exe /gmn
################################
Scaler Model Name:276B1

Return_Value = 0x00000000
################################
```
### /gpn --Get Rtk Scaler Panel Name(Only Support Philips 256P1FR)
```c
Example:
>GLHubUpdateToolCli.exe /gpn
################################
Scaler Panel Name:TPV-TPM270WF1-QHBN

Return_Value = 0x00000000
################################
```
### /gfv --Get Rtk Scaler Firmware Version(Only Support Philips 256P1FR)
```c
Example:
>GLHubUpdateToolCli.exe /gfv
################################
Scaler Firmware Version:V2.00

Return_Value = 0x00000000
################################
```
### /ec --Display Error Code String
```c
Example:
>GLHubUpdateToolCli.exe /ec
################################
Display all error code strings.

GL_NO_ERR = 0x00000000,
GL_ERR_INVALID_PARAM = 0xE0000000,
GL_ERR_NOT_SUPPORT,
GL_ERR_FILE_NOT_EXIST,
GL_ERR_OPEN_FILE,
GL_ERR_READ_FILE,
GL_ERR_WRITE_FILE,
GL_ERR_SEEK_FILE,
GL_ERR_CLOSE_FILE,
GL_ERR_OPEN_PIPE,
GL_ERR_READ_PIPE,
GL_ERR_WRITE_PIPE,
GL_ERR_CLOSE_PIPE,
GL_ERR_CREATE_PROCESS,
GL_ERR_LAUNCH_PROCESS,
GL_ERR_WAIT_PROCESS,
GL_ERR_TERMINATE_PROCESS,
GL_ERR_EXEC_FAILED,
GL_ERR_TIMEOUT,
GL_ERR_RESET,

GL_ERR_FW_UPDATE_HUB,
GL_ERR_FW_UPDATE_BILLBOARD,
GL_ERR_FW_UPDATE_PD,
GL_ERR_FW_UPDATE_HOST_BRIDGE,
GL_ERR_FW_UPDATE_SD_CARD,
GL_ERR_FW_UPDATE_SIM_CARD,
GL_ERR_FW_UPDATE_SCALER,
GL_ERR_FW_UPDATE_AUDIO,
GL_ERR_FW_UPDATE_CAMERA,

DEV_NO_ERR = GL_NO_ERR,
DEV_ERR_NO_DEVICE = 0xE0000100,
DEV_ERR_NO_MATCH_DEVICE,
DEV_ERR_OPEN_DEVICE,
DEV_ERR_QUERY_DEVICE,

DEV_ERR_HUB_RETRIEVE_INFO,
DEV_ERR_HUB_QUERY_INFO,
DEV_ERR_HUB_QUERY_VERSION,
DEV_ERR_HUB_INIT,
DEV_ERR_HUB_CHIP_ID_UNKNOWN,

FW_NO_ERR = GL_NO_ERR,
FW_MSG_VERSION_EQUAL = 0x70000200,
FW_MSG_VERSION_LESS,
FW_MSG_VERSION_LARGER,

FW_ERR_INVALID_PARAM = 0xE0000200,
FW_ERR_FILE_NOT_EXIST,
FW_ERR_FILE_NOT_MATCH,
FW_ERR_NO_FILE_LOAD,
FW_ERR_FILE_SIZE,
FW_ERR_FILE_FORMAT,
FW_ERR_FILE_CHIP_ID,
FW_ERR_FILE_CHIP_MASK,
FW_ERR_FILE_BONDING,

DRIVER_NO_ERR = GL_NO_ERR,
DRIVER_MSG_INSTALLED = 0x70000300,
DRIVER_MSG_UPGRADABLE,

DRIVER_ERR_FILE_NOT_EXIST = 0xE0000300,
DRIVER_ERR_NOT_INSTALL,

PM_NO_ERROR = GL_NO_ERR,
PM_ERR_INVALID_PARAM = 0xE0001000,
PM_ERR_NOT_INITIALIZED,
PM_ERR_NOT_SUPPORT,
PM_ERR_READ_FILE,
PM_ERR_PLAN_FORMAT,
PM_ERR_SH_EXEC_FAILED,
PM_ERR_REG_OPEN_KEY,
PM_ERR_REG_SET_VALUE,

ISP_NO_ERROR = GL_NO_ERR,
ISP_MSG_NEED_RESET = 0x70002000,
ISP_MSG_NEED_REBOOT,
ISP_MSG_NEED_REPLUG,
ISP_MSG_DO_NOT_CONTINUE,
ISP_MSG_FORCE_WAIT_RESET,
ISP_ERR_NOT_INITIALIZED = 0xE0002000,
ISP_ERR_NOT_SUPPORT,
ISP_ERR_ENTER_ISP,
ISP_ERR_LEAVE_ISP,
ISP_ERR_SEND_COMMAND,
ISP_ERR_CRC_CHECK,
ISP_ERR_CHECKSUM,
ISP_ERR_SIGNATURE_CHECKSUM,
ISP_ERR_READ_FLASH,
ISP_ERR_ERASE_FLASH,
ISP_ERR_COMPARE_FLASH,
ISP_ERR_WRITE_FLASH,
ISP_ERR_VERIFY_FLASH,
ISP_ERR_CHECK_FLASH_BLOCK,
ISP_ERR_VERIFY_DEVICE,
ISP_ERR_AUTHORIZATION_FAILED,
ISP_ERR_FLASH_SIZE,

I2C_NO_ERROR = GL_NO_ERR,
I2C_ERR_NOT_INITIALIZED = 0xE0002100,
I2C_ERR_NOT_SUPPORT,
I2C_ERR_INVALID_PARAM,
I2C_ERR_SEND_COMMAND,
I2C_ERR_QUERY_TIMEOUT,
I2C_ERR_CRC_CHECK,

DFU_NO_ERROR = GL_NO_ERR,
DFU_WRN_ALREADY_IN_DFU_MODE = 0x70002200,
DFU_WRN_NEED_INSTALL_DRIVER,

DFU_ERR_OPEN_DEVICE = 0xE0002200,
DFU_ERR_NO_INTERFACE,
DFU_ERR_INVALID_PARAM,
DFU_ERR_NOT_INITIALIZED,
DFU_ERR_NOT_SUPPORT,

DFU_ERR_DNLOAD_DATA,
DFU_ERR_DNLOAD_STATUS,
DFU_ERR_DNLOAD_STATUS_CLEAR,
DFU_ERR_DNLOAD_RETRY,
DFU_ERR_DNLOAD_END,
DFU_ERR_DNLOAD_END_STATUS,
DFU_ERR_DNLOAD_END_STATUS_CLEAR,
DFU_ERR_DNLOAD_END_RETRY,
DFU_ERR_UPLOAD_DATA,
DFU_ERR_UPLOAD_STATUS,
DFU_ERR_UPLOAD_STATUS_CLEAR,
DFU_ERR_UPLOAD_RETRY,
DFU_ERR_UPLOAD_END,
DFU_ERR_UPLOAD_END_STATUS,
DFU_ERR_UPLOAD_END_STATUS_CLEAR,
DFU_ERR_UPLOAD_END_RETRY,
DFU_ERR_ABORT,
DFU_ERR_ABORT_STATUS,
DFU_ERR_ABORT_STATUS_CLEAR,
DFU_ERR_ABORT_RETRY,

SCALER_NO_ERROR = GL_NO_ERR,
SCALER_ERR_INI_SETTING = 0xE0002300,
SCALER_ERR_FIXTURE,
SCALER_ERR_HUB_NOT_UPDATED,
SCALER_ERR_GET_INFO,
SCALER_ERR_CHECK_OFFSET,
SCALER_ERR_TYPE_NOT_MATCH,

PD_NO_ERROR = GL_NO_ERR,
PD_ERR_INVALID_PARAM = 0xE0002400,
PD_ERR_NOT_INITIALIZED,
PD_ERR_NOT_SUPPORT,
PD_ERR_SINK_STATUS,
PD_ERR_ENTER_ISP,
PD_ERR_QUERY_TIMEOUT,
PD_ERR_READ_ADC,
PD_ERR_READ_RUNNING_STATUS,
PD_ERR_VERIFY_INIT,
PD_ERR_NOT_SUPPORT_RECOVERY,
PD_ERR_FW_NOT_FOUND,

SD_NO_ERROR = GL_NO_ERR,
SD_ERR_GET_CLASS_DEV = 0xE0010000,
SD_ERR_ENUM_DEV_INFO,
SD_ERR_OPEN_DEV_INFO,
SD_ERR_SET_CLASS_INSTALL_PARAM,
SD_ERR_CHANGE_STATE,

SE_NO_ERROR = GL_NO_ERR,
SE_ERR_INVOKE = 0xE0010100,
SE_ERR_INSTANCE,
SE_ERR_INSTALL_DRIVER,
SE_ERR_UNINSTALL_DRIVER,
SE_ERR_EXIT_RETURN_UNKNOWN,
SE_ERR_EXIT_RETURN_REBOOT,
SE_ERR_CLOSE_DEVICE_BRIDGE_FAIL,
SE_ERR_OPEN_DEVICE_BRIDGE_FAIL,

WINUSB_NO_ERROR = GL_NO_ERR,
WINUSB_ERR_INIT = 0xE0010200,
WINUSB_ERR_QUERY_DEVICE,
WINUSB_ERR_QUERY_INTERFACE,
WINUSB_ERR_SEND_CMD,

GL_ERR_END

Return_Value = 0x00000000
################################
```
---
### 注意事項
- 當有遇到Hub Device 3.0和 2.0 對不上導致 USB topology 錯誤時，最簡單的方式為設定TargetDevice.ini ，只設定 3.0 or 2.0 hub ，範例如下圖
- GLHub.ini裡面的UUUISP = 0  m_pGlUsbDevEnum可以強制設定讀取USB 2.0 
