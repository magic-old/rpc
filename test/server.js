const { promise, log } = require('@magic/test')

const { client, server } = require('../src')

const actions = require('../src/actions')

const startServer = (port = 50051) => () => {
  const app = server(actions, { port })

  log.info('server started on', { port })
  return () => {
    app.forceShutdown()
  }
}

const fns = [
  {
    fn: promise(r => client().Hello({}, r)),
    before: startServer(),
    expect: ({ message }) => message === 'Hello, World',
  },
  {
    fn: promise(r => client({ port: 232323 }).Hello({}, r)),
    before: startServer(232323),
    expect: ({ message }) => message === 'Hello, World',
  },
  {
    fn: promise(r => client({ port: 232324 }).Hello({}, r)),
    before: startServer(232324),
    expect: ({ message }) => message === 'Hello, World',
  },
  {
    fn: promise(r => client({ port: 232325 }).Hello({ name: 'Test' }, r)),
    before: startServer(232325),
    expect: ({ message }) => message === 'Hello, Test',
  },
]

module.exports = fns
