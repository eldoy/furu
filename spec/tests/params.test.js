var assert = require('assert')
var request = require('spett')

var it = {},
  x = {}

it['should read body params'] = async function () {
  var { data, code, res } = await request({
    path: '/params',
    params: {
      hello: 'world'
    }
  })
  assert.equal(data.hello, 'world')
}

module.exports = it
