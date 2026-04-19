---
title: '**Resource / Python Contract v0.1**'
domain_tags:
  - general
task_tags:
  - sop
authority_level: source
is_deprecated: false
category: general
notion_id: 33d64f6b-c656-80ee-8cf4-c25efcf3f37a
notion_url: >-
  https://www.notion.so/Resource-Python-Contract-v0-1-33d64f6bc65680ee8cf4c25efcf3f37a
notion_updated_at: '2026-04-10T02:13:00.000Z'
exported_at: '2026-04-12T16:21:56.138Z'
is_summarized: false
relations: []
---

# 這份簡報的總主軸

整份簡報其實在講同一件事：

> **測試的價值，不在於有沒有跑完流程，而在於能不能真的驗證系統結果。**

也就是說，測試不能只停留在：

- 點了按鈕

- App 回 success

- UI 看起來有變化

而是要一路追到：

- **真正的系統狀態有沒有改變**

- **這個改變能不能被觀察、被驗證、被重現**

---

# Slide 1 — Resource / Python Contract

### 這頁在講什麼

這一頁是整份簡報的開場，先把主題定成 **Contract v0.1**，並且直接點出一句很重要的話：

> **Make Tests Trustworthy, Not Just More.**

讓測試值得信任，而不是只是讓測試變多。

左邊大標題是 **Resource / Python Contract**，表示這份簡報不是只談測試觀念，而是在談一套「測試與實作之間應該遵守的契約」。

### 報告者可以怎麼講

你可以這樣說：

這份簡報不是在追求更多測試案例，而是在追求**更可靠的測試模型**。

如果測試只是越寫越多，但沒有真正驗證系統，那最後只會得到很多「看起來有測、其實沒測到重點」的結果。

所以這份簡報要建立的是一種 contract，也就是規範測試、程式、系統之間怎麼協作，才能讓結果可信。

### 專有名詞解釋

**Contract**

在這裡不是法律契約，而是「雙方都必須遵守的明確規則」。

簡單講，就是：

- 測試可以做什麼

- 測試不能偷懶做什麼

- 程式要提供哪些可驗證資訊

- 驗證成功的標準是什麼

**Trustworthy**

不是「測試有執行」就算 trustworthy。

而是這個測試結果要能讓人相信：

- 它真的測到正確東西

- 它不是靠運氣 pass

- 它不是靠 sleep 或 UI 假象 pass

---

# Slide 2 — 系統角色說清楚，後面才不會講錯

### 這頁在講什麼

這頁把整個系統拆成三層：

1. **HBAuto（HB Test）**
自動化測試系統，Robot + Python
它扮演的是「觀察者與驗證者」

1. **Avalonia HostBridge（HB App）**
被測應用程式，跨平台 UI
它扮演的是「指令傳遞與顯示者」

1. **OS / System Layer**
真正結果發生的地方，例如 display、device、driver
它扮演的是「絕對真相」

右邊有一個向下箭頭寫著：**往下尋找真相**

下面總結一句：

**測試 = HBAuto｜產品 = HostBridge｜結果 = OS / System**

### 報告者可以怎麼講

這一頁的重點是先把角色講清楚，否則後面很容易混淆。

HBAuto 是測試工具，它不是產品本身。

HostBridge 是被測 App，它負責把命令送下去，也可能顯示一些 UI 狀態。

但真正的結果不是發生在 App 裡，而是發生在 OS 或 driver 那一層。

所以如果我們只看 App 說成功，就等於只看了中間層，還沒有看到最底層的真實結果。

後面的所有設計，都是沿著這個原則：**越往下，越接近真相**。

### 專有名詞解釋

**HBAuto**

自動化測試框架，負責發指令、執行測試流程、蒐集結果。

**Avalonia**

一種跨平台 UI framework，常用於 .NET 生態，可做 Windows / Linux / macOS 共用介面。

**OS / System Layer**

作業系統與底層系統層，包含裝置狀態、驅動行為、顯示拓樸等。

