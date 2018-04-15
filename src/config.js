const path = require('path')

const PROTO_PATH = path.join(__dirname, 'default.proto')

module.exports = {
  host: 'localhost',
  port: 50051,
  service: 'Greeter',
  package: 'default',
  path: PROTO_PATH,
}
