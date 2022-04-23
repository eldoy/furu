# Furu Web Server

Extraordinary Web Server.

Adds what's missing from the built in web server of NodeJS:

* Body parameters and file uploads
* Cookies
* Cors
* Middleware
* Language
* Redirects
* Automatic headers
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
const server = furu({ port: 9000 }, handleRequest)
```

More advanced example with pages, layouts and assets:
```js
const furu = require('furu')
const layout = require('./app/layouts/main.js')
const homePage = require('./app/pages/home.js')
const aboutPage = require('./app/pages/about.js')

const routes = {
  'get#': homePage,
  'get#about': aboutPage
}

async function handleRequest(req, res) {
  if (req.route) {
    const html = await req.route(req, res)
    return layout(html)
  }
}

const options = { port: 9095, assets: 'app/assets', routes }

furu(options, handleRequest)
```

ISC Licensed. Enjoy!
