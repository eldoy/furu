const assert = require('assert')
const request = require('spett')

const it = {}, x = {}

it['should support xml files'] = async function() {
  const { data, code, res } = await request({
    path: '/sitemap.xml',
    method: 'GET'
  })
  assert.equal(data, '<xml></xml>')
  assert.equal(res.headers['content-type'], 'application/xml')
}

module.exports = it
