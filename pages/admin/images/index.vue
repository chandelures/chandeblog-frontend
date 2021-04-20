<template>
  <div>
    <admin-bar :bread-links="breadLinks"></admin-bar>
  </div>
</template>

<script>
import AdminBar from '~/components/AdminBar.vue'
export default {
  name: 'AdminImages',
  components: { AdminBar },
  layout: 'admin',
  middleware: ['auth', 'auth-admin'],
  data() {
    return {
      breadLinks: [
        { text: '首页', to: '/admin', exact: true },
        { text: '图片', to: '/admin/images', exact: true },
      ],
    }
  },
}
</script>