這一層才是真正代表系統有沒有成功完成需求的地方。

**Observer / Validator**

Observer 是觀察者，Validator 是驗證者。

也就是說測試不是「自己宣告成功」，而是要根據觀察到的證據去驗證。

---

# Slide 3 — 問題不是缺測試，而是缺「可信測試」

### 這頁在講什麼

這頁列出四種常見但危險的測試現象：

- **Flaky Test（不穩定）**
同樣程式碼，昨天會過、今天失敗

- **False Pass（偽成功）**
測試會過，但實際功能已經壞掉

- **錯誤累積**
測試越來越多，卻只是把 UI 不穩行為包住

- **Debug 成本暴高**
發生問題後，很難知道是什麼地方出錯

下方結論是：

**AI 能吃增加產量，但不保證任何可信度。**

### 報告者可以怎麼講

很多團隊以為問題是「測試不夠多」，但其實更大的問題是「測試不可信」。

如果測試本身不穩、會誤報、會漏報，那測試越多，反而越容易讓團隊對結果產生錯誤信心。

AI 可以幫忙快速生成測試，但 AI 只能提高產量，不會自動保證這些測試真的有驗證能力。

如果沒有明確的契約與驗證模型，AI 很容易產生表面完整、實際無效的測試。

### 專有名詞解釋

**Flaky Test**

測試結果不穩定。

同樣輸入、同樣環境，這次 pass、下次 fail。

這類測試最大的問題是你無法分辨：到底是程式壞了，還是測試自己不可靠。

**False Pass**

錯誤地通過。

明明產品已經壞掉，但測試還是顯示成功。

這比 false fail 更危險，因為它會讓你誤以為系統安全。

**Debug 成本**

除錯成本。

當測試結構不清楚、訊號不可靠時，工程師必須花更多時間去追根究柢。

---

# Slide 4 — HBAuto 現況其實比預期健康

### 這頁在講什麼

這頁的上方有一條綠色區塊，寫著：

**Reality：我們其實已經有 State**

- Controller / RPC state（Call Agent）

- Strong Oracle（Hash 驗證）

但頁面下方指出真正的問題：

> **這些 State 沒有進入「測試決策」**

然後把情況分三類：

1. **合理（真的無 state）**
例如硬體 / OS 限制、無法觀測、必須 sleep 等待

1. **Workaround（還沒接進測試）**
其實有 state，例如 controller / RPC，但沒被測試使用，所以只能退回 sleep

1. **錯誤（濫用）**
有 state，卻還是只看 UI label 或亂判，造成 false pass

最下方結論是：

**問題不是缺少 State，而是 State 沒被用來定義「完成」。**

### 報告者可以怎麼講

這頁其實在幫現況平反：

不是說我們完全沒有 state，也不是說整個測試系統一片荒蕪。

實際上，我們已經有一些很好的訊號來源，例如 controller state、RPC state、hash 驗證。

真正的問題是：

這些 state 沒有成為測試是否完成、是否成功的正式依據。

所以測試最後還是會退回到比較弱的做法，例如 sleep、看 UI label、憑流程感覺完成。

因此，這份簡報不是要從零創造 state，而是要把既有 state 納入可驗證的決策模型。

### 專有名詞解釋

**State**

系統某一刻的真實狀態。

例如：

- 裝置是否連上

- 指令是否真的完成

- 顯示模式是否已切換

- Hash 是否符合預期

**RPC State**

RPC 是 Remote Procedure Call。

可以把它理解成系統之間透過程式呼叫交換狀態或命令。

RPC state 就是經由這種機制可取得的系統狀態。

**Strong Oracle**

強驗證來源。

不是只看表面 UI，而是看更接近真相、較難被誤導的證據，例如 hash、系統 API、底層狀態。

**完成定義**

一個操作什麼時候算完成，不能只看「流程跑完」，而要看「結果狀態達成」。

---

# Slide 5 — 問題集中在幾個高風險點

### 這頁在講什麼

這頁點出目前最危險的幾種測試模式：

