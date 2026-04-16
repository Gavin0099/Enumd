
# HP ISP Tool Mask Code Update Flow

## 1. 確認 HP ISP Tool 讀取的 Hub 版本是否為 Mask Code

首先需要確認 HP ISP Tool 讀取的 Hub 版本是否為 Mask Code。這可以在 HP ISP Tool 介面中查看。


如果確認 Hub 版本為 Mask Code，則需要輸入密碼 "GENESYS6104" 才能進行更新。在 HP ISP Tool 介面中按下 "Enter PASSWORD" 按鈕，並輸入正確的密碼。

## 3. 更新 Hub Firmware

輸入正確密碼後，即可進行 Hub Firmware 的更新。具體步驟如下:

1. 選擇要更新的 Hub Bin 檔案。


更新完成後，HP ISP Tool 會顯示 "Update correct" 的訊息，表示更新成功。


1. [Camera 透過我們驗證 code sign](code-sign/camera-透過我們驗證-code-sign.html)
   - 介紹了 Camera 的 code sign 驗證流程。

2. [Code sign Flow](code-sign/code-sign-flow.html)
   - 概述了 Genesys Logic 的 code sign 流程。

3. [GL Hub Code Sign Recovery Flow](hub/gl-hub-code-sign-recovery-flow.html)

以上就是 HP ISP Tool Mask Code Update Flow 的完整文件。如果您有任何其他問題或需求，請隨時告知。