module.exports = {
  assetsDir: "static",

  transpileDependencies: ["vuetify"],

  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "chandelure blog - Clog";
      return args;
    });
  },

  configureWebpack: {
    devServer: {
      host: "0.0.0.0",
      port: 8080,
      https: false,
      proxy: {
        "/api": {
          target: "http://127.0.0.1:8000",
          changeOrigin: true,
          secure: false,
          pathRewrite: {
            "^/api": "/",
          },
        },
        "/media": {
          target: "http://127.0.0.1:8000",
          changeOrigin: true,
          secure: false,
          pathRewrite: {
            "^/media": "/media",
          },
        },
        "/admin": {
          target: "http://127.0.0.1:8000",
          changeOrigin: true,
          secure: false,
          pathRewrite: {
            "^/admin": "/admin",
          },
        },
        "/static": {
          target: "http://127.0.0.1:8000",
          changeOrigin: true,
          secure: false,
          pathRewrite: {
            "^/static": "/static",
          },
        },
      },
    },
  },
};
