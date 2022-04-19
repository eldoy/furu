const furu = require('../index.js')

async function handleRequest(req, res) {
  if (req.method == 'POST' && req.pathname == '/hello') {
    return { hello: 'world' }
  }
}

furu({ port: 9090 }, handleRequest)
