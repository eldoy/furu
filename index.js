if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

const http = require('http')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const ws = require('ws')
const loader = require('conficurse')
const smor = require('smor')
const kross = require('kross')
const bparse = require('bparse')
const extras = require('extras')
const wcookie = require('wcookie')
const rekvest = require('rekvest')

const mode = process.env.NODE_ENV

console.log({ mode })

const root = process.cwd()

function setContentType(res, type) {
  if (!res.hasHeader('content-type')) {
    res.setHeader('content-type', `${type}; charset=utf-8`)
  }
}

function favicon(res) {
  res.statusCode = 404
  res.end('')
}

function cors(req, res) {
  kross(req, res)
  res.statusCode = 204
  res.end('')
}

function setFile(req) {
  req.file = req.pathname.slice(1)
  if (req.pathname.endsWith('/')) {
    req.file += 'index'
  }
}

// Get language from path
function getLang(path) {
  const match = path.match(/^\/([a-z]{2})\//)
  if (match) return match[1]
}

// Set up language
function setLang(req, defaultLang = 'en') {
  const cookieLang = req.cookie('lang')
  const lang = req.params?.lang
    || getLang(req.pathname)
    || cookieLang
    || defaultLang

  // Update lang cookie
  if (cookieLang) {
    if (cookieLang != lang) {
      client.req.cookie('lang', lang)

    } else if(cookieLang == defaultLang) {
      client.req.cookie('lang', null)
    }
  }
  req.lang = lang
}

function handleResult(req, res, result) {
  // Undefined, null and 0 returns empty string
  if (!result) result = ''

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

async function handleRequest(req, res, fn) {
  console.log({ path: req.pathname })

  // Set up cookies
  wcookie(req)

  // Set up lang
  setLang(req)

  if (req.method == 'GET') {
    setFile(req)
    console.log({ file: req.file })

    setContentType(res, 'text/html')

  } else  if (req.method == 'POST') {

    // Parse body only if POST request
    await bparse(req)

    setContentType(res, 'application/json')

  } else {
    res.statusCode = 204
  }

  let result
  if (typeof fn == 'function') {
    result = await fn(req, res)
  }

  // Handle the result
  handleResult(req, res, result)
}

module.exports = function(opt, fn) {
  if (typeof opt == 'function') {
    opt = {}
    fn = opt
  }

  // Scan assets
  let assets
  if (typeof opt.assets == 'string') {
    const assetPath = path.join(root, opt.assets)
    const assetList = extras.tree(assetPath).map(x => x.replace(assetPath, ''))
    assets = new Set(assetList)
    console.log(assets)
  }

  const server = http.createServer(function(req, res) {
    // Add request properties
    rekvest(req)

    // Return asset if it exists
    if (assets && assets.has(req.pathname)) {
      return smor(req, res, { dir: 'app/assets' })
    }

    // Block favicon requests
    if (req.pathname == '/favicon.ico') {
      return favicon(res)
    }

    // Cors
    if (req.method == 'OPTIONS') {
      return cors(req, res)
    }

    handleRequest(req, res, fn)
  })

  // Set up web socket for development
  if (mode == 'development') {
    new ws.Server({ server })
  }

  server.listen(opt.port || 9090)

  return server
}
