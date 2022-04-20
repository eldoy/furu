const assert = require('assert')
const request = require('spett')

const it = {}, x = {}

it['should support cookies'] = async function() {
  const { data, code, res } = await request({
    path: '/cookies'
  })
  assert.ok(res.headers['set-cookie'][0].startsWith('name=value'))
}

module.exports = it