'use strict'

import Vue from 'vue'

const vueFilterDate = {
  install: (Vue) => {
    Vue.filter('formatDate', (dateStr) => {
      const date = new Date(dateStr)
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Spt',
        'Oct',
        'Nov',
        'Dec',
      ]
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      return monthNames[month] + ' ' + day + ', ' + year
    })
  },
}

Vue.use(vueFilterDate)

export default vueFilterDate
