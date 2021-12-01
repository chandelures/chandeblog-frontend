<template>
  <v-container class="my-auto text-center">
    <h1 class="text-h2 mb-6">
      {{ msg }}
    </h1>
    <nuxt-link to="/" class="green--text text--darken-3 text-h6">
      Home Page
    </nuxt-link>
  </v-container>
</template>

<script>
export default {
  name: 'ErrorLayout',
  layout: 'EmptyLayout',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      serverError: '500 Server Error',
      badGateway: '502 Bad GateWay',
      otherError: 'Error Occurred',
      msg: '',
    }
  },
  head() {
    switch (this.error.statusCode) {
      case 404:
        this.msg = this.pageNotFound
        break
      case 500:
        this.msg = this.serverError
        break
      case 502:
        this.msg = this.badGateway
        break
      default:
        this.msg = this.otherError
        break
    }
    return {
      title: this.msg,
    }
  },
}
</script>
