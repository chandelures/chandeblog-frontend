# Chandeblog Front End

[![build](https://github.com/chandelures/chandeblog-frontend/workflows/build/badge.svg?branch=master)](https://github.com/chandelures/chandeblog-frontend/actions?query=branch%3Amaster)

This is front end assembly for [chandeblog](https://blog.chandelure.com) based on nuxt. The back end assembly is on https://github.com/chandelures/chandeblog.git.

## Credits

- [Nuxt](https://github.com/nuxt/nuxt.js)

## Build

At first, you need install dependencies

```shell
$ npm install
```

Then create a file named .env

```plaintext
apiUrl=http://127.0.0.1:8000
baseURL=http://127.0.0.1:3000
```

if you want to run at develop environment

```shell
$ npm run dev
```

or run at production environment

```shell
$ npm run build

$ npm run start
```

## License

[MIT License](https://github.com/chandelures/chandeblog/blob/master/LICENSE/)
