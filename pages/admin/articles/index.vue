<template>
  <div>
    <admin-bar :bread-links="breadLinks"></admin-bar>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">标题</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in articleList" :key="item.id">
          <td>
            <nuxt-link
              class="text-decoration-none green--text text--darken-3 text-caption"
              :to="'/admin/articles/' + item.slug"
              v-text="item.title"
            ></nuxt-link>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-pagination
      v-if="Math.ceil(count / size) > 1"
      v-model="page"
      color="green darken-3"
      class="my-10"
      :length="Math.ceil(count / size)"
      :total-visible="7"
    >
    </v-pagination>
  </div>
</template>

<script>
import AdminBar from '~/components/AdminBar.vue'
export default {
  name: 'AdminArticles',
  components: { AdminBar },
  layout: 'admin',
  middleware: ['auth', 'auth-admin'],
  data() {
    return {
      breadLinks: [
        { text: '首页', to: '/admin', exact: true },
        { text: '文章', to: '/admin/articles', exact: true },
      ],
      articleList: [],
      page: 1,
      size: 20,
      count: 0,
    }
  },
  watch: {
    page(newPage) {
      this.getArticleList(newPage)
    },
  },
  mounted() {
    this.getArticleList(this.page)
  },
  methods: {
    async getArticleList(page) {
      const data = await this.$axios.$get('articles', {
        params: {
          size: this.size,
          page,
        },
      })
      this.articleList = data.results
      this.count = data.count
    },
  },
}
</script>
