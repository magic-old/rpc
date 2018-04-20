const actions = {
  Hello: (call = {}, cb) => {
    const name = call.request && call.request.name || 'World'

    const message = `Hello, ${name}`

    cb(null, { message })
  },
}

module.exports = actions
