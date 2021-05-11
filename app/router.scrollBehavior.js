import goTo from 'vuetify/es5/services/goto'

export default function (to, from, savedPosition) {
  let scrollTo = 0

  if (to.hash) {
    scrollTo = decodeURI(to.hash)
    if (document.querySelector(scrollTo)) {
      return goTo(scrollTo)
    }
  } else if (savedPosition) {
    return savedPosition
  }

  return { x: 0, y: 0 }
}
