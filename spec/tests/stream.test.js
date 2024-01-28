var assert = require('assert')
var request = require('spett')

var it = {},
  x = {}

it['should stream local file content'] = async function () {
  var { data, code, res } = await request({
    method: 'get',
    path: '/pipelocal'
  })
  assert.deepEqual(
    res.headers['content-type'],
    'application/json; charset=utf-8'
  )
  assert.deepEqual(code, 200)
  assert.deepEqual(data, { hello: 'local' })
}

it['should stream remote file content'] = async function () {
  var { data, code, res } = await request({
    method: 'GET',
    path: '/piperemote'
  })
  assert.deepEqual(
    res.headers['content-type'],
    'application/json; charset=utf-8'
  )
  assert.deepEqual(code, 200)
  assert.deepEqual(data, { hello: 'world' })
}

module.exports = it
