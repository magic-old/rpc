const { client, server } = require('../src')

const startServer = () => {
  const actions = {
    Hello: (call, cb) => {
      const { user = 'world' } = call.request
      cb(null, { message: `Hello ${user}` })
    },
  }

  const app = server({ actions })
  // console.log('server started')

  return () => {
    app.forceShutdown()
    // console.log('server closed')
  }
}

const fns = [
  {
    fn: () => new Promise(r => client().Hello({}, error => r(error))),
    before: startServer,
    expect: null,
  },
  {
    fn: () => new Promise(r => client().Hello({}, (error, data) => r(data))),
    before: startServer,
    expect: ({ message }) => message === 'Hello world',
  },
  {
    fn: () => new Promise(r => client().Hello({}, (error, data) => r(data))),
    before: startServer,
    expect: ({ message }) => message === 'Hello world',
  },
]

module.exports = fns
