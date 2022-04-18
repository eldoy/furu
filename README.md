# Furu Web Server

Extraordinary Web Server

### Install
```
npm i furu
```

### Usage
```js
const server = await furu({ port: 9000 })

async function handleRequest(req, res) {
  if (req.pathname == '/hello') {
    return { hello: 'world' }
  }
}

server.on('request', handleRequest)
```

ISC Licensed. Enjoy!
