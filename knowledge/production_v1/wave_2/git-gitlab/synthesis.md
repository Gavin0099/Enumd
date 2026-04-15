
# Git & GitLab 報告

公司原先使用的 CodeView 系統在 Merge Request (MR) 的 code review 功能上有一些限制,只能透過 @ 的方式指定審核人員。為了提升 code review 的效率和流程,公司決定升級到 GitLab 15.2.0 版本,因為該版本新增了可以直接在 MR 中指派審核人員的功能。

[未有直接 Source 錨點，待確認] 在升級 GitLab 的過程中,團隊經歷了一些討論和爭執,但最終還是朝著正確的方向穩步前進。雖然現在的系統還不算完美,但團隊成員都願意持續改進,這是推動進步的動力所在。


在 Git 和 GitLab 的相關文件中,我們可以找到以下有用的資訊:

1. [GitLab EE wiki](./gitlab-ee-wiki-.html)
- [未有直接 Source 錨點，待確認] 提供了 GitLab 企業版的各種使用指南和工具介紹,包括新手入門、團隊規範、開發環境建置等。
2. [Genesys Logic Firmware 安全簽署與驗證流程 (Code Signing)](./genesys-logic-firmware-安全簽署與驗證流程-code-signing-.html)
   - 介紹了 Genesys Logic 公司為滿足 HP 安全要求而設計的韌體簽署和驗證架構,包括使用 FIPS 140-2 Level 3 認證的 USB eToken 硬體和自行開發的簽署系統。
3. [3rd party code signing specification (ECDSA)](./3rd-party-code-signing-specification-ecdsa.html)
   - 概述了 Genesys Logic 公司的韌體簽署流程,包括簽署和驗證的實作方式。
