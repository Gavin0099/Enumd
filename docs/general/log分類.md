---
title: Log分類
domain_tags:
  - firmware
  - tools
task_tags:
  - log
authority_level: source
is_deprecated: false
category: firmware
notion_id: 174e63f3-f0c2-4c93-a5b6-8bd8edab03af
notion_url: 'https://www.notion.so/Log-174e63f3f0c24c93a5b68bd8edab03af'
notion_updated_at: '2024-03-27T06:30:00.000Z'
exported_at: '2026-04-06T13:18:52.611Z'
is_summarized: false
relations: []
---

## 不必要的log
- 
## 更好懂得log
## 不知道誰呼叫的
::DbgPrint(XD_INFO, "--\tDynamic:\n");
::DumpBuffer(XD_INFO, (uint8_t *)hubInfo.StringDesc[1], GL_STRING_DESCRIPTOR_LENGTH_MAX / 2);
2024-03-27 09:49:08 [info ] 000: 43323330 30303033 30640000 00000000
2024-03-27 09:49:08 [info ] 010: 00000000 00000000 00000000 00000000
Running Mode 43
SS Port Number 32
HS Port Number 33
SS Connection Status 30
HS Connection Status 30
FS Connection Status 30
LS Connection Status 30
Charging Ports 33
Non removable Ports 30
7394 Bonding 64
```c++
2024-03-27 14:15:13 [info ] --	Basic:8742390735902074239073590208700

2024-03-27 14:15:13 [info ] --	Tool Version: 8
2024-03-27 14:15:13 [info ] --	Mask Project Code: 7423
2024-03-27 14:15:13 [info ] --	Mask Project Hardware: 9
2024-03-27 14:15:13 [info ] --	Mask Project Firmware: 07
2024-03-27 14:15:13 [info ] --	Mask Project IC Type: 359020
2024-03-27 14:15:13 [info ] --	Running Project Code: 7423
2024-03-27 14:15:13 [info ] --	Running Project Hardware: 9
2024-03-27 14:15:13 [info ] --	Running Project Firmware: 07
2024-03-27 14:15:13 [info ] --	Running Project IC Type: 359020
2024-03-27 14:15:13 [info ] --	Firmware Version: 8700


2024-03-27 14:15:13 [info ] --	Dynamic:
2024-03-27 14:15:13 [info ] 000: 43323330 30303033 30640000 00000000
2024-03-27 14:15:13 [info ] 010: 00000000 00000000 00000000 00000000

2024-03-27 14:15:13 [info ] --	Running Mode: C
2024-03-27 14:15:13 [info ] --	SS Port Number: 2
2024-03-27 14:15:13 [info ] --	HS Port Number: 3
2024-03-27 14:15:13 [info ] --	SS Connection Status: 0
2024-03-27 14:15:13 [info ] --	HS Connection Status: 0
2024-03-27 14:15:13 [info ] --	FS Connection Status: 0
2024-03-27 14:15:13 [info ] --	LS Connection Status: 0
2024-03-27 14:15:13 [info ] --	Charging Ports: 3
2024-03-27 14:15:13 [info ] --	Non-removable Ports: 0
2024-03-27 14:15:13 [info ] --	Bonding: d



2024-03-27 14:15:13 [info ] --	Vendor:01000000000000000000000000000 A

2024-03-27 14:15:13 [info ] --	3rd Party Vendor Ver. Info: 1
2024-03-27 14:15:13 [info ] --	DFP Device 0
2024-03-27 14:15:13 [info ] --	MStar Scalar 0
2024-03-27 14:15:13 [info ] --	Realtek Scalar 0
2024-03-27 14:15:13 [info ] --	Richtek PD 0
2024-03-27 14:15:13 [info ] --	TI 0
2024-03-27 14:15:13 [info ] --	STM PD 0
2024-03-27 14:15:13 [info ] --	ROHM PD 0
2024-03-27 14:15:13 [info ] --	Eevertech PD 0
2024-03-27 14:15:13 [info ] --	HP Proprietary 0
2024-03-27 14:15:13 [info ] --	Belkin Arbitrator 0
2024-03-27 14:15:13 [info ] --	GL PD 0
2024-03-27 14:15:13 [info ] --	GlMasterKit 0
2024-03-27 14:15:13 [info ] --	Primax 0
2024-03-27 14:15:13 [info ] --	HID ISP tool 0
2024-03-27 14:15:13 [info ] --	Novatek Scalar 0
2024-03-27 14:15:13 [info ] --	Hub index 0
2024-03-27 14:15:13 [info ] --	Synaptics 0
2024-03-27 14:15:13 [info ] --	ISP Extend function 0
2024-03-27 14:15:13 [info ] --	Parade ID 0

```
