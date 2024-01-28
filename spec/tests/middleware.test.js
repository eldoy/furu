var assert = require('assert')
var request = require('spett')

var it = {},
  x = {}

it['should support middleware'] = async function () {
  var { data, code, res } = await request({
    path: '/middle',
    method: 'GET'
  })
  assert.equal(data, 'middle')
}

module.exports = it
