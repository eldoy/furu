if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

const http = require('http')
const fs = require('fs')
const path = require('path')
const util = require('util')
const ws = require('ws')
const mime = require('mime-types')
const loader = require('conficurse')
const smor = require('smor')
const kross = require('kross')
const bparse = require('bparse')
const extras = require('extras')
const wcookie = require('wcookie')
const rekvest = require('rekvest')
const router = require('reqroute')
const lang = require('reqlang')

const mode = process.env.NODE_ENV

const root = process.cwd()

function setContentType(req, res) {
  const defaultType = req.method == 'POST' ? 'json' : 'html'
  let [base, ext] = extras.basext(req.pathname)
  if (!ext) ext = defaultType
  const fileName = [base, ext].join('.')
  const type = mime.lookup(fileName) || 'text/plain'
  res.setHeader('content-type', mime.contentType(type))
}

// Make asset list
function getAssets(dir) {
  if (typeof dir != 'string') return
  const assetPath = path.join(root, dir)
  const assetList = extras.tree(assetPath).map(x => x.replace(assetPath, ''))
  return new Set(assetList)
}

function favicon(res) {
  res.statusCode = 404
  res.end('')
}

function cors(req, res, opt) {
  kross(req, res, opt.cors)
  res.statusCode = 204
  res.end('')
}

function setFile(req) {
  req.file = req.pathname.slice(1)
  if (req.pathname.endsWith('/')) {
    req.file += 'index'
  }
}

function log(req) {
  const options = { showHidden: true, depth: null, colors: true }
  const lines = [
    `${req.method}#${req.pathname.slice(1)}`,
    util.inspect(req.params || {}, options)
  ]
  console.log(`${lines.join('\n')}\n`)
}

module.exports = function(opt, fn) {
  if (typeof opt == 'function') {
    opt = {}
    fn = opt
  }

  // Store assets as a set
  const assets = getAssets(opt.dir)

  const server = http.createServer(function(req, res) {
    // Add request properties
    rekvest(req)

    // Block favicon requests
    if (req.pathname == '/favicon.ico') {
      return favicon(res)
    }

    // Cors
    if (req.method == 'OPTIONS') {
      return cors(req, res, opt)
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
    const port = server.address().port
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

  log(req)

  req.redirect = function(location = '/', status = 302) {
    res.statusCode = status
    res.setHeader('location', location)
    req.redirecting = true
  }

  // Set content type
  setContentType(req, res)

  let result

  // Run middleware
  if (opt.middleware) {
    for (const m in opt.middleware) {
      const mw = opt.middleware[m]
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
    result = await fn(req, res)
  }

  if (req.redirecting) {
    return res.end('')
  }

  handleResult(req, res, result)
}

async function handleResult(req, res, result) {
  // Undefined, null and 0 returns empty string
  if (!result) {
    res.statusCode = 404
    result = req.method == 'POST' ? '{}' : ''
  }

  // Stringify objects
  if (typeof result == 'object') {
    try {
      result = JSON.stringify(result)
    } catch(e) {
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
