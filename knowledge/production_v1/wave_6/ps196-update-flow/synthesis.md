以下是基於提供的內容所撰寫的 PS196 Update Flow 文件:

# PS196 Update Flow

PS196 是一款 I2C 從設備，其 I2C 從設備地址為 `0x10`。PS196 內部有兩個 SPI FIFO，分別位於 `0x3c` 和 `0x40` 頁地址。在進行韌體更新時，需要先檢查哪個 FIFO 可用，然後選擇一個 FIFO 來下載韌體檔案。

[未有直接 Source 錨點，待確認] PS196 的韌體更新流程包含以下 6 個步驟:

### Step 1: 關閉寫保護
執行 `Write_Protect_Top_Off()` 函數來關閉寫保護。

### Step 2: 檢查 FIFO 狀態，選擇一個 FIFO 下載 bin 檔案
執行 `Check_FIFO_Status()` 函數來檢查 FIFO 狀態，並選擇一個可用的 FIFO 進行後續操作。

### Step 3: 擦除 SPI ROM
執行 `Erase_Uni(0x000000)` 函數來擦除 SPI ROM。

### Step 4: 下載 SPI ROM
1. 初始化 FIFO0: `Spi_FIFO0_Init()`
2. 寫入使能 FIFO0: `Write_Enable_FIFO0()`
3. 檢查 BUSY 狀態: `BUSY_STATUS = Rdsr_FIFO0() & 0x01`
4. 清除 RDSR 狀態: `Rdsr_Clr_FIFO0()`
5. 寫入韌體資料: `res =Spi_FIFO0_Write(0x000100, data)`
6. 檢查 BUSY 狀態: `BUSY_STATUS = Rdsr_FIFO0() & 0x01`
7. 清除 RDSR 狀態: `Rdsr_Clr_FIFO0()`

### Step 5: 從 SPI ROM 備份韌體
1. 從 FIFO0 讀取 0x000000 ~ 0x000100 的資料: `Spi_FIFO0_Read(0x000000, 0x100)`
2. 從 FIFO0 讀取 0x000100 ~ 0x000200 的資料: `Spi_FIFO0_Read(0x000100, 0x100)`
3. 從 FIFO0 讀取 0x000200 ~ 0x000300 的資料: `Spi_FIFO0_Read(0x000200, 0x100)`

### Step 6: 比較備份檔案與原始檔案，完成更新

- [`Camera 透過我們驗證 code sign`](code-sign/camera-透過我們驗證-code-sign.html)：介紹 Camera 的 code sign 驗證流程。
- [`Code sign Flow`](code-sign/code-sign-flow.html)：介紹 Genesys Logic 的 code sign 流程。
- [`GL Hub Code Sign Recovery Flow`](hub/gl-hub-code-sign-recovery-flow.html)：介紹 GL3523、GL3525 和 GL3590 的 code sign 恢復流程。