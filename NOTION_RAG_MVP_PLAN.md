# Notion RAG MVP Plan
> 讓 AI 能查詢你的 Notion 內部技術文件，用網頁 UI 問答，部署到雲端

---

## 系統定位

**輸入：** 使用者用自然語言問技術問題（中英文皆可）
**輸出：** Claude 根據你的 Notion 文件內容回答，並附上原始 Notion 頁面連結
**未來擴充：** 同樣架構可接 GitLab Wiki（只需替換 ingestion source）

---

## 技術選型

| 層次 | 選擇 | 理由 |
|------|------|------|
| Frontend | Next.js (App Router) | 你已熟悉（Mirra / Hearth 同棧） |
| Backend API | Next.js Route Handler | 不需要另起 server |
| Embedding | Cloudflare Workers AI (`@cf/baai/bge-base-en-v1.5`) | 免費額度大，直接在 CF 跑 |
| 向量資料庫 | Cloudflare Vectorize | 與 CF Workers AI 原生整合，免費 tier 夠 MVP |
| LLM | Anthropic Claude API (claude-sonnet-4-5) | 你已有 |
| 部署 | Cloudflare Pages + Workers | 一體部署，不需要 Railway |
| Notion 資料來源 | Notion API（優先）+ 手動 export 備援 | |

---

## 架構圖

```
[使用者] → [Next.js 網頁 UI]
               ↓ POST /api/query
        [CF Workers Route Handler]
               ↓ 1. embed 問題
        [CF Workers AI - Embedding]
               ↓ 2. 向量搜尋
        [CF Vectorize]
               ↓ 3. 取回 top-K chunks + metadata (含 notion_url)
               ↓ 4. 組 prompt
        [Claude API]
               ↓ 5. 回答 + 來源列表
        [使用者看到答案]

[Notion API] → [Ingestion Script] → [CF Vectorize]
  (本機跑，手動或排程觸發)
```

---

## 資料流設計

### Chunk 策略
每個 Notion 頁面切成多個 chunk，每個 chunk 帶 metadata：

```json
{
  "chunk_id": "page_id_chunk_003",
  "page_id": "notion_page_id",
  "page_title": "Hub Driver 除錯方式",
  "notion_url": "https://www.notion.so/Hub-Driver-...",
  "section": "問題排查步驟",
  "content": "當 Hub Driver 無法載入時，首先確認...",
  "category": "Driver相關文件"
}
```

**切法規則：**
- 以 Notion 的 heading（H1/H2/H3）為自然邊界切割
- 每個 chunk 上限 512 tokens
- chunk 之間保留 50 token overlap（避免切斷關鍵資訊）
- 短頁面（< 200 tokens）整頁當一個 chunk

### 向量搜尋參數
- top-K = 5（取最相關的 5 個 chunk）
- similarity threshold = 0.7（低於此分數的不採用）

---

## Sprint 計畫

### Sprint 0：環境準備（0.5 天）
- [ ] 建立 Cloudflare 帳號，開啟 Workers AI + Vectorize
- [ ] 建立 Notion Integration，取得 API token
- [ ] 建立 Next.js 專案（`create-next-app`）
- [ ] 設定環境變數：`NOTION_TOKEN`, `ANTHROPIC_API_KEY`, `CF_ACCOUNT_ID`, `CF_API_TOKEN`

### Sprint 1：Ingestion Pipeline（1-2 天）
目標：把 Notion 頁面內容向量化存進 Vectorize

**檔案：** `scripts/ingest.ts`

主要步驟：
1. 用 Notion API 列出 database 或指定 page 下的所有頁面
2. 取每頁內容（block children），轉成純文字
3. 按 heading 切 chunk，加上 metadata
4. 呼叫 CF Workers AI embedding API，取得向量
5. 批次 upsert 進 Vectorize

**執行方式：**
```bash
npx tsx scripts/ingest.ts
# 首次全量建立約需 10-20 分鐘（150頁）
```

**注意事項：**
- Notion API rate limit：3 req/sec，需加 throttle
- Vectorize 單次 upsert 上限 1000 vectors，需分批

### Sprint 2：Query API（1 天）
目標：建立問答 Route Handler

**檔案：** `app/api/query/route.ts`

