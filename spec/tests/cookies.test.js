it('should support cookies', async ({ t }) => {
  var response = await fetch('http://localhost:9090/cookies', {
    method: 'POST'
  })
  t.ok(response.headers.get('set-cookie').startsWith('name=value'))
})
