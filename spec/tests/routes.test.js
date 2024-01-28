var assert = require('assert')
var request = require('spett')

var it = {},
  x = {}

it['should support routes'] = async function () {
  var { data, code, res } = await request({
    path: '/routes',
    method: 'GET'
  })
  assert.equal(data, 'hello')
}

module.exports = it
