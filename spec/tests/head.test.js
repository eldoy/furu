it('should set html headers for head with response', async ({ t }) => {
  var response = await fetch('http://localhost:9090/headresult', {
    method: 'HEAD'
  })
  var data = await response.text()

  t.equal(
    response.headers.get('content-type'),
    'application/json; charset=utf-8'
  )
  t.equal(data, '')
  t.equal(response.status, 200)
})

it('should set html headers for head empty response', async ({ t }) => {
  var response = await fetch('http://localhost:9090/headempty', {
    method: 'HEAD'
  })
  var data = await response.text()

  t.equal(
    response.headers.get('content-type'),
    'application/json; charset=utf-8'
  )

  t.equal(data, '')
  t.equal(response.status, 200)
})
