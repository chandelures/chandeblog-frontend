<template>
  <div class="article-toc">
    <!-- eslint-disable vue/no-v-html -->
    <div v-html="toc"></div>
    <!--eslint-enable-->
  </div>
</template>

<script>
export default {
  name: 'ArticleToc',
  props: {
    toc: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.article-toc {
  position: sticky;
  top: 30px;
  float: right;
  max-width: 175px;
  ul:first-child > li:first-child {
    margin-top: 0;
  }
  ul {
    border-right: 1px solid black;
    padding-right: 15px;
    padding-left: 0;
  }
  ul > ul {
    border: none;
  }
  ul > li {
    list-style: none;
    margin-top: 10px;
    font-size: 15px;
  }
  ul > ul > li {
    font-size: 13px;
    font-weight: 300;
  }
  a {
    color: #616161;
    text-decoration: none;
  }
  a.active {
    color: black;
    font-weight: bold;
  }
}
</style>
