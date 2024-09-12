it('should read body params', async ({ t }) => {
  var response = await fetch('http://localhost:9090/params', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      hello: 'world'
    })
  })
  var data = await response.json()
  t.equal(data.hello, 'world')
})
