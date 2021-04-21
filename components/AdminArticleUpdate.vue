<template>
  <form class="mb-12 mt-10" @submit.prevent="formSubmit">
    <v-text-field
      v-model="article.title"
      type="text"
      label="标题"
      outlined
      style="max-width: 300px"
    ></v-text-field>
    <v-textarea
      v-model="article.abstract"
      type="text"
      label="摘要"
      outlined
    ></v-textarea>
    <v-container class="dx-0" fluid>
      <v-row>
        <v-col class="px-0 pr-lg-4" cols="12" lg="6">
          <v-textarea
            v-model="article.content"
            type="text"
            label="内容"
            rows="22"
            outlined
          ></v-textarea>
        </v-col>
        <v-divider class="d-none d-lg-flex" vertical></v-divider>
        <v-col class="px-0 pl-lg-4" cols="12" lg="6">
          <div class="article-preview px-4">
            <!-- eslint-disable vue/no-v-html -->
            <div
              v-if="article.content"
              class="markdown-body"
              v-html="markdownContent"
            ></div>
            <!--eslint-enable-->
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-select
      v-model="article.category"
      class="mb-4 mt-10"
      :items="categories"
      item-text="name"
      item-value="id"
      label="分类"
      width="200px"
      dense
      style="max-width: 300px"
    ></v-select>
    <v-btn color="green darken-3" type="submit" dark>保存</v-btn>
    <v-btn v-if="method === 'update'" color="error" @click="deleteArticle"
      >删除</v-btn
    >
  </form>
</template>

<script>
import '~/assets/style/markdown.scss'
import 'highlight.js/styles/default.css'

export default {
  name: 'AdminArticleUpdate',
  props: {
    method: {
      type: String,
      default: 'update',
    },
  },
  data() {
    return {
      article: { title: '', abstract: '', content: '', category: null },
      modify: false,
      categories: [{ name: '无', id: null }],
    }
  },
  computed: {
    markdownContent() {
      return this.$marked.markedExtend(this.article.content)
    },
  },
  async mounted() {
    if (this.method === 'update') {
      await this.getArticle()
    }
    await this.getCategories('categories')
  },
  methods: {
    async getArticle() {
      this.article = await this.$axios.$get(
        `articles/${this.$route.params.slug}`
      )
    },
    async getCategories(url) {
      const data = await this.$axios.$get(url)
      this.categories = this.categories.concat(data.results)
      if (data.next) {
        this.getCategories(url)
      }
    },
    async updateArticle() {
      try {
        const data = await this.$axios.$put(
          `articles/${this.$route.params.slug}`,
          this.article
        )
        this.$toast.success('保存成功')
        this.article = data
      } catch (err) {
        this.$toast.error('保存失败')
      }
    },
    async createArticle() {
      try {
        const data = await this.$axios.$post('articles/create', this.article)
        this.$toast.success('创建成功')
        this.$router.push(`/admin/articles/${data.slug}`)
      } catch (err) {
        this.$toast.error('创建失败')
      }
    },
    async deleteArticle() {
      try {
        await this.$axios.$delete(`articles/${this.$route.params.slug}`)
        this.$toast.success('删除成功')
        this.$router.push('/admin/articles')
      } catch (err) {
        this.$toast.error('删除失败')
      }
    },
    async formSubmit() {
      if (this.method === 'update') {
        await this.updateArticle()
      } else if (this.method === 'create') {
        await this.createArticle()
      }
    },
  },
}
</script>

<style>
.article-preview {
  border: 1px solid grey;
  border-radius: 3px;
  height: 700px;
  overflow: auto;
}
</style>
