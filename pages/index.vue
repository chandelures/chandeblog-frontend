<template>
  <v-container fluid>
    <v-row>
      <v-col lg="3" md="2" sm="1" cols="0" class="d-none d-lg-flex"></v-col>
      <v-col lg="6" md="8" sm="10" cols="12" class="mx-auto">
        <v-responsive
          max-width="690px"
          class="mx-auto my-lg-10 my-md-8 my-sm-6 my-4"
        >
          <div v-for="(articlePre, index) in articleList" :key="articlePre.id">
            <article-list-item v-bind="articlePre"></article-list-item>
            <v-divider
              v-if="index < articleList.length - 1"
              class="my-6"
            ></v-divider>
          </div>
          <v-pagination
            v-if="Math.ceil(count / size) > 1"
            v-model="page"
            class="mt-12"
            color="green darken-3"
            :length="Math.ceil(count / size)"
            :total-visible="7"
          ></v-pagination>
        </v-responsive>
      </v-col>
      <v-col lg="3" md="2" sm="1" cols="0" class="d-none d-lg-flex"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import '~/assets/style/markdown.scss'
import 'highlight.js/styles/default.css'

export default {
  name: 'Index',
  components: {},
  auth: false,
  async asyncData({ $axios, $marked }) {
    const data = await $axios.$get('articles', {
      params: {
        size: 5,
      },
    })
    if (data) {
      data.results.forEach((item) => {
        item.abstract = $marked.marked(item.abstract)
      })
    }
    return { articleList: data.results, count: data.count }
  },
  data() {
    return {
      page: 1,
      size: 5,
      count: 0,
      articleList: null,
    }
  },
  head() {
    return {
      title: 'Home',
    }
  },
  watch: {
    page(newPage) {
      this.dataLoad = false
      this.getNext(newPage)
      this.backTop()
    },
  },
  methods: {
    async getNext(thePage) {
      const data = await this.$axios.$get('articles', {
        params: {
          size: this.size,
          page: thePage,
        },
      })
      if (data) {
        data.results.forEach((item) => {
          item.abstract = this.$marked.marked(item.abstract)
        })
      }
      this.articleList = Object.freeze(data.results)
      this.count = Object.freeze(data.count)
    },
    backTop() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
  },
}
</script>

<style>
.v-pagination button {
  outline: none;
}
</style>
