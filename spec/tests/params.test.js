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

it['should transform params'] = async function () {
  var { data, status, headers } = await request({
    url: 'http://localhost:9090/transform',
    method: 'POST',
    data: {
      values: {
        date: '2024-12-02T00:00:00.000Z'
      }
    }
  })
  assert.equal(data.type, 'object')
}

module.exports = it
