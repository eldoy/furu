var assert = require('assert')
var request = require('pulli')

var it = {},
  x = {}

it['should support extra properties'] = async function () {
  var { data, status, headers } = await request({
    url: 'http://localhost:9090/props',
    method: 'POST'
  })
  assert.equal(data.file, 'props')
  assert.equal(data.ip, '::1')
}

module.exports = it
