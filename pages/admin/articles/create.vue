<template>
  <div>
    <admin-bar :bread-links="breadLinks"></admin-bar>
    <admin-article-update method="create"></admin-article-update>
  </div>
</template>

<script>
import AdminArticleUpdate from '~/components/AdminArticleUpdate.vue'
import AdminBar from '~/components/AdminBar.vue'

export default {
  name: 'AdminArticlesCreate',
  components: { AdminBar, AdminArticleUpdate },
  layout: 'admin',
  middleware: ['auth-admin'],
  data() {
    return {
      breadLinks: [
        { text: '首页', to: '/admin', exact: true },
        { text: '文章', to: '/admin/articles', exact: true },
      ],
    }
  },
}
</script>
