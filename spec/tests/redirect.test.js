var assert = require('assert')
var request = require('spett')

var it = {},
  x = {}

it['should support redirects'] = async function () {
  var { data, code, res } = await request({
    path: '/redirect',
    method: 'GET'
  })
  assert.equal(code, '302')
  assert.equal(res.headers.location, '/')
}

module.exports = it
