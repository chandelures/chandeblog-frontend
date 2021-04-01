<template>
  <section v-if="content">
    <h1 class="text-h4 text-md-h3 font-weight-black" v-text="title"></h1>
    <div class="text-body-2 my-4 my-md-6">
      <v-avatar class="mr-3" size="35">
        <img alt="" :src="avatar" />
      </v-avatar>
      <span class="green--text text--darken-3 mr-3">{{ author }}</span>
      <span class="grey--text text--darken-2">{{ created | formatDate }}</span>
    </div>
    <!-- eslint-disable vue/no-v-html -->
    <section v-highlight class="markdown-body" v-html="content"></section>
    <!--eslint-enable-->
  </section>
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
    author: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
  },
}
</script>
