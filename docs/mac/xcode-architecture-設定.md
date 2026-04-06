---
title: Xcode Architecture 設定
domain_tags:
  - mac
task_tags:
  - install
  - debug
  - build
  - release
  - config
authority_level: source
is_deprecated: false
category: mac
notion_id: 1afbbc0c-4336-4c26-a651-e03d2513e7a7
notion_url: 'https://www.notion.so/Xcode-Architecture-1afbbc0c43364c26a651e03d2513e7a7'
notion_updated_at: '2022-12-13T09:03:00.000Z'
exported_at: '2026-04-06T13:12:43.277Z'
is_summarized: false
relations: []
---

Debug和Release下的設定：
這個屬性主要用在Debug的時候。根據字面意思，就是說只編譯你當前連線裝置(活躍狀態)的處理器版本。這個屬性不需要修改，Xcode的預設設定就是Debug為Yes，Release 為No。
Debug模式設定為Yes，編譯的時候只編譯成當前連線裝置的處理器版本，會大大縮短編譯時間。
Release模式設定為No，你要適配市面上大部分手機，如果Release你還設定成Yes，那麼你生成的安裝包只能安裝在你當前連線裝置的編譯型別的手機上。當然，這也是你Release編譯所花的時間要大大超過Debug的原因。
### 要在M1 上面build 才能同時support ARM64 & X64X86
### segmentation fault: 11 錯誤
Apple Clang - Code Generation --> Optimization Level (Fastest --> None)
