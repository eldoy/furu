const http = require('http')

const OPTIONS = {
  host: 'localhost',
  port: '9090',
  path: '/',
  method: 'POST',
  // Example for headers:
  // headers: {
  //   'accept': 'application/json'
  // }
}

module.exports = function(options) {
  options = { ...OPTIONS, ...options }

  function request(resolve, reject) {

    function ask(res) {
      let data = ''
      res.on('data', function(chunk) {
        data += chunk
      })

      res.on('close', function() {
        const type = res.headers['content-type']
        if (type.startsWith('application/json')) {
          try {
            data = JSON.parse(data)
          } catch(e) {
            data = {}
          }
        }
        const code = res.statusCode
        resolve({ res, code, data })
      })
    }

    const req = http.request(options, ask)
    req.on('error', reject)
    req.end()
  }

  return new Promise(request)
}
