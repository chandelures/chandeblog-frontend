import axios from 'axios'

export default {
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
      {
        hid: 'description',
        name: 'description',
        content: 'Chandelure Blog ... Home · About',
      },
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
    '@nuxtjs/feed',
    '@nuxtjs/robots',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.apiUrl || 'http://localhost:5000',
    credentials: false,
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
          type: 'Bearer',
        },
        user: {
          property: false,
        },
        endpoints: {
          login: { url: '/auth/token/login', method: 'post' },
          logout: { url: '/auth/token/logout', method: 'post' },
          user: { url: '/auth/users/profile', method: 'get' },
        },
      },
    },
    cookie: {
      options: {
        maxAge: 60 * 60 * 24 * 7,
      },
    },
    localStorage: false,
  },

  // Sitemap config
  sitemap: {
    path: '/sitemap.xml',
    gzip: true,
    cacheTime: 1000 * 60 * 60 * 24,
    exclude: ['/admin', '/admin/**', '/login', '/signup'],
    routes: async () => {
      axios.defaults.baseURL = process.env.apiUrl || 'http://localhost:5000'

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

      try {
        await getArticleRoutes('articles')
      } catch (err) {}

      return baseRoutes.concat(articlesRoutes)
    },
  },

  // Feed config
  feed: async () => {
    axios.defaults.baseURL = process.env.apiUrl || 'http://localhost:5000'
    let articles = []
    const getArticles = async (url) => {
      try {
        const { data } = await axios.get(url)
        articles = articles.concat(data.results)
        if (data.next) {
          await getArticles(data.next)
        }
      } catch (err) {}
    }
    await getArticles('articles')

    return {
      path: 'feed.xml',
      create(feed) {
        const baseURL = process.env.baseURL || 'http://localhost:3000'
        feed.options = {
          title: 'Chandelure Blog - Clog',
          link: `${baseURL}/feed.xml`,
          description: 'All posts in Chandelure Blog',
        }

        articles.forEach((article) => {
          feed.addItem({
            title: article.title,
            id: article.id,
            link: `${baseURL}/articles/${article.slug}`,
            description:
              article.abstract.replace(/[\r\n]/g, '').slice(0, 100) + '...',
          })
        })
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    }
  },

  // Robots config
  robots: {
    UserAgent: '*',
    Disallow: '/admin',
    Sitemap: `${process.env.baseURL}/sitemap.xml`,
  },
}
