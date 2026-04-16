以下是根據提供的內容所撰寫的 RickTek 7880 PD Update Flow 文件:

# RickTek 7880 PD Update Flow

## RickTek PD Head 格式
目前 RickTek PD 更新使用的參數如下:
- Signature: 用於判斷 PD 檔案是否正確。
- [未有直接 Source 錨點，待確認] Length: 要更新的資料長度。

### Slave Address 設定
Slave Address 是透過電壓準位來決定的，因為工具無法直接知道。目前是透過韌體 hot code 放在工具字串的第三個 RickTek PD 參數來決定 Slave Address。
> **Note:** Slave Address 1 對應 0x1F，Slave Address 2 對應 0x2F。

進入 ISP 模式時，預設的 Slave Address 為 0x1E。如果透過此 Slave Address 傳送 PD 資料時收到 A-NACK(Mask Code)，則需要再次使用 0x1E 命令進入 ISP 模式。由於 Hub 並未回傳 I2C 狀態，因此只能透過讀取 PD 資料的方式來判斷是否回到 Mask Code。如果讀取的 PD 資料全為 0xFF，則表示進入了 Mask Code，此時需要將更新的 Slave Address 改為 0x1F。

程式更新和驗證流程可直接參考 RickTek PD 更新規格文件，此處未做特別說明。

1. [`RickTek PD In System Programming Spec V1.0`](path/to/ricktek-pd-isp-spec.pdf)
2. [`Etoken System Code View`](etoken-system-code-view-.html)
3. [`eToken 安全簽章系統技術說明`](etoken-安全簽章系統技術說明.html)
4. [`HID Code Sign Update Rule`](hid-code-sign-update-rule.html)