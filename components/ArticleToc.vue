<template>
  <div class="article-toc">
    <ul>
      <li v-for="(item, index) in tocNode" :key="index">
        <nuxt-link
          :class="`anchor ${item.level === 3 ? 'pl-2' : ''}`"
          :to="`#${item.anchor}`"
          v-text="item.text"
        ></nuxt-link>
      </li>
    </ul>
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
      pos: null,
      anchors: [],
      anchorElements: [],
    }
  },
  watch: {
    pos(newPos, oldPos) {
      this.deactiveAnchor(oldPos)
      this.activeAnchor(newPos)
    },
  },
  mounted() {
    this.getAnchorElements()
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
            this.pos = this.anchorElements[index]
          }
        } else {
          const nextElementOffset = document.querySelector(
            '[id="' + this.anchors[index + 1].replace('#', '') + '"]'
          ).offsetTop

          if (scrollTop > elementOffset && scrollTop < nextElementOffset) {
            this.pos = this.anchorElements[index]
            break
          }
        }
      }
    },
    getAnchorElements() {
      const _anchorElements = this.$el.querySelectorAll('a.anchor')
      this.anchorElements = _anchorElements
      if (this.anchorElements.length !== 0) this.pos = this.anchorElements[0]
    },
    getAnchors() {
      const _anchors = []
      this.anchorElements.forEach((item) => {
        const href = decodeURI(item.getAttribute('href'))
        _anchors.push(href.slice(href.indexOf('#')))
      })
      this.anchors = _anchors
    },
    activeAnchor(pos) {
      if (pos) {
        pos.parentNode.classList.add('active')
      }
    },
    deactiveAnchor(pos) {
      if (pos) {
        pos.parentNode.classList.remove('active')
      }
    },
  },
}
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';

.article-toc {
  position: sticky;
  top: 30px;
  max-width: 220px;

  ul:first-child > li:first-child {
    padding-top: 0;
  }

  ul {
    padding-left: 0;
    font-size: 0;
  }

  ul > li {
    list-style: none;
    padding: 5px 20px;
    font-size: 13px;
    border-left: 2px solid #{map-get($grey, 'lighten-2')};
    width: 100%;
    display: inline-block;
  }

  a {
    color: #{map-get($grey, 'darken-1')};
    text-decoration: none;
  }

  li.active {
    border-left: 2px solid #{map-get($green, 'darken-3')};

    a {
      color: #{map-get($green, 'darken-3')};
      font-weight: bold;
    }
  }
}
</style>
