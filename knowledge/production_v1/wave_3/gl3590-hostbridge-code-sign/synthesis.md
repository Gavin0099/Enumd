
# GL3590 +HostBridge Code Sign

## 1. marge bin Tool
[GLBinTool.exe](https://gli-cse.genesyslogic.com.tw/svn/storage/Users/GavinWu/Windows/GLBinTool)是一款用於合併 GL3590 韌體二進位檔案的工具。它可以執行以下操作:

a. 將 GL3590-TZ2YS1_Hub_UFPC(Host)_FW8725.bin 和 GL3590_HostBridge_FW1008.bin 合併成 bbb.sum 檔案，供 HP ISP Tool 進行簽署和燒錄。

b. 將 GL3590-TZ2YS1_Hub_UFPC(Host)_FW8725.bin、GL3590_HostBridge_FW1008.bin 和 5678.pub 公鑰合併成 bbb.sum 檔案，供燒錄機燒錄使用。

## 2. HP ISP Tool
[HP ISP Tool](https://gli-cse.genesyslogic.com.tw/svn/storage/Users/JasonWu/IsptoolRefine2018/HP_ISPTool)提供以下功能:

1. Hub + Host Bridge 簽署


b. Hub + HostBridge ISP
c. Hub + HostBridge Recovery

### GL3590 初始碼簽署

1. 韌體會透過 Toolstring 告知 Support 當前的模式（尚未確定具體做法）。
2. 切換 Vendor Command（從 81 切換到 A1）。
[未有直接 Source 錨點，待確認] 3. 進行 ToolString 驗證（IsFixtureValid）。


1. 燒錄 Hub 0、Hub 1、H.B 0、H.B 1 和公鑰。
- [未有直接 Source 錨點，待確認] 若驗證失敗，則清除 block 0、1、2、3、4。
- [未有直接 Source 錨點，待確認] 若驗證失敗，則清除 block 0、1、2、3、4。


判斷 Hub 和 Host Bridge 分別在哪個 block 上運行（可以詢問韌體以獲取相關資訊）。

      - 將 Hub 0 複製到 Hub 1
      - 將 HB 0 複製到 HB 1

[IKV Tool](https://gli-cse.genesyslogic.com.tw/svn/storage/Users/JasonWu/IsptoolRefine2018/IKV)提供程式碼簽署功能:

openssl ecparam -out privatekey.key -name prime256v1 -genkey

ikvTool.exe sign -k 1234.priv -p 1234.pub -f 1121.sum

ikvTool.exe verify -k 1234.pub -f 8400.sum -r 8400.sum.SigR -s 8400.sum.SigS -t sw



[未有直接 Source 錨點，待確認] 1. 使用 GLBinTool 合併二進位檔案。
2. 利用 HP ISP Tool 進行簽署和燒錄操作。
3. 採用 IKV Tool 實現程式碼簽署和驗證。

這些工具和流程確保了 GL3590 韌體的安全性和合規性，滿足了 HP 的 Code Signing 要求。