<template>
  <v-container fluid>
    <app-loader :isLoad="dataLoad"></app-loader>
    <v-row>
      <v-col lg="3" md="2" sm="1" cols="0" class="d-none d-lg-flex"></v-col>
      <v-col lg="6" md="8" sm="10" cols="12" class="mx-auto">
        <v-responsive
          max-width="690"
          class="mx-auto my-lg-10 my-md-8 my-sm-6 my-4"
        >
          <article-detail v-bind="article"></article-detail>
        </v-responsive>
      </v-col>
      <v-col lg="3" md="2" sm="1" cols="0" class="d-none d-lg-flex"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import "../style/markdown.scss";
import "highlight.js/styles/default.css";

import ArticleDetail from "../components/ArticleDetail.vue";
import AppLoader from "../components/AppLoader.vue";

export default {
  name: "Article",
  data() {
    return {
      article: {},
      dataLoad: false,
    };
  },
  components: {
    ArticleDetail,
    AppLoader,
  },
  methods: {
    getArticle() {
      this.axios({
        methods: "get",
        url: "articles/" + this.$route.params.slug + "/",
      })
        .then((response) => {
          this.dataLoad = true;
          this.article = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getArticle();
  },
};
</script>
