it('should stream local file content', async ({ t }) => {
  var response = await fetch('http://localhost:9090/pipelocal', {
    method: 'GET'
  })
  var data = await response.json()
  t.deepEqual(
    response.headers.get('content-type'),
    'application/json; charset=utf-8'
  )
  t.deepEqual(response.status, 200)
  t.deepEqual(data, { hello: 'local' })
})

it('should stream remote file content', async ({ t }) => {
  var response = await fetch('http://localhost:9090/piperemote', {
    method: 'GET'
  })
  var data = await response.json()
  t.deepEqual(
    response.headers.get('content-type'),
    'application/json; charset=utf-8'
  )
  t.deepEqual(response.status, 200)
  t.deepEqual(data, { hello: 'world' })
})
