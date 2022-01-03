export default ({ $axios, error }) => {
  $axios.onError((err) => {
    const code = parseInt(err.response && err.response.status)
    const url = err.response.config.url
    if (code === 400 && url === '/auth/token/login') {
      return Promise.resolve(true)
    }
    error({ statusCode: code, message: err.message })
    return Promise.resolve(false)
  })
}