- **sleep-based wait**
例如等 800ms 再假設完成

- **Poll 假裝 Sleep**
名字看起來像在 poll，但其實只是變相等待

- **Clipboard stub**
導致 True False Pass 的誤判主要來源之一

- **Avalonia 接口**
還未建立可測性 contract

底部總結：

**先把補局部的錯誤判斷，再談整體架構升級。**

### 報告者可以怎麼講

這頁是在聚焦問題，不是什麼都要一起改。

現在最需要先處理的是那些最容易造成誤判的點。

第一類是 sleep-based wait，這種做法只是猜時間，不是真的等狀態。

第二類是 poll 假裝 sleep，表面上好像比較進步，但如果 poll 的內容不是可靠 state，本質還是一樣。

第三類是 clipboard stub，這種 stub 如果設計不好，會讓測試得到假的成功訊號。

第四類是 Avalonia 介面還沒有建立完整 testability contract，所以測試和 UI 之間缺乏明確規範。

這頁的意思是：先清掉高風險誤判點，再進一步做整體架構優化。

### 專有名詞解釋

**Sleep-based wait**

直接等固定時間，例如 `sleep(2)`。

它不是在等結果，只是在等時間過去。

**Poll / Polling**

反覆檢查某個條件。

如果 polling 的對象是可靠 state，那它比 sleep 好；

但如果只是輪詢 UI 文字或弱訊號，那還是不可靠。

**Stub**

替身、模擬物件。

測試中常用來取代真實元件。

問題在於，如果 stub 回傳的資訊太理想、太固定，就會讓測試誤以為系統真的沒問題。

**Testability Contract**

可測試性契約。

意思是系統要明確提供哪些介面、狀態、事件，讓測試能正確觀察與驗證。

---

# Slide 6 — 從「測試產量」轉向「測試可信度」

### 這頁在講什麼

這頁左邊是過去的方式：

- UI 驅動

- Sleep 等待

- 盲 Pass

右邊是要轉向的新方向：

- State 驗證

- Condition 觸發

- 正確的 Fail

中間一句很關鍵：

> **Test is only valuable if it can fail correctly.**

測試的價值，建立在其能正確失敗的能力上。

### 報告者可以怎麼講

這頁在重新定義什麼叫「好測試」。

很多人會直覺地認為：

測試跑得多、跑得快、看起來穩，就是好測試。

但其實真正有價值的測試，是當產品壞掉時，它**真的能失敗**。

如果產品壞了，測試還是 pass，那這個測試就沒有保護能力。

所以我們不是從「寫更多」進步，而是從「會不會正確失敗」來看測試的價值。

### 專有名詞解釋

**Condition 觸發**

不是等一段時間，而是等某個條件成立。

例如不是 sleep 2 秒，而是等「裝置狀態變成 connected」。

**正確的 Fail**

產品有問題時，測試要能明確、穩定地報失敗。

而且這個失敗最好能指出接近真因的訊息。

---

# Slide 7 — 這是 Test ↔ App ↔ System 的邊界設計

### 這頁在講什麼

這頁用分層圖說明測試、App、System 之間的邊界：

- Layer 0 / 2：Contract
上下都要有明確契約

- Layer 1：AI Test（HBAuto）
執行者、驗證者

- Layer 2：Controller / Protocol
處理 state 與協調

- Layer 3：Adapter / UI Interaction
負責跟 UI 或底層互動

頁面底部強調：

**這不是單一系統的重構，而是跨層級的錯誤辨識模型。**

### 報告者可以怎麼講

這頁是在講邊界，因為可靠性問題往往不是單一模組造成的，而是跨層傳遞時出現誤判。

測試層不能直接把 UI 當真相。

UI 層也不能直接定義系統成功。

中間必須有 controller 或 protocol 來承接 state，讓不同層之間可以透過 contract 溝通。

所以這裡的重點不是單純重構某個模組，而是建立一套跨層的責任分工：

誰負責發命令，誰負責顯示，誰負責驗證，誰負責保存真實狀態。

