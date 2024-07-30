var path = require('node:path')
var furu = require('../index.js')

var routes = {
  'get#/routes': 'hello'
}

var middleware = {
  hello: async function (req, res) {
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

  // Mime test
  if (req.method == 'GET' && req.pathname == '/sitemap.xml') {
    return '<xml></xml>'
  }

  // Head test with content
  if (req.method == 'HEAD' && req.pathname == '/headresult') {
    return { empty: 1 }
  }

  // Head test empty response
  if (req.method == 'HEAD' && req.pathname == '/headempty') {
    return
  }

  // Pipe local test
  if (req.pathname == '/pipelocal') {
    var file = path.join(process.cwd(), 'spec', 'files', 'body.json')
    return res.stream(file)
  }

  // Pipe remote test
  if (req.pathname == '/piperemote') {
    var file = 'https://7ino.s3.amazonaws.com/body-s7y5fk.json'
    return res.stream(file)
  }
}

var server = furu({ port: 9090, routes, middleware }, handleRequest)

server.on('error', function (e) {
  console.log(e)
})
