---
title: 'E22/E24i 1st & 2nd Scalar Update '
category: general
notion_id: 3e8cb702-558c-4375-881e-dd20f2a9605c
notion_url: >-
  https://www.notion.so/E22-E24i-1st-2nd-Scalar-Update-3e8cb702558c4375881edd20f2a9605c
notion_updated_at: '2025-07-15T02:58:00.000Z'
exported_at: '2026-04-06T11:24:17.667Z'
is_summarized: false
---

### ini 設定
```c
[GLHub]
USB20SupportPidVid = vid_03f0&pid_1847/vid_05e3&pid_0610
USB30SupportPidVid = vid_03f0&pid_0620/vid_05e3&pid_0620 


[Foundries_1]
HubBinFile=GL3523_OTY3H_TPV_HP_E24i_G4_Hub_FW6851sig.bin
PanelType=
Scaler1stBinFiles
Scaler2ndBinFiles

[Foundries_2]
HubBinFile=
PanelType=
Scaler1stBinFiles
Scaler2ndBinFiles


```
### E22 G4 ini 設定
### E24i G4 ini 設定
## LNT E22 G4
### 1st 
```c
HP_E22G4_MS4078_AUOM215HAN_20220530_AIM121_Service_REDUCE24K_S_Header
HP_E22G4_MS4078_INXM215HCA_20220530_IIM121_Service_REDUCE24K_S_Header
HP_E22G4_MS4078_LM215WF9SSC3_20220530_LIM121_Service_REDUCE24K_S_Header
```
### 2nd
```c
HP_TPV_E22G4_MT9700_PanelINXM215HCA_IIM221a_V1.0.1.0_20220613_Service_S_Header_049E
HP_TPV_E22G4_MT9700_PanelLGDLM215WF9_LIM221a_V1.0.1.0_20220613_Service_S_Header_499F
```
## LNT E24 G4
### 1st 
```c
HP_E24iG4_MS4078_AUOM240UAN02_3_20220530_AIM121_Service_REDUCE24K_S_Header
HP_E24iG4_MS4078_BOEMV240WUMN51_20220530_BIM121_Service_REDUCE24K_S_Header
HP_E24iG4_MS4078_LGDLM240WUASSD1_20220530_LIM121_Service_REDUCE24K_S_Header
```
### 2nd
```c
HP_TPV_E24iG4_MT9700_PanelBOEMV240WUM_4M51_BIM221a_V1.1.1.0_20220613_Service_S_Header_0049
HP_TPV_E24iG4_MT9700_PanelLGDLM240WUA_LIM221a_V1.1.1.0_20220613_Service_S_Header_2251
```
## Qisda E22 G4
### 1st
```c
HP_E22_TSUMZ_20220602_AIM121_Service_S_Header_2BB7
```
### 2nd
```c
2nd_E22_20220524_1.0.2.0_AIM241a_BBM241a_IIM241a_HIM121a_MCM107_S_Header
```
## Qisda E24i G4
### 1st
```c
HP_E24i_TSUMZ_20220602_AIM121_Service_S_Header_3C02.bin
HP_E24i_TSUMZ_20220602_LIM121_Service_S_Header_1E60
```
### 2nd
```javascript
2nd_E24i_20220524_1.0.2.0_AIM241a_BBM242a_LIM241a_MCM106_S_Header
```
為了讓同一個model 可以讓兩個代工廠相容Update Tool ，在此參數加入多組USB20SupportPidVid & USB30SupportPidVid，藉此根據不同的PID/VID指向Foundries_1 & Foundries_2 載入不同的參數
存放scaler 1st bin 檔，會根據Panel Type 已經讀到的scaler hw version 判斷要讀取哪一個scaler bin檔，因為1st & 2nd 共用同一個panel type 參數，為了包含所有用到的panel type，所以沒用到的panel type 會用 *** 表示，藉此skip掉沒用到的panel type
