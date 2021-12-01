<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="2" class="d-none d-lg-flex">
            <admin-nav></admin-nav>
          </v-col>
          <v-col cols="12" lg="10">
            <nuxt></nuxt>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AdminNav from '~/components/AdminNav.vue'

export default {
  name: 'AdminLayout',
  components: { AdminNav },
}
</script>
