const { promise } = require('@magic/test')

const { client, server } = require('../src')

const startServer = (port = 50051) => () => {
  const actions = {
    Hello: (call, cb) => {
      const { user = 'world' } = call.request
      cb(null, { message: `Hello ${user}` })
    },
  }
  const app = server(actions, { port })

  console.log('server started on', { port })
  return () => {
    app.forceShutdown()
  }
}

const fns = [
  {
    fn: () => new Promise(r => client().Hello({}, error => r(error))),
    before: startServer(),
    expect: null,
  },
  {
    fn: () =>
      new Promise(r =>
        client({ port: 232323 }).Hello({}, (error, data) => r(data)),
      ),
    before: startServer(232323),
    expect: ({ message }) => message === 'Hello world',
  },
  {
    fn: () =>
      new Promise(r =>
        client({ port: 232324 }).Hello({}, (error, data) => r(data)),
      ),
    before: startServer(232324),
    expect: ({ message }) => message === 'Hello world',
  },
]

module.exports = fns
