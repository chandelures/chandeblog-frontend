<template>
  <div class="article-toc">
    <!-- eslint-disable vue/no-v-html -->
    <div v-html="buildToc"></div>
    <!--eslint-enable-->
  </div>
</template>

<script>
export default {
  name: 'ArticleToc',
  props: {
    tocNode: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      pos: '',
      anchors: [],
    }
  },
  computed: {
    buildToc() {
      const levelStack = []
      let result = ''
      const addStartUl = () => {
        result += '<ul>\n'
      }
      const addEndUl = () => {
        result += '</ul>\n'
      }
      const addLi = (anchor, text) => {
        result +=
          '<li><a href="#' + anchor + '" class="anchor">' + text + '</a></li>\n'
      }
      this.tocNode.forEach((item) => {
        let levelIndex = levelStack.indexOf(item.level)
        if (levelIndex === -1) {
          levelStack.unshift(item.level)
          addStartUl()
          addLi(item.anchor, item.text)
        } else if (levelIndex === 0) {
          addLi(item.anchor, item.text)
        } else {
          while (levelIndex--) {
            levelStack.shift()
            addEndUl()
          }
          addLi(item.anchor, item.text)
        }
      })
      while (levelStack.length) {
        levelStack.shift()
        addEndUl()
      }
      return result
    },
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
        item.onclick = function (event) {
          event.preventDefault()
          const element = document.querySelector(
            '[id="' + item.getAttribute('href').replace('#', '') + '"]'
          )
          element.scrollIntoView({ behavior: 'smooth' })
        }
        _anchors.push(item.getAttribute('href'))
      })
      this.anchors = _anchors
      if (this.anchors.length !== 0) this.pos = this.anchors[0]
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
