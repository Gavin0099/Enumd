import DefaultTheme from 'vitepress/theme'
import WikiHome from './WikiHome.vue'
import { h } from 'vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {})
  },
  enhanceApp({ app }) {
    app.component('WikiHome', WikiHome)
  },
}
