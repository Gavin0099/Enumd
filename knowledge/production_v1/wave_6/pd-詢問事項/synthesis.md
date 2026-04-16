[未有直接 Source 錨點，待確認] 以下是根據提供的內容所撰寫的 PD 詢問事項文件:


## 1. ShareMemory、I2C 和 Billboard PD 的差異性
[ShareMemory, I2C, Billboard PD的差異性在哪裡](https://genesyslogic.com.tw/general/pd-詢問事項.html#jason-ty)
- ShareMemory、I2C 和 Billboard PD 是不同的 PD 通訊協定，各有其特點和應用場景。需要進一步了解它們之間的差異。

## 2. Billboard PD 的 D1 和 D2 區別
[Billboard又分了D1/D2有什麼區別](https://genesyslogic.com.tw/general/pd-詢問事項.html#jason-ty)
- Billboard PD 規範中定義了 D1 和 D2 兩種模式，它們在功能和應用上可能有所不同。需要進一步了解 D1 和 D2 的具體區別。

## 3. 插上 PD 後燒壞電腦或出現 overcurrent 的原因
[之前有遇過插上PD之後燒壞電腦, 或是USBView上顯示overcurrent, 為什麼會發生這些情形](https://genesyslogic.com.tw/general/pd-詢問事項.html#jason-ty)
- 插上 PD 設備後出現電腦燒壞或 overcurrent 的情況可能有多種原因,如 PD 設備本身問題、電源供應不足、電路設計不當等。需要進一步分析造成這些問題的具體原因。

## 4. 電流過大導致燒壞的情況及如何避免
[哪些情況有可能導致電流過大而燒掉？要如何避免？](https://genesyslogic.com.tw/general/pd-詢問事項.html#vic)
- [未有直接 Source 錨點，待確認] 電流過大可能導致設備燒毀,常見的原因包括 PD 設備本身問題、電源供應不足、電路設計不當等。需要了解具體的避免措施,如電流限制、過載保護等。

- [Camera 透過我們驗證 code sign](https://genesyslogic.com.tw/code-sign/camera-透過我們驗證-code-sign.html)
  - 介紹了 Camera 的 code sign 驗證流程,與 PD 相關的部分包括如何 Erase Camera 以及如何 Read Camera data。
- [Etoken System Code View](https://genesyslogic.com.tw/code-sign/etoken-system-code-view-.html)
  - 審核了 etoken_dongle_server 和 etoken_server 的程式碼,發現了一些安全風險,如 detach 執行緒、外部命令執行、SQL 注入等,這些問題也可能影響到 PD 相關的系統。
- [HID Code Sign 記錄](https://genesyslogic.com.tw/code-sign/hid-code-sign-記錄.html)
