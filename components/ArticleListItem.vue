<template>
  <section>
    <span class="grey--text text--darken-2 text-body-2">
      {{ created | formatDate }}
    </span>
    <h1 class="text-h4 font-weight-black my-4">
      <nuxt-link
        class="black--text text-decoration-none"
        :to="'/articles/' + slug"
        v-text="title"
      >
      </nuxt-link>
    </h1>
    <!-- eslint-disable vue/no-v-html -->
    <section class="markdown-body" v-html="abstract"></section>
    <!--eslint-enable-->
    <router-link
      :to="'/articles/' + slug"
      class="text-body-2 green--text text--darken-3 text-decoration-none"
      >Read more
    </router-link>
  </section>
</template>

<script>
import '~/assets/style/markdown.scss'

export default {
  name: 'ArticleListItem',
  props: {
    title: {
      type: String,
      default: '',
    },
    abstract: {
      type: String,
      default: '',
    },
    slug: {
      type: String,
      default: '',
    },
    created: {
      type: String,
      default: '',
    },
  },
}
</script>
