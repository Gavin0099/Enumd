# MFC UI 因為 Windows 縮放比例導致 UI 錯位解決方法

- [Enhanced System DPI Scaling with VS2017](https://stackoverflow.com/questions/46428510/enhanced-system-dpi-scaling-with-vs2017)

1. 在您的專案中建立一個新的檔案 `GdiScaling.manifest`。
2. 在 `GdiScaling.manifest` 中填入以下內容:

[未有直接 Source 錨點，待確認] <assembly xmlns="urn:schemas-microsoft-com:asm.v1" manifestVersion="1.0">
[未有直接 Source 錨點，待確認] <application xmlns="urn:schemas-microsoft-com:asm.v3">

3. 在專案設定中，在 Manifest Tool 選項卡下，將 Additional Manifest Files 設定為 `GdiScaling.manifest`。這將會將您的 GDI 縮放設定合併到生成的其他 Manifest 檔案中。

通過這些步驟，您的 MFC UI 應該能夠正確地適應 Windows 的縮放比例，避免因為縮放而導致的 UI 錯位問題。