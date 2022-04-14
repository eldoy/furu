const test = require('./lib/test.js')

async function run() {
  await new Promise(r => setTimeout(r, 500))
  console.time('All tests passed')
  await test('http')
  console.timeEnd('All tests passed')
}
run()
