const assert = require('assert')
const request = require('spett')

const it = {}, x = {}

it['should support routes'] = async function() {
  const { data, code, res } = await request({
    path: '/routes',
    method: 'GET'
  })
  assert.equal(data, 'hello')
}

module.exports = it
