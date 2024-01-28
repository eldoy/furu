var assert = require('assert')
var request = require('spett')

var it = {},
  x = {}

it['should block favicon requests'] = async function () {
  var { data, code, res } = await request({
    path: '/favicon.ico'
  })
  assert.equal(code, '404')
}

module.exports = it
