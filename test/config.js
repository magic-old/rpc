const config = require('../src/config')

const fns = [
  { fn: () => config.host, expect: 'localhost' },
  { fn: () => config.port, expect: 50051 },
  { fn: () => config.service, expect: 'Greeter' },
  { fn: () => config.package, expect: 'default' },
  { fn: () => config.path, expect: t => t.indexOf('default.proto') > -1 },
]

module.exports = fns
