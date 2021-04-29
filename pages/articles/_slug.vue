<template>
  <v-container fluid>
    <v-row>
      <v-col lg="3" md="2" sm="1" cols="0" class="d-none d-lg-flex pr-4">
        <div class="sidebar my-lg-10 my-md-8 my-sm-6 my-4">
          <article-toc :toc-node="tocNode"></article-toc>
        </div>
      </v-col>
      <v-col lg="6" md="8" sm="10" cols="12" class="mx-auto">
        <v-responsive
          max-width="690"
          class="mx-auto my-lg-10 my-md-8 my-sm-6 my-4"
        >
          <article-detail v-bind="article"></article-detail>
          <v-divider class="mt-10 mb-4"></v-divider>
          <div class="d-flex">
            <nuxt-link
              v-if="article.previous"
              class="text-decoration-none green--text text--darken-3"
              :to="`/articles/${article.previous}`"
            >
              &lt; 上一篇
            </nuxt-link>
            <v-spacer></v-spacer>
            <nuxt-link
              v-if="article.next"
              class="text-decoration-none green--text text--darken-3"
              :to="`/articles/${article.next}`"
            >
              下一篇 &gt;
            </nuxt-link>
          </div>
        </v-responsive>
      </v-col>
      <v-col
        lg="3"
        md="2"
        sm="1"
        cols="0"
        class="d-none d-lg-flex px-0"
      ></v-col>
    </v-row>
  </v-container>
</template>

<script>
import ArticleDetail from '~/components/ArticleDetail.vue'
import ArticleToc from '~/components/ArticleToc.vue'

export default {
  name: 'Article',
  components: {
    ArticleDetail,
    ArticleToc,
  },
  auth: false,
  async asyncData({ params, $axios, $marked }) {
    const data = await $axios.$get('articles/' + params.slug)
    if (data) {
      data.content = $marked.marked(data.content)
    }
    return { article: data, tocNode: $marked.tocNode }
  },
  data() {
    return {
      article: {},
      tocNode: [],
    }
  },
  head() {
    return {
      title: this.article.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            this.article.content
              .replace(/<[^>]+>/g, '')
              .replace(/[\r\n]/g, '')
              .slice(0, 100) + '...',
        },
      ],
    }
  },
}
</script>

<style>
.sidebar {
  position: relative;
  width: 100%;
}
</style>
