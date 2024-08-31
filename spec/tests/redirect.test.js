var assert = require('assert')
var request = require('pulli')

var it = {},
  x = {}

it['should support redirects'] = async function () {
  var { data, status, headers } = await request({
    url: 'http://localhost:9090/redirect',
    maxRedirects: 0
  })
  assert.equal(status, '302')
  assert.equal(headers.location, '/')
}

it['should support redirects with cookies'] = async function () {
  var { data, status, headers } = await request({
    url: 'http://localhost:9090/redirectcookies',
    maxRedirects: 0
  })
  assert.ok(headers['set-cookie'][0].startsWith('name=value'))
  assert.equal(status, '302')
  assert.equal(headers.location, '/')
}

module.exports = it
