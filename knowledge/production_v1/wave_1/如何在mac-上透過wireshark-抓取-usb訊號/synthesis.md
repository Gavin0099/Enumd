以下是如何在 Mac 上透過 WireShark 抓取 USB 訊號的詳細步驟:

# 如何在 Mac 上透過 WireShark 抓取 USB 訊號

## 1. 下載 WireShark
首先，請至 [WireShark 官網](https://www.wireshark.org/download.html) 下載適用於 Mac 的版本。

## 2. 確認 System Integrity Protection (SIP) 狀態
在 Mac 上使用 WireShark 抓取 USB 訊號時，需要確保 System Integrity Protection (SIP) 已被關閉。您可以透過以下命令檢查 SIP 狀態:

```
csrutil status
```

如果 SIP 未被關閉，您需要進入 macOS Recovery Mode 並執行以下命令來關閉 SIP:

```
csrutil disable
```

## 3. 設定 USB 權限
由於 USB 也有權限問題，您需要先設定 USB 權限。請執行以下命令:

```
sudo chown -R $(whoami) /dev/bus/usb
```

## 4. 找到 USB 裝置
因為每台電腦的 USB 裝置可能不同，您需要找到以 "XHC" 開頭的裝置。以下是一個範例:

```
sudo kextstat | grep -i xhc
```

這將列出所有以 "XHC" 開頭的裝置。在本例中，我們使用 "XHC20" 作為範例。

## 5. 安裝 chmodbpf.pkg
有時候在開啟 WireShark 時，可能會遇到無法捕獲的問題。這時候需要安裝 chmodbpf.pkg 套件。您可以在 WireShark 的安裝程式中找到此套件。

## 6. 開始捕獲 USB 訊號
開啟 WireShark 後，您可以直接選擇特定的 USB 裝置進行捕獲。在本例中，我們選擇 "XHC20"。

## 7. 使用 Filter 功能
您可以使用 WireShark 的 Filter 功能來篩選特定的 USB 裝置。例如，如果您只想捕獲 USB_HID_DEVICE 的訊號，可以使用以下 Filter 命令:

```
usb.device_address == 3
```

這將只捕獲位址為 3 的 USB 裝置的訊號。

## 8. 其他參數設定
您可以參考以下網址了解更多 WireShark 的其他參數設定:

[WireShark USB 捕獲教學](https://www.wireshark.org/docs/wsug_html_chunked/ChCaptureFilterSection.html)

以上就是在 Mac 上使用 WireShark 抓取 USB 訊號的完整步驟。如果您在過程中遇到任何問題，請參考相關的文章 [`Command line uninstall driver`](./driver/command-line-uninstall-driver.html)、[`E27m & E34m Driver install fail`](./driver/e27m-e34m-driver-install-fail.html) 和 [`HP ISP Tool 遇到舊driver 移除方式和新driver安裝方式`](./driver/hp-isp-tool-遇到舊driver-移除方式和新driver安裝方式.html)。