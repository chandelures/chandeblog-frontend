<template>
  <v-container fluid>
    <v-row>
      <v-col lg="3" md="2" sm="1" cols="0" class="d-none d-lg-flex">
        <article-toc :toc="toc"></article-toc>
      </v-col>
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
import ArticleToc from '~/components/ArticleToc.vue'

export default {
  name: 'About',
  components: {
    ArticleDetail,
    ArticleToc,
  },
  async asyncData({ $axios, $marked }) {
    const data = await $axios.$get('about')
    if (data) data.content = $marked.markedExtend(data.content)
    return { article: data, toc: $marked.buildToc() }
  },
  data() {
    return {
      article: {},
      toc: '',
    }
  },
}
</script>
