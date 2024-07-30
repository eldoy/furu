var assert = require('assert')
var request = require('pulli')

var it = {},
  x = {}

it['should support xml files'] = async function () {
  var { data, status, headers } = await request({
    url: 'http://localhost:9090/sitemap.xml',
    method: 'GET'
  })
  assert.equal(data, '<xml></xml>')
  assert.equal(headers['content-type'], 'application/xml')
}

module.exports = it
