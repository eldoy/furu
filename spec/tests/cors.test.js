var assert = require('assert')
var request = require('pulli')

var it = {},
  x = {}

it['should support cors'] = async function () {
  var { data, status, headers } = await request({
    url: 'http://localhost:9090',
    method: 'OPTIONS',
    headers: {
      origin: 'localhost:9090'
    }
  })
  assert.equal(status, '204')
  assert.equal(headers['access-control-allow-origin'], 'localhost:9090')
  assert.equal(headers['access-control-allow-credentials'], 'true')
  assert.equal(
    headers['access-control-allow-headers'],
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control'
  )
  assert.equal(
    headers['access-control-allow-methods'],
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
}

module.exports = it
