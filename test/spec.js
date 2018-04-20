const { is } = require('@magic/test')
const { client, server } = require('../src')

module.exports = [
  { fn: () => client, expect: is.fn },
  { fn: () => server, expect: is.fn },
]
