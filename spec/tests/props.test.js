var assert = require('assert')
var request = require('spett')

var it = {},
  x = {}

it['should support extra properties'] = async function () {
  var { data, code, res } = await request({
    path: '/props'
  })
  assert.equal(data.file, 'props')
  assert.equal(data.ip, '::1')
}

module.exports = it
