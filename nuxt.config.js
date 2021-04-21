import axios from 'axios'
import webpack from 'webpack'

const highlightLang = [
  'bash',
  'c',
  'csharp',
  'cpp',
  'css',
  'go',
  'xml',
  'http',
  'json',
  'java',
  'javascript',
  'kotlin',
  'less',
  'lua',
  'makefile',
  'markdown',
  'nginx',
  'objectivec',
  'php',
  'perl',
  'plaintext',
  'python',
  'python-repl',
  'r',
  'ruby',
  'rust',
  'scss',
  'sql',
  'shell',
  'swift',
  'typescript',
  'vbnet',
  'yaml',
]

export default {
  // ENV config
  env: {
    apiUrl: process.env.apiUrl || 'http://localhost:8000',
    highlightLang,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'zh-hans',
    },
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
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
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
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    plugins: [
      new webpack.ContextReplacementPlugin(
        /highlight\.js\/lib\/languages$/,
        new RegExp(`^./(${highlightLang.join('|')})$`)
      ),
    ],
  },

  // Loading config
  loading: {
    color: '#9CCC65',
  },

  // Toast config
  toast: {
    position: 'top-right',
    duration: 2000,
  },

  // Router config
  router: {
    middleware: ['auth'],
  },

  // Auth config
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          required: true,
          type: 'Token',
        },
        user: {
          property: false,
        },
        endpoints: {
          login: { url: '/auth/token/login', method: 'post' },
          logout: { url: '/auth/token/logout', method: 'post' },
          user: { url: '/user/profile', method: 'get' },
        },
      },
    },
    localStorage: false,
  },

  // Sitemap config
  sitemap: {
    path: '/sitemap.xml',
    gzip: true,
    cacheTime: 1000 * 60 * 60 * 24,
    exclude: ['/admin', '/login'],
    routes: async () => {
      axios.defaults.baseURL = process.env.apiUrl

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

      let articlesRoutes = []

      const getArticleRoutes = async (url) => {
        const { data } = await axios.get(url)
        const routes = data.results.map((item) => {
          return {
            url: '/articles/' + item.slug,
            changefreq: 'daily',
            priority: 1,
            lastmod: new Date(item.updated),
          }
        })

        articlesRoutes = articlesRoutes.concat(routes)

        if (data.next) {
          return await getArticleRoutes(data.next)
        }
      }

      await getArticleRoutes('articles')

      return baseRoutes.concat(articlesRoutes)
    },
  },
}
