const test = require('./lib/test.js')

async function run() {
  await new Promise(r => setTimeout(r, 500))
  console.time('Test run')
  await test('http')
  console.timeEnd('Test run')
}
run()
