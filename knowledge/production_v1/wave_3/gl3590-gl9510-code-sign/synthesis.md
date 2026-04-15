以下是 GL3590 & GL9510 Code Sign 的綜合報告:

# GL3590 & GL9510 Code Sign

Genesys Logic 的 Hub 裝置支援兩種不同的 Code Sign 與驗證方式: Hub OV2 Code Sign & Verify 和 Hub OV1 Code Sign & Verify。這兩種方式都能在燒錄韌體時進行 FW Code Sign 驗證,但在開機時的驗證方式有所不同。

## Hub OV2 Code Sign & Verify
Hub OV2 Code Sign & Verify 擁有全部的功能,包括:
1. 燒錄時進行 FW Code Sign 驗證 `[Code sign Flow](code-sign/code-sign-flow.html)`
2. 開機時進行 Mask Code 驗證,確保燒錄進 RAM 的程式碼合法,合法才能 Boot,否則跳回 Mask Code `[GL3590 Recovery Case](hub/gl-hub-code-sign-recovery-flow.html)`

### 1. 簽名 (IKV Tool)
1. 透過 ECDSA 私鑰對 Bin 檔案進行簽名 `[Code sign Flow](code-sign/code-sign-flow.html)`
2. 從 Mask Code 中隨機挑選一段資料,並將索引和長度放在 Checksum Offset 位置,並進行 XORM 0x55 運算 `[GL3590 & GL9510 Code Sign](gl3590-gl9510-code-sign.html)`
3. 簽名後的 Bin 檔案格式如下: Public key & Sigs & Sigr (需要做 Reverse)

1. 判斷 ToolString MaskID 為 GL7423
2. 判斷 ToolString Bonding & 0x40 = 0x00
3. 利用 ToolString 做亂數,並與韌體進行比較,確認 CodeSign Flag 為 TRUE
4. 當 CodeSign Flag 為 TRUE 時,命令變為 WriteXrom `[GL3590 & GL9510 Code Sign](gl3590-gl9510-code-sign.html)`

## Hub OV1 Code Sign & Verify
Hub OV1 Code Sign & Verify 只有部分功能:
1. 燒錄時進行 FW Code Sign 驗證 `[Code sign Flow](code-sign/code-sign-flow.html)`
2. 開機時只計算 Checksum 是否正確,不會使用 ECDSA Code Sign 驗證 `[GL3590 & GL9510 Code Sign](gl3590-gl9510-code-sign.html)`

### 1. 簽名 (IKV Tool)
1. 透過 ECDSA 私鑰對 Bin 檔案進行簽名 `[Code sign Flow](code-sign/code-sign-flow.html)`
2. 簽名後的 Bin 檔案格式如下: Public key & Sigs & Sigr

1. WriteXrom `[GL3590 & GL9510 Code Sign](gl3590-gl9510-code-sign.html)`

- [Camera 透過我們驗證 code sign](code-sign/camera-透過我們驗證-code-sign.html)
- [Code sign Flow](code-sign/code-sign-flow.html)
- [GL Hub Code Sign Recovery Flow](hub/gl-hub-code-sign-recovery-flow.html)