const furu = require('../index.js')
const test = require('./lib/test.js')

async function run() {
  const server = await furu({ port: 9090 })

  server.action = async function(req, res) {
    if (req.pathname == '/hello') {
      return { hello: 'world' }
    }
  }

  console.time('Test run')
  await test('http')
  console.timeEnd('Test run')
}
run()
