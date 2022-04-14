const http = require('http')

const OPTIONS = {
  host: 'localhost',
  port: '9090',
  path: '/',
  method: 'POST',
  headers: {
    'accept': 'application/json'
  }
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
        resolve({
          res,
          code: res.statusCode,
          data: data ? JSON.parse(data) : {}
        })
      })
    }

    const req = http.request(options, ask)
    req.on('error', reject)
    req.end()
  }

  return new Promise(request)
}
