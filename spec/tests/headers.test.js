it('should set html headers for get', async ({ t }) => {
  var response = await fetch('http://localhost:9090', {
    method: 'GET'
  })

  t.equal(response.headers.get('content-type'), 'text/html; charset=utf-8')
})

it('should set json headers for post', async ({ t }) => {
  var response = await fetch('http://localhost:9090', {
    method: 'POST'
  })
  t.equal(
    response.headers.get('content-type'),
    'application/json; charset=utf-8'
  )
})
