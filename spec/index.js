process.env.NODE_ENV = 'test'

const test = require('spekky')
require('./server.js')

async function run() {
  console.time('Test run')

  await test('http')
  await test('cookies')
  await test('cors')
  await test('headers')

  console.timeEnd('Test run')
}
run()
