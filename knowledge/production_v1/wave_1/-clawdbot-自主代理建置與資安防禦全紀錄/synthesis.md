# Clawdbot 自主代理建置與資安防禦全紀錄



## 一、 核心系統 Prompt 與執行前提


- 思考挑戰：設定 AI 必須「永遠挑戰想法中的假設與前提」，在產出大量內容時需進行自我審查。

## 二、 實戰故障排除 (Troubleshooting Log)

### 1. 模型路徑與供應商解析

- 問題：初次設定 google:gemini-1.5-flash 被系統誤判為 anthropic/google...。
- 解決：審查 `model-selection.js` 源碼後，確認供應商與模型間需使用 斜線 (/) 分隔，導正為 `google/gemini-1.5-flash`。 `[model-selection.js](path/to/model-selection.js)`

### 2. 404 模型不存在 (API Layer)

- 最終配置：切換至實測存在的 `google/gemini-2.5-flash`。 `[check_models.js](path/to/check_models.js)`

### 3. Webhook 與網路隧道


## 三、 最終穩定配置 (Final Configuration)

### 🛡️ 資安防禦與風險控制 (核心重點)


## 四、 給 Antigravity 的設定與資安建議


