var assert = require('assert')
var request = require('pulli')

var it = {},
  x = {}

it['should support middleware'] = async function () {
  var { data, status, headers } = await request({
    url: 'http://localhost:9090/middle',
    method: 'GET'
  })
  assert.equal(data, 'middle')
}

module.exports = it
