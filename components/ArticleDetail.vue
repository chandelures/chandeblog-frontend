<template>
  <v-responsive max-width="690" class="mx-auto my-lg-10 my-md-8 my-sm-6 my-4">
    <section v-if="content">
      <h1
        class="text-h4 text-md-h3 font-weight-black markdown-title"
        v-text="title"
      ></h1>
      <div class="text-body-2 my-4 my-md-6">
        <v-avatar class="mr-3" size="50">
          <img alt="" :src="avatar" width="50" height="50" />
        </v-avatar>
        <span class="green--text text--darken-3 mr-3">{{ authorName }}</span>
        <span class="grey--text text--darken-2">{{
          created | formatDate
        }}</span>
      </div>
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
