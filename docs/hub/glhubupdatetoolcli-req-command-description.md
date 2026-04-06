---
title: GLHubUpdateToolCli req command Description
category: hub
notion_id: f339ce40-e65b-43ee-89b3-241875c19295
notion_url: >-
  https://www.notion.so/GLHubUpdateToolCli-req-command-Description-f339ce40e65b43ee89b3241875c19295
notion_updated_at: '2026-01-21T09:33:00.000Z'
exported_at: '2026-04-06T11:16:56.076Z'
is_summarized: false
---

## Send USB setup packet to control pipe.
> **Note:** setup packet by keyin data.

GLHubUpdateToolCli.exe "/req=id&setup=8bytes_setup_packet[&data=input_data]"
## For Example
### Read the GPIO status
```c
GLHubUpdateToolCli.exe "/req=1&setup=c072000600000100"
```
### Set the GPIO to High or Low level
```c
GLHubUpdateToolCli.exe "/req=1&setup=4073000600000100&data=01"
```
- Enter ISP 
- Reset Mcu
```bash
# PowerShell script to simplify the invocation of GLHubUpdateToolCli.exe

# User input
$Addr = Read-Host -Prompt "Please enter Addr (up to 4 hex digits)"
$IntAddr = [Convert]::ToInt32($Addr, 16)
$Addr = "{0:X4}" -f $IntAddr  # Convert Addr to a hex string with at least 4 digits

# Swap the high and low bytes of the Addr
$LowByte = $Addr.Substring(0, 2)
$HighByte = $Addr.Substring(2, 2)
$SwappedAddr = $HighByte + $LowByte

$Data = Read-Host -Prompt "Please enter Data (up to 2 hex digits, leave empty if none)"

if ($Data -eq "") {
    $command = "C0"
    # Exclude the &data= part
    $arguments = "/req=1&setup=${command}720400$SwappedAddr" + "0100"
} else {
    $IntData = [Convert]::ToInt32($Data, 16)
    $Data = "{0:X2}" -f $IntData  # Convert Data to a hex string with at least 2 digits
    $command = "40"
    # Include the &data= part
    $arguments = "/req=1&setup=${command}730400$SwappedAddr" + "0100&data=$Data"
}

# Display the arguments that will be used for the invocation of GLHubUpdateToolCli.exe (optional)
Write-Host "About to call GLHubUpdateToolCli.exe with the following arguments: $arguments"

# Invoke GLHubUpdateToolCli.exe and display its output on the screen
& ".\GLHubUpdateToolCli.exe" $arguments

# Pause to allow the user to read any output or error messages
pause
```
"/req=1&setup=C0720400&data=1”
- opreg
```python
GLHubUpdateToolCli.exe "/req=1&setup=40ab6e5100000800&data=8601fee1e4060045”
GLHubUpdateToolCli.exe "/req=1&setup=c0c1000300000400”
```
Bus Hound 7.04 capture. Complements of www.perisoft.net
  Device - Device ID (followed by the endpoint for USB devices)
            (50) USB Input Device
            (51) HID-compliant device
            (59) Generic USB Hub
            (62) Generic USB Hub
            (63) USB Input Device
            (64) HID-compliant device
            (65) USB Mass Storage Device
            (66) GCREADER
  Phase  - Phase Type
            CTL   USB control transfer       
            IN    Data in transfer           
            OUT   Data out transfer          
  Data   - Hex dump of the data transferred
  Descr  - Description of the phase
  Delta  - Elapsed time from the previous phase to the current phase
  Cmd... - Position in the captured data
  Date   - Date the phase occurred in year-month-day form
  Time   - Time the phase occurred in hour:minute:second.millisec form
