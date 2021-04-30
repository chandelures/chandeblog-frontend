<template>
  <v-app-bar color="green darken-3" dark min-height="65">
    <v-container class="fill-height" fluid>
      <v-row>
        <v-col md="8" cols="12" class="d-flex mx-auto">
          <nuxt-link class="my-auto mx-auto mr-lg-4 mr-md-2" to="/">
            <v-img alt="CBLOG" src="../img/logo.png" width="100" contain>
            </v-img>
          </nuxt-link>
          <v-btn
            v-for="(link, index) in links"
            :key="index"
            :to="link.to"
            :ripple="false"
            class="d-none d-md-flex"
            text
            plain
          >
            {{ link.name }}
          </v-btn>
          <v-spacer class="d-none d-md-flex"> </v-spacer>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
  data() {
    return {
      links: [
        { name: 'Home', to: '/' },
        { name: 'About', to: '/about' },
      ],
    }
  },
}
</script>

<style scoped>
.v-toolbar {
  flex: 0 1 auto;
}
</style>
