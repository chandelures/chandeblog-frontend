<template>
  <div>
    <admin-bar :bread-links="breadLinks"></admin-bar>
    <admin-article-update></admin-article-update>
  </div>
</template>

<script>
import AdminBar from '~/components/AdminBar.vue'
import AdminArticleUpdate from '~/components/AdminArticleUpdate.vue'

import 'highlight.js/styles/default.css'
import 'katex/dist/katex.css'
import '~/assets/style/markdown.scss'

export default {
  name: 'AdminArticleDetail',
  components: { AdminBar, AdminArticleUpdate },
  layout: 'admin',
  middleware: ['auth-admin'],
  data() {
    return {
      breadLinks: [
        { text: '首页', to: '/admin', exact: true },
        { text: '文章', to: '/admin/articles', exact: true },
        {
          text: this.$route.params.slug,
          to: `/admin/articles/${this.$route.params.slug}`,
          exact: true,
        },
      ],
      article: {},
      categories: [],
    }
  },
}
</script>

<style scoped>
.article-preview {
  max-height: 700px;
  overflow: auto;
}
</style>
