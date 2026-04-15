以下是 Etoken System 的綜合 Markdown 報告:

# Etoken System 文件


> **注意:** 使用 Proxmox 登入
> https://172.17.50.157:8006/#v1:0:=node%2Fgli-pve02:4:10:=contentIso:::37::2
> **注意:** [eToken Server v4.0]（現行版本）

## Etoken System 伺服器



回應 eTokenClient Tool 的需求，並提供帳號密碼機制管理登入權限。


提供 GUI 版本 Tool，可以傳送 command 給 eTokenServer Tool 來做 generate key & sign 功能，並傳送 sign 後的 hub bin 檔案回來。
注意：v2.0.0.2 的版本，要 sign 的檔案需與 exe 放在同資料夾下。


Etoken System 核心由以下元件組成:

1. **eToken Server**: 提供帳號密碼管理和 eTokenClient 的需求回應。
2. **eToken Client**: 提供 GUI 工具，可以傳送指令給 eToken Server 進行金鑰生成和簽章功能。

eToken Client 會透過 eToken Server 來執行簽章流程，而 eToken Server 則會與 Dongle Server (安全核心) 和 GLBin (檔案處理工具) 協同運作完成簽章任務。


Etoken 系統的技術細節可參考 [eToken 安全簽章系統技術說明](code-sign/etoken-安全簽章系統技術說明.html)文件,其中包括:

- 不同簽章演算法 (ECDSA/RSA/RSA + HID) 的組裝規則
- [未有直接 Source 錨點，待確認] GLBinTool 的命令行用法

此外,文件也提到了 Generic USB Filter Driver 的相關技術,包括 ISP (In-System Programming) 模式下如何透過驅動程式與硬體進行通訊。


Etoken System 是一個完整的簽章解決方案,由 eToken Server 和 eToken Client 兩個主要元件組成。eToken Server 負責帳號密碼管理和簽章請求的處理,eToken Client 則提供 GUI 工具來與 eToken Server 互動。整個簽章流程涉及 Dongle Server 和 GLBin 等其他元件的協作。相關的技術細節可參考 [eToken 安全簽章系統技術說明](code-sign/etoken-安全簽章系統技術說明.html)文件。