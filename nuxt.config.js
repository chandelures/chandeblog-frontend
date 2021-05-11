import axios from 'axios'

export default {
  // ENV config
  env: {
    apiUrl: process.env.apiUrl || 'http://localhost:8000',
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
      {
        hid: 'description',
        name: 'description',
        content: 'Chandelure Blog ... Home · About',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@latest/build/styles/default.min.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/katex@latest/dist/katex.min.css',
      },
    ],
    script: [
      {
        hid: 'marked',
        src: 'https://cdn.jsdelivr.net/npm/marked@latest/marked.min.js',
        defer: true,
      },
      {
        hid: 'katex',
        src: 'https://cdn.jsdelivr.net/npm/katex@latest/dist/katex.min.js',
        defer: true,
      },
      {
        hid: 'highlightjs',
        src: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@latest/build/highlight.min.js',
        defer: true,
      },
    ],
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
    baseURL: process.env.apiUrl,
    credentials: false,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isDev, isClient }) {
      if (isClient) {
        config.externals = {
          marked: 'marked',
          'highlight.js': 'hljs',
          katex: 'katex',
        }
      }
    },
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
    exclude: [
      '/admin',
      '/admin/articles',
      '/admin/articles/create',
      '/admin/categories',
      '/admin/images',
      '/admin/users',
      '/login',
    ],
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

  // Feed config
  feed: async () => {
    axios.defaults.baseURL = process.env.apiUrl
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
        feed.options = {
          title: 'Chandelure Blog - Clog',
          link: `${process.env.baseURL}/feed.xml`,
          description: 'All posts in Chandelure Blog',
        }

        articles.forEach((article) => {
          feed.addItem({
            title: article.title,
            id: article.id,
            link: `${process.env.baseURL}/articles/${article.slug}`,
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
    Sitemap: '/sitemap.xml',
  },
}
