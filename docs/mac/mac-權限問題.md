---
title: Mac 權限問題
domain_tags:
  - mac
  - security
task_tags:
  - debug
  - build
  - config
authority_level: deprecated
is_deprecated: true
category: mac
notion_id: 5e33658a-9fea-4e96-98d3-baf8226f640a
notion_url: 'https://www.notion.so/Mac-5e33658a9fea4e9698d3baf8226f640a'
notion_updated_at: '2026-01-21T09:33:00.000Z'
exported_at: '2026-04-06T13:12:59.026Z'
is_summarized: false
relations: []
---

### 前言:
在Mac 底下，對於存取檔案有嚴格的規定，不同使用者存取資料都有限制，所以如果要在Mac App 存取檔案，需要有相關的設定 
## 檔案存取權限
### App SandBox
App Sandbox 有相關設定可以讓使用者要存取哪些位置，或是設定一些共用的folder可以存取
- User Selected File 
### MPAuthorization 
透過隱私權與安全性裡面的完全存取磁碟的方式讓 app 可以存取到磁碟的全部資料，但是這個功能開啟後會跟App SandBox 衝突，所以要用此 code 時要把 App SandBox 選項關閉
```objective-c
if (@available(macOS 10.15, *)) {
        MPFullDiskAccessAuthorizer *fullDiskAccessAuthorizer = [[MPFullDiskAccessAuthorizer alloc] init];
        if ([fullDiskAccessAuthorizer authorizationStatusForPermissionType] != MPAuthorizationStatusAuthorized) {
            [fullDiskAccessAuthorizer requestAuthorizationWithCompletion:nil];
            exit(0);
        }
    }
```
## APP 執行權限
在自己電腦上build 好後，有時拿到別台電腦不能執行，原因有下面幾點
### Build Active Architecture Only
- 因為 Mac CPU 有兩種 Inter & Arm ，如果Build Active Architecture Only 沒有設定NO，會導致build 的 app 在其他CPU無法執行
### App 權限問題
- Mac app 透過 airdrop 或是 其他方式傳送到別台電腦時，有可能Own & Group 會被修改，導致app 無法讀到同一個folder 的檔案，會讓 app 的狀態錯誤，目前解法為透過Packages 修改 app 的 Own & Group ，讓 app 可以正常執行
