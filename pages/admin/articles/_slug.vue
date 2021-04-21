<template>
  <div>
    <admin-bar :bread-links="breadLinks"></admin-bar>
  </div>
</template>

<script>
import AdminBar from '~/components/AdminBar.vue'
export default {
  name: 'AdminArticleDetail',
  components: { AdminBar },
  layout: 'admin',
  middleware: ['auth-admin'],
  data() {
    return {
      breadLinks: [
        { text: '首页', to: '/admin', exact: true },
        { text: '文章', to: '/admin/articles', exact: true },
        { text: '', to: '', exact: true },
      ],
      article: {},
      categories: [],
    }
  },
}
</script>
