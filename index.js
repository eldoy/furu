if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

var http = require('node:http')
var https = require('node:https')
var fs = require('node:fs')
var path = require('node:path')
var util = require('node:util')
var stream = require('node:stream')
var ws = require('ws')
var mime = require('mime-types')
var smor = require('smor')
var kross = require('kross')
var bparse = require('bparse')
var extras = require('extras')
var wcookie = require('wcookie')
var rekvest = require('rekvest')
var router = require('reqroute')
var lang = require('reqlang')

var root = process.cwd()

function getContentType(pathname, method = 'GET') {
  var defaultType = method == 'GET' ? 'html' : 'json'
  let [base, ext] = extras.basext(pathname)
  if (!ext) ext = defaultType
  var fileName = [base, ext].join('.')
  var type = mime.lookup(fileName) || 'text/plain'
  return mime.contentType(type)
}

// Make asset list
function getAssets(dir) {
  if (typeof dir != 'string') return
  var assetPath = path.join(root, dir)
  var assetList = extras.tree(assetPath).map((x) => x.replace(assetPath, ''))
  return new Set(assetList)
}

function isReadableStream(obj) {
  return (
    obj instanceof stream.Stream &&
    typeof (obj._read === 'function') &&
    typeof (obj._readableState === 'object')
  )
}

function favicon(res) {
  res.statusCode = 404
  res.end('')
}

function cors(res) {
  res.statusCode = 204
  res.end('')
}

function setFile(req) {
  req.file = req.pathname.slice(1)
  if (req.pathname.endsWith('/')) {
    req.file += 'index'
  }
}

async function log(req) {
  var options = { showHidden: true, depth: null, colors: true }
  var lines = [
    `${req.method}#${req.pathname.slice(1)}`,
    util.inspect(req.params || {}, options)
  ]
  console.log(`${lines.join('\n')}\n`)
}

module.exports = function (opt, fn) {
  if (typeof opt == 'function') {
    opt = {}
    fn = opt
  }

  // Set mode
  var mode = process.env.NODE_ENV

  // Store assets as a set
  var assets = getAssets(opt.dir)

  var server = http.createServer(function (req, res) {
    // Add request properties
    rekvest(req)

    // Block favicon requests
    if (req.pathname == '/favicon.ico') {
      return favicon(res)
    }

    // Cors
    kross(req, res, opt.cors)
    if (req.method == 'OPTIONS') {
      return cors(res)
    }

    // Return asset if it exists
    if (assets && assets.has(req.pathname)) {
      return smor(req, res, { dir: opt.dir })
    }

    handleRequest(req, res, opt, fn)
  })

  // Set up web socket for development
  if (mode == 'development') {
    new ws.Server({ server })
  }

  server.listen(opt.port || 9090, () => {
    var port = server.address().port
    console.log(`Listening on port ${port} in ${mode} mode.\n`)
  })

  return server
}

async function handleRequest(req, res, opt, fn) {
  // Routes
  if (opt.routes) {
    router(req, opt.routes)
  }

  // Set up cookies
  wcookie(req)

  // Set up lang
  lang(req, opt.lang)

  // Set file
  setFile(req)

  // Set store
  req.store = {}

  req.redirect = function (location = '/', status = 302) {
    res.statusCode = status
    res.setHeader('location', location)
    req.redirecting = true
  }

  // Set content type
  var defaultContentType = getContentType(req.pathname, req.method)
  res.setHeader('content-type', defaultContentType)

  // Pipe local or remote file to response
  res.stream = function (file, contentType) {
    if (!contentType) {
      contentType = getContentType(file, req.method)
    }
    res.setHeader('content-type', contentType)

    if (/^https?:\/\//.test(file)) {
      var client = file.startsWith('https') ? https : http
      return new Promise(function (resolve) {
        client.get(file, function (response) {
          resolve(response)
        })
      })
    }
    return fs.createReadStream(file)
  }

  // Download streamed file
  res.download = function (file) {
    var filename = file.split('/').reverse()[0]
    res.setHeader('content-disposition', `attachment; filename="${filename}"`)
    return res.stream(file)
  }

  let result

  // Run middleware
  if (opt.middleware) {
    for (var m in opt.middleware) {
      var mw = opt.middleware[m]
      if (typeof mw == 'function') {
        result = await mw(req, res)
        if (typeof result != 'undefined') {
          break
        }
      }
    }
  }

  // Run main function
  if (typeof result == 'undefined') {
    if (req.method == 'POST') {
      await bparse(req)
      extras.transform(req.params)
    }
    log(req)
    result = await fn(req, res)
  }

  if (req.redirecting) {
    return res.end('')
  }

  handleResult(req, res, result)
}

function handleResult(req, res, result) {
  if (isReadableStream(result)) {
    return result.pipe(res)
  }

  // Undefined and null returns empty string and 404
  if (result == null) {
    res.statusCode = 404
    result = req.method == 'POST' ? '{}' : ''
  }

  // Stringify objects
  if (typeof result == 'object') {
    try {
      result = JSON.stringify(result)
    } catch (e) {
      result = '{}'
    }
  }

  // Make sure it's a string
  result = String(result)

  // Set content length
  res.setHeader('content-length', Buffer.byteLength(result))

  // Write cookies
  if (req.cookieJar && req.cookieJar.length) {
    res.setHeader('set-cookie', req.cookieJar.headers)
  }

  res.end(result)
}
