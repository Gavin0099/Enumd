---
title: 'Etoken System Code View '
category: code-sign
notion_id: 30664f6b-c656-8098-9143-df9d5416492f
notion_url: 'https://www.notion.so/Etoken-System-Code-View-30664f6bc65680989143df9d5416492f'
notion_updated_at: '2026-02-13T06:22:00.000Z'
exported_at: '2026-04-06T11:28:21.095Z'
is_summarized: false
---

## etoken_dongle_server
### [Decision Summary]
Verdict: CHANGES_REQUESTED
Risk Level: High
---
### Governance Audit
- Architecture: 不通過。連線工作流程使用 detach 且無生命週期收斂，違反可預測關閉原則。
- Native Safety: 不通過。檔案大小與外部命令執行缺乏邊界控制，存在資源與執行風險。
- Test Integrity: 不通過。看不到針對失敗路徑（超大輸入、shutdown race、協定錯位）的測試證據。
### Technical Findings
1. [BLOCKING] Detached worker thread may outlive owner (this)
1. [BLOCKING] Unbounded memory allocation from peer-provided file size
1. [WARNING] Protocol error opcode mismatch in public-key stage
1. [WARNING] system() execution path with externally-derived parameters
1. [WARNING] Timeout conversion bug in select()
1. [SUGGESTION] Hardcoded token password in source
### Knowledge Base Alignment
- Checked 4 Anti-Patterns/Pitfalls in 03_knowledge_base.md.
- Result: Conflict Found (特別是 system()/sub-process hang 與協定失配/卡住風險已命中)。
## etoken_server
### [Decision Summary]
Verdict: CHANGES_REQUESTED
Risk Level: High
---
### Governance Audit
- Architecture: Release 組態已移除 OFFLINE_TEST，這點較前版改善；但連線工作執行緒仍採 detach，生命週期不可控，違反可預測性。
- Native Safety: 未發現新的 pointer free 錯誤；但外部命令執行與檔案大小處理缺乏邊界，仍有高風險。
- Test Integrity: 看不到對失敗路徑（超大 file size、thread shutdown race、SQL 注入字串）的測試鎖定證據。
### Technical Findings
1. [BLOCKING] SQL injection 風險（登入授權查詢）
1. [WARNING] detach 執行緒捕獲 this，存在 shutdown race / UAF 風險
1. [WARNING] Dongle 管理同樣使用 detach，生命週期不可驗證
1. [WARNING] 檔案大小由對端提供且未設上限，可能 OOM/卡死
1. [WARNING] 對 Dongle 端取檔同樣無大小上限
1. [WARNING] DB 密碼硬編碼在程式碼
### Knowledge Base Alignment
- Checked 4 Anti-Patterns/Pitfalls in 03_knowledge_base.md（含 system()/子程序卡死、流程卡住類型）。
- Result: Conflict Found（當前風險與既有 anti-pattern 高度重疊）。
