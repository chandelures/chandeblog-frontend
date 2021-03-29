<template>
  <div>
    <div class="text-body-2">
      <span class="grey--text text--darken-2">
        {{ created | formatDate }}
      </span>
    </div>
    <div class="text-h4 font-weight-black my-4">
      <router-link
        class="black--text text-decoration-none"
        :to="'/articles/' + slug"
        v-text="title"
      >
      </router-link>
    </div>
    <div class="markdown-body" v-html="markdownAbstract" v-highlight></div>
    <router-link
      :to="'/articles/' + slug"
      class="text-body-2 green--text text--darken-3 text-decoration-none"
      >Read more
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ArticlePre",
  props: {
    title: String,
    abstract: String,
    slug: String,
    created: String,
  },
  computed: {
    markdownAbstract() {
      return this.$marked(this.abstract);
    },
  },
};
</script>
