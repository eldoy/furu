process.env.NODE_ENV = 'test'

const test = require('spekky')
require('./server.js')

async function run() {
  console.time('Test run')

  await new Promise(r => setTimeout(r, 500))

  await test('http')
  await test('cookies')
  await test('cors')
  await test('headers')
  await test('params')
  await test('props')
  await test('favicon')

  console.timeEnd('Test run')
}
run()
