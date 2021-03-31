<template>
  <section>
    <span class="grey--text text--darken-2 text-body-2">
      {{ created | formatDate }}
    </span>
    <h1 class="text-h4 font-weight-black my-4">
<<<<<<< HEAD:src/components/ArticlePre.vue
      <router-link
=======
      <nuxt-link
>>>>>>> feat: change the framework to nuxt.js:components/ArticleListItem.vue
        class="black--text text-decoration-none"
        :to="'/articles/' + slug"
        v-text="title"
      >
<<<<<<< HEAD:src/components/ArticlePre.vue
      </router-link>
    </h1>
    <section
      class="markdown-body"
      v-html="markdownAbstract"
      v-highlight
=======
      </nuxt-link>
    </h1>
    <section
      v-highlight
      class="markdown-body"
      v-html="markdownAbstract"
>>>>>>> feat: change the framework to nuxt.js:components/ArticleListItem.vue
    ></section>
    <router-link
      :to="'/articles/' + slug"
      class="text-body-2 green--text text--darken-3 text-decoration-none"
      >Read more
    </router-link>
  </section>
</template>

<script>
export default {
  name: 'ArticleListItem',
  props: {
    title: String,
    abstract: String,
    slug: String,
    created: String,
  },
  computed: {
    markdownAbstract() {
      return this.$marked(this.abstract)
    },
  },
}
</script>
