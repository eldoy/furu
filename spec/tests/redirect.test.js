const assert = require('assert')
const request = require('spett')

const it = {}, x = {}

it['should support redirects'] = async function() {
  const { data, code, res } = await request({
    path: '/redirect',
    method: 'GET'
  })
  assert.equal(code, '302')
  assert.equal(res.headers.location, '/')
}

module.exports = it