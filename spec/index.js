require('./server.js')
const test = require('spekky')

async function run() {
  console.time('Test run')

  await test('http')

  console.timeEnd('Test run')
}
run()
