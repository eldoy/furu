var assert = require('assert')
var request = require('pulli')

var it = {},
  x = {}

it['should set html headers for get'] = async function () {
  var { data, status, headers } = await request({
    url: 'http://localhost:9090',
    method: 'GET'
  })

  assert.equal(headers['content-type'], 'text/html; charset=utf-8')
}

it['should set json headers for post'] = async function () {
  var { data, status, headers } = await request({
    url: 'http://localhost:9090',
    method: 'POST'
  })
  assert.equal(headers['content-type'], 'application/json; charset=utf-8')
}

module.exports = it