### 專有名詞解釋

**Boundary**

邊界。

也就是不同系統或模組之間的責任分界。

**Adapter**

轉接層。

把某一層的輸入輸出，轉成另一層能理解的形式。

**Protocol**

通訊或互動規則。

定義資料怎麼傳、狀態怎麼表示、錯誤怎麼回報。

---

# Slide 8 — AI 可以生成，但不能定義規則

### 這頁在講什麼

這頁把 AI 放在一個 **Sandbox Boundary** 裡面，並明確寫出：

- **AI can generate**

- 但 **AI 不是 Contract 的 owner**

- 它只能在規則內協助：

  - 產生測試
  
  - 縮短 labor cost
  
  - 幫助 scenario 建構

頁面底部寫得很清楚：

> **AI 是 Contract 的使用者，不是 Contract 的 Owner。**

### 報告者可以怎麼講

這頁是在界定 AI 的角色。

AI 很擅長生成內容、補腳本、提高產量，但它不應該自己決定什麼叫成功、什麼叫完成、什麼叫可信。

這些規則必須由人類或正式規範先定好，AI 才能在那個框架裡工作。

如果把規則也交給 AI 臨場決定，那最後測試就會失去一致性，甚至每次都用不同標準判斷。

### 專有名詞解釋

**Sandbox Boundary**

沙箱邊界。

意思是把 AI 放在一個受限制的範圍內運作，它可以做事，但不能越權改核心規則。

**Owner**

負責定義、維護、決策的人或角色。

這裡強調的是：AI 不是規範的擁有者。

**Scenario**

測試情境。

例如插拔裝置、切換顯示模式、驗證複製流程等。

---

# Slide 9 — 時間不是條件，狀態才是唯一標準

### 這頁在講什麼

這頁直接拿 `sleep(2s)` 開刀。

圖上顯示：

- 0.5 秒時 UI label 改了

- 2.0 秒浪費時間

- 2.5 秒還可能出現 flaky failure

右側寫正確做法：

**wait_until_xxx（狀態驅動）**

底下還有一句很重要：

**UI is NOT the source of truth.**

### 報告者可以怎麼講

這頁是在說明為什麼 sleep 不是好條件。

如果 0.5 秒系統其實已經完成，你等到 2 秒就是浪費。

如果 2 秒還沒完成，你硬往下跑就可能出錯。

所以 sleep 同時帶來兩種問題：

一個是浪費時間，一個是誤判。

真正正確的做法，是讓等待綁定在狀態上。

例如等裝置 ready、等 display topology 改變、等系統 API 回報完成。

因此，時間不是完成條件，狀態才是。

### 專有名詞解釋

**Source of truth**

真正可信、可作為最終依據的資訊來源。

這頁強調 UI 不是 source of truth，因為 UI 只是表現層。

**wait_until_xxx**

一種條件式等待。

不是固定等幾秒，而是持續檢查某個條件，直到成立或 timeout。

**Flaky Failure**

由不穩定等待或弱訊號造成的偶發失敗。

---

# Slide 10 — Observable State 不是單一來源，而是分級模型

### 這頁在講什麼

這頁把 observable state 分成多層：

- **Level 3 — Presentation State（最弱）**
label、button state、畫面變化

- **Level 1 — Command State（App）**
API return、internal state changed

- **Level 2 — System State（最重要）**
display topology、device state、system config

頁面底部總結：

**驗證什麼，就要問哪一層負責。**

### 報告者可以怎麼講

這頁非常重要，它說 observable state 不是只有一種。

不是所有 state 都一樣強，也不是每個測試都應該看同一層。

如果你驗證的是 UI 顯示，那 presentation state 可以作為證據。

如果你驗證的是 App 有沒有收到命令，那可以看 command state。

但如果你驗證的是「系統真的切換成功」，那就必須看 system state。

所以這頁的核心是：

**不同層級的驗證目標，要搭配對應層級的 state。**

### 專有名詞解釋

**Observable State**

可被觀察、可被驗證的狀態。

