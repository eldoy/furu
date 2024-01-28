var assert = require('assert')
var request = require('spett')

var it = {},
  x = {}

it['should support cookies'] = async function () {
  var { data, code, res } = await request({
    path: '/cookies'
  })
  assert.ok(res.headers['set-cookie'][0].startsWith('name=value'))
}

module.exports = it
