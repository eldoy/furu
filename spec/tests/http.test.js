it('should return empty from post not found', async ({ t }) => {
  var response = await fetch('http://localhost:9090/none', {
    method: 'POST'
  })
  var data = await response.json()
  t.deepEqual(
    response.headers.get('content-type'),
    'application/json; charset=utf-8'
  )
  t.deepEqual(response.status, 404)
  t.deepEqual(data, {})
})

it('should return data from post existing path', async ({ t }) => {
  var response = await fetch('http://localhost:9090/hello', {
    method: 'POST'
  })
  var data = await response.json()
  t.deepEqual(
    response.headers.get('content-type'),
    'application/json; charset=utf-8'
  )
  t.deepEqual(response.status, 200)
  t.deepEqual(data.hello, 'world')
})

it('should return empty string from get not found', async ({ t }) => {
  var response = await fetch('http://localhost:9090/not-found', {
    method: 'GET'
  })
  var data = await response.text()
  t.deepEqual(response.headers.get('content-type'), 'text/html; charset=utf-8')
  t.deepEqual(response.status, 404)
  t.deepEqual(data, '')
})
