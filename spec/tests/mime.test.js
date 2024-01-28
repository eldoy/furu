var assert = require('assert')
var request = require('spett')

var it = {},
  x = {}

it['should support xml files'] = async function () {
  var { data, code, res } = await request({
    path: '/sitemap.xml',
    method: 'GET'
  })
  assert.equal(data, '<xml></xml>')
  assert.equal(res.headers['content-type'], 'application/xml')
}

module.exports = it
