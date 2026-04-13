<template>
  <div v-if="relatedPages.length > 0" class="related-pages-container">
    <h3 class="related-title">延伸閱讀 & 相關知識 (Graph Inference)</h3>
    <ul class="related-list">
      <li v-for="page in relatedPages" :key="page.target">
        <a :href="page.path" class="related-link">
          <span class="related-target">{{ page.title || page.target }}</span>
          <span class="related-badge" :class="page.confidence">{{ page.type }} / score: {{ Math.round(page.score * 100) / 100 }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';

const { frontmatter } = useData();

const relatedPages = computed(() => {
  const inferred = frontmatter.value.relations?.inferred || [];
  // Filter for medium/high confidence and valid scores
  const highQuality = inferred.filter((e: any) => e.confidence !== 'low' && e.score >= 0.3);
  
  // Sort descending by score
  return highQuality.sort((a: any, b: any) => b.score - a.score).slice(0, 3);
});
</script>

<style scoped>
.related-pages-container {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.related-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.related-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.related-list li {
  margin-bottom: 0.75rem;
}

.related-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none !important;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  transition: background-color 0.2s, transform 0.2s;
}

.related-link:hover {
  background-color: var(--vp-c-bg-mute);
  transform: translateX(4px);
}

.related-target {
  font-weight: 500;
  color: var(--vp-c-brand);
}

.related-badge {
  font-size: 0.75rem;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
}

.related-badge.high {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.related-badge.medium {
  background-color: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.related-badge.low {
  background-color: rgba(107, 114, 128, 0.1);
  color: #6b7280;
}
</style>
