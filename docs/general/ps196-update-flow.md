---
title: PS196 Update Flow
domain_tags:
  - firmware
task_tags:
  - firmware-update
  - sop
authority_level: source
is_deprecated: false
category: firmware
notion_id: fb94e559-a9af-4c7f-9fec-42eac18146d3
notion_url: 'https://www.notion.so/PS196-Update-Flow-fb94e559a9af4c7f9fec42eac18146d3'
notion_updated_at: '2026-01-21T09:34:00.000Z'
exported_at: '2026-04-06T13:16:06.253Z'
is_summarized: false
relations: []
---

PS196 I2C slave address：0x10
SPI有兩個FIFO，
FIFO0 page address：0x3c；
FIFO1 page address：0x40；
首先檢查哪個 FIFO 可用，然後選擇一個 FIFO 來下載韌體檔案。
### Step 1 : Write Protection disable 
- Write_Protect_Top_Off()
### Step 2 : Check FIFO status , choose one FIFO to download bin file  
- Check_FIFO_Status()
### Step 3 : Erase SPI ROM 
### Step 4 : Download SPI ROM
### Step 5 : Back FW from SPI ROM
### Step 6 : Compare the backup file and original file , then finish. 
## Erase (單位 4k)
- Erase_Uni(0x000000)
## DownLoad f/w
- Spi_FIFO0_Init()
- Write_Enable_FIFO0()
- BUSY_STATUS = Rdsr_FIFO0() & 0x01
- Rdsr_Clr_FIFO0()
- res =Spi_FIFO0_Write(0x000100, data):
- BUSY_STATUS = Rdsr_FIFO0() & 0x01
- Rdsr_Clr_FIFO0()
## BackUp f/w 
- Spi_FIFO0_Read(0x000000, 0x100):
- Spi_FIFO0_Read(0x000100, 0x100):
- Spi_FIFO0_Read(0x000200, 0x100):
