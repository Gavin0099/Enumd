---
title: HP OCI APP
category: mac
notion_id: 7f714fb2-9cdb-4291-a148-6450a41decaa
notion_url: 'https://www.notion.so/HP-OCI-APP-7f714fb29cdb4291a1486450a41decaa'
notion_updated_at: '2026-01-21T09:29:00.000Z'
exported_at: '2026-04-06T11:24:27.783Z'
is_summarized: false
---

### 最新SDK文件 v2.6
Application部份
1. SDK裡面有 “Device DLL”, 請問他的功能是什麼? 我們發現在XML內不設定也不影響更新
[R] 這個可以參考新版本的文件v2.6 說明, 如附件, 他主要是用來跟DMC溝通的, 如果產品本身沒有, 可以不需要設定
1. OCI包好之後會由代工廠送給HP sign, 那AP如何檢查HP sign過的DLL呢? 我們發現不檢查的話, tool就開不起來.
[R] 這個我們可以開會討論一下, 另外, 現在你們自己的tool是怎麼打包確保理論東西沒被改呢? 也是透過HP來做sign嗎?
[GL]  我們自己做的Tool沒有經過HP Sign, 只對Exe / DLL / Sys檔案做Sha2 sign, 並沒有特別檢查
1. 開啟AP後除了檢查XML的參數外, 還有做什麼其他的事情呢?
[R] 基本上一開始做的動作跟你們現在的tool類似, 起來檢查檔案沒被修改, 確定連接的螢幕跟這版FW一致, error code的部分, 可以參照p7. 4.5 Return Codes
之後就是一開始先去依序呼叫每一個DLL的前三個API, 列出對應的狀態, 之後再透過item 4的動作去依序安裝
1. HPFI_Initialize（）
1. HPFI_GetPackagedFirmwareInfo（）
1. HPFI_GetInstalledFirmwareInfo（）
1. HPFI_Install（）
1. HPFI_Finalize（）
1. SDK裡面的Stage Firmware的功能是什麼?
[R] 這個我們不會用到, 這是離線更新, 就是先將FW刷進去, 但不馬上做更新
1. Log的內容有哪些? 在哪些階段一定要有Log?
[R] Log部分就是可以讓你們自由發揮, 主要就是你們後續maintain方便就好
XML部份
1. UpgradeCode作用是什麼? 不設定也不影響功能
[R] 這部份我們沒有用到, 可以先不用做
1. Type=RPOS時要如何實做功能? 因為我們沒有RPOS的裝置.
[R]這部分也不需要支援RPOS
1. RequireVID/PID: SDK文件寫說RPOS時一定要設定, 那其他種類是否有作用?
[R] 在Kronos 也是沒去讀, 所以這部分可以先不用實作
1. 這幾項功能是什麼呢? PowerButtonSensitivity, DMCDisplayName, DMCVersion, AllowedValue
[R] 這幾個是在Hook docking產品才用到, 所以可以不用實作
另外, command line部分, 我把現在要實作的部分額外列出來, 不需要做到文件中全部的功能
# 流程圖
## Before ISP
## After ISP
### Click "Install" button
### Click "Close" button
待討論問題
1.  多國語言
1. FW Status 與 Tool Update Status  的敘述與 Kronos_OCI_v1.0.0.14 敘述不一致，看似有缺少Status. Ex: Installed version is newer and Out to date
1. Log 位置及如何開啟Debug Log是否有規定，還是這邊沒有限制
1. 所有檔案都有 .hpsign 這部分需怎麼處理
