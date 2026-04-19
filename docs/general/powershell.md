---
title: PowerShell
domain_tags:
  - firmware
  - sdk
task_tags:
  - build
authority_level: reference
is_deprecated: false
category: firmware
notion_id: 86133c8b-4131-4a9f-b38b-c7830432c654
notion_url: 'https://www.notion.so/PowerShell-86133c8b41314a9fb38bc7830432c654'
notion_updated_at: '2023-09-19T01:28:00.000Z'
exported_at: '2026-04-12T16:18:44.137Z'
is_summarized: false
relations: []
---

[UNSUPPORTED_BLOCK: child_page]

```python
if (-not ([System.Management.Automation.PSTypeName]'GLLib').Type) {
    Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;

public struct GL_FIRMWARE_VERSION
{
    public int major;
    public int minor;
    public int build;
    public int revision;
}

public struct SerialNumber
{
    [MarshalAs(UnmanagedType.ByValArray, SizeConst = 256)]
    public char[] value;
}

public class GLLib {

    private static string dllPath = @"E:\Device\Device_x64.dll";

    [DllImport(dllPath, CallingConvention = CallingConvention.Cdecl)]
    public static extern int GL_Initialize();

    [DllImport(dllPath, CallingConvention = CallingConvention.Cdecl)]
    public static extern void GL_GetPackageVersion(ref GL_FIRMWARE_VERSION pVer);

    [DllImport(dllPath, CallingConvention = CallingConvention.Cdecl)]
    public static extern IntPtr GL_GetModelName();

    [DllImport(dllPath, CallingConvention = CallingConvention.Cdecl)]
    public static extern int GL_GetSerialNumber(ref SerialNumber strSN);
}
"@
}

# Initialize the library
try {
    $initResult = [GLLib]::GL_Initialize()
    if ($initResult -eq 0) { # Assuming 0 is the success code
        Write-Host "Library initialized successfully."
    }
    else {
        Write-Host "Library initialization failed. Error code: $initResult"
        return
    }
}
catch {
    Write-Host "Error during library initialization: $_"
    return
}

# Initialize and Fetch firmware version
try {
    $pVer = New-Object GL_FIRMWARE_VERSION -Property @{
        major = 0
        minor = 0
        build = 0
        revision = 0
    }
    [GLLib]::GL_GetPackageVersion([ref]$pVer)
    Write-Host "Firmware Version: $($pVer.major).$($pVer.minor).$($pVer.build).$($pVer.revision)"
}
catch {
    Write-Host "Error fetching firmware version: $_"
}

# Fetch model name
try {
    $modelNamePtr = [GLLib]::GL_GetModelName()
    if ($modelNamePtr -eq [IntPtr]::Zero) {
        Write-Host "Model Name Pointer is null."
    }
    else {
        $modelName = [System.Runtime.InteropServices.Marshal]::PtrToStringAnsi($modelNamePtr)
        Write-Host "Model Name: $modelName"
    }
}
catch {
    Write-Host "Error fetching model name: $_"
}

# Initialize and Fetch serial number
try {
    $strSN = New-Object SerialNumber -Property @{
        value = New-Object 'char[]' 256
    }
    $result = [GLLib]::GL_GetSerialNumber([ref]$strSN)
    if ($result -eq 0) {
        $serial = -join $strSN.value
        Write-Host "Serial Number: $serial"
    }
    else {
        Write-Host "Failed to fetch Serial Number with error code: $result"
    }
}
catch {
    Write-Host "Error fetching serial number: $_"
}
```

[UNSUPPORTED_BLOCK: child_page]

```python
if (-not ([System.Management.Automation.PSTypeName]'GLLib').Type) {
    Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;

public struct GL_FIRMWARE_VERSION
{
    public int major;
    public int minor;
    public int build;
    public int revision;
}

public struct SerialNumber
{
    [MarshalAs(UnmanagedType.ByValArray, SizeConst = 256)]
    public char[] value;
}

public class GLLib {

    [DllImport(@"D:\PowerShell_Device\Device_x64.dll", CallingConvention = CallingConvention.Cdecl)]
    public static extern IntPtr GL_GetVCPString(string ModelName, string VCPCode, string SubVCPCode, bool bIsNeedScan);

}
"@
}

$FormatEnumerationLimit =-1
Get-CimInstance -ClassName "WmiMonitorID" -Namespace "root\wmi" > $null
$Monitors = Get-CimInstance -ClassName "WmiMonitorID" -Namespace "root\wmi"

$Data = ForEach ($Monitor in $Monitors){
    $Name = (-join [char[]] $Monitor.UserFriendlyName)
    if ($Name -like '*HP*') {  
        [PSCustomObject]@{
            Name = $Name
        }
    }
}
$firstRun = $true
$currentTime = Get-Date
Write-Host $currentTime
$Data | ForEach-Object {
    $monitorName = $_.Name
    $codes = @("8A00", "9E00", "9C00", "8C00")
    foreach ($code in $codes) {
        try {
            $macAddressPtr = [GLLib]::GL_GetVCPString($monitorName, "F5", $code, $firstRun)
            $firstRun = $false  # Set firstRun to false after the first run
            
            if ($macAddressPtr -eq [IntPtr]::Zero) {
                Write-Host "Mac Address Pointer is null."
            }
            else {
                $macAddress = [System.Runtime.InteropServices.Marshal]::PtrToStringAnsi($macAddressPtr)
                Write-Host "Monitor: $monitorName, Code: $code, Value: $macAddress"
            }
        }
        catch {
            Write-Host "Error fetching Mac Address: $_"
        }
    }
}
$currentTime = Get-Date
Write-Host $currentTime
```
