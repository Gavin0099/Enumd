
# HP Monitor Test Flow

## Hub GL3523 測試流程
### Hub GL3523 Recovery Case
#### GL3523 Boot Code Load 優先權
- Area 1 的優先權最高，Boot Code 在載入韌體時不會判斷兩個 Area 的韌體版本 [`GL Hub Code Sign Recovery Flow`](/hub/gl-hub-code-sign-recovery-flow.html)
- 除非 Area 1 為 Mask Code，否則 Boot Code 不會載入 Area 2 的韌體 [`GL Hub Code Sign Recovery Flow`](/hub/gl-hub-code-sign-recovery-flow.html)

[未有直接 Source 錨點，待確認] 因應上述條件，Recovery Case 的處理如下:
- 確保兩個 Area 都存在韌體，所以會先更新 Mask Code 所在的 Area [`GL Hub Code Sign Recovery Flow`](/hub/gl-hub-code-sign-recovery-flow.html)
- 確保 Area 1 的韌體版本是最新的，一定會將最新版的韌體放到 Area 1 [`GL Hub Code Sign Recovery Flow`](/hub/gl-hub-code-sign-recovery-flow.html)
- 當兩個 Area 的韌體版本相同時，更新 Area 1 [`GL Hub Code Sign Recovery Flow`](/hub/gl-hub-code-sign-recovery-flow.html)

### Hub GL3523 測試流程
[未有直接 Source 錨點，待確認] 1. 準備兩個版本的韌體，以便確認 dual bank 功能是否正常
1. 使用 General Test Tool 清除 Base Area
1. 使用 Update Tool 更新 Hub 韌體至版本 6012
1. 使用 General Test Tool 觀察 Hub 的 Base & Recovery 版本
1. 再次使用 Update Tool 更新 Hub 韌體至版本 6012
1. 再次使用 General Test Tool 觀察 Hub 的 Base & Recovery 版本

## Hub GL3590 測試流程
### Hub GL3590 Recovery Case
#### GL3590 Boot Code Load 優先權
- Boot Code 在載入韌體時會判斷兩個 Area 的韌體版本，會載入最新版本的韌體 [`GL Hub Code Sign Recovery Flow`](/hub/gl-hub-code-sign-recovery-flow.html)

[未有直接 Source 錨點，待確認] 因應上述條件，Recovery Case 的處理如下:
- 確保兩個 Area 都存在韌體，所以會先更新 Mask Code 所在的 Area [`GL Hub Code Sign Recovery Flow`](/hub/gl-hub-code-sign-recovery-flow.html)
- 永遠更新韌體版本最舊的那個 Area [`GL Hub Code Sign Recovery Flow`](/hub/gl-hub-code-sign-recovery-flow.html)
- 當兩個 Area 的韌體版本相同時，更新 Area 1 [`GL Hub Code Sign Recovery Flow`](/hub/gl-hub-code-sign-recovery-flow.html)

### Hub GL3590 測試流程
[未有直接 Source 錨點，待確認] 1. 準備兩個版本的韌體，以便確認 dual bank 功能是否正常
1. 使用 General Test Tool 清除 Base Area
1. 使用 Update Tool 更新 Hub 韌體至版本 7015
1. 使用 General Test Tool 觀察 Hub 的 Base & Recovery 版本
1. 再次使用 Update Tool 更新 Hub 韌體至版本 7015
1. 再次使用 General Test Tool 觀察 Hub 的 Base & Recovery 版本

1. 使用 MTK 治具更新舊版的 Scaler 韌體 (dual 版本)
1. 使用 HP ISP Tool 確認 Scaler 韌體版本
1. 使用 HP EndUser Tool 更新 Scaler 韌體
1. 再次使用 HP ISP Tool 確認 Scaler 韌體版本

- Firmware Verify —> 高階驗證 (透過 Scaler 驗證 code sign，存在於 GL 3523) [`Camera 透過我們驗證 code sign`](/code-sign/camera-透過我們驗證-code-sign.html)
- Software Verify —> 低階驗證 (透過 Tool 驗證 code sign，存在於 GL3523) [`Code sign Flow`](/code-sign/code-sign-flow.html)
- Genesys Verify —> 透過 Hub 硬體驗證 code sign，存在於 GL3590 [`GL Hub Code Sign Recovery Flow`](/hub/gl-hub-code-sign-recovery-flow.html)
