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
    fn: promise(r => client().Hello({}, r)),
    before: startServer(),
    expect: ({ message }) => message === 'Hello world',
  },
  {
    fn: promise(r => client({ port: 232323 }).Hello({}, r),
      ),
    before: startServer(232323),
    expect: ({ message }) => message === 'Hello world',
  },
  {
    fn: promise(r => client({ port: 232324 }).Hello({}, r)),
    before: startServer(232324),
    expect: ({ message }) => message === 'Hello world',
  },
]

module.exports = fns
