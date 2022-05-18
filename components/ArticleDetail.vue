<template>
  <v-responsive max-width="690" class="mx-auto my-lg-10 my-md-8 my-sm-6 my-4">
    <section v-if="content">
      <h1
        class="text-h4 text-md-h3 font-weight-black markdown-title"
        v-text="title"
      ></h1>
      <div class="d-flex text-subtitle-1 my-4 my-md-6">
        <v-avatar class="mr-4" size="50">
          <img alt="" :src="avatar" width="40" height="40" />
        </v-avatar>
        <span
          class="green--text text--darken-3 font-weight-bold mr-3 mb-auto mt-auto"
          >{{ authorName }}</span
        >
        <span class="grey--text text--darken-2 ml-auto mb-auto mt-auto">{{
          created | formatDate
        }}</span>
      </div>
      <v-divider class="mt-4 mb-10"></v-divider>
      <!-- eslint-disable vue/no-v-html -->
      <section class="markdown-body" v-html="content"></section>
      <!--eslint-enable-->
    </section>
    <v-divider class="mt-10 mb-4"></v-divider>
    <div class="d-flex mb-4">
      <nuxt-link
        v-if="previous"
        class="text-decoration-none green--text text--darken-3"
        :to="`/articles/${previous}`"
      >
        &lt; 上一篇
      </nuxt-link>
      <v-spacer></v-spacer>
      <nuxt-link
        v-if="next"
        class="text-decoration-none green--text text--darken-3"
        :to="`/articles/${next}`"
      >
        下一篇 &gt;
      </nuxt-link>
    </div>
  </v-responsive>
</template>

<script>
import 'highlight.js/styles/default.css'
import 'katex/dist/katex.css'
import '~/assets/style/markdown.scss'

export default {
  name: 'ArticleDetail',
  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    created: {
      type: String,
      default: '',
    },
    authorName: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
    previous: {
      type: String,
      default: '',
    },
    next: {
      type: String,
      default: '',
    },
  },
}
</script>
