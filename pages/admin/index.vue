<template>
  <div>
    <admin-bar :bread-links="breadLinks"></admin-bar>
  </div>
</template>

<script>
import AdminBar from '~/components/AdminBar.vue'
export default {
  name: 'AdminIndex',
  components: { AdminBar },
  layout: 'admin',
  middleware: ['auth-admin'],
  data() {
    return {
      breadLinks: [{ text: '首页', to: '/admin' }],
    }
  },
  methods: {},
}
</script>
