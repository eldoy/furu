const http = require('http')
const assets = require('smor')
const request = require('rekvest')
const cors = require('kross')
const parser = require('bparse')
const cookie = require('wcookie')
const ws = require('ws')

const PORT = process.env.FURU_PORT || 9000

// FEATURE: Should be able to test and build routes without a web server

// TODO: Return types / content types
// TODO: Routes
// TODO: Websocket support (at least for development)

async function httpRequest(req, res) {
  // Add properties to request
  request(req)

  // FEATURE: Block favicon requests

  // Cors
  // TODO: Allow options
  // Only for OPTIONS requests?
  // FEATURE: If OPTIONS request then cors = autocors?
  if (req.method == 'OPTIONS') {
    cors(req, res)
    res.statusCode = 204
    return res.end('')
  }

  if (req.method == 'POST') {
    await parser(req)
  }

  // Cookies
  cookie(req)

  // Set content type
  // const isContentRequest = ['GET', 'HEAD'].includes(req.method)
  // if (isContentRequest) {
  //   res.setHeader('content-type', 'text/html; charset=utf-8')
  // } else {
  //   res.setHeader('content-type', 'application/json; charset=utf-8')
  // }
  // set content length
  // set content type
  // set cookies

  if (req.cookieJar && req.cookieJar.length) {
    res.setHeader('set-cookie', req.cookieJar.headers)
  }

  const data = JSON.stringify({ hello: 'world' })

  res.end(data)
}

const server = http.createServer(httpRequest)

// Set up web socket for development
if (process.env.NODE_ENV == 'dev') {
  new ws.Server({ server })
}

server.listen(PORT, function() {
  console.log(`Web server listening on port ${PORT}`)
})