**Presentation State**

畫面呈現狀態。

例如按鈕 enable/disable、label 文案、圖示變化。

**Command State**

命令層狀態。

例如 API 成功回傳、程式內部旗標被更新。

**System State**

系統層狀態。

例如 OS 顯示拓樸、裝置連線狀態、驅動實際輸出。

**分級模型**

不是把所有證據混在一起，而是依強弱、責任、接近真相程度去分類。

---

# Slide 11 — Extended Display 測試正確寫法

### 這頁在講什麼

這頁左右對照非常清楚：

左邊錯誤寫法：

- App 回傳 success

- HostBridge return success

- test pass

- 這叫 **False Pass**

右邊正確寫法：

1. command accepted（App）

1. OS display state extended（System）

1. UI state consistent（Optional）

最下方總結：

**App ≠ 真相，OS 才是結果來源。**

### 報告者可以怎麼講

這頁可以當整份簡報最具體的例子。

假設今天在測 extended display。

如果我們只驗證 App 回傳 success，那只能代表指令有送出去，不能代表系統真的進入 extended mode。

真正正確的驗證應該分三步：

第一，確認 App 接受命令。

第二，確認 OS 顯示拓樸真的切成 extended。

第三，如果需要，再檢查 UI 是否與系統一致。

也就是說：

- App 成功，只是命令發出

- OS 改變，才是功能完成

- UI 一致，只是補充驗證

### 專有名詞解釋

**Extended Display**

延伸螢幕模式。

不是鏡像，而是桌面拓展到另一個顯示器。

**Display Topology**

顯示拓樸。

指作業系統如何組織多個螢幕，例如 single、duplicate、extended。

**Optional**

可選驗證。

表示 UI 一致很重要，但不是核心完成條件的唯一來源。

---

# Slide 12 — 什麼是「可信 Oracle」

### 這頁在講什麼

這頁把 oracle 分成兩種：

左邊是 **弱（Weak Oracle）**

- 依賴表象

- 例如 UI label、顏色、success 字樣

右邊是 **強（Strong Oracle）**

- 看真實來源

- 例如 hash、system state、remote verify

頁面底部規則：

**Expected value must be independent.**

### 報告者可以怎麼講

Oracle 可以理解成「測試拿來判斷對錯的依據」。

如果 oracle 太弱，只看 UI 上寫 success，那這個成功很容易只是表面現象。

如果 oracle 是系統 API、hash、底層 state，那它更接近真相，也更難被表面行為欺騙。

後面那句 expected value must be independent 更重要。

意思是你測試的預期值，不應該直接抄被測程式自己的邏輯。

否則產品寫錯、測試也跟著錯，最後兩邊一起 pass，就失去驗證意義。

### 專有名詞解釋

**Oracle**

測試中的判定依據。

也就是「憑什麼說這次結果是對的」。

**Expected Value**

預期值。

測試認為正確結果應該是什麼。

**Independent**

獨立。

表示預期值來源不能和被測程式共用同一套錯誤邏輯。

**Hash 驗證**

把資料做雜湊比對。

因為 hash 對內容變化很敏感，所以可以用來做強驗證。

---

# Slide 13 — 沒有 enforcement，就沒有 contract

### 這頁在講什麼

這頁把 enforcement 放到幾個層次：

- **Build-time**

- **Review**

- **Runtime**

每一層旁邊都有 blocked，代表如果某些違規行為沒有被攔下，contract 就只是口號。

底下總結：

**Contract 是可被執行的約束，不是紙上的開發建議。**

### 報告者可以怎麼講

這頁在講 contract 不能只存在文件裡。

如果團隊只是寫了一份規則，但 build 不檢查、review 不看、runtime 不驗證，那這份規則不是真的 contract，只是建議。

所謂 enforcement，就是把規則變成可執行的限制。

例如 build-time 可以擋掉明顯違規寫法；

review 可以檢查設計是否符合可測性原則；

runtime 可以在實際執行時確認行為是否符合 contract。

