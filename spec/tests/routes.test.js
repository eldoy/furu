var assert = require('assert')
var request = require('pulli')

var it = {},
  x = {}

it['should support routes'] = async function () {
  var { data, status, headers } = await request({
    url: 'http://localhost:9090/routes',
    method: 'GET'
  })
  assert.equal(data, 'hello')
}

module.exports = it
