以下為 'GL Hub Code Sign Recovery Flow' 的綜合報告:

# GL Hub Code Sign Recovery Flow

'GL Hub Code Sign Recovery Flow' 描述了 Genesys Logic 的 Hub 韌體在不同復原情境下的更新流程。主要涉及三種型號的 Hub 韌體 - GL3523、GL3525 和 GL3590。這些 Hub 韌體在啟動時會根據不同的優先順序加載韌體映像，並根據不同的復原情境進行更新。

### GL3523 Recovery Case
- Boot Code 會優先加載 Bank 1 的韌體映像，除非 Bank 1 為 Mask Code。
- 為確保兩個 Bank 都存在韌體映像，會先更新 Mask Code 所在的 Bank。
- [未有直接 Source 錨點，待確認] 會將最新版本的韌體映像放在 Bank 1。
- 如果兩個 Bank 的韌體版本相同，則更新 Bank 1。

### GL3525 Recovery Case
- Boot Code 會根據兩個 Area 的韌體版本選擇加載最新版本。
- 會先更新 Mask Code 所在的 Bank。
- [未有直接 Source 錨點，待確認] 永遠更新韌體版本較舊的 Bank。
- 如果兩個 Bank 的韌體版本相同，則更新未執行的 Bank 2。

### GL3590 Recovery Case
- Boot Code 的加載邏輯與 GL3525 相同。
- 會先更新 Mask Code 所在的 Area。
- [未有直接 Source 錨點，待確認] 永遠更新韌體版本較舊的 Area。
- 如果兩個 Area 的韌體版本相同，則更新未執行的 Area 2。

### Force all Mode (GL3525 & GL3590 only)
[未有直接 Source 錨點，待確認] 1. ISP 工具先更新未執行的 Bank/Area 2。
2. Hub 韌體計算 Bank/Area 2 的 CRC 並回傳成功與否。
3. Hub 韌體關閉 Bank 1 的保護，打開 Bank 2 的保護，讓 ISP 工具可以更新 Bank 1。
4. ISP 工具更新 Bank 1 後，Hub 韌體再次計算 Bank 1 的 CRC 並回傳成功與否。

- 新版 Hub 韌體可以透過 Tool String 獲知當前執行的 Bank/Area，ISP 工具會根據此信息更新未執行的 Bank/Area。
- 新版 Hub 韌體會阻擋 ISP 工具更新當前執行的 Bank/Area。

提供了三種不同的測試案例 (Case 1、Case 2 和 Case 3/Case 4)，涵蓋了正常燒錄、單一 Bank/Area 燒壞、以及降級等情境。測試結果顯示，Hub 韌體能夠正確地識別並更新 Bank/Area，符合預期的恢復流程。

1. [`Camera 透過我們驗證 code sign`](code-sign/camera-透過我們驗證-code-sign.html)
2. [`Code sign Flow`](code-sign/code-sign-flow.html)
3. [`GL3590  & GL9510 Code Sign`](hub/gl3590-gl9510-code-sign.html)