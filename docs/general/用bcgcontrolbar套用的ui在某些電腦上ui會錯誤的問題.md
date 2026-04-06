---
title: 用Bcgcontrolbar套用的UI在某些電腦上UI會錯誤的問題
domain_tags:
  - general
task_tags:
  - debug
  - config
authority_level: source
is_deprecated: false
category: general
notion_id: a1d74bed-cd3c-49bf-ab52-89d49dc3bae8
notion_url: 'https://www.notion.so/Bcgcontrolbar-UI-UI-a1d74bedcd3c49bfab5289d49dc3bae8'
notion_updated_at: '2025-04-08T06:41:00.000Z'
exported_at: '2026-04-06T13:13:32.429Z'
is_summarized: false
relations: []
---

### 現象
在某些電腦上 check box , list item , close buttom 都會有UI顯示的問題，如下紅框
### 原因 
在Windows Display Setting 裡面，如果變更文字, 應用程式和其他項目的大小改成100% 以上，就會發生此問題
---
### Re Try 過程 
- BCG API 
- source code 寫法有問題?
- 修改DPI感知 —> 沒有用
---
### 解法
修改BCG API裡面的 EnableVisualManagerStyle function 
```c
EnableVisualManagerStyle(TRUE, TRUE); —> EnableVisualManagerStyle(FALSE, TRUE);
```
但是修改好的UI是沒有套上visual Manager style ，如下圖
