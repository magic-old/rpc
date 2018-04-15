const grpc = require('grpc')

const defaultConfig = require('./config')

const main = (args = {}) => {
  const { host, port, service, package, path, actions } = Object.assign(
    {},
    defaultConfig,
    args,
  )

  const proto = grpc.load(path)[package]
  const server = new grpc.Server()

  server.addService(proto[service].service, actions)
  const url = `${host}:${port}`
  server.bind(url, grpc.ServerCredentials.createInsecure())

  server.start()
  console.log('grpc service', service, 'listening on', url)
  return server
}

module.exports = main
