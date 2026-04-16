
# Lenovo Code Sign 交握流程


1. Model name (LNV_T24I40_0000)

1. Host PC (Uniupdate Tool) 傳送 Session Key 給 Monitor Controller (Hub)
1. Monitor Controller (Hub) 使用 Session Key 和 Model name 透過 CRC 函數產生一組 signature
1. Monitor Controller (Hub) 傳送計算好的 signature 給 Host PC 驗證
1. Host PC (Uniupdate Tool) 也使用 Session Key 和 Model name 算好 signature 給 Monitor Controller (Hub) 驗證
1. 如果 Host PC (Uniupdate Tool) 和 Monitor Controller (Hub) 都驗證 signature 成功就代表交握成功

1. 使用 Model name 的交握可以確定 CRC 計算能力的一致性，以及 Update 的目標裝置是否正確。
1. Lenovo Uniupdate 流程中，取得 session key 之後的每筆 command，Tool 都會計算 CRC signature，Hub FW 也可依照接收到的 signature 及 ultra data (FW bin data) 來驗算 signature，以此可以確保 Command 及 FW bin 檔傳送時的安全性。
1. Hub 都是燒錄在非 running bank 的那一塊。例如: 現在 run bank1，就 update FW 在 bank 2。
1. Hub 燒錄時，要可以判斷 bonding 和 check sum 等等，並依此回應是否燒錄成功。
1. Hub 會加入 nack error code 來標記 ISP Fail 在哪個階段，目前僅做為內部使用。


### Camera 透過我們驗證 code sign [/code-sign/camera-透過我們驗證-code-sign.html]
1. 生成 ECDSA 金鑰並簽署 ECDSA 金鑰
1. 告知如何 Erase Camera 的方式 —> 驗證失敗要 erase 掉
1. 告知如何 Read Camera data —> Hub security model 必須要 read 到 update 的 data 才可以算出 hash
1. 2、3 點可以改成告知我們所有的 update flow 以及相對應的文件，讓我們控制整個 update
1. 下圖為 Hub Code Sign 驗證 flow，驗證 code sign 應該 Tool 就可以控制，FW 應該不用改什麼，但是還是要麻煩確認看看

### Code sign Flow [/code-sign/code-sign-flow.html]
1. 因應客戶的需求，firmware 都必須要驗證合法性，目前做法是把 bin 檔做成 hash，然後用 private key 對 hash 做 sign 的動作產生 signature (deliver signed firmware)
1. 把 firmware bin data & signature & public key 傳送給 security module，讓 security module 透過 public key 對 signature 做解密，產生 hash，然後再用 firmware bin data 產生一組 hash，互相做比對，來決定 firmware bin 是否合法 (firmware update and verification)
1. 目前 Genesys Logic 使用的 code sign 演算法為 ECDSA nistp256

### eToken 安全簽章系統技術說明 [/code-sign/etoken-安全簽章系統技術說明.html]
1. 系統概述: 說明 eToken 系統如何從原始二進位檔案 (ori bin) 開始，經過整合、簽章與封裝等一系列步驟，最終產生安全的 sig.bin 與 rom 檔案。
1. 系統架構圖: 展示了系統中各個元件的部署位置及其相互之間的通訊關係。
1. 詳細處理流程: 整個流程可分為三個主要階段。
1. 流程視覺化圖表: 包含循序圖 (Sequence Diagram) 和流程圖 (Flowchart)。
1. 演算法特定規則: 在最終檔案生成階段，GLBin 組裝檔案的格式會根據簽章演算法 (ECDSA/RSA/RSA + HID) 而有所不同。
1. GLBinTool 的 WIP、SIGN 和 ROM 階段命令說明。
