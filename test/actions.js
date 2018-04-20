const { promise, is } = require('@magic/test')

const actions = require('../src/actions')
const { Hello } = actions

const fns = [
  { fn: () => actions, expect: is.obj },
  { fn: () => Hello, expect: is.fn },
  { fn: promise(r => Hello({ request: { name: 'Moon' } }, r)), expect: is.obj },
  { fn: promise(r => Hello({ request: {} }, r)), expect: is.obj },
  {
    fn: promise(r => Hello({ request: { name: 'Moon' } }, r)),
    info: 'request.user can be passed',
    expect: ({ message }) => message === 'Hello, Moon',
  },
  {
    fn: promise(r => Hello({}, r)),
    expect: ({ message }) => message === 'Hello, World',
    info: 'Without request.user',
  },
  {
    fn: promise(r => Hello(undefined, r)),
    expect: ({ message }) => message === 'Hello, World',
    info: 'Without arguments',
  },
]

module.exports = fns
