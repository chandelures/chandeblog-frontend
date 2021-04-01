export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Clog',
    title: 'chandeblog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: '技术分享' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/filter.js', ssr: true },
    { src: '~/plugins/highlight.js', ssr: true },
    { src: '~/plugins/marked.js', ssr: true },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.apiUrl || '',
    proxy: true,
    prefix: '/api',
  },

  proxy: {
    '/api': {
      target: process.env.apiUrl || '',
      pathRewrite: {
        '^/api': '/',
        changeOrigin: true,
      },
    },
    '/media': {
      target: process.env.apiUrl || '',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/media': '/media',
      },
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Loading config
  loading: {
    color: '#9CCC65',
  },
}
