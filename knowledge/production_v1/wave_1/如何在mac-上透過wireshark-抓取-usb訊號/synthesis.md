以下是如何在 Mac 上透過 WireShark 抓取 USB 訊號的詳細步驟:

# 如何在 Mac 上透過 WireShark 抓取 USB 訊號

## 1. 下載 WireShark
首先需要前往 [WireShark 官網](https://www.wireshark.org/download.html) 下載適用於 Mac 的版本。

## 2. 檢查 System Integrity Protection (SIP) 狀態
在 Mac 上使用 WireShark 抓取 USB 訊號時,需要確認 SIP 是否已被禁用。可以透過以下命令檢查 SIP 狀態:

```
csrutil status
```

如果 SIP 未被禁用,則需要進入 macOS Recovery Mode 並執行以下命令來禁用 SIP:

```
csrutil disable
```

## 3. 設定 USB 權限
由於 USB 也有權限問題,需要先設定 USB 權限。可以執行以下命令:

```
sudo chown -R $(whoami) /System/Library/Extensions
sudo chmod -R 755 /System/Library/Extensions
```

## 4. 找到 USB 裝置
因為每台電腦的 USB 裝置可能不同,需要找到以 "XHC" 開頭的裝置。可以執行以下命令來查看:

```
ioreg -p IOUSB -w0 | grep -i "XHC"
```

以下面的 "XHC20" 為例進行後續操作。

## 5. 安裝 chmodbpf.pkg
有時在開啟 WireShark 時可能會遇到無法捕獲的問題,這時需要安裝 chmodbpf.pkg 套件。

## 6. 開啟 WireShark 並選擇 USB 裝置
開啟 WireShark 後,可以在介面中選擇剛剛找到的 "XHC20" USB 裝置。

## 7. 使用 Filter 功能
在 WireShark 中,可以使用 Filter 功能來篩選特定的 USB 裝置。例如,如果要只抓取 USB_HID_DEVICE 的訊號,可以使用以下 Filter:

```
usb.device_descriptor.idVendor == 0x046d && usb.device_descriptor.idProduct == 0xc52b
```

## 8. 其他參數設定
除了上述步驟,WireShark 還提供了許多其他參數設定,可以參考[官方文件](https://www.wireshark.org/docs/wsug_html_chunked/)進行更多的自訂。

以上就是在 Mac 上透過 WireShark 抓取 USB 訊號的完整步驟。如果在過程中遇到任何問題,可以參考相關的上下文資訊進行排查。