只有規則能被攔截、被執行、被追蹤，它才叫 contract。

### 專有名詞解釋

**Enforcement**

強制執行機制。

不是勸告，而是有具體手段去限制或阻擋不符合規則的行為。

**Build-time**

建置階段。

例如編譯、靜態分析、lint、CI 檢查。

**Review**

人工或半自動的審查階段。

**Runtime**

執行期。

也就是系統真正跑起來時。

---

# Slide 14 — 沒有 owner，就沒有規範

### 這頁在講什麼

這頁左邊列出幾個項目：

- AutomationId

- Observable State

- Wait Condition Library

- Enforcement

右邊對應 owner / responsible team：

- UI Architecture

- UI + Feature Developer 協作

- Test Infra

- Architecture + Test

底部寫：

**紅字警告：Feature Developer ≠ Contract Owner。**

### 報告者可以怎麼講

這頁是在說，規範不能沒有 owner。

如果每個人都覺得「這個應該別人負責」，那最後就不會有人真的把 observable state、wait condition、automation id 這些基礎建設補齊。

所以 contract 不只是技術設計，也包含責任配置。

不同類型的規則，需要不同角色負責。

例如 UI 可識別性是 UI architecture 的責任；

wait condition library 比較接近 test infra；

enforcement 則通常需要 architecture 和 test 一起制定。

### 專有名詞解釋

**AutomationId**

自動化測試用的穩定識別符。

例如給 UI 元件一個固定 ID，讓測試不要靠畫面文字或位置去找物件。

**Wait Condition Library**

封裝好的等待條件函式庫。

讓測試不需要到處自己寫 sleep，而是統一用狀態式等待。

**Owner / Responsible Team**

擁有權與負責團隊。

意思是誰要定義、誰要維護、誰要補這個能力。

---

# Slide 15 — Phase 0 必須拆兩段

### 這頁在講什麼

這頁把 Phase 0 拆成兩部分：

**Phase-0A（HBAuto / Consumer 側）**

- 修正 clipboard stub

- 全面移除 sleep-based wait

- 移除 UI label false pass

**Phase-0B（Avalonia HB / Provider 側）**

- 實作 observable state API

- 導入 automation id

- 定義 wait library 與 enforcement

下方總結：

**HBAuto = Consumer｜HostBridge = Provider**

### 報告者可以怎麼講

這頁是在把改革拆成可執行的兩段。

先從測試端，也就是 consumer 側，清掉最危險的錯誤做法。

例如 false pass、sleep-based wait、clipboard stub 等。

接著在 provider 側，也就是 HostBridge 這邊，補上真正讓測試能夠可靠的能力：

observable state API、automation id、等待條件 library。

這樣拆的好處是：

不是一口氣要求整個系統全改，而是先把消費端的誤判壓下來，再讓供應端補足可測性基礎建設。

### 專有名詞解釋

**Consumer / Provider**

Consumer 是使用能力的一方，這裡指測試端。

Provider 是提供能力的一方，這裡指被測 App 或系統。

**Phase 0**

起始改造階段。

通常代表先處理最基本、最危險、最會影響後面所有工作的問題。

---

# Slide 16 — 第一個可驗收里程碑

### 這頁在講什麼

這頁列出第一階段的驗收標準：

- 無 False Pass

- 無 Sleep-based wait

- 至少 3 個 System-State 類別的輕量測試

- 測試 Flow 可連續運行 20 次而不 flaky

底下結論：

**沒有 measurable outcome，就沒有完成。**

### 報告者可以怎麼講

這頁是把前面的觀念變成可驗收的里程碑。

不能只說「我們改善了」、「我們比較可靠了」，這些都太抽象。

一定要有具體、可量測的完成標準。

例如：

- 沒有 false pass

- 沒有 sleep-based wait

- 至少覆蓋三種 system-state 類型

- 同一個流程連跑 20 次仍然穩定

這樣團隊才知道：什麼叫做真的完成第一階段。

### 專有名詞解釋

**Milestone**

里程碑。

