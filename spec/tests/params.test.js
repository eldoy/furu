var assert = require('assert')
var request = require('pulli')

var it = {},
  x = {}

it['should read body params'] = async function () {
  var { data, status, headers } = await request({
    url: 'http://localhost:9090/params',
    method: 'POST',
    data: {
      hello: 'world'
    }
  })
  assert.equal(data.hello, 'world')
}

module.exports = it
