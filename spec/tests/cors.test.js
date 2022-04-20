const assert = require('assert')
const request = require('spett')

const it = {}, x = {}

it['should support cors'] = async function() {
  const { data, code, res } = await request({
    method: 'OPTIONS',
    headers: {
      origin: 'localhost:9090'
    }
  })
  assert.equal(code, '204')
  assert.equal(res.headers['access-control-allow-origin'], 'localhost:9090')
  assert.equal(res.headers['access-control-allow-credentials'], 'true')
  assert.equal(res.headers['access-control-allow-headers'], 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control')
  assert.equal(res.headers['access-control-allow-methods'], 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
}

module.exports = it