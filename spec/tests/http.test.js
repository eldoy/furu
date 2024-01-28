var assert = require('assert')
var request = require('spett')

var it = {},
  x = {}

it['should return empty from post not found'] = async function () {
  var { data, code, res } = await request({
    path: '/none'
  })
  assert.deepEqual(
    res.headers['content-type'],
    'application/json; charset=utf-8'
  )
  assert.deepEqual(code, 404)
  assert.deepEqual(data, {})
}

it['should return data from post existing path'] = async function () {
  var { data, code, res } = await request({
    path: '/hello'
  })
  assert.deepEqual(
    res.headers['content-type'],
    'application/json; charset=utf-8'
  )
  assert.deepEqual(code, 200)
  assert.deepEqual(data.hello, 'world')
}

it['should return empty string from get not found'] = async function () {
  var { data, code, res } = await request({
    path: '/not-found',
    method: 'GET'
  })
  assert.deepEqual(res.headers['content-type'], 'text/html; charset=utf-8')
  assert.deepEqual(code, 404)
  assert.deepEqual(data, '')
}

module.exports = it
