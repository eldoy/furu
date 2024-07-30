var assert = require('assert')
var request = require('pulli')

var it = {},
  x = {}

it['should stream local file content'] = async function () {
  var { data, status, headers } = await request({
    url: 'http://localhost:9090/pipelocal',
    method: 'GET'
  })
  assert.deepEqual(headers['content-type'], 'application/json; charset=utf-8')
  assert.deepEqual(status, 200)
  assert.deepEqual(data, { hello: 'local' })
}

it['should stream remote file content'] = async function () {
  var { data, status, headers } = await request({
    url: 'http://localhost:9090/piperemote',
    method: 'GET'
  })
  assert.deepEqual(headers['content-type'], 'application/json; charset=utf-8')
  assert.deepEqual(status, 200)
  assert.deepEqual(data, { hello: 'world' })
}

module.exports = it
