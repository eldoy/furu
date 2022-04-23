const assert = require('assert')
const request = require('spett')

const it = {}, x = {}

it['should support middleware'] = async function() {
  const { data, code, res } = await request({
    path: '/middle',
    method: 'GET'
  })
  assert.equal(data, 'middle')
}

module.exports = it
