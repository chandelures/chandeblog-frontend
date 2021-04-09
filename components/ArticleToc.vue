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
  data() {
    return {
      pos: '',
      anchors: [],
    }
  },
  watch: {
    pos(newPos, oldPos) {
      this.deactiveAnchor(oldPos)
      this.activeAnchor(newPos)
    },
  },
  mounted() {
    this.getAnchors()
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      for (let index = 0; index < this.anchors.length; index++) {
        if (index === this.anchors.length - 1) {
          const element = document.querySelector(
            '[id="' + this.anchors[index].replace('#', '') + '"]'
          )
          const elementOffset = element.offsetTop
          if (scrollTop > elementOffset) {
            this.pos = this.anchors[index]
          }
          break
        }
        const element = document.querySelector(
          '[id="' + this.anchors[index].replace('#', '') + '"]'
        )
        const nextElement = document.querySelector(
          '[id="' + this.anchors[index + 1].replace('#', '') + '"]'
        )
        const elementOffset = element.offsetTop
        const nextElementOffset = nextElement.offsetTop
        if (scrollTop > elementOffset && scrollTop < nextElementOffset) {
          this.pos = this.anchors[index]
          break
        }
      }
    },
    getAnchors() {
      const _anchors = []
      this.$el.querySelectorAll('a.anchor').forEach((item) => {
        _anchors.push(item.getAttribute('href'))
      })
      this.anchors = _anchors
    },
    activeAnchor(pos) {
      const Anchor = this.$el.querySelector('[href="' + pos + '"]')
      if (Anchor) Anchor.classList.add('active')
    },
    deactiveAnchor(pos) {
      const Anchor = this.$el.querySelector('[href="' + pos + '"]')
      if (Anchor) Anchor.classList.remove('active')
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
