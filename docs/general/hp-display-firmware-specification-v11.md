---
title: HP DISPLAY FIRMWARE SPECIFICATION V1.1
category: general
notion_id: 6c2f377a-5ddc-450f-8301-2f6743d5bb38
notion_url: >-
  https://www.notion.so/HP-DISPLAY-FIRMWARE-SPECIFICATION-V1-1-6c2f377a5ddc450f83012f6743d5bb38
notion_updated_at: '2026-01-21T09:29:00.000Z'
exported_at: '2026-04-06T11:24:06.099Z'
is_summarized: false
---

# Chapter 3 Firmware Update
## 3.1	Hardware Requirements
### 3.1.1	Dual Images
為了支援firmware update ，Flash 空間必須大於兩個firmware fw 的大小，如果firmware 有跟著時間變大，也必須包含擴大的空間
強制要求的原因為，如果某一個區塊的firmware 因為某些原因損壞，boot code 也能從另一個區塊的firmware 啟動
### 3.1.2	USB Interface
USB interface 是首選，除非HP因為特定原因放棄，否則要update firmware應該都要透過USB interface 來更新
## 3.2	Firmware Requirements
### 3.2.1	Security
Monitor 必須支援HP’s firmware security requirements 去防止未授權的firmware 被更新，因為USB initerface不安全，所以必須在MCU來檢查signature，相關詳細訊息，參閱HP Firmware Security Requirements” in appendix for detail
### 3.2.2 Inbox driver for firmware update ***
使用專屬的driver去update會導致許多問題
- driver安裝和移除浪費時間
- 因為driver 安裝和移除會導致PC和windows OS的相容性
- 維護專屬的driver會浪費RD的資源
- 為Windows 開發專屬的driver 不適用Linux 或是Mac ，甚至為Windwos 10 開發的driver 可能不適用未來的Windows
HP 強烈鼓勵IC vendor 使用inbox driver ，強烈推薦USB HID driver，因為他已經嵌入所有現代操作系統中數十年
### 3.2.3 Soft reset after firmware update
firmware update tool 必須在firmware update完畢後下 reset command ，讓ic 不用透過ac on/off 來做reset動作
## 3.3 Customer Firmware Update Tool
### 3.3.1	One Tool
ODM必須提供一個firmware update Tool 
### 3.3.2 Multiple Languages
firmware update tool 必須偵測OS使用的語系，必且將GUI啟動為該語言，目前support 的 語言有
```c++
1. English
2. French
3. German
4. Italian
5. Dutch
6. Spanish
7. Japanese
8. Portuguese
9. Traditional Chinese
10. Simplified Chinese
```
### 3.3.3 Operating System
firmware update Tool必須支援下面 OS
- Windows 8.1
- Windows 10
- Windows 11
firmware update Tool 可能需要支援HP單獨需求的下列OS
- Linux (by request)
- Chrome OS (by request)
- Mac OS (by request)
### 3.3.4 Security
所有的dll 和 exe檔都必須有 sha256 code sign
### 3.3.5 Silent install mode and other special mode
為了支援企業遠端更新數千台Monitor，這個tool必須支援 silent install mode，並且有提供log和return code 的Microsoft SCCM (or Microsoft Endpoint Manager)
### 3.3.6 Leverage from HP Firmware Installer (OCI)
To minimize ODM & Vender’s efforts to development new tool and new DLL for every new project, HP request ODM and Vender to following HP Firmware Installer SDK designs.  HP Firmware Installer, as known as OCI, is a HP internal developed firmware update tool.  The goal is to leverage UI designs and unify DLL API of all future HP displays.
HP provides sample code, text, DLL API, and UI examples in below.  HP will help DOM & Vendor to develop this firmware update tool.  For any further detail programming questions or resources, please contact display firmware architect (randolph.yen@hp.com).
ODM can get latest SDK code from following link. Please contact Randolph if ODM wants to access the link.
https://drive.google.com/drive/folders/108O01uVY0g7ENauia53wggUJovje8i7f?usp=sharing
### 3.3.7 Other requirements
右鍵開啟tool 必須顯示正確版本
firmware update tool必須自動移除，update 後，除了 log檔，不會在電腦留下任何文件
如果monitor 的 firmware是最新版本，就不會繼續update，除非使用特殊command 強制update ，否則只要顯示此firmware 是最新版本即可
