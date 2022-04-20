const assert = require('assert')
const request = require('spett')

const it = {}, x = {}

it['should set html headers for get'] = async function() {
  const { data, code, res } = await request({
    method: 'GET'
  })
  assert.equal(res.headers['content-type'], 'text/html; charset=utf-8')
}

it['should set json headers for post'] = async function() {
  const { data, code, res } = await request({
    method: 'POST'
  })
  assert.equal(res.headers['content-type'], 'application/json; charset=utf-8')
}

module.exports = it
