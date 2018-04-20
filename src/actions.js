const actions = {
  Hello: (call = { request: {} }, cb) => {
    const { user = 'World' } = call.request

    cb(null, { message: `Hello, ${user}` })
  },
}

module.exports = actions
