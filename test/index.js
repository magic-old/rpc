const { run } = require('@magic/test')

const server = require('./server')

const tests = {
  server,
}

run(tests)