專案中的一個可驗收、可交付、可對齊的階段目標。

**Measurable Outcome**

可量測成果。

也就是能用數字、條件、次數、結果來客觀判斷是否達成。

**連續運行 20 次不 flaky**

表示不是偶然成功，而是具有穩定性。

---

# Slide 17 — 這不是測試優化，是信任模型重建

### 這頁在講什麼

這頁是整份簡報的收尾。

圖中把 Robot Test Case、Resource Keywords、Python Controller、UI Layer、App state、Display / Clipboard / Device 等全部串起來。

中間最重要的訊息是：

> **我們不是在講「測試怎麼寫比較好」
我們在講「到底如何對『不同層級的真實世界』負責」
我們不是在限制 AI，我們是在定義 AI 可以被信任的邊界。**

### 報告者可以怎麼講

最後這頁把整份簡報提升到比較高的層次。

這不是單純在優化幾條測試腳本，也不是把 sleep 改成 wait_until 那麼簡單。

真正要做的是重建一個信任模型：

當測試說成功時，我們為什麼能相信？

當 AI 幫我們產生測試時，我們憑什麼接受？

當不同層的狀態互相矛盾時，誰才是最後的真相來源？

所以這份簡報的最終目標，是把「可被信任的邊界」定義清楚。

不是反對 AI，而是讓 AI 在可信框架內工作。

### 專有名詞解釋

**Trust Model**

信任模型。

也就是整個系統如何建立「這個結果可信」的依據。

**Boundary of Trust**

信任邊界。

哪一層可以拿來當證據，哪一層只能當輔助訊號，這些都要界定清楚。

**Different levels of reality**

不同層級的真實。

例如：

- UI 看見的真實

- App 紀錄的真實

- OS / driver 層的真實
它們不一定相同，而這份簡報是在定義如何判定誰更接近真相。

---

# 你拿去報告時，可以用這個方式收尾

你可以用一句話把全篇收住：

> 這份簡報的核心不是「反對 sleep」，也不是「要求測試更複雜」，

而是要建立一套能讓人相信測試結果的可靠性契約。

只有當測試綁定真正可觀察、可驗證、可量測的系統狀態時，測試才真正有價值。

[UNSUPPORTED_BLOCK: child_page]

# 🎤 開場（Slide 1）

大家好，今天這份簡報，我想先用一句話來定義它的主題：

> **我們不是在讓測試變多，而是在讓測試變得可信。**

（停 1 秒）

現在很多團隊的問題不是沒有測試，

而是測試本身「不能被相信」。

你可以寫很多 test case，

但如果它只是：

- 點了按鈕

- App 回 success

- UI 看起來有變

那其實你沒有真的驗證到系統。

（停一下）

所以這份簡報的核心，是在定義一個：

> **測試與系統之間的「可靠性契約（contract）」**

---

# 🎤 Slide 2 — 三層系統

這頁我想先把角色講清楚，這是整份簡報的基礎。

我們有三個系統：

- 測試（HBAuto）

- 應用（HostBridge）

- 系統（OS / driver）

（停一下）

👉 關鍵點在這一句：

> **App success，不等於 System success。**

（強調）

很多測試其實停在 App 這一層，

但真正的結果，是發生在 OS 或 driver。

所以如果你只驗 App，你其實還沒看到真相。

---

# 🎤 Slide 3 — 問題定義

這頁我會直接講一個結論：

> **最危險的不是測試 fail，而是測試錯誤地 pass。**

（停 1 秒）

我們現在遇到四種問題：

- flaky（不穩）

- false pass（最危險）

- 語意漂移

- debug 成本高

（慢一點）

Flaky 至少會 fail，你會注意到。

但 false pass 會讓你「以為系統是好的」。

👉 這才是真正會害到產品的。

---

# 🎤 Slide 4 — 現況校正

這頁我要幫現況講一句公道話：

> **我們其實已經有正確的東西。**

（停一下）

例如：

- controller / RPC state

- hash 驗證（strong oracle）

這些都是對的方向。

