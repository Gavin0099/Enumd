import DefaultTheme from 'vitepress/theme'
import WikiHome from './WikiHome.vue'
import RelatedPages from './components/RelatedPages.vue'
import { h } from 'vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(RelatedPages)
    })
  },
  enhanceApp({ app }) {
    app.component('WikiHome', WikiHome)
  },
}
