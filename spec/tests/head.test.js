var assert = require('assert')
var request = require('pulli')

var it = {},
  x = {}

it['should set html headers for head with response'] = async function () {
  var { data, status, headers } = await request({
    url: 'http://localhost:9090/headresult',
    method: 'HEAD'
  })

  assert.equal(headers['content-type'], 'application/json; charset=utf-8')
  assert.equal(data, '')
  assert.equal(status, 200)
}

it['should set html headers for head empty response'] = async function () {
  var { data, status, headers } = await request({
    url: 'http://localhost:9090/headempty',
    method: 'HEAD'
  })

  assert.equal(headers['content-type'], 'application/json; charset=utf-8')
  assert.equal(data, '')
  assert.equal(status, 200)
}

module.exports = it
