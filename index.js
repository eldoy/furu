const http = require('http')
const assets = require('smor')
const request = require('rekvest')
const cors = require('kross')
const parser = require('bparse')
const cookie = require('wcookie')
const ws = require('ws')

// FEATURE: Should be able to test and build routes without a web server

// TODO: Return types / content types
// TODO: Routes
// TODO: Websocket support (at least for development)

function setContentType(res, type) {
  if (!res.hasHeader('content-type')) {
    res.setHeader('content-type', `${type}; charset=utf-8`)
  }
}

function furu(opt = {}) {

  if (typeof opt.port == 'undefined') {
    opt.port = process.env.FURU_PORT || 9000
  }

  let callback

  const server = http.createServer(httpRequest)

  // Set up web socket for development
  if (process.env.NODE_ENV == 'dev') {
    new ws.Server({ server })
  }

  async function httpRequest(req, res) {
    // Add properties to request
    request(req)

    // Block favicon requests
    if (req.method == 'GET' && req.pathname == '/favicon.ico') {
      res.statusCode = 404
      return res.end('')
    }

    // Cors
    if (req.method == 'OPTIONS') {
      cors(req, res)
      res.statusCode = 204
      return res.end('')
    }

    // Read cookies
    cookie(req)

    // Parse body if POST request
    if (req.method == 'POST') {
      await parser(req)
    }

    let data = ''

    if (typeof server.action == 'function') {
      data = await server.action(req, res)
    }

    if (typeof data == 'undefined') {
      data = ''
      res.statusCode = 404

    } else if (typeof data == 'object') {
      setContentType(res, 'application/json')
      data = JSON.stringify(data)

    } else if (typeof data == 'string') {
      setContentType(res, 'text/html')
    }

    // Set content length
    res.setHeader('content-length', Buffer.byteLength(data))

    // Write cookies
    if (req.cookieJar && req.cookieJar.length) {
      res.setHeader('set-cookie', req.cookieJar.headers)
    }

    // Send data
    res.end(data)
  }

  return new Promise(function(resolve) {

    server.listen(opt.port, function() {
      const port = server.address().port
      console.log(`Web server listening on port ${port}`)
      resolve(server)
    })
  })

}

module.exports = furu