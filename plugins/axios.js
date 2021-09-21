export default ({ $axios, error }) => {
  $axios.onError((err) => {
    const code = parseInt(err.response && err.response.status)
    error({ statusCode: code, message: err.message })
    return Promise.resolve(false)
  })
}
