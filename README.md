# Furu Web Server

Extraordinary Web Server

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
