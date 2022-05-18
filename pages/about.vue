<template>
  <v-container fluid>
    <v-row>
      <v-col lg="3" md="2" sm="1" cols="0" class="d-none d-lg-flex pr-4">
      </v-col>
      <v-col lg="6" md="8" sm="10" cols="12" class="px-6 px-sm-0 mx-auto">
        <article-detail v-bind="article"></article-detail>
      </v-col>
      <v-col lg="3" md="2" sm="1" cols="0" class="d-none d-lg-flex px-0">
        <div class="sidebar my-10">
          <article-toc :toc-node="tocNode"></article-toc>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ArticleDetail from '~/components/ArticleDetail.vue'
import ArticleToc from '~/components/ArticleToc.vue'

import 'highlight.js/styles/default.css'
import 'katex/dist/katex.css'
import '~/assets/style/markdown.scss'
import '~/assets/style/sidebar.scss'

export default {
  name: 'AboutPage',
  components: {
    ArticleDetail,
    ArticleToc,
  },
  auth: false,
  async asyncData({ $axios, $marked }) {
    const data = await $axios.$get('about')
    if (data) {
      data.content = $marked.marked(data.content)
      data.previous = data.next = null
    }
    return { article: data, tocNode: $marked.tocNode }
  },
  data() {},
  head() {
    return {
      title: this.article.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.getDescription(),
        },
      ],
    }
  },
  methods: {
    getDescription() {
      return (
        this.article.content
          .replace(/<[^>]+>/g, '')
          .replace(/[\r\n]/g, '')
          .slice(0, 100) + '...'
      )
    },
  },
}
</script>

<style>
.sidebar {
  position: relative;
  width: 100%;
}
</style>
