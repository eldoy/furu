var assert = require('assert')
var request = require('pulli')

var it = {},
  x = {}

it['should support cookies'] = async function () {
  var { data, status, headers } = await request({
    url: 'http://localhost:9090/cookies',
    method: 'POST'
  })
  assert.ok(headers['set-cookie'][0].startsWith('name=value'))
}

module.exports = it
