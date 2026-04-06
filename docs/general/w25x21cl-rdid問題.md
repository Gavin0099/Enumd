---
title: W25X21CL RDID問題
category: general
notion_id: 64dac904-2fa3-40cb-9ea1-cd22fcc17cb8
notion_url: 'https://www.notion.so/W25X21CL-RDID-64dac9042fa340cb9ea1cd22fcc17cb8'
notion_updated_at: '2022-12-13T08:40:00.000Z'
exported_at: '2026-04-06T11:21:28.140Z'
is_summarized: false
---

## 緣由
W25X21CL和W25X20 問到的 rdid 會是一樣的
但是W25X21CL 是有 Special Unprotect，所以必須要有別的方式來判斷 
所以W25X21CL 改成Read Unique ID Number 來判斷是否為這顆 Flash 
但是遇到一個問題，Fw 原本詢問Unique ID Number 應該要下 4個Byte 才會讀到Unique ID Number，但是目前fw只有下3個byte  command ，導致Read Unique ID Number的第一個Byte有可能是 0x00 or 0xFF
> **Note:** Firmware Eason 解釋:
第一個byte的0xFF其實是GL3523 firmware在initial時有將data line設為GPIO並pull high省電，所以下command後才會出現0xFF
所以如果是GL3590 FW應該第一個byte會是0x00
## 解法
先在Flash Table 新增兩組W25X21CL  ，一組 RDID (0x00 0x95)，一組 RDID (0xFF 0x95)來避掉這個問題
