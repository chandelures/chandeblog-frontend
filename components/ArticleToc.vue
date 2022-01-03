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
      pos: 0,
      hrefs: [],
      anchors: [],
      currentTop: 0,
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
    this.getHrefs()
    this.currentTop = this.getScrollTop()
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const scrollTop = this.getScrollTop()

      if (this.reachBottom()) {
        this.pos = this.hrefs.length - 1
        return
      }

      const adjustPos = (index) => {
        const elementOffset = document.querySelector(
          this.hrefs[index]
        ).offsetTop

        if (index === this.hrefs.length - 1) {
          if (scrollTop > elementOffset) {
            this.pos = index
          }
          return true
        }

        const nextElementOffset = document.querySelector(
          this.hrefs[index + 1]
        ).offsetTop

        if (scrollTop > elementOffset && scrollTop < nextElementOffset) {
          this.pos = index
          return true
        }

        return false
      }

      if (this.currentTop <= scrollTop) {
        for (let index = this.pos + 1; index < this.hrefs.length; ++index) {
          if (adjustPos(index)) {
            break
          }
        }
      } else {
        for (let index = this.pos - 1; index >= 0; --index) {
          if (adjustPos(index)) {
            break
          }
        }
      }

      setTimeout(() => {
        this.currentTop = scrollTop
      }, 0)
    },
    getScrollTop() {
      return (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      )
    },
    reachBottom(offset = 10) {
      const scrollTop = this.getScrollTop()
      const windowHeight = window.innerHeight
      const scrollHeight = document.body.scrollHeight
      if (scrollTop + windowHeight + offset >= scrollHeight) {
        return true
      }
      return false
    },
    getAnchors() {
      const _anchors = this.$el.querySelectorAll('a.anchor')
      this.anchors = _anchors
      if (this.anchors.length !== 0) {
        this.pos = 0
        this.activeAnchor(this.pos)
      }
    },
    getHrefs() {
      const _hrefs = []
      this.anchors.forEach((item) => {
        const href = decodeURI(item.getAttribute('href'))
        _hrefs.push(href.slice(href.indexOf('#')))
      })
      this.hrefs = _hrefs
    },
    activeAnchor(pos) {
      this.anchors[pos].parentNode.classList.add('active')
    },
    deactiveAnchor(pos) {
      this.anchors[pos].parentNode.classList.remove('active')
    },
  },
}
</script>
