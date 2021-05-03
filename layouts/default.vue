<template>
  <v-app>
    <app-bar></app-bar>

    <back-top-button></back-top-button>
    <v-main background-color="grey lighten-3">
      <nuxt />
    </v-main>

    <app-footer></app-footer>
  </v-app>
</template>

<script>
import AppBar from '../components/AppBar.vue'
import AppFooter from '../components/AppFooter.vue'
import BackTopButton from '~/components/BackTopButton.vue'

export default {
  name: 'App',
  components: {
    AppBar,
    AppFooter,
    BackTopButton,
  },
}
</script>
