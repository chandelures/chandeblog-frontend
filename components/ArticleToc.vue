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
    if (this.anchors.length !== 0) this.pos = this.anchors[0]
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
        const elementOffset = document.querySelector(
          '[id="' + this.anchors[index].replace('#', '') + '"]'
        ).offsetTop

        if (index === this.anchors.length - 1) {
          if (scrollTop > elementOffset) {
            this.pos = this.anchors[index]
          }
        } else {
          const nextElementOffset = document.querySelector(
            '[id="' + this.anchors[index + 1].replace('#', '') + '"]'
          ).offsetTop

          if (scrollTop > elementOffset && scrollTop < nextElementOffset) {
            this.pos = this.anchors[index]
            break
          }
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
      if (Anchor) Anchor.parentNode.classList.add('active')
    },
    deactiveAnchor(pos) {
      const Anchor = this.$el.querySelector('[href="' + pos + '"]')
      if (Anchor) Anchor.parentNode.classList.remove('active')
    },
  },
}
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';

.article-toc {
  position: sticky;
  top: 30px;
  float: right;
  max-width: 175px;
  min-width: 100px;
  ul:first-child > li:first-child {
    padding-top: 0;
  }
  li:last-child {
    padding-bottom: 0;
  }
  ul {
    padding-left: 0;
  }
  ul > ul {
    border: none;
  }
  ul > li {
    list-style: none;
    padding: 5px 10px;
    font-size: 13px;
    border-right: 2px solid #{map-get($grey, 'lighten-2')};
    width: 100%;
  }
  a {
    color: #{map-get($grey, 'darken-1')};
    text-decoration: none;
  }
  li.active {
    border-right: 2px solid #{map-get($green, 'darken-3')};
    a {
      color: #{map-get($green, 'darken-3')};
      font-weight: bold;
    }
  }
}
</style>
