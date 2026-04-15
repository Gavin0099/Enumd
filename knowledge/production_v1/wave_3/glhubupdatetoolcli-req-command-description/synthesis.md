
# GLHubUpdateToolCli req command Description

GLHubUpdateToolCli 是一個命令列工具，可用於向 USB 控制管線發送設定封包。這個工具主要用於控制 Genesys Logic 公司生產的 USB Hub 晶片。

使用 GLHubUpdateToolCli 的基本語法如下:

GLHubUpdateToolCli.exe "/req=id&setup=8bytes_setup_packet[&data=input_data]"

- `req=id`: 指定要執行的命令 ID。
- `setup=8bytes_setup_packet`: 設定 8 個位元組的設定封包。
- `data=input_data`: (可選) 提供額外的輸入資料。


GLHubUpdateToolCli.exe "/req=1&setup=c072000600000100"

### 設定 GPIO 為高或低電平
GLHubUpdateToolCli.exe "/req=1&setup=4073000600000100&data=01"

## 進入 ISP 模式與重置 MCU
以下是一個 PowerShell 腳本，用於簡化 GLHubUpdateToolCli.exe 的呼叫:

$Addr = Read-Host -Prompt "Please enter Addr (up to 4 hex digits)"
$IntAddr = [Convert]::ToInt32($Addr, 16)
$Addr = "{0:X4}" -f $IntAddr  # 將 Addr 轉換為至少 4 位數的十六進位字串

# 交換 Addr 的高低位元組
$LowByte = $Addr.Substring(0, 2)
$HighByte = $Addr.Substring(2, 2)
$SwappedAddr = $HighByte + $LowByte

$Data = Read-Host -Prompt "Please enter Data (up to 2 hex digits, leave empty if none)"

    $arguments = "/req=1&setup=${command}720400$SwappedAddr" + "0100"
    $IntData = [Convert]::ToInt32($Data, 16)
    $Data = "{0:X2}" -f $IntData  # 將 Data 轉換為至少 2 位數的十六進位字串
    $arguments = "/req=1&setup=${command}730400$SwappedAddr" + "0100&data=$Data"

# 顯示將用於呼叫 GLHubUpdateToolCli.exe 的參數 (選用)
Write-Host "About to call GLHubUpdateToolCli.exe with the following arguments: $arguments"

# 呼叫 GLHubUpdateToolCli.exe 並顯示其輸出
& ".\GLHubUpdateToolCli.exe" $arguments

# 暫停以便使用者閱讀任何輸出或錯誤訊息

[未有直接 Source 錨點，待確認] 以下是一些 opreg 相關的命令範例:

GLHubUpdateToolCli.exe "/req=1&setup=40ab6e5100000800&data=8601fee1e4060045"
GLHubUpdateToolCli.exe "/req=1&setup=c0c1000300000400"

## Bus Hound 7.04 捕獲資料
以下是一個 Bus Hound 7.04 的捕獲範例,包含各種 USB 裝置的相關資訊:

Device - Device ID (followed by the endpoint for USB devices)
        (50) USB Input Device
        (51) HID-compliant device
        (59) Generic USB Hub
        (62) Generic USB Hub
        (63) USB Input Device
        (64) HID-compliant device
        (65) USB Mass Storage Device
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


Write-Host "請選擇要執行的命令："
Write-Host "1. Header"
Write-Host "2. PCBA Part Number"
Write-Host "3. FW version"
Write-Host "4. Marketing Name"

$choice = Read-Host "請輸入命令編號 (1-4)"

# 根據輸入執行對應的命令，並執行附加命令
switch ($choice) {
        Write-Host "執行 Header 命令"
        & ".\GLHubUpdateToolCli.exe" "/req=1&setup=6E518201F000&data=736461"
        & ".\GLHubUpdateToolCli.exe" "/req=1&setup=c0720004020A0100"
        Write-Host "執行 PCBA Part Number 命令"
        & ".\GLHubUpdateToolCli.exe" "/req=1&setup=6E518201F100&data=35452e36315930312e303031"
        & ".\GLHubUpdateToolCli.exe" "/req=1&setup=c0720004020A0100"
        Write-Host "執行 FW version 命令"
        & ".\GLHubUpdateToolCli.exe" "/req=1&setup=6E518201F200&data=323032333038303820303031"
        & ".\GLHubUpdateToolCli.exe" "/req=1&setup=c0720004020A0100"
        Write-Host "執行 Marketing Name 命令"
        & ".\GLHubUpdateToolCli.exe" "/req=1&setup=6E518201F300&data=58554232373934515355000000000000"
        & ".\GLHubUpdateToolCli.exe" "/req=1&setup=c0720004020A0100"
        Write-Host "無效的選擇，請輸入 1 到 4 之間的數字。"

以下是 GLHubUpdateToolCli.exe 中處理 `data=` 參數的相關程式碼片段:

else if (sPar.compare(nPosCur, _tcslen(_T("data=")), _T("data=")) == 0)
    const size_t nStart = nPosCur + _tcslen(_T("data="));
        _ftprintf_s(stderr, _T("Input parameter was wrong[data]!\n"));
        return GL_ERR_INVALID_PARAM;

    const size_t nDataLen = nPosNext - nStart;
        _ftprintf_s(stderr, _T("Input parameter was wrong[data size]!\n"));
        return GL_ERR_INVALID_PARAM;

    strData.resize(nDataLen / 2);

    const auto *psData = sPar.data() + nStart;

    for (const auto &item : strData)
        iReadPars = _stscanf_s(psData, _T("%hhX"), (uint8_t *)&item);
            _ftprintf_s(stderr, _T("Input parameter was wrong[data format]!\n"));
            return GL_ERR_INVALID_PARAM;


此程式碼片段負責解析 `data=` 參數,確保輸入資料的格式正確。它會檢查資料長度是否為偶數,並逐個解析十六進位字元,將其儲存到 `strData` 變數中。如果輸入格式有誤,則會回報錯誤訊息。


GLHubUpdateToolCli.exe "/req=1&setup=40ab6e5100000400&data=8201F000"
GLHubUpdateToolCli.exe "/req=1&setup=C0aa6e6f00001000"  

[未有直接 Source 錨點，待確認] 這些命令也是用於與 USB 裝置進行通訊,但具體用途和先前的範例有所不同。

此外,也有一些 Bus Hound 7.04 的捕獲資料:

Device  Phase  Data                                                Description       Delta  Cmd.Phase.Ofs(rep)  Date        Time        
------  -----  --------------------------------------------------  ----------------  -----  ------------------  ----------  ------------
  50.0  OUT    40 ab 6e 51  00 00 08 00  45 45 45 45  45 45 45 45  @.nQ....EEEEEEEE  794us         4.2.0        2024-09-06  17:44:23.749
