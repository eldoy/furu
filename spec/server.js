const furu = require('../index.js')

const routes = {
  'get#/routes': 'hello'
}

const middleware = {
  hello: async function(req, res) {
    if (req.method == 'GET' && req.pathname == '/middle') {
      return 'middle'
    }
  }
}

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

  // Properties test
  if (req.method == 'POST' && req.pathname == '/props') {
    return {
      file: req.file,
      ip: req.ip
    }
  }

  // Redirect test
  if (req.method == 'GET' && req.pathname == '/redirect') {
    return req.redirect()
  }

  // Routes test
  if (req.method == 'GET' && req.pathname == '/routes') {
    return req.route
  }
}

const server = furu({ port: 9090, routes, middleware }, handleRequest)

server.on('error', function(e) {
  console.log(e)
})
