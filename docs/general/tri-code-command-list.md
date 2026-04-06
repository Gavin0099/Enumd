---
title: Tri Code Command List
domain_tags:
  - hub
  - code-sign
  - monitor
  - firmware
  - tools
task_tags:
  - code-sign
  - spec
  - config
authority_level: source
is_deprecated: false
category: hub
notion_id: 19164f6b-c656-8022-972e-eaf58a46a950
notion_url: 'https://www.notion.so/Tri-Code-Command-List-19164f6bc6568022972eeaf58a46a950'
notion_updated_at: '2026-01-21T09:36:00.000Z'
exported_at: '2026-04-06T13:10:56.738Z'
is_summarized: false
relations: []
---

## ✅ check
Description: Check code sign of firmware file.
Usage:
```plain text
GLUpdateTool.exe check -p=<file_path> -ty=<type> [-fw=<firmware>]
```
Parameters:
Examples:
```plain text
GLUpdateTool.exe check -p=firmware.bin -ty=e
GLUpdateTool.exe check -p=firmware.bin -ty=r -fw=scaler
```
---
## ✅ dump
Description: Dump specific firmware from device.
Usage:
```plain text
GLUpdateTool.exe dump -id=<device_id> -p=<output_path> [-fw=<firmware>] [-i=<index>] [-ar=<area>]
```
Parameters:
Examples:
```plain text
GLUpdateTool.exe dump -id=1 -p=dump.bin
GLUpdateTool.exe dump -id=1 -fw=hub -i=2 -ar=both -p=dump.bin
```
---
## ✅ erase
Description: Erase specific firmware on device.
Usage:
```plain text
GLUpdateTool.exe erase -id=<device_id> [-fw=<firmware>] [-i=<index>] [-ar=<area>]
```
Parameters:
Examples:
```plain text
GLUpdateTool.exe erase -id=1
GLUpdateTool.exe erase -id=1 -fw=hub -i=1 -ar=bank1
```
---
## ✅ errorcode
Description: Show error code description.
Usage:
```plain text
GLUpdateTool.exe errorcode [-a] [-c=<error_code>]
```
Parameters:
Examples:
```plain text
GLUpdateTool.exe errorcode -a
GLUpdateTool.exe errorcode -c=0x800A
```
---
## ✅ help
Description: Print the help function.
Usage:
```plain text
GLUpdateTool.exe help [command]
```
Examples:
```plain text
GLUpdateTool.exe help
GLUpdateTool.exe help dump
```
---
## ✅ info
Description: Display device information.
Usage:
```plain text
GLUpdateTool.exe info [-c] [-hu] [-sc]
```
Parameters:
Examples:
```plain text
GLUpdateTool.exe info -c
GLUpdateTool.exe info -c -hu -sc
```
---
## ✅ isp
Description: ISP firmware update.
Usage:
```plain text
GLUpdateTool.exe isp -id=<device_id> -fw=<firmware> -i=<index> -p=<path> [-ini=<ini_file>] [-re=<0|1>]
```
Parameters:
Examples:
```plain text
GLUpdateTool.exe isp -id=1 -fw=hub -i=1 -p=update.bin
GLUpdateTool.exe isp -id=1 -fw=scaler -i=2 -p=update.bin -ini=config.ini -re=1
```
---
## ✅ ispcs
Description: ISP code sign firmware.
Usage:
```plain text
GLUpdateTool.exe ispcs -id=<device_id> -p=<path> [-fw=<firmware>] [-i=<index>] [-re=<0|1>]
```
Parameters:
Examples:
```plain text
GLUpdateTool.exe ispcs -id=1 -p=signed.bin
GLUpdateTool.exe ispcs -id=1 -fw=hub -i=1 -p=signed.bin -re=1
```
---
## ✅ request
Description: Send USB setup packet to control pipe.
Usage:
```plain text
GLUpdateTool.exe request -id=<device_id> -set=<setup_packet> [-da=<input_data>]
```
Parameters:
Examples:
```plain text
GLUpdateTool.exe request -id=1 -set=4034567812340000
GLUpdateTool.exe request -id=1 -set=4034567812340100 -da=12
```
---
## ✅ reset
Description: Reset the device.
Usage:
```plain text
GLUpdateTool.exe reset -id=<device_id> [-fw=<firmware>] [-i=<index>] [-bb]
```
Parameters:
Examples:
```plain text
GLUpdateTool.exe reset -id=1
GLUpdateTool.exe reset -id=1 -fw=hub -i=1 -bb
```
---
## ✅ status
Description: Display device status.
Usage:
```plain text
GLUpdateTool.exe status -id=<device_id> [-p=<port>] [-l=<hub_link>] [-cp=<usb_c_port>]
```
Parameters:
Examples:
```plain text
GLUpdateTool.exe status -id=1
GLUpdateTool.exe status -id=1 -p=2 -l=5
```
---
## ✅ system
Description: Perform system operations.
Usage:
