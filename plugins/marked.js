import marked from 'marked'
import hljs from 'highlight.js'
import katex from 'katex'

const _marked = {}

_marked.tocNode = []

const minLevel = 2
const maxLevel = 3

const renderer = {
  heading(text, level, raw) {
    const anchor =
      this.options.headerPrefix +
      raw.toLowerCase().replace(/[^\w\u4E00-\u9FA5]+/g, '-')
    text = text.replace(/<[^>]+>/g, '')
    if (level >= minLevel && level <= maxLevel)
      _marked.tocNode.push({
        anchor,
        level,
        text,
      })
    return '<h' + level + ' id="' + anchor + '">' + text + '</h' + level + '>\n'
  },
}

const tokenizer = {
  paragraph(src) {
    const match = src.match(/^\$\$([\s\S]+?)\$\$/)

    if (match) {
      return {
        type: 'paragraph',
        raw: match[0],
        text: katex.renderToString(match[1].replace(/\$/g, ''), {
          throwOnError: false,
          displayMode: true,
          strict: false,
        }),
      }
    }

    return false
  },
  inlineText(src) {
    const match = src.match(/\$([\s\S]+?)\$/g)

    if (match) {
      let text = src
      match.forEach((item) => {
        text = text.replace(
          item,
          katex.renderToString(item.replace(/\$/g, ''), {
            throwOnError: false,
            displayMode: false,
            strict: false,
          })
        )
      })
      return {
        type: 'text',
        raw: src,
        text,
      }
    }
    return false
  },
}

const highlight = (code, lang) => {
  return hljs.highlightAuto(code).value
}

marked.use({ renderer, tokenizer, highlight })

_marked.marked = (markdownString) => {
  _marked.tocNode = []
  return marked(markdownString)
}

export default ({ app }, inject) => {
  inject('marked', _marked)
}
