const test = require('./lib/test.js')

async function run() {
  await new Promise(r => setTimeout(r, 500))
  await test('http')
  console.log('All tests passed.')
}
run()
