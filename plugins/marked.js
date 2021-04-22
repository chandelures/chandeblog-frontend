import marked from 'marked'
import hljs from 'highlight.js/lib/core'
import katex from 'katex'

const languages = process.env.highlightLang

languages.forEach((langName) => {
  const langModule = require(`highlight.js/lib/languages/${langName}`)
  hljs.registerLanguage(langName, langModule)
})

const _marked = {}

_marked.tocNode = []

const minLevel = 2
const maxLevel = 3

const renderer = {
  heading(text, level, raw) {
    const anchor =
      this.options.headerPrefix +
      raw.toLowerCase().replace(/[^\w\\u4e00-\\u9fa5]]+/g, '-')
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
  const language = hljs.getLanguage(lang) ? lang : 'plaintext'
  return hljs.highlight(code, { language }).value
}

marked.use({ renderer, tokenizer, highlight })

_marked.marked = (markdownString) => {
  _marked.tocNode = []
  return marked(markdownString)
}

export default ({ app }, inject) => {
  inject('marked', _marked)
}
