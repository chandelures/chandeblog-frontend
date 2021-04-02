export default ({ $axios, error }) => {
  $axios.onError((err) => {
    const code = parseInt(err.response && err.response.status)
    if (code === 404) {
      error({ statusCode: 404, message: err.message })
      return Promise.resolve(false)
    } else {
      error(err)
      return Promise.resolve(false)
    }
  })
}
