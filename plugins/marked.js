'use strict'

import marked from 'marked'

export default ({ app }, inject) => {
  inject('marked', (content) => {
    return marked(content)
  })
}
