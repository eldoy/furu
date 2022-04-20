const assert = require('assert')
const request = require('spett')

const it = {}, x = {}

it['should read body params'] = async function() {
  const { data, code, res } = await request({
    path: '/params',
    params: {
      hello: 'world'
    }
  })
  assert.equal(data.hello, 'world')
}

module.exports = it
