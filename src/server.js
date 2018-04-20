const grpc = require('grpc')

const log = require('@magic/log')

const defaultConfig = require('./config')

const defaultActions = require('./actions')

const main = (actions = defaultActions, options = {}) => {
  const { host, port, service, package, path } = Object.assign(
    {},
    defaultConfig,
    options,
  )

  const proto = grpc.load(path)[package]
  const server = new grpc.Server()

  server.addService(proto[service].service, actions)
  const url = `${host}:${port}`
  server.bind(url, grpc.ServerCredentials.createInsecure())

  server.start()
  log.info('grpc', { service, package }, 'listening on', url)
  return server
}

module.exports = main
