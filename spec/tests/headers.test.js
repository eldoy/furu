var assert = require('assert')
var request = require('spett')

var it = {},
  x = {}

it['should set html headers for get'] = async function () {
  var { data, code, res } = await request({
    method: 'GET'
  })
  assert.equal(res.headers['content-type'], 'text/html; charset=utf-8')
}

it['should set json headers for post'] = async function () {
  var { data, code, res } = await request({
    method: 'POST'
  })
  assert.equal(res.headers['content-type'], 'application/json; charset=utf-8')
}

module.exports = it
