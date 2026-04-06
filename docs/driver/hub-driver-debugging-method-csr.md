---
title: Hub Driver Debugging method (CSR)
category: driver
notion_id: 8c4a4dcd-5105-4f00-ba45-fe81aded2f9f
notion_url: >-
  https://www.notion.so/Hub-Driver-Debugging-method-CSR-8c4a4dcd51054f00ba45fe81aded2f9f
notion_updated_at: FORCE_REFRESH
exported_at: '2026-04-06T11:19:06.516Z'
is_summarized: false
---

## Class & Device Filter driver judgment method
1.Start —> Right click —> Computer Management
2.Device Manager —> Universal Serial Bus controllers
3. Look for the information shown in the screenshot below for each Device (you can find one in 2.0 or 3.0)
4. If you find it Driver—> Driver Details to see if there is glusbflt.sys
5. Observe which file version is
---
## SC query to determine the driver mode
Obtains and displays information about the specified service, driver, type of service, or type of driver.
### sc query glusbflt
> **Note:** Confirm that the driver is installed and the GL Hub is plugged in
RUNNING : There is a GL Hub plugged in, there is a driver installed
STOPPABLE : GL Hub not plugged in, driver installed
[SC] EnumQueryServicesStatus:OpenService FAILED 1060 : driver not installed
### sc query glusbfltservice
> **Note:** Confirm whether the service of the device filter driver is hung up
RUNNING : Have installed device filter driver
[SC] EnumQueryServicesStatus:OpenService FAILED 1060 : device filter driver not installed
