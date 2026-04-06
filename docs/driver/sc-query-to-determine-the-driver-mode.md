---
title: SC query to determine the driver mode
domain_tags:
  - hub
  - driver
task_tags:
  - install
  - debug
  - spec
authority_level: source
is_deprecated: false
category: hub
notion_id: e08705d0-f901-4499-80c1-430a36887e50
notion_url: >-
  https://www.notion.so/SC-query-to-determine-the-driver-mode-e08705d0f901449980c1430a36887e50
notion_updated_at: '2022-12-13T08:49:00.000Z'
exported_at: '2026-04-06T13:11:38.951Z'
is_summarized: false
relations: []
---

## Purpose
Obtains and displays information about the specified service, driver, type of service, or type of driver.
### sc query glusbfltsc
> **Note:** Confirm that the driver is installed and the GL Hub is plugged in
RUNNING : There is a GL Hub plugged in, there is a driver installed
STOPPABLE : GL Hub not plugged in, driver installed
[SC] EnumQueryServicesStatus:OpenService FAILED 1060 : driver not installed
### sc query glusbfltservice
> **Note:** Confirm whether the service of the device filter driver is hung up
RUNNING : Have installed device filter driver
[SC] EnumQueryServicesStatus:OpenService FAILED 1060 : device filter driver not installed
