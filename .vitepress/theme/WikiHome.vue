<template>
  <div class="wiki-home">
    <!-- Hero: compact, search-first -->
    <section class="hero">
      <h1>技術知識庫</h1>
      <p class="subtitle">整理自 Notion · AI 摘要 · 共 <strong>{{ stats?.total_pages ?? 298 }}</strong> 頁文件</p>
      <div class="search-hint" @click="triggerSearch">
        <span class="search-icon">🔍</span>
        <span class="search-placeholder">搜尋文件標題或關鍵字...</span>
        <kbd>⌘K</kbd>
      </div>
    </section>

    <!-- Category cards -->
    <section class="section">
      <h2 class="section-title">依分類瀏覽</h2>
      <div class="category-grid">
        <a
          v-for="cat in stats?.categories ?? []"
          :key="cat.dir"
          :href="`/${cat.dir}/`"
          class="category-card"
        >
          <div class="cat-header">
            <span class="cat-icon">{{ cat.icon }}</span>
            <span class="cat-title">{{ cat.title }}</span>
            <span class="cat-count">{{ cat.count }} 篇</span>
          </div>
          <p class="cat-desc">{{ cat.description }}</p>
          <div class="cat-highlights">
            <span v-for="h in cat.highlights.slice(0, 2)" :key="h" class="highlight-tag">{{ h }}</span>
          </div>
          <div class="cat-footer" v-if="cat.latest_update">
            更新：{{ formatDate(cat.latest_update) }}
          </div>
        </a>
      </div>
    </section>

    <!-- Featured + Recently Updated side by side -->
    <section class="section two-col">
      <!-- Featured pages -->
      <div class="col">
        <h2 class="section-title">📌 常用文件</h2>
        <ul class="page-list">
          <li v-for="p in featured" :key="p.link">
            <a :href="p.link">{{ p.title }}</a>
            <span class="page-tag">{{ p.tag }}</span>
          </li>
        </ul>
      </div>

      <!-- Recently updated -->
      <div class="col">
        <h2 class="section-title">🕐 最近更新</h2>
        <ul class="page-list">
          <li v-for="p in stats?.recently_updated ?? []" :key="p.slug">
            <a :href="`/${p.category}/${p.slug}`">{{ p.title }}</a>
            <span class="page-date">{{ formatDate(p.notion_updated_at) }}</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface PageMeta {
  title: string
  slug: string
  category: string
  notion_url?: string
  notion_updated_at?: string
}

interface CategoryStats {
  dir: string
  title: string
  icon: string
  description: string
  count: number
  highlights: string[]
  latest_update: string | null
}

interface Stats {
  total_pages: number
  last_exported: string
  categories: CategoryStats[]
  recently_updated: PageMeta[]
}

const stats = ref<Stats | null>(null)

onMounted(async () => {
  try {
    const res = await fetch('/stats.json')
    stats.value = await res.json()
  } catch {
    // fallback: no stats
  }
})

function triggerSearch() {
  // Trigger VitePress built-in search
  const btn = document.querySelector('.VPNavBarSearch button') as HTMLElement
  btn?.click()
}

function formatDate(iso?: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`
}

const featured = [
  { title: 'Hub Firmware Update Tool Command Line', link: '/hub/hub-firmware-update-tool-command-line-list', tag: 'Hub' },
  { title: 'Hub Driver 除錯方式', link: '/driver/hub-driver-除錯方式', tag: 'Driver' },
  { title: 'Code Sign 概述', link: '/code-sign/code-sign-概述', tag: 'Code Sign' },
  { title: 'eToken 安全簽章系統技術說明', link: '/code-sign/etoken-安全簽章系統技術說明', tag: 'Code Sign' },
  { title: 'GL Hub Software Development Kit', link: '/hub/gl-hub-software-development-kit', tag: 'Hub' },
  { title: 'How to generate system log', link: '/general/how-to-generate-system-log', tag: 'Log' },
  { title: 'MAC OCI Tool', link: '/mac/mac-oci-tool-', tag: 'Mac' },
  { title: 'MTK Scaler Update flow', link: '/monitor/mtk-scaler-update-flow', tag: 'Monitor' },
]
</script>

<style scoped>
.wiki-home {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

/* Hero */
.hero {
  text-align: center;
  padding: 2.5rem 0 2rem;
}
.hero h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
}
.subtitle {
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}
.search-hint {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  min-width: 280px;
  transition: border-color 0.2s;
}
.search-hint:hover {
  border-color: var(--vp-c-brand);
}
.search-placeholder { flex: 1; text-align: left; }
kbd {
  font-size: 0.75rem;
  background: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 1px 5px;
}

/* Sections */
.section { margin-top: 2.5rem; }
.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

/* Category grid */
.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
.category-card {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 1rem 1.2rem;
  text-decoration: none;
  color: inherit;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.category-card:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.cat-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.cat-icon { font-size: 1.2rem; }
.cat-title { font-weight: 600; font-size: 1rem; flex: 1; }
.cat-count {
  font-size: 0.78rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
  border-radius: 20px;
  padding: 1px 8px;
  font-weight: 600;
}
.cat-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.5;
}
.cat-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.2rem;
}
.highlight-tag {
  font-size: 0.72rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 1px 6px;
  color: var(--vp-c-text-2);
}
.cat-footer {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-top: auto;
  padding-top: 0.4rem;
}

/* Two col */
.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
@media (max-width: 680px) {
  .two-col { grid-template-columns: 1fr; }
}

/* Page list */
.page-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.page-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.88rem;
  padding: 0.4rem 0;
  border-bottom: 1px solid var(--vp-c-divider-light);
}
.page-list li:last-child { border-bottom: none; }
.page-list a {
  flex: 1;
  color: var(--vp-c-brand);
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.page-list a:hover { text-decoration: underline; }
.page-tag {
  font-size: 0.7rem;
  background: var(--vp-c-bg-mute);
  border-radius: 4px;
  padding: 1px 6px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}
.page-date {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}
</style>
