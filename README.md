# FURU Web Server

Extremely minimal Web Server

### Install
```
npm i furu
```

### Usage
```js
const server = await furu({ port: 9000 })

server.action = async function(req, res) {
  if (req.pathname == '/hello') {
    return { hello: 'world' }
  }
}
```

ISC Licensed. Enjoy!