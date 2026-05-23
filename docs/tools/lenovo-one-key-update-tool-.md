---
title: 'Lenovo One Key Update Tool '
domain_tags:
  - tools
  - security
task_tags: []
authority_level: source
is_deprecated: false
category: tools
notion_id: 104302e4-2b34-45fa-be86-a1ba192ae5dc
notion_url: >-
  https://www.notion.so/Lenovo-One-Key-Update-Tool-104302e42b3445fabe86a1ba192ae5dc
notion_updated_at: '2026-01-21T09:34:00.000Z'
exported_at: '2026-05-23T04:48:59.614Z'
is_summarized: false
relations:
  manual: []
  inferred: []
---

[DOWNLOAD FILE: file](https://prod-files-secure.s3.us-west-2.amazonaws.com/98ac40db-c3ab-4237-a4c9-5a9cd8cc0a6a/92a512c9-0bdb-45b8-a3c5-33f5a0b26a0a/Lenovo_ISP_Tool_Instruction_General_TW_v0.0.5_20241227.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RPNTSM2O%2F20260523%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260523T044859Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGQaCXVzLXdlc3QtMiJIMEYCIQC884%2Fyc6G6FwFndU0%2B84cdJjveXkLenZU1q8RAwdB6fQIhAKwKdwm0H%2FmeIM0Op5emdMNcrkDsD8B7q2jP0lh66cjkKv8DCC0QABoMNjM3NDIzMTgzODA1IgxwgFqQ4rv1iExDPDoq3ANfa0zZYX0QAX85HcGZJAa7bC1yamQi0h7mdMsjk7boBQTRqJHy00Ikk5LjSfwb6kbDKctGtK9UoA1UI2J5I6TO8CLmSnweuhFjzkv3i3RPDS2Hjnm8C5TC8UDvqgKZV8V%2F0mu7%2B30gaVWN8OdxzRaOJ69cAC90Zsg4EWyIfjMoh2wlF%2BAPUX3kRwiS1HCMgfA82i14Gs%2BVTKPUNQWgfGU4%2Fy71ka5re1DvqrbSMrQdraJyDSalJU7U6C5x0KmwAWo58cilV3lxM7s4MSK33nszcsc8W30jCgFLzGqPz5RmWfXffzDPJvJrlTGq%2Bx4FA6wexDO6Ur0s%2BVwcM4mXT6Xuwsg%2FIUy%2FTdue5a1jOPY%2FDkqK3PiYkum%2Bh7gSSt6dzdm%2B5fAAyrZ5j9MQlSx3hnmM%2F2nZ5n3uNpuaQxiy6bl6K8VbHSkVeZjVW5H7IibhsSNU%2FWTy72Gsxk33sjVS%2Bk0vDo21pR6thWS502XtPQNy1%2BuGjRu4XMA9hmh6%2Bf6TZGFXbgEyYzUugQOq0rpoFZXy6OPhkU%2F6vTKOJX3ed%2BFcXqqPWfE6bc6IV%2BVvhFaQzLSEkXXGlFMbp3WNs%2BIyE8RCOwbHTyxmT3WaQXuYInXgMdQCIZg8YXYzmA4o%2BzDqzMTQBjqkAdumI0%2FUNN8MVOktBJfbQ8Ub4y20Ilp5uYxSK%2Fqr3%2F%2By%2F4jegWmfmEi7T26NMZwq85qNx%2B%2BeLIl1%2BSGlML3y7hhGmfdRjWVvpcL7%2BkB31ww%2FTYWusH8uRZEGO1Y1Jy4QA7xsK%2BiaAxPmVq%2B%2Fb1mIL3nYCrbtMW7hJxjqxXkes%2FnOp0Qka3uSdOC4hDuIeyMzJDNhsRMPV%2Fp5feTNQwElTlFe7250&X-Amz-Signature=4898d1a1b27d8caec78090456703b03c3a98fa262fc8ab2ef1dbc66c7e7046dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

## XML 參數說明

### isp_setting.json

```javascript
{
  "baseSetting": {
    "windowTitle": "Lenovo monitor firmware service tool",
    "mtmId": "63A2101C12",
    "OSDID": "0.1"
  },
  "firmwareList": [
    {
	 "displayName": "USB HUB 1",
	 "comId": "HA-1",
	 "path": "Firmware/Hub/HubFW/GL3525-OVY1L_Hub_Lenovo_P27QD_40_FW8021.bin",
	 "firmwareVersion": "7600",
	 "type": "Hub",
	 "postDelay": 0,
	 "autoReset": false
    },
	{
      "displayName": "USB HUB 2",
      "comId": "HA-1",
      "path": "Firmware/Hub/HubFW/GL3523-OV1S5_Hub_Lenovo_P27QD_40_L2_FW8062.bin",
      "firmwareVersion": "7700",
      "type": "Hub",
      "postDelay": 0,
      "autoReset": false
    },
    {
	  "displayName": "PD",
      "comId": "N/A",
      "firmwareVersion": "0.22T08",
      "type": "PD",
      "installedVersion": "N/A",
      "postDelay": 10
    },
    {
      "displayName": "Scaler",
      "comId": "SA",      
      "type": "Scaler",
	  "firmwareVersion": "N/A",
	  "installedVersion": "N/A",
      "postDelay": 10
    }
  ],
  "featuresSetting": {
		"enableOfflineUpdate": false,
        "enableMultiPanel": false,
		"enableSetOSDMenu":false,
		"enableMSC":false,
		"disableSleep":false
  }
}
```

- baseSetting : One Key Update Tool UI 基本設定

  - windowTitle
  
  - mtmId
  
  - OSDID

### updater_setting_list.json

### PD command 

```javascript
TypeCDump.exe -x -f 0 -t 3 0xAC XXX.bin
```
