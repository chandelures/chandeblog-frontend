<template>
  <div class="sidebar">
    <div class="article-toc mx-auto mt-10">
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
  max-width: 1130px;
  * {
    max-width: 150px;
  }
  ul {
    border-right: 1px solid black;
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
