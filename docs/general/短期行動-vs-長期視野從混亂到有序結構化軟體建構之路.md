---
title: 短期行動 vs 長期視野，從混亂到有序，結構化軟體建構之路
category: general
notion_id: fd6e9a5d-8a8c-40b6-b4a2-4346bba22de1
notion_url: 'https://www.notion.so/vs-fd6e9a5d8a8c40b6b4a24346bba22de1'
notion_updated_at: '2023-09-04T06:38:00.000Z'
exported_at: '2026-04-06T11:26:28.592Z'
is_summarized: false
---

### 起點：挑戰與混亂
8年前，進來了公司，工作的內容差別很大，以前公司是以專案為主，完全會跟著產品生產的流程來決定SW 要做到哪個地步，但是現在做法是根據BU的各項需求來提供服務，所以BU有想到甚麼想法，我們就要做出相應的Tool，這造成需求變成多又雜，導致為了時間壓力，只先要求Tool 能用就好，就變成了我進來時看到的情況
- 有SVN版控，但是不是全部的Tool都有，只有長期Release的Tool才有
- BU 所需的Tool 根據每個人的習慣不一定
- 因為BU所需要的Tool 最基本的code 還是大同小異，為了快速改完需求，直接拿SVN裡面的code ，複製一份出來改是最快的，就導致每份Tool裡面都會看到很多類似的code 
### 第一步的修正
先以底層code 統一為主，先把所有目前有用到的source code 的底層做整合，讓所有的Tool都呼叫同一個底層的code，但是還是以BU的需求為主，有空閒時再修正相關的code
- 整理所有用到的Tool，分析是否有底層code可以合併的
- 整理Tool相關文件，讓雜亂無章的資訊可以整合起來
### 第二步的改善
之前的同事基本上都是配合硬體開發軟體，並沒有純軟體出生，或是說對軟體沒有熱烈喜好，Adam 進來後補足了這一塊，在請adam修改對應功能時，他開發時間會比較久，所以會趁開發時，也會把對應的code做refactor，發現這樣的現象後，也開始調整給Adam的工作，讓他可以開發比較長期的需求，並根據自己調整refactor 的比例
- 根據客戶的需求分析Tool的使用率
- 將最常用的Tool 先做refactor 
- refactor 的 code 和初始的code 作停損點，在指定時間內把refactor 的 code導入Tool裡面
- 重點Tool都有讓member寫相關說明文件，確保不同人來做時可以更快上手
### 第三步的大躍進
因為BU的需求越來越多，導致人力不足，這時人從3—>6，人數變多，讓調配工作的彈性更高，讓某些對source code有潔癖的人做長期開發的工作，讓靈活的人做溝通和短期開發，BU短期的需求可以準時交出來，source code的 refactor  程度越高，短期需求所花的力氣就更少，讓我們可以專注在更想要做的事情上面，也更能做長期的規劃，讓客戶的需求更容易辦到
- SVN —> GitHub
- 導入code review 機制
- 重點專案導入ci/cd
- 開始導入底層跨平台
### 未來的目標
BU的簡單需求都可以省力的達成，可以花更多人力在長期目標上，開始討論如何為BU 節省開發成本，討論規劃出一些驗證Tool 讓BU或客戶可以更簡易找到問題，並導入自動化測試流程，在source code commit 時GitHub 就可以執行對應的script 測試常用的hub chip ，讓開發功能時同時也能確認在大部分的hub chip 底下運作是正常的
- 三平台(Linux , Mac , Windows) 底層共code 
- 導入自動化測試
- 增加Diagnostic Tool讓開發驗證可以更快速找到問題點
https://ivy-lupin-da9.notion.site/vs-f68b569f90904d2b81d3e39b3300f690?pvs=4
