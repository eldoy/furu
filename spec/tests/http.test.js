const assert = require('assert')
const request = require('spett')

const it = {}, x = {}

it['should return empty from post non-existing path'] = async function() {
  const { data, code, res } = await request({
    path: '/none'
  })
  assert.deepEqual(res.headers['content-type'], 'application/json; charset=utf-8')
  assert.deepEqual(code, 200)
  assert.deepEqual(data, {})
}

it['should return data from post existing path'] = async function() {
  const { data, code, res } = await request({
    path: '/hello'
  })
  assert.deepEqual(res.headers['content-type'], 'application/json; charset=utf-8')
  assert.deepEqual(code, 200)
  assert.deepEqual(data.hello, 'world')
}

it['should return empty string from get non-existing'] = async function() {
  const { data, code, res } = await request({
    path: '/empty',
    method: 'GET'
  })
  assert.deepEqual(res.headers['content-type'], 'text/html; charset=utf-8')
  assert.deepEqual(code, 200)
  assert.deepEqual(data, '')
}

module.exports = it
