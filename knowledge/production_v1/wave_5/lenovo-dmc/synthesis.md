以下是基於提供的內容邊界所合成的 Lenovo DMC 文件:



### DMC & GR & PD 設定

Lenovo 的顯示器可能使用不同的 scaler chip (MTK 或 RTK)，同一個 scaler chip 下又可能有不同的面板。為了能夠使用單一工具同時更新各種不同組合的顯示器韌體，Lenovo 採用了基於 Part Number 的更新方式。

[Lenovo FWUpdateTool](general/lenovo-fwupdatetool.html)

## Part Number 更新流程

1. 透過 DDCCI 協議獲取顯示器的 Part Number。 [Lenovo FWUpdateTool](general/lenovo-fwupdatetool.html)
2. 根據 Part Number 在 `PartNumber.ini` 中找到對應的設定。 [Lenovo FWUpdateTool](general/lenovo-fwupdatetool.html)
3. 讀取 `PartNumber.ini` 中的燒錄資訊，如 Bin 檔路徑、燒錄位置等。 [Lenovo FWUpdateTool](general/lenovo-fwupdatetool.html)
4. 進行韌體燒錄流程。 [Lenovo FWUpdateTool](general/lenovo-fwupdatetool.html)


Lenovo 對 Command Line Tool 的需求包括:

1. 第一個 command 失敗時，後續 command 仍能繼續執行。 [Lenovo 需求](general/lenovo-需求.html)
2. 支援 mask code 下更新 rom 和 sig bin 檔。 [Lenovo 需求](general/lenovo-需求.html)
3. 支援多 model 和多 panel 的更新功能。 [Lenovo 需求](general/lenovo-需求.html)

此外, LDCC Tool 還需要支援 Mac 和 Linux 的 TCP 服務更新方式，以及避開 Windows 上的 "/logpath" 參數問題。 [Lenovo 需求](general/lenovo-需求.html)

## Code-Sign 技術規格

Lenovo 的 Code-Sign 機制遵循以下三種主要情境:

1. `HP_Propertary = '5'`: 簽章資訊外掛型。 [Code-Sign 技術規格文件 (整合版)](code-sign/code-sign-技術規格文件-整合版.html)
2. `HP_Propertary = 'A'`: 公鑰嵌入 + 重算 Checksum 型。 [Code-Sign 技術規格文件 (整合版)](code-sign/code-sign-技術規格文件-整合版.html)
3. `HP_Propertary = 'B'`: 全部資訊嵌入型。 [Code-Sign 技術規格文件 (整合版)](code-sign/code-sign-技術規格文件-整合版.html)

其中 `GL code sign info` 區塊的定義和處理規則在各情境中有所不同。 [Code-Sign 技術規格文件 (整合版)](code-sign/code-sign-技術規格文件-整合版.html)

此外，未來還計劃引入安全的公鑰更換流程，以增強 ISP 的安全性。 [Code-Sign 技術規格文件 (整合版)](code-sign/code-sign-技術規格文件-整合版.html)

## GL7524 Code-Sign 更新流程

GL7524 的 Code-Sign 更新流程包括以下三個階段:

1. Public Key 檢查與更新

ISP Tool 與 FW Ram Code 之間會通過一系列命令來完成這些步驟。 [GL7524 Code Sign Update flow](code-sign/code-sign-技術規格文件-整合版.html#6-gl7524-code-sign-update-flow)

## GL7524 & MCU2 Bank Check Update 流程

除了 Code-Sign 更新外，Lenovo 還定義了一個高階的 Bank 檢查更新流程:

1. 先確認 HUB 的 non-running bank，並更新該 bank。
2. 再確認 MCU2 的 non-running bank，並更新該 bank。

這種方式可以確保在更新過程中系統的可用性。 [GL7524 & MCU2 Bank Check Update flow](code-sign/code-sign-技術規格文件-整合版.html#7-gl7524--mcu2-bank-check-update-flow)