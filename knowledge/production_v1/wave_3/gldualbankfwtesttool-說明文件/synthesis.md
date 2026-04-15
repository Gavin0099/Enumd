[未有直接 Source 錨點，待確認] 以下是 GLDualBankFWTestTool 說明文件的綜合報告:

# GLDualBankFWTestTool 說明文件

GLDualBankFWTestTool 是一款用於測試雙 Bank 韌體功能的工具。它可以執行以下操作:

1. 執行 GLDualBankFWTestTool.exe 可執行檔。[1]
2. 如果尚未安裝驅動程式，Driver Version 會顯示 None。此時請按下 Install 按鈕安裝驅動程式。[2]
3. 安裝完成後，Driver Version 欄位會顯示驅動程式版本。接著按下 Scan 按鈕。[3]
4. 工具會顯示兩個 Bank 的韌體版本，藉此觀察雙 Bank 功能是否正常運作。[4]

GLDualBankFWTestTool 工具與 Etoken 安全簽章系統密切相關。Etoken 系統提供了簽章、封裝等功能,用於保護韌體映像檔的完整性。[`eToken System`](code-sign/etoken-system.html)、[`eToken 安全簽章系統技術說明`](code-sign/etoken-安全簽章系統技術說明.html)

此外,GLDualBankFWTestTool 還需要依賴 Generic USB Filter Driver 驅動程式。該驅動程式可以攔截 USB 裝置的 Plug and Play 事件,並提供 IOCTL 介面供應用程式進行韌體更新等操作。[`Generic USB Filter Driver`](driver/-generic-usb-filter-driver-.html)

GLDualBankFWTestTool 的核心功能是檢查雙 Bank 韌體的版本資訊。它依賴以下關鍵元素:

1. `GLDualBankFWTestTool.exe` 可執行檔: 提供圖形化介面,供使用者操作。[1]
2. `Generic USB Filter Driver`: 提供 IOCTL 介面,用於與 USB 裝置進行通訊。[`Generic USB Filter Driver`](driver/-generic-usb-filter-driver-.html)
3. `Etoken 安全簽章系統`: 確保韌體映像檔的完整性和安全性。[`eToken 安全簽章系統技術說明`](code-sign/etoken-安全簽章系統技術說明.html)


1. GLDualBankFWTestTool.exe 透過 Generic USB Filter Driver 的 IOCTL 介面,與 USB 裝置進行通訊。
2. 通過 Etoken 安全簽章系統,確保韌體映像檔的完整性,並獲取正確的雙 Bank 韌體版本資訊。
3. 最終在 GLDualBankFWTestTool 的圖形化介面上顯示雙 Bank 韌體版本,供使用者檢查。

1. 在使用 GLDualBankFWTestTool 之前,需要確保 Generic USB Filter Driver 已正確安裝。
2. 如果 Driver Version 欄位顯示 None,請先按下 Install 按鈕安裝驅動程式。
3. 安裝完驅動程式後,按下 Scan 按鈕即可查看雙 Bank 韌體的版本資訊。

GLDualBankFWTestTool 是一款用於測試雙 Bank 韌體功能的工具。它依賴 Generic USB Filter Driver 驅動程式進行 USB 裝置通訊,並利用 Etoken 安全簽章系統確保韌體映像檔的完整性。使用時需要注意驅動程式的安裝情況,以確保工具能正常運行並獲取正確的雙 Bank 韌體版本資訊。