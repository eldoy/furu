var assert = require('assert')
var request = require('pulli')

var it = {},
  x = {}

it['should return empty from post not found'] = async function () {
  var { data, status, headers } = await request({
    url: 'http://localhost:9090/none',
    method: 'POST'
  })
  assert.deepEqual(headers['content-type'], 'application/json; charset=utf-8')
  assert.deepEqual(status, 404)
  assert.deepEqual(data, {})
}

it['should return data from post existing path'] = async function () {
  var { data, status, headers } = await request({
    url: 'http://localhost:9090/hello',
    method: 'POST'
  })
  assert.deepEqual(headers['content-type'], 'application/json; charset=utf-8')
  assert.deepEqual(status, 200)
  assert.deepEqual(data.hello, 'world')
}

it['should return empty string from get not found'] = async function () {
  var { data, status, headers } = await request({
    url: 'http://localhost:9090/not-found',
    method: 'GET'
  })
  assert.deepEqual(headers['content-type'], 'text/html; charset=utf-8')
  assert.deepEqual(status, 404)
  assert.deepEqual(data, '')
}

module.exports = it
