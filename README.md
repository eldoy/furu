# Furu Web Server

Extraordinary Javascript Web Server.

Adds what's missing from the built in web server of NodeJS:

* Body parameters and file uploads
* Cookies
* Cors
* Middleware
* Language
* Redirects
* Mime types
* Request store
* Routes
* Static files
* Extra properties:
  - IP address
  - pathname
  - protocol
* And more!

The server is extremely fast and minimal.

Check out the [Furu example app here.](https://github.com/eldoy/furu-test)

### Install
```
npm i furu
```

### Usage

Minimal usage example:
```js
async function handleRequest(req, res) {
  if (req.pathname == '/hello') {
    return { hello: 'world' }
  }
}

// The server object is a vanilla NodeJS HTTP server
var server = furu({ port: 9000 }, handleRequest)
```

More advanced example with pages, layouts and assets:
```js
var furu = require('furu')
var layout = require('./app/layouts/main.js')
var homePage = require('./app/pages/home.js')
var aboutPage = require('./app/pages/about.js')

var routes = {
  'get#/': homePage,
  'get#/about': aboutPage
}

async function handleRequest(req, res) {
  if (req.route) {
    var html = await req.route(req, res)
    return layout(html)
  }
}

var options = { port: 9095, dir: 'app/assets', routes }

furu(options, handleRequest)
```

ISC Licensed. Enjoy!
