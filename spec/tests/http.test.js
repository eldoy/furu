const assert = require('assert')
const request = require('spett')

const it = {}

it['should do some stuff'] = async function() {
  const { data, code } = await request({ path: '/hello'})
  assert.deepEqual(code, 200)
  console.log(data)
  assert.deepEqual(data.hello, 'world')
}

module.exports = it
