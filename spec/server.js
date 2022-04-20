const furu = require('../index.js')

const routes = {}

async function handleRequest(req, res) {
  // HTTP test
  if (req.method == 'POST' && req.pathname == '/hello') {
    return { hello: 'world' }
  }

  // Cookie test
  if (req.method == 'POST' && req.pathname == '/cookies') {
    req.cookie('name', 'value')
  }

  // Params test
  if (req.method == 'POST' && req.pathname == '/params') {
    return req.params
  }
}

furu({ port: 9090, routes }, handleRequest)