Device  Phase  Data                                                Description       Delta  Cmd.Phase.Ofs(rep)  Date        Time        
------  -----  --------------------------------------------------  ----------------  -----  ------------------  ----------  ------------
  50.0  OUT    40 ab 6e 51  00 00 08 00  84 03 f7 00  12 00 00 4f  @.nQ...........O  785us        10.2.0        2024-09-06  17:01:49.788
{0x84, 0x03, 0xf7, 0x00, 0x12, 0x00, 0x00, 0x4f}
```javascript
# 提示選擇
Write-Host "請選擇要執行的命令："
Write-Host "1. Header"
Write-Host "2. PCBA Part Number"
Write-Host "3. FW version"
Write-Host "4. Marketing Name"

# 讀取使用者輸入
$choice = Read-Host "請輸入命令編號 (1-4)"

# 根據輸入執行對應的命令，並執行附加命令
switch ($choice) {
    1 {
        Write-Host "執行 Header 命令"
        & ".\GLHubUpdateToolCli.exe" "/req=1&setup=6E518201F000&data=736461"
        & ".\GLHubUpdateToolCli.exe" "/req=1&setup=c0720004020A0100"
    }
    2 {
        Write-Host "執行 PCBA Part Number 命令"
        & ".\GLHubUpdateToolCli.exe" "/req=1&setup=6E518201F100&data=35452e36315930312e303031"
        & ".\GLHubUpdateToolCli.exe" "/req=1&setup=c0720004020A0100"
    }
    3 {
        Write-Host "執行 FW version 命令"
        & ".\GLHubUpdateToolCli.exe" "/req=1&setup=6E518201F200&data=323032333038303820303031"
        & ".\GLHubUpdateToolCli.exe" "/req=1&setup=c0720004020A0100"
    }
    4 {
        Write-Host "執行 Marketing Name 命令"
        & ".\GLHubUpdateToolCli.exe" "/req=1&setup=6E518201F300&data=58554232373934515355000000000000"
        & ".\GLHubUpdateToolCli.exe" "/req=1&setup=c0720004020A0100"
    }
    Default {
        Write-Host "無效的選擇，請輸入 1 到 4 之間的數字。"
    }
}

```
```javascript
else if (sPar.compare(nPosCur, _tcslen(_T("data=")), _T("data=")) == 0)
        {
            const size_t nStart = nPosCur + _tcslen(_T("data="));
            if (nStart == nPosNext)
            {
                _ftprintf_s(stderr, _T("Input parameter was wrong[data]!\n"));
                return GL_ERR_INVALID_PARAM;
            }

            const size_t nDataLen = nPosNext - nStart;
            if (nDataLen % 2 == 1)
            {
                _ftprintf_s(stderr, _T("Input parameter was wrong[data size]!\n"));
                return GL_ERR_INVALID_PARAM;
            }

            strData.resize(nDataLen / 2);

            const auto *psData = sPar.data() + nStart;

            for (const auto &item : strData)
            {
                iReadPars = _stscanf_s(psData, _T("%hhX"), (uint8_t *)&item);
                if (iReadPars != 1)
                {
                    _ftprintf_s(stderr, _T("Input parameter was wrong[data format]!\n"));
                    return GL_ERR_INVALID_PARAM;
                }

                psData += 2;
            }
        }
```
```javascript
GLHubUpdateToolCli.exe "/req=1&setup=40ab6e5100000400&data=8201F000"
GLHubUpdateToolCli.exe "/req=1&setup=C0aa6e6f00001000"  
Bus Hound 7.04 capture. Complements of www.perisoft.net

  Device - Device ID (followed by the endpoint for USB devices)
            (50) USB Input Device
            (51) HID-compliant device
            (59) Generic USB Hub
            (62) Generic USB Hub
            (63) USB Input Device
            (64) HID-compliant device
            (65) USB Mass Storage Device
            (66) GCREADER
  Phase  - Phase Type
            CTL   USB control transfer       
            IN    Data in transfer           
            OUT   Data out transfer          
  Data   - Hex dump of the data transferred
  Descr  - Description of the phase
  Delta  - Elapsed time from the previous phase to the current phase
  Cmd... - Position in the captured data
  Date   - Date the phase occurred in year-month-day form
  Time   - Time the phase occurred in hour:minute:second.millisec form


Device  Phase  Data                                                Description       Delta  Cmd.Phase.Ofs(rep)  Date        Time        
------  -----  --------------------------------------------------  ----------------  -----  ------------------  ----------  ------------
  50.0  OUT    40 ab 6e 51  00 00 08 00  45 45 45 45  45 45 45 45  @.nQ....EEEEEEEE  794us         4.2.0        2024-09-06  17:44:23.749  

```
