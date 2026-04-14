以下是如何在 Mac 上透過 WireShark 抓取 USB 訊號的完整 Markdown 報告:

# 如何在 Mac 上透過 WireShark 抓取 USB 訊號


1. 前往 [WireShark 官網](https://www.wireshark.org/)下載對應版本的 WireShark。
2. 確認是否開啟 System Integrity Protection (SIP)。如果開啟的話，無法在 WireShark 中抓取 USB 訊號。可以使用以下命令檢查 SIP 狀態:


3. 如果 SIP 未被停用，需要進入 macOS Recovery Mode 並執行以下命令來關閉 SIP:


4. 由於 USB 也有權限問題，需要先開啟相關權限。可以使用以下命令:

   sudo chmod 644 /dev/bpf*

5. 因為每台電腦的 USB 設備不同，需要找到以 `XHC` 開頭的設備。以下是一個範例:


   這裡以 `XHC20` 為例進行後續操作。

## 使用 WireShark 抓取 USB 訊號

1. 開啟 WireShark 並選擇相應的設備。如果遇到無法捕獲的問題，需要安裝 `chmodbpf.pkg`。

2. 選擇 `XHC20` 設備開始捕獲 USB 訊號。

3. 如果要過濾特定的 USB 設備，可以使用以下 WireShark 過濾器:

   usb.device_address == 3

   這裡的 `3` 是 USB 設備的位置識別碼。

4. 如果要捕獲所有的 USB 控制命令，可以使用以下過濾器:

   usb.transfer_type == 0x0

5. 更多 WireShark 過濾器參數可以參考[官方文檔](https://www.wireshark.org/docs/wsug_html_chunked/ChWorkDisplayFilterSection.html)。


透過以上步驟,您就可以在 Mac 上使用 WireShark 成功地捕獲 USB 訊號並進行分析了。如果在過程中遇到任何問題,可以參考相關的[命令行卸載驅動程序](https://example.com/driver/command-line-uninstall-driver.html)和[E27m & E34m 驅動程序安裝失敗](https://example.com/driver/e27m-e34m-driver-install-fail.html)等資訊。