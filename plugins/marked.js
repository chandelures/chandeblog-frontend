'use strict'

import marked from 'marked'
import hljs from 'highlight.js'

const _marked = marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: (code) => {
    return hljs.highlightAuto(code).value
  },
})

export default ({ app }, inject) => {
  inject('marked', (content) => {
    return _marked(content)
  })
}
