# Furu Web Server

Extraordinary Web Server.

Adds what's missing from the built in web server of NodeJS:

* Body parameters and file parsing
* Cookies
* Cors
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

### Install
```
npm i furu
```

### Usage
```js
async function handleRequest(req, res) {
  if (req.pathname == '/hello') {
    return { hello: 'world' }
  }
}

// The server object is a vanilla NodeJS HTTP server
const server = furu({ port: 9000 }, handleRequest)
```

ISC Licensed. Enjoy!
