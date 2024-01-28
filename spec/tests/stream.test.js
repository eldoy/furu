var assert = require('assert')
var request = require('spett')

var it = {},
  x = {}

it['should return file content through pipe'] = async function () {
  var { data, code, res } = await request({
    path: '/pipe'
  })
  assert.deepEqual(
    res.headers['content-type'],
    'application/json; charset=utf-8'
  )
  assert.deepEqual(code, 200)
  assert.deepEqual(data, { hello: 'world' })
}

module.exports = it
