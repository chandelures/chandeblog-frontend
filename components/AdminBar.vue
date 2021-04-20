<template>
  <v-toolbar flat>
    <v-breadcrumbs :items="breadLinks" class="pl-0"> </v-breadcrumbs>
    <v-spacer></v-spacer>
    <nuxt-link class="text-caption mx-3 text-decoration-none" to="/">
      回到站点
    </nuxt-link>
    <a class="text-caption ml-3" @click="logout">注销</a>
  </v-toolbar>
</template>

<script>
export default {
  name: 'AdminBar',
  props: {
    breadLinks: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$toast.success('注销成功')
      this.$router.go(0)
    },
  },
}
</script>
