it('should support routes', async ({ t }) => {
  var response = await fetch('http://localhost:9090/routes', {
    method: 'GET'
  })
  var data = await response.text()
  t.equal(data, 'hello')
})
