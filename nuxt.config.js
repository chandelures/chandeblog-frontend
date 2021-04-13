import axios from 'axios'

export default {
  // ENV config
  env: {
    apiUrl: process.env.apiUrl || 'http://localhost:8000',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Clog',
    title: 'chandeblog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios.js', ssr: true },
    { src: '~/plugins/filter.js', ssr: true },
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
    '@nuxtjs/sitemap',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.apiUrl,
    proxy: true,
    prefix: '/api',
    credentials: true,
  },

  proxy: {
    '/api': {
      target: process.env.apiUrl,
      pathRewrite: {
        '^/api': '/',
        changeOrigin: true,
      },
    },
    '/media': {
      target: process.env.apiUrl,
      pathRewrite: {
        '^/media': '/media',
        changeOrigin: true,
      },
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Loading config
  loading: {
    color: '#9CCC65',
  },

  // Sitemap config
  sitemap: {
    path: '/sitemap.xml',
    gzip: true,
    cacheTime: 1000 * 60 * 60 * 24,
    routes(callback) {
      axios.defaults.baseURL = process.env.apiUrl
      const maxCount = 10000
      axios
        .all([
          axios.get('articles', {
            params: {
              page: 1,
              size: maxCount,
            },
          }),
        ])
        .then(
          axios.spread(function (articlesRes) {
            const baseRoutes = [
              {
                url: '/',
                changefreq: 'daily',
                priority: 1,
                lastmod: new Date(),
              },
              {
                url: '/about',
                changefreq: 'daily',
                priority: 1,
                lastmod: new Date(),
              },
            ]
            const articlesRoutes = articlesRes.data.results.map((item) => {
              return {
                url: '/articles/' + item.slug,
                changefreq: 'daily',
                priority: 0.9,
                lastmod: new Date(item.created),
              }
            })
            callback(null, baseRoutes.concat(articlesRoutes))
          }),
          function (err) {
            throw err
          }
        )
    },
  },
}
