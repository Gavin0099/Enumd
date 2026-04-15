以下是 'HP EndUser Tool 包裝流程' 的文件:

# HP EndUser Tool 包裝流程

## 如果沒有要修改功能單純用最新版換 Firmware 的話

1. 抽換 Hub & Scaler Bin
1. 修改 `HPFwUpdate.ini` 參數，可參考 [`HP End User Tool Setting instructions_0409.pdf`](HP%20End%20User%20Tool%20Setting%20instructions_0409.pdf) 第一章 Ini parameter Description
1. 如果是同一塊板子，但是要測試不同 Model Firmware，要做以下步驟:
   - 使用 [`HP ISP Tool`](HP%20ISP%20Tool) 清除 Hub 後 update 對應的 Hub Firmware
   - 使用 MTK 治具 update dual 版本的 Scaler

此舉動是因為不同 Model 有不一樣的 public key (Hub & Scaler)。原本的 update flow 並不能取代其他 model 的 public key，只能靠 Erase 方式取代。



### HP Monitor Code Sign Update Flow [`HP Monitor Code Sign Update Flow`](hp-monitor-code-sign-update-flow.html)

- 介紹了 ISP Tool 與 Hub Firmware 初始化交握機制，以及不同的 Code Sign 驗證方式。
- 包含 `HP Hw Check Code Signed`、`HP Sw Check Code Signed`、`HP Code Signed Slave` 和 `HP Hub Check Code Signed (ECDSA)` 等四種驗證方式的詳細流程。

### HP RTK Scaler Code Sign [`HP RTK Scaler Code Sign`](hp-rtk-scaler-code-sign.html)

- 介紹了 RTK Scaler 的燒錄流程，包括如何判斷是 SW 還是 HW 的 Code Sign 方式。
- 說明了 Bin 檔的結構，以及 SW Key 和 HW Key 的取得方式。

### Lenovo Code Sign 交握流程 [`Lenovo Code Sign 交握流程`](lenovo-code-sign-交握流程.html)

- 介紹了 Lenovo 的 Code Sign 交握演算法，包括所需參數和流程。
- 說明了 Lenovo Uniupdate 流程中的 CRC 簽章驗證機制。


1. 抽換 Hub & Scaler Bin 檔案，並修改 `HPFwUpdate.ini` 參數。
1. 如果要測試不同 Model 的 Firmware，需要先使用 `HP ISP Tool` 清除 Hub，再 update 對應的 Hub Firmware。接著使用 MTK 治具 update dual 版本的 Scaler。
   - 這是因為不同 Model 有不同的 public key (Hub & Scaler)，原本的 update flow 無法取代其他 Model 的 public key，需要透過 Erase 的方式。
