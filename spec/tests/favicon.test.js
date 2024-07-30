var assert = require('assert')
var request = require('pulli')

var it = {},
  x = {}

it['should block favicon requests'] = async function () {
  var { data, status, headers } = await request({
    url: 'http://localhost:9090/favicon.ico'
  })
  assert.equal(status, '404')
}

module.exports = it
