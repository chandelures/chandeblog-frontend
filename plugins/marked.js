'use strict'

import marked from 'marked'
import hljs from 'highlight.js'

const _marked = {}

_marked.toc = []

const _renderer = (() => {
  const renderer = new marked.Renderer()

  renderer.heading = function (_text, _level, _raw) {
    const _anchor =
      this.options.headerPrefix +
      _raw.toLowerCase().replace(/[^\w\\u4e00-\\u9fa5]]+/g, '-')
    _marked.toc.push({
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
    highlight: (code) => {
      return hljs.highlightAuto(code).value
    },
  })
  return marked(markdownString)
}

_marked.markedExtend = (markdownString) => {
  marked.setOptions({
    renderer: _renderer,
    highlight: (code) => {
      return hljs.highlightAuto(code).value
    },
  })
  _marked.toc = []
  return marked(markdownString)
}

_marked.buildToc = (minLevel = 2, maxLevel = 3) => {
  const levelStack = []
  let result = ''
  const addStartUl = () => {
    result += '<ul>\n'
  }
  const addEndUl = () => {
    result += '</ul>\n'
  }
  const addLi = (anchor, text) => {
    result += '<li><a href="#' + anchor + '">' + text + '</a></li>\n'
  }
  _marked.toc.forEach((item) => {
    if (item.level < minLevel || item.level > maxLevel) return
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
}

export default ({ app }, inject) => {
  inject('marked', _marked)
}
