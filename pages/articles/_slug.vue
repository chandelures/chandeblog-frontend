<template>
  <v-container fluid>
    <v-row>
      <v-col lg="3" md="2" sm="1" cols="0" class="d-none d-lg-flex"></v-col>
      <v-col lg="6" md="8" sm="10" cols="12" class="mx-auto">
        <v-responsive
          max-width="690"
          class="mx-auto my-lg-10 my-md-8 my-sm-6 my-4"
        >
          <article-detail v-bind="article"></article-detail>
        </v-responsive>
      </v-col>
      <v-col lg="3" md="2" sm="1" cols="0" class="d-none d-lg-flex"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import '~/assets/style/markdown.scss'
import 'highlight.js/styles/default.css'
import ArticleDetail from '~/components/ArticleDetail.vue'

export default {
  name: 'Article',
  components: {
    ArticleDetail,
  },
  async asyncData({ params, $axios, error }) {
    return await $axios
      .get('articles/' + params.slug)
      .then((res) => {
        return { article: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Article not found' })
      })
  },
  data() {
    return {
      article: {},
      dataLoad: false,
    }
  },
}
</script>