（轉折）

但問題是：

> **這些 state 沒有進入測試決策。**

所以最後測試還是會：

- sleep

- 看 UI

- 憑感覺判斷完成

👉 這才是問題。

---

# 🎤 Slide 5 — Gap

這頁我會直接講「優先順序」：

現在最危險的幾個點：

1. Clipboard stub → 造成 false pass

1. sleep-based wait

1. poll + sleep

1. contract 缺失

（停一下）

👉 重點不是全部改，而是：

> **先修「會騙你」的問題，再修「不穩」的問題。**

---

# 🎤 Slide 6 — Sleep

這頁我要講一個很多人會誤解的點：

> **Sleep 不是問題本身。**

（停一下）

真正問題是：

> **你沒有 state 可以判斷完成。**

（強調）

Sleep 其實有三種：

- 合理（硬體限制）

- workaround（沒有 state）

- 錯誤（有 state 卻不用）

👉 所以結論是：

> **Sleep 是 workaround，不是設計。**

---

# 🎤 Slide 7 — 轉向

這頁我會用對比講：

以前：

- UI 驗證

- sleep 等待

- pass 就好

現在我們要改成：

- state 驗證

- condition wait

- 能正確 fail

（停一下）

👉 最重要一句：

> **Test is only valuable if it can fail correctly.**

---

# 🎤 Slide 8 — 邊界

這頁我要直接講錯誤：

現在很多測試是：

```plain text
Test → App ❌
```

（停）

但正確應該是：

```plain text
Test → System ✔
```

👉 我們不是在驗 response

👉 我們是在驗 reality

---

# 🎤 Slide 9 — AI

這頁很簡單但很重要：

> **AI 可以生成，但不能定義規則。**

（停）

AI 可以：

- 幫你寫測試

- 組合 scenario

但 AI 不應該決定：

- 什麼叫完成

- 什麼叫正確

👉 因為那是 contract

---

# 🎤 Slide 10 — Time vs Condition

這頁我會講一句很好記的話：

> **Sleep 是在猜，Condition 是在判斷。**

（停一下）

sleep(2) 是在賭

wait_until 是在確認

👉 時間不是條件

👉 狀態才是

---

# 🎤 Slide 11 — Observable State

這頁是關鍵：

> **UI 不是 truth。**

（停）

state 分三層：

- UI（最弱）

- App（中）

- System（最強）

👉 你要驗什麼，就要看哪一層。

---

# 🎤 Slide 12 — Case（Extended）

這頁你一定要慢講：

錯的寫法：

- App success → pass

👉 這是假成功

（停）

正確寫法：

1. App 接受命令

1. OS state 改變

1. UI 一致（可選）

👉 **OS 才是結果**

---

# 🎤 Slide 13 — Oracle

這頁很重要，慢講：

> **Oracle = 你憑什麼說它是對的**

（停）

弱：

- UI

- success 字串

強：

- system state

- hash

👉 最重要一句：

> **Expected value 必須獨立**

---

# 🎤 Slide 14 — Enforcement

這頁直接講：

> **沒有 enforcement，就沒有 contract。**

（停）

規則如果不能被：

- build 擋

- review 看

- runtime 驗

👉 那只是文件

---

# 🎤 Slide 15 — Ownership

這頁講組織：

> **沒有 owner，就沒有規範。**

（停）

如果每個人都自己定義 wait：

👉 系統一定壞

---

# 🎤 Slide 16 — Phase 0

這頁講策略：

- 先修測試（consumer）

- 再補能力（provider）

👉 不要一次全改

---

# 🎤 Slide 17 — 結尾（最重要）

最後我會用這句收：

> **我們不是在優化測試，我們是在定義什麼可以被相信。**

（停 2 秒）

👉 如果測試不能被信任

👉 AI 只會更快產生錯誤

---

# 🔥 最後給你的建議（很關鍵）

你現在這份講稿：

👉 已經是「可以上台」等級

但要再升一級，你只要做一件事：

> 每頁只記一句 punchline
