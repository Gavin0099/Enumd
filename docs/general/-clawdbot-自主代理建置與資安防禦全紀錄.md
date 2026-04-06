---
title: ' Clawdbot 自主代理建置與資安防禦全紀錄'
category: general
notion_id: 2f664f6b-c656-8088-9714-ec442c115085
notion_url: 'https://www.notion.so/Clawdbot-2f664f6bc65680889714ec442c115085'
notion_updated_at: '2026-01-29T08:17:00.000Z'
exported_at: '2026-04-06T11:28:07.434Z'
is_summarized: false
---

建置日期： 2026-01-29
系統狀態： 穩定執行中 (Stable) ✅
## 一、 核心系統 Prompt 與執行前提
在系統初始設定中，我們定義了最高指導原則，確保 AI 運作兼具深度與安全：
- 語言規範：強制要求所有回覆與指令說明均以 繁體中文 進行。
- 思考挑戰：設定 AI 必須「永遠挑戰想法中的假設與前提」，在產出大量內容時需進行自我審查。
- 自主代理角色：定義為精通系統自動化與 Clawdbot 架構的資深開發者，專注於權限管理與流程優化。
## 二、 實戰故障排除 (Troubleshooting Log)
### 1. 模型路徑與供應商解析
- 問題：初次設定 google:gemini-1.5-flash 被系統誤判為 anthropic/google...。
- 解決：審查 model-selection.js 源碼後，確認供應商與模型間需使用 斜線 (/) 分隔，導正為 google/gemini-1.5-flash。
### 2. 404 模型不存在 (API Layer)
- 問題：API 持續回傳 404 Not Found，提示在 v1beta 版本中找不到模型路徑。
- 解決：撰寫 check_models.js 腳本直接呼叫 API。發現您在 2026-01-29 建立的 API Key (Tier 1) 支援更強大的 Gemini 2.5/2.0 系列。
- 最終配置：切換至實測存在的 google/gemini-2.5-flash。
### 3. Webhook 與網路隧道
- 問題：LINE Webhook 頻繁出現 404 (路徑錯) 或 408 (逾時)。
- 解決：修正路徑為 /line/webhook 並改用 Ngrok 建立隧道，成功繞過 LocalTunnel 的警告頁攔截。
---
## 三、 最終穩定配置 (Final Configuration)
### 🛡️ 資安防禦與風險控制 (核心重點)
- 權限最小化 (Sandboxing)：
- 配對驗證模式：
- 異常熔斷與審計：
## 四、 給 Antigravity 的設定與資安建議
在未來擴充功能時，請遵循以下規範：
1. 環境變數保護：API Key 應存放於 .env，嚴禁硬編碼 (Hard-coding) 在 clawdbot.json 中。
1. API 成本失控預防：
1. 定期檢查「技能 (Skills)」：
1. 硬體隔離 (推薦)：
---
### 🚀 驗證與測試清單
