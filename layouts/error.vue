<template>
  <v-container class="my-auto text-center">
    <h1 v-if="error.statusCode === 404" class="text-h2 mb-6">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <nuxt-link to="/" class="green--text text--darken-3 text-h6">
      Home Page
    </nuxt-link>
  </v-container>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>
