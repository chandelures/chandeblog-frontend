<template>
  <div class="sidebar">
    <div class="article-toc mx-auto mt-10">
      <div class="text-h6 font-weight-bold">目录</div>
      <!-- eslint-disable vue/no-v-html -->
      <div v-html="toc"></div>
      <!--eslint-enable-->
    </div>
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
.sidebar {
  position: fixed;
  width: 100%;
}
.article-toc {
  max-width: 1250px;
  * {
    max-width: 250px;
  }
  ul {
    padding-left: 0;
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
