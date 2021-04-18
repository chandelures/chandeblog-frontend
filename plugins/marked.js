'use strict'

import marked from 'marked'
import hljs from 'highlight.js/lib/core'

const languages = process.env.highlightLang

languages.forEach((langName) => {
  const langModule = require(`highlight.js/lib/languages/${langName}`)
  hljs.registerLanguage(langName, langModule)
})

const _marked = {}

_marked.tocNode = []

const minLevel = 2
const maxLevel = 3

const _renderer = (() => {
  const renderer = new marked.Renderer()

  renderer.heading = function (_text, _level, _raw) {
    const _anchor =
      this.options.headerPrefix +
      _raw.toLowerCase().replace(/[^\w\\u4e00-\\u9fa5]]+/g, '-')
    if (_level >= minLevel && _level <= maxLevel)
      _marked.tocNode.push({
        anchor: _anchor,
        level: _level,
        text: _text,
      })
    return (
      '<h' + _level + ' id="' + _anchor + '">' + _text + '</h' + _level + '>\n'
    )
  }

  return renderer
})()

_marked.marked = (markdownString) => {
  marked.setOptions({
    highlight: (code, lang) => {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    },
  })
  return marked(markdownString)
}

_marked.markedExtend = (markdownString) => {
  marked.setOptions({
    renderer: _renderer,
    highlight: (code, lang) => {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    },
  })
  _marked.tocNode = []
  return marked(markdownString)
}

export default ({ app }, inject) => {
  inject('marked', _marked)
}
