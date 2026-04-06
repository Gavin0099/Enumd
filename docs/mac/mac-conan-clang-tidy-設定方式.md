---
title: Mac  Conan & Clang-Tidy 設定方式
domain_tags:
  - mac
  - tools
task_tags:
  - install
  - build
  - config
authority_level: deprecated
is_deprecated: true
category: mac
notion_id: 61a76847-0a93-4a01-9a7c-1246050b510a
notion_url: 'https://www.notion.so/Mac-Conan-Clang-Tidy-61a768470a934a019a7c1246050b510a'
notion_updated_at: '2026-01-21T09:34:00.000Z'
exported_at: '2026-04-06T13:13:48.149Z'
is_summarized: false
relations: []
---

### Conan
1. 開啟終端機執行，因為預設會安裝 canan 2 ，所以要改成小於 2 
1. 尋找conan 安裝路徑，把conan 安裝路徑設定在PATH裡面，不同CPU存放位置不一樣
1. 把路徑指定到專案路徑，以CLI Tool 為例 , command 如下
1. 把 conan 設定 build 成 cmake 設定檔放到 build folder ，command 如下，產生的檔案為 conanbuildinfo.cmake
1. 把conanbuildinfo.cmake 放到 build folder ，然後再用cmake build 一次，CMakeLists.txt 會去判斷這件事
### Clang-tidy
1. 安裝llvm
1. 設定tidy環境變數
1. 下command 來確認 clang-tidy 位置
1. 將此路徑放入script 裡面