```typescript
// 偽碼流程
export async function POST(req: Request) {
  const { question, history } = await req.json()

  // 1. embed 問題
  const queryVector = await cfEmbedding(question)

  // 2. 向量搜尋
  const matches = await vectorize.query(queryVector, { topK: 5 })

  // 3. 過濾低分結果
  const relevantChunks = matches.filter(m => m.score >= 0.7)

  // 4. 組 system prompt
  const context = relevantChunks.map(c =>
    `[來源: ${c.metadata.page_title}]\n${c.metadata.content}`
  ).join('\n\n---\n\n')

  // 5. 呼叫 Claude
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    system: SYSTEM_PROMPT,
    messages: [...history, { role: 'user', content: question }]
  })

  // 6. 回傳答案 + 來源
  return Response.json({
    answer: response.content[0].text,
    sources: relevantChunks.map(c => ({
      title: c.metadata.page_title,
      url: c.metadata.notion_url,
      score: c.score
    }))
  })
}
```

**System Prompt 設計重點：**
- 明確告知 Claude 只能根據提供的文件回答
- 若文件中找不到答案，直接說「找不到相關文件」，不要捏造
- 回答語言跟隨問題語言（中文問就中文答）
- 若有多個來源有衝突，要明確指出

### Sprint 3：網頁 UI（1 天）
目標：可用的問答介面

**功能（MVP 最小集合）：**
- 問題輸入框（支援 Enter 送出）
- 對話歷史顯示（保留當次 session）
- 每個回答附上來源清單（點擊可直接開啟 Notion 頁面）
- Loading 狀態顯示
- 支援 Streaming 回應（體感更好）

**不做（MVP 不需要）：**
- 使用者登入
- 對話歷史持久化
- 多語言切換
- 管理後台

### Sprint 4：部署到 Cloudflare（0.5 天）
- [ ] `wrangler.toml` 設定 Vectorize binding + Workers AI binding
- [ ] `next.config.js` 設定 CF Pages adapter
- [ ] 推上 GitHub，連接 CF Pages 自動部署
- [ ] 設定 Environment Variables 在 CF Dashboard

---

## 關鍵檔案結構

```
notion-rag/
├── app/
│   ├── page.tsx              # 問答 UI
│   └── api/
│       └── query/
│           └── route.ts      # 查詢 API
├── scripts/
│   └── ingest.ts             # Notion 資料 ingestion
├── lib/
│   ├── notion.ts             # Notion API client
│   ├── chunker.ts            # 切 chunk 邏輯
│   └── vectorize.ts          # CF Vectorize client
├── wrangler.toml             # CF Workers 設定
└── .env.local                # 環境變數
```

---

## 成本估算（MVP 階段）

| 服務 | 費用 |
|------|------|
| Cloudflare Workers AI (embedding) | 免費 10K req/day |
| Cloudflare Vectorize | 免費 30M vector dimensions |
| Cloudflare Pages | 免費 |
| Anthropic Claude API | 依使用量，問答型約 $0.01-0.05/次 |
| Notion API | 免費 |
| **合計** | **基本上只有 Claude API 費用** |

150 頁文件估計約 75K vectors（每頁平均 500 chunks），遠低於免費額度。

---

## 未來擴充路線

### GitLab Wiki 接入
Ingestion script 加一個 source adapter：
```typescript
// 現在
const pages = await notionClient.getPages()

// 未來加上
const wikiPages = await gitlabClient.getWikiPages(projectId)

// 兩個來源用同樣的 chunk + embed 流程
// metadata 加上 source: 'notion' | 'gitlab'
```

UI 上可加篩選器：「只查 Notion」/ 「只查 GitLab」/ 「全部」

### 文件自動更新
- Notion Webhook（付費版）或定期 polling
- 偵測到頁面更新時，重新 embed 對應頁面的 chunks
- 用 `chunk_id = page_id + chunk_index` 做 upsert，避免重複

### 權限控管（若公司內部需要）
- Cloudflare Access 保護整個應用
- 只允許公司 email 網域登入

---

## 風險與注意事項

1. **Notion API 取不到頁面內容**：部分 Notion block 類型（如 synced block、database）需要額外 API call，ingestion script 要處理這些 edge case

2. **Chunk 切太細或太粗**：512 tokens 是經驗值，技術文件（如 command list）可能需要調整，建議先跑 10-20 頁測試

3. **Embedding 語言**：`bge-base-en-v1.5` 對英文最佳，中文效果次之。若中文查詢效果差，可改用 `bge-m3`（多語言版，CF Workers AI 有支援）

4. **CF Workers 記憶體限制**：Workers 單次執行有 128MB 限制，ingestion 腳本建議在本機跑，不要放在 Workers 裡

5. **來源可信度**：你的 Notion 有「未整理資料」和「舊資料」分區，建議 ingestion 時排除這兩個分區，或在 metadata 加 `is_deprecated: true` 讓 Claude 在回答時優先排除
