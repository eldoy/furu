const assert = require('assert')
const request = require('spett')

const it = {}, x = {}

it['should block favicon requests'] = async function() {
  const { data, code, res } = await request({
    path: '/favicon.ico'
  })
  assert.equal(code, '404')
}

module.exports = it
