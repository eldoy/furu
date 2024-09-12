it('should support cors', async ({ t }) => {
  var response = await fetch('http://localhost:9090', {
    method: 'OPTIONS',
    headers: {
      origin: 'localhost:9090'
    }
  })
  t.equal(response.status, 204)
  t.equal(response.headers.get('access-control-allow-origin'), 'localhost:9090')
  t.equal(response.headers.get('access-control-allow-credentials'), 'true')
  t.equal(
    response.headers.get('access-control-allow-headers'),
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control'
  )
  t.equal(
    response.headers.get('access-control-allow-methods'),
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
})
