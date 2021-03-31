'use strict'

import marked from 'marked'
import Vue from 'vue'

Vue.prototype.$marked = (content) => {
  return marked(content)
}
