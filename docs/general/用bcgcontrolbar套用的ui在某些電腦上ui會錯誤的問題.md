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
relations:
  manual: []
  inferred:
    - target: 2021部門創新提案
      title: 2021部門創新提案
      path: /general/2021部門創新提案.html
      type: tag_related
      confidence: medium
      score: 0.3198257085550478
    - target: 2024部門創新提案
      title: 2024部門創新提案
      path: /general/2024部門創新提案.html
      type: same_domain
      confidence: low
      score: 0.2
    - target: sw文件撰寫sop
      title: SW文件撰寫SOP
      path: /general/sw文件撰寫sop.html
      type: same_domain
      confidence: low
      score: 0.2
    - target: usb30影響配對問題
      title: USB3.0影響配對問題
      path: /general/usb30影響配對問題.html
      type: tag_related
      confidence: medium
      score: 0.3198257085550478
    - target: 世界上最快樂的工作
      title: 世界上最快樂的工作
      path: /general/世界上最快樂的工作.html
      type: same_domain
      confidence: low
      score: 0.2
    - target: 交叉評核作業
      title: 交叉評核作業
      path: /general/交叉評核作業.html
      type: tag_related
      confidence: medium
      score: 0.3198257085550478
    - target: 共好會議
      title: 共好會議
      path: /general/共好會議.html
      type: same_domain
      confidence: low
      score: 0.2
    - target: 各家ui
      title: 各家UI
      path: /general/各家ui.html
      type: same_domain
      confidence: low
      score: 0.2
    - target: 研發投扺專案資料列印流程
      title: 研發投扺專案資料列印流程
      path: /general/研發投扺專案資料列印流程.html
      type: tag_related
      confidence: medium
      score: 0.3198257085550478
    - target: 自動化測試
      title: 自動化測試
      path: /general/自動化測試.html
      type: tag_related
      confidence: medium
      score: 0.5745669370231701
    - target: 自評
      title: 自評
      path: /general/自評.html
      type: tag_related
      confidence: medium
      score: 0.3198257085550478
    - target: 軟體一組會議記錄
      title: 軟體一組會議記錄
      path: /general/軟體一組會議記錄.html
      type: same_domain
      confidence: low
      score: 0.2
    - target: 軟體品質
      title: 軟體品質
      path: /general/軟體品質.html
      type: same_domain
      confidence: low
      score: 0.2
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
